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
    // „1 09:00-18:45;2 09:00-18:30;3-5 09:00-18:45“ → je Wochentag [von, bis]
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
    return h + (m ? ":" + String(m).padStart(2, "0") : "") + " Uhr";
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
      });
    });
    ansicht.querySelector(".ansicht-zu").addEventListener("click", function () { ansicht.close(); });
    ansicht.querySelector(".ansicht-zurueck").addEventListener("click", function () { zeigen(stelle - 1); });
    ansicht.querySelector(".ansicht-weiter").addEventListener("click", function () { zeigen(stelle + 1); });
    ansicht.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") zeigen(stelle - 1);
      if (e.key === "ArrowRight") zeigen(stelle + 1);
    });
    ansicht.addEventListener("click", function (e) { if (e.target === ansicht) ansicht.close(); });
    ansicht.addEventListener("close", function () { if (ausloeser) ausloeser.focus({ preventScroll: true }); });
  }
})();
