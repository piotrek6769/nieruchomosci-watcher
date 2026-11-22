#!/usr/bin/env python3
"""Watcher helper: query/add offers in offers.json without dumping the whole
file into the agent's context. Usage:

  python3 wh.py known <source>            -> print known URLs for source, one per line
  python3 wh.py allurls                   -> print every URL in the whole file, one per line (for global dedup)
  python3 wh.py add <source> <url> <cena> <adres> <cena_za_m2> <dom_m2> <dzialka_m2>
        -> adds offer if url not already present anywhere and cena <= 1500000; prints ADDED, SKIPPED_DUP, or SKIPPED_CAP:<value>
  python3 wh.py haskey <source>           -> prints YES or NO (bootstrap check)
  python3 wh.py counts                    -> prints per-source count and total
"""
import json
import re
import sys

PATH = "offers.json"


def load():
    with open(PATH, encoding="utf-8") as f:
        return json.load(f)


def save(d):
    with open(PATH, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")


def parse_price(cena):
    m = re.search(r"[\d\s.,]+", cena.replace("\xa0", " "))
    if not m:
        return None
    num = m.group(0)
    num = num.replace(" ", "").replace(" ", "")
    # handle thousands separator variants: "1.150.000" / "1150000" / "1 150 000"
    if "," in num and "." in num:
        num = num.replace(".", "").replace(",", ".")
    elif "," in num:
        # ambiguous: could be decimal comma; for whole PLN prices treat as thousands sep if long
        parts = num.split(",")
        if len(parts[-1]) == 3:
            num = num.replace(",", "")
        else:
            num = num.replace(",", ".")
    else:
        num = num.replace(".", "") if num.count(".") > 1 or (num.count(".") == 1 and len(num.split(".")[-1]) == 3) else num
    try:
        return float(num)
    except ValueError:
        return None


def cmd_known(source):
    d = load()
    for o in d.get(source, []):
        print(o["url"])


def cmd_allurls():
    d = load()
    for v in d.values():
        for o in v:
            print(o["url"])


def cmd_haskey(source):
    d = load()
    print("YES" if source in d else "NO")


def cmd_counts():
    d = load()
    total = 0
    for k, v in d.items():
        print(k, len(v))
        total += len(v)
    print("total", total)


def cmd_add(source, url, cena, adres, cena_za_m2, dom_m2, dzialka_m2):
    d = load()
    for v in d.values():
        for o in v:
            if o["url"] == url:
                print("SKIPPED_DUP")
                return
    price = parse_price(cena)
    if price is not None and price > 1500000:
        print(f"SKIPPED_CAP:{price}")
        return
    import datetime
    today = datetime.date.today().isoformat()
    d.setdefault(source, []).append({
        "url": url,
        "first_seen": today,
        "adres": adres,
        "cena": cena,
        "cena_za_m2": cena_za_m2,
        "dom_m2": dom_m2,
        "dzialka_m2": dzialka_m2,
    })
    save(d)
    print("ADDED")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)
    cmd = args[0]
    if cmd == "known":
        cmd_known(args[1])
    elif cmd == "allurls":
        cmd_allurls()
    elif cmd == "haskey":
        cmd_haskey(args[1])
    elif cmd == "counts":
        cmd_counts()
    elif cmd == "add":
        cmd_add(*args[1:8])
    else:
        print(__doc__)
        sys.exit(1)
