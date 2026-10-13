# Clarity

**For consequential choices that can meaningfully affect your life, work, relationships, or future direction.**

Clarity is for consequential choices that can meaningfully affect your life, work, relationships, or future direction — especially when there is no obvious right answer and each path comes with different trade-offs, uncertainties, and consequences.

It guides you through the decision so you can understand what your choice is really based on, what is driving it, and what you still need to know before you commit.

Clarity does not tell people what to choose. It helps make the structure of their own reasoning visible.

## What Clarity guides you through

1. State one choice under consideration, the decision aim, starting leaning and consequence horizon, then record the deadline and what waiting would change
2. Zoom out from the immediate choice, surface the life the user wants to build or protect, identify what matters most within that life, then bring the decision back in to identify what is at stake and define any hard boundaries
3. Consider realistic alternatives, then describe immediate and future costs across seven areas of life for the choice under consideration
4. Describe the focal choice’s expected gains and relief, then reflect on how those rewards fit the user’s direction in life
5. Use a nine-area practical and psychological guide, then describe what the focal choice could develop, reinforce or make harder to sustain over time
6. Follow further consequences of the focal choice through a possible benefit and a possible difficulty, using automatic causal prompts, compact earlier answers and “That’s it” to finish
7. The Devil's Advocate: describe failure relative to life direction within this decision, then examine whether and how the focal choice could lead towards that outcome
8. Stress Test the contemplated choice against plausible setbacks and describe how much you could manage before it becomes unworkable
9. Review two counterfactual checks, contrary information, current-path investment and commitments, other people’s influence, and current feelings, energy and pressures; contextual writing opens for Yes
10. Test reversibility and switching costs
11. Select related reflections to open and restore shared Decision Drivers, assess each once, and explain the basis of the expectations carrying the main reasons
12. Review one Decision Overview that shows where the user stands, what they are trying to achieve, what drives the current view, what still needs to be found out, where the decision is vulnerable, what may be shaping judgment, and how much room there is to change course

## Decision opening and direction references (2026-10-06)

Decision now asks **“What choice are you considering?”** with the helper **“Write it as something you could choose to do.”** New decisions store one contemplated path, a starting leaning towards making or not making that choice, the decision aim and consequence horizon. No negative alternative is invented. Existing saved paths and their IDs are retained; the first saved path anchors the new opening. See the latest update below for the transition’s limits.

What Matters first shows **Aim for this decision**, then asks what the user ultimately wants to build, protect or become as **Direction in life**. An explicit “I don’t know yet” lets users proceed. It is distinct from an unanswered field and does not lower readiness.

Both inputs appear together on all later pages with Edit links, and travel in the overview and AI context. Existing options, IDs, entered goals and linked reflections are preserved. Trade-Offs now uses the approved alternatives and immediate/future costs layout; What Matters still establishes criteria rather than testing options.

## What Matters design

### What Matters mini-funnel

What Matters deliberately establishes the reference point before option evaluation begins:

1. **Step back** — put the current decision aside and describe the life the user wants to build, protect, or become.
2. **Identify what matters most within that life** — choose up to three broad life domains.
3. **Bring the decision back in** — from those selected domains, identify which are actually at stake in the current decision without yet judging the effect as good or bad.
4. **Define hard boundaries** — optionally articulate any condition that must remain true for a choice to be acceptable.

The current nine-domain scaffold is:
- Values, identity & purpose
- Health & personal capacity
- Partner, family & caregiving
- Friends, community & belonging
- Work & contribution
- Learning & mastery
- Money & material security
- Time, freedom & way of life
- Place, safety & stability

Hard boundaries use guided short text rather than preset answers. Domain reminders and sentence starters reduce blank-page burden while preserving the deliberate thinking required to articulate a real boundary.

What Matters does **not** test options against hard boundaries. Criteria are established independently before candidate evaluation begins.

## Decision Overview

The Decision Overview is the product's answer to the user. It is organised around understanding the decision, not replaying the questionnaire.

It brings together:

- where the user currently stands
- what they are trying to achieve
- what the decision needs to protect
- the few Decision Drivers behind the current view
- actionable unknowns that still need to be resolved
- the main places where the decision is vulnerable
- Judgment Check signals worth noticing
- room to change course

Actionable unknowns are captured when they arise in earlier sections and compiled once in the overview. Judgment Check signals stay separate because they are not research tasks.

At the bottom of the overview, Clarity provides structured Markdown context that can be copied into ChatGPT or another GenAI model for deeper analysis. The human-facing overview is optimised for clarity; the copied context preserves more of the underlying reasoning for model interpretation.

## Scoring philosophy

Clarity does not reduce a decision to one authoritative score.

Only consolidated decision factors are assessed using:

- **Direction** — which options the factor currently supports
- **Importance** — Low / Medium / High
- **Evidence** — Verified fact / Reasonable estimate / Assumption

Non-negotiables stay separate from scoring.

## Visual system

Clarity uses a warm beige-grey background, dark graphite serif headings and readable sans-serif controls, generous negative space, thin structural lines, and selective monochrome pixel-dither gradients.

The dither is functional: uncertainty appears more diffuse, while clearer states become more concentrated.

**Uncertainty begins diffuse. Clarity gives it structure.**

## Privacy

The MVP stores decision data locally in the user's browser using localStorage. No account, backend, database, or API key is required.

## Run locally

Open `index.html` in a browser.

## Publish with GitHub Pages

1. Open **Settings → Pages**
2. Under **Build and deployment**, choose **Deploy from a branch**
3. Select **main**
4. Select **/ (root)**
5. Save


## UX update

Decision Drivers now groups linked earlier reflections and can support multiple paths. The overview separates incomplete assessments from findings, shows explicit unassessed states, provides edit links and copy feedback, and retains the AI context export. Navigation resumes the last working location, tracks reviewed sections separately from location, and provides a mobile section menu. Existing saved entries are preserved; new driver assessments and reversibility start unanswered.



## 2026-10-06

### Decision and shared direction references
- Replaced the proposed-action/legacy split with one option-entry interaction, “What are you choosing between?” Separate decision-description input and saved-decision commentary removed.
- Captured starting leaning and “Aim for this decision” once in Decision.
- Preserved the broader life reflection in What Matters as “Direction in life”, with an explicit optional “I don’t know yet” state.
- Displayed the immediate aim before the broader question, then both inputs together across all subsequent pages with Edit links.
- Updated Decision Overview and AI context to carry both inputs, distinguishing unanswered from explicitly unknown life direction. Life direction does not gate readiness.
- Preserved existing option IDs, entered goals and linked reflections.


## Trade-Offs design (2026-10-06)

Trade-Offs now shows only the focal choice entered in Decision, with Decision aim and Life direction, then asks for realistic alternatives. It has no option tabs or path-by-path navigation, including for older multi-path saves. One **Cost of the Decision** section contains a compact seven-row life-area table followed by Immediate cost and Future cost subsections. Moving-abroad examples appear as placeholders, never as saved answers.

The only cost uncertainty choice is **I don’t know yet but I will find out later**. Selecting it disables that answer while preserving typed text; uncertainty remains in the overview, readiness and Markdown export. Blank costs and alternatives keep the assessment incomplete. Known cost answers are available to consolidate in Decision Drivers. Earlier Trade-Offs notes retain their original categories and remain editable and exported; they are not guessed into immediate/future answers.

The seven areas are reflective prompts, not scores or a universal scientific classification. Alternatives are collected without automatic ranking, selection or rewriting the options entered in Decision. Selecting the best alternative and redesigning later comparative stages remain open product questions.


## Single-choice opening (2026-10-06)

The opening no longer asks users to enter an option list. Alternatives are explored in Trade-Offs. The one choice statement updates the decision anchor and exported context; the starting leaning is recorded independently from any alternative. Existing multi-path saves retain their paths, IDs and linked reflections. Reset starts with one blank choice and no preselected leaning.

Existing path-based sections run once for a new single-choice decision. Their questions, matrices and final synthesis still need a coordinated review; this change does not implement a best-alternative comparison. Single-path driver entries cannot produce a comparative winner: the overview and export mark comparison as not assessed. The overview distinguishes reviewing the entered reflections from comparing alternatives.

The product-notes repository now includes **CLARITY_LANGUAGE_GUIDE.md**, plus the rationale, risks, mitigations and follow-up questions for this transition. Global language changes, promotion of alternatives into evaluated paths, migration controls for older multi-path decisions and final comparison design remain pending.


## Trade-Offs single-choice alignment (2026-10-06)

Trade-Offs always uses the choice shown in Decision. Its context, costs and alternative inputs remain attached to that choice’s existing ID; other saved paths and answers are preserved. Continue goes directly to Incentives, and Back returns to What Matters. The heading **Alternatives** and the three questions now use the approved choice wording. The seven-area table, shared cost section, examples as placeholders and uncertainty behavior are retained.

The remaining page audit is recorded as SC-07 in the product notes’ OPEN_QUESTIONS.md. Compounding and Stress Test are now aligned; Decision Drivers and Decision Overview require substantial follow-up. Other pages need scoped wording or interface alignment; alternative-comparison design and older-save migration remain open.


## Incentives writing flow (2026-10-07)

Incentives now reflects on the focal choice with three free-text questions: expected gains; what the choice could help reduce, leave behind or avoid; and how those rewards fit with the user's direction in life. The title remains **Incentives**. Existing **Aim for this decision** and **Direction in life** references and Edit links are retained.

A collapsible two-column guide uses group rows for **External rewards** and **Psychological rewards**. It includes **Networks and connections** and explicitly presents its areas as starting points, not an exhaustive list. Consequential-life examples use a management promotion and independent design practice; examples are guidance, never stored answers. The alignment question includes **I'm not sure yet**, retains any earlier writing and does not score or infer alignment.

Continue goes directly to Compounding; Back returns to Trade-Offs. Earlier selections, concerns, option IDs and non-focal reflections are preserved, with earlier Incentives notes accessible separately. New writing is included in the existing Decision Drivers reflection pool and structured AI export. No motives are inferred from text. Existing conditional Judgment Check triggers still use retained legacy selections; adapting those triggers to the free-text flow is deferred in the product notes.

The generic **A closer look** judgment review remains deferred. Reward-direction alignment examines the attraction of a reward against an intended life direction; it does not replace Compounding, Further Consequences or Judgment Check. See the product notes' 2026-10-07 reasoning and UX records and INC-01 / INC-04.


## Compounding writing flow (2026-10-07)

Compounding now follows the approved description → areas-of-life guide → three writing questions structure for the focal choice. The guide reuses What Matters' nine areas, with **Practical effects** and **Psychological effects** in every row's second column. It offers starting points, not a complete list or predictions. Helpers and visibly labelled examples connect repeated practical effects with confidence, motivation, attachment and discouragement.

The questions ask what could be built on, which unwanted patterns could strengthen, and what could become harder to sustain or pursue. Each has one blank writing field and **I don’t know yet**; uncertainty preserves writing and remains unresolved in readiness, overview and export. There is no no-effect preset or category-selection cap. Known answers join the existing Decision Drivers reflection pool without new scores or inferred psychological labels.

Earlier categories, original path associations, per-path records and existing linked driver sources remain preserved. Earlier Compounding data remains in browser storage and structured export; it is not inferred into new answers. The unapproved Earlier Compounding notes panel was removed from the page on 2026-10-07 to restore the agreed flow. Migration clears the section's earlier reviewed mark once. Back returns to Incentives; Continue enters Chain Effects, whose retained comparative flow remains deferred under SC-07. Incentives examines attraction and reward-direction fit; Compounding examines development and reinforcement over time; Chain Effects traces possible causal sequences.



## Further Consequences (2026-10-08)

Chain Effects is now **Further Consequences**. The approved flow is description → shared nine-area guide with one integrated description per area → causal guidance → two explorations, starting with a possible benefit and a possible difficulty. Either can contain a mix of helpful and harmful effects. Compounding examines repetition, accumulation and reinforcement; this section follows an initial change through subsequent changes and responses.

Start with one small blank field. As it gains text, the next causal question appears inline without taking focus. Moving into it compacts earlier answers into editable text entries. Longer entries use Show more / Show less. There is one unused continuation, and no Then what? button. **That’s it** finishes the sequence; **Explore further** reopens it. Stop when another plausible connection cannot be explained; no minimum of two effects or maximum chain length is imposed.

Saved answers, internal gaps, earlier path records and driver snapshots are preserved. Existing saves request one new review of this section. Decision Drivers receives one connected reflection per sequence; structured export includes all effects and finished/open states. No AI or causal validation is added. The section runs once for the focal choice, with Continue leading to Inversion and Back to Compounding.

## The Devil's Advocate (2026-10-10)

Inversion is now **The Devil's Advocate**. The approved two-part flow asks:

1. **Looking at your life direction, what would failure in this decision look like?** Describe a recognisable situation that would take the user further from what they want to build or protect.
2. **Could making this choice lead you towards that outcome? If so, how?** Explain a plausible connection without assuming that the choice causes failure.

Both writing fields stay visible together, with helpers, labelled bakery-expansion examples and prompting ghost text. There is one fixed pair: users can describe several concerns in the same box. Under the connection question, **I do not know yet** and **No, I don’t see this choice leading towards that outcome** are mutually exclusive alternatives to writing. Selecting either disables the connection box while retaining its text; **Return to writing** restores it. The shared life-direction/decision-aim references and focal choice remain visible. Examples are independent of the user's personal circumstances and are not stored as answers.

The current outcome/connection reflection and its response persist with a stable ID. Additional pairs from earlier saves are retained in historical export and Drivers with their original IDs. Decision Drivers receives each pair as one reflection; the vulnerability overview and Markdown export retain the relationship and distinguish unanswered parts. Earlier Inversion notes and driver links remain intact without being inferred into new answers or adding a legacy editor. Older saves request one fresh review of section 7. Completeness requires a written outcome plus either a written connection or an explicit alternative. Unknown is an answered question with an unresolved investigation in Overview/export. No is the user’s assessment, not proof of safety, and is not counted as an identified vulnerability. Retained explanation text is labelled historical while an alternative is selected. No recommendation, likelihood or new score is inferred. Stress Test is unchanged.

Validation: syntax, single-pair editing, response switching/restored writing, saved-data migration, persistence/reload, reset, Drivers/Overview/export, escaping and all-screen rendering/navigation checks passed. Run `node tests/advocate.cjs` for the interaction/data regression checks. Live-browser visual verification remains pending.



## Stress Test — room after setbacks (2026-10-10)

Stress Test now combines adverse-condition prompts with margin-of-safety assessment for the focal contemplated action. It keeps the user's choice, Decision aim and Life direction visible. Six conditions cover Money, Available Time, Time to reach the outcome, Health and energy, Support and Cooperation, and Access to what you need. Available Time includes time displaced from other things that matter; outcome delay is assessed separately. People matter here when their support, cooperation or follow-through is a dependency.

Each condition has one response: No meaningful effect, Enough room remains, Little or no room left, Beyond tolerance, or I don’t know yet. A visible, secondary inset guide explains these responses, with term and explanation left edges aligned. The assessment concerns room remaining after a plausible setback; it is not a stress-feeling rating. The guide reflows at narrower widths.

One shared writing box asks “How much could you manage before this becomes unworkable?” It asks for detailed, concrete make-or-break setbacks, what could still be managed, the point where continuing becomes unworkable or crosses an important boundary, and limits not yet understood. A native collapsed “See an example” disclosure supports this writing. There is no numerical requirement or resilience score; greater margin does not establish a better choice, and independent rows do not establish resilience to combined setbacks.

New answers are versioned and tied to the focal path. The old comparative matrix, original ratings and least-room writing remain historical in saved data and Markdown export rather than being reinterpreted. Migration clears the old Stress Test reviewed mark once. Current concrete writing is available to Drivers and Overview; unknown responses generate information needs. A blank response remains incomplete; an explicit unknown is answered but unresolved. Old matrix ratings do not establish new completion or stability.

Validation: `node --check app.js`, `node tests/advocate.cjs` and `node tests/stress.cjs`. Tests cover persistence, migration, source preservation, unknowns, reporting, escaping, navigation and reset. Browser visual QA remains outstanding; desktop and mobile CSS reflow is implemented.

## Decision timing (2026-10-11)

The Decision page now ends with two timing questions after the consequence horizon:

1. **Does this decision have a deadline?** — Yes / No fixed deadline / I don’t know yet. Yes reveals **When do you need to decide, and what sets that deadline?**, with date/timeframe/source guidance and a neutral premises example.
2. **What would change if you waited before deciding?** — always visible. One writing box asks about learning, opportunities, costs, feasibility and the period considered. **Nothing significant comes to mind** and **I don’t know yet** are mutually exclusive alternatives to writing.

All answers start blank. Deadline and waiting presets retain earlier writing without treating it as the active response; returning to Yes or deselecting a waiting preset restores the writing. The opening placeholder now uses a neutral community-pottery-studio example. No date picker, countdown, urgency rating, automatic verification or recommendation is added.

Timing is decision-level and versioned. Older saves preserve choice/path IDs, all earlier answers and linked driver sources; migration clears only Decision's reviewed mark once for this addition. Editing a timing response clears that section's reviewed mark. Navigation remains available: unanswered timing prevents a complete assessment, while explicit unknown is answered but unresolved and generates an information need. No fixed deadline and nothing significant coming to mind are user reports, not proof that waiting is costless.

Overview includes current timing and an Edit link; Markdown includes exact timing questions, current responses and separately labelled inactive writing. Active written timing answers join Decision Drivers with stable source IDs. This is G06 capture implementation, not psychological validation or a redesign of Judgment Check.

Validation: syntax plus `node tests/timing.cjs`, `node tests/advocate.cjs` and `node tests/stress.cjs` cover state switching, saving/reload/reset, non-destructive migration, Drivers/Overview/export, unknowns/completeness, escaping and navigation. The timing harness uses document/storage stubs; live-browser visual and accessibility checks remain pending.

## Decision Drivers and expectation basis (2026-10-11)

The approved reflection/evaluation columns are retained. Selecting a first reflection opens a Driver card with an editable title copied from that reflection. Further previously unlinked selections join the active card. The destination is shown above the reflection list and on the active card; editing a card or selecting **Add reflections here** makes it the destination. **Add a decision driver** opens an independent blank card for a newly considered reason. New direction, importance, evidence and directional strength begin unanswered.

Supporting reflections are collapsible directly beneath the title. Their expanded list includes **Move to another driver**, including a New driver destination, for correcting grouping without clearing either card's evaluation. Unchecking detaches a supporting reflection. An automatically created card hides when its last supporting reflection is unchecked; checking a previously linked reflection restores its original card, title and ratings/writing. A manually added reason remains available without supporting reflections. Active groups count once; retained inactive cards do not contribute to assessment or current Overview.

One decision-level writing block below the workspace asks **What are the expectations you’re relying on most, and what are they based on?** The helper distinguishes an expectation from why it matters, requests relevant experience/information/comparisons and their limits, and allows remaining assumptions to be explained in the same box. **I don’t know yet** disables and retains writing. Blank is incomplete; unknown is answered but unresolved and generates an information need. No source uploads, probability estimates, automatic grouping or external verification are introduced.

### External dependency guidance — G08 (2026-10-13)

The approved follow-up adds a separate guidance paragraph within the same component: **If this relies on other people or circumstances, what needs to happen, and what can you influence?** The updated pottery-studio example distinguishes workshop demand from reliance on unconfirmed landlord permission for weekend access. Both guidance paragraphs are associated with the same textarea for assistive technology.

The single answer remains in `driverReview.basis`; unknown/retained writing, completeness, grouping and scoring use their existing behavior. This copy-only extension does not change the save format or reset review marks. Existing answers may not discuss dependencies: an answered box is not proof that every important external condition has been identified or verified. Stress Test continues to request the room to manage setbacks; detailed contingency capture remains a separate coverage limit.

The full Decision Overview and structured export continue carrying the active basis answer. The review mock's abbreviated Overview was a partial preview, not an approved reduction of the actual page. Separate dependency cards, control ratings and dependency maps remain optional and unapproved. Browser visual/accessibility and comprehension checks remain pending.

`driverReview.formatVersion` is 1. Existing drivers, shared legacy links, path associations, source snapshots, notes, IDs and ratings are preserved without guessed regrouping. Older saves request one fresh review of Drivers only for this change; edits to Drivers or the new basis reset its reviewed mark. The active destination, source selections, hidden cards and evaluations persist across reload. Earlier linked writing is identified when it differs from the current reflection or no longer appears in the current reflection list.

Overview shows active drivers and the current expectation basis. Markdown exports active and retained inactive Drivers separately, with source IDs/text/path association, moved-source history, importance, user-assessed evidence and directional strength. Inactive basis writing is separately labelled. Evidence selections remain user assessments; support is not external verification, strength is not probability, and repeated source snapshots are not independent evidence. Broader scoring, comparative logic, global provenance and Judgment Check redesign remain separate pending work.

Validation: `node --check app.js`, `node tests/drivers.cjs`, `node tests/timing.cjs`, `node tests/advocate.cjs`, `node tests/stress.cjs` and `git diff --check` pass. The focused checks cover grouping, restoring title/evaluation across reload, manual reasons, explicit moves, inactive exclusion, new-state defaults, unknown/blank treatment, old shared groups, changed snapshots, export, escaping and all-section navigation/reset. These use a simulated document/storage environment; live-browser desktop/mobile visual and keyboard verification remains pending.

## Judgment Check: encountered contrary information — G02 (2026-10-13)

After the existing four checks, **Have you come across any information or experience that challenges your current view?** offers **Yes / Haven’t found any / Not sure**, initially unanswered. The strongest-reason question remains available initially and for Yes/Haven’t found any; its guidance and example adapt to the selected response. Not sure hides that entire follow-up and retains its writing. Switching back or reloading restores it. **What evidence would most seriously change your view?** remains available for every response.

`judgment.formatVersion` is 1, with new `evidenceEncountered` (`yes` / `none` / `unsure` / blank) and the existing answers, `strongestCase` and `changeEvidence`. Existing answers are retained; no encountered-evidence response is inferred. Older saves receive a one-time Judgment Check review reset only. Editing any Judgment answer clears that section's review mark. Selection updates the existing controls without rebuilding the page; native radios, linked labels/helpers, live guidance announcements and responsive styling support the interaction.

The new challenge block is incomplete until its selection, active strongest-reason answer and change-evidence answer are filled. Not sure does not require the hidden answer and creates an unresolved information need. Broader completeness and relevance rules for the remaining Judgment checks remain separate work. Overview includes the response and active writing. Markdown records exact questions/states and labels retained hidden strongest-reason writing as inactive. Haven’t found any does not tell us whether the user searched, how thoroughly, or whether contrary information exists. An opposing argument may be hypothetical. No bias diagnosis, evidence verification or scoring change is introduced.

The existing four counterfactual checks, legacy-triggered extra checks and page order remain in place pending their separate reviews. Detailed evidence-search histories, source forms and extra evidence ratings remain optional and unapproved.

Validation: `node tests/judgment.cjs` covers response switching, hidden/restored writing, persistence, old answers and scoped migration, incomplete/unknown states, active/inactive Overview/export, escaping, unchanged checks and navigation/reset. The existing Drivers/timing/Devil's Advocate/Stress Test suites, syntax and diff checks also pass. These simulated document/storage checks do not exercise live-browser layout, screen-reader behavior or user comprehension; those checks remain pending.

## Judgment Check: concrete people-influence context — G03 (2026-10-13)

The approved G03 block replaces the two legacy-triggered people-influence counterfactual questions. **Are other people’s views, expectations or progress affecting how you see this choice?** is available to everyone, with **Yes / Nothing comes to mind / Not sure**, initially unanswered. Only Yes opens **Who are you thinking of, and how are they influencing your view?**, with guidance about advice, approval, comparison, pressure, responsibilities and the user's own reasons. Roles or groups are enough; personal names are not required. Other responses hide the follow-up and retain its writing, which returns on switching back or reload.

`judgment.socialContext` has its own version 1, response (`yes` / `none` / `unsure` / blank) and detail. G02's version and answers are unchanged. Older saves receive a one-time Judgment Check review reset only; no new response is inferred from old `answers.seen` or `answers.social`. Those answers remain stored and export with their exact original questions, labelled historical rather than current signals. The legacy uncertainty-relief question and its existing trigger remain for a later review; the four core checks and page order are unchanged.

Blank response or Yes with blank detail leaves G03 incomplete. Nothing comes to mind answers the question without asserting verified absence; Not sure answers it but records an unresolved information need. Overview shows the current response and active detail. Export separately labels retained hidden detail and superseded people-influence checks. Reported influence, useful advice and real responsibilities do not establish bias or a psychological cause; no new score or automatic motive inference is added. Detailed adviser/source/rating forms remain optional and unapproved.

Validation: `node tests/social.cjs` covers universal visibility, all three states, hidden/restored writing and reload, control continuity, scoped migration/review reset, exact legacy No/Yes preservation, active/historical reporting, unchanged uncertainty/G02 handling, escaping and all-section navigation/reset. All existing suites, syntax and diff checks pass. Browser visual/mobile/keyboard, screen-reader and comprehension checks remain pending. The preview's preselected Yes illustrated the expanded state; production begins unanswered.

## Judgment Check: current path and present state — G04/G05 (2026-10-13)

The approved G04/G05 designs are implemented together. G04 replaces the fresh-start and past-investment counterfactuals with **Is your current path, past investment or an existing commitment affecting how you see this choice?** Only Yes opens **What from your current path, past investment or commitments is affecting your view?** Its helper separates irrecoverable investment from usable future benefits and real costs of changing course, and invites familiar paths, promises and difficulty stepping back.

G05 replaces the final legacy-triggered uncertainty-relief rating with **Are your current feelings, energy levels or pressures affecting how you see this choice?** Only Yes opens **What is happening for you right now, and how is it affecting your view?** The helper invites tiredness, excitement, stress, wanting uncertainty to end, unrelated events, effects on attention/expectations and real constraints. Incentives captures expected rewards and relief, Decision captures deadlines/waiting, and Stress Test captures prospective capacity; their roles remain distinct.

Both relevance questions start blank and offer **Yes / Nothing comes to mind / Not sure**. Hiding a follow-up preserves its writing; returning to Yes or reloading restores it. `judgment.investmentContext` and `judgment.stateContext` each have format version 1, response and detail. Older saves receive one fresh Judgment Check review, without inferring new answers from old ratings or other writing. Edits invalidate only that review mark. Blank or Yes without detail is incomplete; Not sure is answered but unresolved.

The two remaining counterfactual rows concern framing and memorable examples. Every old fresh/past/uncertainty response remains stored and exports with its exact question and No/Maybe/Yes label, separately marked historical. All legacy-category Judgment gates are retired. Full Overview shows current relevance/active detail and information needs; export labels inactive writing and historical checks. No numerical scoring change, bias diagnosis or recommendation is added. Past spending and feelings do not establish error; future benefits, obligations and resource constraints may deserve weight.

Detailed investment histories, mood scales, extra ratings and repeated-review features remain optional and unapproved. Broader Judgment list/order, whole-review completeness/provenance and the future LLM playbook remain separate work. Earlier dated records describe the designs at those dates.

Validation: `node tests/judgment-contexts.cjs` covers blank/Yes/none/unknown states, preserved/restored writing and reload, independent controls, migration without inference, old positive/negative/uncertain answers, partial migrations, current/historical Overview/export, completeness, escaping and navigation/reset. Existing G02/G03/Drivers/timing/Devil's Advocate/Stress Test suites, syntax and staged whitespace checks pass in simulated document/storage. Live-browser layout/mobile/keyboard, screen-reader and comprehension checks remain pending.

