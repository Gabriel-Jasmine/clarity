# Clarity typography audit — 17 October 2026

Status: reviewed and approved for publication on 18 October 2026. Playbook 1.1.0 / build `20261018-typography`. Deployment outcome is recorded in the private product notes after publication.

Baseline: public application commit `a4e251685a5da14de48cbe7954f8f2c29edfa749`, adopted playbook 1.0.0. The review uses the user's two screenshots plus source inspection and rendered desktop/narrow views of all 12 pages. Test writing is fictional; the user's private decision is not reproduced in examples.

## Finding

The rollout unified palette and shapes, but did not enforce all of the written type hierarchy in the actual components. The same main-question role appears at 14px/600 in some generic fields and at 18px/600 in dedicated question components. Several context labels inherit 16px/400, the same style as user writing. Reflections are reduced to 14px in Drivers but appear at 16px in Overview. Overview introduces 26px, 18px and 16px heading treatments without consistently assigning their roles.

The screenshot's Outcome, Money and Check whether this choice respects labels are concatenated into the same plain-text strings as their values. A CSS-only change cannot distinguish them safely. The correction uses known field data to render labels and values separately, preserving stored writing and export strings. It does not split arbitrary writing at punctuation.

## Page-by-page review

| Page | Observed inconsistency | Proposed correction |
| --- | --- | --- |
| Decision | Writing prompts at 14px; neighbouring choice questions at 18px | All main questions use 18px/600; answers stay 16px/400 |
| What Matters | Life-direction question at 14px; priorities and boundaries questions at 18px | Align primary prompts; distinguish tile names, help and entered boundaries |
| Trade-Offs | Main questions already near the target; supporting labels and response controls use inherited styles | Preserve 18px questions, standardize answer values, helper text and context labels |
| Incentives | Main questions already 18px; checkbox response text and other pages' options differ | Preserve question role and standardize answer-choice values and helper labels |
| Compounding | Main questions already 18px; Your reflection label and guide/table hierarchy differ | Keep main questions 18px; writing label 14px/600; writing 16px/400 |
| Further Consequences | Nested titles and questions rely on tag defaults; later-node prompts inherit body type | Keep section titles at 22px, direct questions at 18px and recorded chain writing at 16px |
| The Devil's Advocate | Main questions correctly 18px; choice-context labels inherit body size; combined source text loses label roles | Context labels 14px/600; separate Outcome/connection labels when shown elsewhere |
| Stress Test | Context labels are 16px/400 like values; condition names and descriptions lack a reliable distinction | Labels 14px/600, row names 16px/600, descriptions 14px/400, user notes 16px/400 |
| Reversibility | Opening main question at 14px while stage questions are 18px | Opening and stage questions 18px/600; subordinate fields 14px/600; narrative values 16px/400 |
| Decision Drivers | Reflection text at 14px versus 16px elsewhere; saved combined sources have no separate label styling | Preserve source writing at 16px; label known fields separately; keep metrics compact |
| Judgment Check | Dedicated questions already 18px but controls and status/helper text differ from other pages | Preserve questions, normalize choice and helper roles, retain conditional behavior |
| Decision Overview | 26px hero, 18px sections, 16px subheadings, flattened labels and bold personal boundary writing | 22px section titles, 18px subheadings, 14px field labels and 16px regular answers; structured pending rows |

## Adopted type contract

| Role | Desktop size / line-height | Weight |
| --- | --- | --- |
| Page title | 30 / 38px | 700 |
| Section/panel title | 22 / 30px | 700 |
| Main question / subsection heading | 18 / 28px | 600 |
| User writing / answer value | 16 / 26px | 400 |
| Entity/category name | 16 / 26px | 600 |
| Context, report or compact field label | 14 / 22px | 600 |
| Help/example/status explanation | 14 / 22px | 400 |
| Metadata | 12 / 18px | 400–500 |

Only page titles reduce to 26/34px on narrow layouts. Keep reading and writing text at 16px, and let components wrap or stack. Use one shared family; distinguish roles using weight, space and line height.

## Completion-card wording

Replace **Still to complete** with **Things to finish or review**.

The list combines two conditions: questions not answered and answers not yet reviewed. It is separate from unresolved information about the decision. Example display:

- What Matters — Review your answers in this section. — Review
- Reversibility — Some questions haven’t been answered yet. — Review

Keep the existing missing/reviewed conditions and actions. Change the on-screen description rather than introducing a new completion policy.

## Implementation

- Central type-role tokens and a single role-assignment section replace competing size/weight/line-height declarations.
- Explicit main-question roles correct generic field prompts without enlarging compact Importance/Evidence labels.
- Structured report fields separate known system labels from their values. Raw source snapshots and arbitrary user text retain exact wording, including colons and markup characters.
- Narrative boundary writing in Overview is regular body text rather than a bold title.
- Pending rows separate section names, explanations and the Review action.
- The component showcase and adopted playbook 1.1.0 include the revised roles.

## Verification scope

Computed styles were measured on all 12 pages at 1440, 1024, 768, 390 and 320 CSS-pixel widths using fictional filled answers: 60 page/width views, no page-script errors and no page-wide horizontal overflow. Main question selectors measured 18px/600, and writing/select fields measured 16px/400 without role violations in the audit. Targeted checks cover the opening question, compact labels, user-writing sizes, report label/value separation and the pending section. All 12 existing regression suites pass, along with a focused presentation test for escaping, raw colons, retained snapshots and unchanged data/export/completeness results. Nine additional Reversibility branch/width views (three trails/stages at 1440, 390 and 320px) also passed script-error and page-overflow checks.

These measurements and screenshots are implementation evidence, not a claim of full accessibility conformance. The user approved the typography direction and final “Things to finish or review” wording before authorizing publication. Screen-reader, other-browser/device and user-comprehension checks remain open.
