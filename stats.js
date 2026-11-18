// Monthly price averages per region, computed live from offers.json.
// Month = month of first_seen (when the offer was first found).
// Region = gmina / district, matched from the free-text "adres" field (rules below).
(function () {
  // Ordered: first matching rule wins, so more specific places go before the towns
  // they are often written together with (e.g. "Łajski, Legionowo" -> Wieliszew).
  var REGIONS = [
    ["Nieporęt", ["Nieporęt", "Stanisławów Pierwszy", "Stanisławów Drugi", "Józefów", "Wola Aleksandra",
      "Michałów-Grabina", "Rynia", "Rembelszczyzna"]],
    ["Wieliszew", ["Wieliszew", "Skrzeszew", "Krubin", "Olszewnica", "Łajski", "Janówek", "Poddębie",
      "Topolina", "Michałów-Reginów", "Kałuszyn", "Komornica"]],
    ["Serock", ["Serock", "Dosin", "Izbica", "Jachranka", "Stasi Las", "Wierzbica", "Wola Smolana"]],
    ["Czosnów", ["Czosnów", "Izabelin-Dziekanówek", "Kaliszki", "Cybulice", "Łomna", "Łosia Wólka", "Dębina"]],
    ["Nowy Dwór Maz. / Pomiechówek", ["Nowy Dwór", "Modlin", "Pomiechówek", "Czarnowo"]],
    ["Łomianki", ["Łomianki", "Kiełpin", "Dziekanów", "Kępa Kiełpińska"]],
    ["Warszawa Białołęka", ["Białołęka", "Choszczówka", "Szamocin", "Nowodwory", "Żerań"]],
    ["Warszawa (inne dzielnice)", ["Wawer", "Rembertów", "Wesoła"]],
    ["Radzymin", ["Radzymin", "Słupno", "Załubice", "Arciechów"]],
    ["Marki / Kobyłka / Ząbki / Zielonka", ["Marki", "Kobyłka", "Ząbki", "Zielonka"]],
    ["Jabłonna", ["Jabłonna", "Chotomów", "Skierdy", "Trzciany", "Rajszew", "Boża Wola"]],
    ["Legionowo", ["Legionowo", "Bukowiec", "Przystanek", "Ludwisin"]],
  ];
  var OTHER = "Inne";

  var LETTER = "A-Za-zÀ-žĄąĆćĘęŁłŃńÓóŚśŹźŻż";
  var RULES = REGIONS.map(function (r) {
    return [r[0], r[1].map(function (name) {
      return new RegExp("(^|[^" + LETTER + "])" + name + "(?![" + LETTER + "])", "i");
    })];
  });

  function region(adres) {
    var a = String(adres || "")
      .replace(/\(.*?\)/g, " ")
      .replace(/^\s*(ul\.|al\.|aleja|ulica)[^,]*,/i, " "); // drop a leading street name
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][1].some(function (re) { return re.test(a); })) return RULES[i][0];
    }
    return OTHER;
  }

  function price(s) {
    s = String(s || "").replace(/[\s ]/g, "").replace(/[.,]\d{1,2}(?!\d)/, "").replace(/\./g, "");
    var m = s.match(/\d+/);
    var v = m ? Number(m[0]) : NaN;
    return v >= 50000 && v <= 10000000 ? v : NaN;
  }

  function area(s) {
    s = String(s || "").trim().replace(",", ".");
    if (!/^\d+(\.\d+)?$/.test(s)) return NaN; // skips "-", ranges like "72-120"
    var v = Number(s);
    return v >= 20 && v <= 1500 ? v : NaN;
  }

  var MONTHS = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
  function monthLabel(ym) { return MONTHS[Number(ym.slice(5, 7)) - 1] + " " + ym.slice(0, 4); }
  function plural(n) {
    if (n === 1) return " oferta";
    var d = n % 10, t = n % 100;
    return d >= 2 && d <= 4 && (t < 12 || t > 14) ? " oferty" : " ofert";
  }
  function fmt(n) { return Math.round(n).toLocaleString("pl-PL"); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  window.offersRegion = region; // handy for checking the rules in the browser console

  var box = document.getElementById("offers-stats");
  if (!box) return;
  if (location.protocol === "file:") {
    box.textContent = "Statystyki dzialaja tylko przez http (GitHub Pages albo python3 -m http.server).";
    return;
  }

  fetch("offers.json?v=" + Date.now()).then(function (r) { return r.json(); }).then(function (offers) {
    var filter = window.offerFilter;
    render();
    if (filter) filter.onChange(render);

    function render() {
    var cells = {}, months = {}, regionTotals = {};
    function add(key, o) {
      var c = cells[key] = cells[key] || { n: 0, sumP: 0, nP: 0, sumM2: 0, nM2: 0 };
      c.n++;
      if (!isNaN(o.p)) { c.sumP += o.p; c.nP++; }
      if (!isNaN(o.p) && !isNaN(o.a)) { c.sumM2 += o.p / o.a; c.nM2++; }
    }
    Object.keys(offers).forEach(function (src) {
      (offers[src] || []).forEach(function (raw) {
        var ym = String(raw.first_seen || "").slice(0, 7);
        if (!/^\d{4}-\d{2}$/.test(ym)) return;
        if (filter && !filter.test(raw)) return;
        var o = { p: price(raw.cena), a: area(raw.dom_m2) };
        var reg = region(raw.adres);
        months[ym] = true;
        regionTotals[reg] = (regionTotals[reg] || 0) + 1;
        add(reg + "|" + ym, o);
        add("*|" + ym, o);
      });
    });

    var ms = Object.keys(months).sort();
    var regs = Object.keys(regionTotals).sort(function (a, b) {
      if (a === OTHER) return 1;
      if (b === OTHER) return -1;
      return regionTotals[b] - regionTotals[a];
    });

    function cell(key) {
      var c = cells[key];
      if (!c) return '<td class="st-empty">&ndash;</td>';
      return "<td>" +
        (c.nM2 ? "<b>" + fmt(c.sumM2 / c.nM2) + " zł/m²</b>" : "<b>&ndash;</b>") +
        '<br><span class="st-sub">' + (c.nP ? fmt(c.sumP / c.nP / 1000) + " tys. zł" : "&ndash;") +
        " &middot; " + c.n + plural(c.n) + "</span></td>";
    }

    var html = '<div class="table-wrap"><table class="st-table"><thead><tr><th>Rejon</th>' +
      ms.map(function (m) { return "<th>" + monthLabel(m) + "</th>"; }).join("") + "</tr></thead><tbody>";
    regs.forEach(function (r) {
      html += "<tr><td>" + esc(r) + "</td>" + ms.map(function (m) { return cell(r + "|" + m); }).join("") + "</tr>";
    });
    html += '<tr class="st-total"><td><b>Wszystkie</b></td>' +
      ms.map(function (m) { return cell("*|" + m); }).join("") + "</tr></tbody></table></div>";
    if (!ms.length) html = "Brak ofert pasujacych do filtra.";
    box.innerHTML = html;
    }
  }).catch(function (e) {
    box.textContent = "Nie udalo sie policzyc statystyk: " + e;
  });
})();
