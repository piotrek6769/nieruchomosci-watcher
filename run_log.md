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
