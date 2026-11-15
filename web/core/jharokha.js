/* Jharokha core runtime — shared by the hub and every module.
 *
 * Load it in <head> WITHOUT defer so the theme applies before first paint:
 *   <link rel="stylesheet" href="../../core/jharokha.css">
 *   <script src="../../core/jharokha.js"></script>
 *
 * What it gives every page:
 *   - Themes            Jharokha.setTheme(id), Jharokha.THEMES
 *   - Remote navigation Arrow keys move focus spatially; OK/Enter clicks; Back goes back.
 *                       Extra clickable elements: <html data-nav-extra=".card,.tile">
 *   - Back handling     Jharokha.back() — the Android app calls this on the remote's Back key.
 *   - Recents           Jharokha.remember({title, sub, url}) / Jharokha.recent()
 *   - Voice             Jharokha.voice.available() / Jharokha.voice.start(cb, lang)
 *   - Native bridge     window.JharokhaNative (only inside the Android app). Always feature-check:
 *                       an older APK may be running a newer web build.
 *   - Prefs             Jharokha.pref(key[, value])
 */
(function () {
  'use strict';
  var SCRIPT = document.currentScript;
  var ROOT = new URL('../', SCRIPT ? SCRIPT.src : location.href).href;   // site root (folder above /core/)

  /* ---------- prefs (localStorage may be missing or throw) ---------- */
  function pref(k, v) {
    try {
      if (arguments.length > 1) { localStorage.setItem('j_' + k, JSON.stringify(v)); return v; }
      var raw = localStorage.getItem('j_' + k); return raw == null ? null : JSON.parse(raw);
    } catch (e) { return arguments.length > 1 ? v : null; }
  }

  /* ---------- themes ---------- */
  var THEMES = [
    { id: 'jharokha', name: 'Jharokha', sw: ['#141A24', '#1D2430', '#344055', '#E8A93C', '#F4EFE6'] },
    { id: 'amethyst', name: 'Amethyst', sw: ['#0E0B1D', '#2A1E4D', '#5A3B8C', '#B497E0', '#C9C2E3'] },
    { id: 'moss',     name: 'Moss',     sw: ['#0F1F17', '#1E3A2E', '#3E5A3F', '#6B7F67', '#C9D86A'] },
    { id: 'steel',    name: 'Steel',    sw: ['#06141B', '#11212D', '#253745', '#4A5C6A', '#CCD0CF'] },
    { id: 'bronze',   name: 'Bronze',   sw: ['#1A120E', '#3A2418', '#6B4A2E', '#A88462', '#E39C58'] },
    { id: 'ember',    name: 'Ember',    sw: ['#181A2F', '#242E49', '#37415C', '#FDA481', '#B4182D'] },
    { id: 'daylight', name: 'Daylight', sw: ['#F7F4EE', '#EFE9DE', '#E3DDD2', '#9A3B26', '#1D2430'] }
  ];
  function setTheme(id) {
    if (!THEMES.some(function (t) { return t.id === id; })) id = 'jharokha';
    document.documentElement.setAttribute('data-theme', id);
    pref('theme', id);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--j-bg').trim();
    document.dispatchEvent(new CustomEvent('jharokha:theme', { detail: id }));
  }
  document.documentElement.setAttribute('data-theme', pref('theme') || 'jharokha');

  /* ---------- environment ---------- */
  var N = window.JharokhaNative || null;            // Android bridge, if present
  function nativeHas(fn) { return !!(N && typeof N[fn] === 'function'); }
  var tvPref = pref('tvmode');
  // Inside the Android app, ask the device (the same APK runs on phones and TVs); elsewhere use ?tv=1.
  var deviceTV = nativeHas('isTV') ? !!N.isTV() : /[?&]tv=1/.test(location.search);
  var isTV = tvPref === true || (tvPref !== false && deviceTV);
  if (isTV) document.documentElement.classList.add('j-tv');

  /* ---------- toast ---------- */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'j-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2600);
  }

  /* ---------- spatial navigation ---------- */
  var BASE_SEL = 'a[href],button:not([disabled]),input:not([type=hidden]):not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';
  function extraSel() { return document.documentElement.getAttribute('data-nav-extra') || ''; }
  function tagExtras(root) {
    var sel = extraSel(); if (!sel) return;
    (root || document).querySelectorAll(sel).forEach(function (el) { if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0'); });
  }
  function usable(el) {
    if (el.closest('[inert],[aria-hidden="true"]')) return false;
    var r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    if (r.right <= 0 || r.left >= innerWidth) return false;
    var cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.opacity === '0') return false;
    var modal = document.querySelector('[data-j-modal].open');
    if (modal && !modal.contains(el)) return false;
    return true;
  }
  function inView(r) { return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && r.width > 0; }
  function virtualRect(dir) {
    var w = innerWidth, h = innerHeight;
    if (dir === 'down') return { top: -1, bottom: 0, left: 0, right: w };
    if (dir === 'up') return { top: h, bottom: h + 1, left: 0, right: w };
    if (dir === 'right') return { top: 0, bottom: h, left: -1, right: 0 };
    return { top: 0, bottom: h, left: w, right: w + 1 };
  }
  function gap(a1, a2, b1, b2) { return Math.max(0, Math.max(a1, b1) - Math.min(a2, b2)); }

  /* Zones: a page can split itself into areas, e.g. <nav data-nav-zone data-nav-entry="a.on"> and
     <main data-nav-zone>. Up/Down never leave the current zone; Left/Right hop between zones.
     Entering a zone focuses its data-nav-entry element, else the nearest item ON SCREEN, else the
     zone itself (so Up/Down then scroll it like a page). */
  function zoneOf(el) { return el && el.closest ? el.closest('[data-nav-zone]') : null; }
  function prepZones() { document.querySelectorAll('[data-nav-zone]').forEach(function (z) { if (!z.hasAttribute('tabindex')) z.setAttribute('tabindex', '-1'); }); }
  function scrollerOf(zone) {
    if (zone) { var o = getComputedStyle(zone).overflowY; if ((o === 'auto' || o === 'scroll') && zone.scrollHeight > zone.clientHeight) return zone; }
    return window;
  }
  function pageScroll(zone, dir) {
    var s = scrollerOf(zone), amt = (dir === 'down' ? 1 : -1) * innerHeight * 0.55;
    var before = s === window ? scrollY : s.scrollTop;
    s.scrollBy({ top: amt, behavior: 'smooth' });
    var max = s === window ? document.documentElement.scrollHeight - innerHeight : s.scrollHeight - s.clientHeight;
    return dir === 'down' ? before < max - 2 : before > 2;      // false at the very end
  }
  function candidates(r, dir, cur, zoneFilter) {
    var list = [];
    document.querySelectorAll(BASE_SEL).forEach(function (el) {
      if (el === cur || !usable(el)) return;
      if (zoneFilter !== undefined && zoneOf(el) !== zoneFilter) return;
      var c = el.getBoundingClientRect(), prim, sec;
      if (dir === 'down') { if (c.top < r.bottom - 4 || (c.top + c.bottom) / 2 <= (r.top + r.bottom) / 2) return; prim = c.top - r.bottom; sec = gap(c.left, c.right, r.left, r.right); }
      else if (dir === 'up') { if (c.bottom > r.top + 4 || (c.top + c.bottom) / 2 >= (r.top + r.bottom) / 2) return; prim = r.top - c.bottom; sec = gap(c.left, c.right, r.left, r.right); }
      else if (dir === 'right') { if (c.left < r.right - 4 || (c.left + c.right) / 2 <= (r.left + r.right) / 2) return; prim = c.left - r.right; sec = gap(c.top, c.bottom, r.top, r.bottom); }
      else { if (c.right > r.left + 4 || (c.left + c.right) / 2 >= (r.left + r.right) / 2) return; prim = r.left - c.right; sec = gap(c.top, c.bottom, r.top, r.bottom); }
      list.push({ el: el, rect: c, prim: Math.max(0, prim), score: Math.max(0, prim) + sec * 3 });
    });
    list.sort(function (a, b) { return a.score - b.score; });
    return list;
  }
  function onScreen(c) { return c.top >= -2 && c.top < innerHeight - 30 && c.bottom > 30; }
  function focusEl(el) {
    el.focus({ preventScroll: true });
    if (zoneOf(el) === el) return;                       // zone itself: don't move the page
    el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    if (inScroller(el)) return;
    var nr = el.getBoundingClientRect(), pad = 60;       // breathing room from the screen edge
    if (nr.bottom > innerHeight - pad && nr.height < innerHeight - 2 * pad) window.scrollBy({ top: nr.bottom - innerHeight + pad, behavior: 'smooth' });
    else if (nr.top < pad && nr.height < innerHeight - 2 * pad) window.scrollBy({ top: nr.top - pad, behavior: 'smooth' });
  }
  function enterZone(zone, fromRect) {
    var entry = zone.getAttribute('data-nav-entry'), pick = null;
    if (entry) { var e = zone.querySelector(entry); if (e && usable(e)) pick = e; }
    if (!pick) {
      var cy = (fromRect.top + fromRect.bottom) / 2, bestD = Infinity;
      zone.querySelectorAll(BASE_SEL).forEach(function (el) {
        if (!usable(el)) return; var c = el.getBoundingClientRect(); if (!onScreen(c)) return;
        var d = Math.abs((c.top + c.bottom) / 2 - cy); if (d < bestD) { bestD = d; pick = el; }
      });
    }
    focusEl(pick || zone);
    return true;
  }
  function move(dir) {
    prepZones();
    var cur = document.activeElement;
    var hasCur = cur && cur !== document.body && cur !== document.documentElement;
    var zone = hasCur ? zoneOf(cur) : null;
    var isZoneItself = hasCur && zone === cur;
    var r = hasCur ? cur.getBoundingClientRect() : null;
    if (!r || !inView(r) || isZoneItself || r.height > innerHeight * 0.8) r = virtualRect(dir);
    var vertical = dir === 'up' || dir === 'down';
    var hasZones = !!document.querySelector('[data-nav-zone]');

    if (vertical) {
      var list = candidates(r, dir, cur, hasZones && hasCur ? zone : undefined);
      var best = list[0];
      // Reading mode: only jump to an item that is already on screen (or right next to the current one).
      // Otherwise scroll the text, so nothing is skipped.
      if (!best || (!onScreen(best.rect) && best.prim > 120)) {
        if (pageScroll(zone, dir)) return true;
        if (best) { focusEl(best.el); return true; }
        return true;                                      // at the end — swallow the key
      }
      focusEl(best.el); return true;
    }

    // Left / Right: stay inside the zone if something is that way, else hop to the neighbouring zone.
    var same = candidates(r, dir, cur, hasZones ? zone : undefined).filter(function (c) { return onScreen(c.rect) || inScroller(c.el); });
    if (same.length) { focusEl(same[0].el); return true; }
    if (!hasZones) return false;
    var from = hasCur && !isZoneItself ? cur.getBoundingClientRect() : { top: innerHeight / 2 - 1, bottom: innerHeight / 2 + 1 };
    var bestZ = null, bestG = Infinity;
    document.querySelectorAll('[data-nav-zone]').forEach(function (z) {
      if (z === zone) return; var zr = z.getBoundingClientRect();
      if (zr.width < 2 || zr.right <= 0 || zr.left >= innerWidth) return;
      var g = dir === 'right' ? zr.left - (hasCur ? cur.getBoundingClientRect().right : 0) : (hasCur ? cur.getBoundingClientRect().left : innerWidth) - zr.right;
      if (g < -4) return; if (g < bestG) { bestG = g; bestZ = z; }
    });
    if (bestZ) return enterZone(bestZ, from);
    return false;
  }
  function inScroller(el) {
    for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      var o = getComputedStyle(p).overflowY;
      if ((o === 'auto' || o === 'scroll') && p.scrollHeight > p.clientHeight) return true;
    }
    return false;
  }

  /* Text fields on TV: reaching one with the remote must NOT pop the keyboard.
     It stays read-only until OK is pressed; it locks again when focus leaves. */
  function textField(el) { return !!el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && /^(text|search|email|url|tel|password|number|)$/i.test(el.type || ''))); }
  function lockField(el) { if (isTV && textField(el) && !el.readOnly && !el.hasAttribute('data-j-editing')) { el.readOnly = true; el.setAttribute('data-j-locked', ''); } }
  document.addEventListener('focusin', function (e) { lockField(e.target); }, true);
  document.addEventListener('click', function (e) { var t = e.target; if (t && t.hasAttribute && t.hasAttribute('data-j-locked')) unlockField(t); }, true);
  document.addEventListener('focusout', function (e) { var el = e.target; if (el.hasAttribute && el.hasAttribute('data-j-editing')) { el.removeAttribute('data-j-editing'); lockField(el); } }, true);
  function unlockField(el) {
    el.blur();                                           // re-focus while editable → Android shows the keyboard
    el.readOnly = false; el.removeAttribute('data-j-locked'); el.setAttribute('data-j-editing', '');
    el.focus();
    try { var n = el.value.length; el.setSelectionRange(n, n); } catch (x) {}
  }

  var DIRS = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var a = document.activeElement, dir = DIRS[e.key];
    var locked = a && a.hasAttribute && a.hasAttribute('data-j-locked');
    if (dir) {
      if (textField(a) && !locked && (dir === 'left' || dir === 'right') && a.type !== 'number') {
        try { var atStart = a.selectionStart === 0 && a.selectionEnd === 0, atEnd = a.selectionStart === a.value.length;
          if ((dir === 'left' && !atStart) || (dir === 'right' && !atEnd)) return; } catch (x) { return; }
      }
      if (a && a.closest && a.closest('[data-nav-native]')) return;   // a widget that wants raw arrows
      if (move(dir)) e.preventDefault();
      return;
    }
    if (e.key === 'Enter' && locked) { e.preventDefault(); unlockField(a); return; }
    if ((e.key === 'Enter' || e.key === ' ') && a && a.matches && a.matches('[tabindex]:not([tabindex="-1"]):not(a):not(button):not(input):not(select):not(textarea):not(summary)')) {
      e.preventDefault();
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      return;
    }
    if (e.key === 'Escape' || e.key === 'BrowserBack' || e.key === 'GoBack') {
      if (back() !== 'exit') e.preventDefault();
    }
  });

  /* ---------- back ---------- */
  var isHub = function () { return document.body && document.body.hasAttribute('data-jharokha-hub'); };
  function back() {
    var modal = document.querySelector('[data-j-modal].open');
    if (modal) { modal.dispatchEvent(new CustomEvent('j-close')); return 'handled'; }
    if (typeof window.JharokhaPageBack === 'function' && window.JharokhaPageBack() === true) return 'handled';
    if (isHub()) return 'exit';
    var ref = document.referrer || '';
    if (history.length > 1 && ref.indexOf(location.origin) === 0) { history.back(); return 'handled'; }
    location.href = ROOT; return 'handled';
  }
  function home() { location.href = ROOT; }

  /* ---------- recents ----------
     One entry per app (the "Continue" row). item = {app, title, sub, url, scroll?}.
     Older saved entries had no `app`; it is derived from the URL so they still de-duplicate. */
  function appKey(x) { if (x.app) return x.app; var m = /modules\/([^\/?#]+)/.exec(x.url || ''); return m ? m[1] : (x.url || ''); }
  function recent() {
    var seen = {}, out = [];
    (pref('recent') || []).forEach(function (x) { var k = appKey(x); if (!seen[k]) { seen[k] = 1; out.push(x); } });
    return out;
  }
  function remember(item) {
    if (!item || !item.url) return;
    var k = appKey(item);
    var list = recent().filter(function (x) { return appKey(x) !== k; });
    item.at = Date.now(); list.unshift(item); pref('recent', list.slice(0, 8));
  }
  function recentFor(app) { var r = recent(); for (var i = 0; i < r.length; i++) if (appKey(r[i]) === app) return r[i]; return null; }

  /* ---------- voice ---------- */
  var voiceCb = null;
  var voice = {
    available: function () { return nativeHas('startVoice') || !!(window.SpeechRecognition || window.webkitSpeechRecognition); },
    start: function (cb, lang) {
      lang = lang || pref('voiceLang') || 'en-IN'; voiceCb = cb;
      if (nativeHas('startVoice')) { N.startVoice(lang); return; }
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { toast('Voice search is not available here'); return; }
      var rec = new SR(); rec.lang = lang; rec.interimResults = false; rec.maxAlternatives = 1;
      rec.onresult = function (ev) { var t = ev.results[0][0].transcript; if (voiceCb) voiceCb(t); };
      rec.onerror = function () { toast('Didn’t catch that'); };
      try { rec.start(); toast('Listening…'); } catch (x) { toast('Voice search is busy'); }
    }
  };

  /* ---------- data ---------- */
  function loadJSON(path) {
    return fetch(ROOT + path, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  /* ---------- updates ----------
     The version the page was loaded with is remembered; when the app comes back to the screen
     (or every 30 min) the live version.json is checked. Hub: updates itself automatically.
     Elsewhere: a quiet toast, so a mock test isn't interrupted. */
  var loadedVer = null, checking = false;
  function fetchVer() { return fetch(ROOT + 'version.json', { cache: 'no-store' }).then(function (r) { return r.json(); }); }
  fetchVer().then(function (v) { loadedVer = v.web; }).catch(function () {});
  function checkUpdate() {
    return fetchVer().then(function (v) { return { current: loadedVer, latest: v.web, available: !!loadedVer && v.web !== loadedVer && v.web !== 'dev', info: v }; });
  }
  function applyUpdate() {
    var jobs = [];
    try { if (window.caches) jobs.push(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })); } catch (e) {}
    try { if (navigator.serviceWorker) jobs.push(navigator.serviceWorker.getRegistrations().then(function (rs) { return Promise.all(rs.map(function (r) { return r.update().catch(function () {}); })); })); } catch (e) {}
    Promise.all(jobs).catch(function () {}).then(function () { location.reload(); });
  }
  function autoCheck() {
    if (checking) return; checking = true;
    checkUpdate().then(function (u) { if (u.available) document.dispatchEvent(new CustomEvent('jharokha:update', { detail: u })); })
      .catch(function () {}).then(function () { checking = false; });
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') autoCheck(); });
  window.addEventListener('focus', autoCheck);
  setInterval(autoCheck, 30 * 60 * 1000);
  document.addEventListener('jharokha:update', function (e) {
    if (isHub()) return;   // the hub handles it itself
    toast('New version ' + e.detail.latest + ' ready — open Jharokha home to update');
  });

  /* ---------- public API ---------- */
  var J = window.Jharokha = {
    ROOT: ROOT, THEMES: THEMES, pref: pref, setTheme: setTheme, toast: toast,
    isTV: isTV, native: N, nativeHas: nativeHas,
    move: move, back: back, home: home, remember: remember,
    recent: recent, recentFor: recentFor,
    voice: voice, loadJSON: loadJSON, checkUpdate: checkUpdate, applyUpdate: applyUpdate, loadedVersion: function () { return loadedVer; },
    apkVersion: function () { return nativeHas('versionCode') ? Number(N.versionCode()) : null; },
    // called by the Android app:
    onVoiceResult: function (text) { if (voiceCb) voiceCb(String(text || '')); },
    onVoiceError: function (msg) { toast(msg || 'Didn’t catch that'); },
    openSearch: function () { document.dispatchEvent(new CustomEvent('jharokha:search')); if (!isHub()) location.href = ROOT + '#search'; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    tagExtras();
    if (extraSel()) new MutationObserver(function () { tagExtras(); }).observe(document.body, { childList: true, subtree: true });
  });
})();
