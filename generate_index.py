#!/usr/bin/env python3
"""Regenerate index.html from offers.json, grouped by first_seen date (newest first)."""
import datetime
import html
import json

MIESIACE = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
            "lipca", "sierpnia", "wrzesnia", "pazdziernika", "listopada", "grudnia"]


def polish_date(iso):
    y, m, d = iso.split("-")
    return f"{int(d)} {MIESIACE[int(m) - 1]} {y}"


def main():
    with open("offers.json", encoding="utf-8") as f:
        offers = json.load(f)
    with open("map_snippet.html", encoding="utf-8") as f:
        map_snippet = f.read().rstrip("\n")

    rows = []
    for source, items in offers.items():
        for o in items:
            rows.append((source, o))
    total = len(rows)

    by_date = {}
    for source, o in rows:
        by_date.setdefault(o.get("first_seen", "-"), []).append((source, o))

    dates_desc = sorted(by_date.keys(), reverse=True)

    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M %Z") or datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M CET")

    parts = []
    parts.append(f"""<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nieruchomosci Watcher - Jablonna / powiat legionowski</title>
<style>
  :root {{
    color-scheme: light dark;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.5rem;
    line-height: 1.4;
  }}
  header {{
    margin-bottom: 1.5rem;
  }}
  h1 {{
    margin: 0 0 0.3rem 0;
    font-size: 1.6rem;
  }}
  .meta {{
    opacity: 0.75;
    font-size: 0.95rem;
  }}
  h2.date-heading {{
    font-size: 1.15rem;
    margin: 2rem 0 0.6rem 0;
    padding: 0.4rem 0.7rem;
    border-left: 4px solid transparent;
  }}
  h2.date-heading.fresh {{
    border-left-color: #2a8f4e;
    background: rgba(42, 143, 78, 0.12);
    font-weight: 700;
  }}
  .table-wrap {{
    overflow-x: auto;
  }}
  table {{
    border-collapse: collapse;
    width: 100%;
    font-size: 0.92rem;
  }}
  th, td {{
    border: 1px solid rgba(128,128,128,0.35);
    padding: 0.4rem 0.6rem;
    text-align: left;
    white-space: nowrap;
  }}
  th {{
    background: rgba(128,128,128,0.12);
  }}
  tr:nth-child(even) {{
    background: rgba(128,128,128,0.06);
  }}
  a {{
    color: inherit;
    text-decoration: underline;
  }}
  .empty {{
    opacity: 0.7;
    font-size: 1.1rem;
    margin-top: 2rem;
  }}
</style>
</head>
<body>
<header>
  <h1>Nieruchomosci Watcher - domy, Jablonna / powiat legionowski</h1>
  <div class="meta">Ostatnia aktualizacja: {now} &middot; Liczba ofert ogolem: {total}</div>
</header>
{map_snippet}
""")

    if total == 0:
        parts.append('<p class="empty">brak danych jeszcze</p>\n')
    else:
        for i, date in enumerate(dates_desc):
            items = by_date[date]
            items.sort(key=lambda so: (so[0], _price_key(so[1].get("cena", ""))))
            cls = "date-heading fresh" if i == 0 else "date-heading"
            label = polish_date(date) if date != "-" else date
            parts.append(f'    <section>\n      <h2 class="{cls}">Oferty z dnia {label} ({len(items)} ofert)</h2>\n')
            parts.append('      <div class="table-wrap">\n        <table>\n          <thead>\n            <tr>\n')
            for col in ["Adres", "Cena", "Cena/m2", "Dom (m2)", "Dzialka (m2)", "Zrodlo", "Link"]:
                parts.append(f"              <th>{col}</th>\n")
            parts.append("            </tr>\n          </thead>\n          <tbody>\n")
            for source, o in items:
                adres = html.escape(o.get("adres", "-"))
                cena = html.escape(o.get("cena", "-"))
                cena_m2 = html.escape(o.get("cena_za_m2", "-"))
                dom = html.escape(str(o.get("dom_m2", "-")))
                dzialka = html.escape(str(o.get("dzialka_m2", "-")))
                url = html.escape(o.get("url", "#"))
                parts.append("            <tr>\n")
                parts.append(f"              <td>{adres}</td>\n")
                parts.append(f"              <td>{cena}</td>\n")
                parts.append(f"              <td>{cena_m2}</td>\n")
                parts.append(f"              <td>{dom}</td>\n")
                parts.append(f"              <td>{dzialka}</td>\n")
                parts.append(f"              <td>{html.escape(source)}</td>\n")
                parts.append(f'              <td><a href="{url}" target="_blank" rel="noopener">oferta</a></td>\n')
                parts.append("            </tr>\n")
            parts.append("          </tbody>\n        </table>\n      </div>\n    </section>\n")

    parts.append("</body>\n</html>\n")

    with open("index.html", "w", encoding="utf-8") as f:
        f.write("".join(parts))
    print(f"Wrote index.html: {total} offers, {len(dates_desc)} date sections")


def _price_key(cena):
    import re
    m = re.search(r"[\d\s.,]+", cena or "")
    if not m:
        return 0.0
    num = m.group(0).replace(" ", "").replace(" ", "")
    if "," in num and "." in num:
        num = num.replace(".", "").replace(",", ".")
    elif "," in num:
        p = num.split(",")
        num = num.replace(",", "") if len(p[-1]) == 3 else num.replace(",", ".")
    try:
        return float(num)
    except ValueError:
        return 0.0


if __name__ == "__main__":
    main()
