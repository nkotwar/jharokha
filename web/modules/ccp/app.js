/* CCP Credit Desk — app logic (routes, decks, labs, question engine, mock). */
(function () {
'use strict';
const J = window.Jharokha, C = window.CCP, M = C.MODULES;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const P = (k, v) => (v === undefined ? J.pref('ccp_' + k) : J.pref('ccp_' + k, v));
const rnd = (a, b, step = 1) => a + step * Math.floor(Math.random() * (Math.floor((b - a) / step) + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const r2 = x => Math.round(x * 100) / 100;
const inr = n => Number(r2(n)).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const L = n => '₹' + inr(n) + ' lakh';
const CR = n => '₹' + inr(n) + ' crore';

/* ================= NAV ================= */
const NAV = [
  ['Start', [['home', 'Dashboard'], ['radar', 'Exam Radar'], ['news', 'What’s new']]],
  ['Concept cards', Object.keys(M).map(k => ['deck-' + k, k + ' · ' + M[k].short]).concat([['deck-review', 'Review pile']])],
  ['Labs', [['lab-ratio', 'Ratio Lab'], ['lab-wc', 'Working Capital Lab'], ['lab-project', 'Project Lab'], ['lab-npa', 'NPA Time Machine']]],
  ['Practice', [['cases', 'Credit Desk cases'], ['numericals', 'Unlimited numericals'], ['practice', 'Practice by module'], ['daily', 'Daily 10'], ['mock', 'Full mock (100 Q)'], ['mistakes', 'My mistakes']]]
];
const TITLES = Object.fromEntries(NAV.flatMap(g => g[1]));
function buildNav() {
  const nav = $('#nav');
  NAV.forEach(([g, items]) => {
    const d = document.createElement('div'); d.className = 'grp'; d.textContent = g; nav.appendChild(d);
    items.forEach(([id, t]) => {
      const a = document.createElement('a'); a.href = '#' + id; a.dataset.id = id; a.textContent = t;
      a.onclick = () => { nav.classList.remove('open'); setTimeout(() => $('#main').focus({ preventScroll: true }), 0); };
      nav.appendChild(a);
    });
  });
}
function navKey(route) { if (route.startsWith('case-')) return 'cases'; if (route.startsWith('card-')) return 'deck-' + (cardById(route.slice(5)) || {}).m; if (route === 'quiz') return (session && session.navKey) || 'practice'; return route; }
function updateNav(route) { const k = navKey(route); document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.id === k)); }

/* ================= STORAGE ================= */
const cardState = () => P('cards') || {};
function setCard(id, v) { const s = cardState(); s[id] = v; P('cards', s); }
function stat(m, ok) { const s = P('stats') || {}; s[m] = s[m] || { r: 0, t: 0 }; s[m].t++; if (ok) s[m].r++; P('stats', s); }
function addMistake(q) { let w = P('wrong') || []; w = w.filter(x => x.q !== q.q); w.unshift({ m: q.m, q: q.q, o: q.o, a: q.a, e: q.e, gen: !!q.gen }); P('wrong', w.slice(0, 200)); }
function clearMistake(q) { P('wrong', (P('wrong') || []).filter(x => x.q !== q.q)); }
const cardById = id => C.CARDS.find(c => c.id === id);

/* ================= NUMERICAL GENERATORS ================= */
function opts(correct, wrongs, fmt) {
  const seen = new Set([fmt(correct)]); const o = [fmt(correct)];
  wrongs.filter(w => isFinite(w) && w > 0).forEach(w => { const f = fmt(w); if (!seen.has(f) && o.length < 4) { seen.add(f); o.push(f); } });
  let k = 1; while (o.length < 4 && k < 60) { const v = k < 30 ? correct * (1 + 0.1 * k * (k % 2 ? 1 : -1)) : correct + k; const f = fmt(v); if (v > 0 && !seen.has(f)) { seen.add(f); o.push(f); } k++; }
  const sh = shuffle(o); return { o: sh, a: sh.indexOf(fmt(correct)) };
}
const GEN = {
  mpbf1: { m: 'C', name: 'MPBF Method I', make() { const ca = rnd(200, 900, 10), ocl = rnd(40, Math.floor(ca * 0.4), 10), g = ca - ocl, ans = 0.75 * g;
    return { q: `Current assets ${L(ca)}, current liabilities other than bank borrowings ${L(ocl)}. MPBF under Tandon Method I?`, ...opts(ans, [0.75 * ca - ocl, g, 0.25 * g], L), e: `WC gap = ${ca} − ${ocl} = ${g}. MPBF = 75% × ${g} = <b>${L(ans)}</b>. Borrower brings 25% of the gap.` }; } },
  mpbf2: { m: 'C', name: 'MPBF Method II', make() { const ca = rnd(200, 900, 10), ocl = rnd(40, Math.floor(ca * 0.4), 10), ans = 0.75 * ca - ocl;
    return { q: `Current assets ${L(ca)}, other current liabilities (excluding bank borrowings) ${L(ocl)}. MPBF under Tandon Method II?`, ...opts(ans, [0.75 * (ca - ocl), ca - ocl, 0.75 * ca], L), e: `MPBF = 75% × CA − OCL = ${r2(0.75 * ca)} − ${ocl} = <b>${L(ans)}</b>. Borrower funds 25% of total current assets.` }; } },
  mpbf3: { m: 'C', name: 'MPBF Method III', make() { const ca = rnd(300, 900, 10), core = rnd(40, 120, 10), ocl = rnd(40, Math.min(150, Math.floor(0.75 * (ca - core) / 10) * 10 - 40), 10), ans = 0.75 * (ca - core) - ocl;
    return { q: `CA ${L(ca)}, core current assets ${L(core)}, other current liabilities ${L(ocl)}. MPBF under Method III?`, ...opts(ans, [0.75 * ca - ocl, 0.75 * (ca - ocl), 0.75 * (ca - core - ocl)], L), e: `MPBF = 75% × (CA − core CA) − OCL = 75% × ${ca - core} − ${ocl} = <b>${L(ans)}</b>.` }; } },
  nayak: { m: 'C', name: 'Turnover method', make() { const t = rnd(100, 2000, 20), nwc = Math.random() < 0.5 ? r2(t * rnd(2, 4) / 100) : r2(t * rnd(6, 10) / 100), ans = Math.min(0.2 * t, 0.25 * t - nwc);
    return { q: `Projected annual turnover ${L(t)}; net working capital available ${L(nwc)}. Maximum bank finance under the turnover method?`, ...opts(ans, [0.25 * t, 0.2 * t === ans ? 0.25 * t - nwc : 0.2 * t, 0.05 * t, 0.25 * t - 0.05 * t + nwc], L), e: `Requirement 25% = ${r2(0.25 * t)}. Bank finance = lower of 20% of turnover (${r2(0.2 * t)}) and 25% − NWC (${r2(0.25 * t - nwc)}) = <b>${L(ans)}</b>.` }; } },
  cr: { m: 'B', name: 'Current ratio', make() { const ca = rnd(100, 800, 10), cl = rnd(60, 600, 10), ans = ca / cl;
    return { q: `Current assets ${L(ca)}, current liabilities ${L(cl)}. Current ratio?`, ...opts(ans, [cl / ca, (ca - cl) / cl, ca / (cl + 50)], x => r2(x).toFixed(2)), e: `CR = ${ca} / ${cl} = <b>${r2(ans).toFixed(2)}</b>. Tandon minimum 1.33.` }; } },
  dscr: { m: 'B', name: 'DSCR', make() { const pat = rnd(20, 200, 5), dep = rnd(10, 80, 5), int = rnd(10, 60, 5), inst = rnd(20, 150, 5), ans = (pat + dep + int) / (inst + int);
    return { q: `PAT ${L(pat)}, depreciation ${L(dep)}, interest on term loan ${L(int)}, term-loan instalment ${L(inst)}. DSCR?`, ...opts(ans, [(pat + dep) / inst, (pat + dep + int) / inst, (pat + int) / (inst + int)], x => r2(x).toFixed(2)), e: `(PAT + Dep + Int) / (Instalment + Int) = ${pat + dep + int} / ${inst + int} = <b>${r2(ans).toFixed(2)}</b>.` }; } },
  tol: { m: 'B', name: 'TOL/TNW', make() { const cap = rnd(50, 300, 10), res = rnd(20, 300, 10), intang = rnd(0, 40, 5), tl = rnd(50, 400, 10), cl = rnd(50, 500, 10), tnw = cap + res - intang, ans = (tl + cl) / tnw;
    return { q: `Capital ${L(cap)}, reserves ${L(res)}, intangible assets ${L(intang)}, term loans ${L(tl)}, current liabilities ${L(cl)}. TOL/TNW?`, ...opts(ans, [(tl + cl) / (cap + res), tl / tnw, cl / tnw], x => r2(x).toFixed(2)), e: `TNW = ${cap} + ${res} − ${intang} = ${tnw}. TOL = ${tl} + ${cl} = ${tl + cl}. Ratio = <b>${r2(ans).toFixed(2)}</b>.` }; } },
  invdays: { m: 'B', name: 'Inventory holding', make() { const cogs = rnd(400, 3000, 50), inv = rnd(40, 600, 10), turn = cogs / inv, days = 365 / turn;
    return { q: `Cost of goods sold ${L(cogs)}, average inventory ${L(inv)}. Inventory holding period (days, 365-day year)?`, ...opts(days, [inv / cogs * 360, turn, inv / (cogs * 1.2) * 365], x => Math.round(x) + ' days'), e: `Turnover = ${cogs}/${inv} = ${r2(turn)} times; holding = 365 / ${r2(turn)} ≈ <b>${Math.round(days)} days</b>.` }; } },
  prov: { m: 'E', name: 'NPA provisioning', make() {
    const cat = pick(['SS', 'D1', 'D2', 'D3']), out = rnd(10, 100, 5), sec = rnd(0, out, 5), rate = { D1: 0.25, D2: 0.40, D3: 1 }[cat];
    let ans, e, unsec = out - sec;
    if (cat === 'SS') { const uns = sec <= out * 0.1; ans = out * (uns ? 0.25 : 0.15); e = `Sub-standard: ${uns ? '25% (unsecured exposure — security ≤ 10%)' : '15%'} of ${out} = <b>${L(ans)}</b>.`; }
    else { ans = unsec + sec * rate; e = `Unsecured ${unsec} × 100% + secured ${sec} × ${rate * 100}% (${cat}) = <b>${L(ans)}</b>.`; }
    const label = { SS: 'sub-standard', D1: 'doubtful D1', D2: 'doubtful D2', D3: 'doubtful D3' }[cat];
    return { q: `Outstanding ${L(out)}, realisable security ${L(sec)}. The account is ${label}. Provision required?`, ...opts(ans, [out * 0.15, sec * (rate || 0.15), unsec + sec * 0.25, out * (rate || 0.25)], L), e }; } },
  dp: { m: 'C', name: 'Drawing power', make() { const st = rnd(100, 600, 10), cr = rnd(10, Math.floor(st / 3), 10), sm = pick([20, 25, 30]), db = rnd(50, 400, 10), dm = pick([25, 30, 40]), lim = rnd(150, 600, 10);
    const dp = (st - cr) * (1 - sm / 100) + db * (1 - dm / 100), avail = Math.min(dp, lim);
    return { q: `Stock ${L(st)} (unpaid creditors for purchases ${L(cr)}), margin on stock ${sm}%; eligible debtors ${L(db)}, margin ${dm}%. Sanctioned CC limit ${L(lim)}. Maximum the borrower can draw?`, ...opts(avail, [st * (1 - sm / 100) + db * (1 - dm / 100), dp > lim ? dp : lim, (st - cr) * (1 - sm / 100)], L), e: `Paid stock = ${st - cr}; less ${sm}% = ${r2((st - cr) * (1 - sm / 100))}. Debtors less ${dm}% = ${r2(db * (1 - dm / 100))}. DP = ${r2(dp)}. Drawable = lower of DP and limit = <b>${L(avail)}</b>.` }; } },
  cycle: { m: 'C', name: 'Operating cycle', make() { const rm = rnd(15, 60, 5), wip = rnd(5, 30, 5), fg = rnd(10, 45, 5), db = rnd(20, 90, 5), cr = rnd(15, 60, 5), ans = rm + wip + fg + db - cr;
    return { q: `RM storage ${rm} days, WIP ${wip} days, FG storage ${fg} days, debtors ${db} days, creditors ${cr} days. Net operating cycle?`, ...opts(ans, [ans + 2 * cr, rm + wip + fg, ans - db], x => Math.round(x) + ' days'), e: `${rm} + ${wip} + ${fg} + ${db} − ${cr} = <b>${ans} days</b>.` }; } },
  bep: { m: 'B', name: 'Break-even', make() { const fc = rnd(10, 100, 2), p = rnd(200, 1000, 10), v = rnd(Math.floor(p * 0.4), Math.floor(p * 0.8), 10), ans = fc * 100000 / (p - v);
    return { q: `Fixed costs ${L(fc)} a year, selling price ₹${p} per unit, variable cost ₹${v} per unit. Break-even quantity?`, ...opts(ans, [fc * 100000 / p, fc * 100000 / v, fc * 100000 / (p + v)], x => Math.round(x).toLocaleString('en-IN') + ' units'), e: `BEP = FC / contribution per unit = ${inr(fc * 100000)} / (${p} − ${v}) ≈ <b>${Math.round(ans).toLocaleString('en-IN')} units</b>.` }; } },
  payback: { m: 'B', name: 'Payback period', make() { const inv = rnd(100, 1000, 20), cf = rnd(20, 250, 5), ans = inv / cf;
    return { q: `Investment ${L(inv)}; even annual cash inflow ${L(cf)}. Payback period?`, ...opts(ans, [cf / inv * 10, inv / cf + 1, inv / (cf * 1.2)], x => r2(x).toFixed(2) + ' years'), e: `${inv} / ${cf} = <b>${r2(ans).toFixed(2)} years</b>. Ignores time value of money.` }; } },
  gold: { m: 'D', name: 'Gold loan LTV', make() { const v = pick([1.5, 2, 2.5, 2.8, 3, 3.2, 4, 5, 6, 6.5, 8, 10]); const ans = maxLoan(v, [[2.5, 0.85], [5, 0.80], [Infinity, 0.75]]);
    return { q: `Gold ornaments valued at ${L(v)}. Maximum consumption loan under RBI’s 2025 gold-loan LTV grid?`, ...opts(ans, [v * 0.85, v * 0.75, v * 0.80], L), e: `Grid: ≤ ₹2.5 lakh at 85%, ₹2.5–5 lakh at 80%, above ₹5 lakh at 75%. The loan must fall in the band whose LTV it uses → <b>${L(ans)}</b>.` }; } },
  home: { m: 'D', name: 'Home loan LTV', make() { const v = pick([20, 30, 32, 35, 40, 50, 60, 80, 90, 95, 100, 120]); const ans = maxLoan(v, [[30, 0.90], [75, 0.80], [Infinity, 0.75]]);
    return { q: `Property value ${L(v)}. Maximum housing loan under LTV norms?`, ...opts(ans, [v * 0.9, v * 0.75, v * 0.8], L), e: `≤ ₹30 lakh at 90%, ₹30–75 lakh at 80%, above ₹75 lakh at 75%; the loan must sit in the band whose LTV it uses → <b>${L(ans)}</b>.` }; } },
  lc: { m: 'C', name: 'LC limit', make() { const ann = rnd(120, 1200, 60), lead = pick([1, 1.5, 2]), tr = pick([0.5, 1]), us = pick([0, 1, 2, 3]), mon = ann / 12, ans = mon * (lead + tr + us);
    return { q: `Annual purchases under LC ${L(ann)}. Lead time ${lead} months, transit ${tr} month(s), usance ${us} months. LC limit required?`, ...opts(ans, [mon * (lead + tr), mon * us, ann / 4], L), e: `Monthly = ${r2(mon)}; × (${lead} + ${tr} + ${us}) = <b>${L(ans)}</b>.` }; } }
};
function maxLoan(v, bands) { let best = 0, lower = 0; bands.forEach(([up, ltv]) => { const cand = Math.min(v * ltv, up); if (cand > lower) best = Math.max(best, cand); lower = up; }); return r2(best); }
function genQ(key) {
  const g = GEN[key || pick(Object.keys(GEN))]; let q;
  // never serve a question whose answer or options are nonsensical (zero/negative/duplicate)
  for (let i = 0; i < 25; i++) { q = g.make(); if (q.a >= 0 && q.o.length === 4 && new Set(q.o).size === 4 && !q.o.some(x => /NaN|Infinity|₹-|^-/.test(x))) break; }
  q.m = g.m; q.gen = true; return q;
}

/* ================= ROUTES / VIEWS ================= */
const V = {};
let session = null;          // active quiz/mock
let backing = false;

V.home = () => {
  const st = P('stats') || {}, cs = cardState();
  const mods = Object.keys(M).map(k => {
    const cards = C.CARDS.filter(c => c.m === k), got = cards.filter(c => cs[c.id] === 'got').length, s = st[k] || { r: 0, t: 0 };
    return `<a class="mod" href="#deck-${k}"><span class="mk">${k}</span><b>${esc(M[k].name)}</b><span class="bars"><i style="width:${Math.round(got / cards.length * 100)}%"></i></span><small>${got}/${cards.length} cards · ${s.t ? Math.round(s.r / s.t * 100) + '% of ' + s.t + ' Qs right' : 'no questions yet'}</small></a>`;
  }).join('');
  const sess = P('session');
  return `<div class="hero"><h1>CCP Credit Desk</h1><p>IIBF Certified Credit Professional — learn by doing: flip cards, play with live labs, sit at the credit desk, and test yourself.</p>
  <div class="facts"><span><b>${C.EXAM.questions}</b> questions</span><span><b>${C.EXAM.minutes / 60} hrs</b></span><span><b>${C.EXAM.pass}</b> to pass</span><span><b>No</b> negative marking</span><span>5-mark case studies</span></div></div>
  <div class="row3">
    ${sess && !sess.done ? `<a class="act pri" href="#quiz">Resume: ${esc(sess.title)} (${sess.idx + 1}/${sess.items.length})</a>` : ''}
    <a class="act" href="#daily">Daily 10</a><a class="act" href="#cases">A Credit Desk case</a><a class="act" href="#numericals">Numericals</a><a class="act" href="#mock">Full mock</a>
  </div>
  <h2>Your modules</h2><div class="mods">${mods}</div>
  <p class="small">${esc(C.EXAM.note)} ${esc(C.EXAM.cutoff)}</p>`;
};

V.radar = () => `<h1>Exam Radar</h1><p class="lead">Themes that keep turning up in questions recalled by candidates. Hotter = seen more often. Open any to revise.</p>
  <div class="list">${C.RADAR.slice().sort((a, b) => b.heat - a.heat).map(r => `<a class="li" href="#card-${r.card}"><span class="heat h${r.heat}">${'●'.repeat(r.heat)}${'○'.repeat(3 - r.heat)}</span><span><b>${esc(r.t)}</b><small>Module ${r.m} · ${esc(M[r.m].short)}</small></span></a>`).join('')}</div>
  <p class="small">Recalled questions are compiled by coaching sites from candidates’ memory; they are not official papers.</p>`;

V.news = () => `<h1>What’s new before the cut-off</h1><p class="lead">${esc(C.EXAM.cutoff)}</p>
  <div class="list">${C.NEWS.map(n => `<a class="li" href="#card-${n.card}"><span class="date">${esc(n.d)}</span><span><b>${esc(n.t)}</b><small>${esc(n.b)}</small></span></a>`).join('')}</div>`;

/* ---------- decks ---------- */
let deck = { key: null, list: [], i: 0, flip: false, filter: 'all' };
function deckList(key, filter) {
  const cs = cardState();
  let list = key === 'review' ? C.CARDS.filter(c => cs[c.id] === 'again') : C.CARDS.filter(c => c.m === key);
  if (filter === 'review') list = list.filter(c => cs[c.id] === 'again');
  if (filter === 'new') list = list.filter(c => !cs[c.id]);
  return list;
}
function deckView(key, startId) {
  if (deck.key !== key) deck = { key, list: [], i: 0, flip: false, filter: 'all' };
  deck.list = deckList(key, deck.filter);
  if (startId) { const i = deck.list.findIndex(c => c.id === startId); if (i < 0) { deck.filter = 'all'; deck.list = deckList(key, 'all'); } deck.i = Math.max(0, deck.list.findIndex(c => c.id === startId)); deck.flip = true; }
  deck.i = Math.min(deck.i, Math.max(0, deck.list.length - 1));
  const title = key === 'review' ? 'Review pile' : `Module ${key} · ${M[key].name}`;
  const cs = cardState(), all = key === 'review' ? deck.list : C.CARDS.filter(c => c.m === key), got = all.filter(c => cs[c.id] === 'got').length;
  if (!deck.list.length) return `<h1>${esc(title)}</h1><p class="lead">${key === 'review' ? 'Nothing in your review pile. Mark cards "Review again" and they collect here.' : 'No cards match this filter.'}</p>${key !== 'review' ? filterChips() : ''}`;
  const c = deck.list[deck.i], s = cs[c.id];
  return `<h1>${esc(title)}</h1>
  ${key !== 'review' ? `<div class="deckbar">${filterChips()}<span class="small">${got}/${all.length} marked "Got it"</span></div>` : ''}
  <div class="card ${deck.flip ? 'flipped' : ''}" id="thecard">
    <div class="cardtop"><span class="tag">${esc(c.t)}</span><span class="small">${deck.i + 1} / ${deck.list.length}${s ? ' · ' + (s === 'got' ? 'Got it ✓' : 'Review ↺') : ''}</span></div>
    <div class="front">${esc(c.f)}</div>
    ${deck.flip ? `<div class="back">${c.b}${c.trap ? `<div class="trap"><b>Exam trap:</b> ${c.trap}</div>` : ''}</div>` : `<div class="hint">Think of your answer, then press <b>Show answer</b>.</div>`}
  </div>
  <div class="cardctl">
    <button id="cPrev" ${deck.i === 0 ? 'disabled' : ''}>◀ Previous</button>
    <button id="cFlip" class="pri">${deck.flip ? 'Hide answer' : 'Show answer'}</button>
    <button id="cNext" ${deck.i >= deck.list.length - 1 ? 'disabled' : ''}>Next ▶</button>
  </div>
  <div class="cardctl"><button id="cGot" class="${s === 'got' ? 'sel' : ''}">✓ Got it</button><button id="cAgain" class="${s === 'again' ? 'sel' : ''}">↺ Review again</button></div>`;
}
function filterChips() { return `<div class="chips">${[['all', 'All'], ['new', 'Not seen'], ['review', 'To review']].map(([k, t]) => `<button class="chip ${deck.filter === k ? 'sel' : ''}" data-f="${k}">${t}</button>`).join('')}</div>`; }
function deckWire(focusId) {
  const go = (d) => { deck.i = Math.max(0, Math.min(deck.list.length - 1, deck.i + d)); deck.flip = false; rerender(d > 0 ? 'cFlip' : 'cFlip'); };
  const b = id => document.getElementById(id);
  if (b('cPrev')) b('cPrev').onclick = () => go(-1);
  if (b('cNext')) b('cNext').onclick = () => go(1);
  if (b('cFlip')) b('cFlip').onclick = () => { deck.flip = !deck.flip; rerender('cFlip'); };
  const mark = v => { const c = deck.list[deck.i]; setCard(c.id, v); if (deck.i < deck.list.length - 1) { deck.i++; deck.flip = false; } rerender(v === 'got' ? 'cFlip' : 'cFlip'); };
  if (b('cGot')) b('cGot').onclick = () => mark('got');
  if (b('cAgain')) b('cAgain').onclick = () => mark('again');
  document.querySelectorAll('.chip[data-f]').forEach(x => x.onclick = () => { deck.filter = x.dataset.f; deck.i = 0; deck.flip = false; rerender(); });
}
Object.keys(M).forEach(k => V['deck-' + k] = () => deckView(k));
V['deck-review'] = () => deckView('review');

/* ---------- labs: stepper inputs ---------- */
function field(id, label, val, step, unit = '₹ lakh') {
  return `<div class="fld"><label for="${id}">${esc(label)} <small>${esc(unit)}</small></label><div class="stp"><button class="mn" data-for="${id}" data-step="${-step}" aria-label="Decrease ${esc(label)}">−</button><input id="${id}" type="number" inputmode="decimal" value="${val}" step="${step}"><button class="pl" data-for="${id}" data-step="${step}" aria-label="Increase ${esc(label)}">+</button></div></div>`;
}
function labWire(calc) {
  const run = () => { try { $('#out').innerHTML = calc(id => parseFloat(document.getElementById(id).value) || 0); } catch (e) { $('#out').textContent = 'Check the inputs.'; } };
  document.querySelectorAll('.stp button').forEach(b => b.onclick = () => { const i = document.getElementById(b.dataset.for); i.value = r2((parseFloat(i.value) || 0) + parseFloat(b.dataset.step)); if (i.min !== '' && +i.value < +i.min) i.value = i.min; run(); });
  document.querySelectorAll('.lab input').forEach(i => i.addEventListener('input', run));
  run();
  return run;
}
const judge = (v, good, ok, higherBetter = true) => (higherBetter ? (v >= good ? 'g' : v >= ok ? 'w' : 'b') : (v <= good ? 'g' : v <= ok ? 'w' : 'b'));
const pill = (k, label) => `<span class="pill ${k}">${label || ({ g: 'Comfortable', w: 'Watch', b: 'Weak' }[k])}</span>`;

V['lab-ratio'] = () => `<h1>Ratio Lab</h1><p class="lead">Change any figure with − / + (or press OK on a box to type). Every ratio updates live, with the usual bank comfort levels.</p>
<div class="lab"><div class="inputs">
<h3>Net worth & long-term</h3>${field('cap', 'Paid-up capital', 100, 10)}${field('res', 'Reserves (excl. revaluation)', 200, 10)}${field('reval', 'Revaluation reserve', 50, 10)}${field('intang', 'Intangible / fictitious assets', 20, 5)}${field('tl', 'Term loans (excl. 12-month instalments)', 250, 10)}
<h3>Current liabilities</h3>${field('bank', 'Bank WC borrowings', 150, 10)}${field('cred', 'Creditors & other CL', 120, 10)}${field('inst', 'TL instalments due in 12 months', 50, 5)}
<h3>Current assets</h3>${field('inv', 'Inventory', 220, 10)}${field('rec', 'Receivables', 180, 10)}${field('cash', 'Cash & other CA', 40, 5)}
<h3>Profit & loss (year)</h3>${field('sales', 'Sales', 1500, 50)}${field('cogs', 'Cost of goods sold', 1150, 50)}${field('pat', 'Profit after tax', 60, 5)}${field('tax', 'Tax', 20, 5)}${field('dep', 'Depreciation', 40, 5)}${field('itl', 'Interest on term loan', 30, 5)}${field('iwc', 'Other interest', 15, 5)}
</div><div class="outputs" id="out" aria-live="polite"></div></div>`;
function ratioCalc(v) {
  const tnw = v('cap') + v('res') - v('intang'), ca = v('inv') + v('rec') + v('cash'), cl = v('bank') + v('cred') + v('inst');
  const cr = ca / cl, qr = (ca - v('inv')) / cl, der = v('tl') / tnw, tol = (v('tl') + cl) / tnw;
  const dscr = (v('pat') + v('dep') + v('itl')) / (v('inst') + v('itl')), ebit = v('pat') + v('tax') + v('itl') + v('iwc'), iscr = ebit / (v('itl') + v('iwc'));
  const invd = v('inv') / v('cogs') * 365, recd = v('rec') / v('sales') * 365, npm = v('pat') / v('sales') * 100, nwc = ca - cl;
  const row = (n, val, j, f) => `<tr><td>${n}<small>${f}</small></td><td><b>${val}</b></td><td>${j}</td></tr>`;
  return `<div class="kpis"><div><small>Tangible net worth</small><b>${L(tnw)}</b></div><div><small>Net working capital</small><b>${L(nwc)}</b></div><div><small>Total outside liabilities</small><b>${L(v('tl') + cl)}</b></div></div>
  <table><tr><th>Ratio</th><th>Value</th><th>Read</th></tr>
  ${row('Current ratio', cr.toFixed(2), pill(judge(cr, 1.33, 1.1)), 'CA / CL · Tandon min 1.33')}
  ${row('Quick ratio', qr.toFixed(2), pill(judge(qr, 1, 0.75)), '(CA − inventory) / CL')}
  ${row('Debt-equity', der.toFixed(2), pill(judge(der, 2, 3, false)), 'Term debt / TNW · ≤ 2:1')}
  ${row('TOL / TNW', tol.toFixed(2), pill(judge(tol, 3, 4, false)), 'All outside liabilities / TNW · ≤ 3:1')}
  ${row('DSCR', dscr.toFixed(2), pill(judge(dscr, 1.5, 1.2)), '(PAT+Dep+Int) / (Inst+Int)')}
  ${row('Interest coverage', iscr.toFixed(2), pill(judge(iscr, 2.5, 1.5)), 'EBIT / total interest')}
  ${row('Inventory holding', Math.round(invd) + ' days', '', 'Inventory / COGS × 365')}
  ${row('Debtors collection', Math.round(recd) + ' days', '', 'Receivables / sales × 365')}
  ${row('Net profit margin', npm.toFixed(1) + '%', '', 'PAT / sales')}
  </table><p class="small">Revaluation reserve (${L(v('reval'))}) is excluded from TNW and doesn’t change NWC. TL instalments due within 12 months are treated as current liabilities.</p>`;
}

V['lab-wc'] = () => `<h1>Working Capital Lab</h1><p class="lead">Compare the Nayak turnover method with Tandon’s three MPBF methods, build an operating cycle, and compute drawing power.</p>
<div class="lab"><div class="inputs">
<h3>Assessment</h3>${field('t', 'Projected annual turnover', 400, 20)}${field('ca', 'Projected current assets', 120, 10)}${field('ocl', 'Other current liabilities (excl. bank)', 30, 5)}${field('core', 'Core current assets', 20, 5)}${field('nwc', 'Net working capital available', 15, 5)}
<h3>Operating cycle (days)</h3>${field('rmd', 'Raw material storage', 30, 5, 'days')}${field('wipd', 'Work-in-progress', 10, 5, 'days')}${field('fgd', 'Finished goods storage', 20, 5, 'days')}${field('drd', 'Debtors collection', 45, 5, 'days')}${field('crd', 'Creditors payment', 30, 5, 'days')}
<h3>Drawing power</h3>${field('st', 'Stock', 80, 5)}${field('ucr', 'Unpaid creditors for purchases', 20, 5)}${field('sm', 'Margin on stock', 25, 5, '%')}${field('db', 'Eligible debtors', 50, 5)}${field('dm', 'Margin on debtors', 40, 5, '%')}${field('lim', 'Sanctioned CC limit', 70, 5)}
</div><div class="outputs" id="out" aria-live="polite"></div></div>`;
function wcCalc(v) {
  const t = v('t'), ca = v('ca'), ocl = v('ocl'), core = v('core'), nwc = v('nwc');
  const nay = Math.min(0.2 * t, 0.25 * t - nwc), m1 = 0.75 * (ca - ocl), m2 = 0.75 * ca - ocl, m3 = 0.75 * (ca - core) - ocl;
  const crOf = mp => ca / (ocl + Math.max(mp, 0));
  const cyc = v('rmd') + v('wipd') + v('fgd') + v('drd') - v('crd');
  const dp = (v('st') - v('ucr')) * (1 - v('sm') / 100) + v('db') * (1 - v('dm') / 100), draw = Math.min(dp, v('lim'));
  const best = Math.max(nay, m1, m2, m3);
  const rw = (n, val, cr, note) => `<tr class="${val === best ? 'hi' : ''}"><td>${n}<small>${note}</small></td><td><b>${L(val)}</b></td><td>${cr}</td></tr>`;
  return `<table><tr><th>Method</th><th>Bank finance</th><th>Resulting CR</th></tr>
  ${rw('Turnover (Nayak)', nay, crOf(nay).toFixed(2), `min(20% of T = ${r2(0.2 * t)}, 25% − NWC = ${r2(0.25 * t - nwc)})`)}
  ${rw('MPBF Method I', m1, crOf(m1).toFixed(2), '75% × (CA − OCL)')}
  ${rw('MPBF Method II', m2, crOf(m2).toFixed(2), '75% × CA − OCL')}
  ${rw('MPBF Method III', m3, crOf(m3).toFixed(2), '75% × (CA − core) − OCL')}
  </table>
  <p class="small">Turnover method: MSE limits up to ₹5 crore. Method II is the Chore Committee choice; its minimum current ratio is 1.33.</p>
  <div class="kpis"><div><small>Net operating cycle</small><b>${cyc} days</b></div><div><small>Rough WC need (turnover × cycle ÷ 365)</small><b>${L(t * cyc / 365)}</b></div></div>
  <div class="kpis"><div><small>Drawing power</small><b>${L(dp)}</b></div><div><small>Can draw now</small><b>${L(draw)}</b></div><div><small>Limited by</small><b>${dp < v('lim') ? 'Drawing power' : 'Sanctioned limit'}</b></div></div>`;
}

V['lab-project'] = () => `<h1>Project Lab</h1><p class="lead">Test a project the way a term-loan officer would: payback, NPV, IRR and break-even.</p>
<div class="lab"><div class="inputs">
<h3>Investment</h3>${field('inv', 'Initial investment', 500, 25)}${field('cf', 'Annual cash inflow (PAT + dep.)', 120, 5)}${field('life', 'Project life', 7, 1, 'years')}${field('k', 'Cost of capital', 11, 0.5, '%')}
<h3>Break-even</h3>${field('fc', 'Fixed costs per year', 60, 5)}${field('dep', 'of which depreciation', 25, 5)}${field('p', 'Selling price per unit', 500, 10, '₹')}${field('vc', 'Variable cost per unit', 300, 10, '₹')}${field('cap', 'Installed capacity', 100000, 5000, 'units/yr')}
</div><div class="outputs" id="out" aria-live="polite"></div></div>`;
function projCalc(v) {
  const inv = v('inv'), cf = v('cf'), n = Math.max(1, Math.round(v('life'))), k = v('k') / 100;
  const npvAt = r => { let s = -inv; for (let t = 1; t <= n; t++) s += cf / Math.pow(1 + r, t); return s; };
  const npv = npvAt(k); let lo = -0.99, hi = 5, irr = null;
  if (npvAt(lo) * npvAt(hi) < 0) { for (let i = 0; i < 100; i++) { const mid = (lo + hi) / 2; if (npvAt(mid) > 0) lo = mid; else hi = mid; } irr = (lo + hi) / 2; }
  const pb = inv / cf, contrib = v('p') - v('vc'), bep = contrib > 0 ? v('fc') * 100000 / contrib : Infinity, cbep = contrib > 0 ? (v('fc') - v('dep')) * 100000 / contrib : Infinity;
  const pct = bep / v('cap') * 100;
  return `<div class="kpis"><div><small>Payback</small><b>${pb.toFixed(2)} yrs</b></div><div><small>NPV @ ${v('k')}%</small><b>${L(npv)}</b></div><div><small>IRR</small><b>${irr === null ? '—' : (irr * 100).toFixed(1) + '%'}</b></div><div><small>Profitability index</small><b>${((npv + inv) / inv).toFixed(2)}</b></div></div>
  <p>${npv >= 0 ? pill('g', 'Accept') + ' NPV is positive' : pill('b', 'Reject') + ' NPV is negative'} at ${v('k')}% cost of capital${irr !== null ? `; IRR ${irr > k ? 'exceeds' : 'is below'} it` : ''}. ${pb > n ? 'Payback is longer than the project life!' : ''}</p>
  <div class="kpis"><div><small>Break-even</small><b>${isFinite(bep) ? Math.round(bep).toLocaleString('en-IN') + ' units' : '—'}</b></div><div><small>BEP % of capacity</small><b>${isFinite(pct) ? pct.toFixed(1) + '%' : '—'}</b></div><div><small>Cash BEP</small><b>${isFinite(cbep) ? Math.round(cbep).toLocaleString('en-IN') + ' units' : '—'}</b></div></div>
  <p class="small">Lower BEP as % of capacity = safer. Cash BEP excludes depreciation. Try cutting price by 10% — that’s sensitivity analysis.</p>`;
}

V['lab-npa'] = () => `<h1>NPA Time Machine</h1><p class="lead">Move the overdue clock and watch the account slide from SMA to NPA and through the doubtful buckets — with the provision at each stage (current IRAC norms).</p>
<div class="lab"><div class="inputs">
${field('d', 'Days overdue', 45, 15, 'days')}${field('o', 'Outstanding', 50, 5)}${field('s', 'Realisable value of security', 30, 5)}${field('g', 'Guaranteed by CGTMSE / ECGC (on the unsecured part)', 0, 5)}
<div class="fld"><label for="sec">Sector (for standard asset provision)</label><select id="sec"><option value="0.40">General / others · 0.40%</option><option value="0.25">Agriculture & SME · 0.25%</option><option value="1">CRE · 1%</option><option value="0.75">CRE-RH · 0.75%</option><option value="2">Teaser home loan · 2%</option></select></div>
</div><div class="outputs" id="out" aria-live="polite"></div></div>`;
function npaCalc(v) {
  const d = Math.max(0, v('d')), o = v('o'), s = Math.min(v('s'), o), cover = Math.min(v('g'), Math.max(0, o - s)), net = o - cover, stdr = parseFloat($('#sec').value);
  let cls, prov, why, stage;
  if (d <= 90) {
    stage = d === 0 ? 0 : d <= 30 ? 1 : d <= 60 ? 2 : 3; cls = ['Standard (regular)', 'SMA-0 (standard)', 'SMA-1 (standard)', 'SMA-2 (standard)'][stage];
    prov = o * stdr / 100; why = `Standard asset: ${stdr}% of ${o}.`;
  } else {
    const npaM = (d - 90) / 30.44, sec = Math.min(s, net), uns = net - sec, unsecExp = s <= o * 0.1;
    if (npaM <= 12) { stage = 4; cls = 'Sub-standard'; const r = unsecExp ? 25 : 15; prov = net * r / 100; why = `NPA for ${npaM.toFixed(1)} months → sub-standard: ${r}%${unsecExp ? ' (unsecured exposure)' : ''} of ${r2(net)}.`; }
    else { const y = (npaM - 12) / 12, b = y <= 1 ? ['D1', 25, 5] : y <= 3 ? ['D2', 40, 6] : ['D3', 100, 7]; stage = b[2]; cls = 'Doubtful ' + b[0];
      prov = uns + sec * b[1] / 100; why = `In doubtful for ${y.toFixed(1)} yrs → ${b[0]}: unsecured ${r2(uns)} × 100% + secured ${r2(sec)} × ${b[1]}%.`; }
    if (cover) why += ` CGTMSE/ECGC-guaranteed portion ${r2(cover)} (on the unsecured part) needs no provision — RBI IRAC norms.`;
  }
  const steps = ['Regular', 'SMA-0', 'SMA-1', 'SMA-2', 'Sub-std', 'D1', 'D2', 'D3'];
  return `<div class="tl">${steps.map((x, i) => `<span class="${i === stage ? 'now' : i < stage ? 'past' : ''}">${x}</span>`).join('')}</div>
  <div class="kpis"><div><small>Classification</small><b>${cls}</b></div><div><small>Provision</small><b>${L(prov)}</b></div><div><small>Coverage</small><b>${o ? (prov / o * 100).toFixed(1) : 0}%</b></div></div>
  <p>${why}</p>
  <p class="small">${d > 90 ? 'Interest is recognised only when received; unrealised interest is reversed. Upgrade needs the entire arrears paid.' : 'SMA accounts are standard but reported (CRILC for ₹5 crore+).'} From 1 April 2027, scheduled commercial banks move to Expected Credit Loss provisioning.</p>`;
}

/* ---------- cases ---------- */
V.cases = () => `<h1>Credit Desk cases</h1><p class="lead">A borrower walks in. Read the file, then answer five linked questions — just like the exam’s 5-mark case studies.</p>
<div class="list">${C.CASES.map(c => { const best = (P('casebest') || {})[c.id]; return `<a class="li" href="#case-${c.id}"><span class="mk">${c.m}</span><span><b>${esc(c.title)}</b><small>${esc(c.tag)}${best != null ? ' · best ' + best + '/5' : ''}</small></span></a>`; }).join('')}</div>`;
function caseView(id) {
  const c = C.CASES.find(x => x.id === id); if (!c) return '<p>Case not found.</p>';
  return `<h1>${esc(c.title)}</h1><div class="file"><span class="tag">The file</span><p>${c.story}</p></div>
  <div class="cardctl"><button class="pri" id="startCase">Start the 5 questions</button><a class="btn" href="#cases">All cases</a></div>`;
}

/* ---------- practice hubs ---------- */
V.numericals = () => `<h1>Unlimited numericals</h1><p class="lead">Fresh numbers every time, with the working shown after you answer.</p>
<div class="grid">${Object.entries(GEN).map(([k, g]) => `<button class="tile" data-gen="${k}"><span class="mk">${g.m}</span><b>${esc(g.name)}</b></button>`).join('')}
<button class="tile pri" data-gen="*"><b>Mixed — 10 random</b></button></div>`;
V.practice = () => `<h1>Practice by module</h1><p class="lead">15 questions: concept MCQs plus numericals from the module, with instant explanations.</p>
<div class="grid">${Object.keys(M).map(k => `<button class="tile" data-mod="${k}"><span class="mk">${k}</span><b>${esc(M[k].name)}</b><small>${C.QUESTIONS.filter(q => q.m === k).length} MCQs + numericals</small></button>`).join('')}
<button class="tile" data-mod="pyq"><b>Recalled-question themes only</b><small>${C.QUESTIONS.filter(q => q.pyq).length} questions</small></button></div>`;
V.daily = () => `<h1>Daily 10</h1><p class="lead">Ten minutes a day: 6 concept questions, 3 numericals and 1 from your mistakes.</p><div class="cardctl"><button class="pri" id="startDaily">Start today’s 10</button></div>`;
V.mock = () => { const s = P('session'); const m = s && s.kind === 'mock' && !s.done ? s : null; const last = P('lastmock');
  return `<h1>Full mock test</h1><p class="lead">100 questions · 2 hours · 50 to pass · no negative marking. Two 5-question case studies, numericals and concept questions across all modules. The clock pauses when you leave and resumes when you return.</p>
  ${last ? `<p>Last mock: <b>${last.score}/100</b> (${last.score >= 50 ? 'pass' : 'not yet'}) on ${new Date(last.at).toLocaleDateString('en-IN')}.</p>` : ''}
  <div class="cardctl">${m ? `<a class="btn pri" href="#quiz">Resume mock (${m.idx + 1}/100)</a>` : ''}<button class="${m ? '' : 'pri'}" id="startMock">${m ? 'Start a new mock' : 'Start mock'}</button></div>`; };
V.mistakes = () => { const w = P('wrong') || [];
  return `<h1>My mistakes</h1><p class="lead">${w.length ? `${w.length} question(s) you got wrong. Answer them right and they leave the list.` : 'No mistakes saved yet — they collect here automatically.'}</p>
  ${w.length ? `<div class="cardctl"><button class="pri" id="startWrong">Retry ${Math.min(w.length, 20)} mistakes</button><button id="clearWrong">Clear list</button></div><div class="list">${w.slice(0, 30).map(q => `<div class="li"><span class="mk">${q.m}</span><span>${esc(q.q)}<small>Answer: ${esc(q.o[q.a])}</small></span></div>`).join('')}</div>` : ''}`; };

/* ================= QUIZ ENGINE ================= */
function startSession(kind, title, items, opts2 = {}) {
  session = { kind, title, items, idx: 0, answers: Array(items.length).fill(null), done: false, navKey: opts2.navKey || 'practice', left: opts2.seconds || 0, caseId: opts2.caseId };
  save(); if (location.hash === '#quiz') render(); else location.hash = 'quiz';
}
function save() { if (session && (session.kind === 'mock' || session.kind === 'daily')) P('session', session); }
function sample(arr, n) { return shuffle(arr).slice(0, n); }
function buildMock() {
  const cs = sample(C.CASES, 2).flatMap(c => c.qs.map(q => ({ ...q, m: c.m, caseTitle: c.title, story: c.story })));
  const nums = Array.from({ length: 25 }, () => genQ());
  const stat = sample(C.QUESTIONS, 65);
  return cs.concat(shuffle(nums.concat(stat)));
}
V.quiz = () => {
  const s = session; if (!s) return `<h1>No test running</h1><p class="lead">Start one from Practice, Daily 10 or Mock.</p>`;
  if (s.done) return resultView();
  const q = s.items[s.idx], ans = s.answers[s.idx], mock = s.kind === 'mock', showFb = !mock && ans !== null;
  const mm = Math.floor(s.left / 60), ss = s.left % 60;
  return `<div class="qhead"><span class="tag">${esc(s.title)}</span><span>Q ${s.idx + 1} / ${s.items.length}</span>${mock ? `<span class="timer" id="timer">${mm}:${String(ss).padStart(2, '0')}</span>` : ''}</div>
  ${q.story ? `<details class="file"><summary>${esc(q.caseTitle)} — case file</summary><p>${q.story}</p></details>` : ''}
  <div class="qtext"><span class="mk">${q.m}</span>${q.gen ? q.q : esc(q.q)}</div>
  <div class="opts">${q.o.map((o, i) => { let cls = ''; if (showFb) cls = i === q.a ? 'right' : i === ans ? 'wrong' : ''; else if (ans === i) cls = 'sel'; return `<button class="opt ${cls}" data-i="${i}"><span>${'ABCD'[i]}</span>${esc(o)}</button>`; }).join('')}</div>
  ${showFb ? `<div class="fb ${ans === q.a ? 'ok' : 'no'}"><b>${ans === q.a ? 'Correct.' : 'Not quite — answer ' + 'ABCD'[q.a] + '.'}</b> ${q.e}</div>` : ''}
  <div class="cardctl">
    <button id="qPrev" ${s.idx === 0 ? 'disabled' : ''}>◀ Previous</button>
    ${s.idx < s.items.length - 1 ? `<button id="qNext" class="${showFb || (mock && ans !== null) ? 'pri' : ''}">Next ▶</button>` : `<button id="qFinish" class="pri">${mock ? 'Submit test' : 'See result'}</button>`}
  </div>
  ${mock ? `<details class="palette"><summary>Question palette · ${s.answers.filter(a => a !== null).length} answered</summary><div class="pal">${s.items.map((_, i) => `<button data-j="${i}" class="${s.answers[i] !== null ? 'done' : ''} ${i === s.idx ? 'cur' : ''}">${i + 1}</button>`).join('')}</div></details>
  <div class="cardctl"><button id="qSubmitNow">Submit now</button></div>` : ''}`;
};
function quizWire() {
  const s = session; if (!s || s.done) { const again = $('#again'); if (again) again.onclick = () => restartLike(); return; }
  const mock = s.kind === 'mock';
  document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    const i = +b.dataset.i, q = s.items[s.idx];
    if (!mock && s.answers[s.idx] !== null) return;
    s.answers[s.idx] = i; save();
    if (!mock) { stat(q.m, i === q.a); if (i === q.a) clearMistake(q); else addMistake(q); }
    rerender(mock ? (s.idx < s.items.length - 1 ? 'qNext' : 'qFinish') : (s.idx < s.items.length - 1 ? 'qNext' : 'qFinish'));
  });
  const nav = d => { s.idx = Math.max(0, Math.min(s.items.length - 1, s.idx + d)); save(); rerender(); focusFirstOpt(); };
  if ($('#qPrev')) $('#qPrev').onclick = () => nav(-1);
  if ($('#qNext')) $('#qNext').onclick = () => nav(1);
  if ($('#qFinish')) $('#qFinish').onclick = () => finish();
  if ($('#qSubmitNow')) $('#qSubmitNow').onclick = e => { if (e.target.dataset.sure) finish(); else { e.target.dataset.sure = 1; e.target.textContent = 'Press again to submit'; } };
  document.querySelectorAll('.pal button').forEach(b => b.onclick = () => { s.idx = +b.dataset.j; save(); rerender(); focusFirstOpt(); });
}
function focusFirstOpt() { const o = document.querySelector('.opt'); if (o) o.focus({ preventScroll: true }); }
let tick = null;
function startTimer() {
  clearInterval(tick);
  if (!session || session.kind !== 'mock' || session.done) return;
  tick = setInterval(() => {
    if (!session || session.done || (location.hash || '').slice(1) !== 'quiz') { clearInterval(tick); return; }
    session.left = Math.max(0, session.left - 1); const t = $('#timer');
    if (t) { t.textContent = Math.floor(session.left / 60) + ':' + String(session.left % 60).padStart(2, '0'); t.classList.toggle('low', session.left < 600); }
    if (session.left % 15 === 0) save();
    if (session.left === 0) { finish(); }
  }, 1000);
}
function finish() {
  const s = session; s.done = true; clearInterval(tick);
  const score = s.items.reduce((n, q, i) => n + (s.answers[i] === q.a ? 1 : 0), 0); s.score = score;
  if (s.kind === 'mock') { s.items.forEach((q, i) => { stat(q.m, s.answers[i] === q.a); if (s.answers[i] !== q.a) addMistake(q); else clearMistake(q); }); P('lastmock', { score, at: Date.now() }); }
  if (s.kind === 'case') { const b = P('casebest') || {}; b[s.caseId] = Math.max(b[s.caseId] || 0, score); P('casebest', b); }
  P('session', null); rerender('again');
}
function resultView() {
  const s = session, by = {};
  s.items.forEach((q, i) => { by[q.m] = by[q.m] || { r: 0, t: 0 }; by[q.m].t++; if (s.answers[i] === q.a) by[q.m].r++; });
  const pct = Math.round(s.score / s.items.length * 100), pass = s.kind === 'mock' ? s.score >= 50 : pct >= 60;
  const wrong = s.items.map((q, i) => ({ q, a: s.answers[i] })).filter(x => x.a !== x.q.a);
  return `<h1>${esc(s.title)} — result</h1>
  <div class="kpis"><div><small>Score</small><b>${s.score} / ${s.items.length}</b></div><div><small>Percent</small><b>${pct}%</b></div><div><small>Verdict</small><b>${s.kind === 'mock' ? (pass ? 'Pass ✓' : 'Below 50') : (pass ? 'Good' : 'Revise')}</b></div></div>
  <table><tr><th>Module</th><th>Right</th></tr>${Object.keys(by).sort().map(k => `<tr><td>${k} · ${esc(M[k].short)}</td><td>${by[k].r} / ${by[k].t}</td></tr>`).join('')}</table>
  <div class="cardctl"><button class="pri" id="again">Try another</button><a class="btn" href="#mistakes">Review mistakes</a></div>
  ${wrong.length ? `<h2>Where you slipped</h2>${wrong.slice(0, 40).map(x => `<details class="file"><summary>${x.q.gen ? x.q.q.replace(/<[^>]+>/g, '') : esc(x.q.q)}</summary><p>Your answer: ${x.a === null ? '—' : esc(x.q.o[x.a])}<br>Correct: <b>${esc(x.q.o[x.q.a])}</b></p><p>${x.q.e}</p></details>`).join('')}` : ''}`;
}
function restartLike() { const s = session; session = null; if (!s) return; if (s.kind === 'mock') location.hash = 'mock'; else if (s.kind === 'case') location.hash = 'case-' + s.caseId; else if (s.kind === 'daily') location.hash = 'daily'; else location.hash = s.navKey || 'practice'; }

/* ================= RENDER ================= */
function route() { const h = (location.hash || '').slice(1); return h || 'home'; }
function viewFor(r) {
  if (r.startsWith('case-')) return caseView(r.slice(5));
  if (r.startsWith('card-')) { const c = cardById(r.slice(5)); if (c) { const h = deckView(c.m, c.id); history.replaceState(null, '', '#deck-' + c.m); return h; } }
  return (V[r] || V.home)();
}
function wire(r) {
  if (r.startsWith('deck-') || r.startsWith('card-')) deckWire();
  if (r === 'lab-ratio') labWire(ratioCalc);
  if (r === 'lab-wc') labWire(wcCalc);
  if (r === 'lab-project') labWire(projCalc);
  if (r === 'lab-npa') { const run = labWire(npaCalc); $('#sec').onchange = run; }
  if (r.startsWith('case-')) { const b = $('#startCase'); if (b) b.onclick = () => { const c = C.CASES.find(x => x.id === r.slice(5)); startSession('case', c.title, c.qs.map(q => ({ ...q, m: c.m, caseTitle: c.title, story: c.story })), { navKey: 'cases', caseId: c.id }); }; }
  if (r === 'numericals') document.querySelectorAll('[data-gen]').forEach(b => b.onclick = () => { const k = b.dataset.gen; startSession('num', k === '*' ? 'Mixed numericals' : GEN[k].name + ' drill', Array.from({ length: k === '*' ? 10 : 8 }, () => genQ(k === '*' ? null : k)), { navKey: 'numericals' }); });
  if (r === 'practice') document.querySelectorAll('[data-mod]').forEach(b => b.onclick = () => { const k = b.dataset.mod;
    let items; if (k === 'pyq') items = sample(C.QUESTIONS.filter(q => q.pyq), 15);
    else { const gens = Object.keys(GEN).filter(g => GEN[g].m === k); items = sample(C.QUESTIONS.filter(q => q.m === k), gens.length ? 11 : 15).concat(gens.length ? Array.from({ length: 4 }, () => genQ(pick(gens))) : []); items = shuffle(items); }
    startSession('practice', k === 'pyq' ? 'Recalled themes' : 'Module ' + k + ' practice', items, { navKey: 'practice' }); });
  if (r === 'daily') $('#startDaily').onclick = () => { const w = P('wrong') || []; const items = sample(C.QUESTIONS, 6).concat(Array.from({ length: 3 }, () => genQ())).concat(w.length ? [w[0]] : sample(C.QUESTIONS, 1)); startSession('daily', 'Daily 10', shuffle(items), { navKey: 'daily' }); };
  if (r === 'mock') $('#startMock').onclick = () => startSession('mock', 'Full mock', buildMock(), { navKey: 'mock', seconds: C.EXAM.minutes * 60 });
  if (r === 'mistakes') { if ($('#startWrong')) $('#startWrong').onclick = () => startSession('practice', 'Mistakes retry', sample(P('wrong') || [], 20), { navKey: 'mistakes' }); if ($('#clearWrong')) $('#clearWrong').onclick = () => { P('wrong', []); rerender(); }; }
  if (r === 'quiz') { quizWire(); startTimer(); }
}
function rerender(focusId) {
  const r = route(), y = scrollY;
  $('#main').innerHTML = viewFor(r); wire(r);
  if (focusId && document.getElementById(focusId)) document.getElementById(focusId).focus({ preventScroll: true });
  else if (!document.activeElement || document.activeElement === document.body) $('#main').focus({ preventScroll: true });
  window.scrollTo(0, y);
}
function render() {
  const r = route();
  if (r === 'quiz' && !session) { const s = P('session'); if (s && !s.done) session = s; }
  $('#main').innerHTML = viewFor(r); wire(r); updateNav(r); window.scrollTo(0, 0);
  if (r === 'quiz') focusFirstOpt();
  else if (document.activeElement === document.body) $('#main').focus({ preventScroll: true });
  if (!backing) J.remember({ app: 'ccp', title: 'CCP Credit Desk', sub: r === 'quiz' && session ? session.title : (TITLES[navKey(r)] || 'Dashboard'), url: location.href, scroll: 0 });
}

/* Back: reading pane → menu → dashboard → Jharokha home (never replays history) */
window.JharokhaPageBack = function () {
  const main = $('#main'), nav = $('#nav'), navShown = nav.getBoundingClientRect().right > 0, a = document.activeElement, r = route();
  if (r !== 'home') J.remember({ app: 'ccp', title: 'CCP Credit Desk', sub: r === 'quiz' && session ? session.title : (TITLES[navKey(r)] || ''), url: location.href, scroll: Math.round(scrollY) });
  backing = true; save();
  if (navShown && a && main.contains(a)) { const cur = nav.querySelector('a.on') || nav.querySelector('a'); cur.focus({ preventScroll: true }); cur.scrollIntoView({ block: 'nearest' }); return true; }
  if (r !== 'home') { history.replaceState(null, '', '#home'); render(); const h = nav.querySelector('a[data-id="home"]'); if (h && navShown) h.focus({ preventScroll: true }); return true; }
  J.home(); return true;
};

buildNav();
window.addEventListener('hashchange', () => { backing = false; render(); });
(function first() {
  const rec = J.recentFor('ccp'), resume = rec && rec.url === location.href && rec.scroll > 0 ? rec.scroll : 0;
  render(); if (resume) setTimeout(() => window.scrollTo(0, resume), 60);
})();
})();
