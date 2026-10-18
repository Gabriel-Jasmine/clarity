# Clarity

## Homepage navigation — 18 October 2026

The briefing and all twelve decision pages provide a visible **Home** link. The Clarity wordmark links home too. Desktop tool navigation places Home above the decision sections; mobile keeps Clarity, Home and Sections together in the top row. Going home preserves saved answers and the recorded section; **Continue my decision** resumes the existing tool. See [navigation validation](docs/HOME_NAVIGATION_2026-10-18.md) and [Playbook 1.3.1](docs/CLARITY_UI_UX_PLAYBOOK.md).

## Homepage update — 18 October 2026

The entry page now uses the approved centered illustration and copy: **A good decision begins with Clarity**, a honey-yellow doodle underline, the better-questions description, and **Let’s begin**. The locally bundled galaxy illustration retains the crossed-leg figure and the open constellation of reflection symbols.

The entry flow is `index.html` → `before-you-begin.html` → `decision.html`. The briefing explains the tool, how to use the questions and what the overview provides. Returning users with recorded writing or reviewed sections get a **Continue my decision** link. Both entry pages leave decision storage untouched; `decision.html` preserves the existing tool, storage key and last-section behavior. The 12 sections, reasoning, capture and export logic are unchanged.

The editorial serif treatment is scoped to the entry pages; the working tool keeps Manrope and the existing [UI/UX Playbook](docs/CLARITY_UI_UX_PLAYBOOK.md). See [homepage validation](docs/HOMEPAGE_2026-10-18.md) for checks and limitations.

## Latest presentation update — 17 October 2026

Build `20261017-ui-playbook` applies the agreed design across all 12 sections and adopts the [UI/UX Playbook](docs/CLARITY_UI_UX_PLAYBOOK.md). See the [rollout record](docs/UI_ROLLOUT_2026-10-17.md) for validation and remaining checks. Earlier implementation records below retain their dated context.

## Reversibility update — 2026-10-16

Build `20261016-reversibility` uses exactly two provisional trails, **Reversible / Irreversible**, with no preselected answer. Reversible explores a practical route, optional demands and learning before deeper commitment. Irreversible explores lasting consequences, possible adjustments and relevant checks in three stages. Option hints are visible before selection; examples and prompts precede writing. Earlier current entries are resurfaced with provenance and revisit links; source checks are tied to the exact quotation and contemplated choice.

`reversibility.js` supplies the section, saved-data normalization, source checks, Driver reflection rows and capture helpers. Legacy difficulty/cost/easier writing remains historical without inferring a new answer. Switching trails and conditional responses preserves writing and Driver assessments. Current answers feed Overview; exact inactive/history values and relationships remain in export. Schema 2 adds Q70–Q77 and retires Q41–Q43: 77 cumulative definitions, 10 retired, 64 active inputs and three actions.

Run all dependency-free regression suites with `for test in tests/*.cjs; do node "$test" || exit 1; done`. Eleven suites include `tests/reversibility.cjs`. Browser layout, mobile/keyboard/screen-reader and user-comprehension validation remain open. The section does not verify reversibility or recommend a decision. [Product rationale and sources](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/reviews/2026-10-16-reversibility.md).

Earlier dated implementation entries below describe their original baselines.

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
8. Stress Test the contemplated choice against plausible setbacks, describe how much you could manage, then check compatibility with any written hard boundaries
9. Test the focal choice’s reversibility and switching costs
10. Select related reflections to open and restore shared Decision Drivers, assess support/against/neither/unknown once, and explain the expectations carrying the reasons
11. Review wording, examples, current-path investment, contrary information, other people and present feelings through contextual questions, then revisit Drivers if a reason changes
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

Clarity follows the [UI/UX Playbook 1.0.0](docs/CLARITY_UI_UX_PLAYBOOK.md): soft ivory and greyish ivory surfaces, Manrope typography, a dark sidebar, pink selections, compact green completion circles and one charcoal frame around each page's main workspace. Blue identifies open information needs in Overview; honey yellow supports optional guidance and examples. This replaces the earlier serif/dither visual direction.

Use the [component showcase](design/component-showcase.html) to review reusable states. The [rollout record](docs/UI_ROLLOUT_2026-10-17.md) records scope, checks and remaining limits. Contributors and coding assistants must follow [AGENTS.md](AGENTS.md) before UI changes. Questions, reasoning, saved-data rules and exports are preserved in this visual rollout.

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

## Judgment Check: words and memorable examples — G09 (2026-10-13)

The approved G09 mock replaces the two remaining counterfactual rows with separate relevance questions: **Are particular words or descriptions shaping how you see this choice?** and **Is a particular experience, story or comparison shaping how you see this choice?** Both start unanswered with **Yes / Nothing comes to mind / Not sure**. Only Yes opens one writing field, with the approved helper, generic pottery example and ghost text. Other states hide the entire follow-up and retain writing for restoration/reload.

The wording follow-up asks how the choice is described and what this brings into focus, inviting another description of the same facts and reasons for any changed view. The example follow-up asks what keeps coming to mind and what it leads the user to expect, including why it stands out, its relevance and important differences. An earlier answer can be referenced. G01 still owns the wider expectation basis, G02 contrary information, and G05 present feelings/pressure; no extra comparison form or numerical-reference history is added.

`judgment.wordingContext` and `judgment.exampleContext` each have version 1, response/detail. Missing either version requests one fresh Judgment review; no other section reset is added, and existing G02–G05 state remains. No new relevance is inferred from old `framing`/`vivid` ratings. Every old framing/memorable-example answer remains stored and exports with its original question and No/Maybe/Yes meaning as historical. The old table/key/hypothetical instruction are removed; the overall page order is unchanged.

Full Overview displays current relevance and active detail. Export labels inactive writing and old checks separately. Blank or Yes without detail is incomplete; Not sure is answered but unresolved and adds an information need. The old counterfactual no-change summary now describes recorded responses, avoiding an absence claim when no active counterfactuals remain. No numerical score or bias/causal diagnosis is added. A different description may reveal a legitimate consideration, and a memorable example can be useful evidence; representativeness and numerical anchoring are not established by this capture.

Detailed comparison tables, numerical-reference histories and extra ratings remain optional/unapproved. Final question-list/flow usability, global completeness/provenance and the future LLM playbook remain separate work. Earlier dated records describe the product at those dates.

Validation: `node tests/judgment-examples.cjs` plus existing G02/G03/G04/G05/Drivers/timing/Devil's Advocate/Stress Test suites pass. Checks cover Yes-only writing, independent controls, preserved/restored/reloaded text, blank/unknown/completeness, one-time/partial migration, existing answers and all old negative/uncertain/positive states without inference/current signals, Overview/export, escaping/navigation/reset. Syntax and staged whitespace checks pass. Live-browser layout/mobile/keyboard, screen-reader and comprehension checks remain pending.


## 2026-10-13 — Review and export integrity

All four audited corrections are implemented in application build `20261013-review-integrity`. This is an implementation/capture repair. It does not add researched mechanism families, validate readiness, change numerical formulas or settle the pending page-order/comparative-choice decisions.

1. **Retained writing:** unknown life direction, unknown immediate/future costs, hidden hard boundaries and older Trade-Offs alternative-state notes retain their original writing in export. Current answers are separate from inactive or historical text; the structured records preserve raw whitespace and line breaks.
2. **Supporting-source freshness:** Driver export preserves the linked quote, source/path/driver IDs and moved-source history. It labels whether a snapshot matches, has changed or is no longer in the current reflection list. Changed sources also include their current reflection as the same source, not additional evidence. Ratings and grouping are preserved; no new psychological conclusion is inferred.
3. **Honest completeness:** blank required answers prevent Reviewed. Gains/relief accept writing, Nothing comes to mind or I don’t know yet; alignment retains writing or I’m not sure yet. Stress Test requires a make-or-break note or I don’t know yet whenever any listed condition is not reported as having no meaningful effect. If all six are no-effect, the note can be blank; this is the user’s assessment, not proof. Yes boundaries require explanations. The consequence horizon needs an answer, with Not sure unresolved. Finished consequence branches cannot contain interior gaps; an empty explicitly finished branch records no further effect identified. Changes invalidate the owning section’s review mark; navigation and choosing an active Driver destination do not. A one-time review-policy migration clears Decision, What Matters, Incentives, Further Consequences and Stress Test marks, preserving all answers and other marks.
4. **Uniform export records:** `capture.js` adds schema `clarity-decision-context`, version 1, the application build, Q01–Q65 definitions, question-definition versions, raw response values/states, current/inactive/historical scope, visibility/requiredness, component versions where stored, and path/branch/outcome/boundary/Driver/source relationships. The readable Markdown and JSON appendix describe the same entries, never independent corroboration. Unknown capture times are null; original screen versions and capture dates are not reconstructed. Consequence sequence IDs locate entries within this export, not a longitudinal edit history. Older categories without a known original prompt are explicitly identified rather than given invented wording.

**Optional:** starting inclination, life-direction writing, reversal cost selections/easier-reversal writing and extra Driver rationale do not gate Reviewed. Life-direction unknown alone does not lower readiness; explicit unknowns in required capture remain answered but unresolved and add information needs. Structured records stay inside the existing export; a separate JSON download/viewer, extra source forms, repeated-review histories and broader comparative features remain optional or separate decisions. Overview adds a compact Still to complete list linking to affected sections.

**Verification and limits:** all nine DOM/storage regression suites (`integrity`, `judgment-examples`, `judgment-contexts`, `judgment`, `social`, `drivers`, `stress`, `advocate`, `timing`), JavaScript syntax and whitespace checks pass. Tests cover retention/restoration/reload, snapshot changes, raw records and versions, optional/unknown/missing completeness, boundary/branch rules, scoped edit invalidation and one-time migration. Live-browser layout/mobile/keyboard, screen-reader and comprehension checks remain pending. The scientific register remains 33 families/52 sources; the cumulative question inventory remains 65 records, seven retired counterfactual families, 57 active input families plus one grouping action. Self-report is not independent verification or a validated psychological assessment.



## 2026-10-15 — Agreed whole-flow corrections

The reviewed ten-part correction set is implemented in app build `20261015-whole-flow` . This record supersedes earlier pending-order, multi-path direction and current/history descriptions below. The [whole-flow audit and item-by-item resolution](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/reviews/2026-10-13-whole-flow-audit.md#approved-resolution--2026-10-15) retain the pinned baseline findings.

The current order is Decision → What Matters → Trade-Offs → Incentives → Compounding → Further Consequences → The Devil’s Advocate → Stress Test → Reversibility → Decision Drivers → Judgment Check → Decision Overview. Existing stored section IDs are retained; navigation order, Back/Continue, edit links and saved positions use an explicit order mapping.

Priorities remain capped at three, while decision stakes use all nine domains independently. Deselecting a priority preserves stakes. A consequence branch can finish immediately with “That’s it”; an empty finished branch means no further plausible effect identified, not proof of no effects. Reopening preserves entries and restores the finish control.

Stress Test ends with a conditional check against each written hard boundary: **This choice respects it / This choice would conflict with it / I’m not sure yet**. Conflict or uncertainty offers one optional note. Notes remain stored when hidden. The assessment belongs to the exact boundary and focal action; rewording either requires a fresh check and preserves earlier assessments. Old boundary status maps are historical, never inferred into this new answer.

Each consolidated Driver asks **How does this reason affect your view?** with **Supports it · Against it · Neither · Not sure**. The user assesses one focal action. Strength appears only for support/against; hiding retains its saved value. Importance and user-labelled evidence remain; Why this matters is optional. Old path-support associations, ratings and groups remain in history without inventing a new direction. Legacy comparative arithmetic is removed from current synthesis; comparison remains **Comparison not assessed**.

The existing reflection/evaluation panel layout, automatic title, supporting reflections directly beneath the title, shared groups, last-link hiding/restoration, Add a decision driver and explicit move correction remain. Current reflection groups include active Judgment narratives and the strongest opposing case when visible; the future change-evidence criterion is not treated as current evidence. Historical/non-focal/hidden writing is separated and does not block current completeness or appear as a current vulnerability automatically.

Two checkbox controls use the approved wording in both states:

- **This is still relevant** deliberately includes earlier writing in the current Driver review. Clearing it reverses the links it introduced, preserving other links and independent manual reasons. The last supporting link hides an automatic card; rechecking restores its identity, title, grouping and ratings, including previously shared legacy groups and moved relationships.
- **This is my thinking now** adopts the current source wording under that Driver. Clearing it restores the quote saved before the switch; it does not edit the source on its original page. Both versions remain retained. The switch survives saving, reload and moves. Another source edit is labelled; clearing and reselecting explicitly adopts the latest writing. Relevant changes clear the Driver review mark.

Judgment Check ends with **Has this changed a reason?**, the helper **You can link these reflections to a driver or revise its assessment. Your earlier writing is retained.**, and **Review your decision drivers**. Reuse is deliberate, with no automatic psychological grouping or inference.

Overview retains the full review, groups Drivers by their assessed direction, shows current supporting quotes with freshness, and separates unlinked and earlier writing. Readiness reports hard-boundary conflicts, tolerance limits, unanswered checks, unknowns/incomplete capture and limited room rather than an unqualified no-blocker claim. These are summaries of entries, not a recommendation or validated assessment.

The existing Markdown export carries schema version **2**, Q01–Q69 definitions, exact raw writing, scopes, saved quote versions, reuse/switch states, boundary snapshots/history, legacy path associations and source/Driver IDs. Q45 is version 2; Q41 reflects focal-choice wording. Q66/Q67 add boundary compatibility and optional detail; Q68/Q69 are the two reflection actions. Inventory: **69 cumulative records, seven retired counterfactual families, 59 active input families and three actions**. The scientific register remains **33 families / 52 sources**. Repeated quotes and readable/structured representations are the same evidence.

Review-policy version 2 clears What Matters, Stress Test and Drivers marks once for older saves, in addition to any independently needed older migrations. Answers, section identities and saved locations remain. Further edits clear affected current reviews; merely navigating, choosing a destination or opening a reflection group does not.

Validation: ten suites (the previous nine plus `tests/whole-flow.cjs`), syntax and whitespace checks pass in simulated document/storage and actual consequence finish/reopen closures. Cases include source-switch undo/reload/re-edit/move, historical-reuse undo/restoration/shared groups, old-state migration without inference, raw export scopes/IDs, boundary staleness/history, warnings, independent stakes and navigation. Live-browser visual/mobile/keyboard, screen-reader and comprehension checks remain pending. These checks do not validate psychological interpretation.

Optional ordinary-future-life prompts (G07), extra source forms/scales, full alternative comparison and broad longitudinal dashboards remain for later review. The LLM interpretation playbook and its evaluation remain separate future work.

## 2026-10-16 — Review connections and revised approaches

Build `20261016-review-connections` distinguishes the first pass from later edits. Current writing flows into Drivers without a change warning. After an existing assessment's direct source or explicitly selected Reversibility dependency changes, only the affected driver asks **Does your assessment still fit?** with **Keep my assessment / Change my assessment**. Neither action requires a separate visit or acknowledgement in Reversibility. Ratings, grouping and quoted writing remain intact.

Reversibility offers optional, narrative-specific **My explanation relies on this answer** links. The static tool does not infer these dependencies. Overview presents the current route or lasting commitment, an explicitly provisional/adopted adjustment and expandable supporting context. Written Reversibility notes also appear with the information needs, labelled as notes rather than automatically counted tasks. **Review Reversibility checks** opens the correct local stage.

**Use this approach** opens editable confirmation. Adopting a revision preserves exact earlier action/answer snapshots and driver values, clears prior review marks and offers earlier-answer review on the Decision page. Ordinary direct edits also preserve an earlier approach once other thinking exists, with one revision per edit session. Existing answers stay prefilled. There are no Return to page shortcuts; the sidebar and ordinary forward controls handle navigation.

Schema 2 and the 77 numbered prompt definitions remain stable. Supplemental action records carry selected dependencies, assessment-basis/acknowledgement history, historical approach snapshots and pending section reviews. Unknown original capture times remain unknown. Copies and historical versions of the same answers are not independent current evidence. The prior three-action inventory refers to numbered actions, not all workflow controls.

Validation: twelve regression suites, JavaScript syntax/whitespace checks and parsed-production-DOM checks pass. New coverage is `node tests/review-connections.cjs`. Live-browser layout/mobile/keyboard, screen-reader and comprehension checks remain pending.

### Typography refinement · 18 October 2026

The [UI/UX Playbook 1.1.0](docs/CLARITY_UI_UX_PLAYBOOK.md) assigns one shared size, weight and line height to each content role across all 12 pages. Main questions use 18px semibold, user writing 16px regular, and compact labels 14px semibold with separate answer text. Supporting guidance uses 14px regular. Overview distinguishes missing/review work under **Things to finish or review**. [Audit and validation](docs/TYPOGRAPHY_AUDIT_2026-10-17.md).

### Consistent content order · 18 October 2026

[Playbook 1.2.0](docs/CLARITY_UI_UX_PLAYBOOK.md) standardizes page title → description → decision aim/life-direction references → task content. Within writing groups, use question → guidance/context → example → answer. Existing examples remain local to their questions; full samples stay outside writing fields. [Implementation and validation](docs/CONTENT_ORDER_2026-10-18.md).

### Surface spacing correction · 18 October 2026

[Playbook 1.2.2](docs/CLARITY_UI_UX_PLAYBOOK.md) enforces internal space inside filled and framed components with shared inset tokens. This corrects consequence headers/editors, choice context, Driver selection controls, dropdown-arrow insets and expanded guides while preserving typography and native control behavior. [Audit and validation](docs/SURFACE_SPACING_2026-10-18.md).

Transparent text actions also retain 8px vertical and 12px horizontal padding inside their own button bounds, including the keyboard focus outline. [Button-spacing correction and validation](docs/BUTTON_SPACING_2026-10-18.md).
