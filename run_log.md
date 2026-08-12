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
