# Quellen

Gelesen am 27.09.2026.

| Quelle | Datei | Gilt für |
|---|---|---|
| treatwell.de/ort/die-friseure-aus-haidhausen/ | `treatwell-haidhausen.json` | Preise, Dauer, Zeiten, Bewertungen, Raumfotos |
| treatwell.de/ort/die-friseure-aus-ismaning/ | `treatwell-ismaning.json` | dito |
| die-friseure-haidhausen.de (© 2019) | `alte-websites/die-friseure-haidhausen.de.html` | Stimme des Hauses, Team, Impressum |
| die-friseure-ismaning.de (© 2020) | `alte-websites/die-friseure-ismaning.de.html` | dito, Kosmetik (nicht übernommen) |

Die JSON-Dateien sind aus `window.__state__.venue.venue` der Treatwell-Seite
gezogen und auf das Nötige reduziert: `menu` ist bereits in Gruppe →
Leistung → Varianten zerlegt, Preise sind die Vollpreise (nicht die
Aktionspreise).

Bei Abweichungen gilt Treatwell (aktueller). Jede Abweichung steht in
`../ABNAHME.md`.

## Nicht übernommen

- Bilder `images/tables/*.jpg` und `images/price-massage/*` der alten
  Seiten: laut Bildnachweis Fotolia/shutterstock.
- Produktfotos aus Treatwell (Purah, Wella, Argan-Maske, Haargel): zeigen
  Lieferanten, nicht den Laden.
- Urlaubshinweise 2023/2024 der alten Seiten.
