// Interactive offer map: loads offers.json + geocache.json (see geocode.py).
// Hover a point: price, house m2, plot m2. Click: opens the listing.
(function () {
  var el = document.getElementById("offers-map");
  var info = document.getElementById("offers-map-info");
  if (!el || !window.L) return;
  if (location.protocol === "file:") {
    if (info) info.textContent = "Mapa dziala tylko przez http: otworz strone na GitHub Pages albo uruchom `python3 -m http.server` i wejdz na http://localhost:8000";
    el.style.display = "none";
    return;
  }

  var map = L.map(el, { scrollWheelZoom: false }).setView([52.40, 20.95], 11);
  // OSM tiles need a Referer: they work over http(s) (GitHub Pages, localhost), not from file://.
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  map.on("focus", function () { map.scrollWheelZoom.enable(); });
  map.on("blur", function () { map.scrollWheelZoom.disable(); });

  var noHover = window.matchMedia && window.matchMedia("(hover: none)").matches;
  var bust = "?v=" + Date.now();

  // Marker colour by listing age (days since first_seen): [max days, colour, legend label].
  var AGE = [
    [7, "#22c55e", "do 1 tyg."],
    [14, "#15803d", "1-2 tyg."],
    [28, "#7dd3fc", "2-4 tyg."],
    [56, "#2563eb", "4-8 tyg."],
    [84, "#1e3a8a", "8-12 tyg."],
    [Infinity, "#111111", "ponad 12 tyg."],
  ];
  var INACTIVE = "#dc2626"; // offers marked by check_inactive.py (inactive_since)

  function num(s) { // "1 150 000 zł" / "1150000 zl" / "125,5" -> number
    s = String(s == null ? "" : s).replace(/[\s ]/g, "").replace(",", ".");
    var m = s.match(/^\d+(\.\d+)?/);
    return m ? Number(m[0]) : NaN;
  }
  function perM2(cena, m2) {
    var p = num(String(cena).replace(/[\s ]/g, "").replace(/[.,]\d{1,2}(?!\d)/, "").replace(/\./g, ""));
    var a = num(m2);
    if (!(p > 0) || !(a > 0) || /\d\s*-\s*\d/.test(String(m2))) return "-";
    return Math.round(p / a).toLocaleString("pl-PL") + " zł/m²";
  }

  var today = new Date();
  today = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  function ageDays(firstSeen) {
    var p = String(firstSeen || "").split("-").map(Number);
    if (p.length !== 3 || p.some(isNaN)) return Infinity;
    return Math.round((today - Date.UTC(p[0], p[1] - 1, p[2])) / 86400000);
  }
  function ageClass(days) {
    for (var i = 0; i < AGE.length; i++) if (days < AGE[i][0]) return AGE[i];
    return AGE[AGE.length - 1];
  }

  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var d = L.DomUtil.create("div");
    d.style.cssText = "background:rgba(255,255,255,0.92);color:#222;padding:6px 8px;border-radius:6px;" +
      "font-size:12px;line-height:1.6;box-shadow:0 1px 4px rgba(0,0,0,0.3)";
    d.innerHTML = "<b>Wiek ogloszenia</b><br>" + AGE.concat([[0, INACTIVE, "usunieta / nieaktualna"]]).map(function (a) {
      return '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;' +
        "vertical-align:-1px;background:" + a[1] + '"></span>' + a[2];
    }).join("<br>");
    return d;
  };
  legend.addTo(map);

  function esc(s) {
    return String(s == null ? "-" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  Promise.all([
    fetch("offers.json" + bust).then(function (r) { return r.json(); }),
    fetch("geocache.json" + bust).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
  ]).then(function (res) {
    var offers = res[0], geo = res[1];
    var all = [];
    Object.keys(offers).forEach(function (src) {
      (offers[src] || []).forEach(function (o) { all.push(Object.assign({ zrodlo: src }, o)); });
    });
    var newest = all.reduce(function (m, o) { return o.first_seen > m ? o.first_seen : m; }, "");

    // Group offers sharing the same coordinates, then fan them out so all stay clickable.
    var groups = {}, missing = 0;
    all.forEach(function (o) {
      var g = geo[o.adres];
      if (!g) { missing++; return; }
      var key = g[0] + "," + g[1];
      (groups[key] = groups[key] || []).push({ o: o, g: g });
    });

    var bounds = [], markers = [];
    Object.keys(groups).forEach(function (key) {
      var items = groups[key];
      items.forEach(function (it, i) {
        var lat = it.g[0], lon = it.g[1];
        if (items.length > 1) {
          var ang = i * 2.39996, r = 0.0007 * Math.sqrt(i + 1); // golden-angle spiral
          lat += r * Math.cos(ang);
          lon += r * Math.sin(ang) * 1.6;
        }
        var o = it.o, approx = it.g[2] > 0, fresh = o.first_seen === newest;
        var days = ageDays(o.first_seen), cls = ageClass(days), dead = !!o.inactive_since;
        var m = L.circleMarker([lat, lon], {
          radius: fresh && !dead ? 8 : 6,
          color: "#ffffff",
          fillColor: dead ? INACTIVE : cls[1],
          fillOpacity: approx ? 0.5 : 0.9,
          weight: 1.5,
          dashArray: approx ? "3 3" : null,
        });
        // draw order: removed offers at the bottom, then oldest -> newest on top
        markers.push({ m: m, o: o, z: dead ? -1 : -(isFinite(days) ? days : 1e6) });
        var html = dead ?
          '<b style="color:' + INACTIVE + '">Oferta usunieta</b> (od ' + esc(o.inactive_since) + ")<br>" +
          "<b>" + esc(o.cena) + "</b><br>" +
          "Dom: " + esc(perM2(o.cena, o.dom_m2)) + "<br>" +
          "Dzialka: " + esc(perM2(o.cena, o.dzialka_m2)) + "<br>" +
          '<span style="opacity:.75">' + esc(o.zrodlo) + " &middot; dodana " + esc(o.first_seen) + "</span>" :
          "<b>" + esc(o.cena) + "</b><br>" +
          "Dom: " + esc(o.dom_m2) + " m2 &middot; Dzialka: " + esc(o.dzialka_m2) + " m2<br>" +
          '<span style="opacity:.75">' + esc(o.adres) + "<br>" + esc(o.zrodlo) + " &middot; " + esc(o.first_seen) +
          (isFinite(days) ? " (" + days + " dni temu)" : "") +
          (approx ? "<br><i>lokalizacja przyblizona</i>" : "") + "</span>";
        if (noHover) {
          m.bindPopup(html + '<br><a href="' + esc(o.url) + '" target="_blank" rel="noopener">otworz ogloszenie</a>');
        } else {
          m.bindTooltip(html, { direction: "top", offset: [0, -6] });
          m.on("click", function () { window.open(o.url, "_blank", "noopener"); });
        }
        bounds.push([lat, lon]);
      });
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [20, 20] });
    markers.sort(function (a, b) { return a.z - b.z; });

    var filter = window.offerFilter;
    function apply() {
      var shown = 0;
      markers.forEach(function (x) { map.removeLayer(x.m); });
      markers.forEach(function (x) {
        if (!filter || filter.test(x.o)) { x.m.addTo(map); shown++; }
      });
      if (info) {
        info.textContent = "Na mapie: " + shown + " z " + all.length + " ofert" +
          (filter && filter.active() ? " (filtr wlaczony)" : "") +
          (missing ? " (" + missing + " bez lokalizacji)" : "") +
          ". Kolor = wiek ogloszenia (legenda na mapie), czerwone = oferta usunieta, wiekszy punkt = najnowsze (" + newest +
          "), przerywana obwodka = lokalizacja przyblizona.";
      }
    }
    apply();
    if (filter) filter.onChange(apply);
  }).catch(function (e) {
    if (info) info.textContent = "Nie udalo sie zaladowac mapy: " + e;
  });
})();
