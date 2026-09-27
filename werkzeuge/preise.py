#!/usr/bin/env python3
"""Preisliste aus den Treatwell-Rohdaten erzeugen.

Liest recherche/treatwell-<salon>.json und schreibt zwischen die Marken
<!-- preise:start --> … <!-- preise:ende --> in preise.html sowie
<!-- einstieg:start --> … <!-- einstieg:ende --> in index.html.

Bricht ab, sobald ein Posten keiner Gruppe zugeordnet ist — lieber kein
Neubau als eine Leistung, die still verschwindet.

Aufruf:  python3 werkzeuge/preise.py
"""
import html
import json
import re
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
SALONS = {"haidhausen": "h", "ismaning": "i"}

# Gruppen nach Ablauf: was zuerst passiert, steht zuerst.
GRUPPEN = [
    ("schnitt", "Schneiden & Föhnen", "Damen"),
    ("herren", "Herren", "Schnitt, Bart, Farbe"),
    ("farbe", "Farbe & Strähnen", "Damen"),
    ("glaetten", "Keratin-Glättung", "nur Haidhausen"),
    ("augen", "Augenbrauen & Wimpern", ""),
    ("haende", "Hände & Füße", "nur Ismaning, bei Jasmin"),
]

# Zuordnung: Muster auf den Treatwell-Namen → (Gruppe, Anzeigename, Rang).
# Das erste passende Muster gewinnt; der Rang ordnet innerhalb der Gruppe.
ZUORDNUNG = [
    (r"^damen - waschen, schneiden & föhnen inkl", "schnitt", "Waschen, Schneiden & Föhnen, inkl. Pflege", 10),
    (r"^damen - waschen, schneiden & föhnen$", "schnitt", "Waschen, Schneiden & Föhnen", 10),
    (r"^damen - waschen & schneiden", "schnitt", "Waschen & Schneiden", 20),
    (r"^damen - waschen & föhnen", "schnitt", "Waschen & Föhnen", 30),
    (r"^herren - haarschnitt", "herren", "Haarschnitt", 10),
    (r"^herren - waschen, schneiden & föhnen\W*lang", "herren", "Waschen, Schneiden & Föhnen, lange Haare", 30),
    (r"^herren - waschen, schneiden & föhnen$", "herren", "Waschen, Schneiden & Föhnen", 20),
    (r"^herren - waschen,\s*schni?e?den, rasur", "herren", "Waschen, Schneiden & Rasur", 40),
    (r"^herren - bart schneiden", "herren", "Bart schneiden", 50),
    (r"^herren - rasur", "herren", "Rasur", 50),
    (r"^herren - färben", "herren", "Färben", 60),
    (r"^herren - farbe, schnitt", "herren", "Farbe, Schnitt & Föhnen", 65),
    (r"^herren - strähnen$", "herren", "Strähnen", 70),
    (r"^herren - strähnen, schnitt", "herren", "Strähnen, Schnitt & Föhnen", 75),
    (r"^damen - ansatzfarbe", "farbe", "Ansatzfarbe & Föhnen", 5),
    (r"^damen - farbe komplett\W*$", "farbe", "Farbe komplett", 10),
    (r"^damen - (farbe komplett, schnitt|färben, waschen, schneiden)", "farbe", "Farbe komplett, Schnitt & Föhnen", 20),
    (r"^damen - strähnen halber kopf\W*$", "farbe", "Strähnen, halber Kopf", 30),
    (r"^damen - strähnen halber kopf schnitt", "farbe", "Strähnen halber Kopf, Schnitt & Föhnen", 35),
    (r"^damen - foliensträhnen halber", "farbe", "Foliensträhnen halber Kopf, Schnitt & Föhnen", 36),
    (r"^damen - strähnen ganzer kopf\W*$", "farbe", "Strähnen, ganzer Kopf", 40),
    (r"^damen - strähnen ganzer kopf, schnitt", "farbe", "Strähnen ganzer Kopf, Schnitt & Föhnen", 45),
    (r"^damen - balayage ab", "farbe", "Balayage", 50),
    (r"^damen - balayage, (schnitt|waschen)", "farbe", "Balayage, Schnitt & Föhnen", 55),
    (r"^damen - keratin", "glaetten", "Brasilianische Keratin-Behandlung", 10),
    (r"^damen - augenbrauen zupfen", "augen", "Augenbrauen zupfen", 10),
    (r"^augenbrauen färben$", "augen", "Augenbrauen färben", 20),
    (r"^damen - wimpern färben", "augen", "Wimpern färben", 30),
    (r"^augenbrauen färben & zupfen, wimpern", "augen", "Augenbrauen färben & zupfen, Wimpern färben", 40),
    (r"^haarentfernung mit fadentechnik", "augen", "Gesicht komplett, mit Fadentechnik", 50),
    (r"^maniküre$", "haende", "Maniküre", 10),
    (r"^maniküre mit shellac", "haende", "Maniküre mit Shellac", 20),
    (r"^pediküre$", "haende", "Pediküre", 30),
    (r"^pediküre mit shellac", "haende", "Pediküre mit Shellac", 40),
    (r"^maniküre & pediküre$", "haende", "Maniküre & Pediküre", 50),
    (r"^maniküre & pediküre mit shellac", "haende", "Maniküre & Pediküre mit Shellac", 60),
    (r"^shellac entfernen", "haende", "Shellac entfernen", 70),
]

LAENGEN = {"kurz": 0, "mittel": 1, "lang": 1, "extra lang": 2}
# Varianten, die keine Länge sind, werden zu eigenen Zeilen (Maniküre mit Lack …).
ZUSATZ = {
    "ohne lack": "", "mit lack": "mit Lack",
    "shellac": "", "maniküre shellac": "",
    "pediküre shellac french": "French", "maniküre shellac french": "French",
}


def euro(betrag):
    zahl = float(betrag)
    return f"{zahl:.0f}" if zahl == int(zahl) else f"{zahl:.2f}".replace(".", ",")


def dauer(a, b):
    if not a:
        return ""
    return f"{a} Min." if a == b or not b else f"{a}–{b} Min."


def posten_lesen():
    """Alle Posten beider Salons, zugeordnet und in Zeilen zerlegt."""
    zeilen = []
    fehlt = []
    for salon, kurz in SALONS.items():
        daten = json.loads((WURZEL / f"recherche/treatwell-{salon}.json").read_text("utf-8"))
        for gruppe in daten["menu"]:
            for p in gruppe["leistungen"]:
                roh = re.sub(r"\s+", " ", p["name"]).strip()
                schluessel = roh.lower().rstrip(" .,")
                treffer = next((z for z in ZUORDNUNG if re.search(z[0], schluessel)), None)
                if not treffer:
                    fehlt.append(f"{salon}: {roh}")
                    continue
                _, grp, name, rang = treffer
                ab = bool(re.search(r"\bab\b", schluessel))
                varianten = p["varianten"] or []
                namen = [v["name"].strip().lower() for v in varianten]
                if varianten and all(n in LAENGEN for n in namen):
                    # Längenpreise: kurz / mittel / lang
                    stufen = {}
                    geordnet = sorted(varianten, key=lambda v: LAENGEN[v["name"].strip().lower()])
                    if len(geordnet) == 3:
                        ziel = ["k", "m", "l"]
                    elif len(geordnet) == 2:
                        ziel = ["k", "m l"]
                    else:
                        ziel = ["k m l"]
                    for v, l in zip(geordnet, ziel):
                        stufen[l] = (euro(v["preis_min"]), dauer(v["min"], v["max"]))
                    zeilen.append(dict(salon=kurz, gruppe=grp, name=name, rang=rang, ab=ab, preise=stufen))
                elif varianten and all(n in ZUSATZ for n in namen):
                    for i, v in enumerate(varianten):
                        zusatz = ZUSATZ[v["name"].strip().lower()]
                        zeilen.append(dict(
                            salon=kurz, gruppe=grp, name=f"{name} {zusatz}".strip(), rang=rang + i,
                            ab=ab, preise={"k m l": (euro(v["preis_min"]), dauer(v["min"], v["max"]))}))
                else:
                    if varianten and any(n not in LAENGEN and n not in ZUSATZ and not re.match(r"^\d+ (minuten|stunden)$", n)
                                         and re.sub(r"\s+", " ", n).rstrip(" .,") != schluessel for n in namen):
                        fehlt.append(f"{salon}: {roh} — unbekannte Variante {namen}")
                        continue
                    zeilen.append(dict(
                        salon=kurz, gruppe=grp, name=name, rang=rang, ab=ab,
                        preise={"k m l": (euro(p["preis_min"]), dauer(p["dauer_min"], p["dauer_max"]))}))
    if fehlt:
        sys.exit("Nicht zugeordnet — bitte ZUORDNUNG ergänzen:\n  " + "\n  ".join(fehlt))
    return zeilen


def zusammenlegen(zeilen):
    """Gleiche Leistung zum gleichen Preis in beiden Salons → eine Zeile."""
    fertig = {}
    for z in zeilen:
        k = (z["gruppe"], z["name"], json.dumps(z["preise"], sort_keys=True), z["ab"])
        if k in fertig:
            fertig[k]["salon"] += " " + z["salon"]
        else:
            fertig[k] = dict(z)
    return sorted(fertig.values(), key=lambda z: (z["rang"], z["name"], z["salon"]))


def zeile_html(z):
    ab = '<span class="ab">ab</span> ' if z["ab"] else ""
    preise = []
    dauern = []
    for l, (preis, d) in z["preise"].items():
        preise.append(f'<span class="betrag" data-l="{l}">{ab}{preis}&nbsp;€</span>')
        if d:
            dauern.append(f'<span data-l="{l}">{d}</span>')
    laenge = ' data-laenge' if len(z["preise"]) > 1 else ""
    return (
        f'<li class="posten" data-salon="{z["salon"]}"{laenge}>'
        f'<span class="posten-name">{html.escape(z["name"])}'
        f'<span class="posten-dauer">{"".join(dauern)}</span></span>'
        f'<span class="posten-preis">{"".join(preise)}</span></li>'
    )


BUCHEN = {
    "h": ("Haidhausen", "https://www.treatwell.de/ort/die-friseure-aus-haidhausen/", "+498952033549", "089 52 03 35 49"),
    "i": ("Ismaning", "https://www.treatwell.de/ort/die-friseure-aus-ismaning/", "+498924590673", "089 24 59 06 73"),
}


def weg_html(salons):
    """Am Gruppenende der Buchungsweg — je Salon ein Paar, das CSS zeigt das gewählte."""
    teile = []
    for s in salons:
        ort, url, tel, tel_text = BUCHEN[s]
        teile.append(
            f'  <p class="gruppe-weg" data-nur="{s}"><a class="knopf knopf-linie" href="{url}" rel="noopener">'
            f'In {ort} bei Treatwell buchen</a>'
            f'<a class="gruppe-tel" href="tel:{tel}">oder anrufen: {tel_text}</a></p>\n'
        )
    return "".join(teile)


def preisliste(zeilen):
    teile = []
    for i, (gid, titel, zusatz) in enumerate(GRUPPEN):
        posten = [z for z in zeilen if z["gruppe"] == gid]
        if not posten:
            sys.exit(f"Gruppe {gid} ist leer")
        salons = sorted({s for z in posten for s in z["salon"].split()})
        offen = " open" if i == 0 else ""
        klein = f'<span class="gruppe-zusatz">{html.escape(zusatz)}</span>' if zusatz else ""
        teile.append(
            f'<details class="gruppe" name="gruppe" id="{gid}" data-salons="{" ".join(salons)}"{offen}>\n'
            f'  <summary>'
            f'<span class="gruppe-titel">{html.escape(titel)}</span>{klein}</summary>\n'
            f'  <ul class="posten-liste">\n    '
            + "\n    ".join(zeile_html(z) for z in posten)
            + "\n  </ul>\n"
            + weg_html(salons)
            + "</details>"
        )
    return "\n".join(teile)


def einstieg(zeilen):
    """Fünf Einstiegspreise für die Startseite — das Minimum über beide Salons."""
    wahl = [
        ("herren", "Haarschnitt", "Herrenschnitt"),
        ("schnitt", "Waschen, Schneiden & Föhnen", "Damenschnitt mit Föhnen"),
        ("farbe", "Farbe komplett", "Farbe komplett"),
        ("farbe", "Strähnen, halber Kopf", "Strähnen, halber Kopf"),
        ("farbe", "Balayage", "Balayage"),
    ]
    teile = []
    for gid, name, anzeige in wahl:
        treffer = [z for z in zeilen if z["gruppe"] == gid and z["name"] == name]
        if not treffer:
            sys.exit(f"Einstieg: {name} nicht gefunden")
        preise = [float(p.replace(",", ".")) for z in treffer for p, _ in z["preise"].values()]
        # Einen Preis ohne Spanne nennen wir ohne „ab“.
        ab = len(set(preise)) > 1 or any(z["ab"] for z in treffer)
        teile.append(
            f'<li class="etikett"><a href="preise.html#{gid}">'
            f'<span class="etikett-name">{html.escape(anzeige)}</span>'
            f'<span class="etikett-preis">{"ab " if ab else ""}{euro(min(preise))}&nbsp;€</span></a></li>'
        )
    return "\n".join(teile)


def einsetzen(datei, marke, inhalt):
    pfad = WURZEL / datei
    text = pfad.read_text("utf-8")
    muster = re.compile(rf"(<!-- {marke}:start -->)(.*?)(<!-- {marke}:ende -->)", re.S)
    if not muster.search(text):
        sys.exit(f"Marke {marke} fehlt in {datei}")
    text = muster.sub(lambda m: f"{m.group(1)}\n{inhalt}\n{m.group(3)}", text)
    pfad.write_text(text, "utf-8")


if __name__ == "__main__":
    zeilen = zusammenlegen(posten_lesen())
    einsetzen("preise.html", "preise", preisliste(zeilen))
    einsetzen("index.html", "einstieg", einstieg(zeilen))
    print(f"{len(zeilen)} Zeilen in {len(GRUPPEN)} Gruppen geschrieben.")
