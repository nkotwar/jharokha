/* CCP lessons — Module B: Analysis of Financial Statements */
window.CCP = window.CCP || {}; CCP.LESSONS = CCP.LESSONS || [];
CCP.LESSONS.push(

{id:'B1', m:'B', t:'Reading a balance sheet like a banker', mins:12, lab:'lab-ratio', cards:['b-bs','b-tnw','b-reval','b-nwc'],
body:`
<div class="why"><b>Why it matters</b>A balance sheet is a photograph of a business on one date: what it owns, what it owes, and what belongs to the owners. A banker re-arranges that photograph to answer one question — <i>how safe is my money here?</i></div>

<h3>The one equation</h3>
<div class="viz"><div class="eq"><b>Assets</b> = <b>Liabilities to outsiders</b> + <b>Owners' funds (net worth)</b></div></div>
<p>Everything the business owns was paid for either by outsiders (banks, creditors) or by the owners. So if assets are ₹10 crore and outside liabilities are ₹7 crore, owners' stake is ₹3 crore.</p>

<h3>The banker's classification</h3>
<table><tr><th>Liabilities side</th><th>Assets side</th></tr>
<tr><td><b>Net worth</b>: capital + reserves & surplus</td><td><b>Fixed (non-current) assets</b>: land, building, machinery (net of depreciation)</td></tr>
<tr><td><b>Term liabilities</b>: term loans, debentures, long-term deposits (excluding instalments due within 12 months)</td><td><b>Non-current assets</b>: long-term investments, investments in group companies, long-term deposits, debtors over 6 months</td></tr>
<tr><td><b>Current liabilities</b>: bank WC borrowings, trade creditors, provisions, <b>term-loan instalments due within 12 months</b></td><td><b>Current assets</b>: cash, receivables (up to 6 months), inventories, advances to suppliers</td></tr>
<tr><td></td><td><b>Intangible & fictitious</b>: goodwill, patents; preliminary expenses, accumulated losses</td></tr></table>
<p>Two "banker" adjustments: (1) the next 12 months' term-loan instalments are moved into current liabilities; (2) intangible and fictitious assets are knocked off net worth because they can't repay a loan.</p>

<h3>Tangible Net Worth (TNW)</h3>
<div class="viz"><div class="eq">TNW = Capital + Reserves (excl. revaluation) − Intangibles − Fictitious assets</div></div>
<p><b>Revaluation reserve</b> is excluded because no real money came in — the asset was simply written up. Unsecured loans from promoters, if they agree to keep them in the business (subordinated), may be treated as <b>quasi-equity</b>.</p>

<div class="eg"><b>Worked example — Kumbhal Industries (₹ lakh)</b>
Capital 100 · General reserve 150 · Revaluation reserve 60 · Goodwill 20 · Preliminary expenses 10<br>
TNW = 100 + 150 − 20 − 10 = <b>220</b> (revaluation reserve 60 ignored).<br>
Term loan 200, of which 40 due within a year → Term liabilities = 160; current liabilities get +40.</div>

<h3>Net working capital — the borrower's own money in current assets</h3>
<p><b>NWC = Current assets − Current liabilities</b> = long-term sources − long-term uses. Positive NWC means some current assets are financed by long-term money — a safety cushion for the bank.</p>
<div class="think"><b>Pause & think:</b> Which of these change NWC? (a) Buying a machine for cash (b) Paying a creditor in cash (c) Raising a 5-year term loan (d) Revaluing land upward.
<details><summary>See answer</summary>(a) ↓ NWC (cash is current, machine isn't). (b) No change (both current). (c) ↑ NWC (long-term source, cash is current). (d) No change (both sides non-current) — a recalled exam question.</details></div>

<div class="examc"><b>Exam corner</b><ul>
<li>Revaluation reserve → excluded from TNW; doesn't change NWC.</li>
<li>Investments in group companies → non-current.</li>
<li>Instalments due within 12 months → current liabilities (bank view).</li>
</ul></div>`,
check:[
 {q:'Capital 50, reserves 70, revaluation reserve 30, intangibles 10 (₹ lakh). TNW = ?',o:['140','110','150','120'],a:1,e:'50 + 70 − 10 = 110 (revaluation excluded).'},
 {q:'Which transaction INCREASES net working capital?',o:['Paying creditors','Buying a vehicle for cash','Raising a term loan into the current account','Collecting receivables'],a:2,e:'Long-term source brought into a current asset raises NWC.'}
]},

{id:'B2', m:'B', t:'Profit vs cash: P&L, cash-flow and fund-flow', mins:10, cards:['b-cfs','b-opcycle-def','b-auditor'],
body:`
<div class="why"><b>Why it matters</b>Plenty of profitable businesses go bust — because profit is an accounting idea, but loans are repaid in cash. A banker always asks: <i>where is the cash?</i></div>

<h3>From sales to profit</h3>
<div class="viz"><div class="ladder2">
<span>Sales</span><span>− Cost of goods sold → <b>Gross profit</b></span><span>− Operating expenses → <b>EBITDA</b></span><span>− Depreciation → <b>EBIT</b></span><span>− Interest → <b>PBT</b></span><span>− Tax → <b>PAT</b></span>
</div></div>
<p><b>Depreciation</b> reduces profit but no cash goes out — that's why bankers add it back: <b>Cash accruals = PAT + depreciation</b>, the money available to repay term loans.</p>

<h3>Why profit ≠ cash</h3>
<ul><li>Credit sales: profit is booked, cash arrives later (receivables rise).</li>
<li>Stock build-up: cash spent, no expense booked yet.</li>
<li>Loan repayment: cash goes out, but it's not an expense.</li>
<li>Depreciation: expense booked, no cash goes out.</li></ul>

<h3>The cash-flow statement (AS-3 / Ind AS 7)</h3>
<table><tr><th>Part</th><th>Shows</th><th>Healthy sign</th></tr>
<tr><td><b>Operating</b></td><td>Cash from the core business</td><td>Positive and growing</td></tr>
<tr><td><b>Investing</b></td><td>Buying/selling fixed assets, investments</td><td>Usually negative for a growing firm</td></tr>
<tr><td><b>Financing</b></td><td>Loans raised/repaid, equity, dividends</td><td>Not permanently funding operating losses</td></tr></table>
<p><b>Non-cash transactions</b> are kept out: issue of bonus shares, converting debt into equity, buying assets by issuing shares, revaluation. A recalled question asks exactly which item is <i>not</i> part of a cash-flow statement.</p>

<h3>Fund-flow statement</h3>
<p>Older but still in CMA data (Form VI): it shows <b>long-term sources and uses</b> and therefore explains the change in NWC. If long-term uses (say, a new machine) exceed long-term sources, NWC shrinks — a warning that short-term money is funding long-term assets ("diversion").</p>

<h3>The operating cycle — official definition</h3>
<p>Schedule III of the Companies Act defines it as <i>the time between the acquisition of assets for processing and their realisation in cash or cash equivalents</i>; if not identifiable, it is taken as 12 months.</p>

<div class="eg"><b>Worked example — profitable but cash-starved</b>
PAT ₹40 lakh, depreciation ₹10 lakh → cash accruals ₹50 lakh.<br>
But receivables rose ₹45 lakh and stock rose ₹25 lakh; creditors rose ₹5 lakh.<br>
Cash from operations ≈ 50 − 45 − 25 + 5 = <b>−₹15 lakh</b>. Profit on paper, cash going out — the firm will lean on its CC limit. Ask why debtors are ballooning.</div>

<div class="examc"><b>Exam corner</b><ul>
<li>Bonus shares, debt-to-equity conversion → not in cash-flow statement.</li>
<li>Cash accruals = PAT + depreciation (+ other non-cash charges).</li>
<li>Auditor's notes: qualifications, going concern, contingent liabilities, related-party transactions.</li>
</ul></div>`,
check:[
 {q:'PAT ₹30 lakh, depreciation ₹12 lakh. Cash accruals:',o:['₹18 lakh','₹30 lakh','₹42 lakh','₹12 lakh'],a:2,e:'PAT + depreciation = ₹42 lakh.'},
 {q:'Which appears in the financing section of a cash-flow statement?',o:['Purchase of machinery','Repayment of term loan','Collection from debtors','Payment of wages'],a:1,e:'Loans raised/repaid, equity, dividends are financing.'}
]},

{id:'B3', m:'B', t:'Ratios I — liquidity and leverage', mins:12, lab:'lab-ratio', cards:['b-liquidity','b-leverage'],
body:`
<div class="why"><b>Why it matters</b>Ratios turn a page of numbers into a few signals. Liquidity ratios ask "can it pay what falls due soon?"; leverage ratios ask "how much is borrowed versus owned?"</div>

<h3>Liquidity</h3>
<table><tr><th>Ratio</th><th>Formula</th><th>Benchmark</th><th>Meaning</th></tr>
<tr><td><b>Current ratio</b></td><td>CA ÷ CL</td><td>Tandon minimum <b>1.33</b> (textbook 2)</td><td>₹ of current assets for every ₹1 due within a year</td></tr>
<tr><td><b>Quick (acid-test) ratio</b></td><td>(CA − inventory) ÷ CL</td><td>≈ 1</td><td>Can it pay without selling stock?</td></tr></table>
<p>Why 1.33? Under MPBF Method II the borrower funds 25% of current assets from long-term sources; the remaining 75% can be current liabilities → CA/CL = 100/75 = <b>1.33</b>.</p>

<h3>Leverage (solvency)</h3>
<table><tr><th>Ratio</th><th>Formula</th><th>Common comfort</th></tr>
<tr><td><b>Debt-equity (DER)</b></td><td>Long-term debt ÷ TNW</td><td>≤ 2 : 1 (varies by sector)</td></tr>
<tr><td><b>TOL/TNW</b></td><td>Total outside liabilities ÷ TNW</td><td>≤ 3 : 1 (some banks 4)</td></tr></table>
<p>DER is used for term-loan appraisal; TOL/TNW for overall leverage including current liabilities. The higher they go, the less "skin in the game" the owners have, and the more a small fall in profits hurts lenders.</p>

<div class="eg"><b>Worked example — Aravalli Pipes (₹ lakh)</b>
Current assets 440 (inventory 220) · Current liabilities 320 · Term loans 250 · TNW 280.<br>
Current ratio = 440/320 = <b>1.38</b> ✔ above 1.33.<br>
Quick ratio = (440−220)/320 = <b>0.69</b> ⚠ — depends heavily on selling stock.<br>
DER = 250/280 = <b>0.89</b> ✔ comfortable.<br>
TOL/TNW = (250+320)/280 = <b>2.04</b> ✔.<br>
Verdict: solvent, but watch inventory — slow-moving stock would hurt liquidity.</div>

<div class="think"><b>Pause & think:</b> A company repays ₹50 lakh of creditors using its cash. CA 300, CL 200 before. What happens to the current ratio?
<details><summary>See answer</summary>After: CA 250, CL 150 → CR rises from 1.50 to <b>1.67</b>. When CR is above 1, paying off current liabilities with current assets <i>increases</i> the ratio (a classic window-dressing trick before balance-sheet date).</details></div>

<p>Try it: open the <b>Ratio Lab</b> and push inventory up — watch the quick ratio fall while the current ratio rises.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>Tandon minimum current ratio = <b>1.33</b> (recalled question).</li>
<li>DER uses long-term debt; TOL uses all outside liabilities.</li>
<li>Paying CL from CA raises CR when CR &gt; 1.</li>
</ul></div>`,
check:[
 {q:'CA ₹600 lakh, CL ₹450 lakh. Current ratio:',o:['0.75','1.33','1.50','2.00'],a:1,e:'600/450 = 1.33.'},
 {q:'Term debt ₹300 lakh, TNW ₹200 lakh. DER:',o:['0.67','1.0','1.5','2.5'],a:2,e:'300/200 = 1.5 : 1.'},
 {q:'Quick ratio excludes:',o:['Cash','Receivables','Inventory','Bank borrowings'],a:2,e:'Inventory is the least liquid current asset.'}
]},

{id:'B4', m:'B', t:'Ratios II — coverage, efficiency and profitability', mins:12, lab:'lab-ratio', cards:['b-coverage','b-activity','b-profit'],
body:`
<div class="why"><b>Why it matters</b>A term loan is repaid over years from profits. Coverage ratios ask "is there enough cash each year to pay the EMI?"; efficiency ratios reveal whether stock and receivables are being managed or are piling up.</div>

<h3>Coverage</h3>
<div class="viz"><div class="eq">DSCR = (PAT + Depreciation + Interest on TL) ÷ (TL instalment + Interest on TL)</div></div>
<p>The numerator is the cash available to serve the term loan (interest is added back because it's paid out of the same pot); the denominator is what the term loan demands that year. <b>Average DSCR 1.5–2.0</b> is comfortable; a year below ~1.2 is a red flag; below 1 means the firm cannot pay from its own operations.</p>
<p><b>ISCR = EBIT ÷ Interest</b> — how many times profits cover interest. <b>FACR = Net fixed assets ÷ Long-term debt</b> — security cover from fixed assets (comfort ≥ 1.5).</p>

<div class="eg"><b>Worked example — DSCR for a 5-year loan (₹ lakh)</b>
<table><tr><th>Year</th><th>PAT</th><th>Dep</th><th>Int</th><th>Instalment</th><th>DSCR</th></tr>
<tr><td>1</td><td>30</td><td>20</td><td>18</td><td>40</td><td>(30+20+18)/(40+18) = <b>1.17</b></td></tr>
<tr><td>2</td><td>40</td><td>18</td><td>14</td><td>40</td><td>72/54 = <b>1.33</b></td></tr>
<tr><td>3</td><td>48</td><td>16</td><td>10</td><td>40</td><td>74/50 = <b>1.48</b></td></tr></table>
Year 1 is thin (1.17). Fix: a moratorium of 6–12 months, or lower instalments early ("ballooning") so DSCR stays above ~1.25.</div>

<h3>Efficiency (activity) ratios</h3>
<table><tr><th>Ratio</th><th>Formula</th><th>Reads</th></tr>
<tr><td>Inventory turnover</td><td>COGS ÷ average inventory</td><td>Times stock is sold and replaced in a year</td></tr>
<tr><td>Inventory holding (days)</td><td>Average inventory ÷ COGS × 365</td><td>Days stock sits</td></tr>
<tr><td>Debtors collection (days)</td><td>Average debtors ÷ credit sales × 365</td><td>Days to collect</td></tr>
<tr><td>Creditors payment (days)</td><td>Average creditors ÷ purchases × 365</td><td>Days of supplier credit used</td></tr></table>
<p>Rising stock days or debtor days with flat sales → slow-moving stock or bad debts. Rising creditor days → the firm is stretching suppliers — useful credit, but if it keeps stretching, cash is short.</p>

<h3>Profitability</h3>
<p>Gross margin, EBITDA margin, net margin (PAT/sales), <b>ROCE</b> (EBIT ÷ capital employed) and ROE (PAT ÷ net worth). ROCE below the interest rate means borrowing destroys value.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>DSCR formula — add back depreciation and interest; interest in both numerator and denominator.</li>
<li>Inventory turnover uses COGS (recalled question); creditors turnover in days (recalled).</li>
</ul></div>`,
check:[
 {q:'PAT 60, depreciation 20, interest on TL 20, instalment 50 (₹ lakh). DSCR:',o:['1.14','1.43','1.60','2.00'],a:1,e:'(60+20+20)/(50+20) = 100/70 = 1.43.'},
 {q:'COGS ₹730 lakh, average inventory ₹73 lakh. Holding period:',o:['10 days','36.5 days','73 days','100 days'],a:1,e:'Turnover 10 times; 365/10 = 36.5 days.'}
]},

{id:'B5', m:'B', t:'Project appraisal — financing a new venture', mins:13, lab:'lab-project', cards:['b-project','b-cop','b-bep'],
body:`
<div class="why"><b>Why it matters</b>For a new project there is no past balance sheet to read. The banker must judge a future — will this plant get built on time and budget, sell its output, and earn enough to repay?</div>

<h3>Six lenses of appraisal</h3>
<table><tr><th>Lens</th><th>Key questions</th></tr>
<tr><td><b>Technical</b></td><td>Location, technology, capacity, raw materials, power, water, waste, implementation schedule</td></tr>
<tr><td><b>Commercial / market</b></td><td>Demand-supply gap, price, competition, marketing tie-ups</td></tr>
<tr><td><b>Managerial</b></td><td>Promoters' experience, integrity, team</td></tr>
<tr><td><b>Financial</b></td><td>Cost of project, means of finance, profitability, DSCR, BEP, sensitivity</td></tr>
<tr><td><b>Economic</b></td><td>Benefit to society, employment, foreign exchange</td></tr>
<tr><td><b>Environmental</b></td><td>Pollution clearances, compliance</td></tr></table>

<h3>Cost of project and means of finance</h3>
<div class="viz"><div class="twocol"><div><b>Cost of project</b><br>Land & site development<br>Building<br>Plant & machinery<br>Misc. fixed assets<br>Preliminary & pre-operative expenses (incl. interest during construction)<br>Contingencies<br><b>Margin money for working capital</b></div><div><b>Means of finance</b><br>Promoters' equity<br>Internal accruals<br>Term loan<br>Unsecured loans (quasi-equity)<br>Subsidy / grants</div></div></div>
<p>Margin money for WC is part of project cost because the borrower's 25% (or 5% of turnover) share of working capital must come from long-term funds.</p>

<h3>Break-even and sensitivity</h3>
<p><b>BEP (units) = Fixed costs ÷ (price − variable cost per unit)</b>. Express it as % of installed capacity: below ~50–60% is comfortable. <b>Cash BEP</b> excludes depreciation. <b>Sensitivity</b>: reduce price or capacity by 5–10%, raise costs by 5–10%, and recheck DSCR — if it collapses, the project is fragile.</p>

<div class="eg"><b>Worked example — Aravalli Solar EPC (₹ lakh)</b>
Cost: land & building 150, machinery 600, pre-operative 50, contingency 50, WC margin 50, other 100 → <b>1,000</b>.<br>
Means: promoters 350, term loan 650 → DER 650/350 = <b>1.86</b>; promoter share 35%.<br>
Fixed costs 120/year, price ₹5,000/kW installed, variable cost ₹3,000/kW → contribution ₹2,000/kW → BEP = 1,20,00,000 / 2,000 = <b>6,000 kW</b>; capacity 15,000 kW → <b>40%</b> ✔.<br>
Sensitivity: price −10% → contribution ₹1,500 → BEP 8,000 kW = 53% — still acceptable.</div>

<div class="examc"><b>Exam corner</b><ul>
<li>Interest during construction and WC margin are part of project cost.</li>
<li>Recalled case study: project financing — DER, DSCR, BEP, payback.</li>
<li>Sensitivity = change one variable adversely.</li>
</ul></div>`,
check:[
 {q:'Fixed cost ₹30 lakh; price ₹600; variable cost ₹400 per unit. BEP:',o:['5,000 units','15,000 units','50,000 units','75,000 units'],a:1,e:'30,00,000 / 200 = 15,000 units.'},
 {q:'Margin money for working capital is shown under:',o:['Means of finance','Cost of project','Current liabilities','Contingent liabilities'],a:1,e:'It is a project cost item financed by long-term sources.'}
]},

{id:'B6', m:'B', t:'Capital budgeting — payback, NPV and IRR', mins:11, lab:'lab-project', cards:['b-capbud'],
body:`
<div class="why"><b>Why it matters</b>₹1 today is worth more than ₹1 in five years. Capital budgeting tells whether a project's future cash is worth more than the money it needs today.</div>

<h3>Time value of money in one line</h3>
<p>Present value of ₹X received after n years at rate r = <b>X ÷ (1+r)<sup>n</sup></b>. At 10%, ₹1.21 lakh after 2 years is worth ₹1 lakh today.</p>

<h3>Three methods</h3>
<table><tr><th>Method</th><th>How</th><th>Accept if</th><th>Strength / weakness</th></tr>
<tr><td><b>Payback</b></td><td>Years to recover the outlay from cash inflows</td><td>Within a target period</td><td>Simple, stresses liquidity and early recovery, reduces obsolescence risk; ignores time value and cash after payback</td></tr>
<tr><td><b>NPV</b></td><td>PV of inflows − outlay, at cost of capital</td><td>NPV &gt; 0</td><td>Measures value added in ₹; needs a discount rate</td></tr>
<tr><td><b>IRR</b></td><td>Rate at which NPV = 0</td><td>IRR &gt; cost of capital</td><td>Easy to compare as %; can mislead with unusual cash flows</td></tr></table>
<p>Also: <b>Profitability Index</b> = PV of inflows ÷ outlay (accept if &gt; 1).</p>

<div class="eg"><b>Worked example (₹ lakh)</b>
Outlay 100; inflows 40, 40, 40 for 3 years; cost of capital 10%.<br>
<b>Payback</b> = 100/40 = 2.5 years.<br>
<b>PV of inflows</b> = 40/1.1 + 40/1.21 + 40/1.331 = 36.36 + 33.06 + 30.05 = 99.47.<br>
<b>NPV</b> = 99.47 − 100 = <b>−0.53</b> → reject at 10% (just short).<br>
<b>IRR</b> ≈ 9.7% (where NPV = 0) — below 10%, consistent with NPV.</div>

<div class="think"><b>Pause & think:</b> Project P pays back in 2 years then stops; project Q pays back in 3 years but earns for 10. Which does payback prefer, and why is that dangerous?
<details><summary>See answer</summary>Payback prefers P (faster). But it ignores Q's later years, which may make Q far more valuable — use NPV/IRR alongside payback.</details></div>

<p>Try it: in the <b>Project Lab</b>, set inflow 40, life 3, cost of capital 10 — then change to 9% and watch NPV turn positive.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled: "advantages of payback period" → simplicity, liquidity focus, guards against obsolescence/risk.</li>
<li>NPV &gt; 0 accept; IRR is the rate making NPV zero.</li>
</ul></div>`,
check:[
 {q:'Outlay ₹60 lakh, equal inflows ₹15 lakh a year. Payback:',o:['2 years','4 years','6 years','15 years'],a:1,e:'60/15 = 4 years.'},
 {q:'If NPV at the cost of capital is negative, IRR is:',o:['Above cost of capital','Equal to cost of capital','Below cost of capital','Zero'],a:2,e:'Negative NPV means the project earns less than the cost of capital.'}
]}
);
