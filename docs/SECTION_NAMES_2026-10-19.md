# Approved section titles and icons — 19 October 2026

The owner subsequently refined the first title to **The Decision** and restored **Reversibility**, explicitly applying both changes to navigation and page headings. Icons and section functions remain unchanged.

Build `20261019-section-names`; UI/UX Playbook 1.6.0. The owner approved the complete naming/icon set and explicitly authorized the GitHub update after reviewing the sidebar mock. This supersedes earlier section labels in current user-facing presentation; dated design/research records retain their original terminology.

## Approved order and mapping

| Earlier section name | Approved title | Approved icon |
| --- | --- | --- |
| Decision | The Decision | message-circle-question |
| What Matters | Things Dear to You | gem |
| Trade-Offs | The Trade-Offs | scale — original balance scales restored |
| Incentives | Carrot on the Stick | carrot |
| Compounding | What Compounds | sprout — retained |
| Further Consequences | The Domino Effect | domino-tile — two tiles, one leaning against the other |
| The Devil’s Advocate | The Devil’s Advocate | messages-square — retained |
| Stress Test | Wiggle Room | expand |
| Reversibility | Reversibility | reverse-card — opposing reverse arrows on a card |
| Decision Drivers | Decision Drivers | layers — retained |
| Judgment Check | Tricks of the Mind | ghost |
| Decision Overview | Decision Overview | map — retained |

Titles use title case, including lowercase short articles/prepositions within a title. The first title is singular **The Decision**. Preserve the owner's exact **Carrot on the Stick** and **Reversibility** wording. The guide title **How Clarity works** is outside the twelve sections and is unchanged.

The owner later approved **The Trade-Offs** in place of the earlier Cost of Yes title, with the original `scale` balance-scales symbol restored. This neutral title leaves the decision open. Navigation, page headings, guide and current source/export labels use this name; question wording, IDs, saved writing and assessment meanings are unchanged.

## Presentation and asset scope

The existing dark sidebar, 16px outline icons, Manrope type, widths, insets, independent pink current state and green completion state remain. What Compounds retains its existing sprout. The Devil’s Advocate, Decision Drivers and Decision Overview retain their icons. The Domino Effect uses two pip-marked tiles, one upright and the other leaning against it. Reversibility uses the approved card outline with opposing reverse arrows, without a brand logo.

The original locally bundled Lucide sprite geometries and license remain. Six additional unmodified geometries come from the installed `lucide@1.8.0` package. `domino-tile` and `reverse-card` are original owner-requested custom geometry. All use the same local sprite/currentColor mechanism; no remote icon service or runtime dependency is added.

Names/icons are coordinated across tool and guide navigation, page headings, forward/review actions, current reflection/source headings, current report/export headings and exported display metadata. The component showcase and asset documentation reflect the approved set. Icon/script version query strings request the new assets without changing routes.

## Compatibility and meaning

Section IDs/order, `clarity-v1`, stored field/source IDs, exact writing, saved source snapshots, open reflection-group keys, review rules, assessment meanings, question definitions and previous definitions, and schema 2 remain unchanged. A display-only alias function maps original section keys to approved titles without rewriting stored provenance or triggering a review migration. Explicit historical headings may retain former names. Question-definition versions do not change because question wording has not changed. Application-build metadata advances to identify this release.

The underlying mental models, psychological mechanisms, evidence register and scientific limitations remain unchanged. A metaphorical title does not establish a bias, verify reversibility or recommend an action. The decision/action language contract continues to govern questions and writing.

## Validation completed

- All 14 existing dependency-free regression suites pass. Only existing assertions that explicitly name renamed presentation labels were adjusted.
- JavaScript syntax checks pass for the changed application scripts.
- A targeted baseline/new-build comparison verifies exact saved state and writing across all twelve rendered sections, exact current/previous question definitions, original open-group keys, approved guide destinations/icons, preserved original glyphs and both custom card assets.
- SVG structure and original-symbol preservation checks pass; each used icon resolves to one unique symbol. The approved domino symbol has two tile rectangles and the leaning transform.
- The owner reviewed the sidebar mock with the agreed icons, title case and singular opening title before authorizing publication.

A fresh live-browser layout/keyboard/accessibility pass was unavailable in this execution environment because its Chromium binary is absent. The automated DOM/storage checks are not visual-browser validation. Existing responsive CSS is unchanged. Deployment status must be verified separately from successful GitHub publication.
