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
