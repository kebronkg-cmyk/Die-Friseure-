/* Die Friseure — kleine Helfer. Die Seite funktioniert auch ohne dieses Skript:
   Salon- und Längenwahl laufen über Radioknöpfe und :has(). */
(function () {
  "use strict";

  var speicher = {
    lesen: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    schreiben: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* privat */ } }
  };

  /* --- Salon und Haarlänge merken; ?salon= in der Adresse gewinnt --- */
  function merken(name, schluessel, ausAdresse) {
    var wert = ausAdresse || speicher.lesen(schluessel);
    if (wert) {
      var knopf = document.querySelector('input[name="' + name + '"][value="' + wert + '"]');
      if (knopf) knopf.checked = true;
    }
    document.addEventListener("change", function (e) {
      if (e.target.name === name) speicher.schreiben(schluessel, e.target.value);
    });
  }
  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var KURVE = "cubic-bezier(0.22, 1, 0.36, 1)";      /* wie --kurve: Auftritt bremst aus */
  var KURVE_AB = "cubic-bezier(0.55, 0, 1, 0.45)";   /* wie --kurve-ab: Abgang beschleunigt */

  var adresse = new URLSearchParams(location.search);
  merken("salon", "df-salon", adresse.get("salon"));
  merken("laenge", "df-laenge", null);

  /* --- Leiste: weicht beim Runterscrollen aus, kommt beim Hochscrollen zurück --- */
  var leiste = document.querySelector(".leiste");
  if (leiste) {
    var zuletzt = window.scrollY;
    var weg = false;
    var HYSTERESE = 6;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var d = y - zuletzt;
      if (Math.abs(d) < HYSTERESE) return;
      var soll = d > 0 && y > leiste.offsetHeight * 2;
      if (soll !== weg) {
        weg = soll;
        leiste.classList.toggle("weg", weg);
      }
      zuletzt = y;
    }, { passive: true });
    leiste.addEventListener("focusin", function () { weg = false; leiste.classList.remove("weg"); });
  }

  /* --- Eine Lampe: der Knopf in der Leiste leuchtet erst, wenn der
         Terminknopf des Auftakts aus dem Bild ist --- */
  var auftaktKnopf = document.querySelector(".auftakt .knopfreihe");
  if (auftaktKnopf && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      document.body.classList.toggle("auftakt-weg", !e[0].isIntersecting);
    }).observe(auftaktKnopf);
  }

  /* --- Handy: In der Leiste steht, in welchem Kapitel man gerade ist --- */
  var kapitelAnzeige = document.querySelector(".leiste-kapitel");
  if (kapitelAnzeige && "IntersectionObserver" in window) {
    var aktiv = null;
    var titel = Array.prototype.slice.call(document.querySelectorAll("h2[data-nr]"));
    var beobachter = new IntersectionObserver(function () {
      /* Das Kapitel, dessen Abschnitt gerade die Bildmitte kreuzt */
      var mitte = innerHeight * 0.45, gefunden = null;
      titel.forEach(function (h) {
        var r = h.closest("section").getBoundingClientRect();
        if (r.top <= mitte && r.bottom > mitte) gefunden = h;
      });
      if (gefunden === aktiv) return;
      aktiv = gefunden;
      document.body.classList.toggle("im-kapitel", !!gefunden);
      if (!gefunden) return;
      kapitelAnzeige.innerHTML = "<b></b>";
      kapitelAnzeige.firstChild.textContent = gefunden.dataset.nr;
      kapitelAnzeige.appendChild(document.createTextNode(gefunden.dataset.kurz));
      if (!ruhig && kapitelAnzeige.animate) kapitelAnzeige.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: KURVE });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-45% 0px -54% 0px" });
    titel.forEach(function (h) { beobachter.observe(h.closest("section")); });
  }

  /* --- Heute geöffnet? Uhrzeit in München, nicht die des Geräts --- */
  var TAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  function jetztInMuenchen() {
    var teile = new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var w = {};
    teile.forEach(function (t) { w[t.type] = t.value; });
    var tag = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].indexOf(w.weekday.replace(".", ""));
    return { tag: tag, minute: parseInt(w.hour, 10) % 24 * 60 + parseInt(w.minute, 10) };
  }
  function zeitenLesen(text) {
    // „1 09:00-18:30;3-5 09:00-18:30;6 09:00-17:00“ → je Wochentag [von, bis]
    var plan = {};
    text.split(";").forEach(function (block) {
      var m = block.trim().match(/^(\d)(?:-(\d))?\s+(\d\d):(\d\d)-(\d\d):(\d\d)$/);
      if (!m) return;
      for (var t = +m[1]; t <= +(m[2] || m[1]); t++) {
        plan[t] = [+m[3] * 60 + +m[4], +m[5] * 60 + +m[6]];
      }
    });
    return plan;
  }
  function uhr(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + (m ? ":" + String(m).padStart(2, "0") : "") + "\u00a0Uhr";   /* „9 Uhr“ bricht nicht */
  }
  document.querySelectorAll("[data-zeiten]").forEach(function (el) {
    var plan = zeitenLesen(el.dataset.zeiten);
    var j = jetztInMuenchen();
    var heute = plan[j.tag];
    var satz, offen = false;
    if (heute && j.minute >= heute[0] && j.minute < heute[1]) {
      offen = true;
      satz = "Jetzt geöffnet, heute bis " + uhr(heute[1]);
    } else if (heute && j.minute < heute[0]) {
      satz = "Heute ab " + uhr(heute[0]) + " geöffnet";
    } else {
      for (var i = 1; i <= 7; i++) {
        var t = (j.tag + i) % 7;
        if (plan[t]) {
          satz = "Geschlossen · " + (i === 1 ? "morgen" : TAGE[t]) + " ab " + uhr(plan[t][0]);
          break;
        }
      }
    }
    if (satz) {
      el.textContent = satz;
      el.dataset.offen = offen ? "ja" : "nein";
    }
  });

  /* --- Preisseite: Gruppe aus der Adresse öffnen, sichtbare Gruppe offen halten --- */
  var gruppen = Array.prototype.slice.call(document.querySelectorAll(".gruppe"));
  if (gruppen.length) {
    var ziel = location.hash && document.getElementById(location.hash.slice(1));
    if (ziel && ziel.classList.contains("gruppe")) ziel.open = true;

    var sichtbarOffen = function () {
      var offene = gruppen.filter(function (g) { return g.open && g.checkVisibility(); });
      if (!offene.length) {
        var erste = gruppen.find(function (g) { return g.checkVisibility(); });
        if (erste) erste.open = true;
      }
    };
    document.addEventListener("change", function (e) {
      if (e.target.name === "salon") sichtbarOffen();
    });
    sichtbarOffen();
  }

  /* --- Galerie: Ansicht mit Blättern, Esc und Rückkehr an dieselbe Stelle --- */
  var ansicht = document.querySelector(".ansicht");
  if (ansicht && typeof ansicht.showModal === "function") {
    var bild = ansicht.querySelector(".ansicht-bild");
    var text = ansicht.querySelector(".ansicht-text");
    var reihe = [], stelle = 0, ausloeser = null;

    var zeigen = function (i) {
      stelle = (i + reihe.length) % reihe.length;
      var k = reihe[stelle];
      var klein = k.querySelector("img");
      bild.src = k.dataset.gross;
      bild.alt = klein.alt;
      text.textContent = klein.alt;
    };
    document.querySelectorAll(".galerie-kachel").forEach(function (k) {
      k.addEventListener("click", function () {
        reihe = Array.prototype.slice.call(k.closest(".galerie").querySelectorAll(".galerie-kachel"));
        ausloeser = k;
        zeigen(reihe.indexOf(k));
        ansicht.showModal();
        /* Die Ansicht wächst aus der angetippten Kachel, nicht aus der Mitte */
        var q = k.getBoundingClientRect(), r = ansicht.getBoundingClientRect();
        ansicht.style.transformOrigin = (q.left + q.width / 2 - r.left) + "px " + (q.top + q.height / 2 - r.top) + "px";
      });
    });
    /* Abgang schneller als Auftritt (0,3 s statt 0,4 s), dann erst schließen */
    var schliessen = function () {
      if (ruhig || !ansicht.animate) { ansicht.close(); return; }
      ansicht.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(0.96)" }],
        { duration: 300, easing: KURVE_AB }).onfinish = function () { ansicht.close(); };
    };
    var blaettern = function (d) {
      zeigen(stelle + d);
      if (!ruhig && bild.animate) bild.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 300, easing: KURVE });
    };
    ansicht.addEventListener("cancel", function (e) { e.preventDefault(); schliessen(); });
    ansicht.querySelector(".ansicht-zu").addEventListener("click", schliessen);
    /* Per Klick weich, per Pfeiltaste sofort — Tastatur wird nie animiert */
    ansicht.querySelector(".ansicht-zurueck").addEventListener("click", function () { blaettern(-1); });
    ansicht.querySelector(".ansicht-weiter").addEventListener("click", function () { blaettern(1); });
    ansicht.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") zeigen(stelle - 1);
      if (e.key === "ArrowRight") zeigen(stelle + 1);
    });
    ansicht.addEventListener("click", function (e) { if (e.target === ansicht) schliessen(); });
    ansicht.addEventListener("close", function () { if (ausloeser) ausloeser.focus({ preventScroll: true }); });
  }
  /* --- Terminkärtchen: Leistungen antippen, nach Ablauf gesammelt, daraus
         ein fertiger Terminwunsch. Alles bleibt im Browser. --- */
  var platz = document.querySelector(".kaertchen-platz");
  if (platz) {
    var kaertchen = platz.querySelector(".kaertchen");
    var liste = kaertchen.querySelector(".kaertchen-liste");
    var summePreis = kaertchen.querySelector(".summe-preis");
    var summeDauer = kaertchen.querySelector(".summe-dauer");
    var laengeText = kaertchen.querySelector(".kaertchen-laenge");
    var bei = kaertchen.querySelector(".feld-bei");
    var wann = kaertchen.querySelector(".feld-wann");
    var senden = kaertchen.querySelector(".kaertchen-senden");
    var kopie = kaertchen.querySelector(".kaertchen-kopie");
    var meldung = kaertchen.querySelector(".kaertchen-meldung");
    var sockelLeiste = document.querySelector(".kaertchen-leiste");
    var blatt = document.querySelector(".blatt");

    /* Wer in welchem Salon schneidet — wie auf der Startseite */
    var SALONS = {
      haidhausen: { name: "Haidhausen",
        team: ["Ali", "Wissam", "Juna", "Zahed", "Mohammed"] },
      ismaning: { name: "Ismaning",
        team: ["Ali", "Ania", "Kimi", "Yasmin"] }
    };
    /* Terminwünsche gehen für beide Salons per WhatsApp an diese Nummer */
    var WHATSAPP = "4917682304558";
    var LAENGE = { k: "kurze Haare", m: "mittellange Haare", l: "lange Haare" };

    var gewaehlt = [];
    try { gewaehlt = JSON.parse(speicher.lesen("df-kaertchen") || "[]") || []; } catch (e) { gewaehlt = []; }
    var wuensche = {};
    try { wuensche = JSON.parse(speicher.lesen("df-kaertchen-wunsch") || "{}") || {}; } catch (e) { wuensche = {}; }

    var wert = function (name) {
      var k = document.querySelector('input[name="' + name + '"]:checked');
      return k ? k.value : "";
    };
    var kurz = function (t) {
      return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    };
    var dauerText = function (min) {
      if (min < 60) return min + " Min.";
      var h = Math.floor(min / 60), m = min % 60;
      return h + " Std." + (m ? " " + m + " Min." : "");
    };
    var euro = function (n) { return n.toLocaleString("de-DE") + " €"; };

    /* Jede Zeile bekommt einen Knopf; die Kennung bleibt über Neuerzeugungen stabil */
    var SVG = '<svg class="zeichen-plus" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>' +
      '<svg class="zeichen-haken" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var posten = Array.prototype.slice.call(document.querySelectorAll(".posten"));
    posten.forEach(function (z) {
      var nameEl = z.querySelector(".posten-name");
      var name = nameEl.firstChild.textContent.trim();
      var gruppe = z.closest(".gruppe");
      z.dataset.wahl = gruppe.id + "-" + kurz(name) + "-" + kurz(z.dataset.salon || "");
      z.dataset.name = name;
      var k = document.createElement("button");
      k.type = "button";
      k.className = "posten-wahl";
      k.setAttribute("aria-pressed", "false");
      k.innerHTML = '<span class="nur-vorlesen">' + name + ' aufs Terminkärtchen</span><span class="posten-kreis">' + SVG + "</span>";
      z.appendChild(k);
      k.addEventListener("click", function () {
        var i = gewaehlt.indexOf(z.dataset.wahl);
        if (i < 0) { gewaehlt.push(z.dataset.wahl); neu = z.dataset.wahl; } else gewaehlt.splice(i, 1);
        speicher.schreiben("df-kaertchen", JSON.stringify(gewaehlt));
        zeichnen();
        if (i < 0) fliegen(k.querySelector(".posten-kreis"));
      });
    });
    var neu = null;

    /* Ein Punkt fliegt vom Kreis der Zeile dorthin, wo die Auswahl landet:
       am breiten Schirm ins Kärtchen, sonst in den Sockel unten. Die Dauer
       folgt der Strecke, nicht einer festen Zahl. */
    var fliegen = function (von) {
      if (ruhig || !document.body.animate) return;
      var aufKarte = platz.offsetParent !== null;
      var ziel = aufKarte ? (liste.querySelector(".neu") || liste.lastElementChild) : sockelLeiste.querySelector(".kl-zahl");
      var empf = aufKarte ? summePreis : sockelLeiste.querySelector(".kl-zahl");
      if (!ziel) return;
      var a = von.getBoundingClientRect(), b = ziel.getBoundingClientRect();
      var x0 = a.left + a.width / 2, y0 = a.top + a.height / 2;
      /* Liegt das Ziel im Kärtchen außerhalb des Bildes, fliegt nichts */
      if (aufKarte && (b.bottom > innerHeight || b.top < 0)) return;
      var x1 = b.left + 6;
      var y1 = aufKarte ? b.top + Math.min(b.height / 2, 14) : innerHeight - 40;
      var weg = Math.hypot(x1 - x0, y1 - y0);
      var dauer = Math.max(450, Math.min(800, weg * 0.6));
      var punkt = document.createElement("span");
      punkt.className = "kaertchen-flug";
      punkt.setAttribute("aria-hidden", "true");
      document.body.appendChild(punkt);
      /* Bewegung bremst aus; die Deckkraft läuft gleichmäßig und bleibt bis
         kurz vor der Landung voll — sonst verzerrt die Kurve auch sie. */
      punkt.animate([
        { transform: "translate(" + x0 + "px," + y0 + "px) scale(1)" },
        { transform: "translate(" + x1 + "px," + y1 + "px) scale(0.6)" }
      ], { duration: dauer, easing: KURVE });
      punkt.animate([{ opacity: 1 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }],
        { duration: dauer, easing: "linear", fill: "forwards" }).onfinish = function () {
        punkt.remove();
        if (empf) { empf.classList.remove("empfangen"); void empf.offsetWidth; empf.classList.add("empfangen"); }
      };
    };

    /* Was gerade sichtbar gewählt ist, in der Reihenfolge der Liste (= Ablauf) */
    var aktuell = function () {
      /* Aus den Daten der Zeile, nicht aus der Sichtbarkeit: Zeilen in
         zugeklappten Gruppen gehören genauso dazu. */
      var salon = wert("salon") === "ismaning" ? "i" : "h";
      var laenge = wert("laenge") || "k";
      var passt = function (el) { return (" " + el.getAttribute("data-l") + " ").indexOf(" " + laenge + " ") > -1; };
      return posten.filter(function (z) {
        return gewaehlt.indexOf(z.dataset.wahl) > -1 && (" " + z.dataset.salon + " ").indexOf(" " + salon + " ") > -1;
      }).map(function (z) {
        var betrag = Array.prototype.find.call(z.querySelectorAll(".betrag"), passt);
        var dauer = Array.prototype.find.call(z.querySelectorAll(".posten-dauer [data-l]"), passt);
        var preisText = betrag ? betrag.textContent.replace(/\s+/g, " ").trim() : "";
        return {
          id: z.dataset.wahl,
          name: z.dataset.name,
          gruppe: z.closest(".gruppe").querySelector(".gruppe-titel").textContent,
          herren: z.closest(".gruppe").id === "herren",
          laenge: z.hasAttribute("data-laenge"),
          ab: /^ab /.test(preisText),
          preis: parseInt(preisText.replace(/\D/g, ""), 10) || 0,
          preisText: preisText.replace(/ /g, " ").replace(/^ab /, "ab "),
          dauer: dauer ? parseInt(dauer.textContent, 10) || 0 : 0
        };
      });
    };

    var salonJetzt = function () { return SALONS[wert("salon")] || SALONS.haidhausen; };

    var teamFuellen = function () {
      var s = salonJetzt();
      var vorher = wuensche.bei || "";
      var frag = document.createDocumentFragment();
      var egal = new Option("egal, wer frei ist", "");
      frag.appendChild(egal);
      s.team.forEach(function (n) { frag.appendChild(new Option(n, n)); });
      bei.replaceChildren(frag);
      bei.value = s.team.indexOf(vorher) > -1 ? vorher : "";
    };

    var text = function (p) {
      var s = salonJetzt();
      var zeilen = ["Guten Tag,", "", "ich hätte gern einen Termin in " + s.name + ":"];
      p.forEach(function (x) {
        zeilen.push("• " + (x.herren ? "Herren: " : "") + x.name + (x.laenge ? " (" + LAENGE[wert("laenge")] + ")" : "") + ", " + x.preisText.replace(/ /g, " "));
      });
      var summe = p.reduce(function (a, x) { return a + x.preis; }, 0);
      var dauer = p.reduce(function (a, x) { return a + x.dauer; }, 0);
      zeilen.push("");
      zeilen.push("Zusammen " + (p.some(function (x) { return x.ab; }) ? "ab " : "") + summe + " €, Dauer etwa " + dauerText(dauer).replace(/\.$/, "") + ".");
      if (bei.value) zeilen.push("Am liebsten bei " + bei.value + ".");
      if (wann.value.trim()) zeilen.push("Wann es mir passt: " + wann.value.trim());
      zeilen.push("", "Vielen Dank und viele Grüße");
      return zeilen.join("\n");
    };

    var zeichnen = function () {
      posten.forEach(function (z) {
        z.querySelector(".posten-wahl").setAttribute("aria-pressed", gewaehlt.indexOf(z.dataset.wahl) > -1 ? "true" : "false");
      });
      var p = aktuell();
      var hat = p.length > 0;
      kaertchen.classList.toggle("hat-posten", hat);
      document.body.classList.toggle("hat-kaertchen", hat);
      laengeText.textContent = p.some(function (x) { return x.laenge; }) ? " · " + LAENGE[wert("laenge")] : "";

      var frag = document.createDocumentFragment();
      p.forEach(function (x) {
        var li = document.createElement("li");
        if (x.id === neu) li.className = "neu";
        li.innerHTML = '<span class="kp-name"></span><span class="kp-preis"></span>' +
          '<button class="kp-weg" type="button"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>';
        li.querySelector(".kp-name").textContent = x.name;
        var d = document.createElement("span");
        d.className = "kp-dauer";
        d.textContent = x.gruppe + (x.dauer ? " · " + x.dauer + " Min." : "");   /* wie in der Liste */
        li.querySelector(".kp-name").appendChild(d);
        li.querySelector(".kp-preis").textContent = x.preisText;
        var weg = li.querySelector(".kp-weg");
        weg.setAttribute("aria-label", x.name + " vom Kärtchen nehmen");
        weg.addEventListener("click", function () {
          gewaehlt.splice(gewaehlt.indexOf(x.id), 1);
          speicher.schreiben("df-kaertchen", JSON.stringify(gewaehlt));
          zeichnen();
          (liste.querySelector(".kp-weg") || kaertchen.querySelector("h2")).focus({ preventScroll: true });
        });
        frag.appendChild(li);
      });
      liste.replaceChildren(frag);
      neu = null;

      var summe = p.reduce(function (a, x) { return a + x.preis; }, 0);
      var dauer = p.reduce(function (a, x) { return a + x.dauer; }, 0);
      var ab = p.some(function (x) { return x.ab; });
      summePreis.textContent = (ab ? "ab " : "") + euro(summe);
      summeDauer.textContent = dauerText(dauer);

      if (hat) {
        senden.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text(p));
      }
      if (sockelLeiste) {
        sockelLeiste.querySelector(".kl-zahl").textContent = p.length + (p.length === 1 ? " Leistung" : " Leistungen") + " gesammelt";
        sockelLeiste.querySelector(".kl-rest").textContent = (ab ? "ab " : "") + euro(summe) + " · etwa " + dauerText(dauer);
        if (hat) { sockelLeiste.hidden = false; requestAnimationFrame(function () { sockelLeiste.classList.remove("zu"); }); }
        else sockelLeiste.classList.add("zu");
      }
      if (!hat && blatt && blatt.open) blatt.close();
    };

    teamFuellen();
    wann.value = wuensche.wann || "";
    bei.addEventListener("change", function () { wuensche.bei = bei.value; speicher.schreiben("df-kaertchen-wunsch", JSON.stringify(wuensche)); zeichnen(); });
    wann.addEventListener("input", function () { wuensche.wann = wann.value; speicher.schreiben("df-kaertchen-wunsch", JSON.stringify(wuensche)); zeichnen(); });
    document.addEventListener("change", function (e) {
      if (e.target.name === "salon") teamFuellen();
      if (e.target.name === "salon" || e.target.name === "laenge") zeichnen();
    });

    kopie.addEventListener("click", function () {
      var t = text(aktuell());
      var fertig = function (ok) {
        meldung.textContent = ok ? "Kopiert. Jetzt in eine Nachricht einfügen." : "Kopieren ging nicht. Bitte per WhatsApp schicken.";
        clearTimeout(kopie._uhr);
        kopie._uhr = setTimeout(function () { meldung.textContent = ""; }, 4000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { fertig(true); }, function () { fertig(false); });
      else fertig(false);
    });
    kaertchen.querySelector(".kaertchen-leeren").addEventListener("click", function () {
      gewaehlt = gewaehlt.filter(function (id) { return !aktuell().some(function (x) { return x.id === id; }); });
      speicher.schreiben("df-kaertchen", JSON.stringify(gewaehlt));
      zeichnen();
    });

    /* Schmaler Schirm: dasselbe Kärtchen wandert ins Blatt und zurück */
    if (blatt && typeof blatt.showModal === "function") {
      var oeffner = sockelLeiste.querySelector(".kaertchen-oeffnen");
      oeffner.addEventListener("click", function () {
        blatt.appendChild(kaertchen);
        blatt.showModal();
        kaertchen.querySelector("h2").setAttribute("tabindex", "-1");
        kaertchen.querySelector("h2").focus({ preventScroll: true });
      });
      blatt.querySelector(".blatt-zu").addEventListener("click", function () { blatt.close(); });
      blatt.addEventListener("click", function (e) { if (e.target === blatt) blatt.close(); });
      blatt.addEventListener("close", function () {
        platz.appendChild(kaertchen);
        if (!sockelLeiste.classList.contains("zu")) oeffner.focus({ preventScroll: true });
      });
    }

    platz.hidden = false;
    zeichnen();
  }
})();
