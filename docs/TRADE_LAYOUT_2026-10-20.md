# Trade-Offs layout alignment

Date: 20 October 2026 (Asia/Singapore). Build `20261020-trade-layout`. UI/UX Playbook 1.8.1.

## Approval and scope

The owner identified an unexplained horizontal line and excess space before the first Trade-Offs question. They reviewed the proposed complete page structure and explicitly authorized updating the Trade-Offs page to align with it. Implementation is limited to this page and its reference documentation. The latest Thinking guide release is retained.

## Cause

The old `.trade-cost-section` rule gave every section a 34px top margin, 28px top padding and a top border, including the first section immediately inside the workspace. It introduced a separator without preceding content. The page also inherited the wider 1184px screen limit and older card padding overrides instead of the standard writing-column proportions.

## Implemented structure

Page title and progress → page description → one shared decision-context box outside the task frame → one question frame → existing navigation.

- The title/header, progress, screen (including introduction/context/frame) and footer share an 880px maximum, aligned to the same leading edge. A screen-only ancestor selector activates this layout only when the screen directly contains the Trade-Offs frame. It automatically stops applying on other sections. Print layout remains separate.
- The frame uses the existing workspace inset token: 24px on desktop/intermediate widths and 16px below 760px. The older global 28px/20px rules are not changed for other pages.
- The first group starts at the normal frame inset, with no leading separator or extra section margin/padding. Later actual groups receive a thin divider with 32px above/below. Immediate/future writing groups follow the same separation; the first cost question follows its guide without a redundant top margin.
- Question/helper spacing uses the shared 8px/16px roles; the section title uses its existing 22px/30px role. The guide introduction remains 12px above the closed Thinking guide.
- The expanded Trade-Offs guide explicitly preserves its 16px side/bottom insets, avoiding a later global guide-page class collision. Other guides are not restyled.
- Alternative rows use a number / flexible input / Remove grid. At 440px and below, Remove moves below the input, with no legacy left-margin offset. Existing Add/Remove actions are unchanged.
- Cost fields retain 180px initial height and native vertical resizing on narrow screens too. Remove the older forced 270px mobile height. The footer note follows with normal spacing, without an extra decorative separator.
- The existing complete seven-area Thinking guide and both Example disclosures keep their current wording, order, native independent behavior and initial closed state. The Guide title remains **Thinking guide**, as approved in the later guide release; the earlier page mock’s contextual title is inside the disclosure.

No question, example, selection, assessment, saved writing/history, source identity, review state, application script, capture definition or export schema changes. The stylesheet cache key changes on the working tool and component showcase. The showcase includes the actual blank Trade-Offs task markup as a spacing specimen; it does not seed production answers.

## Verification

All 15 existing regression suites pass. Whitespace checks pass. Targeted source/DOM checks verify unchanged application scripts and question/export/data contracts, current guide/example text and closed states, correct group order, one main task frame, normal first-group opening and scoped CSS changes. The underlying first-question problem is removed at its section rule rather than hidden by moving content.

No usable browser executable is available in this runtime. A Playwright browser download returned an invalid archive, so fresh computed-layout desktop/mobile, native keyboard/touch and assistive-technology checks could not be performed. Source/DOM verification and the owner-reviewed mock are not browser/accessibility certification.

Publication and actual status: [private release record](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/reviews/2026-10-20-trade-layout.md). Hosting deployment must be distinguished from the GitHub branch update.
