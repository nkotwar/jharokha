/* CCP lessons — Module E: Monitoring, Documentation & Management of Impaired Assets */
window.CCP = window.CCP || {}; CCP.LESSONS = CCP.LESSONS || [];
CCP.LESSONS.push(

{id:'E1', m:'E', t:'Loan documentation — making the promise enforceable', mins:12, cards:['e-docs','e-stamp','e-reg','e-limitation','e-death'],
body:`
<div class="why"><b>Why it matters</b>If a borrower defaults, the bank's only weapon is its documents. A missing signature, wrong stamp or expired limitation can turn a secured loan into an unrecoverable one.</div>

<h3>What documents do</h3>
<ol class="steps"><li><b>Evidence</b> the debt and its terms.</li><li><b>Create the charge</b> on security (hypothecation, pledge, mortgage).</li><li>Make the claim <b>legally enforceable</b> in court/DRT/SARFAESI.</li><li><b>Keep it alive</b> within the limitation period (acknowledgements).</li></ol>
<p>Typical set: demand promissory note (DP note), loan agreement, hypothecation deed, guarantee deed, mortgage documents, letters of continuity / revival.</p>

<h3>Four checks for every document</h3>
<table><tr><th>Check</th><th>What can go wrong</th></tr>
<tr><td><b>Right executant</b></td><td>Person lacks capacity or authority (Lesson A3)</td></tr>
<tr><td><b>Stamping</b></td><td>Under-stamped document is inadmissible in evidence. Most can be cured by paying deficit + penalty (up to 10×) — but <b>promissory notes and bills of exchange cannot be validated later</b>.</td></tr>
<tr><td><b>Execution</b></td><td>Blanks filled after signing, missing dates, alterations not authenticated</td></tr>
<tr><td><b>Registration</b></td><td>Documents creating interest in immovable property ≥ ₹100 (e.g., registered mortgage deed) must be registered within <b>4 months</b>; plus ROC (companies) and CERSAI filings within 30 days</td></tr></table>

<h3>Limitation — the clock on your rights</h3>
<table><tr><th>Claim</th><th>Period (Limitation Act 1963)</th></tr>
<tr><td>Suit on loan / DP note</td><td><b>3 years</b> from date of loan/document</td></tr>
<tr><td>Guarantee</td><td>3 years from when the right to sue accrues (demand/default)</td></tr>
<tr><td>Enforcing a mortgage</td><td><b>12 years</b></td></tr>
<tr><td>Executing a decree</td><td><b>12 years</b></td></tr></table>
<p>A <b>written, signed acknowledgement</b> (s.18) or <b>part-payment</b> (s.19) <i>before</i> the period ends starts a fresh period. After it ends, nothing revives it.</p>

<div class="eg"><b>Worked example — the limitation diary</b>
DP note executed 10 Jan 2024 → limitation ends 9 Jan 2027.<br>
Borrower signs balance confirmation on 5 Dec 2026 → fresh 3 years from 5 Dec 2026, to 4 Dec 2029.<br>
If the bank forgets and gets the confirmation on 15 Jan 2027 — too late; the debt is time-barred for suit.</div>

<h3>Death of a borrower or guarantor</h3>
<p>Stop operations, compute dues, and claim from the legal heirs — but only up to the estate they inherited. A continuing guarantee is revoked for <b>future</b> transactions on the guarantor's death (s.131 Contract Act), unless the deed says otherwise.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled: "purposes served by documentation".</li>
<li>Unstamped DP note = fatal (can't be validated).</li>
<li>3 years (loan) vs 12 years (mortgage/decree).</li>
</ul></div>`,
check:[
 {q:'Loan document dated 1 March 2023; acknowledgement obtained 20 Feb 2026. Limitation now runs till:',o:['28 Feb 2026','19 Feb 2029','1 March 2029','It has already expired'],a:1,e:'Acknowledgement before expiry restarts the 3 years from 20 Feb 2026.'},
 {q:'Which under-stamped document cannot be admitted even on paying penalty?',o:['Hypothecation deed','Guarantee deed','Promissory note','Loan agreement'],a:2,e:'Bills of exchange and promissory notes cannot be validated later.'}
]},

{id:'E2', m:'E', t:'Securing the loan — lien, pledge, hypothecation, mortgage', mins:12, cards:['e-charges','e-pledge','e-mortgage','d-cersai'],
body:`
<div class="why"><b>Why it matters</b>Security is the bank's second way out. Each type gives different control — and the strongest form isn't always the most practical.</div>

<h3>Charges at a glance</h3>
<table><tr><th>Charge</th><th>Asset</th><th>Who holds it</th><th>Bank's remedy</th></tr>
<tr><td><b>Lien</b></td><td>Goods/securities in bank's hands</td><td>Bank</td><td>Retain till dues paid; banker's general lien (s.171) works like an implied pledge</td></tr>
<tr><td><b>Pledge</b></td><td>Movables (gold, goods, shares)</td><td>Bank (possession delivered)</td><td>Sue, or <b>sell after reasonable notice</b> (s.176)</td></tr>
<tr><td><b>Hypothecation</b></td><td>Movables (stock, machinery, vehicles)</td><td>Borrower</td><td>Take possession (contract/SARFAESI), then sell</td></tr>
<tr><td><b>Mortgage</b></td><td>Immovable property</td><td>Borrower (usually)</td><td>Sale via SARFAESI/court</td></tr>
<tr><td><b>Assignment</b></td><td>Actionable claims (book debts, LIC policies)</td><td>—</td><td>Collect directly from the debtor/insurer (s.130 TPA)</td></tr></table>
<p><b>Set-off</b>: combine a customer's credit and debit balances held in the <i>same right and capacity</i> once debts are due. <b>Negative lien</b>: a borrower's undertaking not to charge an asset to anyone else (no security interest for the bank).</p>

<h3>Types of mortgage (s.58 Transfer of Property Act)</h3>
<p>Simple · by conditional sale · usufructuary · English · <b>by deposit of title deeds (equitable)</b> · anomalous. Banks mostly use:</p>
<ul><li><b>Equitable mortgage</b> — deposit original title deeds with intent to create security; quick and cheap; no registration normally needed; allowed only in <b>notified towns</b>.</li>
<li><b>Registered (simple/English) mortgage</b> — deed executed and registered; used where equitable mortgage isn't possible.</li></ul>

<div class="think"><b>Pause & think:</b> Why do banks hypothecate stock rather than pledge it?
<details><summary>See answer</summary>A business needs to use and sell its stock daily. Pledge would lock it in the bank's godown. Hypothecation lets the borrower use it while the bank controls value through stock statements, DP and inspections.</details></div>

<h3>Perfecting the security</h3>
<p>Register with <b>CERSAI</b> within 30 days (all security interests); companies also register charges with the <b>ROC</b> within 30 days; insure the asset with a bank clause; keep valuations current.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>Pledge = possession with bank; hypothecation = with borrower.</li>
<li>Set-off only in the same right and capacity.</li>
<li>Equitable mortgage only in notified towns.</li>
</ul></div>`,
check:[
 {q:'Gold ornaments delivered to the bank as security create a:',o:['Hypothecation','Pledge','Mortgage','Negative lien'],a:1,e:'Possession with the bank → pledge.'},
 {q:'A customer’s personal SB credit balance can be set off against:',o:['His firm’s overdraft','His personal overdue loan','A trust account he manages','His wife’s loan'],a:1,e:'Same right and capacity only.'}
]},

{id:'E3', m:'E', t:'Monitoring and early warning', mins:10, cards:['e-monitor','e-sma','a-crilc'],
body:`
<div class="why"><b>Why it matters</b>Accounts rarely fail overnight. There are signs months before — returned cheques, rising stock, delayed statements. Spotting them early is far cheaper than recovering later.</div>

<h3>Tools of follow-up</h3>
<ul><li><b>Stock & book-debt statements</b> (monthly) → drawing power.</li>
<li><b>QIS</b> for larger WC borrowers: Form I (estimates for next quarter), Form II (actuals for the quarter), Form III (half-yearly operating statement & funds flow).</li>
<li><b>Stock audits</b> and <b>unit inspections</b>; insurance checks.</li>
<li><b>Account conduct</b>: credit summations vs reported sales, cheque returns, persistent overdrawings, frequent ad-hoc requests.</li>
<li>Annual <b>review/renewal</b> with fresh financials and rating.</li></ul>

<h3>Early warning signals (EWS)</h3>
<p>Delays in submitting statements · sales routed elsewhere · rising debtors and stock with flat sales · frequent changes in auditors or management · diversion to group companies · default to other lenders (see CRILC) · large unexplained cash withdrawals. Serious EWS can lead to the account being <b>red-flagged</b> for possible fraud investigation.</p>

<h3>SMA — the stages before NPA</h3>
<div class="viz"><div class="tl"><span>Regular</span><span>SMA-0<br>1–30 days</span><span>SMA-1<br>31–60</span><span>SMA-2<br>61–90</span><span class="now">NPA<br>&gt; 90</span></div></div>
<p>For CC/OD, the days count from when the account went "out of order". SMA accounts are still <b>standard</b>, but are reported to CRILC (₹5 crore+) and trigger a resolution review under RBI's 2019 framework.</p>

<div class="eg"><b>Worked example</b> EMI due 1 March, unpaid. 15 March → SMA-0. 10 April (40 days) → SMA-1. 15 May (75 days) → SMA-2. 31 May (91 days) → <b>NPA</b>.</div>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled: "QIS returns".</li>
<li>SMA buckets 0/1/2 = 1–30 / 31–60 / 61–90.</li>
</ul></div>`,
check:[
 {q:'An EMI is overdue for 52 days. Status:',o:['SMA-0','SMA-1','SMA-2','NPA'],a:1,e:'31–60 days = SMA-1 (still standard).'},
 {q:'QIS Form II contains:',o:['Next quarter estimates','Actual performance of the quarter','Audited balance sheet','Stock audit report'],a:1,e:'Form I estimates; Form II actuals; Form III half-yearly.'}
]},

{id:'E4', m:'E', t:'NPAs — classification, income recognition and provisioning', mins:14, lab:'lab-npa', cards:['e-npa','e-class','e-prov','e-upgrade','e-ecl'],
body:`
<div class="why"><b>Why it matters</b>When a loan stops paying, the bank must stop counting its interest as income and set aside provisions for possible loss. These rules (IRAC norms) decide the bank's real profit.</div>

<h3>When does an account become an NPA?</h3>
<ul><li><b>Term loan</b>: interest or instalment overdue &gt; <b>90 days</b>.</li>
<li><b>CC/OD</b>: "out of order" for 90 days — outstanding continuously above limit/DP, or no credits for 90 days, or credits not enough to cover interest debited.</li>
<li><b>Bills</b>: overdue &gt; 90 days. <b>Agriculture</b>: 2 crop seasons (short) / 1 crop season (long).</li></ul>
<p>Classification is <b>borrower-wise</b>: if one facility is NPA, all facilities of that borrower are NPA. It's done as part of the day-end process.</p>

<h3>Ageing</h3>
<div class="viz"><div class="tl"><span>Sub-standard<br>≤ 12 m as NPA</span><span>D1<br>≤ 1 yr doubtful</span><span>D2<br>1–3 yrs</span><span>D3<br>&gt; 3 yrs</span><span>Loss<br>identified</span></div></div>

<h3>Income recognition</h3>
<p>Interest on NPAs is booked only when actually received; interest booked earlier but not collected is <b>reversed</b>. An NPA is upgraded only when <b>all</b> arrears of interest and principal are paid.</p>

<h3>Provisioning (until ECL starts in April 2027)</h3>
<table><tr><th>Category</th><th>Provision</th></tr>
<tr><td>Standard</td><td>0.40% general · 0.25% agriculture & SME · 1% CRE · 0.75% CRE-RH · 2% teaser home loans</td></tr>
<tr><td>Sub-standard</td><td>15% of outstanding (25% if unsecured exposure)</td></tr>
<tr><td>Doubtful</td><td>Unsecured part 100% + secured part: D1 25% · D2 40% · D3 100%</td></tr>
<tr><td>Loss</td><td>100%</td></tr></table>
<p>The portion guaranteed by <b>CGTMSE/ECGC</b> needs no provision — RBI applies the cover to the unsecured part, then provides on the rest.</p>

<div class="eg"><b>Worked example 1 — doubtful</b> Outstanding ₹50 lakh; realisable security ₹30 lakh; NPA for 18 months (6 months in doubtful → D1).<br>
Secured ₹30 lakh × 25% = 7.5 · Unsecured ₹20 lakh × 100% = 20 → <b>Provision ₹27.5 lakh</b>.</div>
<div class="eg"><b>Worked example 2 — with CGTMSE</b> Outstanding ₹40 lakh; security ₹10 lakh; unsecured ₹30 lakh; CGTMSE guaranteed ₹18.75 lakh; D3.<br>
Secured 10 × 100% = 10 · Unsecured & uncovered (30 − 18.75) = 11.25 × 100% → <b>Provision ₹21.25 lakh</b> (nothing on the guaranteed ₹18.75 lakh).</div>
<div class="eg"><b>Worked example 3 — sub-standard</b> Outstanding ₹50 lakh; CGTMSE cover ₹5 lakh → 15% × 45 = <b>₹6.75 lakh</b>.</div>

<h3>What changes in 2027</h3>
<p>From <b>1 April 2027</b>, scheduled commercial banks move to <b>Expected Credit Loss</b>: Stage 1 (performing), Stage 2 (significant increase in credit risk), Stage 3 (credit-impaired), provisioning for expected — not just incurred — losses.</p>

<p>Try every scenario in the <b>NPA Time Machine</b>.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled: standard asset provision for SME = 0.25%.</li>
<li>D1/D2/D3 secured: 25/40/100; unsecured always 100%.</li>
<li>Upgrade only when entire arrears are paid.</li>
</ul></div>`,
check:[
 {q:'Outstanding ₹20 lakh, security ₹12 lakh, D2. Provision:',o:['₹4.8 lakh','₹12.8 lakh','₹8 lakh','₹20 lakh'],a:1,e:'Unsecured 8 × 100% + secured 12 × 40% = 8 + 4.8 = ₹12.8 lakh.'},
 {q:'Sub-standard account, outstanding ₹10 lakh, security ₹8 lakh. Provision:',o:['₹1.5 lakh','₹2.5 lakh','₹0.3 lakh','₹10 lakh'],a:0,e:'15% of outstanding = ₹1.5 lakh (security > 10%, so not an unsecured exposure).'},
 {q:'An NPA borrower pays all overdue interest but not the overdue principal. The account:',o:['Becomes standard','Remains NPA','Becomes SMA-2','Is written off'],a:1,e:'All arrears of interest AND principal must be paid.'}
]},

{id:'E5', m:'E', t:'Resolution, restructuring and wilful defaulters', mins:11, cards:['e-resolution','e-restructure','e-project','e-wilful','e-compromise'],
body:`
<div class="why"><b>Why it matters</b>Not every stressed borrower is a crook or a lost cause. A good resolution saves the business and the bank's money; a bad one just delays the loss.</div>

<h3>RBI's Prudential Framework (7 June 2019)</h3>
<div class="viz"><div class="timeline2"><span>Default</span><span><b>30-day review period</b></span><span>Inter-Creditor Agreement</span><span>Resolution plan implemented within <b>180 days</b></span></div></div>
<p>If not implemented in 180 days from the end of the review period, lenders hold an <b>additional 20%</b> provision; if not within 365 days, a further 15% (<b>35%</b> total). This replaced CDR, SDR, S4A and JLF (withdrawn in 2018). Lenders may also choose IBC.</p>

<h3>Restructuring</h3>
<p>Changing terms — longer tenor, lower rate, moratorium, conversion of debt into equity — because the borrower is in <b>financial difficulty</b>. Usually a standard account is <b>downgraded</b> on restructuring (except under specific schemes), and is upgraded only after satisfactory performance during the monitoring period. The <b>Mahapatra Committee (2012)</b> pushed for ending the old forbearance that let restructured accounts stay standard. Viability is tested with DSCR, break-even and IRR vs cost of funds.</p>

<h3>Projects under implementation (2025 directions)</h3>
<p>For projects reaching financial closure on/after 1 Oct 2025: <b>1%</b> standard provision during construction (CRE 1.25%), 0.40% once operational. Deferring the date of commencement of commercial operations (<b>DCCO</b>) within allowed limits keeps the account standard but costs extra provision for each quarter of deferment (0.375% infra, 0.5625% non-infra).</p>

<h3>Wilful defaulters (Master Direction, 2024)</h3>
<p>A borrower with outstanding <b>₹25 lakh+</b> who <i>can</i> pay but doesn't, diverts or siphons funds, or sells pledged security without consent. Identified by a committee after a personal hearing. Consequences: no fresh credit, no restructuring, promoters barred from new ventures for a period, possible criminal action.</p>

<h3>Compromise and write-off (2023 framework)</h3>
<p>Board-approved policy; settlements even with wilful defaulters/fraud cases are allowed without dropping criminal cases; <b>cooling period</b> of at least 12 months (non-farm) before fresh credit. A <b>technical write-off</b> removes the loan from the books but recovery continues.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>30 days · 180 days · +20% · +15% (35%).</li>
<li>Wilful defaulter threshold ₹25 lakh.</li>
</ul></div>`,
check:[
 {q:'Under the June 2019 framework, the review period after default is:',o:['15 days','30 days','90 days','180 days'],a:1,e:'30 days.'},
 {q:'Resolution plan not implemented within 365 days of the review period. Total additional provision:',o:['15%','20%','35%','50%'],a:2,e:'20% + 15% = 35%.'}
]},

{id:'E6', m:'E', t:'Recovery — Lok Adalat, DRT, SARFAESI and IBC', mins:13, cards:['e-recovery','e-ibc','e-compromise'],
body:`
<div class="why"><b>Why it matters</b>When talks fail, the bank must choose the right legal route. The choice depends on the amount, the security, and the borrower's form (company vs individual).</div>

<h3>Choosing the route</h3>
<table><tr><th>Route</th><th>Use when</th><th>Key numbers</th></tr>
<tr><td><b>Lok Adalat</b></td><td>Small NPAs, willing borrower</td><td>Award by consent is final — <b>no appeal</b></td></tr>
<tr><td><b>Civil suit</b></td><td>Below DRT threshold</td><td>Summary suit on negotiable instruments (Order 37 CPC)</td></tr>
<tr><td><b>DRT</b></td><td>Debts <b>₹20 lakh+</b></td><td>Appeal to DRAT within 30 days with <b>50% pre-deposit</b> (reducible to 25%)</td></tr>
<tr><td><b>SARFAESI</b></td><td>Secured NPA, claim ≥ ₹1 lakh and ≥ 20% of principal+interest</td><td>No court needed to start</td></tr>
<tr><td><b>IBC</b></td><td>Corporate default ≥ <b>₹1 crore</b></td><td>NCLT; 180+90 days, max 330</td></tr></table>

<h3>SARFAESI step by step</h3>
<ol class="steps">
<li>Account is NPA; bank issues <b>s.13(2) demand notice</b> giving <b>60 days</b> to pay.</li>
<li>Borrower may object; bank must reply within 15 days with reasons.</li>
<li>After 60 days, <b>s.13(4)</b>: take possession, take over management, appoint a manager, or ask the borrower's debtors to pay the bank.</li>
<li>If resisted, <b>s.14</b>: CMM/District Magistrate helps take physical possession.</li>
<li>Valuation, sale notice, auction; surplus to borrower.</li>
<li>Borrower can appeal to <b>DRT within 45 days</b> (s.17); further appeal to DRAT with pre-deposit.</li></ol>
<p>Not available for agricultural land, security interest below ₹1 lakh, or where dues are under 20% of principal and interest. In a consortium, lenders holding <b>60%</b> by value must agree.</p>

<h3>IBC in one view</h3>
<div class="viz"><div class="timeline2"><span>Default ≥ ₹1 crore</span><span>Application to NCLT (s.7 FC / s.9 OC / s.10 CD)</span><span>Admission → <b>moratorium</b>, IRP takes control</span><span>CoC of financial creditors (<b>66%</b> vote)</span><span>Resolution plan or liquidation</span></div></div>
<p>Liquidation waterfall (s.53): costs → workmen dues (24 months) & secured creditors → employees (12 months) → unsecured financial creditors → government dues & secured shortfall → other debts → preference → equity. Individuals and partnership firms go to <b>DRT</b>, not NCLT.</p>

<div class="eg"><b>Worked example — Kumbhal Traders</b> NPA; outstanding ₹50 lakh; hypothecated machinery worth ₹30 lakh; proprietorship.<br>
✔ SARFAESI: yes (secured, &gt; ₹1 lakh, dues ≥ 20%).<br>
✔ DRT: yes (≥ ₹20 lakh) — for the shortfall after sale.<br>
✘ IBC/NCLT: not for a proprietor; personal insolvency would go to DRT, and the default is below ₹1 crore anyway.</div>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled: DRAT pre-deposit 50% (reducible 25%).</li>
<li>Recalled case study: IBC — know thresholds, timelines, CoC 66%, waterfall.</li>
<li>SARFAESI: 60 days; 45-day appeal; 60% consortium consent.</li>
</ul></div>`,
check:[
 {q:'A company owes ₹80 lakh and has defaulted. Can a financial creditor file under IBC?',o:['Yes','No — default below ₹1 crore','Only at DRT','Only with RBI approval'],a:1,e:'IBC threshold is ₹1 crore.'},
 {q:'After a s.13(2) notice, the borrower gets:',o:['15 days','30 days','60 days','90 days'],a:2,e:'60 days to discharge liabilities.'},
 {q:'Appeal against a DRT order lies with:',o:['High Court','NCLT','DRAT','Lok Adalat'],a:2,e:'Debts Recovery Appellate Tribunal, with pre-deposit.'}
]}
);
