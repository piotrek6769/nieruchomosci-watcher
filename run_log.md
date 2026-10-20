# Run log

## 2026-08-09 06:15 UTC

Wynik: BŁĄD KRYTYCZNY — brak dostępu do sieci zewnętrznej w tym środowisku.

WebFetch zwracał `EGRESS_BLOCKED` dla wszystkich prób, włącznie z domeną kontrolną
`example.com` (nie tylko dla portali nieruchomości) — sesja nie ma żadnego dostępu
do internetu wychodzącego. To ograniczenie środowiska (network egress policy), nie
błąd konkretnego źródła.

Status per źródło:
- otodom: error — EGRESS_BLOCKED, 0 found, 0 new
- nieruchomosci-online: error — EGRESS_BLOCKED, 0 found, 0 new
- olx: error — EGRESS_BLOCKED, 0 found, 0 new
- morizon: error — fetch unavailable, 0 found, 0 new
- domiporta: error — EGRESS_BLOCKED, 0 found, 0 new
- adresowo: error — EGRESS_BLOCKED, 0 found, 0 new
- gethome: error — EGRESS_BLOCKED, 0 found, 0 new
- rynekpierwotny: error — EGRESS_BLOCKED, 0 found, 0 new
- oferty-net: error — fetch unavailable, 0 found, 0 new

Nowe ogłoszenia: brak (żadne źródło nie zostało odczytane).
Powiadomienie push: wysłane — zgłoszenie awarii środowiska (brak sieci wychodzącej),
nie lista ogłoszeń.
offers.json: bez zmian (nadal `{}`).
index.html: zregenerowany (placeholder "brak danych jeszcze", timestamp zaktualizowany).

## 2026-08-09 06:53 UTC

Wynik: BŁĄD KRYTYCZNY — brak dostępu do sieci zewnętrznej w tym środowisku (potwierdzone
drugi raz z rzędu).

WebFetch zwrócił `EGRESS_BLOCKED` dla otodom.pl oraz dla domeny kontrolnej `example.com` —
sesja nadal nie ma żadnego dostępu do internetu wychodzącego. To ograniczenie środowiska
(network egress policy), nie błąd konkretnego źródła. Pozostałe źródła pominięto bez
osobnych prób fetch, ponieważ blokada jest potwierdzona jako całościowa (dotyczy nawet
neutralnej domeny testowej).

Status per źródło:
- otodom: error — EGRESS_BLOCKED, 0 found, 0 new
- nieruchomosci-online: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- olx: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- morizon: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- domiporta: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- adresowo: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- gethome: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- rynekpierwotny: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- oferty-net: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new

Nowe ogłoszenia: brak (żadne źródło nie zostało odczytane).
Powiadomienie push: wysłane — druga awaria z rzędu, użytkownik powiadomiony, że routine
nie może działać dopóki nie zostanie przyznany dostęp do sieci wychodzącej w tym środowisku.
offers.json: bez zmian (nadal `{}`).
index.html: zregenerowany (placeholder "brak danych jeszcze", timestamp zaktualizowany).

## 2026-08-10 06:14 UTC

Wynik: BŁĄD KRYTYCZNY — brak dostępu do sieci zewnętrznej w tym środowisku (potwierdzone
trzeci raz z rzędu, dzień po dniu).

WebFetch zwrócił `EGRESS_BLOCKED` dla domeny kontrolnej `example.com`. Diagnostyka
dodatkowa: `curl` na poziomie powłoki do `https://example.com` zwrócił `CONNECT tunnel
failed, response 403`, a status proxy (`$HTTPS_PROXY/__agentproxy/status`) potwierdza
`recentRelayFailures` z `kind: connect_rejected`, `detail: gateway answered 403 to
CONNECT (policy denial or upstream failure)`. To jest blokada na poziomie polityki
egress całego środowiska (network egress policy skonfigurowana przy tworzeniu tego
środowiska Claude Code Remote), a nie problem z konkretnym źródłem czy z narzędziem
WebFetch. Wszystkie źródła pominięto bez osobnych prób, ponieważ blokada jest
potwierdzona jako całościowa.

Status per źródło:
- otodom: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- nieruchomosci-online: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- olx: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- morizon: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- domiporta: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- adresowo: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- gethome: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- rynekpierwotny: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- oferty-net: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new

Nowe ogłoszenia: brak (żadne źródło nie zostało odczytane).
Powiadomienie push: wysłane — trzecia awaria z rzędu; użytkownik ponownie poinformowany,
że routine wymaga zmiany polityki sieciowej (network egress policy) tego środowiska w
ustawieniach, aby móc kiedykolwiek zadziałać.
offers.json: bez zmian (nadal `{}`).
index.html: zregenerowany (placeholder "brak danych jeszcze", timestamp zaktualizowany).

## 2026-08-11 06:14 UTC

Wynik: BŁĄD KRYTYCZNY — brak dostępu do sieci zewnętrznej w tym środowisku (potwierdzone
czwarty raz z rzędu, dzień po dniu, od 2026-08-09).

WebFetch zwrócił `EGRESS_BLOCKED` zarówno dla domeny kontrolnej `example.com`, jak i
bezpośrednio dla `www.otodom.pl` (próba na realnym źródle, nie tylko na domenie
testowej). Diagnostyka na poziomie powłoki: `curl` do `https://example.com` zwrócił
`CONNECT tunnel failed, response 403`; status proxy (`$HTTPS_PROXY/__agentproxy/status`)
potwierdza `recentRelayFailures` z `kind: connect_rejected`, `detail: gateway answered
403 to CONNECT (policy denial or upstream failure)`. Blokada jest identyczna jak w
poprzednich trzech uruchomieniach — to nadal ograniczenie polityki egress całego
środowiska, niezmienione od czterech dni. Pozostałe źródła pominięto bez osobnych prób,
ponieważ blokada jest potwierdzona jako całościowa.

Status per źródło:
- otodom: error — EGRESS_BLOCKED (potwierdzone bezpośrednim fetchem), 0 found, 0 new
- nieruchomosci-online: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- olx: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- morizon: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- domiporta: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- adresowo: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- gethome: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- rynekpierwotny: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- oferty-net: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new

Nowe ogłoszenia: brak (żadne źródło nie zostało odczytane).
Powiadomienie push: wysłane — czwarta awaria z rzędu bez żadnej zmiany od poprzedniego
dnia; użytkownik ponownie poinformowany, że problem wymaga ręcznej zmiany network egress
policy tego środowiska (nie naprawi się sam, dopóki ktoś nie zmieni ustawień).
offers.json: bez zmian (nadal `{}`).
index.html: zregenerowany (placeholder "brak danych jeszcze", timestamp zaktualizowany).

## 2026-08-12 06:14 UTC

Wynik: BŁĄD KRYTYCZNY — brak dostępu do sieci zewnętrznej w tym środowisku (potwierdzone
piąty raz z rzędu, dzień po dniu, bez żadnej zmiany od 2026-08-09).

WebFetch zwrócił `EGRESS_BLOCKED` zarówno dla domeny kontrolnej `example.com`, jak i
bezpośrednio dla `www.otodom.pl`. Diagnostyka powłoki: `curl` do `https://example.com`
zwrócił `CONNECT tunnel failed, response 403`. Status proxy (`$HTTPS_PROXY/__agentproxy/status`)
tym razem nie pokazuje wpisów w `recentRelayFailures` (pusta lista), ale sam fetch nadal
kończy się 403 na CONNECT — blokada jest identyczna funkcjonalnie jak w poprzednich
czterech uruchomieniach. To nadal ograniczenie polityki egress całego środowiska, nie
błąd konkretnego źródła ani narzędzia. Pozostałe źródła pominięto bez osobnych prób,
ponieważ blokada jest potwierdzona jako całościowa (dotyczy nawet neutralnej domeny
testowej).

Status per źródło:
- otodom: error — EGRESS_BLOCKED (potwierdzone bezpośrednim fetchem), 0 found, 0 new
- nieruchomosci-online: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- olx: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- morizon: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- domiporta: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- adresowo: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- gethome: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- rynekpierwotny: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- oferty-net: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new

Nowe ogłoszenia: brak (żadne źródło nie zostało odczytane).
Powiadomienie push: NIE wysłane tym razem. Sytuacja jest identyczna i niezmieniona
względem czterech poprzednich uruchomień (2026-08-09 x2, 2026-08-10, 2026-08-11), o
których użytkownik już był informowany push notification za każdym razem. Wysyłanie
piątego identycznego alertu o tym samym, wciąż nierozwiązanym problemie środowiska
byłoby powtórzeniem bez nowej informacji — ocena: cisza jest tu właściwsza niż spam.
Jeśli problem utrzyma się kolejny dzień bez zmiany, warto rozważyć wznowienie alertów
z niższą częstotliwością (np. co 3-4 dni) zamiast przy każdym uruchomieniu.
offers.json: bez zmian (nadal `{}`).
index.html: zregenerowany (placeholder "brak danych jeszcze", timestamp zaktualizowany).

## 2026-08-12 11:51 UTC

Wynik: BŁĄD KRYTYCZNY — brak dostępu do sieci zewnętrznej w tym środowisku (potwierdzone
szósty raz z rzędu, dzień po dniu / w ramach tego samego dnia, bez żadnej zmiany od
2026-08-09). To drugie uruchomienie dzisiaj (poprzednie: 06:14 UTC, ten sam wynik).

WebFetch zwrócił `EGRESS_BLOCKED` zarówno dla domeny kontrolnej `example.com`, jak i
bezpośrednio dla `www.otodom.pl`. Status proxy (`$HTTPS_PROXY/__agentproxy/status`)
pokazuje `enabled: true`, `selective: false`, `recentRelayFailures: []` — blokada jest
nadal ograniczeniem polityki egress całego środowiska, nie błędem konkretnego źródła.
Pozostałe 7 źródeł pominięto bez osobnych prób, ponieważ blokada jest potwierdzona jako
całościowa (dotyczy nawet neutralnej domeny testowej).

Status per źródło:
- otodom: error — EGRESS_BLOCKED (potwierdzone bezpośrednim fetchem), 0 found, 0 new
- nieruchomosci-online: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- olx: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- morizon: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- domiporta: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- adresowo: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- gethome: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- rynekpierwotny: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- oferty-net: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new

Nowe ogłoszenia: brak (żadne źródło nie zostało odczytane).
Powiadomienie push: NIE wysłane. Identyczna, niezmieniona sytuacja względem uruchomienia
sprzed ~5.5h (dzisiaj 06:14 UTC), o którym decyzja była już podjęta (cisza, bo problem
nierozwiązany i niezmienny). Wysłanie kolejnego identycznego alertu nie niosłoby nowej
informacji.
offers.json: bez zmian (nadal `{}`).
index.html: zregenerowany (placeholder "brak danych jeszcze", timestamp zaktualizowany,
licznik uruchomień zaktualizowany do sześciu).

## 2026-08-12 12:29 UTC

Wynik: BŁĄD KRYTYCZNY — brak dostępu do sieci zewnętrznej w tym środowisku (potwierdzone
siódmy raz z rzędu, trzecie uruchomienie dzisiaj: 06:14, 11:51, teraz 12:29 UTC), bez
żadnej zmiany od 2026-08-09.

WebFetch zwrócił `EGRESS_BLOCKED` zarówno dla domeny kontrolnej `example.com`, jak i
bezpośrednio dla `www.otodom.pl`. Status proxy (`$HTTPS_PROXY/__agentproxy/status`)
pokazuje `enabled: true`, `selective: false`, `recentRelayFailures: []` — blokada jest
nadal ograniczeniem polityki egress całego środowiska, nie błędem konkretnego źródła.
Pozostałe 7 źródeł pominięto bez osobnych prób, ponieważ blokada jest potwierdzona jako
całościowa (dotyczy nawet neutralnej domeny testowej).

Status per źródło:
- otodom: error — EGRESS_BLOCKED (potwierdzone bezpośrednim fetchem), 0 found, 0 new
- nieruchomosci-online: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- olx: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- morizon: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- domiporta: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- adresowo: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- gethome: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- rynekpierwotny: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new
- oferty-net: error — EGRESS_BLOCKED (blokada całościowa), 0 found, 0 new

Nowe ogłoszenia: brak (żadne źródło nie zostało odczytane).
Powiadomienie push: NIE wysłane. Identyczna, niezmieniona sytuacja względem dwóch
poprzednich uruchomień dzisiaj (06:14 i 11:51 UTC), o których decyzja o ciszy była już
podjęta. Problem trwa nieprzerwanie od 2026-08-09 (7 uruchomień) i wymaga ręcznej zmiany
network egress policy tego środowiska — kolejny identyczny alert nie niósłby nowej
informacji.
offers.json: bez zmian (nadal `{}`).
index.html: zregenerowany (timestamp zaktualizowany, licznik uruchomień zaktualizowany
do siedmiu).

## 2026-08-12 (uruchomienie watchera, dostęp do sieci przywrócony)

Wynik: SUKCES CZĘŚCIOWY — dostęp do sieci wychodzącej działa (pierwszy raz od 2026-08-09).
To jest bootstrap: offers.json był całkowicie pusty (`{}`) dla wszystkich źródeł, więc
zgodnie z regułą bootstrapu żadne znalezione ogłoszenie nie liczy się jako "nowe" i nie
wysłano powiadomienia push, mimo że dodano 84 oferty do bazy.

Status per źródło:
- otodom: blocked — HTTP 403 Forbidden (strona blokuje WebFetch), 0 found, 0 new
- nieruchomosci-online: ok, 7 found, 7 new (bootstrap, brak powiadomienia)
- olx: ok (częściowo), 30 linków znalezionych na stronie wyników; 2 to oferty olx.pl
  (pobrane, 2 new bootstrap), pozostałe 28 to przekierowania do ofert otodom.pl,
  których strony szczegółowe zwracają HTTP 403 tak jak samo otodom.pl — pominięte,
  nie dodane do offers.json (będą ponownie widoczne przy kolejnym uruchomieniu)
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 36 new (bootstrap, brak powiadomienia)
- adresowo: ok, 39 found, 39 new (bootstrap, brak powiadomienia) — uwaga: wyszukiwarka
  adresowo.pl dla "gmina-jablonna-2" zwraca dużo ofert spoza powiatu legionowskiego
  (Warszawa, Marki, Ząbki, Kobyłka, Zielonka, Radzymin, Stare Babice, Nowy Dwór Maz.);
  pobrano je zgodnie z zawartością strony wyników, bez własnego filtrowania
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Nowe ogłoszenia: 84 dodane do offers.json (bootstrap dla wszystkich 6 źródeł, które
zwróciły dane), 0 zakwalifikowanych jako "genuinely new" — więc 0 wysłanych powiadomień
push, zgodnie z regułą bootstrapu z instrukcji.
Powiadomienie push: NIE wysłane (bootstrap).
offers.json: rozbudowany z `{}` do 84 ofert w 6 źródłach (otodom, morizon i oferty-net
nadal bez klucza — zostaną potraktowane jako bootstrap ponownie, gdy uda się je odczytać).
index.html: zregenerowany w pełni z aktualnego offers.json (84 wierszy, bez oznaczeń
"NOWA" bo to bootstrap).

## 2026-08-12 14:41 UTC

Wynik: SUKCES CZĘŚCIOWY — sieć dostępna, ale bez nowych ogłoszeń. Wszystkie źródła
z istniejącym kluczem w offers.json zwróciły wyłącznie oferty już znane; źródła bez
klucza (otodom, morizon, oferty-net) pozostały niedostępne z powodu blokad.

Status per źródło:
- otodom: blocked — HTTP 403 Forbidden na stronie wyników, 0 found, 0 new (nadal bez
  klucza w offers.json, bootstrap przy pierwszym udanym odczycie)
- nieruchomosci-online: ok, 7 found, 0 new — jedna oferta (ID 26338532) pojawiła się
  pod innym sluggiem URL ("dom,na-sprzedaz" zamiast zapisanego "dom-wolnostojacy,do-remontu"),
  ten sam numeryczny ID co już zapisana oferta -> potraktowana jako duplikat, nie dodana
  ponownie
- olx: ok (częściowo), strona wyników zawiera mieszankę linków olx.pl (2, oba już znane,
  0 new) i przekierowań do ofert otodom.pl (28, pominięte jak w poprzednich uruchomieniach
  — szczegóły otodom nadal blokowane HTTP 403)
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 0 new (wszystkie już znane)
- adresowo: ok, 39 found, 0 new (wszystkie już znane)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Nowe ogłoszenia: brak. Powiadomienie push: NIE wysłane (brak genuinely-new listingów).
offers.json: bez zmian (nadal 84 oferty w 6 źródłach: nieruchomosci-online, olx,
domiporta, adresowo, gethome, rynekpierwotny; otodom/morizon/oferty-net nadal bez klucza).
index.html: zregenerowany w pełni z aktualnego offers.json (84 wierszy, bez znaczników
"NOWA"), zaktualizowano tylko znacznik czasu.

## Reczna korekta (poza standardowym uruchomieniem watchera)

Uzytkownik zglosil oferty powyzej budzetu (>1 200 000 zl) na stronie. Przyczyna:
zapisany link do domiporta.pl (`?Distance=5`) nie zawiera filtra ceny po stronie
portalu, wiec zwracal wszystkie domy w promieniu 5km niezaleznie od ceny (do
3 800 000 zl). Dodatkowo 2 oferty z nieruchomosci-online nieznacznie przekraczaly
limit mimo filtra w URL.

Dzialania:
- Usunieto 28 ofert powyzej 1 200 000 zl z offers.json (26 z domiporta, 2 z
  nieruchomosci-online) - z 84 zostalo 56.
- index.html zregenerowany z wyczyszczonych danych.
- Dodano twardy limit ceny (HARD BUDGET CAP) do instrukcji watchera - od teraz
  kazda oferta powyzej 1 200 000 zl jest odrzucana na etapie zapisu do offers.json,
  niezaleznie od tego czy filtr danego portalu dziala poprawnie. Usuniete URL-e
  ponownie pojawia sie przy nastepnym uruchomieniu jako "nowe", ale zostana wtedy
  poprawnie odrzucone przez nowa regule.

## 2026-08-15 13:06 CEST

Wynik: SUKCES CZĘŚCIOWY — 4 źródła zablokowane, ale 5 aktywnych źródeł zwróciły dużo
nowych ofert (nieruchomosci-online poszerzył promień wyszukiwania i objął sąsiednie
miejscowości: Legionowo, Chotomów, Kiełpin, Łomianki Dolne, Kępa Kielpińska).

Status per źródło:
- otodom: blocked — HTTP 403 Forbidden na stronie wyników, 0 found, 0 new (nadal bez
  klucza w offers.json)
- nieruchomosci-online: ok, 41 found, 36 nowych URL-i (27 dodanych, 9 odrzuconych z
  powodu limitu budżetu >1 200 000 zł)
- olx: ok (częściowo), 6 linków olx.pl (2 znane + 4 nowe, wszystkie dodane), reszta
  wyników to przekierowania do otodom.pl (ok. 62 linków, pominięte — otodom nadal
  zablokowane)
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 35 found, 27 nowych URL-i, wszystkie 27 odrzucone — przekroczyły limit
  1 200 000 zł (potwierdza znany problem: link domiporty nie filtruje po cenie po
  stronie portalu)
- adresowo: ok, 39 found, 2 nowe (oba pod limitem, dodane)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 9, domiporta: 27, olx: 0, adresowo: 0.

Nowe ogłoszenia dodane do offers.json: 33 (27 nieruchomosci-online, 4 olx, 2 adresowo).
Powiadomienie push: WYSŁANE (33 genuinely-new ogłoszenia, żadne źródło nie było
bootstrapem tym razem).
offers.json: rozbudowany z 56 do 89 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-08-15 na górze z wyróżnieniem.

## Watcher run 2026-08-16

Lokalny czas: 2026-08-16 10:09 CEST

Status per źródło:
- otodom: blocked — HTTP 403 Forbidden na stronie wyników, 0 found, 0 new
- nieruchomosci-online: ok, 6 found, 1 nowy URL, odrzucony — przekroczył limit
  1 200 000 zł (1 250 000 zł)
- olx: ok (częściowo), 2 linki olx.pl (oba już znane, 0 nowych), reszta wyników to
  linki do otodom.pl (ok. 28 linków, pominięte — otodom nadal zablokowane)
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 27 nowych URL-i, wszystkie 27 odrzucone — przekroczyły limit
  1 200 000 zł (ceny od 1 248 900 zł do 2 890 000 zł)
- adresowo: ok, 39 found, 0 nowych (wszystkie już znane)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 1, domiporta: 27.

Nowe ogłoszenia dodane do offers.json: 0.
Powiadomienie push: BRAK (żadna nowa oferta pod limitem budżetu).
offers.json: bez zmian, 89 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json (bez zmian w treści poza
znacznikiem czasu aktualizacji).

## Watcher run 2026-08-24

Lokalny czas: 2026-08-24 (patrz znacznik czasu w commicie)

Status per źródło:
- otodom: blocked — HTTP 403 Forbidden na stronie wyników, 0 found, 0 new
- nieruchomosci-online: ok, 5 found, 1 nowy URL, odrzucony — przekroczył limit
  1 200 000 zł (1 250 000 zł, Dereniowa, Jabłonna)
- olx: ok (częściowo), 0 linków olx.pl w wynikach tym razem, reszta (34 linki) to
  otodom.pl — pominięte, otodom nadal zablokowane
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 35 found, 27 nowych URL-i, wszystkie 27 odrzucone — przekroczyły limit
  1 200 000 zł (ceny od 1 248 900 zł do 2 890 000 zł)
- adresowo: ok, 39 found, 7 nowych URL-i; 1 odrzucony jako podejrzana literówka
  ekstrakcji (slug "l7p5p5" wskazywał na zupełnie niepowiązaną ofertę działki w
  powiecie wąbrzeskim — bardzo podobny do istniejącego "l7v5p5", pominięty jako
  najpewniej błąd odczytu strony wyników, nie prawdziwe nowe ogłoszenie), 6 dodanych,
  wszystkie pod limitem budżetu
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 1, domiporta: 27, adresowo: 0.

Nowe ogłoszenia dodane do offers.json: 6 (wszystkie adresowo).
Powiadomienie push: WYSŁANE (6 genuinie nowych ogłoszeń, adresowo nie było
bootstrapem).
offers.json: rozbudowany z 89 do 95 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-08-24 na górze z wyróżnieniem.

## Watcher run 2026-08-25

Lokalny czas: 2026-08-25 08:13 CEST

Status per źródło:
- otodom: blocked — HTTP 403 Forbidden na stronie wyników, 0 found, 0 new
- nieruchomosci-online: ok, 41 found (szeroki promień, Legionowo/Chotomów/Kiełpin/
  Łomianki Dolne/Kępa Kiełpińska/Stanisławów Drugi), 19 nowych URL-i, 5 odrzuconych —
  przekroczyły limit 1 200 000 zł (1 235 000 – 1 345 000 zł), 14 dodanych
- olx: ok (częściowo), 0 linków olx.pl w wynikach tym razem, reszta (69 linków) to
  otodom.pl — pominięte, otodom nadal zablokowane
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 35 found, 26 nowych URL-i, wszystkie 26 odrzucone — przekroczyły limit
  1 200 000 zł (ceny od 1 248 900 zł do 2 890 000 zł)
- adresowo: ok, 39 found, 0 nowych (wszystkie już znane); 1 URL wyglądał na nowy
  ("dom-radzymin-rondo-generala-jozefa-hallera-l7p5") ale to kolejny przypadek
  ucinania sluga przez ekstrakcję markdown znanego "l7v5p5" (patrz pamięć źródeł) —
  pominięty jako artefakt, nie prawdziwe nowe ogłoszenie
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 5, domiporta: 26, adresowo: 0.

Nowe ogłoszenia dodane do offers.json: 14 (wszystkie nieruchomosci-online).
Powiadomienie push: WYSŁANE (14 genuinie nowych ogłoszeń, nieruchomosci-online nie
było bootstrapem).
offers.json: rozbudowany z 95 do 109 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-08-25 na górze z wyróżnieniem.

## Watcher run 2026-08-30

Lokalny czas: 2026-08-30 08:35 CEST

Status per źródło:
- otodom: blocked — HTTP 403 Forbidden na stronie wyników, 0 found, 0 new
- nieruchomosci-online: ok, 41 found (szeroki promień, Legionowo/Chotomów/Kiełpin/
  Kępa Kiełpińska/Łomianki Dolne/Stanisławów Drugi), 14 nowych URL-i, 8 odrzuconych —
  przekroczyły limit 1 200 000 zł (1 215 000 – 1 350 000 zł), 6 dodanych
- olx: ok (częściowo), 0 linków olx.pl w wynikach tym razem, reszta (65 linków) to
  otodom.pl — pominięte, otodom nadal zablokowane
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 27 nowych URL-i, 26 odrzuconych — przekroczyły limit
  1 200 000 zł (ceny od 1 248 900 zł do 2 890 000 zł), 1 dodany (Legionowo, Krakusa,
  790 000 zł)
- adresowo: ok, 39 found, 4 nowe URL-e, wszystkie 4 dodane pod limitem budżetu
  (Pomiechówek, Czosnów x2, Warszawa-Wesoła)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 8, domiporta: 26.

Nowe ogłoszenia dodane do offers.json: 11 (6 nieruchomosci-online, 4 adresowo, 1 domiporta).
Powiadomienie push: WYSŁANE (11 genuinie nowych ogłoszeń, żadne źródło nie było
bootstrapem).
offers.json: rozbudowany z 109 do 120 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-08-30 na górze z wyróżnieniem.

## 2026-09-01 08:48 CEST

Status per źródło:
- otodom: error — HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 6 found, 2 nowe URL-e, oba odrzucone — przekroczyły limit
  1 200 000 zł (Dereniowa Jabłonna 1 250 000 zł, Szkolna Jabłonna 1 270 000 zł), 0 dodanych
- olx: ok, 31 found, wszystkie 31 to mirrory otodom.pl (zablokowane) — pominięte, 0 new
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 35 found, 27 nowych URL-i, 26 odrzuconych — przekroczyły limit
  1 200 000 zł (ceny od 1 248 900 zł do 2 890 000 zł, w tym dwie oferty "Osiedle Słoneczna
  27-29" po 2 000 000 zł ze znanym błędem danych cena/m2), 1 dodany (Warszawa Białołęka,
  Dębowa, 900 000 zł)
- adresowo: ok, 7 found, 0 nowych URL-i (wszystkie już znane)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert spełniających wybrane kryteria"), 0 new
- rynekpierwotny: ok, 0 found ("Nie znaleźliśmy ofert w podanych przez Ciebie kryteriach"), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 2, domiporta: 26.

Nowe ogłoszenia dodane do offers.json: 1 (domiporta).
Powiadomienie push: WYSŁANE (1 genuinie nowe ogłoszenie, żadne źródło nie było bootstrapem).
offers.json: rozbudowany z 120 do 121 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-09-01 na górze z wyróżnieniem.

## 2026-09-04 10:38 CEST

Status per źródło:
- otodom: error — HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 41 found, 12 nowych URL-i, 5 dodanych, 7 odrzuconych —
  przekroczyły limit 1 200 000 zł (Kiełpin/Brzegowa 1 235 000 zł, Kępa Kiełpińska
  1 345 000 zł, Dereniowa Jabłonna 1 250 000 zł, Kiełpin 1 225 000 zł, Kiełpin
  Poduchowny 1 215 000 zł, Kochanowskiego Legionowo 1 299 000 zł, Kępa Kiełpińska
  1 250 000 zł)
- olx: ok, 29 found, wszystkie 29 to mirrory otodom.pl (zablokowane) — pominięte, 0 new
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 3 found, 2 nowe URL-e, oba odrzucone — przekroczyły limit 1 200 000 zł
  (Jabłonna 170m2 1 420 000 zł, Jabłonna 221m2 1 990 000 zł), 0 dodanych
- adresowo: ok, 39 found, 1 nowy URL, dodany (Wieliszew, Skrzeszew, ul. Kościelna,
  1 199 000 zł — tuż pod limitem)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found, dodany (inwestycja PK Development, ul. Złotej Renaty
  Jabłonna, 23 lokale 404 718–1 159 930 zł, oferta oznaczona jako nieaktywna — pod
  limitem, dodana mimo statusu nieaktywnej dla kompletności rejestru)
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 7, domiporta: 2.

Nowe ogłoszenia dodane do offers.json: 7 (5 nieruchomosci-online, 1 adresowo,
1 rynekpierwotny).
Powiadomienie push: WYSŁANE (7 genuinie nowych ogłoszeń, żadne źródło nie było
bootstrapem).
offers.json: rozbudowany z 121 do 128 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-09-04 na górze z wyróżnieniem.

## 2026-09-07 08:40 CEST

Status per źródło:
- otodom: error — HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 41 found, 6 nowych URL-i, wszystkie 6 odrzucone —
  przekroczyły limit 1 200 000 zł (Kiełpin/Brzegowa 1 235 000 zł, Jabłonna/Szkolna
  1 270 000 zł, Jabłonna/Dereniowa 1 250 000 zł, Kępa Kiełpińska/Gajowa 1 345 000 zł,
  Łomianki Dolne/Kościelna Droga 1 350 000 zł, Legionowo/Grudzie 1 250 000 zł),
  0 dodanych
- olx: ok, 69 found, wszystkie to mirrory otodom.pl (zablokowane) — pominięte, 0 new
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 35 found, 26 nowych URL-i, wszystkie 26 odrzucone — przekroczyły
  limit 1 200 000 zł (ceny od 1 248 500 zł do 2 890 000 zł, w tym ponownie dwie
  oferty "Osiedle Słoneczna 27-29" po 2 000 000 zł / 999 zł/m2), 0 dodanych
- adresowo: ok, 39 found, 2 nowe URL-e, oba pod limitem — dodane (Stanisławów
  Pierwszy/Konwaliowa 1 130 000 zł; Warszawa Wawer/Panoramy 690 000 zł)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 6, domiporta: 26.

Nowe ogłoszenia dodane do offers.json: 2 (adresowo: Stanisławów Pierwszy/Konwaliowa,
Warszawa Wawer/Panoramy).
Powiadomienie push: WYSŁANE (2 genuinie nowe ogłoszenia, adresowo nie było
bootstrapem).
offers.json: rozbudowany z 128 do 130 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-09-07 na górze z wyróżnieniem.

## 2026-09-08 09:00 CEST

Status per źródło:
- otodom: error — HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 41 found, 9 nowych URL-i, 2 dodane (Legionowo
  26950292 i 26949640, oba 799 000 zł / 118,43 m2 — najwyraźniej duplikat tej
  samej nieruchomości pod dwoma ID), 7 odrzuconych — przekroczyły limit
  1 200 000 zł (Kiełpin/Brzegowa 1 235 000 zł, Kępa Kiełpińska/umeblowany
  1 345 000 zł, Jabłonna/Szkolna 1 270 000 zł, Jabłonna/Dereniowa 1 250 000 zł,
  Kępa Kiełpińska/parking 1 250 000 zł, Kępa Kiełpińska/Gajowa 1 345 000 zł,
  Kiełpin Poduchowny/Brzegowa 1 215 000 zł)
- olx: ok, 69 found, wszystkie to mirrory otodom.pl (zablokowane) — pominięte, 0 new
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 27 nowych URL-i, wszystkie 27 odrzucone — przekroczyły
  limit 1 200 000 zł (ceny od 1 350 000 zł do 2 890 000 zł, w tym ponownie dwie
  oferty "Osiedle Słoneczna 27-29" po 2 000 000 zł / 999 zł/m2), 0 dodanych
- adresowo: ok, 39 found, 5 nowych URL-i, wszystkie pod limitem — dodane
  (Kiełpin/Łomianki 1 180 000 zł; Legionowo/Zbigniewa Herberta 899 000 zł;
  Warszawa Wawer/Wodniaków 1 100 000 zł; Marki/Leopolda Lisa-Kuli 1 090 000 zł;
  Kobyłka Zalasek/Radzymińska 1 050 000 zł)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 7, domiporta: 27.

Nowe ogłoszenia dodane do offers.json: 7 (2 nieruchomosci-online, 5 adresowo).
Powiadomienie push: WYSŁANE (7 genuinie nowych ogłoszeń, żadne źródło nie było
bootstrapem).
offers.json: rozbudowany z 130 do 137 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-09-08 na górze z wyróżnieniem.

## 2026-09-09 08:21 CEST

Status per źródło:
- otodom: error — HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 6 found (wąski promień, tylko Jabłonna), 2 nowych URL-i,
  oba odrzucone — przekroczyły limit 1 200 000 zł (Jabłonna/Szkolna 1 270 000 zł,
  Jabłonna/Dereniowa 1 250 000 zł), 0 dodanych
- olx: ok, 69 found, wszystkie to mirrory otodom.pl (zablokowane) — pominięte, 0 new
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 27 nowych URL-i, wszystkie 27 odrzucone — przekroczyły
  limit 1 200 000 zł (ceny od 1 250 000 zł do 2 890 000 zł, w tym ponownie dwie
  oferty "Osiedle Słoneczna 27-29" po 2 000 000 zł / 999 zł/m2), 0 dodanych
- adresowo: ok, 39 found, 0 nowych URL-i (wszystkie już znane)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 2, domiporta: 27.

Nowe ogłoszenia dodane do offers.json: 0.
Powiadomienie push: BRAK (żadna nowa oferta pod limitem budżetu).
offers.json: bez zmian, 137 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json (bez zmian w treści poza
znacznikiem czasu aktualizacji), sekcja 2026-09-08 nadal na górze z wyróżnieniem.

## 2026-09-14 (uruchomienie watchera)

Status per źródło:
- otodom: error — HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 39 found, 12 nowych URL-i, 4 dodane (Aleja Legionów
  Legionowo 899 000 zł; Kiełpin/Krzyczkowskiego 999 000 zł; Legionowo 26951527 i
  26951506, oba 799 000 zł / 118,43 m2 — kolejny przypadek prawdopodobnego
  duplikatu tej samej nieruchomości pod dwoma ID), 8 odrzuconych — przekroczyły
  limit 1 200 000 zł (Legionowo/Projektowana 1 289 000 zł, Kiełpin Poduchowny/
  Brzegowa 1 235 000 zł, Jabłonna/Dereniowa 1 250 000 zł, Łomianki Dolne/Kościelna
  Droga 1 298 000 zł x2, Legionowo/Grudzie 1 250 000 zł, Kiełpin/Brzegowa
  1 225 000 zł, Kępa Kiełpińska 1 345 000 zł)
- olx: blocked — HTTP 403 Forbidden na stronie wyników (pierwszy raz zablokowana
  cała strona wyników, nie tylko mirrory otodom), 0 found, 0 new
- morizon: error — "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 27 nowych URL-i, wszystkie 27 odrzucone — przekroczyły
  limit 1 200 000 zł (ceny od 1 350 000 zł do 2 890 000 zł, w tym ponownie dwie
  oferty "Osiedle Słoneczna 27-29" po 2 000 000 zł / 999 zł/m2), 0 dodanych
- adresowo: ok, 39 found, 5 nowych URL-i, wszystkie pod limitem — dodane
  (Warszawa Rembertów/Poświętna 890 000 zł; Marki Struga/Długa 925 000 zł;
  Topolina/Żabi Chór 750 000 zł; Stare Załubice 280 000 zł; Cybulice/Borkowa
  599 999 zł)
- gethome: ok, 0 found ("Nie znaleźliśmy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: error — "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budżetu (>1 200 000 zł) per źródło:
nieruchomosci-online: 8, domiporta: 27.

Nowe ogłoszenia dodane do offers.json: 9 (4 nieruchomosci-online, 5 adresowo).
Powiadomienie push: WYSŁANE (9 genuinie nowych ogłoszeń, żadne źródło nie było
bootstrapem).
offers.json: rozbudowany z 137 do 146 ofert.
index.html: zregenerowany w pełni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-09-14 na górze z wyróżnieniem.

## 2026-09-17 09:57 UTC

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 39 found (mid-range broad-radius), 8 new URLs, 3 pod cap dodane, 5 ponad cap odrzucone (1.289M, 1.235M, 1.27M, 1.298M x2 — dwa ostatnie to znów duplikat tej samej nieruchomości Kościelna Droga/Łomianki Dolne pod dwoma ID)
- olx: blocked (effectively) — 65 linków znalezionych na stronie wyszukiwania, 100% to mirrory otodom.pl (0 natywnych olx.pl), więc niemożliwe do pobrania szczegółów — pominięte, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 27 new URLs, 0 pod cap dodane (wszystkie 27 ponad cap, 1.35M–2.89M; w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M)
- adresowo: ok — 38 found, 0 new (wszystkie już znane — kolejny "cichy dzień" jak 09-09)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 5
- domiporta: 27

Nowe ogłoszenia dodane i zgłoszone push: 3 (wszystkie nieruchomosci-online)
1. Warszawska, Legionowo — 670000 zl — dom 260m2 / dzialka 525m2
2. Graniczna, Legionowo — 1199000 zl — dom 96.25m2 / dzialka 110m2
3. Arena, Legionowo — 999000 zl — dom 131m2 / dzialka 450m2

offers.json: zaktualizowany (+3 wpisy, nieruchomosci-online: 63→66). Łącznie ofert: 149.
index.html: zregenerowany (11 sekcji dat, najnowsza 17 września 2026 wyróżniona).

## 2026-09-18 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 40 found (mid-range broad-radius), 5 new URLs, 1 pod cap dodany, 4 ponad cap odrzucone (1.289M Projektowana Legionowo, 1.345M Kępa Kiełpińska, 1.235M Brzegowa Kiełpin Poduchowny, 1.25M Dereniowa Jabłonna)
- olx: blocked (effectively) — 35 linków znalezionych na stronie wyszukiwania, 100% to mirrory otodom.pl (0 natywnych olx.pl), niemożliwe do pobrania szczegółów — pominięte, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 27 new URLs, 1 pod cap dodany, 26 ponad cap odrzucone (1.199M–2.89M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod nowym ID 682936)
- adresowo: ok — 39 found, 0 new (wszystkie już znane — kolejny "cichy dzień")
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 4
- domiporta: 26

Nowe ogłoszenia dodane i zgłoszone push: 2
1. Różana, Kiełpin, Łomianki (nieruchomosci-online) — 1099000 zl — dom 80.98m2 / dzialka 400m2
2. Łomianki (domiporta) — 1199000 zl — dom 172m2 / dzialka 180m2

offers.json: zaktualizowany (+2 wpisy: nieruchomosci-online 66→67, domiporta 12→13). Łącznie ofert: 151.
index.html: zregenerowany (12 sekcji dat, najnowsza 18 września 2026 wyróżniona).

## 2026-09-21 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 41 found (mid-range broad-radius), 10 new URLs, 2 pod cap dodane, 8 ponad cap odrzucone (1.289M Projektowana Legionowo, 1.298M Kościelna Droga Łomianki Dolne, 1.25M Dereniowa Jabłonna, 1.235M Brzegowa Kiełpin Poduchowny, 1.35M Kościelna Droga Łomianki Dolne, 1.25M Kępa Kiełpińska, 1.225M Brzegowa Kiełpin, 1.27M Szkolna Jabłonna)
- olx: blocked (effectively) — 72 linki znalezione na stronie wyszukiwania, 100% to mirrory otodom.pl (0 natywnych olx.pl), niemożliwe do pobrania szczegółów — pominięte, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 26 new URLs, 1 pod cap dodany, 25 ponad cap odrzucone (1.199M–2.89M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 2 new URLs, 2 pod cap dodane (Pomiechówek/Młodości 740k, Kobyłka 999k)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 8
- domiporta: 25

Nowe ogłoszenia dodane i zgłoszone push: 5
1. Kiełpin, Łomianki (nieruchomosci-online) — 880000 zl — dom 126m2 / dzialka 470m2
2. Warszawska, Legionowo (nieruchomosci-online) — 1180000 zl — dom 170m2 / dzialka 708m2
3. Łomianki (domiporta, nowe ID 156846384 — powtórka istniejącej oferty 156823315) — 1199000 zl — dom 172m2 / dzialka 180m2
4. ul. Młodości 5, Pomiechówek (adresowo) — 740000 zl — dom 120m2 / dzialka 705m2
5. Kobyłka (adresowo) — 999000 zl — dom 105m2 / dzialka 460m2

offers.json: zaktualizowany (+5 wpisów: nieruchomosci-online 67→69, domiporta 13→14, adresowo 64→66). Łącznie ofert: 156.
index.html: zregenerowany (13 sekcji dat, najnowsza 21 września 2026 wyróżniona).

## 2026-09-22 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — pierwsza próba timeout (60s), retry udany — 5 found (wąski, ciasny promień jak 09-01/09-09), 1 new URL, 0 pod cap dodanych, 1 ponad cap odrzucony (1.25M, Dereniowa Jabłonna)
- olx: blocked (effectively) — 72 linki znalezione na stronie wyszukiwania, 100% to mirrory otodom.pl (0 natywnych olx.pl), niemożliwe do pobrania szczegółów — pominięte, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 35 found, 25 new URLs, 0 pod cap dodanych, 25 ponad cap odrzuconych (1.35M–2.89M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 3 new URLs, 3 pod cap dodane (Warszawa Rembertów 850k, Serock/Włoska 590k, Legionowo/Skorupki 849k)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 1
- domiporta: 25

Nowe ogłoszenia dodane i zgłoszone push: 3
1. Rembertów, Warszawa (adresowo) — 850000 zl — dom 90m2 / dzialka 498m2
2. ul. Włoska, Serock (adresowo) — 590000 zl — dom 50.2m2 / dzialka 1950m2
3. ul. ks. Jana Ignacego Skorupki, Legionowo (adresowo) — 849000 zl — dom 110m2 / dzialka 888m2

offers.json: zaktualizowany (+3 wpisy: adresowo 66→69). Łącznie ofert: 159.
index.html: zregenerowany (14 sekcji dat, najnowsza 22 września 2026 wyróżniona).

## 2026-09-23 08:28 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 39 found (ciasny promień), 5 new URLs, 2 pod cap dodane, 3 ponad cap odrzucone (1.289M Projektowana/Legionowo, 1.25M Kępa Kiełpińska, 1.27M Szkolna/Jabłonna)
- olx: ok — strona wyszukiwania zadziałała, znaleziono linki głównie mirrory otodom.pl (zablokowane, pominięte) + 1 natywny link olx.pl/d/oferta — pod cap, dodany
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 35 found, 25 new URLs, 0 pod cap dodanych, 25 ponad cap odrzuconych (1.25M–2.89M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 3 new URLs, 3 pod cap dodane (Wieliszew 285k, Radzymin/Weteranów 950k, Pomiechówek/Czarnowo 850k)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 3
- domiporta: 25

Nowe ogłoszenia dodane i zgłoszone push: 6
1. Skorupki, Legionowo (nieruchomosci-online) — 849000 zl — dom 110m2 / dzialka 888m2
2. Legionowo, legionowski (nieruchomosci-online) — 1090000 zl — dom 148m2 / dzialka 200m2 (powtórka istniejącej oferty 26612946)
3. Łomianki, Dąbrowa (olx) — 1095000 zl — dom 117m2 / dzialka 250m2
4. Wieliszew (adresowo) — 285000 zl — dom 108m2 / dzialka 1000m2
5. ul. Weteranów, Radzymin (adresowo) — 950000 zl — dom 111.3m2 / dzialka 1541m2
6. Czarnowo, gmina Pomiechówek (adresowo) — 850000 zl — dom 131m2 / dzialka 723m2

offers.json: zaktualizowany (+6 wpisów: nieruchomosci-online 69→71, olx 6→7, adresowo 69→72). Łącznie ofert: 165.
index.html: zregenerowany (15 sekcji dat, najnowsza 23 września 2026 wyróżniona).

## 2026-09-24 10:29 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 41 found (timeout na 1. próbie, sukces po retry), 7 new URLs, 0 pod cap dodanych, 7 ponad cap odrzuconych (1.225M–1.298M, ciasny klaster tuż nad limitem)
- olx: error — timeout (60s) na obu próbach, pominięto na ten run
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 25 new URLs, 0 pod cap dodanych, 25 ponad cap odrzuconych (1.3M–2.89M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 0 new URLs (wszystkie już znane)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 7
- domiporta: 25

Nowe ogłoszenia dodane i zgłoszone push: 0 (rzadki w pełni pusty run — wszystkie nowo znalezione URL-e ponad cap)

offers.json: bez zmian (0 dodanych). Łącznie ofert: 165.
index.html: zregenerowany (15 sekcji dat, znacznik czasu zaktualizowany, najnowsza 23 września 2026 nadal wyróżniona jako najświeższa).

## 2026-09-28 08:38 (lokalny czas uruchomienia)

Uwaga: offers.json zawierał 2 nieskomitowane wpisy sprzed tego runu (domiporta 156826475 Kiełpin/Różana i adresowo o6w6y8 Warszawa 72m2, oba first_seen 2026-09-25) — najwyraźniej z przerwanego/niedokończonego runu 09-25, którego nie było w historii commitów. Zachowano je i uwzględniono w porównaniu z nowymi URL-ami, dołączone do commita tego runu.

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 5 found, 1 new URL, 0 pod cap dodanych, 1 ponad cap odrzucony (1.25M)
- olx: ok — 39 links, 38 otodom.pl mirrors (pominięte, zablokowane) + 1 olx.pl-native (już znany), 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 35 found, 24 new URLs, 1 pod cap dodany, 23 ponad cap odrzucone (1.299M–2.99M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 0 new URLs (wszystkie już znane; jeden wpis miał zniekształcony slug "konwaliowej" vs "konwaliowa" dla tego samego sufiksu u0f7c7 — potraktowano jako znany, nie nowy)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 1
- domiporta: 23

Nowe ogłoszenia dodane i zgłoszone push: 1
1. Józefów, Orzechowa (domiporta) — 799000 zl — dom 113.9m2 / dzialka 170m2

offers.json: zaktualizowany (+1 wpis tego runu, +2 wpisy z niedokończonego runu 09-25: domiporta 15→16, adresowo 72→73). Łącznie ofert: 168.
index.html: zregenerowany (17 sekcji dat, najnowsza 28 września 2026 wyróżniona).

## 2026-09-29 09:37 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 41 found, 6 new URLs, 1 pod cap dodany (Kolejowa, Legionowo, 899.9k), 5 ponad cap odrzuconych (1.235M–1.289M)
- olx: ok — 39 links, 30 otodom.pl mirrors (pominięte) + 9 olx.pl-native, wszystkie 9 nowe i wszystkie 9 pod cap dodane — najlepszy haul olx.pl-native od dawna
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 23 new URLs, 0 pod cap dodanych, 23 ponad cap odrzucone (1.299M–2.99M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 1 new URL, pod cap dodany (Borzęcin Duży/Ukośna, 1.15M)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 5
- domiporta: 23

Nowe ogłoszenia dodane i zgłoszone push: 10
1. Kolejowa, Legionowo (nieruchomosci-online) — 899900 zl — dom 105.60m2 / dzialka 25m2
2. ul. Parkowa, Legionowo (olx) — 830000 zl — dom 70m2 / dzialka 780m2
3. Bukowiec, Legionowo (olx) — 880000 zl — dom 140m2 / dzialka 536m2
4. ul. 1 Maja, Jabłonna (olx) — 1190000 zl — dom 119m2 / dzialka 410m2
5. ul. Zbigniewa Herberta, Legionowo (olx) — 899000 zl — dom 65m2 / dzialka 90m2
6. Równe, gmina Strachówka (olx) — 350000 zl — dom 70m2 / dzialka 900m2
7. Warszawa, Białołęka - dom kontenerowy (olx) — 140000 zl — dom 72m2 / dzialka -
8. Warszawa, Białołęka (olx) — 980000 zl — dom 120m2 / dzialka 200m2
9. Izabelin-Dziekanówek (olx) — 749000 zl — dom 100m2 / dzialka 3600m2
10. ul. Ukośna, Borzęcin Duży (adresowo) — 1150000 zl — dom 130.8m2 / dzialka 414m2

offers.json: zaktualizowany (+10 wpisów: nieruchomosci-online 71→72, olx 7→15, adresowo 73→74). Łącznie ofert: 178.
index.html: zregenerowany (18 sekcji dat, najnowsza 29 września 2026 wyróżniona).

## 2026-09-30 08:07 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 41 found, 7 new URLs, 0 pod cap dodanych, 7 ponad cap odrzuconych (1.235M–1.289M) — w tym kolejny duplikat tej samej nieruchomości (Brzegowa, Kiełpin/Kiełpin Poduchowny, 1.235M/151m2) pod dwoma różnymi ID (26964356 i 25899131)
- olx: ok — 71 links, wszystkie 71 to otodom.pl mirrors (pominięte, zablokowane), 0 olx.pl-native, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 23 new URLs, 0 pod cap dodanych, 23 ponad cap odrzucone (1.299M–2.99M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 0 new URLs (wszystkie już znane)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 7
- domiporta: 23

Nowe ogłoszenia dodane i zgłoszone push: 0 (brak nowych ofert pod cap — rzadki "cichy" run, podobnie jak 09-09 i 09-24)

offers.json: bez zmian (0 nowych wpisów). Łącznie ofert: 178.
index.html: zregenerowany (18 sekcji dat, najnowsza 29 września 2026 wyróżniona, sama aktualizacja znacznika czasu).

## 2026-10-01 18:58 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 5 found, 1 new URL, 0 pod cap dodanych, 1 ponad cap odrzucony (1.25M, Dereniowa, Jabłonna)
- olx: ok — wszystkie znalezione linki to otodom.pl mirrors (pominięte, zablokowane), 0 olx.pl-native, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 35 found, 25 new URLs, 1 pod cap dodany (Józefów, Złota, 1.07M), 24 ponad cap odrzucone (1.299M–2.99M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 38 found, 2 new URLs, 2 pod cap dodane (Chotomów 1.11M, ul. Parkowa/Legionowo 830k)
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 1
- domiporta: 24

Nowe ogłoszenia dodane i zgłoszone push: 3
1. Józefów, Złota (domiporta) — 1070000 zl — dom 115.19m2 / dzialka 375m2
2. Chotomów, gmina Jabłonna (adresowo) — 1110000 zl — dom 116.8m2 / dzialka 500m2
3. ul. Parkowa, Legionowo (adresowo) — 830000 zl — dom 70m2 / dzialka 780m2

offers.json: zaktualizowany (+3 wpisy: domiporta 16→17, adresowo 74→76). Łącznie ofert: 181.
index.html: zregenerowany (19 sekcji dat, najnowsza 1 października 2026 wyróżniona).

## 2026-10-02 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 41 found, 12 new URLs, 1 pod cap dodany (Legionowo, 899k/127m2, duplikat adresowy "Aleja Legionów" pod kolejnym nowym ID), 11 ponad cap odrzuconych (1.215M–1.35M, w tym duplikat-para Brzegowa/Kiełpin Poduchowny IDs 26964356+25899131 znana z 09-30, oba ponad cap)
- olx: ok — strona wyszukiwania działała, 38 linków, 100% otodom.pl mirrors (0 olx.pl-native) — pominięte jako zablokowane, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 27 new URLs, 2 pod cap dodane (Skrzeszew/Modlińska, 965k/163m2, dwa różne ID dla tej samej nieruchomości), 25 ponad cap odrzuconych (1.225M–2.99M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found, 1 new URL znaleziony ale to kolejny slug-drift wariant znanego "dom-zielonka-220-m2-n8f2s4" (sufiks n8f2s4), nie liczony jako nowa oferta, 0 new
- gethome: ok — 0 found (brak ofert spełniających kryteria), 0 new
- rynekpierwotny: ok — 1 found (ta sama inwestycja PK Development co poprzednio), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 11
- domiporta: 25

Nowe ogłoszenia dodane i zgłoszone push: 3
1. Legionowo (nieruchomosci-online) — 899000 zl — dom 127m2 / dzialka 25m2
2. Skrzeszew (domiporta) — 965000 zl — dom 163m2 / dzialka 450m2
3. Skrzeszew, Modlińska (domiporta) — 965000 zl — dom 163m2 / dzialka 450m2

offers.json: zaktualizowany (+3 wpisy: nieruchomosci-online 72→73, domiporta 17→19). Łącznie ofert: 184.
index.html: zregenerowany (20 sekcji dat, najnowsza 2 października 2026 wyróżniona).

## 2026-10-03 12:34 (lokalny czas uruchomienia)

Status per źródło:
- otodom: blocked — HTTP 403 na stronie wyszukiwania, 0 found, 0 new
- nieruchomosci-online: ok — 7 found, 3 new URLs, 0 pod cap, 3 ponad cap odrzucone (1.25M–1.27M)
- olx: ok — pierwsza próba błąd API (DNS), ponowienie ok; 15 linków, wszystkie otodom.pl mirrors (0 olx.pl-native) — pominięte jako zablokowane, 0 new
- morizon: blocked — "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok — 36 found, 27 new URLs, 1 pod cap dodane (Łomianki/Brzezińskiego, 899999 zł, 101.70 m2), 26 ponad cap odrzucone (1.299M–2.99M, w tym ponownie "Osiedle Słoneczna 27-29" za 2.35M pod ID 682936)
- adresowo: ok — 39 found (dwie nieudane próby: błąd API i uśpienie komputera, trzecia ok), 3 new URLs: 2 dodane (Pomiechówek x1e0i2, 999k; Kobyłka/Skrzetuskiego j6x4f6, 850k), 1 slug-drift (dom-zielonka-ul-wiejska-n8f2s4 vs znane n8f2s4) — nie liczony jako nowa oferta
- gethome: ok — 0 found, 0 new
- rynekpierwotny: ok — 1 found (ta sama PK Development "Złota Jabłonna", nieaktywna), 0 new
- oferty-net: blocked — "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu przekroczenia budżetu (>1.2M zł) per źródło:
- nieruchomosci-online: 3
- domiporta: 26

Nowe ogłoszenia dodane: 3
1. Pomiechówek (adresowo) — 999000 zl — dom 144m2 / dzialka 170m2
2. Kobyłka, ul. Skrzetuskiego (adresowo) — 850000 zl — dom 67.23m2 / dzialka 200m2
3. Łomianki, Brzezińskiego (domiporta) — 899999 zl — dom 101.70m2 / dzialka 290m2

Push: wysłanie nieudane — PushNotification zwróciło "Remote Control inactive" (brak połączenia z telefonem), treść: 3 nowe oferty + link do strony.

offers.json: zaktualizowany (+3 wpisy: domiporta 19→20, adresowo 76→78). Łącznie ofert: 187.
index.html: zregenerowany (21 sekcji dat, najnowsza 3 października 2026 wyróżniona).

## 2026-10-04 08:44 CEST

- otodom: blocked (HTTP 403), skipped
- nieruchomosci-online: ok, 41 found, 7 new, 0 under cap
- olx: ok, 40 found (100% otodom.pl mirrors, 0 native), 0 new
- morizon: blocked (unable to fetch), skipped
- domiporta: ok, 36 found, 26 new, 0 under cap (skipped-over-cap count: 26)
- adresowo: ok, 39 found, 2 new (1 was slug-drift variant of known dom-zielonka-220-m2-n8f2s4, not counted), 1 under cap -> added
- gethome: ok, 0 found (no matching offers)
- rynekpierwotny: ok, 1 found (already known PK Development listing), 0 new
- oferty-net: blocked (unable to fetch), skipped

Nowe oferty z powiadomieniem:
- ul. Mieszka I, Kobyłka Zalasek, powiat wołomiński - 1 050 000 zł - dom 85m2 / dzialka 87m2 - https://adresowo.pl/o/dom-kobylka-ul-mieszka-i-b6g4q7

## 2026-10-06 10:36 CEST

- otodom: blocked (HTTP 403), skipped
- nieruchomosci-online: ok, 7 found, 3 new, 0 under cap (over-cap count: 3; 1.25M-1.27M)
- olx: ok, search page loaded, all links were otodom.pl mirrors (blocked), 0 olx.pl-native, 0 new
- morizon: blocked (unable to fetch), skipped
- domiporta: ok, 36 found, 26 new, 0 under cap (over-cap count: 26; 1.25M-2.99M)
- adresowo: ok, 39 found, 1 "new" URL = slug-drift of known dom-zielonka-220-m2-n8f2s4 (n8f2s4), not counted, 0 new
- gethome: ok, 0 found, 0 new
- rynekpierwotny: ok, 1 found (known inactive PK Development listing), 0 new
- oferty-net: blocked (unable to fetch), skipped

Liczba ofert odrzuconych z powodu przekroczenia budzetu (>1.2M zl) per zrodlo:
- nieruchomosci-online: 3
- domiporta: 26

Nowe ogloszenia dodane: 0. Push: nie wysylano (brak nowych ofert).

offers.json: bez zmian (188 ofert lacznie). index.html: zregenerowany (22 sekcje dat).

## 2026-10-07 (local run)

- otodom: blocked (HTTP 403), skipped
- nieruchomosci-online: ok, 6 found, 2 new, 0 under cap (over-cap count: 2; 1.26M-1.27M)
- olx: ok, search page loaded, 69 links, 100% otodom.pl mirrors (0 native), 0 new
- morizon: blocked (unable to fetch), skipped
- domiporta: ok, 35 found, 28 new, 2 under cap -> added (over-cap count: 26; recurring "Osiedle Sloneczna 27-29" ID 682936 recurred again at 2.35M, still over cap)
- adresowo: ok, 39 found, 1 "new" URL = slug-drift of known dom-zielonka-220-m2-n8f2s4 (now dom-zielonka-ul-wiejska-n8f2s4), not counted, 0 new
- gethome: ok, 0 found, 0 new
- rynekpierwotny: ok, 1 found (known inactive PK Development listing), 0 new
- oferty-net: blocked (unable to fetch), skipped

Liczba ofert odrzuconych z powodu przekroczenia budzetu (>1.2M zl) per zrodlo:
- nieruchomosci-online: 2
- domiporta: 26

Nowe oferty z powiadomieniem (duplikat tej samej nieruchomosci pod 2 ID, znany wzorzec powtarzania ofert domiporta):
- Łomianki, Brzezińskiego - 899999 zl - dom 134.94m2 / dzialka 290m2 - https://www.domiporta.pl/nieruchomosci/sprzedam-dom-lomianki-brzezinskiego-135m2/156947552
- Łomianki, Brzezińskiego - 949000 zl - dom 134.94m2 / dzialka 318m2 - https://www.domiporta.pl/nieruchomosci/sprzedam-dom-lomianki-brzezinskiego-135m2/156947551

offers.json: zaktualizowany (+2 wpisy: domiporta 20->22). Łącznie ofert: 190.
index.html: zregenerowany (23 sekcje dat, najnowsza 7 pazdziernika 2026 wyróżniona).

## 2026-10-09 10:54 CEST (local run)

- otodom: blocked (HTTP 403), skipped
- nieruchomosci-online: ok, 40 found, 11 new, 3 under cap -> added (over-cap count: 8; 1.225M-1.289M; includes known Kielpin Poduchowny/Brzegowa duplicate ID 26964356, pair partner 25899131, still over cap)
- olx: ok, search page loaded, 100% otodom.pl mirrors (0 native), 0 new
- morizon: blocked (unable to fetch), skipped
- domiporta: ok, 35 found (first attempt failed with transient "computer went to sleep" error, succeeded on retry), 28 new, 0 under cap (over-cap count: 28; 1.299M-2.99M, driven by a batch of large Lomianki/Bialoleka houses 110-503m2; recurring "Osiedle Sloneczna 27-29" ID 682936 recurred again at 2.35M, still over cap)
- adresowo: ok, 39 found, 2 genuinely new (both under cap, added); 1 other "new" slug was the familiar dom-zielonka-ul-wiejska-n8f2s4 drift of dom-zielonka-220-m2-n8f2s4, not counted
- gethome: ok, 0 found ("Nie znalezlismy ofert..."), 0 new
- rynekpierwotny: ok, 1 found (known inactive PK Development listing), 0 new
- oferty-net: blocked (unable to fetch), skipped

Liczba ofert odrzuconych z powodu przekroczenia budzetu (>1.2M zl) per zrodlo:
- nieruchomosci-online: 8
- domiporta: 28

Nowe ogloszenia z powiadomieniem:
- Jablonna, legionowski, mazowieckie - 1150000 zl - dom 138m2 / dzialka 372m2 - https://jablonna.nieruchomosci-online.pl/dom,na-sprzedaz/27026930.html
- Legionowo, legionowski, mazowieckie - 899000 zl - dom 127m2 / dzialka 25m2 - https://legionowo.nieruchomosci-online.pl/dom,na-sprzedaz/27026748.html (duplikat znanego wzorca "Aleja Legionow" 899k/127m2, kolejne ID)
- Ludwisin, Legionowo, mazowieckie - 999000 zl - dom 140m2 / dzialka 500m2 - https://legionowo.nieruchomosci-online.pl/dom,na-sprzedaz/27020458.html
- ul. Okolna, Chotomow, gmina Jablonna - 1100000 zl - dom 150m2 / dzialka 1200m2 - https://adresowo.pl/o/dom-jablonna-chotomow-ul-okolna-k3e4h5
- Stasi Las, gmina Serock - 988000 zl - dom 254m2 / dzialka 863m2 - https://adresowo.pl/o/dom-serock-stasi-las-254-m2-t1r6d1

offers.json: zaktualizowany (+5 wpisy: nieruchomosci-online 73->76, adresowo 79->81). Lacznie ofert: 195.
index.html: zregenerowany (24 sekcje dat, najnowsza 9 pazdziernika 2026 wyrozniona).

## 2026-10-10 12:37 CEST (local run)

- otodom: blocked (HTTP 403), skipped
- nieruchomosci-online: ok, 41 found, 8 new, 0 under cap (over-cap count: 8; 1.225M-1.298M; includes known Kielpin Poduchowny/Brzegowa duplicate ID 26964356, pair partner 25899131, still over cap)
- olx: ok, search page loaded, 100% otodom.pl mirrors (0 native), 0 new
- morizon: blocked (unable to fetch), skipped
- domiporta: ok, 36 found, 28 new, 0 under cap (over-cap count: 28; 1.3M-2.99M; driven by a batch of large Chotomow/Kielpin/Lomianki/Legionowo/Warszawa Bialoleka houses 110-503m2; includes triple-posted Mehoffera 133m2 under 3 IDs 156201384/156201390/156201399 at 3 different prices 1.57M-1.66M; recurring "Osiedle Sloneczna 27-29" ID 682936 recurred again at 2.35M, still over cap, still never added)
- adresowo: ok, 38 found, 0 genuinely new (1 "new" slug was the familiar dom-zielonka-ul-wiejska-n8f2s4 drift of dom-zielonka-220-m2-n8f2s4, not counted)
- gethome: ok, 0 found ("Nie znalezlismy ofert..."), 0 new
- rynekpierwotny: ok, 1 found (known inactive PK Development listing, same URL as on file), 0 new
- oferty-net: blocked (unable to fetch), skipped

Liczba ofert odrzuconych z powodu przekroczenia budzetu (>1.2M zl) per zrodlo:
- nieruchomosci-online: 8
- domiporta: 28

Nowe ogloszenia z powiadomieniem: brak (wszystkie nowo znalezione oferty przekroczyly budzet lub nie byly rzeczywiscie nowe).

offers.json: bez zmian (0 nowych wpisow). Lacznie ofert: 195.
index.html: zregenerowany (24 sekcje dat, najnowsza 9 pazdziernika 2026 wyrozniona, bez zmian w danych - tylko timestamp).

## 2026-10-11 10:31 CEST (local run)

- otodom: blocked (HTTP 403), skipped
- nieruchomosci-online: ok, first attempt failed with transient "computer went to sleep mid-response" error, succeeded on retry; 41 found, 11 new, 0 under cap (over-cap count: 11; 1.215M-1.35M; includes known Kielpin Poduchowny/Brzegowa duplicate pattern again under new ID 26892344 alongside the already-known 26964356, both still over cap)
- olx: ok, search page loaded, 40 links returned, 100% otodom.pl mirrors (0 native) - confirmed blocked via a direct fetch retry on one mirror link, all 40 skipped as unfetchable, 0 new
- morizon: blocked (unable to fetch), skipped
- domiporta: ok, 36 found, 28 new, 0 under cap (over-cap count: 28; 1.3M-2.99M; driven by a large batch of Lomianki/Chotomow/Kielpin Poduchowny/Warszawa Bialoleka/Legionowo/Jozefow houses 110-503m2; includes triple-posted Mehoffera 133m2 again under 3 IDs 156201384/156201390/156201399 at 3 different prices 1.57M-1.66M; recurring "Osiedle Sloneczna 27-29" ID 682936 recurred again at 2.35M, still over cap, still never added)
- adresowo: ok, 39 found, 0 genuinely new (all already known)
- gethome: ok, 0 found ("Nie znalezlismy ofert..."), 0 new
- rynekpierwotny: ok, 1 found (known inactive PK Development listing, same URL as on file), 0 new
- oferty-net: blocked (unable to fetch), skipped

Liczba ofert odrzuconych z powodu przekroczenia budzetu (>1.2M zl) per zrodlo:
- nieruchomosci-online: 11
- domiporta: 28

Nowe ogloszenia z powiadomieniem: brak (wszystkie nowo znalezione oferty przekroczyly budzet lub nie byly rzeczywiscie nowe).

offers.json: bez zmian (0 nowych wpisow). Lacznie ofert: 195.
index.html: zregenerowany (24 sekcje dat, najnowsza 9 pazdziernika 2026 wyrozniona, bez zmian w danych - tylko timestamp).

## 2026-10-12 08:40 CEST

Status per zrodlo:
- otodom: blocked - HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 41 found, 8 nowych URL-i, wszystkie 8 odrzucone -
  przekroczyly limit 1 200 000 zl (Legionowo/Projektowana 1 289 000 zl, Kielpin
  Poduchowny/Brzegowa 1 235 000 zl [ID 26964356, kolejna odslona znanej pary
  duplikatow z partnerem 25899131], Legionowo 1 259 000 zl, Jablonna 1 260 000 zl,
  Kepa Kielpinska 1 250 000 zl, Chotomow/Jablonna 1 300 000 zl, Jablonna/Szkolna
  1 270 000 zl, Lomianki Dolne/Koscielna Droga 1 350 000 zl), 0 dodanych
- olx: ok, 80 linkow znalezionych, 73 to mirrory otodom.pl (zablokowane, pominiete),
  7 olx.pl-native; z tych 7 jeden ("chotomow-dom-blizniaczy-...-ul-cisowa-14",
  ID12g9iE) to slug-drift wariant juz znanego URL pod tym samym ID olx (znany jako
  "...-tulipanowa-promocja-ID12g9iE") - potraktowany jako znany, nie nowy, zgodnie
  z ustalonym wzorcem dryfu sluga; pozostale 6 juz znane. 0 new.
- morizon: error - "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 28 nowych URL-i, wszystkie 28 odrzucone - przekroczyly
  limit 1 200 000 zl (ceny od 1 299 000 zl do 2 990 000 zl, w tym duzy pakiet
  wiekszych/drozszych domow w Lomiankach/Chotomowie/Kielpinie Poduchownym/Warszawie
  Bialolece oraz ponownie "Osiedle Sloneczna 27-29" za 2 350 000 zl pod ID 682936 -
  nigdy jeszcze nie dodana), 0 dodanych
- adresowo: ok, 39 found, 0 nowych (wszystkie juz znane)
- gethome: ok, 0 found ("Nie znalezlismy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio, nadal
  nieaktywna), 0 new
- oferty-net: error - "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 8, domiporta: 28.

Nowe ogloszenia z powiadomieniem: brak (wszystkie nowo znalezione oferty przekroczyly
budzet, a jedyny "nowy" URL z olx byl artefaktem dryfu sluga znanej oferty).

offers.json: bez zmian (0 nowych wpisow). Lacznie ofert: 195.
index.html: zregenerowany (bez zmian w danych - tylko timestamp).

## 2026-10-13 08:04 CEST

Status per zrodlo:
- otodom: blocked - HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 41 found, 7 nowych URL-i, 1 dodany (Legionowo, 965 000 zl,
  163 m2 / 435 m2, ID 27037636), 6 odrzuconych - przekroczyly limit 1 200 000 zl
  (Legionowo/Projektowana 1 289 000 zl, Legionowo 1 259 000 zl, Kielpin Poduchowny/
  Brzegowa 1 235 000 zl [ID 26964356, kolejna odslona znanej pary duplikatow z
  partnerem 25899131], Kepa Kielpinska 1 250 000 zl, Jablonna 1 260 000 zl,
  Kielpin/Brzegowa 1 225 000 zl)
- olx: ok, 79 linkow znalezionych (strona ucieta przez dlugosc), wiekszosc to mirrory
  otodom.pl (zablokowane, pominiete), kilka olx.pl-native; 1 genuinie nowy i pod
  limitem - "dom prefabrykowany zelbetowy 144 m" w Warszawie/Bialolece, 440 000 zl,
  144 m2 / 1000 m2 (ID1cJPWg) - dodany
- morizon: error - "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 28 nowych URL-i, wszystkie 28 odrzucone - przekroczyly
  limit 1 200 000 zl (ceny od 1 299 000 zl do 2 990 000 zl - najgorszy dotychczasowy
  wynik, 0% pod limitem; duzy pakiet wiekszych/drozszych domow w Lomiankach/
  Chotomowie/Kielpinie Poduchownym/Warszawie Bialolece/Legionowie/Jozefowie, w tym
  potrojnie wystawiony dom Mehoffera 133 m2 pod 3 ID [156201384/156201390/156201399]
  w 3 roznych cenach 1 570 000-1 660 000 zl, oraz ponownie "Osiedle Sloneczna 27-29"
  za 2 350 000 zl pod ID 682936 - nigdy jeszcze nie dodana), 0 dodanych
- adresowo: ok, 39 found, 2 nowe, oba pod limitem - dodane (Trzciany/ul. Bursztynowa,
  gmina Jablonna, 815 000 zl, 112 m2 / 600 m2; Legionowo/ul. Topolowa, 1 150 000 zl,
  167 m2 / 1492 m2)
- gethome: ok, 0 found ("Nie znalezlismy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio, nadal
  nieaktywna), 0 new
- oferty-net: error - "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 6, domiporta: 28.

Nowe ogloszenia z powiadomieniem (4):
- Legionowo, legionowski, mazowieckie - 965000 zl - dom 163m2 / dzialka 435m2 -
  https://legionowo.nieruchomosci-online.pl/dom,na-sprzedaz/27037636.html
- ul. Bursztynowa, Trzciany, gmina Jablonna, powiat legionowski - 815000 zl -
  dom 112m2 / dzialka 600m2 -
  https://adresowo.pl/o/dom-jablonna-trzciany-ul-bursztynowa-l3g0c5
- ul. Topolowa, Legionowo, powiat legionowski - 1150000 zl - dom 167m2 /
  dzialka 1492m2 - https://adresowo.pl/o/dom-legionowo-ul-topolowa-x1a8g8
- Warszawa, Bialoleka, mazowieckie - 440000 zl - dom 144m2 / dzialka 1000m2 -
  https://www.olx.pl/d/oferta/dom-prefabkrykowany-zelbetowy-144-m-440-000-zl-CID3-ID1cJPWg.html

offers.json: 4 nowe wpisy. Lacznie ofert: 199.
index.html: zregenerowany (25 sekcji dat, najnowsza 13 pazdziernika 2026 wyrozniona).

## 2026-10-14 11:18 CEST

- otodom: error - HTTP 403 Forbidden, 0 found, 0 new
- nieruchomosci-online: ok, 42 found (truncated list of 40 unique parsed), 9 new URLi,
  wszystkie 9 odrzucone - jeden byl martwym linkiem (ID 26464969 pod subdomena
  legionowo.*, strona 404 "oferta nie istnieje" - ten sam ID jest juz znany pod
  subdomena lomianki-dolne.*, wiec to najwyrazniej blad ekstrakcji/duplikat
  subdomeny, pominieto bez liczenia), pozostale 8 przekroczyly limit 1 200 000 zl
  (1 225 000-1 289 000 zl, w tym kolejna odslona znanej pary duplikatow Kielpin
  Poduchowny/Brzegowa ID 26964356, partner 25899131)
- olx: ok, ~40-42 linkow znalezionych, 100% to mirrory otodom.pl (zablokowane,
  pominiete), 0 linkow olx.pl-native w tym przebiegu
- morizon: error - "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 28 nowych URL-i, wszystkie 28 odrzucone - przekroczyly
  limit 1 200 000 zl (ceny od 1 299 000 zl do 2 990 000 zl), w tym ponownie potrojnie
  wystawiony dom Mehoffera 133 m2 pod 3 ID [156201384/156201390/156201399] w 3
  roznych cenach (1 570 000-1 660 000 zl) oraz "Osiedle Sloneczna 27-29" za
  2 350 000 zl pod ID 682936 (nigdy jeszcze nie dodana) - 0 dodanych
- adresowo: ok, 39 found, 1 nowy URL, pod limitem - dodany (Zabki Centrum,
  ul. Zakopianska, 920 000 zl, 90.05 m2 / 464 m2)
- gethome: ok (po jednym retry po timeout), 0 found ("Nie znalezlismy ofert w
  podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio,
  nadal nieaktywna), 0 new
- oferty-net: error - "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 8, domiporta: 28.

Nowe ogloszenia z powiadomieniem (1):
- ul. Zakopianska, Zabki Centrum, powiat wolominski - 920000 zl - dom 90.05m2 /
  dzialka 464m2 - https://adresowo.pl/o/dom-zabki-ul-zakopianska-g3c4h7

offers.json: 1 nowy wpis. Lacznie ofert: 200.
index.html: zregenerowany (26 sekcji dat, najnowsza 14 pazdziernika 2026 wyrozniona).

## 2026-10-15 (uruchomienie watchera)

Status per zrodlo:
- otodom: blocked - HTTP 403 Forbidden (nadal zablokowane), 0 found, 0 new
- nieruchomosci-online: ok, 39 found, 10 nowych URL-i, 2 dodane (Aleja Legionow
  Legionowo 899 000 zl/127m2/25m2 ID 27042176 - kolejna odslona dlugotrwalego
  duplikatu "Aleja Legionow" 899k/127m2; Legionowo 950 000 zl/85,56m2/30m2
  ID 27044876), 8 odrzuconych - przekroczyly limit 1 200 000 zl (Jablonna x2
  1 260 000 zl, Jablonna/Dereniowa 1 250 000 zl, Kepa Kielpinska 1 250 000 zl,
  Kielpin Poduchowny/Brzegowa 1 215 000 zl i 1 235 000 zl - znany duplikat-para
  ID 26892344/26964356, Legionowo/Projektowana 1 289 000 zl, Legionowo 1 259 000 zl)
- olx: ok, ~80 linkow, 73 to mirrory otodom.pl (zablokowane); z 7 natywnych
  olx.pl 1 "nowy" ale okazal sie slug-driftem znanego ID12g9iE (Chotomow/
  Tulipanowa, inny opis slugu, ten sam ID olx) - pominiety jako duplikat,
  0 genuinie nowych
- morizon: error - "Claude Code is unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 28 nowych URL-i, 1 dodany (Legionowo 950 000 zl/
  85,56m2/30m2 ID 156959218 - identyczna cena/metraz jak nowy wpis z
  nieruchomosci-online dzisiaj, najwyrazniej ta sama nieruchomosc na dwoch
  portalach), 27 odrzuconych - przekroczyly limit 1 200 000 zl (1 300 000 zl -
  2 990 000 zl, duzy pakiet Lomianki/Dabrowa/Bialoleka-Mehoffera w tym znany
  potrojny duplikat Mehoffera 133m2 pod ID 156201384/156201390/156201399 oraz
  "Osiedle Sloneczna 27-29" ponownie przy ID 682936, 2 350 000 zl, nadal nigdy
  nie dodane)
- adresowo: ok, 39 found, 2 nowe URL-e, obie dodane pod limitem (ul. Kwiatowa,
  Cybulice Male, gmina Czosnow 689 999 zl/162m2/1015m2; ul. Szkolna, Skrzeszew,
  gmina Wieliszew 990 000 zl/120m2/798m2)
- gethome: ok, 0 found ("Nie znalezlismy ofert w podanych przez Ciebie kryteriach"), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development co poprzednio,
  nadal nieaktywna), 0 new
- oferty-net: error - "Claude Code is unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 8, domiporta: 27.

Nowe ogloszenia dodane do offers.json: 5 (2 nieruchomosci-online, 1 domiporta,
2 adresowo).
Powiadomienie push: WYSLANE (5 genuinie nowych ogloszen, zadne zrodlo nie bylo
bootstrapem); dostarczenie na telefon nie powiodlo sie (Remote Control
nieaktywne) - oczekiwane/normalne.
Lista powiadomionych nowych ogloszen:
- Aleja Legionow, Legionowo - 899000 zl - dom 127m2 / dzialka 25m2 -
  https://legionowo.nieruchomosci-online.pl/dom,na-sprzedaz/27042176.html
- Legionowo - 950000 zl - dom 85.56m2 / dzialka 30m2 -
  https://legionowo.nieruchomosci-online.pl/dom,na-sprzedaz/27044876.html
- Legionowo - 950000 zl - dom 85.56m2 / dzialka 30m2 -
  https://www.domiporta.pl/nieruchomosci/sprzedam-dom-legionowo-86m2/156959218
- ul. Kwiatowa, Cybulice Male, gmina Czosnow - 689999 zl - dom 162m2 /
  dzialka 1015m2 - https://adresowo.pl/o/dom-czosnow-cybulice-male-ul-kwiatowa-w6n6y3
- ul. Szkolna, Skrzeszew, gmina Wieliszew - 990000 zl - dom 120m2 /
  dzialka 798m2 - https://adresowo.pl/o/dom-wieliszew-skrzeszew-ul-szkolna-a5t9v6

offers.json: rozbudowany z 200 do 205 ofert.
index.html: zregenerowany w pelni z aktualnego offers.json, pogrupowany wg daty
first_seen, sekcja 2026-10-15 na gorze z wyroznieniem.

## 2026-10-16 09:14 CEST (local run)

Status per zrodlo:
- otodom: error - HTTP 403 Forbidden, 0 found, 0 new (nadal pelna blokada)
- nieruchomosci-online: ok, 39 found, 10 nowych URL-i, 1 dodany pod limitem
  (Lomianki Dolne, Koscielna Droga 1 090 000 zl/98m2/175m2, ID 27047549),
  9 odrzuconych - przekroczyly limit 1 200 000 zl (1 235 000 zl - 1 350 000 zl),
  w tym znany duplikat Kielpin Poduchowny/Brzegowa (ID 26964356) ponownie nad
  limitem
- olx: ok, search dziala, 40 linkow, 100% mirrory otodom.pl (0 natywnych
  olx.pl), 0 new - jak ostatnio
- morizon: error - "Claude Code is unable to fetch from www.morizon.pl",
  0 found, 0 new
- domiporta: ok, 36 found, 28 nowych URL-i, 2 dodane pod limitem (Lomianki
  Dolne, Koscielna Droga 1 090 000 zl/98m2/175m2 ID 156960540 - identyczna
  cena/metraz jak nowy wpis nieruchomosci-online dzisiaj, najwyrazniej ta sama
  nieruchomosc na dwoch portalach; Lajski, Lesna 920 000 zl/118,43m2/248m2 ID
  156960467), 26 odrzuconych - przekroczyly limit (1 299 000 zl - 2 990 000 zl,
  duzy pakiet Lomianki/Dabrowa/Chotomow/Bialoleka-Mehoffera/Jozefow/Kielpin
  Poduchowny, w tym znany potrojny duplikat Mehoffera 133m2 pod ID
  156201384/156201390/156201399 oraz "Osiedle Sloneczna 27-29" ponownie przy
  ID 682936, 2 350 000 zl, nadal nigdy nie dodane)
- adresowo: ok, 39 found, 1 nowy URL, dodany pod limitem (ul. Pultuska, Serock
  1 190 000 zl/96,8m2/182m2)
- gethome: ok (po jednym timeoucie, powtorzone), 0 found, 0 new
- rynekpierwotny: ok (po jednym timeoucie, powtorzone), 1 found (ta sama
  inwestycja PK Development, nadal nieaktywna), 0 new
- oferty-net: error - "Claude Code is unable to fetch from www.oferty.net",
  0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 9, domiporta: 26.

Nowe ogloszenia dodane do offers.json: 4 (1 nieruchomosci-online, 2 domiporta,
1 adresowo).
Powiadomienie push: WYSLANE (4 genuinie nowych ogloszen, zadne zrodlo nie bylo
bootstrapem).
Lista powiadomionych nowych ogloszen:
- Koscielna Droga, Lomianki Dolne - 1090000 zl - dom 98m2 / dzialka 175m2 -
  https://lomianki-dolne.nieruchomosci-online.pl/dom,na-sprzedaz/27047549.html
- Lomianki Dolne, Koscielna Droga - 1090000 zl - dom 98m2 / dzialka 175m2 -
  https://www.domiporta.pl/nieruchomosci/sprzedam-dom-lomianki-dolne-koscielna-droga-98m2/156960540
- Lajski, Lesna - 920000 zl - dom 118.43m2 / dzialka 248m2 -
  https://www.domiporta.pl/nieruchomosci/sprzedam-dom-lajski-lesna-118m2/156960467
- ul. Pultuska, Serock - 1190000 zl - dom 96.8m2 / dzialka 182m2 -
  https://adresowo.pl/o/dom-serock-ul-pultuska-b5p5i4

offers.json: rozbudowany z 205 do 209 ofert.
index.html: zregenerowany w pelni z aktualnego offers.json, pogrupowany wg
daty first_seen, sekcja 2026-10-16 na gorze z wyroznieniem.

## 2026-10-18 (lokalny czas startu run-a)

Status per zrodlo:
- otodom: error - HTTP 403 Forbidden, 0 found, 0 new (jak zawsze)
- nieruchomosci-online: ok (po jednym bledzie "computer went to sleep
  mid-response", powtorzone), 41 found, 8 nowych URL-i, 0 dodanych - wszystkie
  8 przekroczyly limit (1 235 000 - 1 349 000 zl), w tym znany duplikat
  Kielpin Poduchowny/Brzegowa (ID 26964356 + partner 25899131, nadal nad
  limitem) oraz para identycznych ogloszen Legionowo/Projektowana 1 259 000
  zl/142m2/341m2 pod ID 27033791 i 26996662
- olx: ok, 40 linkow, 100% mirrory otodom.pl (0 natywnych), 0 new mozliwych
  do pobrania - wszystkie zablokowane jak zazwyczaj
- morizon: error - "Claude Code is unable to fetch from www.morizon.pl",
  0 found, 0 new
- domiporta: ok (po dwoch bledach "computer went to sleep mid-response",
  udane na trzeciej probie), 36 found, 29 nowych URL-i, 2 dodane pod limitem
  (Legionowo, Mazowiecka 1 059 000 zl/157,2m2/40m2 ID 156545426 - identyczna
  cena/metraz/adres jak znany wpis nieruchomosci-online z 08-15, ID 26778487,
  najwyrazniej ta sama nieruchomosc na dwoch portalach; Legionowo, Kolejowa
  885 000 zl/109,78m2/38m2 ID 156962222), 27 odrzuconych - przekroczyly limit
  (1 299 000 zl - 2 990 000 zl, duzy pakiet Lomianki/Dabrowa/Kielpin
  Poduchowny/Bialoleka-Mehoffera/Jozefow/Dziekanow Polski, w tym znany
  potrojny duplikat Mehoffera 133m2 pod ID 156201384/156201390/156201399 oraz
  "Osiedle Sloneczna 27-29" ponownie przy ID 682936, 2 350 000 zl, nadal
  nigdy nie dodane)
- adresowo: ok (po jednym bledzie "computer went to sleep mid-response",
  powtorzone), 39 found, 5 nowych URL-i, wszystkie 5 dodane pod limitem
  (Lomianki Dolne, Koscielna Droga 1 090 000 zl/87,9m2/175m2 - cena i dzialka
  identyczne jak cross-post nieruchomosci-online/domiporta z 10-16, choc
  dom_m2 inny, 98 vs 87,9 - mozliwy trzeci cross-post tej samej nieruchomosci
  lub inny dom na tej samej ulicy; Rynia, ul. Glowna 590 000 zl; Skrzeszew,
  ul. Slowackiego 350 000 zl; Wola Smolana 800 000 zl; Kobylka Jedrzejek,
  ul. Jesionowa 999 000 zl)
- gethome: ok, 0 found, 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development, nadal
  nieaktywna), 0 new
- oferty-net: error - "Claude Code is unable to fetch from www.oferty.net",
  0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 8, domiporta: 27.

Nowe ogloszenia dodane do offers.json: 7 (2 domiporta, 5 adresowo).
Powiadomienie push: WYSLANE (7 genuinie nowych ogloszen, zadne zrodlo nie
bylo bootstrapem).
Lista powiadomionych nowych ogloszen:
- Legionowo, Mazowiecka - 1059000 zl - dom 157.2m2 / dzialka 40m2 -
  https://www.domiporta.pl/nieruchomosci/sprzedam-dom-legionowo-mazowiecka-157m2/156545426
- Legionowo, Kolejowa - 885000 zl - dom 109.78m2 / dzialka 38m2 -
  https://www.domiporta.pl/nieruchomosci/sprzedam-dom-legionowo-kolejowa-110m2/156962222
- ul. Koscielna Droga, Lomianki Dolne - 1090000 zl - dom 87.9m2 / dzialka 175m2 -
  https://adresowo.pl/o/dom-lomianki-lomianki-dolne-ul-koscielna-droga-b0w3q4
- ul. Glowna, Rynia - 590000 zl - dom 120m2 / dzialka 792m2 -
  https://adresowo.pl/o/dom-nieporet-rynia-ul-glowna-n7z9c9
- ul. Juliusza Slowackiego, Skrzeszew - 350000 zl - dom 48m2 / dzialka 1132m2 -
  https://adresowo.pl/o/dom-wieliszew-skrzeszew-ul-juliusza-slowackiego-d4d8e8
- Wola Smolana - 800000 zl - dom 130m2 / dzialka 1500m2 -
  https://adresowo.pl/o/dom-serock-wola-smolana-130-m2-y1e3c7
- ul. Jesionowa, Kobylka Jedrzejek - 999000 zl - dom 105m2 / dzialka 460m2 -
  https://adresowo.pl/o/dom-kobylka-ul-jesionowa-u9j0s5

offers.json: rozbudowany z 209 do 216 ofert.
index.html: zregenerowany w pelni z aktualnego offers.json, pogrupowany wg
daty first_seen, sekcja 2026-10-18 na gorze z wyroznieniem.

## 2026-10-19

- otodom: blocked - HTTP 403, 0 found, 0 new
- nieruchomosci-online: ok, 41 found, 9 nowych URL-i, 1 dodany pod limitem
  (Legionowo, ul. Jana Kochanowskiego, 1 190 000 zl/142m2/341m2, ID 26996662)
  - pozostale 8 nad limitem (1 215 000-1 289 000 zl), w tym znany duplikat
  Kielpin Poduchowny/Brzegowa (ID 26964356 + 25899131, 1 235 000 zl) oraz
  para Legionowo/Projektowana (ID 27033791 @ 1 259 000 zl, ten sam
  142m2/341m2 co dodany dzis 26996662, ale wyzsza cena - prawdopodobnie ta
  sama nieruchomosc wystawiona dwa razy)
- olx: ok, zwrocil liczne linki otodom.pl (zablokowane) ale 2 natywne
  olx.pl, obie nowe i pod limitem - dodane: Legionowo, ul. Jana
  Kochanowskiego 1 199 000 zl/142m2/341m2 (ID1cgem2 - ten sam adres/metraz
  co nieruchomosci-online 26996662 powyzej, kolejny cross-source duplikat
  tej samej nieruchomosci) oraz ul. Barwna, Serock 999 900 zl/106m2/90m2
  (ID1cNPW5)
- morizon: blocked - "unable to fetch", 0 found, 0 new
- domiporta: ok, 36 found (strona 1 z kilku), 27 nowych URL-i, wszystkie 27
  nad limitem (1 299 000-2 990 000 zl) - duza partia wiekszych/drozszych
  domow w Lomiankach/Dabrowie/Kielpinie Poduchownym/Warszawie Bialolece
  (110-503m2), w tym potrojnie wystawiony Mehoffera 133m2 ponownie pod 3
  ID (156201384/156201390/156201399, 1 570 000-1 660 000 zl) oraz
  powracajace "Osiedle Sloneczna 27-29" (ID 682936, 2 350 000 zl, nigdy
  nie dodane)
- adresowo: ok, 39 found, 0 nowych URL-i (wszystkie juz znane)
- gethome: ok, 0 found, 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development, nadal
  nieaktywna), 0 new
- oferty-net: blocked - "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 8, domiporta: 27.

Nowe ogloszenia dodane do offers.json: 3 (1 nieruchomosci-online + 2 olx).
Powiadomienie push: WYSLANE (3 genuinie nowe ogloszenia, zadne zrodlo nie
bylo bootstrapem).
Lista powiadomionych nowych ogloszen:
- Legionowo, ul. Jana Kochanowskiego - 1190000 zl - dom 142m2 / dzialka 341m2 -
  https://legionowo.nieruchomosci-online.pl/dom,na-sprzedaz/26996662.html
- Legionowo, ul. Jana Kochanowskiego - 1199000 zl - dom 142m2 / dzialka 341m2 -
  https://www.olx.pl/d/oferta/sprzedam-bezposrednio-dom-w-legionowie-142m2-dzialka-341-CID3-ID1cgem2.html
- ul. Barwna, Serock - 999900 zl - dom 106m2 / dzialka 90m2 -
  https://www.olx.pl/d/oferta/sprzedam-segment-w-serocku-ul-barwna-CID3-ID1cNPW5.html

offers.json: rozbudowany z 216 do 219 ofert.
index.html: zregenerowany w pelni z aktualnego offers.json, pogrupowany wg
daty first_seen, sekcja 2026-10-19 na gorze z wyroznieniem.

## 2026-10-20

Status per zrodlo:
- otodom: blocked - HTTP 403, 0 found, 0 new
- nieruchomosci-online: ok, 41 found, 6 nowych URL-i, 1 pod limitem dodany -
  Legionowo 1 199 000 zl/142m2/341m2 (ID 27033791) - ten sam adres/metraz co
  istniejacy wpis 26996662 z 2026-10-19, prawdopodobnie ta sama
  nieruchomosc ponownie wystawiona, teraz po zbieznej cenie (byla
  1 259 000 zl 10-19, teraz 1 199 000 zl) - zapisana jako wlasny wiersz wg
  reguly jeden-URL-jeden-wpis. Pozostale 5 nad limitem (1 235 000-1 289 000
  zl), w tym znany duplikat Kielpin Poduchowny/Brzegowa (ID 26964356, nadal
  nad limitem).
- olx: ok, 9 linkow natywnych olx.pl (bez mirrorow otodom w tym zbiorze), 1
  "nowy" URL ale to potwierdzony drift slugu tego samego ID12g9iE
  (Chotomow/Tulipanowa, znany od 2026-08-15) - wylaczony jako nie-nowy, 0
  genuinie nowych.
- morizon: blocked - "unable to fetch from www.morizon.pl", 0 found, 0 new
- domiporta: ok, 36 found, 27 nowych URL-i, wszystkie 27 nad limitem
  (1 299 000-2 990 000 zl) - duza partia wiekszych/drozszych domow w
  Lomiankach/Dabrowie/Kielpinie Poduchownym/Warszawie Bialolece-Mehoffera/
  Jozefowie/Legionowie (110-503m2), w tym potrojnie wystawiony Mehoffera
  133m2 ponownie pod 3 ID (156201384/156201390/156201399, 1 570 000-
  1 660 000 zl) oraz powracajace "Osiedle Sloneczna 27-29" (ID 682936,
  2 350 000 zl, nigdy nie dodane).
- adresowo: ok, 39 found, 1 nowy URL, pod limitem, dodany - ul. Barwna,
  Serock 999 900 zl/106m2/90m2 - ten sam adres i cena co istniejacy wpis
  olx ID1cNPW5 z 2026-10-19 (sprzedam-segment-w-serocku-ul-barwna),
  prawdopodobnie ta sama nieruchomosc cross-posted - zapisana jako wlasny
  wiersz wg reguly jeden-URL-jeden-wpis.
- gethome: ok, 0 found ("Nie znalezlismy ofert..."), 0 new
- rynekpierwotny: ok, 1 found (ta sama inwestycja PK Development, nadal
  nieaktywna), 0 new
- oferty-net: blocked - "unable to fetch from www.oferty.net", 0 found, 0 new

Liczba ofert odrzuconych z powodu limitu budzetu (>1 200 000 zl) per zrodlo:
nieruchomosci-online: 5, domiporta: 27.

Nowe ogloszenia dodane do offers.json: 2 (1 nieruchomosci-online + 1
adresowo).
Powiadomienie push: WYSLANE (2 genuinie nowe ogloszenia, zadne zrodlo nie
bylo bootstrapem).
Lista powiadomionych nowych ogloszen:
- Legionowo - 1199000 zl - dom 142m2 / dzialka 341m2 -
  https://legionowo.nieruchomosci-online.pl/dom,na-sprzedaz/27033791.html
- ul. Barwna, Serock - 999900 zl - dom 106m2 / dzialka 90m2 -
  https://adresowo.pl/o/dom-serock-ul-barwna-n4v1g8

offers.json: rozbudowany z 219 do 221 ofert.
index.html: zregenerowany w pelni z aktualnego offers.json, pogrupowany wg
daty first_seen, sekcja 2026-10-20 na gorze z wyroznieniem.
