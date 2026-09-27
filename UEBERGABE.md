# Übergabe — Die Friseure, erste Fassung

Stand 27.09.2026. Gebaut nach `CLAUDE.md` und der Norm
`.claude/skills/salon-website/`. Offene Fragen an den Salon stehen in
`ABNAHME.md`.

## Was da ist

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Team, Einstiegspreise, Salon, Stimmen, Anfahrt |
| `preise.html` | Preisliste mit Salon- und Längenwahl, generiert |
| `impressum.html`, `datenschutz.html` | Rechtstexte (`noindex`) |
| `stil.css`, `seite.js` | ein Stil, ein Skript, keine Abhängigkeiten |
| `werkzeuge/preise.py` | schreibt die Preise aus `recherche/treatwell-*.json` |
| `recherche/` | Treatwell-Rohdaten, alte Websites, `quellen.md` |
| `bilder/`, `schrift/` | echte Fotos, Archivo (OFL) |

## Die Welt und warum

- **Aus dem Laden abgeleitet**, nicht aus einer Vorlage: weiße Wand oben,
  anthrazitfarbener Sockel unten, helle Eichenablage dazwischen — so sieht
  der Raum in der Wörthstraße aus. Die Fußzeile ist dieser Sockel, mit
  Eichenkante; die Preisetiketten stehen auf einer Eichenablage.
- **Leitfarbe Limettengrün** aus dem eigenen Logo und vom Nasenschild. Sie
  leuchtet genau einmal pro Knopfgruppe (Terminknopf) und ist sonst nur
  Ornament; als Text nur auf dem dunklen Schild und im Sockel.
- **Schrift Archivo**, schmal und fett wie „FRISEURE“ auf dem Schild, im
  Fließtext normal breit.
- **Die eigene Idee: das Nasenschild.** Das runde Schild an der Fassade in
  Haidhausen hängt als kleine Scheibe am Arm neben den Angaben. Ein Klick
  dreht es um (Rückseite: Ismaning) und schaltet Adresse, Zeiten,
  Telefon, Team, Fotos, Bewertungen und Terminknopf mit. Ohne Skript geht
  das auch (Radioknopf + `:has()`). Funktioniert auch klein: 5,5 rem am Handy.
- **Die Person zuerst:** Das Teamfoto mit Ali trägt den ersten Bildschirm;
  die Überschrift ist der eigene Satz des Hauses.
- **Stimme des Hauses** statt neuer Werbung: „Die Schrägsten von München“,
  „Ein verrückter, ungewöhnlicher Schnitt? Gern.“, „Wir haben keine Ahnung
  von Marketing …“, „ein kleines Wohnzimmer“ — alles von der eigenen Seite.

## Gemessen

| Wert | 390 px | 1440 px |
|---|---|---|
| Wörter im ersten Bildschirm | 60 | 63 |
| Oberkante des ersten Bildes | 57 px | 108 px |
| Terminknopf unten | 782 px (im Bild) | 805 px (im Bild) |
| Leuchtende Knöpfe im ersten Bildschirm | 1 | 1 |
| Überschrift : Text | 45 : 17 | 84 : 17 |
| Seitenhöhe | 4.426 px | 4.815 px |
| Überbreite (360, 390, 768 px) | keine | — |
| Schwächster Kontrast | 6,44 : 1 (Nebentext auf Wand) | 6,44 : 1 |
| Detektor (`detect.mjs --json`) | `[]` | `[]` |
| Konsolenfehler | keine | keine |

Bei 360 × 740 liegt der Terminknopf knapp unter dem ersten Bildschirm; die
Leiste zeigt dort den Termin als Linie mit Telefonnummer daneben.

Verhaltenstest (Playwright): Schildklick dreht die Scheibe (`rotateY 180°`)
und schaltet die Adresse; Wahl bleibt nach Neuladen; `?salon=ismaning`
wirkt; Galerie öffnet, blättert mit Pfeiltasten, schließt mit Esc und gibt
den Fokus an die Kachel zurück; `preise.html#farbe` öffnet die Gruppe;
Längenwahl zeigt je Zeile genau einen Preis — auch ohne Skript; kein Bild
doppelt auf einer Seite.

## Bewusste Entscheidungen

- **Kein Bild über seine Vorlage gezogen:** Porträts höchstens 184 px
  breit (Vorlage 369 px), Wohnzimmerfoto höchstens 1280 px, am großen
  Schirm mit Rand statt randlos.
- **Schleier nur hinter dem Text** im Wohnzimmerfoto: ein senkrechtes Band
  links unten, nach oben ausgeblendet. Am Handy steht der Text unter dem
  Bild statt darüber.
- **Gruppennummern auf der Preisseite** zählen per CSS-Zähler nur sichtbare
  Gruppen: Sie tragen die Reihenfolge im Salon (Schnitt → Farbe → Augen →
  Hände), deshalb stehen sie dort und sonst nirgends.
- **Leistenknopf** leuchtet erst, wenn der Terminknopf des Auftakts aus dem
  Bild ist — eine Lampe zur Zeit.

## Preise neu erzeugen

```sh
# Treatwell-Seite laden, window.__state__ nach recherche/… schreiben
# (Rezept in .claude/skills/salon-website/SKILL.md, Abschnitt Recherche),
# dann:
python3 werkzeuge/preise.py
```

Das Skript bricht ab, wenn eine Leistung keiner Gruppe zugeordnet ist —
dann `ZUORDNUNG` in `werkzeuge/preise.py` ergänzen.

## Nächste Schritte im neuen Repo

1. Auspacken, committen, pushen; Pages einmal auf „GitHub Actions“ stellen.
2. `impeccable`: Abschlussprüfer (`impeccable-finish-reviewer`) mit den
   Aufnahmen laufen lassen, höchstens zwei Runden; danach der Documenter
   (`DESIGN.md` + `.impeccable/design.json`) und der Detektor noch einmal.
   In diesem Paket noch nicht gelaufen.
3. `node .claude/skills/impeccable/scripts/detect.mjs` braucht
   `npm install` im Skill-Ordner (die `node_modules` sind nicht im Zip).
4. Antworten aus `ABNAHME.md` einarbeiten, vor allem Team und Zeiten.
