# nieruchomosci-watcher

Stan i strona dla codziennej routine sprawdzajacej nowe oferty domow (Jablonna i okolice).

- `sources.json` — lista linkow wyszukiwania (juz z filtrami: lokalizacja, cena, metraz) na roznych portalach.
- `offers.json` — pamiec agenta: dla kazdego zrodla lista ofert z detalami (adres, cena, metraz, data znalezienia). Aktualizowana automatycznie przez routine po kazdym uruchomieniu.
- `index.html` — statyczna strona (GitHub Pages) generowana z `offers.json`, pokazuje wszystkie znane oferty, najnowsze na gorze, z oznaczeniem tych znalezionych podczas ostatniego uruchomienia.
- `run_log.md` — log kazdego uruchomienia (data, co znaleziono, ewentualne bledy pobierania danego zrodla).

Podglad strony (po wlaczeniu GitHub Pages w Settings): `https://piotrek6769.github.io/nieruchomosci-watcher/`

Nie edytuj `offers.json` recznie, chyba ze chcesz zresetowac pamiec dla jakiegos zrodla (np. usunac wpis, zeby oferta znow zostala zgloszona jako nowa).
