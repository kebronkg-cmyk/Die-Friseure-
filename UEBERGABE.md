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

## Zweite Runde (27.09.2026): Feinschliff und Terminkärtchen

### Die eigene Funktion: das Terminkärtchen (Preisseite)

Wie das Papierkärtchen an der Kasse. Jede Preiszeile trägt rechts einen
Kreis (+ / Haken), die ganze Zeile ist die Tippfläche. Was angetippt ist,
steht **nach Ablauf sortiert** auf dem Kärtchen: Preis für die gewählte
Haarlänge, Summe (mit „ab“, wenn ein Posten einen ab-Preis hat), Dauer,
Wunschperson (Team des gewählten Salons) und Zeitwunsch. Daraus wird ein
fertiger Text:

- **Per E-Mail schicken** öffnet das eigene Mailprogramm, an die Adresse
  des gewählten Salons, Betreff „Terminwunsch Haidhausen/Ismaning“.
- **Text kopieren** für Nachricht oder Telefon.
- Ausdrücklich „noch keine Buchung“; Telefon und Treatwell daneben.

Am breiten Schirm (ab 72 rem) steht es rechts auf derselben Eichenablage
wie die Preisetiketten und klebt mit. Am Handy zeigt ein Sockel unten
(anthrazit, Eichenkante, Zahl in Limette), was gesammelt ist; „Kärtchen
ansehen“ öffnet es als Blatt von unten (Esc, Klick daneben, Fokus zurück).
Wahl, Wunschperson und Zeitwunsch bleiben im Browser (`localStorage`,
steht im Datenschutz). Ohne Skript bleibt das Kärtchen verborgen, die
Liste funktioniert wie vorher. Eine Lampe: Liegt etwas darauf, leuchtet nur
„Per E-Mail schicken“, der Terminknopf der Leiste wird zur Linie.

### Feinschliff

- **Auftakt am Desktop neu komponiert:** Satz links, Team rechts, darunter
  das Nasenschild als Band über die ganze Breite. Der Querbalken des Arms
  liegt genau auf der Trennlinie — die Linie wird zur Stange. Vorher stand
  unter der Überschrift eine leere Wand von rund 480 px Höhe.
- **Schildarm nach dem Foto nachgezeichnet** (`haidhausen-schild.jpg`,
  gespiegelt): Wandplatte mit Bolzen, Wellenstrebe mit Schnecke, tragende
  Strebe mit Schnecke, Hängestangen. Striche so kräftig, dass es auch mit
  115 px Breite am Handy als Schmiedeeisen liest.
- Leiste deckend (vorher schien Text durch die Wortmarke).
- Adresse bricht nicht mehr in „81667 / München“.
- Adresskarten: nur die Wege unten bündig, der Hinweis bleibt an den Zeiten.
- Wohnzimmertext auf der Satzkante der Seite, auch über 1280 px.
- Pfeil als gezeichnete Maske (`--zeichen-pfeil`) statt Unicode-Zeichen.
- Browserflächen aus der Palette (`accent-color`, `caret-color`,
  `scrollbar-color`).

### Gemessen, alt gegen neu (gleiches Messskript)

| Wert | alt 390 | neu 390 | alt 1440 | neu 1440 |
|---|---|---|---|---|
| Oberkante erstes Bild | 57 px | 57 px | 108 px | 108 px |
| Terminknopf unten | 782 px | 790 px | 805 px | **663 px** |
| Leuchtende Knöpfe im ersten Bildschirm | 1 | 1 | 1 | 1 |
| Überschrift : Text | 45 : 16 | **48 : 16** | 84 : 20 | 84 : 20 |
| Wörter im ersten Bildschirm | 66 | **63** | 69 | 85 |
| Seitenhöhe | 4.426 px | 4.461 px | 4.815 px | **4.767 px** |

Die 16 Wörter mehr am Desktop sind keine neuen Wörter im Auftakt: Der
Auftakt ist 142 px kürzer geworden, deshalb schaut die Überschrift „Wer hier
schneidet“ mit ihrem Satz unten ins Bild. Am Handy wächst die Seite um
35 px: Die Adresse bricht jetzt sauber zweizeilig, und die Überschrift
steht auf der Schrifttreppe (`--t-h1`, 48 px statt 45 px).

Nach `DESIGN.md` gleicht der Detektor gegen das System ab. Fünf
Schriftgrößen neben der Treppe (Wertungszahl, Preis in der Liste,
Öffnungsstatus und zwei Handy-Überschriften) liegen jetzt auf Tokens statt
als Ausnahme im System — Detektor wieder `[]`.

Detektor `[]`, keine Überbreite bei 360/390/768/1024 px, schwächster
Kontrast weiterhin 6,70 : 1, keine Konsolenfehler. Verhaltenstest des
Kärtchens (Playwright): Auswahl über zugeklappte Gruppen hinweg, Längen-
und Salonwechsel, Summe, E-Mail-Text, Kopieren, Blatt mit Esc und
Fokusrückgabe, Wahl bleibt nach Neuladen.

Abschlussprüfer (`impeccable-finish-reviewer`): zwei Runden. Runde 1:
acht Befunde, alle eingearbeitet; Runde 2: sieben erledigt, der Schildarm
teilweise — danach mit Strebe und kräftigeren Strichen neu gezeichnet.
Prüfaufnahmen der Preisseite nicht mehr als Kacheln (klebende Elemente
erscheinen dort doppelt), sondern mit Viewport auf `scrollHeight`.

## Dritte Runde (Oktober 2026): Fassung 2 ist die Hauptseite

Feinschliff mit impeccable und emil-design-eng, als `/fassung-2/` neben
Fassung 1 verglichen und vom Auftraggeber freigegeben. Fassung 1 bleibt in
Git wiederherstellbar (Commit `b2e6f04`).

- Handy: Kapitel mit Nummer und Lichtfuge, aktuelles Kapitel in der Leiste
- Erster Bildschirm: ein Auftritt in zwei Gruppen
- Terminkärtchen: Punkt fliegt von der Zeile zum Kärtchen bzw. Sockel
  (Dauer aus der Strecke; Bewegung ease-out, Deckkraft linear)
- Galerie öffnet aus der Kachel, schließt schneller; Pfeiltasten sofort
- Knöpfe `scale(0.97)`, Preisgruppen blenden ein, hängende Anführungszeichen
- **Keine Gedankenstriche in sichtbaren Texten** (Wunsch des Auftraggebers),
  auch nicht in der Terminwunsch-E-Mail; Bis-Striche (Mo–Sa, 9–19:30) bleiben

## Nächste Schritte

1. Pages einmal auf „GitHub Actions“ stellen, dann nach dem Merge die
   Live-URL prüfen.
2. Antworten aus `ABNAHME.md` einarbeiten, vor allem Team und Zeiten —
   das Team steht auch in `seite.js` (Wunschperson im Kärtchen).
3. Detektor: `npm install` in `.claude/skills/impeccable/` (die
   `package.json` liegt jetzt dort), dann
   `node .claude/skills/impeccable/scripts/detect.mjs --json index.html preise.html stil.css`.
