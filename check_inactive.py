#!/usr/bin/env python3
"""Mark expired / removed listings in offers.json (never deletes anything).

For every offer it fetches the listing URL and decides active / inactive / unknown:
- inactive -> sets "inactive_since": "<YYYY-MM-DD>" (kept if already set) and "inactive_reason"
- active   -> removes those fields again (listing came back)
- unknown  -> (blocked, network error, 403/5xx, unrecognised page) leaves the offer unchanged

Run: python3 check_inactive.py            (checks all offers)
     python3 check_inactive.py --dry-run  (only prints what would change)
"""
import concurrent.futures as cf
import datetime
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0 Safari/537.36")
REDIRECTS = (301, 302, 303, 307, 308)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def fetch(url):
    """Return (status, final_url, body), following redirects manually (incl. 308)."""
    for _ in range(6):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "pl-PL,pl;q=0.9"})
        try:
            with OPENER.open(req, timeout=30) as r:
                return r.status, url, r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code in REDIRECTS and e.headers.get("Location"):
                url = urllib.parse.urljoin(url, e.headers["Location"])
                continue
            body = e.read().decode("utf-8", "replace") if e.fp else ""
            return e.code, url, body
    return None, url, ""


def classify(src, url):
    """Return (state, reason): state is 'active', 'inactive' or 'unknown'."""
    try:
        code, final, body = fetch(url)
    except Exception as e:  # network problem: do not guess
        return "unknown", f"error: {e}"[:120]
    if code in (404, 410):
        return "inactive", f"HTTP {code}"
    if code != 200:
        return "unknown", f"HTTP {code}"

    if src == "otodom":
        m = re.search(r'"developmentUrl":"[^"]*","status":"([a-z_]+)"', body)
        if not m:
            return "unknown", "otodom: no status"
        return ("active", "") if m.group(1) == "active" else ("inactive", f"otodom status {m.group(1)}")
    if src == "olx":
        m = re.search(r'isActive\\*":(true|false)', body)
        if not m:
            return "unknown", "olx: no isActive"
        return ("active", "") if m.group(1) == "true" else ("inactive", "olx: nieaktywne")
    if src == "nieruchomosci-online":
        if final != url and not re.search(r"/\d+\.html", final):
            return "inactive", "przekierowanie na liste"
        if re.search(r'class="box-archive-info " id="box-archive-info"', body):
            return "inactive", "ogloszenie archiwalne"
        return "active", ""
    if src == "domiporta":
        if "To ogłoszenie jest już nieaktualne" in body:
            return "inactive", "nieaktualne"
        return "active", ""
    if src == "adresowo":
        if final != url and "/o/" not in final:
            return "inactive", "przekierowanie na liste"
        return "active", ""
    return "unknown", "no rule for source"


def main():
    dry = "--dry-run" in sys.argv
    today = datetime.date.today().isoformat()
    offers = json.load(open("offers.json", encoding="utf-8"))
    items = [(src, o) for src, lst in offers.items() for o in lst]
    with cf.ThreadPoolExecutor(8) as ex:
        results = list(ex.map(lambda it: classify(it[0], it[1]["url"]), items))

    newly, back, unknown = [], [], 0
    for (src, o), (state, reason) in zip(items, results):
        if state == "inactive" and not o.get("inactive_since"):
            newly.append((src, o["url"], reason))
            if not dry:
                o["inactive_since"] = today
                o["inactive_reason"] = reason
        elif state == "active" and o.get("inactive_since"):
            back.append((src, o["url"]))
            if not dry:
                o.pop("inactive_since", None)
                o.pop("inactive_reason", None)
        elif state == "unknown":
            unknown += 1

    total_inactive = sum(1 for _, o in items if o.get("inactive_since"))
    print(f"checked {len(items)}: newly inactive {len(newly)}, reactivated {len(back)}, "
          f"unknown {unknown}, inactive total {total_inactive}")
    for src, url, reason in newly:
        print(f"  inactive [{src}] {reason}: {url}")
    for src, url in back:
        print(f"  active again [{src}]: {url}")
    if not dry:
        with open("offers.json", "w", encoding="utf-8") as f:
            json.dump(offers, f, ensure_ascii=False, indent=2)
            f.write("\n")


if __name__ == "__main__":
    main()
