#!/usr/bin/env python3
"""Geocode offer addresses from offers.json into geocache.json (OSM Nominatim).

Only addresses missing from the cache are queried, so daily runs are fast.
Cache format: {"<adres>": [lat, lon, level] | null}
level 0 = full address matched; higher = less precise (leading parts dropped).
Run: python3 geocode.py
"""
import json
import re
import time
import urllib.parse
import urllib.request

NOMINATIM = "https://nominatim.openstreetmap.org/search"
USER_AGENT = "nieruchomosci-watcher/1.0 (personal listing map)"
# Region north of Warsaw (Legionowo, Jablonna, Bialoleka, Lomianki, Radzymin...).
VIEWBOX = "20.40,52.80,21.80,52.05"  # lon_min,lat_max,lon_max,lat_min

DROP_PART = re.compile(
    r"^(powiat|gmina|gm\.|woj\.|województwo)\b|"
    r"^(mazowieckie|legionowski|wołomiński|nowodworski|warszawski zachodni|"
    r"warszawski|pułtuski|miński|otwocki|piaseczyński|pruszkowski|polska)$",
    re.IGNORECASE,
)


def clean_parts(adres):
    adres = re.sub(r"\(.*?\)", "", adres)
    parts = [p.strip() for p in adres.split(",")]
    out = []
    for p in parts:
        if not p or p == "-" or DROP_PART.search(p):
            continue
        p = re.sub(r"^(ul\.|ulica|al\.|aleja|os\.|osiedle)\s+", "", p, flags=re.IGNORECASE)
        if p not in out:
            out.append(p)
    return out


def query(q):
    params = urllib.parse.urlencode(
        {"q": q, "format": "json", "limit": 1, "countrycodes": "pl",
         "viewbox": VIEWBOX, "bounded": 1}
    )
    req = urllib.request.Request(f"{NOMINATIM}?{params}", headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as r:
        res = json.load(r)
    time.sleep(1.1)  # Nominatim usage policy: max 1 request/second
    if res:
        return float(res[0]["lat"]), float(res[0]["lon"])
    return None


def geocode(adres):
    parts = clean_parts(adres)
    for level in range(len(parts)):
        q = ", ".join(parts[level:])
        try:
            hit = query(q)
        except Exception as e:  # network hiccup: leave uncached, retry next run
            print(f"  error for {q!r}: {e}")
            return "retry"
        if hit:
            return [round(hit[0], 6), round(hit[1], 6), level]
    return None


def main():
    offers = json.load(open("offers.json", encoding="utf-8"))
    try:
        cache = json.load(open("geocache.json", encoding="utf-8"))
    except FileNotFoundError:
        cache = {}
    todo = sorted({o["adres"] for lst in offers.values() for o in lst
                   if o.get("adres") and o["adres"] != "-" and o["adres"] not in cache})
    print(f"{len(todo)} addresses to geocode")
    for i, adres in enumerate(todo, 1):
        res = geocode(adres)
        if res == "retry":
            continue
        cache[adres] = res
        print(f"[{i}/{len(todo)}] {adres} -> {res}")
        if i % 20 == 0:
            json.dump(cache, open("geocache.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(cache, open("geocache.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"done, cache size {len(cache)}")


if __name__ == "__main__":
    main()
