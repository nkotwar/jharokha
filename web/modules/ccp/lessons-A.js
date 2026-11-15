/* CCP lessons — Module A: Introduction & Overview of Credit */
window.CCP = window.CCP || {}; CCP.LESSONS = CCP.LESSONS || [];
CCP.LESSONS.push(

{id:'A1', m:'A', t:'What credit really is — and the life of a loan', mins:8, cards:['a-principles','a-policy'],
body:`
<div class="why"><b>Why it matters</b>A depositor gives your branch ₹10 lakh at 6.5%. You lend it to a dairy at 10%. The 3.5% gap pays salaries, rent, capital — and covers the loans that go bad. If even one loan in thirty fails completely, that gap is wiped out. Credit is the art of earning the spread <i>without</i> losing the principal.</div>

<h3>Credit = trust, priced</h3>
<p>The word comes from Latin <i>credere</i>, "to believe". When a bank lends, it believes three things: the borrower <b>will</b> repay (willingness), <b>can</b> repay (capacity), and if both fail, the bank can <b>recover</b> from something else (security). Everything in this course is about testing those three beliefs before lending, and protecting them after.</p>
<p>A bank is a <b>financial intermediary</b>: it borrows short (deposits that can be withdrawn) and lends longer (loans repaid over months or years). It earns <b>Net Interest Margin (NIM)</b> — interest earned minus interest paid, as a % of earning assets. Because the margin is thin and the money is not the bank's own, safety comes before profit.</p>

<div class="viz"><div class="flow">
<span>Depositors</span><i>→ deposits @ 6.5%</i><span>Bank</span><i>→ loans @ 10%</i><span>Borrowers</span>
</div><p class="small">Spread 3.5% pays costs, builds capital, absorbs losses.</p></div>

<h3>The life of a loan (the credit cycle)</h3>
<ol class="steps">
<li><b>Application & KYC</b> — who is the borrower, what do they need, why?</li>
<li><b>Appraisal</b> — can they repay? Technical, financial, managerial, market checks (Module B & C).</li>
<li><b>Sanction</b> — the right authority (as per delegated powers) approves limits, rate, security, terms.</li>
<li><b>Documentation</b> — loan agreement, charge documents, guarantees; stamped, executed, registered (Module E).</li>
<li><b>Disbursement</b> — money released only after pre-disbursement conditions are met, ideally directly to the supplier.</li>
<li><b>Monitoring / follow-up</b> — stock statements, inspections, account conduct, early warning signals.</li>
<li><b>Repayment — or recovery</b> — if things go wrong: restructuring, legal action, SARFAESI, IBC.</li>
</ol>

<div class="think"><b>Pause & think:</b> At which stage does a bank have the most power over the borrower — and the least?
<details><summary>See answer</summary>Most power <b>before sanction/disbursement</b> (the bank can still say no or change terms). Least power after disbursement, when the money is out. That is why appraisal and documentation are done before, not after.</details></div>

<h3>Fund-based vs non-fund-based</h3>
<p><b>Fund-based</b> credit means real money leaves the bank: cash credit, term loan, overdraft, bill discounting. <b>Non-fund-based</b> (NFB) means the bank gives a <i>promise</i> — a bank guarantee or letter of credit — and pays only if something happens. NFB earns commission without using funds, but the risk is real: if the promise is invoked, it turns into a fund-based loan ("devolvement").</p>

<div class="eg"><b>Worked example — why one bad loan hurts so much</b>
Bank lends ₹30 crore across 30 borrowers at a net spread of 3% → annual net income ₹0.90 crore.<br>
One ₹1 crore loan becomes a total loss → loss ₹1 crore.<br>
Result: a whole year's spread on ₹30 crore is gone, plus ₹0.10 crore more. <b>That is why "safety" is the first principle of lending.</b></div>

<div class="examc"><b>Exam corner</b><ul>
<li>Credit cycle order: appraisal → sanction → documentation → disbursement → monitoring → recovery.</li>
<li>NFB facilities (LC, BG, co-acceptance) carry credit risk and need capital, even though no funds go out on day one.</li>
</ul></div>`,
check:[
 {q:'A bank guarantee issued by your branch is a:',o:['Fund-based facility','Non-fund-based facility','Deposit','Investment'],a:1,e:'No money moves unless the guarantee is invoked — it is non-fund-based; if invoked and paid, it devolves into a funded exposure.'},
 {q:'Which step must come BEFORE disbursement?',o:['Monitoring','Recovery','Documentation','Stock audit'],a:2,e:'Documents are executed (and charges created) before the money is released.'}
]},

{id:'A2', m:'A', t:'Principles of lending and the Cs of credit', mins:9, cards:['a-principles','a-appraisal'],
body:`
<div class="why"><b>Why it matters</b>Two applicants walk in. One offers a 14% rate but has no track record. The other wants 9.5% and has repaid three loans on time. The principles of lending tell you whom to prefer and why.</div>

<h3>The five principles</h3>
<table><tr><th>Principle</th><th>Question it asks</th><th>Branch example</th></tr>
<tr><td><b>Safety</b></td><td>Will the money come back?</td><td>Repayment capacity from cash flows, backed by security.</td></tr>
<tr><td><b>Liquidity</b></td><td>Can it come back in time / be converted to cash?</td><td>Short-term WC loans and loans against easily saleable security are more liquid.</td></tr>
<tr><td><b>Profitability</b></td><td>Does the rate cover cost of funds, costs and risk?</td><td>Risk-based pricing: weaker rating → higher spread.</td></tr>
<tr><td><b>Purpose</b></td><td>Is the use productive, lawful, verifiable?</td><td>Machinery purchase — yes; speculation or illegal activity — no.</td></tr>
<tr><td><b>Diversification</b></td><td>Are eggs spread across baskets?</td><td>Limits per borrower, group, sector, geography.</td></tr></table>
<p>They pull against each other: higher profit usually means higher risk. The rule is simple — <b>safety first</b>; never chase rate at the cost of repayment.</p>

<h3>The Cs — how you judge a borrower</h3>
<div class="viz"><div class="cs">
<span><b>Character</b>honesty, track record, CIBIL</span>
<span><b>Capacity</b>cash flows to repay</span>
<span><b>Capital</b>own money in the business</span>
<span><b>Collateral</b>security if all else fails</span>
<span><b>Conditions</b>economy, industry, terms</span>
<span><b>Cash flow</b>timing of money in vs out</span>
</div></div>
<p><b>Character</b> is checked through credit bureau reports (CIBIL etc.), bank statements, market reports and past dealings. <b>Capacity</b> is about the <i>source</i> of repayment — normally the business's cash flows. <b>Capital</b> — a promoter who has put in their own money will fight harder to save the business. <b>Collateral</b> is the second way out, never the first. <b>Conditions</b> covers both the external climate (demand, regulation, competition) and the loan terms.</p>

<div class="eg"><b>Worked example — choosing between two applicants</b>
<b>Applicant X:</b> offers 14%, new business, promoter contribution 10%, excellent property collateral worth 200% of loan.<br>
<b>Applicant Y:</b> 9.5%, 8-year track record, promoter contribution 30%, DSCR 1.8, collateral 110%.<br>
A good credit officer prefers <b>Y</b>: character (track record) and capacity (DSCR 1.8) are strong, and capital (30%) shows commitment. X's collateral is comforting, but recovering through collateral is slow, costly and uncertain — a loan should never be sanctioned only because the security is good.</div>

<div class="think"><b>Pause & think:</b> A borrower says, "Why worry about my cash flow? My house is worth twice the loan." What do you say?
<details><summary>See answer</summary>Repayment must come from cash flows. Enforcing a mortgage takes time (SARFAESI notice, possession, auction), costs money and may face legal challenges. Collateral reduces loss if things fail; it doesn't make a weak proposal good.</details></div>

<div class="examc"><b>Exam corner</b><ul>
<li>"Most important principle" → <b>Safety</b>.</li>
<li>"Purpose of the loan" is itself a principle — it should be productive and lawful.</li>
<li>Expected trap: an option saying collateral is the primary source of repayment — it is wrong.</li>
</ul></div>`,
check:[
 {q:'A loan of ₹50 lakh is proposed with excellent collateral but projected DSCR of 0.9. The right view is:',o:['Sanction — collateral covers it','Reject or restructure — repayment capacity is inadequate','Sanction at a higher rate','Sanction with a guarantor'],a:1,e:'DSCR below 1 means cash flows cannot service the debt; collateral is only a fall-back.'},
 {q:'Which C is best judged from a credit bureau report and past bank dealings?',o:['Capital','Character','Conditions','Collateral'],a:1,e:'Character = integrity and repayment track record.'}
]},

{id:'A3', m:'A', t:'Who can borrow? Borrower types and their legal capacity', mins:12, cards:['a-minor','a-special','a-agent','a-huf','a-firm','a-huf-partner','a-company','a-llp','a-roc'],
body:`
<div class="why"><b>Why it matters</b>A perfectly appraised loan is useless if the person who signed had no legal power to borrow. Courts will not enforce it. Each type of borrower comes with its own checks.</div>

<h3>The basic rule</h3>
<p>Under the <b>Indian Contract Act, 1872</b>, a valid contract needs parties who are <b>competent</b>: major (18+), of sound mind, not disqualified by law. A loan is a contract, so the bank must confirm the borrower (and every signatory) has capacity and authority.</p>

<h3>Individuals and special cases</h3>
<ul>
<li><b>Minor</b> — agreement is <b>void ab initio</b> (void from the start). Neither the loan nor a guarantee by a minor can be enforced. Lend to the guardian, not the child.</li>
<li><b>Married woman</b> — fully competent; her husband is not liable for her loan unless he signs.</li>
<li><b>Pardanashin woman</b> — one who observes seclusion. The <b>bank must prove</b> she understood what she signed: read and explain it, ideally with independent advice.</li>
<li><b>Illiterate person</b> — thumb impression attested by a witness who confirms the document was read and explained in the person's language.</li>
<li><b>Lunatic / insolvent</b> — cannot contract (an insolvent's assets vest in the official receiver).</li>
<li><b>Through an agent (Power of Attorney)</b> — the POA must <i>specifically</i> allow borrowing and charging property; it ends on the principal's death, insanity or insolvency.</li>
</ul>

<h3>Hindu Undivided Family (HUF)</h3>
<p>A HUF is a family unit under Hindu law that owns property jointly. It is run by the <b>Karta</b> (usually the senior male member; courts have also recognised women as Karta). The other members are <b>coparceners</b>.</p>
<table><tr><th>Person</th><th>Liability for a HUF loan</th></tr>
<tr><td>Karta</td><td><b>Unlimited</b> — HUF property plus personal assets</td></tr>
<tr><td>Adult coparceners who sign</td><td>Personal liability too</td></tr>
<tr><td>Coparceners who don't sign / minors</td><td>Only up to their share in HUF property</td></tr></table>
<p>Documents: HUF declaration listing all coparceners, Karta's signature for the HUF, and adult coparceners' signatures if you want their personal liability.</p>

<h3>Proprietorship, partnership and LLP</h3>
<ul>
<li><b>Sole proprietorship</b> — not a separate legal person. The proprietor <i>is</i> the business; liability is unlimited.</li>
<li><b>Partnership firm</b> (Partnership Act 1932) — partners are jointly and severally liable without limit. A partner of a trading firm has <b>implied authority</b> to borrow for the firm, but <b>not</b> to mortgage the firm's immovable property, give guarantees, or settle disputes by arbitration (s.19). So banks take all partners' signatures. An <b>unregistered firm cannot sue</b> others to enforce a contract (s.69), but <i>can be sued</i> — the bank can still recover.</li>
<li><b>HUF as a partner</b> — a HUF can't be a partner itself; the <b>Karta joins in a representative capacity</b>. Take the HUF declaration and coparceners' consent where HUF property is involved.</li>
<li><b>LLP</b> (LLP Act 2008) — a <b>body corporate</b> with separate legal existence; partners' liability is limited to their agreed contribution (except for fraud). Needs at least <b>2 designated partners, one resident in India</b>.</li>
</ul>

<h3>Companies</h3>
<p>A company is a separate legal person (Companies Act 2013). Check: certificate of incorporation, MOA/AOA (objects and borrowing powers), <b>Board resolution</b> to borrow and create charges; if total borrowing will exceed paid-up capital + free reserves + securities premium, a <b>special resolution of shareholders under s.180(1)(c)</b>. After creating security, register the <b>charge with the ROC within 30 days</b> (s.77) — under the 2013 Act <i>every</i> charge must be registered — and the security interest with <b>CERSAI</b>. An unregistered charge is void against the liquidator and other creditors.</p>

<div class="eg"><b>Worked example — Sharma & Sons</b>
Firm: unregistered; partners Ramesh, Suresh, and Mahesh Sharma (HUF) through its Karta. Security offered: HUF's house.<br>
✔ Lend? Yes — an unregistered firm can be sued.<br>
✔ Signatures: all three partners (Karta signs for the HUF).<br>
✔ Mortgage: partners have no implied authority over immovable property, and the house belongs to the HUF — so the <b>Karta must create the mortgage</b>; take adult coparceners' consent to avoid later disputes.<br>
✔ Limitation: renew acknowledgement of the DP note before 3 years run out.</div>

<div class="think"><b>Pause & think:</b> A 17-year-old's father offers to guarantee his son's loan. Is the guarantee useful?
<details><summary>See answer</summary>Since the minor's own contract is void, there's no valid "principal debt" for a guarantee in the strict sense. Courts have sometimes treated such a promise as an <b>indemnity</b> by the father — so the bank should lend to the <i>father</i> directly instead of relying on this structure.</details></div>

<div class="examc"><b>Exam corner</b><ul>
<li>Minor's contract → <b>void ab initio</b> (Mohori Bibee v. Dharmodas Ghose, 1903).</li>
<li>Karta: unlimited; coparceners: limited to share unless they sign.</li>
<li>Recalled question: "precautions for an unregistered firm with a HUF partner".</li>
<li>Recalled question: LLP features; "charges to be registered with ROC" → all charges.</li>
</ul></div>`,
check:[
 {q:'Which partner power is NOT implied for a partner of a trading firm?',o:['Borrowing for the firm','Receiving payments due to the firm','Mortgaging the firm’s immovable property','Buying goods for the firm'],a:2,e:'s.19 Partnership Act: no implied authority to transfer immovable property.'},
 {q:'A company’s charge on its machinery in favour of your bank must be registered with the ROC within:',o:['7 days','30 days','90 days','It need not be registered'],a:1,e:'s.77 Companies Act 2013 — 30 days; unregistered charge is void against liquidator/creditors.'},
 {q:'An LLP is:',o:['Not a legal person','A body corporate with limited liability of partners','Governed by the Partnership Act 1932','A form of HUF'],a:1,e:'LLP Act 2008.'}
]},

{id:'A4', m:'A', t:'Types of credit facilities — what you can offer a customer', mins:10, cards:['a-facilities','c-nfb'],
body:`
<div class="why"><b>Why it matters</b>A trader needs money for 90 days of stock; a factory needs a new machine for 7 years; an exporter needs money before shipping. Giving each the wrong product (say, a term loan for stock) creates mismatch and default.</div>

<h3>Match the facility to the need</h3>
<div class="viz"><div class="match">
<span><b>Short-term, fluctuating need</b><br>(stock, receivables)</span><i>→</i><span>Cash credit / overdraft / WCDL / bills</span>
<span><b>Long-term, fixed asset</b><br>(machine, building)</span><i>→</i><span>Term loan</span>
<span><b>A promise, not cash</b><br>(tender, import)</span><i>→</i><span>Bank guarantee / LC</span>
</div></div>

<h3>Fund-based facilities</h3>
<table><tr><th>Facility</th><th>How it works</th><th>Security / control</th></tr>
<tr><td><b>Cash credit (CC)</b></td><td>Running account; borrower draws and repays freely up to a limit; interest only on daily balance used.</td><td>Hypothecation (or pledge) of stock and receivables; drawings within <b>drawing power</b>.</td></tr>
<tr><td><b>Overdraft (OD)</b></td><td>Current account allowed to go into debit up to a limit.</td><td>Against FDs, property, shares, salary — or clean (unsecured).</td></tr>
<tr><td><b>Demand loan</b></td><td>Single disbursement; repayable on demand.</td><td>Often against deposits, gold, NSCs.</td></tr>
<tr><td><b>Term loan</b></td><td>Disbursed for a fixed asset; repaid in instalments over years (medium term up to ~3–5 yrs, long term beyond).</td><td>Hypothecation of the asset bought + collateral; repayment from the business's cash accruals.</td></tr>
<tr><td><b>Working capital demand loan (WCDL)</b></td><td>A short-term loan carved out of the WC limit — the "loan component".</td><td>Same security as CC.</td></tr>
<tr><td><b>Bills purchased / discounted</b></td><td>Bank pays the seller now against a bill drawn on the buyer: <b>purchase</b> for demand bills, <b>discount</b> for usance (time) bills.</td><td>Documents of title, buyer's creditworthiness.</td></tr></table>
<p><b>Drawee Bill Scheme</b> twists the bills idea: the <i>buyer's</i> (drawee's) bank gives the buyer a limit to pay bills drawn on him by his suppliers.</p>

<h3>Non-fund-based facilities</h3>
<ul>
<li><b>Letter of credit</b> — bank promises to pay the seller against documents. Used for purchases.</li>
<li><b>Bank guarantee</b> — bank promises to pay a beneficiary if the customer fails (bid bonds, performance, advance payment, financial).</li>
<li><b>Co-acceptance</b> — bank adds its acceptance to a bill drawn on its customer.</li>
</ul>
<p>(The <b>BG & LC Masterclass</b> app in Jharokha covers these in depth.)</p>

<h3>The loan system for big borrowers</h3>
<p>Cash credit is convenient but undisciplined: big companies kept large unused limits, then drew suddenly, making it hard for banks to manage funds. RBI's 2018 guidelines require borrowers with aggregate fund-based WC limits of <b>₹150 crore+</b> to draw at least <b>60%</b> as a <b>loan component</b> (minimum 7 days), the rest as CC.</p>

<div class="eg"><b>Worked example — designing a package</b>
Mewar Fabrics needs: ₹60 lakh for stock & receivables (fluctuating), ₹1.2 crore for a new dyeing machine (7-year life), ₹15 lakh guarantee for a government tender, and imports dyes worth ₹40 lakh a year.<br>
Package: <b>CC ₹60 lakh</b> (against stock & debtors) · <b>Term loan ₹90 lakh</b> (75% of machine; 25% promoter margin), repaid in 7 years · <b>BG ₹15 lakh</b> · <b>Import LC limit</b> sized on monthly purchases × cycle (see Lesson C6).</div>

<div class="examc"><b>Exam corner</b><ul>
<li>Drawee bill = finance to the <b>purchaser</b>.</li>
<li>Loan system objective: <b>credit discipline</b> and better cash/fund management; ₹150 crore, 60%.</li>
<li>Term loans for fixed assets; CC for current assets — mismatch = diversion risk.</li>
</ul></div>`,
check:[
 {q:'A trader wants finance for stock that rises before Diwali and falls after. Best facility:',o:['10-year term loan','Cash credit against hypothecation of stock','Bank guarantee','Demand loan against FD of a third party'],a:1,e:'CC suits fluctuating current-asset needs.'},
 {q:'Bills drawn payable after 90 days are financed by:',o:['Purchase','Discounting','Term loan','Overdraft'],a:1,e:'Usance bills are discounted; demand bills are purchased.'}
]},

{id:'A5', m:'A', t:'Credit policy, exposure limits and rules that restrict lending', mins:10, cards:['a-policy','a-exposure','a-restrictions','a-consortium','a-loansystem'],
body:`
<div class="why"><b>Why it matters</b>A branch manager finds a great borrower who wants ₹500 crore. Can the bank lend it all? The answer lives in the Board's loan policy and RBI's exposure rules.</div>

<h3>The loan policy</h3>
<p>Every bank's Board approves a <b>loan (credit) policy</b>, reviewed at least yearly. It sets: target sectors and mix; <b>exposure ceilings</b>; who can sanction how much (<b>delegation of powers</b>); minimum rating / appraisal standards; pricing; margins and collateral; documentation; review & renewal; NPA management. Branch officers must follow it — sanctions outside it need higher approval.</p>

<h3>Exposure limits — don't put all eggs in one basket</h3>
<p>Under RBI's <b>Large Exposures Framework</b>, measured against the bank's <b>Tier 1 capital</b>:</p>
<div class="viz"><div class="bars2">
<div><span style="width:80%"></span><b>Single counterparty: 20%</b> (Board may allow 25% in exceptional cases)</div>
<div><span style="width:100%"></span><b>Group of connected counterparties: 25%</b></div>
</div></div>
<p>Banks also set internal sector limits (e.g., real estate, NBFCs) and single-industry caps in their policy.</p>

<div class="eg"><b>Worked example</b>
Bank's Tier 1 capital = ₹40,000 crore.<br>
Single borrower ceiling = 20% × 40,000 = <b>₹8,000 crore</b> (up to ₹10,000 crore with Board approval in exceptional cases).<br>
Group ceiling = 25% × 40,000 = <b>₹10,000 crore</b> for all connected companies together.</div>

<h3>Laws that forbid some loans</h3>
<ul>
<li><b>BR Act s.20</b> — no loans to the bank's own directors or to firms/companies in which they are interested (with narrow exceptions); <b>s.20A</b> — such debts can't be remitted without RBI approval.</li>
<li><b>s.21</b> — RBI can direct banks on purposes, margins and rates; <b>s.21A</b> — courts can't reopen bank interest rates as "excessive".</li>
<li><b>RBI restrictions</b> — e.g., no loans against the bank's own shares; limits on advances against shares; no finance for purchase of gold bullion; rules for loans to relatives of directors/officers.</li>
</ul>

<h3>When one bank isn't enough</h3>
<table><tr><th>Arrangement</th><th>What it means</th></tr>
<tr><td><b>Consortium</b></td><td>Several banks lend to one borrower on common terms; a <b>lead bank</b> does the appraisal; joint documents; security shared <b>pari-passu</b>.</td></tr>
<tr><td><b>Multiple banking</b></td><td>Borrower deals with several banks separately; each appraises and documents on its own — information-sharing is crucial.</td></tr>
<tr><td><b>Syndication</b></td><td>A lead arranger structures one big loan (usually term) under a single agreement and sells participation to other lenders.</td></tr></table>

<div class="examc"><b>Exam corner</b><ul>
<li>LEF limits are on <b>Tier 1</b> capital: 20% / 25%. Old norms (15%/40% of capital funds) are outdated.</li>
<li>Loans to own directors — prohibited under s.20 BR Act.</li>
<li>Loan system: ₹150 crore+ WC limits → min 60% loan component.</li>
</ul></div>`,
check:[
 {q:'Tier 1 capital is ₹10,000 crore. Normal single-counterparty exposure limit is:',o:['₹1,500 crore','₹2,000 crore','₹2,500 crore','₹4,000 crore'],a:1,e:'20% of Tier 1 = ₹2,000 crore (₹2,500 crore only in exceptional cases with Board approval).'},
 {q:'In a consortium, security is normally shared:',o:['First-come first-served','Pari-passu among member banks','Only by the lead bank','By the borrower’s choice'],a:1,e:'Pari-passu = equal ranking in proportion to exposure.'}
]},

{id:'A6', m:'A', t:'Credit risk, ratings and capital adequacy', mins:11, cards:['a-rating','a-car','a-crilc','a-ice','a-unsecured','a-pce'],
body:`
<div class="why"><b>Why it matters</b>Every loan carries a chance of loss. Banks put a number on that chance, price for it, and hold capital against it so that depositors are safe even when some loans fail.</div>

<h3>Measuring credit risk: PD × LGD × EAD</h3>
<ul>
<li><b>PD — Probability of Default</b>: chance the borrower defaults within a year (e.g., 2%).</li>
<li><b>LGD — Loss Given Default</b>: share of the exposure lost after recovering from security (e.g., 40%).</li>
<li><b>EAD — Exposure at Default</b>: how much will be outstanding when default happens (e.g., ₹5 crore).</li>
</ul>
<div class="eg"><b>Worked example</b> Expected loss = PD × LGD × EAD = 2% × 40% × ₹5 crore = <b>₹4 lakh</b>. The bank prices this into the interest rate (it's a cost of doing business). <i>Unexpected</i> loss — the bad year — is what <b>capital</b> is held for.</div>

<h3>Credit rating</h3>
<p><b>Internal rating</b>: the bank's own model scores the borrower on financial risk (ratios), business risk, industry risk and management risk, giving a grade (e.g., CR1–CR10). The grade decides pricing, sanctioning authority and monitoring intensity. <b>External rating</b>: by SEBI-registered agencies (CRISIL, ICRA, CARE, India Ratings, Acuité, Infomerics…); used to set <b>risk weights</b> for capital. Better rating → lower risk weight → less capital needed.</p>

<h3>Capital adequacy (Basel III, India)</h3>
<p><b>CRAR = Capital ÷ Risk-weighted assets.</b> A loan of ₹100 with 100% risk weight needs capital on ₹100 of RWA; a 50% risk-weight loan needs capital on ₹50.</p>
<table><tr><th>Minimum</th><th>Ratio</th></tr>
<tr><td>Common Equity Tier 1 (CET1)</td><td>5.5%</td></tr>
<tr><td>Tier 1</td><td>7%</td></tr>
<tr><td>Total CRAR</td><td>9%</td></tr>
<tr><td>+ Capital Conservation Buffer (in CET1)</td><td>2.5% → CET1 8%, total 11.5%</td></tr></table>
<div class="eg"><b>Worked example — case-study style</b>
RWA = ₹1,000 crore; CET1 = ₹70 crore; Additional Tier 1 = ₹15 crore; Tier 2 = ₹25 crore.<br>
CET1 ratio = 7.0% ✔ (≥5.5%; with CCB needs 8% ✘ — <b>short of the buffer</b>, so dividend payouts get restricted).<br>
Tier 1 = (70+15)/1,000 = 8.5% ✔ · CRAR = 110/1,000 = 11.0% — meets 9% but below 11.5% with CCB.</div>

<h3>Early warning & independent checks</h3>
<ul>
<li><b>CRILC</b> — RBI's central database of large credits: banks report borrowers with aggregate exposure of <b>₹5 crore and above</b>, including SMA/default status. Every lender sees early stress.</li>
<li><b>Independent credit evaluation</b> — credit risk is assessed by a team separate from the business-getters, so sanctioning isn't biased by sales targets.</li>
<li><b>Unsecured exposure</b> — where the realisable security is <b>not more than 10%</b> of the exposure from the start. These need higher provisions if they go bad.</li>
</ul>

<div class="examc"><b>Exam corner</b><ul>
<li>Recalled case study: CET1 and CAR calculations — know 5.5 / 7 / 9 / +2.5.</li>
<li>EL = PD × LGD × EAD.</li>
<li>CRILC threshold ₹5 crore; unsecured exposure ≤10% security.</li>
</ul></div>`,
check:[
 {q:'PD 1%, LGD 50%, EAD ₹20 crore. Expected loss is:',o:['₹10 lakh','₹20 lakh','₹1 crore','₹10 crore'],a:0,e:'0.01 × 0.5 × 20 crore = ₹0.10 crore = ₹10 lakh.'},
 {q:'RWA ₹500 crore, total capital ₹50 crore. CRAR:',o:['5%','9%','10%','50%'],a:2,e:'50/500 = 10% (meets 9%, below 11.5% with CCB).'},
 {q:'Under Basel III in India, the minimum Tier 1 ratio (excluding CCB) is:',o:['5.5%','7%','8%','9%'],a:1,e:'CET1 5.5%, Tier 1 7%, CRAR 9%.'}
]}
);
