# Clarity

**For consequential choices that can meaningfully affect your life, work, relationships, or future direction.**

Clarity is for consequential choices that can meaningfully affect your life, work, relationships, or future direction — especially when there is no obvious right answer and each path comes with different trade-offs, uncertainties, and consequences.

It guides you through the decision so you can understand what your choice is really based on, what is driving it, and what you still need to know before you commit.

Clarity does not tell people what to choose. It helps make the structure of their own reasoning visible.

## What Clarity guides you through

1. State one choice under consideration, the decision aim, starting leaning, and consequence horizon
2. Zoom out from the immediate choice, surface the life the user wants to build or protect, identify what matters most within that life, then bring the decision back in to identify what is at stake and define any hard boundaries
3. Consider realistic alternatives, then describe immediate and future costs across seven areas of life for the choice under consideration
4. Describe the focal choice’s expected gains and relief, then reflect on how those rewards fit the user’s direction in life
5. Use a nine-area practical and psychological guide, then describe what the focal choice could develop, reinforce or make harder to sustain over time
6. Follow further consequences of the focal choice through a possible benefit and a possible difficulty, using automatic causal prompts, compact earlier answers and “That’s it” to finish
7. Invert the decision by identifying what would make it fail to achieve the intended outcome
8. Stress Test each option against the same less-favourable conditions and identify where there is least room for things going wrong
9. Run a decision-level Judgment Check using counterfactual tests, with extra checks only when earlier answers make them relevant
10. Test reversibility and switching costs
11. Consolidate the few Decision Drivers that genuinely drive the decision, assessing each once by direction, importance, and evidence
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

The remaining page audit is recorded as SC-07 in the product notes’ OPEN_QUESTIONS.md. Compounding is now aligned; Stress Test, Decision Drivers and Decision Overview require substantial follow-up. Other pages need scoped wording or interface alignment; alternative-comparison design and older-save migration remain open.


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
