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
  var isTV = tvPref === true || (tvPref !== false && (/JharokhaTV/i.test(navigator.userAgent) || /[?&]tv=1/.test(location.search)));
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
  function move(dir) {
    var cur = document.activeElement;
    var hasCur = cur && cur !== document.body && cur !== document.documentElement;
    var r = hasCur ? cur.getBoundingClientRect() : null;
    if (!r || !inView(r)) r = virtualRect(dir);
    var best = null, bestScore = Infinity;
    document.querySelectorAll(BASE_SEL).forEach(function (el) {
      if (el === cur || !usable(el)) return;
      var c = el.getBoundingClientRect(), prim, sec;
      if (dir === 'down') { if (c.top < r.bottom - 4 || (c.top + c.bottom) / 2 <= (r.top + r.bottom) / 2) return; prim = c.top - r.bottom; sec = gap(c.left, c.right, r.left, r.right); }
      else if (dir === 'up') { if (c.bottom > r.top + 4 || (c.top + c.bottom) / 2 >= (r.top + r.bottom) / 2) return; prim = r.top - c.bottom; sec = gap(c.left, c.right, r.left, r.right); }
      else if (dir === 'right') { if (c.left < r.right - 4 || (c.left + c.right) / 2 <= (r.left + r.right) / 2) return; prim = c.left - r.right; sec = gap(c.top, c.bottom, r.top, r.bottom); }
      else { if (c.right > r.left + 4 || (c.left + c.right) / 2 >= (r.left + r.right) / 2) return; prim = r.left - c.right; sec = gap(c.top, c.bottom, r.top, r.bottom); }
      var score = Math.max(0, prim) + sec * 3;
      if (score < bestScore) { bestScore = score; best = { el: el, prim: Math.max(0, prim), rect: c }; }
    });
    var vertical = dir === 'up' || dir === 'down';
    // Long reading pages: if the next focusable is far away, scroll instead of jumping past the text.
    if (vertical && (!best || best.prim > innerHeight * 0.85)) {
      window.scrollBy({ top: (dir === 'down' ? 1 : -1) * innerHeight * 0.6, behavior: 'smooth' });
      return true;
    }
    if (!best) return false;
    best.el.focus({ preventScroll: true });
    best.el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    // keep a little breathing room from the screen edge
    var nr = best.el.getBoundingClientRect(), pad = 60;
    if (inScroller(best.el)) return true;
    if (nr.bottom > innerHeight - pad && nr.height < innerHeight - 2 * pad) window.scrollBy({ top: nr.bottom - innerHeight + pad, behavior: 'smooth' });
    else if (nr.top < pad && nr.height < innerHeight - 2 * pad) window.scrollBy({ top: nr.top - pad, behavior: 'smooth' });
    return true;
  }
  function inScroller(el) {
    for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      var o = getComputedStyle(p).overflowY;
      if ((o === 'auto' || o === 'scroll') && p.scrollHeight > p.clientHeight) return true;
    }
    return false;
  }
  var DIRS = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
  function textField(el) { return el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && /^(text|search|email|url|tel|password|number|)$/i.test(el.type || ''))); }
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var a = document.activeElement, dir = DIRS[e.key];
    if (dir) {
      if (textField(a) && (dir === 'left' || dir === 'right') && a.type !== 'number') {
        try { var atStart = a.selectionStart === 0 && a.selectionEnd === 0, atEnd = a.selectionStart === a.value.length;
          if ((dir === 'left' && !atStart) || (dir === 'right' && !atEnd)) return; } catch (x) { return; }
      }
      if (a && a.closest && a.closest('[data-nav-native]')) return;   // a widget that wants raw arrows
      if (move(dir)) e.preventDefault();
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && a && a.matches && a.matches('[tabindex]:not(a):not(button):not(input):not(select):not(textarea):not(summary)')) {
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

  /* ---------- recents ---------- */
  function remember(item) {
    if (!item || !item.url) return;
    var list = (pref('recent') || []).filter(function (x) { return x.url !== item.url; });
    item.at = Date.now(); list.unshift(item); pref('recent', list.slice(0, 8));
  }

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

  /* ---------- public API ---------- */
  var J = window.Jharokha = {
    ROOT: ROOT, THEMES: THEMES, pref: pref, setTheme: setTheme, toast: toast,
    isTV: isTV, native: N, nativeHas: nativeHas,
    move: move, back: back, home: home, remember: remember,
    recent: function () { return pref('recent') || []; },
    voice: voice, loadJSON: loadJSON,
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
