# Den nächsten Salon aufsetzen

Das hier ist der Werkzeugkasten, keine Vorlage zum Umfärben. Übertragen
wird die **Arbeitsweise**; Palette, Schrift, Bildsprache und die eigene
Idee entstehen jedes Mal neu aus dem Laden.

## Mitnehmen (unverändert kopieren)

```
.claude/                    Skills (salon-website, impeccable, Bewegung), Agenten
.github/workflows/deploy-pages.yml
.gitignore
CLAUDE.md                   Arbeitsweise, Vorlieben, Fallen — ohne Kundendaten
```

## Neu machen (nicht kopieren)

`index.html`, `preise.html`, `stil.css`, `seite.js`, `bilder/`, `schrift/`,
`PRODUCT.md`, `UEBERGABE.md`, `ABNAHME.md`, `recherche/`.

Als **Nachschlagewerk** taugt dieses Projekt trotzdem: wie die Salonwahl
ohne Skript läuft (`:has()`), wie `werkzeuge/preise.py` Treatwell-Daten
zuordnet und bei Lücken abbricht, wie die Prüfungen aufgerufen werden.

## Ablauf in fünf Schritten

1. **Recherche** (Rezepte in `.claude/skills/salon-website/SKILL.md`):
   Buchungsdienst als JSON sichern, alte Website als Text, Fotos laden und
   als Kontaktbogen ansehen. Stockfotos und Lieferantenbilder aussortieren.
2. **Schauen, dann festlegen:** Farben aus den Fotos messen (Wand, Boden,
   Möbel, Schild, Logo). Prüftest für die Leitfarbe: Gehört sie dem Laden
   oder einem Lieferanten? Die eigene Idee aus einem Ding im Laden, das es
   nur dort gibt (hier: das Nasenschild) — und sie muss klein funktionieren.
3. **Richtungsvertrag** als Kommentar nach `<body>` schreiben: THESE,
   EIGENE WELT, ERSTER BILDSCHIRM, FORM. Danach `PRODUCT.md`.
4. **Bauen:** Token in `:root`, Person im ersten Bildschirm, Handy eigens
   komponiert, Preise generiert.
5. **Prüfen** (Tabelle in der Norm, Abschnitt 7), Abschlussprüfer,
   Documenter, `UEBERGABE.md` mit Zahlen, `ABNAHME.md` mit Fragen, Push,
   Live-URL abfragen.
