// Simple offer filter (price, house m2, plot m2) shared by map.js, stats.js and the offer tables.
// Must be loaded before map.js and stats.js. Offers with an unknown value for a filtered field
// (e.g. dzialka_m2 "-") are kept, so nothing disappears just because a portal did not give the number.
(function () {
  function price(s) {
    s = String(s == null ? "" : s).replace(/[\s ]/g, "").replace(/[.,]\d{1,2}(?!\d)/, "").replace(/\./g, "");
    var m = s.match(/\d+/);
    return m ? Number(m[0]) : NaN;
  }
  function area(s) {
    s = String(s == null ? "" : s).trim().replace(",", ".");
    return /^\d+(\.\d+)?$/.test(s) ? Number(s) : NaN; // "-" and ranges like "72-120" -> unknown
  }

  var FIELDS = [
    ["cena", "Cena (zł)", price, "100000"],
    ["dom", "Dom (m²)", function (o) { return area(o.dom_m2); }, "10"],
    ["dzialka", "Działka (m²)", function (o) { return area(o.dzialka_m2); }, "50"],
  ];
  var KEY = "offers-filter-v1";
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }

  var listeners = [];
  function value(f, o) { return f[0] === "cena" ? price(o.cena) : f[2](o); }
  function test(o) {
    return FIELDS.every(function (f) {
      var v = value(f, o), lo = state[f[0] + "_od"], hi = state[f[0] + "_do"];
      if (isNaN(v)) return true;
      return !(lo != null && v < lo) && !(hi != null && v > hi);
    });
  }
  function active() { return Object.keys(state).some(function (k) { return state[k] != null; }); }

  window.offerFilter = {
    test: test,
    active: active,
    price: price,
    area: area,
    onChange: function (cb) { listeners.push(cb); },
  };

  var offersByUrl = null, total = 0;

  function applyTables() {
    if (!offersByUrl) return;
    var shown = 0;
    Array.prototype.forEach.call(document.querySelectorAll("section"), function (sec) {
      if (sec.id === "offers-map-section" || sec.id === "offers-stats-section" || sec.id === "offers-filter-section") return;
      var rows = sec.querySelectorAll("tbody tr"), visible = 0, any = false;
      Array.prototype.forEach.call(rows, function (tr) {
        var a = tr.querySelector('a[href^="http"]');
        if (!a) return;
        any = true;
        var o = offersByUrl[a.getAttribute("href")];
        var ok = !o || test(o);
        tr.style.display = ok ? "" : "none";
        if (ok) visible++;
      });
      if (any) sec.style.display = visible ? "" : "none";
      shown += visible;
    });
    var info = document.getElementById("offers-filter-info");
    if (info) info.textContent = active() ? "Pasuje: " + shown + " z " + total + " ofert" : "Wszystkie oferty: " + total;
  }

  function changed() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage blocked: filter still works */ }
    applyTables();
    listeners.forEach(function (cb) { try { cb(); } catch (e) { console.error(e); } });
  }

  function buildUi() {
    var box = document.getElementById("offers-filter");
    if (!box) return;
    var html = "";
    FIELDS.forEach(function (f) {
      html += '<div class="of-group"><span class="of-label">' + f[1] + "</span>" +
        '<input type="number" min="0" step="' + f[3] + '" inputmode="numeric" placeholder="od" data-k="' + f[0] + '_od">' +
        "<span>&ndash;</span>" +
        '<input type="number" min="0" step="' + f[3] + '" inputmode="numeric" placeholder="do" data-k="' + f[0] + '_do"></div>';
    });
    html += '<button type="button" id="offers-filter-reset">Wyczyść</button>' +
      '<span id="offers-filter-info" class="of-info"></span>';
    box.innerHTML = html;
    Array.prototype.forEach.call(box.querySelectorAll("input[data-k]"), function (inp) {
      var k = inp.getAttribute("data-k");
      if (state[k] != null) inp.value = state[k];
      inp.addEventListener("input", function () {
        var v = inp.value.trim() === "" ? null : Number(inp.value);
        state[k] = v == null || isNaN(v) ? null : v;
        changed();
      });
    });
    document.getElementById("offers-filter-reset").addEventListener("click", function () {
      state = {};
      Array.prototype.forEach.call(box.querySelectorAll("input[data-k]"), function (inp) { inp.value = ""; });
      changed();
    });
  }

  function init() {
    buildUi();
    if (location.protocol === "file:") return;
    fetch("offers.json?v=" + Date.now()).then(function (r) { return r.json(); }).then(function (offers) {
      offersByUrl = {};
      Object.keys(offers).forEach(function (src) {
        (offers[src] || []).forEach(function (o) { offersByUrl[o.url] = o; total++; });
      });
      applyTables();
    }).catch(function () { /* tables stay unfiltered */ });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
