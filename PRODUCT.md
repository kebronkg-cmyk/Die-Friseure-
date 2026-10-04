# Product

<!-- impeccable:product-schema 1 -->

> Quellen: die-friseure-haidhausen.de und die-friseure-ismaning.de (Start,
> Preise, Team, Impressum; Stand der Seiten 2019/2020) sowie die beiden
> Treatwell-Einträge, alle gelesen am 27.09.2026. Rohdaten unter
> `recherche/`, Übersicht in `recherche/quellen.md`.

## Platform

web

## Stack

Statische Seite, HTML/CSS/Vanilla JS, kein Build, keine Abhängigkeiten,
GitHub Pages. Schrift (Archivo, OFL) liegt im Repo, keine CDNs, kein
Tracking. Preisliste wird aus den Treatwell-Rohdaten erzeugt
(`python3 werkzeuge/preise.py`).

## Users

Kundinnen und Kunden aus Haidhausen, vom Ostbahnhof und aus Ismaning und
Umgebung, meist vom Handy. Sie wollen wissen, wer schneidet, was es kostet,
ob heute offen ist und wie sie einen Termin bekommen. Stammkunden kommen zu
einer bestimmten Person (in den Bewertungen: Kimi, Tina).

## Product Purpose

Termine auslösen: eine Buchung bei Treatwell oder einen Anruf in einem der
beiden Salons.

## Positioning

- Zwei Salons, ein Inhaber (Ali), gemeinsame Preise mit kleinen
  Unterschieden. Damen und Herren, Farbe, Strähnen, Balayage; Keratin nur
  in Haidhausen, Maniküre/Pediküre nur in Ismaning.
- Selbstbild aus der eigenen Website: „Wir sind die Schrägsten von
  München“, „Test the best!“, „Wir haben keine Ahnung von Marketing … aber
  wir versprechen nichts, was wir nicht halten können“. Salon als „kleines
  Wohnzimmer“, Espresso, Stühle vom Lederdesigner Greiner, Frottee.
- Bewertungen bei Treatwell: Haidhausen 4,6 aus 5.910, Ismaning 4,7 aus 2.850.

## Operating Context

| | Haidhausen | Ismaning |
|---|---|---|
| Anschrift | Wörthstraße 40, 81667 München | Bahnhofplatz 5, 85737 Ismaning |
| Telefon | 089 52 03 35 49 | 089 24 59 06 73 |
| E-Mail | info@die-friseure-haidhausen.de | info@die-friseure-ismaning.de |
| Mo | 09:00–19:30 | 09:00–18:30 |
| Di | 09:00–19:30 | geschlossen |
| Mi–Fr | 09:00–19:30 | 09:00–18:30 |
| Sa | 09:00–19:30 | 09:00–17:00 |
| So | geschlossen | geschlossen |
| Buchung | treatwell.de/ort/die-friseure-aus-haidhausen/ | treatwell.de/ort/die-friseure-aus-ismaning/ |
| Anfahrt | Ostbahnhof | S8 Ismaning, Bus 230/231/531 |

Zeiten Haidhausen laut Treatwell. Ismaning vom Inhaber bestätigt (Abnahme,
September 2026): Dienstag Ruhetag, sonst bis 18:30. Treatwell zeigt dort noch
18:45 und Dienstag offen — das sollte der Salon bei Treatwell nachziehen.

## Brand Commitments

- Name **Die Friseure** mit Ortszusatz („aus Haidhausen“, „aus Ismaning“).
- Eigene Zeichen: Logo mit S-Schwung in Limettengrün, Aubergine und Grau
  mit Gesichtsprofil; an der Fassade in Haidhausen ein rundes Nasenschild,
  „FRISEURE“ in fetter, schmaler Schrift in Limettengrün. Das Grün gehört
  dem Laden (Logo, Schild, Fensterbeschriftung) — kein Lieferant.
- Sprache Deutsch, per Sie (wie die eigene Website; Treatwell duzt).

## Evidence on Hand

- Teamfoto (fünf Personen vor der Steinwand, Ali rechts) und Einzelporträts
  von der alten Website (369 × 277 px — nur klein verwendbar).
- Raumfotos beider Salons aus Treatwell (1280 × 800), Fassaden, Nasenschild.
- Echte, verifizierte Bewertungen von Treatwell (Vorname, Leistung, Datum).

**Nicht verwenden:** die Porträts ohne Namen (`tables/1.jpg`, `2.jpg`) und
die Bilder unter `price-massage/` — laut Bildnachweis Fotolia/shutterstock.
Produktfotos (Purah, Wella, Argan) zeigen Lieferanten, nicht den Laden.

## Product Principles

1. Die Person zuerst: das Team im ersten Bildschirm.
2. Ein Schalter für beide Salons; alles, was sich unterscheidet, schaltet mit.
3. Nichts erfinden: keine Platzhalter, keine neuen Werbeversprechen. Die
   Stimme des Hauses übernehmen.
4. Preise nur aus Treatwell, generiert, mit Datum.

## Accessibility & Inclusion

Handy zuerst, Kontrast mindestens WCAG AA (gemessen, schwächste Zeile
6,4:1), `:focus-visible`, `prefers-reduced-motion`, antippbare Nummern,
Salon- und Längenwahl funktionieren ohne Skript.
