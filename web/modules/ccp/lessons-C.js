/* CCP lessons — Module C: Working Capital Management */
window.CCP = window.CCP || {}; CCP.LESSONS = CCP.LESSONS || [];
CCP.LESSONS.push(

{id:'C1', m:'C', t:'What working capital is — the operating cycle', mins:11, lab:'lab-wc', cards:['c-wc','c-cycle','c-inadequate'],
body:`
<div class="why"><b>Why it matters</b>A machine is bought once. But every month a factory must buy yarn, pay wages, hold cloth, and wait for buyers to pay. The money locked in that loop is <b>working capital</b> — and financing it is the most common loan a branch makes.</div>

<h3>The loop</h3>
<div class="viz"><div class="cycle">
<span>Cash</span><i>→ buy</i><span>Raw material</span><i>→ process</i><span>Work-in-progress</span><i>→ finish</i><span>Finished goods</span><i>→ sell on credit</i><span>Receivables</span><i>→ collect</i><span>Cash</span>
</div><p class="small">Suppliers' credit (creditors) shortens the time your own money is stuck.</p></div>

<h3>Measuring the cycle in days</h3>
<table><tr><th>Stage</th><th>Formula (× 365)</th></tr>
<tr><td>Raw material storage</td><td>Average RM stock ÷ RM consumed</td></tr>
<tr><td>Work-in-progress</td><td>Average WIP ÷ cost of production</td></tr>
<tr><td>Finished goods storage</td><td>Average FG ÷ cost of sales</td></tr>
<tr><td>Receivables (debtors)</td><td>Average debtors ÷ sales</td></tr>
<tr><td>Less: creditors</td><td>Average creditors ÷ purchases</td></tr></table>
<p><b>Net operating cycle = RM + WIP + FG + debtors − creditors.</b> Longer cycle → more money tied up → bigger WC need.</p>

<div class="eg"><b>Worked example — Mewar Fabrics</b>
RM 30 days + WIP 10 + FG 20 + debtors 45 − creditors 30 = <b>75 days</b>.<br>
Annual cost of sales ₹3.65 crore → ₹1 lakh/day → money tied up ≈ 75 × ₹1 lakh = <b>₹75 lakh</b>.<br>
If debtors slip to 60 days, the cycle is 90 days and the need jumps to ₹90 lakh — without any growth in sales.</div>

<h3>Three terms you must not mix up</h3>
<table><tr><th>Term</th><th>Formula</th><th>Meaning</th></tr>
<tr><td><b>Gross working capital</b></td><td>Total current assets</td><td>All money in the loop</td></tr>
<tr><td><b>Net working capital</b></td><td>CA − CL</td><td>Portion funded by long-term money (owner's margin)</td></tr>
<tr><td><b>Working capital gap</b></td><td>CA − CL <i>other than bank borrowings</i></td><td>What remains after suppliers' credit — the gap banks help fill</td></tr></table>

<div class="think"><b>Pause & think:</b> CA ₹120 lakh; creditors ₹30 lakh; bank CC ₹60 lakh. What are gross WC, WC gap and NWC?
<details><summary>See answer</summary>Gross WC = 120. WC gap = 120 − 30 = <b>90</b> (bank borrowings excluded). NWC = 120 − (30 + 60) = <b>30</b>.</details></div>

<h3>Too little vs too much</h3>
<p><b>Too little</b>: stock-outs, stalled production, delayed payments, lost discounts. <b>Too much</b>: idle money, lower returns, and the risk that the surplus is diverted elsewhere. Banks fund the <i>need</i>, not the maximum the borrower wants.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>WC gap excludes bank borrowings from current liabilities.</li>
<li>Operating cycle components and formulas are frequent numericals.</li>
</ul></div>`,
check:[
 {q:'RM 20, WIP 10, FG 15, debtors 40, creditors 25 days. Net operating cycle:',o:['60 days','85 days','110 days','45 days'],a:0,e:'20+10+15+40−25 = 60 days.'},
 {q:'Working capital gap is:',o:['CA − CL','CA − CL excluding bank borrowings','Total assets − net worth','CA only'],a:1,e:'Bank borrowings are left out — the gap is what banks may finance.'}
]},

{id:'C2', m:'C', t:'The turnover method (Nayak Committee)', mins:9, lab:'lab-wc', cards:['c-nayak'],
body:`
<div class="why"><b>Why it matters</b>Small borrowers can't produce detailed projections of every stock and debtor. The Nayak Committee (1992) gave a simple rule based on sales — still the standard for small MSE limits.</div>

<h3>The rule</h3>
<p>Assume a typical operating cycle of about <b>3 months</b>. Then working capital needed ≈ <b>25%</b> of annual turnover. Split it:</p>
<div class="viz"><div class="split"><span style="flex:4"><b>20% bank finance</b></span><span style="flex:1"><b>5%</b> borrower</span></div><p class="small">25% of projected turnover = WC requirement</p></div>
<p>RBI applies it to MSE borrowers with fund-based WC limits up to <b>₹5 crore</b>. If the borrower already has more than 5% of turnover as NWC, the bank finances only what's left: <b>bank finance = lower of 20% of turnover and (25% of turnover − available NWC)</b>.</p>

<div class="eg"><b>Worked example 1</b> Projected turnover ₹4 crore; available NWC ₹15 lakh.<br>
Requirement = 25% × 400 = 100 lakh.<br>
Option A: 20% × 400 = <b>80 lakh</b>. Option B: 100 − 15 = 85 lakh.<br>
Bank finance = lower = <b>₹80 lakh</b>. The borrower's 5% (₹20 lakh) is covered by his NWC of 15 — he must bring ₹5 lakh more, or the bank adjusts.</div>
<div class="eg"><b>Worked example 2</b> Turnover ₹2 crore; NWC ₹30 lakh (15%).<br>
Requirement 50 lakh; 20% = 40; 25% − NWC = 50 − 30 = <b>20</b>. Bank finance = <b>₹20 lakh</b>. The borrower already funds most of his own cycle.</div>

<h3>Checks before you apply it</h3>
<ul><li>Is the projected turnover realistic? (past trend, orders, capacity, GST returns)</li>
<li>Is the business cycle really ~3 months? Very long cycles (e.g., jewellery) need other methods.</li>
<li>Margin: borrower's 5% must come from <b>long-term</b> sources.</li></ul>

<p>Try it: the <b>Working Capital Lab</b> shows Nayak next to the MPBF methods — change NWC and watch which limit binds.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>25% need · 20% bank · 5% borrower.</li>
<li>MSE limits up to ₹5 crore.</li>
<li>Numerical trap: forgetting the "25% − NWC" check.</li>
</ul></div>`,
check:[
 {q:'Turnover ₹500 lakh, NWC ₹40 lakh. Bank finance under turnover method:',o:['₹85 lakh','₹100 lakh','₹125 lakh','₹25 lakh'],a:0,e:'20% = 100; 25% − NWC = 125 − 40 = 85; lower = ₹85 lakh.'},
 {q:'The borrower’s minimum contribution under the turnover method is:',o:['5% of turnover','20% of turnover','25% of current assets','10% of turnover'],a:0,e:'5% of turnover from long-term sources.'}
]},

{id:'C3', m:'C', t:'MPBF — the Tandon Committee’s three methods', mins:13, lab:'lab-wc', cards:['c-mpbf','b-liquidity'],
body:`
<div class="why"><b>Why it matters</b>In the 1970s, borrowers financed almost everything with bank money. The Tandon Committee (1975) said: banks should fill only the <i>gap</i>, and the borrower must put in a share from long-term funds. That share is the heart of MPBF — Maximum Permissible Bank Finance.</div>

<h3>Notation</h3>
<p><b>CA</b> = current assets · <b>OCL</b> = other current liabilities (creditors etc., <i>excluding</i> bank borrowings) · <b>WCG</b> = CA − OCL · <b>Core CA</b> = the permanent minimum level of current assets.</p>

<h3>The three methods</h3>
<table><tr><th>Method</th><th>Borrower funds</th><th>MPBF</th></tr>
<tr><td><b>I</b></td><td>25% of the <b>WC gap</b></td><td>0.75 × (CA − OCL)</td></tr>
<tr><td><b>II</b></td><td>25% of <b>total current assets</b></td><td>0.75 × CA − OCL</td></tr>
<tr><td><b>III</b></td><td>Core CA fully + 25% of the rest</td><td>0.75 × (CA − Core CA) − OCL</td></tr></table>
<p>Each method asks more of the borrower, so MPBF falls from I to III. The <b>Chore Committee (1979)</b> made Method II the norm.</p>

<div class="eg"><b>Worked example (₹ lakh)</b> CA 120 · OCL 30 · Core CA 20.<br>
WCG = 90.<br>
<b>Method I</b>: 0.75 × 90 = <b>67.5</b> (borrower 22.5)<br>
<b>Method II</b>: 0.75 × 120 − 30 = 90 − 30 = <b>60</b> (borrower 30 = 25% of CA)<br>
<b>Method III</b>: 0.75 × (120 − 20) − 30 = 75 − 30 = <b>45</b> (borrower 20 core + 25 = 45)</div>

<h3>Why Method II gives a current ratio of 1.33</h3>
<p>Under Method II, CL = OCL + MPBF = OCL + 0.75 CA − OCL = 0.75 CA. So CA ÷ CL = 1 ÷ 0.75 = <b>1.33</b> — the famous Tandon minimum.</p>

<div class="think"><b>Pause & think:</b> Under Method II, if OCL rises (more supplier credit) while CA stays the same, what happens to MPBF?
<details><summary>See answer</summary>MPBF falls rupee for rupee. Supplier credit replaces bank credit — which is exactly the idea: banks fill only what's left.</details></div>

<h3>When the borrower's actual NWC is lower</h3>
<p>If actual NWC is less than the required 25%, the shortfall is a <b>"WC margin gap"</b>: the bank can only lend MPBF minus the shortfall, or ask the borrower to bring long-term funds (or allow a temporary excess with a plan to cure it).</p>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled: "Method II under MPBF" and the 1.33 current ratio.</li>
<li>OCL always excludes bank borrowings.</li>
<li>MPBF is computed in CMA <b>Form V</b>.</li>
</ul></div>`,
check:[
 {q:'CA ₹200 lakh, OCL ₹50 lakh. MPBF under Method II:',o:['₹112.5 lakh','₹100 lakh','₹150 lakh','₹75 lakh'],a:1,e:'0.75 × 200 − 50 = 150 − 50 = ₹100 lakh.'},
 {q:'Same data: MPBF under Method I:',o:['₹112.5 lakh','₹100 lakh','₹150 lakh','₹37.5 lakh'],a:0,e:'0.75 × (200 − 50) = ₹112.5 lakh.'},
 {q:'Which method requires the borrower to fund core current assets fully?',o:['Method I','Method II','Method III','Turnover method'],a:2,e:'Method III.'}
]},

{id:'C4', m:'C', t:'Cash budget, services firms and CMA data', mins:9, cards:['c-cashbudget','c-it','c-cma'],
body:`
<div class="why"><b>Why it matters</b>A sugar mill buys cane for five months and sells sugar all year. A software firm has no stock at all. One formula doesn't fit everyone.</div>

<h3>Cash budget method</h3>
<p>Project month-by-month cash inflows and outflows. The bank finances the <b>peak deficit</b>, with drawings and repayments following the budget.</p>
<div class="eg"><b>Worked example (₹ lakh)</b>
<table><tr><th>Month</th><th>Inflow</th><th>Outflow</th><th>Net</th><th>Cumulative</th></tr>
<tr><td>Oct</td><td>20</td><td>60</td><td>−40</td><td>−40</td></tr>
<tr><td>Nov</td><td>30</td><td>70</td><td>−40</td><td>−80</td></tr>
<tr><td>Dec</td><td>50</td><td>60</td><td>−10</td><td><b>−90</b></td></tr>
<tr><td>Jan</td><td>90</td><td>40</td><td>+50</td><td>−40</td></tr>
<tr><td>Feb</td><td>80</td><td>30</td><td>+50</td><td>+10</td></tr></table>
Peak deficit = ₹90 lakh in December → seasonal limit around ₹90 lakh (less promoter margin), reducing from January.</div>
<p>Suits: seasonal industries (sugar, tea, cotton ginning), construction contractors, and services with lumpy collections.</p>

<h3>Services, IT and software</h3>
<p>Inventory is negligible; money is tied up in <b>receivables</b> and unbilled work. Banks assess on projected turnover/receivable cycle or cash budgets, secure limits on receivables, and take promoters' margin — classic stock-based MPBF doesn't fit.</p>

<h3>CMA data — the standard format</h3>
<table><tr><th>Form</th><th>Content</th></tr>
<tr><td>I</td><td>Particulars of existing & proposed limits</td></tr>
<tr><td>II</td><td>Operating statement (past, current, projected)</td></tr>
<tr><td>III</td><td>Analysis of balance sheet</td></tr>
<tr><td>IV</td><td>Comparative statement of current assets & current liabilities</td></tr>
<tr><td>V</td><td><b>Computation of MPBF</b></td></tr>
<tr><td>VI</td><td>Fund-flow statement</td></tr></table>

<div class="examc"><b>Exam corner</b><ul>
<li>Cash budget → seasonal & contract businesses; finance the peak deficit.</li>
<li>CMA Form V = MPBF; Form VI = fund flow.</li>
</ul></div>`,
check:[
 {q:'Cumulative cash position: −20, −55, −35, +10 (₹ lakh). Peak requirement:',o:['₹20 lakh','₹35 lakh','₹55 lakh','₹110 lakh'],a:2,e:'Largest cumulative deficit = ₹55 lakh.'},
 {q:'Comparative statement of current assets and liabilities is CMA form:',o:['II','III','IV','V'],a:2,e:'Form IV.'}
]},

{id:'C5', m:'C', t:'Drawing power, margins and keeping control', mins:9, lab:'lab-wc', cards:['c-dp','e-monitor'],
body:`
<div class="why"><b>Why it matters</b>A sanctioned limit of ₹70 lakh is a ceiling, not an entitlement. On any day, the borrower can draw only as much as the security actually supports — the <b>drawing power</b>.</div>

<h3>How DP works</h3>
<ol class="steps">
<li>Take stock value from the latest stock statement (at cost or market, whichever lower).</li>
<li>Remove <b>unpaid stock</b> — goods bought on credit (sundry creditors for purchases). The supplier, not the bank, financed them.</li>
<li>Apply the stock <b>margin</b> (e.g., 25%) — the borrower's stake and a cushion against price falls.</li>
<li>Take eligible receivables (only those not older than the allowed period, often 90 days), apply their margin (e.g., 40%).</li>
<li>DP = stock component + receivables component. <b>Drawings ≤ lower of DP and sanctioned limit.</b></li>
</ol>

<div class="eg"><b>Worked example (₹ lakh)</b>
Stock 80, unpaid creditors 20, margin 25% → (80 − 20) × 75% = <b>45</b>.<br>
Debtors under 90 days 50, margin 40% → 50 × 60% = <b>30</b>.<br>
DP = 75. Limit 70 → borrower can draw <b>₹70 lakh</b> (limit binds).<br>
If stock falls to 60: (60 − 20) × 75% = 30 → DP = 60 → only ₹60 lakh; any balance above 60 is an <b>irregularity</b>.</div>

<h3>Why it matters for NPA</h3>
<p>A CC account whose outstanding stays above the DP or limit for <b>90 days</b> continuously becomes "out of order" → NPA. Stock statements older than three months also make DP stale — RBI treats drawings on stale DP as irregular.</p>

<h3>Other controls</h3>
<ul><li>Monthly stock & book-debt statements; quarterly <b>QIS</b> for larger borrowers.</li>
<li>Periodic stock audits and unit inspections; insurance of stock with bank clause.</li>
<li>Routing of sales proceeds through the CC account — credits should match reported sales.</li></ul>

<div class="examc"><b>Exam corner</b><ul>
<li>Unpaid stock excluded; DP ≤ limit.</li>
<li>DP numericals with two margins are common.</li>
</ul></div>`,
check:[
 {q:'Stock 100, unpaid creditors 30, margin 25%; no debtors; limit 60 (₹ lakh). Drawable:',o:['₹52.5 lakh','₹60 lakh','₹75 lakh','₹70 lakh'],a:0,e:'(100 − 30) × 75% = 52.5 < limit 60 → ₹52.5 lakh.'},
 {q:'Why is unpaid stock excluded from DP?',o:['It is not insured','It is financed by suppliers — counting it would double-finance','It is always obsolete','RBI bans stock finance'],a:1,e:'Creditors already financed it.'}
]},

{id:'C6', m:'C', t:'LCs, guarantees, co-acceptance and commercial paper', mins:10, cards:['c-lclimit','c-bglimit','c-coaccept','c-cp','c-nfb'],
body:`
<div class="why"><b>Why it matters</b>Working capital isn't only cash. A borrower importing raw material needs LCs; a contractor needs guarantees. Sizing these limits properly is part of WC assessment.</div>

<h3>Sizing an import LC limit</h3>
<div class="viz"><div class="eq">LC limit = Monthly purchases under LC × (lead time + transit time + usance), in months</div></div>
<p>Lead time = from opening the LC to shipment; transit = shipment to arrival of documents; usance = credit period under the LC (zero for sight LCs). This many months of LCs will be outstanding at any time.</p>
<div class="eg"><b>Worked example</b> Imports under LC ₹6 crore a year → ₹50 lakh/month. Lead 1 month, transit 1, usance 2 → 4 months → <b>LC limit ₹2 crore</b>.</div>

<h3>Bank guarantee limits</h3>
<p>Based on the borrower's order book and tender pipeline, past BG utilisation, types needed (bid, performance, advance payment, retention, warranty) and claim history. Every BG must have a fixed amount and expiry; under <b>s.28 (Exception 3)</b> of the Contract Act the bank can set a claim period of <b>not less than one year</b> from the specified event.</p>

<h3>Co-acceptance</h3>
<p>The bank adds its name to a bill accepted by its customer (the buyer), guaranteeing payment on maturity — common for machinery bought on deferred payment. Only for <b>genuine trade</b>, within limits; never accommodation bills (bills with no real goods behind them).</p>

<h3>Commercial paper (CP)</h3>
<p>Strong companies can borrow short-term directly from investors by issuing CP: unsecured, issued at a discount, tenor <b>7 days to 1 year</b>, in denominations of <b>₹5 lakh</b>. It competes with bank WC finance — banks may invest in it.</p>

<h3>The 2025 rulebook</h3>
<p>RBI's <b>Non-Fund Based Credit Facilities Directions, 2025</b> (effective 1 April 2026) now consolidate rules for guarantees, LCs, co-acceptances and partial credit enhancement. The <b>BG & LC Masterclass</b> app in Jharokha goes deep on these.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>LC limit = monthly LC purchases × (lead + transit + usance).</li>
<li>BG claim period ≥ 1 year (s.28 Exc. 3).</li>
<li>CP: up to 1 year; ₹5 lakh multiples.</li>
</ul></div>`,
check:[
 {q:'Annual LC purchases ₹240 lakh; lead 1, transit 1, usance 0 months. LC limit:',o:['₹20 lakh','₹40 lakh','₹60 lakh','₹240 lakh'],a:1,e:'₹20 lakh/month × 2 months = ₹40 lakh.'},
 {q:'Co-acceptance is NOT permitted for:',o:['Purchase of machinery','Genuine supplies of goods','Accommodation bills','Customers within sanctioned limits'],a:2,e:'Accommodation bills have no underlying trade.'}
]}
);
