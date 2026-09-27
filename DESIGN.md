---
name: Die Friseure
description: Zwei Salons, ein Inhaber — die Seite gebaut wie der Raum in der Wörthstraße.
colors:
  wand: "oklch(97.8% 0.002 250)"
  wand-tief: "oklch(94% 0.003 250)"
  anthrazit: "oklch(27% 0.004 265)"
  sockel: "oklch(31% 0.004 250)"
  grau: "oklch(46% 0.007 265)"
  grau-hell: "oklch(80% 0.006 250)"
  metall: "oklch(66% 0.007 255)"
  eiche: "oklch(68.6% 0.104 67)"
  limette: "oklch(80% 0.18 120)"
  limette-tief: "oklch(72% 0.17 121)"
  limette-rand: "oklch(71.2% 0.156 119.5)"
  papier: "oklch(100% 0 0)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.4rem + 5.4vw, 5.25rem)"
    fontWeight: 820
    lineHeight: 0.92
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 72"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 3vw, 3.25rem)"
    fontWeight: 780
    lineHeight: 1.02
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 72"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 780
    lineHeight: 1.02
    fontVariation: "'wdth' 72"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 560
    lineHeight: 1.55
  schild:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 860
    lineHeight: 0.82
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 62"
  scale:
    t-klein: "0.8125rem"
    t-neben: "0.9375rem"
    t-knopf: "1rem"
    t-text: "1.0625rem"
    t-gross: "1.25rem"
    t-h3: "1.375rem"
    t-titel: "1.5rem"
    t-zahl: "1.75rem"
    t-h2-min: "2rem"
    t-h2-max: "3.25rem"
    t-h1-min: "3rem"
    t-h1-max: "5.25rem"
    marke-die: "0.4375rem"
    schild-die: "0.5625rem"
    wortmarke-die: "0.6875rem"
    marke-wort: "0.75rem"
    wortmarke-wort: "1.625rem"
rounded:
  kante: "2px"
  ecke: "0.375rem"
  blatt: "0.875rem"
  pill: "999px"
spacing:
  rand: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)"
  luft: "clamp(4rem, 2rem + 6vw, 7.5rem)"
  breite: "76rem"
  leiste-h: "4rem"
components:
  knopf-lampe:
    backgroundColor: "{colors.limette}"
    textColor: "{colors.anthrazit}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.35rem"
    height: "2.875rem"
  knopf-lampe-hover:
    backgroundColor: "{colors.limette-tief}"
    textColor: "{colors.anthrazit}"
  knopf-linie:
    backgroundColor: "transparent"
    textColor: "{colors.anthrazit}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.35rem"
    height: "2.875rem"
  schalter-wahl:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.grau}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.95rem"
  schalter-wahl-aktiv:
    backgroundColor: "{colors.anthrazit}"
    textColor: "{colors.wand}"
  etikett:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.anthrazit}"
    rounded: "{rounded.ecke}"
    padding: "1rem 1.1rem 1.1rem"
  kaertchen:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.anthrazit}"
    rounded: "{rounded.ecke}"
    padding: "1.25rem 1.25rem 1.1rem"
  adresse:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.anthrazit}"
    rounded: "{rounded.ecke}"
    padding: "1.5rem"
  feld:
    backgroundColor: "{colors.wand}"
    textColor: "{colors.anthrazit}"
    rounded: "{rounded.ecke}"
    padding: "0.5rem 0.75rem"
    height: "2.75rem"
  schild-scheibe:
    backgroundColor: "{colors.sockel}"
    textColor: "{colors.wand}"
    size: "7.75rem"
  sockel:
    backgroundColor: "{colors.sockel}"
    textColor: "{colors.wand}"
    padding: "3rem 0 3.5rem"
---

# Design System: Die Friseure

## Overview

**Creative North Star: "Der Raum in der Wörthstraße"**

Die Seite ist der Salon in Haidhausen, von vorn fotografiert und flach gelegt: oben die kühle weiße Wand, unten der anthrazitfarbene Sockel, dazwischen eine helle Eichenablage. Auf dieser Wand steht, was der Laden wirklich hat — Gesichter in ihrer Aufnahmegröße, Preise als Etiketten, zwei Adressen. Das einzige Leuchten kommt aus dem eigenen Logo und vom Nasenschild an der Fassade: ein Limettengrün, das auf jeder Fläche genau einmal den Weg zeigt.

Die Dichte ist ruhig und hell, mit großzügiger Luft zwischen den Kapiteln. Die Schrift ist eine einzige Familie (Archivo) in zwei Haltungen: schmal und fett wie der Schriftzug auf dem Schild für Überschriften, Zahlen und Marke; normal breit für alles, was man liest. Tiefe entsteht nicht aus Schatten, sondern aus Material: Papier liegt auf Wand, Wand steht auf Eiche, die Eiche sitzt auf dem Sockel.

Die Eigenheiten des Hauses sind Gegenstände, keine Dekoration: das Nasenschild, das sich zwischen den Salons dreht, und das Terminkärtchen, das wie das Papierkärtchen an der Kasse auf der Ablage steht. Die Handyfassung ist eine eigene Komposition, keine gestapelte Desktopseite.

**Key Characteristics:**
- Kühle, helle Wand als Grund; Anthrazit für Text; Limette als einzige Lampe.
- Eine Schriftfamilie, zwei Breiten: 72 % (Schild) für Überschriften und Zahlen, 100 % für Text.
- Material statt Schatten: Papier, Eiche, Sockel, Metall.
- Salonwahl ohne Skript; alles, was sich unterscheidet, schaltet mit.
- Fotos nie größer als ihre Vorlage.

## Colors

Eine fast unbunte, kühle Raumpalette aus Wand, Sockel und Metall, dazu eine einzige leuchtende Farbe aus dem Logo und ein warmes Holz, das nur als Gegenstand auftritt.

### Primary
- **Schild-Limette** (limette): Die Lampe. Füllung des einen Hauptknopfs je Gruppe, Unterstreichung des Pfeil-Links und des aktuellen Menüpunkts, Oberkante der Bewertungen, Textauswahl. Als Schriftfarbe nur auf dunklem Grund: Schriftzug auf Schildscheibe und Stempel, Wortmarke im Sockel, Zahl in der Kärtchenleiste, Haken im gewählten Kreis.
- **Gedrückte Limette** (limette-tief): Überfahrzustand der Lampe und der Punkt „heute geöffnet“. Kein eigener Auftritt darüber hinaus.
- **Lampenrand** (limette-rand): Der 1-px-Rand jeder Lampe. Kein eigener Wert in `:root`, sondern im Build als `color-mix(in oklch, var(--anthrazit) 18%, var(--limette))` gemischt; hier aufgelöst, damit der Abgleich ihn kennt. Nur an der Lampe.

### Tertiary
- **Eichenablage** (eiche): Nur Ornament. Die Ablage unter den Preisetiketten und unter dem Terminkärtchen, die Kante unter der Wahlleiste der Preisseite, die obere Kante des Sockels und der Kärtchenleiste, der Rand der Schildscheibe beim Überfahren. Nie Text, nie Fläche.

### Neutral
- **Salonwand** (wand): Seitengrund, Grund der Kopfleiste und der Wahlleiste, Grund der Eingabefelder, Schrift auf dunklem Grund.
- **Wand im Schatten** (wand-tief): Bildgrund, solange ein Foto lädt; Überfahrfläche kleiner runder Knöpfe.
- **Papier** (papier): Etiketten, Adresskarten, Terminkärtchen, Blatt, Schaltergrund. Weißer als die Wand, damit das Papier auf ihr liegt.
- **Anthrazit** (anthrazit): Text, Fokusrahmen, gewählter Schalter, gewählter Kreis, Rand der gewählten Adresse; Grundton aller Linien (über `color-mix`).
- **Sockel** (sockel): Fußzeile, Schildscheibe, Stempel, Kärtchenleiste am Handy. Die untere Wand des Salons.
- **Nebengrau** (grau): Nebentext auf der Wand — Bildunterschriften, Dauer, Rollen, Legenden, Zeitangaben.
- **Helles Grau** (grau-hell): Nebentext nur auf dem Sockel.
- **Schildmetall** (metall): Schildarm, Rand der Scheibe und des Stempels, Punkt „heute geschlossen“, Scrollleiste.

### Named Rules
**The Eine-Lampe Rule.** In jeder Knopfgruppe leuchtet genau ein Knopf in Limette; alle anderen sind Linie. Der Terminknopf in der Kopfleiste bleibt Linie, solange der Auftakt mit seinem eigenen Terminknopf sichtbar ist, und auf der Preisseite, sobald etwas auf dem Kärtchen liegt — dann führt dessen Knopf.

**The Limette-auf-Dunkel Rule.** Limette als Schriftfarbe steht nur auf Sockel oder Anthrazit (Schild, Stempel, Wortmarke im Sockel, Kärtchenleiste, gewählter Kreis). Auf der Wand tritt sie nur als Fläche mit anthrazitfarbener Schrift oder als Linie auf.

**The Eiche-nur-Ornament Rule.** Eiche ist ein Gegenstand im Raum — Ablage oder Kante —, nie Text und nie Fläche hinter Inhalt.

**The Linien-aus-Anthrazit Rule.** Linien sind keine eigenen Farben, sondern Anthrazit über `color-mix` (14 % fein, 32 % stark). Neue Transparenzen entstehen genauso aus einem Token, nie als Rohwert.

## Typography

**Display Font:** Archivo, schmal (font-stretch 72 %, Marke 62 %) (mit system-ui, sans-serif)
**Body Font:** Archivo, normal breit (font-stretch 100 %) (mit system-ui, sans-serif)

**Character:** Eine variable Groteske, die das Schild an der Fassade nachstellt: Überschriften, Preise und die Marke eng und schwer wie der Schriftzug „FRISEURE“, der Lesetext offen und normal breit. Die Kursive tritt nur als Betonung in der großen Überschrift auf („Die *Schrägsten* von München“).

### Hierarchy
- **Display** (820, t-h1, 0,92): Die eine große Überschrift je Seite (Auftakt, Preise). Am Handy eigene Größe.
- **Headline** (780, t-h2, 1,02): Kapitelüberschriften, höchstens 18ch breit; auf Textseiten als h1.
- **Title** (780, t-h3 bis t-zahl, 1,02–1,1): Gruppentitel der Preisliste, Adresskarten, Kärtchenkopf (t-titel).
- **Zahl** (800, t-zahl, 1, schmal, Tabellenziffern): Preise auf Etiketten, Summe im Kärtchen, Telefonnummer im Auftakt.
- **Body** (400, t-text, 1,55): Lesetext. Einleitungssätze in t-gross mit 1,45, 30–52ch breit; Rechtstexte höchstens 65ch.
- **Label** (560–650, t-neben / t-knopf): Navigation, Schalter, Knöpfe, Rollen, Zeitangaben. t-klein (0,8125 rem) für Bildunterschriften, Dauer, Feldnamen, Fußnoten.
- **Schildschrift / Wortmarke** (860, 62 % breit, Versalien): „FRISEURE“ in Wortmarke (1,625 rem), Schildscheibe (aus dem Durchmesser gerechnet, 0,19 × d) und Stempel (0,75 rem). Darüber „DIE“ gesperrt (0,24–0,26em) in 650 als Teil der Marke.

### Named Rules
**The Zwei-Breiten Rule.** Was man liest, ist 100 % breit; was man erkennt — Überschrift, Preis, Marke —, ist schmal. Keine dritte Breite außer der Ortszeile im Schild (86 %).

**The Tabellenziffern Rule.** Jede Zahl, die man vergleicht oder wählt — Preise, Telefonnummern, Zeiten, Summen —, steht in `tabular-nums`.

**The Treppe Rule.** Schriftgrößen kommen aus der Treppe in `typography.scale`. Gesperrte Versalien gibt es nur in der Marke („DIE“ über „FRISEURE“), nie als Kennzeile über einer Überschrift.

## Layout

Ein zentrierter Satzspiegel (breite 76 rem, seitlicher rand fließend 1–2,5 rem) mit großer, fließender Luft zwischen den Kapiteln (luft 4–7,5 rem; am Handy 3,75 rem). Der Auftakt ist ab 64 rem zweispaltig (Satz links, Teamfoto rechts, 1 : 1,18), darunter läuft die Salonzeile als Band über die ganze Breite, an deren Trennlinie das Nasenschild hängt. Die Preisseite ist eine Spalte von höchstens 52 rem; ab 72 rem steht das Terminkärtchen rechts daneben (19–22 rem) und klebt mit.

Die Kopfleiste ist 4 rem hoch (3,5 rem unter 52 rem), klebt oben und weicht beim Runterscrollen aus. Die Wahlleiste der Preisseite klebt unter ihr wie eine Ablage.

Brüche: 23,5 rem (kleinstes Handy), 40 rem (Handykomposition), 52 rem (Navigation weg), 64 rem (Auftakt zweispaltig), 72 rem (Kärtchen neben der Liste).

Am Handy eigene Komposition: Teamfoto randlos, darunter Satz, Schild und genau ein leuchtender Knopf; Team, Etiketten und Bewertungen als Wischreihen mit Einrasten statt Säulen; Galerie zwei nebeneinander; das Kärtchen als Leiste unten, die sich als Blatt öffnet.

**The Vorlagengröße Rule.** Kein Foto wird über seine Vorlage gezogen: Porträts 11,5 rem breit (369 px Vorlage), Raumfoto höchstens 1280 px, Auftaktbild höchstens 1000 px. Die Aufnahme gibt das Format vor; `object-fit: cover` nur, wo das Format der Aufnahme dem Rahmen entspricht (Galerie, Raumfoto 16 : 10).

**The Schleier-nur-hinter-Text Rule.** Über einem vollflächigen Foto liegt ein Schleier aus der Wandfarbe nur als senkrechtes Band hinter dem Textblock, nach oben ausgeblendet; der Rest der Aufnahme bleibt offen.

## Elevation & Depth

Das System ist flach und materiell. Tiefe entsteht aus Tonstufen (Papier auf Wand, Wand auf Sockel), aus feinen Linien und aus der Eichenablage, auf der Etiketten und Kärtchen stehen. Genau ein Schatten existiert, und er gehört Gegenständen, die im Raum hängen oder stehen.

### Shadow Vocabulary
- **Gegenstand** (`box-shadow: var(--schatten)` = 0 1px 2px Anthrazit 12 %, 0 8px 24px -8px Anthrazit 22 %): Schildscheibe und Terminkärtchen am breiten Schirm. Im Blatt entfällt er.

### Named Rules
**The Material-statt-Schatten Rule.** Karten liegen mit einer feinen Linie auf der Wand, nicht mit Schatten. Der Schatten ist dem Schild und dem Kärtchen vorbehalten.

## Shapes

Sanft gerundete Ecken (ecke, 0,375 rem) an Fotos, Karten und Feldern; vollrunde Formen (pill) für Knöpfe und Schalter; Kreise für Schild, Stempel, Wahlkreis und kleine Schließknöpfe. Etiketten und Kärtchen haben oben die volle Ecke und unten nur eine Kante (2 px) — sie stehen auf der Ablage. Die Ablage selbst ist ein 0,5 rem hoher Eichenstreifen, 0,5 rem breiter als ihre Reihe auf jeder Seite. Das Blatt am Handy rundet oben stärker (0,875 rem). Linien sind durchgezogen (Kapitel, Gruppen), gepunktet (Zeiten, Kärtchenposten) oder gestrichelt (Kärtchenkopf, wie ein Abreißrand).

## Components

### Buttons
Rund, klar, genau einer leuchtet.
- **Shape:** vollrund (999 px), Mindesthöhe 2,875 rem (Kopfleiste 2,5 rem, Handy-Lampe 3 rem).
- **Lampe:** Limette mit Anthrazitschrift, Rand Anthrazit 18 % in Limette gemischt, 650er Gewicht.
- **Linie:** transparent, Rand Linie stark, Anthrazitschrift.
- **Hover / Focus:** Lampe wird limette-tief, Linie bekommt Anthrazitrand; gedrückt 1 px nach unten. Fokus: 2 px Anthrazitrahmen, 3 px Abstand (auf dem Sockel Limette).
- **Pfeil-Link:** Textlink mit 2 px Limetten-Unterstreichung und maskiertem Pfeil, der beim Überfahren 0,15em nach rechts rückt.

### Chips
- **Salonschalter:** Papierpille mit Rand, darin Radioknöpfe als Beschriftungen; die gewählte ist Anthrazit mit Wandschrift. In der Wahlleiste der Preisseite trägt jede Wahl ihren eigenen Rand.

### Cards / Containers
- **Corner Style:** ecke (0,375 rem); Etikett und Kärtchen unten kante (2 px).
- **Background:** Papier.
- **Shadow Strategy:** keiner, außer beim Kärtchen (siehe Elevation).
- **Border:** 1 px Linie; gewählte Adresse 1 px Anthrazit.
- **Internal Padding:** 1–1,5 rem.
- **Preisetikett:** Name oben, Preis unten in schmaler Zahl; hebt sich beim Überfahren um 3 px. Steht auf der Eichenablage.

### Inputs / Fields
- **Style:** Wandgrund, 1 px Linie stark, ecke, Mindesthöhe 2,75 rem, 1 rem Schrift (kein Zoom auf iOS); Feldname in t-klein, 600, grau.
- **Focus:** 2 px Anthrazitrahmen mit 1 px Abstand, Rand wird Anthrazit.

### Navigation
- **Kopfleiste:** Wandgrund, feine Linie unten. Wortmarke links, Links in 560 / t-neben, Telefonnummer in Tabellenziffern, Terminknopf rechts. Aktueller Punkt mit 2 px Limette unterstrichen, Überfahren unterstreicht. Unter 52 rem verschwinden die Links, die Nummer rückt nach rechts. Beim Runterscrollen weicht die Leiste nach oben aus (Abgangskurve), beim Hochscrollen kommt sie zurück.
- **Sockel (Fußzeile):** Sockelgrund, 0,5 rem Eichenkante oben, Wortmarke in Limette.

### Nasenschild
Die Signatur der Startseite. Ein Metallarm (SVG, 150 : 40) hält eine runde Scheibe aus Sockelgrau mit 3 px Metallrand; darauf „DIE / FRISEURE / Ort“, die Schriftgrößen aus dem Durchmesser gerechnet (d = 7,75 rem, Handy 5,75 rem). Die Scheibe hat zwei Seiten und dreht sich per `rotateY(180deg)` in 0,8 s zwischen Haidhausen und Ismaning, gesteuert allein über den Radioknopf (`:has()`). Am breiten Schirm liegt der Querbalken des Arms genau auf der Trennlinie der Salonzeile.

### Terminkärtchen
Die Signatur der Preisseite. Ein Papierkärtchen mit dem Schild als Stempel (Scheibe ohne Arm, 3,5 rem), gestricheltem Kopf, gepunkteten Posten, Summe in schmaler Zahl, Feldern für Wunschperson und Zeit und einer Knopfgruppe mit genau einer Lampe. Jede Preiszeile trägt rechts einen Wahlkreis (Papier mit Plus; gewählt Anthrazit mit Limettenhaken). Am breiten Schirm steht das Kärtchen auf derselben Eichenablage wie die Etiketten und klebt mit; am Handy zeigt eine Sockelleiste mit Eichenkante die Anzahl und öffnet das Kärtchen als Blatt von unten.

### Salonwahl
Zwei Radioknöpfe im sichtbaren Schalter; `body:has(#salon-h:checked)` / `body:has(#salon-i:checked)` blenden alles Ortsgebundene um (Adresse, Telefon, Zeiten, Team, Fotos, Terminknopf, Preisgruppen). Funktioniert ohne Skript; das Skript merkt sich die Wahl und liest `?salon=`.

### Bewegung
Nur Ausrollkurven (kurve, `cubic-bezier(0.22, 1, 0.36, 1)`); Abgänge beschleunigen (kurve-ab). Nur `transform` und `opacity` (dazu Farb- und Randübergänge). Dauern 0,3–0,9 s (Standard 0,45 s, Schild 0,8 s). Überfahreffekte nur hinter `(hover: hover) and (pointer: fine)`. Bei `prefers-reduced-motion` fallen alle Dauern auf null, das Schild wechselt ohne Drehung.

## Do's and Don'ts

### Do:
- **Do** lass in jeder Knopfgruppe genau einen Knopf in Limette leuchten; alle anderen sind Linie.
- **Do** setze Limette als Schrift nur auf Sockel oder Anthrazit.
- **Do** setze Eiche nur als Ablage oder Kante (0,5 rem Streifen, 3–4 px Kante).
- **Do** schalte alles Ortsgebundene über die Radioknöpfe und `:has()`, ohne Skript.
- **Do** bewege nur `transform` und `opacity`, mit Ausrollkurve, 0,3–0,9 s, und bediene `prefers-reduced-motion`.
- **Do** setze Preise, Telefonnummern und Zeiten in Tabellenziffern.
- **Do** bilde Transparenzen über `color-mix(in oklch, var(--token) N%, transparent)`.

### Don't:
- **Don't** zieh ein Foto über seine Vorlage hinaus (Porträts 369 px, Raumfotos 1280 px).
- **Don't** lass zwei Knöpfe einer Gruppe gleichzeitig leuchten — auch nicht Kopfleiste und Auftakt.
- **Don't** setze Eiche als Text oder als Fläche hinter Inhalt.
- **Don't** gib Karten einen Schatten; der Schatten gehört Schild und Kärtchen.
- **Don't** leg einen Schleier über die ganze Fläche eines Fotos.
- **Don't** setze gesperrte Versalien als Kennzeile über eine Überschrift; gesperrt ist nur „DIE“ in der Marke.
- **Don't** führ eine neue Farbe als Rohwert ein; jede Farbe ist ein Token in `:root`.
