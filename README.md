# nieruchomosci-watcher

Stan dla codziennej routine sprawdzajacej nowe oferty domow (Jablonna i okolice).

- `sources.json` — lista linkow wyszukiwania (juz z filtrami: lokalizacja, cena, metraz) na roznych portalach.
- `seen_links.json` — pamiec agenta: dla kazdego zrodla lista linkow do ofert, ktore juz zostaly zauwazone. Aktualizowana automatycznie przez routine po kazdym uruchomieniu.
- `run_log.md` — log kazdego uruchomienia (data, co znaleziono, ewentualne bledy pobierania danego zrodla).

Nie edytuj `seen_links.json` recznie, chyba ze chcesz zresetowac pamiec dla jakiegos zrodla (np. usunac wpis, zeby oferta znow zostala zgłoszona jako nowa).
