# nieruchomosci-watcher

Stan i strona dla codziennej routine sprawdzajacej nowe oferty domow (Jablonna i okolice).

## Pliki

- `sources.json` — lista linkow wyszukiwania (juz z filtrami: lokalizacja, cena, metraz) na roznych portalach.
- `offers.json` — pamiec agenta: dla kazdego zrodla lista ofert z detalami (adres, cena, metraz, data znalezienia). Aktualizowana automatycznie przez routine po kazdym uruchomieniu.
- `index.html` — statyczna strona (GitHub Pages) generowana z `offers.json`, pokazuje wszystkie znane oferty, najnowsze na gorze, z oznaczeniem tych znalezionych podczas ostatniego uruchomienia.
- `run_log.md` — log kazdego uruchomienia (data, co znaleziono, ewentualne bledy pobierania danego zrodla).
- `task_prompt.txt` — instrukcja dla agenta (Claude) wykonujacego codzienne sprawdzenie.
- `run_watcher.sh` — uruchamia Claude w trybie headless z `task_prompt.txt`.
- Mapa: `map.js`, `map_snippet.html`, `geocode.py`, `geocache.json`, `vendor/leaflet/` (opis nizej).

Podglad strony (po wlaczeniu GitHub Pages w Settings): `https://piotrek6769.github.io/nieruchomosci-watcher/`

Routine nigdy sama nie usuwa ofert (takze wygaslych/nieaktywnych) — `offers.json` to dane historyczne. Usuwanie nieaktywnych ofert odbywa sie tylko na wyrazne zadanie.

Nie edytuj `offers.json` recznie, chyba ze chcesz zresetowac pamiec dla jakiegos zrodla (np. usunac wpis, zeby oferta znow zostala zgloszona jako nowa).

## Codzienne uruchomienie

Routine startuje automatycznie przez launchd codziennie o 8:00
(`~/Library/LaunchAgents/com.piotrek.nieruchomosci-watcher.plist`). Wyjscie trafia do `watcher.log`.

Reczne uruchomienie:

```sh
cd ~/nieruchomosci-watcher
./run_watcher.sh
```

Agent sprawdza zrodla, dopisuje nowe oferty do `offers.json`, uruchamia `geocode.py`, generuje `index.html`, commituje i robi `git push origin main`.

## Mapa ofert

Na gorze `index.html` jest interaktywna mapa (Leaflet + OpenStreetMap). Kazda oferta to punkt:

- najechanie myszka — cena, metraz domu i dzialki, adres, zrodlo, data;
- klikniecie — otwiera ogloszenie (na telefonie: dymek z linkiem);
- kolor = wiek ogloszenia (od `first_seen`): zielony do 1 tyg., ciemnozielony 1-2 tyg., jasnoniebieski 2-4 tyg., niebieski 4-8 tyg., ciemnoniebieski 8-12 tyg., czarny ponad 12 tyg. (legenda w rogu mapy; progi w `AGE` w `map.js`);
- wiekszy punkt — oferty z ostatniego uruchomienia;
- czerwony punkt — oferta usunieta / nieaktualna (ma `inactive_since` w `offers.json`); po najechaniu zamiast adresu pokazuje cene, cene za m2 domu i cene za m2 dzialki;
- przerywana obwodka — lokalizacja przyblizona (np. tylko miejscowosc, bez ulicy).

Mapa czyta dane na zywo z `offers.json` i `geocache.json`, wiec nie trzeba jej osobno generowac.

### Jak otworzyc mape

Mapa **nie dziala** po otwarciu `index.html` bezposrednio z dysku (`file://...`) — przegladarka blokuje wtedy wczytanie plikow JSON, a kafelki OpenStreetMap wymagaja adresu http. Sa dwie opcje:

1. **GitHub Pages** — wejdz na `https://piotrek6769.github.io/nieruchomosci-watcher/` (po pushu na `main`).
2. **Lokalnie** — uruchom serwer w katalogu repo i otworz strone w przegladarce:

   ```sh
   cd ~/nieruchomosci-watcher
   python3 -m http.server 8000
   ```

   Nastepnie wejdz na <http://localhost:8000>. Serwer zatrzymasz przez `Ctrl+C`.

### Oferty usuniete (czerwone punkty)

`check_inactive.py` sprawdza kazdy link z `offers.json` (404/410, status ogloszenia na otodom/olx, "archiwalne"/"nieaktualne" na nieruchomosci-online/domiporta, przekierowanie na liste na adresowo). Wygaslej ofercie dopisuje `inactive_since` (data wykrycia) i `inactive_reason`; nic nie usuwa. Gdy ogloszenie wroci, pola sa kasowane. Jesli strona jest zablokowana albo nie da sie rozpoznac stanu, oferta zostaje bez zmian. Routine uruchamia go przy kazdym przebiegu; recznie:

```sh
cd ~/nieruchomosci-watcher
python3 check_inactive.py --dry-run   # tylko pokaz zmiany
python3 check_inactive.py
```

Oferty usuniete nadal licza sie do srednich w tabeli statystyk (dane historyczne).

### Lokalizacje (geokodowanie)

Wspolrzedne ofert sa w `geocache.json` (format: `{"<adres>": [lat, lon, poziom] | null}`; poziom 0 = pelny adres, wyzszy = mniej dokladny; `null` = nie znaleziono). Uzupelnia je:

```sh
cd ~/nieruchomosci-watcher
python3 geocode.py
```

Skrypt pyta OSM Nominatim tylko o adresy, ktorych jeszcze nie ma w cache (max 1 zapytanie/s, wiec przy wielu nowych adresach trwa to chwile). Agent uruchamia go automatycznie przy kazdym przebiegu. Jesli oferta nie pojawia sie na mapie, jej adres ma w cache `null` — mozna usunac ten wpis z `geocache.json` i uruchomic skrypt ponownie albo wpisac wspolrzedne recznie.

## Filtr ofert

Nad mapa jest prosty filtr: cena (zl), metraz domu (m2) i metraz dzialki (m2), kazdy z polami "od" i "do". Dziala od razu na mape, listy ofert pod mapa i tabele srednich cen. "Wyczysc" zeruje filtr.

- Kod: `filter.js` (ladowany przed `map.js` i `stats.js`, wklejany razem z `map_snippet.html`).
- Oferty bez danej wartosci (np. dzialka "-") nie sa ukrywane przez filtr tego pola.
- Ustawienia filtra zapamietuje przegladarka (localStorage) — tylko na tym urzadzeniu.
- Wiersze list sa dopasowywane do `offers.json` po linku do ogloszenia.

## Srednie ceny wg miesiaca i rejonu

Pod mapa jest tabela: wiersze = rejony (gminy / dzielnice), kolumny = miesiace. W kazdej komorce: srednia cena za m2 domu (pogrubiona), srednia cena calkowita i liczba ofert. Ostatni wiersz "Wszystkie" to srednia ze wszystkich rejonow.

- Liczy ja `stats.js` na zywo z `offers.json`, wiec kazdy nowy miesiac dochodzi automatycznie — nic nie trzeba uruchamiac. Dziala tak jak mapa: tylko przez http (GitHub Pages albo lokalny serwer).
- Miesiac = miesiac `first_seen` (kiedy oferta zostala znaleziona po raz pierwszy).
- Cena za m2 = `cena` / `dom_m2`. Oferty bez ceny lub metrazu licza sie tylko do liczby ofert.
- Rejon jest rozpoznawany z pola `adres` wg listy miejscowosci w `REGIONS` na poczatku `stats.js` (pierwsza pasujaca regula wygrywa). Nieznane miejscowosci trafiaja do "Inne" — dopisz je do odpowiedniego rejonu w `REGIONS`. W konsoli przegladarki mozna sprawdzic: `offersRegion("ul. Polna, Skrzeszew")`.
- Usuniecie ofert z `offers.json` zmienia tez historyczne srednie.

### Zmiany w wygladzie mapy

- Logika i kolory punktow: `map.js`.
- Kontener mapy w HTML: `map_snippet.html` — agent wkleja go bez zmian do `index.html` zaraz po `</header>` przy kazdej regeneracji strony, wiec zmieniaj ten plik, nie fragment w `index.html`.
- Leaflet jest lokalnie w `vendor/leaflet/` (bez CDN).
