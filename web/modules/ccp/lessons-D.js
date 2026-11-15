/* CCP lessons — Module D: Other Credits */
window.CCP = window.CCP || {}; CCP.LESSONS = CCP.LESSONS || [];
CCP.LESSONS.push(

{id:'D1', m:'D', t:'Export credit — before and after shipment', mins:12, cards:['d-pcl','d-pcfc','d-post','d-ecgc','d-gold-card','d-subvention'],
body:`
<div class="why"><b>Why it matters</b>An Udaipur handicraft exporter gets a US order worth $1 lakh. She needs money now to buy wood and pay artisans, but the buyer pays 90 days after the goods arrive. Export credit bridges both gaps — before shipment and after.</div>

<h3>The export timeline</h3>
<div class="viz"><div class="timeline2"><span>Order / LC received</span><span><b>Pre-shipment</b> (packing credit)</span><span>Shipment</span><span><b>Post-shipment</b> (bill finance)</span><span>Buyer pays → loans liquidated</span></div></div>

<h3>Pre-shipment credit (packing credit)</h3>
<ul><li>Given against a firm export order or LC to buy raw material, process and pack goods.</li>
<li>Standard maximum period <b>360 days</b> (temporarily <b>450 days</b> for disbursements up to 31 March 2026).</li>
<li>Must be <b>liquidated by export proceeds</b> — normally by purchasing/discounting the export bill.</li>
<li><b>Running account</b> facility for exporters with good track record (credit before firm orders, adjusted FIFO).</li>
<li>Available in rupees (PCL) or in foreign currency — <b>PCFC</b>, at international benchmark-linked rates.</li>
<li>Sub-suppliers to exporters can get packing credit via an inland LC from the exporter.</li></ul>

<h3>Post-shipment credit</h3>
<ul><li>Purchase / discount / negotiation of export bills (under LC or otherwise).</li>
<li>Advance against bills sent on collection, against <b>duty drawback</b>, against <b>undrawn balance</b> and retention money.</li>
<li>If a bill stays unpaid beyond due date, the bank <b>crystallises</b> it into a rupee liability (per FEDAI rules) — exchange loss falls on the exporter.</li></ul>

<h3>Risk support</h3>
<p><b>ECGC</b> insures exporters (buyer/country risk) and gives banks whole-turnover packing credit and post-shipment covers. It does <b>not</b> fix interest rates. For NPA provisioning, the ECGC-covered amount needs no provision. <b>Gold Card</b> exporters with a clean track record get faster, simpler credit.</p>

<h3>Interest support today</h3>
<p>The Interest Equalisation Scheme lapsed on <b>31 Dec 2024</b>. The <b>Export Promotion Mission</b> (Niryat Protsahan) now gives eligible MSME exporters a base <b>2.75%</b> interest subvention on rupee pre- and post-shipment credit (from January 2026).</p>

<div class="eg"><b>Worked example — Pichola Handicrafts</b>
Order $1,00,000 at ₹84 = ₹84 lakh; LC usance 90 days. Margin 10% → PCL up to ₹75.6 lakh for 120 days.<br>
On shipment, the bank discounts the usance bill (₹84 lakh less discount), and the proceeds <b>liquidate the PCL</b>. 90 days later the US buyer's bank pays; the post-shipment credit closes.<br>
If the bill stays unpaid beyond the period allowed under FEDAI rules → crystallised into rupees at the then rate.</div>

<div class="examc"><b>Exam corner</b><ul>
<li>PCL liquidated by export proceeds; PCFC = pre-shipment in foreign currency.</li>
<li>ECGC doesn't fix rates; ECGC cover reduces provisioning.</li>
<li>Know Gold Card and ECNOS as syllabus terms.</li>
</ul></div>`,
check:[
 {q:'Packing credit is normally repaid from:',o:['Domestic sales','Export bill proceeds','A term loan','Fresh equity'],a:1,e:'It is liquidated by purchase/discount of the export bill.'},
 {q:'An overdue foreign currency export bill converted into a rupee liability is:',o:['Negotiated','Crystallised','Rediscounted','Factored'],a:1,e:'Crystallisation (FEDAI rules).'}
]},

{id:'D2', m:'D', t:'MSME lending — definitions, guarantees and protections', mins:12, cards:['d-msme','d-msmed','d-schemes'],
body:`
<div class="why"><b>Why it matters</b>MSMEs are a large part of Indian bank lending and most of the case studies. Get the definition, the guarantee and the payment-protection rules right, and many questions answer themselves.</div>

<h3>Who is an MSME? (from 1 April 2025)</h3>
<table><tr><th>Category</th><th>Investment in plant & machinery/equipment</th><th>Turnover</th></tr>
<tr><td>Micro</td><td>≤ ₹2.5 crore</td><td>≤ ₹10 crore</td></tr>
<tr><td>Small</td><td>≤ ₹25 crore</td><td>≤ ₹100 crore</td></tr>
<tr><td>Medium</td><td>≤ ₹125 crore</td><td>≤ ₹500 crore</td></tr></table>
<p>Both tests must be met (composite criteria); exports are excluded from turnover. Classification is based on Udyam registration. The same limits apply to manufacturing and services.</p>

<div class="eg"><b>Worked example — Udai Precision</b> Investment ₹18 crore; turnover ₹70 crore including ₹20 crore exports → counted turnover ₹50 crore.<br>
Micro? ₹18 cr > ₹2.5 cr → no. Small? ₹18 ≤ 25 and ₹50 ≤ 100 → <b>Small enterprise</b>.</div>

<h3>CGTMSE — collateral-free credit</h3>
<p>The Credit Guarantee Fund Trust for Micro & Small Enterprises guarantees loans to MSEs given without collateral or third-party guarantee. Ceiling raised to <b>₹10 crore</b> per borrower from 1 April 2025. The guaranteed portion of an NPA needs <b>no provision</b>, and attracts zero risk weight.</p>

<h3>Payment protection — MSMED Act</h3>
<ul><li>A buyer must pay a micro/small supplier within the agreed period, <b>maximum 45 days</b> (15 days if nothing is agreed).</li>
<li>Delay → <b>compound interest with monthly rests at three times the RBI bank rate</b>.</li>
<li>Disputes → Micro & Small Enterprises Facilitation Council.</li>
<li><b>TReDS</b>: online platforms where MSME invoices on large buyers are discounted <b>without recourse</b> to the MSME.</li></ul>

<h3>Schemes you should recognise</h3>
<table><tr><th>Scheme</th><th>Key feature</th></tr>
<tr><td>MUDRA (PMMY)</td><td>Shishu ≤ ₹50,000 · Kishore ≤ ₹5 lakh · Tarun ≤ ₹10 lakh · Tarun Plus ≤ ₹20 lakh (after repaying Tarun)</td></tr>
<tr><td>Stand-Up India</td><td>₹10 lakh–₹1 crore for SC/ST and women entrepreneurs, greenfield</td></tr>
<tr><td>PMEGP</td><td>Margin-money subsidy for new micro enterprises</td></tr>
<tr><td>PM SVANidhi / PM Vishwakarma</td><td>Street vendors / traditional artisans</td></tr></table>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled case study: MSME definition & guidelines — use the 2025 limits.</li>
<li>45 days; 3× bank rate compounded monthly.</li>
<li>CGTMSE ceiling ₹10 crore.</li>
</ul></div>`,
check:[
 {q:'Investment ₹2 crore, turnover ₹12 crore. Category:',o:['Micro','Small','Medium','Not MSME'],a:1,e:'Fails micro turnover test (₹10 cr) → Small.'},
 {q:'If buyer and MSE supplier agreed nothing about credit period, payment is due within:',o:['15 days','30 days','45 days','60 days'],a:0,e:'15 days when there is no agreement; max 45 with agreement.'}
]},

{id:'D3', m:'D', t:'Priority sector lending', mins:11, cards:['d-psl','d-psl-housing','d-pslc'],
body:`
<div class="why"><b>Why it matters</b>RBI requires banks to lend a fixed share of credit to sectors that markets alone might under-serve. Every branch target and many exam questions flow from these rules.</div>

<h3>Targets (domestic SCBs; foreign banks with 20+ branches)</h3>
<table><tr><th>Category</th><th>% of ANBC or CEOBSE, whichever higher</th></tr>
<tr><td>Total priority sector</td><td><b>40%</b></td></tr>
<tr><td>Agriculture</td><td><b>18%</b> (of which small & marginal farmers 10%)</td></tr>
<tr><td>Micro enterprises</td><td><b>7.5%</b></td></tr>
<tr><td>Weaker sections</td><td><b>12%</b></td></tr></table>
<p><b>ANBC</b> = Adjusted Net Bank Credit (net bank credit plus certain bonds); <b>CEOBSE</b> = credit-equivalent of off-balance-sheet exposures. Shortfalls are deposited in RIDF and similar funds at low returns — a real cost.</p>

<h3>Categories</h3>
<p>Agriculture · MSME · Export credit · Education · Housing · Social infrastructure · Renewable energy · Others (e.g., loans to distressed persons, SHGs).</p>

<h3>Housing and education (2025 directions)</h3>
<table><tr><th>Centre population</th><th>Max loan</th><th>Max cost of dwelling</th></tr>
<tr><td>≥ 50 lakh</td><td>₹50 lakh</td><td>₹63 lakh</td></tr>
<tr><td>10–50 lakh</td><td>₹45 lakh</td><td>₹57 lakh</td></tr>
<tr><td>&lt; 10 lakh</td><td>₹35 lakh</td><td>₹44 lakh</td></tr></table>
<p>One dwelling unit per family; both limits must hold. Education loans up to <b>₹25 lakh</b>. Loans to a bank's own staff don't count.</p>

<div class="eg"><b>Worked example</b> Udaipur (population below 10 lakh): flat costs ₹42 lakh, loan ₹33.6 lakh.<br>
Loan ≤ ₹35 lakh ✔ and cost ≤ ₹44 lakh ✔ → <b>priority sector</b>. Same flat at ₹46 lakh → not PSL (cost cap breached), even if the loan is small.</div>

<h3>PSLCs — trading achievements</h3>
<p>A bank that has over-achieved can sell the "achievement" as a <b>Priority Sector Lending Certificate</b> to a bank that is short, without transferring loans or risk. The framework is RBI's; trading is on RBI's <b>e-Kuber</b> platform. Types: agriculture, SMF, micro enterprises, general.</p>

<div class="examc"><b>Exam corner</b><ul>
<li>40 / 18 / 10 / 7.5 / 12.</li>
<li>Recalled: "authority that set out PSLCs" → RBI.</li>
<li>Recalled: "one dwelling unit per family" in PSL housing.</li>
</ul></div>`,
check:[
 {q:'A ₹48 lakh loan for a flat costing ₹60 lakh in a city of 80 lakh people:',o:['Is PSL','Is not PSL — loan above limit','Is not PSL — cost above cap','Is PSL only if borrower is a woman'],a:0,e:'Metro limits: loan ≤ ₹50 lakh, cost ≤ ₹63 lakh → qualifies.'},
 {q:'PSLCs are traded on:',o:['NSE','e-Kuber (RBI)','TReDS','CERSAI'],a:1,e:'RBI’s e-Kuber platform.'}
]},

{id:'D4', m:'D', t:'Retail loans — home, gold, education and the customer’s rights', mins:11, cards:['d-retail','d-ltv-home','d-ltv-gold','d-edu','d-cersai','e-fpc'],
body:`
<div class="why"><b>Why it matters</b>Retail lending is many small loans, so risk is managed by rules and scoring rather than deep individual appraisal. Knowing the caps (LTV, limits) is half the job.</div>

<h3>What makes retail different</h3>
<p>Large numbers, small tickets, standard products, credit scoring (bureau score + income + obligations), automated processing and <b>diversification</b> as the main risk control. Key ratio: <b>FOIR</b> — fixed obligations ÷ income (banks often cap around 50–60%).</p>

<h3>Home loans — LTV caps</h3>
<table><tr><th>Loan amount</th><th>Max LTV</th></tr>
<tr><td>Up to ₹30 lakh</td><td>90%</td></tr>
<tr><td>Above ₹30 lakh to ₹75 lakh</td><td>80%</td></tr>
<tr><td>Above ₹75 lakh</td><td>75%</td></tr></table>
<div class="eg"><b>Worked example</b> Property ₹42 lakh. At 90% the loan would be ₹37.8 lakh — but that's above ₹30 lakh, so the 80% band applies → <b>max ₹33.6 lakh</b>. For a ₹35 lakh property: 90% = ₹31.5 lakh → too big for band 1, so cap at ₹30 lakh (85.7% LTV, within 90%); band 2 would give only ₹28 lakh, which isn't above ₹30 lakh → <b>max ₹30 lakh</b>.</div>

<h3>Gold loans — 2025 directions</h3>
<table><tr><th>Loan amount (consumption)</th><th>Max LTV</th></tr>
<tr><td>Up to ₹2.5 lakh</td><td>85%</td></tr>
<tr><td>Above ₹2.5 lakh to ₹5 lakh</td><td>80%</td></tr>
<tr><td>Above ₹5 lakh</td><td>75%</td></tr></table>
<p>LTV must be maintained throughout the loan; bullet repayment loans up to 12 months; proper valuation and purity checks.</p>

<h3>Education loans (IBA model scheme)</h3>
<p>Up to <b>₹4 lakh</b>: no margin, no security (parent as co-borrower) · ₹4–7.5 lakh: + third-party guarantee (or CGFEL cover) · above ₹7.5 lakh: tangible collateral. Margin above ₹4 lakh: 5% India / 15% abroad. Repayment starts after course + moratorium.</p>

<h3>The customer's rights (Fair Practices Code)</h3>
<ul><li><b>Key Fact Statement</b> before signing: APR, all charges, EMI schedule.</li>
<li><b>Penal charges</b>, not penal interest; not capitalised (from 1 Jan 2024).</li>
<li>Original property documents returned within <b>30 days</b> of closure, with compensation for delay.</li>
<li>Register the mortgage with <b>CERSAI</b> within 30 days; search CERSAI before lending.</li></ul>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled: LTV above ₹30 lakh up to ₹75 lakh = 80%.</li>
<li>LTV numericals: the loan must sit in the band whose LTV it uses.</li>
</ul></div>`,
check:[
 {q:'Property ₹100 lakh. Maximum home loan:',o:['₹75 lakh','₹80 lakh','₹90 lakh','₹100 lakh'],a:0,e:'80% would give ₹80 lakh — above ₹75 lakh, so the 75% band applies → ₹75 lakh.'},
 {q:'Gold valued ₹2 lakh; maximum consumption gold loan:',o:['₹1.5 lakh','₹1.6 lakh','₹1.7 lakh','₹2 lakh'],a:2,e:'Loan ≤ ₹2.5 lakh → 85% × 2 = ₹1.7 lakh.'}
]},

{id:'D5', m:'D', t:'Agriculture and government-sponsored credit', mins:8, cards:['d-schemes'],
body:`
<div class="why"><b>Why it matters</b>A large part of priority sector is agriculture, and many syllabus scheme names (SGSY, SJSRY, SRMS, DRI) come up as one-liners. Know what each is for.</div>

<h3>Kisan Credit Card (KCC)</h3>
<p>A revolving cash-credit limit for crop production, post-harvest needs, consumption and allied activities, with a 5-year validity and annual review. Short-term crop loans under the <b>Modified Interest Subvention Scheme</b> get interest subvention plus a <b>prompt repayment incentive</b>, bringing the effective rate down for farmers who repay on time.</p>
<p><b>NPA for agriculture</b>: short-duration crops — overdue for <b>two crop seasons</b>; long-duration crops — overdue for <b>one crop season</b>.</p>

<h3>Government-sponsored schemes</h3>
<table><tr><th>Name in syllabus</th><th>What it is now</th></tr>
<tr><td>SGSY (rural self-employment)</td><td>Restructured as <b>DAY-NRLM</b> — SHG-bank linkage, interest subvention for women SHGs</td></tr>
<tr><td>SJSRY (urban self-employment)</td><td>Restructured as <b>DAY-NULM</b></td></tr>
<tr><td>SRMS</td><td>Self-employment scheme for rehabilitation of manual scavengers — capital subsidy + concessional loans</td></tr>
<tr><td>DRI</td><td>Differential Rate of Interest — small loans to very poor borrowers at <b>4%</b></td></tr>
<tr><td>PMEGP</td><td>Margin-money subsidy for new micro units (KVIC)</td></tr></table>

<div class="examc"><b>Exam corner</b><ul>
<li>DRI rate 4%.</li>
<li>Agri NPA: 2 crop seasons (short) / 1 crop season (long).</li>
</ul></div>`,
check:[
 {q:'A short-duration crop loan becomes NPA when overdue for:',o:['90 days','One crop season','Two crop seasons','One year'],a:2,e:'Two crop seasons for short-duration crops.'},
 {q:'Interest rate under the DRI scheme:',o:['4%','6%','7%','MCLR'],a:0,e:'4% p.a.'}
]}
);
