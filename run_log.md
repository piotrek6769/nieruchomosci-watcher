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
