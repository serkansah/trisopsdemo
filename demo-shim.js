/* Trisops demo — backend'siz statik site katmanı.
   1) Giriş kontrolü (client-side, gerçek güvenlik değil — sahte veri).
   2) fetch() çağrılarını crawl anında kaydedilen _api_manifest.json'daki
      statik JSON cevaplarla taklit eder; bilinmeyen GET'ler boş {} döner
      (+ kısa bir bilgi mesajı gösterir), yazma (POST/PUT/PATCH/DELETE)
      istekleri her zaman simüle edilmiş başarı döner — hiçbir istek bu
      sitenin dışına çıkmaz.
   3) localStorage'daki demo_* anahtarları her gün ilk ziyarette temizlenir. */
(function () {
  "use strict";

  var TODAY = new Date().toISOString().slice(0, 10);
  if (localStorage.getItem("demo_day") !== TODAY) {
    Object.keys(localStorage)
      .filter(function (k) { return k.indexOf("demo_") === 0; })
      .forEach(function (k) { localStorage.removeItem(k); });
    localStorage.setItem("demo_day", TODAY);
  }

  var isLoginPage = /\/login\.html$/.test(location.pathname) || location.pathname === "/login.html";
  var is404Page = /\/404\.html$/.test(location.pathname) || location.pathname === "/404.html";
  if (!isLoginPage && !is404Page) {
    if (sessionStorage.getItem("demo_authed") !== "1") {
      location.replace("/login.html");
      return;
    }
  }

  var manifest = null;
  var manifestPromise = fetch("/_api_manifest.json")
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (m) { manifest = m; })
    .catch(function () { manifest = {}; });

  var origFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    var method = ((init && init.method) || (typeof input === "object" && input.method) || "GET").toUpperCase();

    return manifestPromise.then(function () {
      var path;
      try {
        var u = new URL(url, location.origin);
        path = u.pathname + u.search;
      } catch (e) {
        path = url;
      }

      if (method !== "GET" && method !== "HEAD") {
        _toast("Demo modunda bu işlem simüle edildi.");
        return new Response(
          JSON.stringify({ ok: true, success: true, message: "Demo modunda simüle edildi." }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }

      if (manifest && manifest[path]) {
        return origFetch("/_api/" + manifest[path]);
      }
      if (path.indexOf("/static/") === 0 || path.indexOf("/_api/") === 0) {
        return origFetch(url, init);
      }
      // Bilinmeyen API çağrısı: bu ekranın verisi demo'da yakalanmamış.
      _toast("Bu içerik demo ortamında gösterilememektedir.");
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    });
  };

  // Backend'i olmayan <form method="post"> gönderimlerini genel olarak yakala.
  document.addEventListener(
    "submit",
    function (e) {
      var form = e.target;
      if (!form || form.tagName !== "FORM") return;
      if (form.dataset.demoAllow === "1") return; // login formu kendi mantığını kullanır
      e.preventDefault();
      _toast("Demo modunda bu işlem simüle edildi.");
    },
    true
  );

  var _toastTimer = null;
  function _toast(msg) {
    var el = document.getElementById("_demo_toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "_demo_toast";
      el.style.cssText =
        "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);" +
        "background:#1a2340;color:#fff;padding:10px 18px;border-radius:8px;" +
        "font:13px system-ui,sans-serif;z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,.25);" +
        "opacity:0;transition:opacity .2s;max-width:80vw;text-align:center";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = "1";
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { el.style.opacity = "0"; }, 2600);
  }

  window._demoToast = _toast;
})();
