# Consistent page descriptions and local examples

Date: 18 October 2026 (Asia/Singapore)
Playbook: 1.2.0
Build: `20261018-content-order`
Status: implementation authorized by the product owner; publication outcome is recorded in the private product notes.

## Shared order

**Page title → page description → existing decision aim/life-direction references → task content.** Each page has exactly one introduction at the start of its content area. It explains the purpose before personal context anchors the task. The shell keeps its existing progress/save indicators. Descriptions use the shared 14px/22px regular style.

**Question → relevant guidance/context → example → answer field → existing answer-state controls/status.** Examples remain local to the question they support. Existing disclosures and conditional visibility stay intact. Compact input labels may remain beside their field after a larger group question. Examples are never prefilled or saved as answers.

This standard does not require adding examples to report sections or context references to pages that are still collecting that context.

## Application by page

| Page | Description and example placement |
| --- | --- |
| Decision | Brief orientation added; existing opening sample shown above the answer instead of only in its placeholder; timing examples already follow question/help/answer order |
| What Matters | Brief orientation added before the existing aim reference; stage prompts and boundary starters remain local |
| Trade-Offs | Existing description in the shared opening position; immediate/future examples moved from placeholder-only samples to persistent above-field examples |
| Incentives | Existing description moved before aim/life direction; all three examples moved from after answers and controls to before their fields |
| Compounding | Existing description before context; question/help/example/answer groups preserved |
| Further Consequences | Both existing main-description paragraphs moved before references; first-change and branch examples remain before their related writing |
| The Devil's Advocate | Both existing introductory paragraphs moved before context; bakery-example context and local examples retained |
| Stress Test | Existing main description in the common opening position; local reflection example remains between guidance and answer |
| Reversibility | Existing main description moved before references; direct writing labels now precede helper/example/answer, with explicit native label associations |
| Decision Drivers | Existing description moved before references; expectation-basis example stays before writing |
| Judgment Check | Existing main description moved before references; conditional follow-up examples remain before their respective answers |
| Decision Overview | Brief orientation added before references/report; no artificial answer examples added to the report |

## Compatibility

Main-description and example wording already present in the product is relocated rather than rewritten. New concise introductions fill the missing Decision, What Matters and Overview orientation. Decision and Trade-Offs keep their exact sample text outside the field; short placeholders now cue writing. Page questions, assessment choices, saved writing, unknown/hidden-answer restoration, source/history identity, completion/review calculations, storage/capture schema and exports are unchanged. The reasoning/intelligent layer is outside this update.

## Validation

All 13 regression suites pass. Changed JavaScript passes syntax checks; whitespace checks pass. Real Chromium checks cover all 12 pages at 1440, 1024, 768, 390 and 320px (60 page/width views), plus nine Reversibility branch/width views. The page introduction is present exactly once and precedes context on every page. Local examples precede the associated writing fields; Reversibility's direct labels precede examples and associate with their answer fields. No page-script errors or page-wide horizontal overflow were observed. Representative desktop and narrow screenshots were inspected.

These are scoped implementation checks, not full accessibility, cross-browser/device or comprehension certification. Existing broader validation follow-ups remain open.
