# Die Friseure — Haidhausen und Ismaning

Website der Salons Die Friseure in der Wörthstraße 40 (München-Haidhausen)
und am Bahnhofplatz 5 (Ismaning). Statisch, ohne Build. Live bei STRATO
(die-friseure-haidhausen.de, Ordner `/haidhausen`); jeder Push auf `main`
lädt per `.github/workflows/strato.yml` hoch. GitHub Pages leitet nur noch
dorthin weiter.

- Lokal ansehen: `python3 -m http.server 8099`, dann http://127.0.0.1:8099/
- Preise neu erzeugen: `python3 werkzeuge/preise.py`
- Arbeitsweise: `CLAUDE.md`; Norm und Prüfskripte:
  `.claude/skills/salon-website/`
- Stand und Messungen: `UEBERGABE.md`; offene Fragen an den Salon: `ABNAHME.md`
- Nächsten Salon aufsetzen: `NEUER-SALON.md`
