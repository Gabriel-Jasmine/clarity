# UI/UX Playbook rollout — 17 October 2026

Build: `20261017-ui-playbook` · Standard: [UI/UX Playbook 1.0.0](CLARITY_UI_UX_PLAYBOOK.md)

The product owner accepted the full component mock and explicitly authorized updating the product, playbook and both repositories. This rollout replaces the previous serif/dither presentation across all 12 sections.

## Implemented

- Soft ivory canvas, greyish ivory supporting surfaces and ivory-white writing fields.
- Locally bundled Manrope variable font and licensed Lucide outline-icon sprite.
- Dark rounded sidebar; pink current-page labels/icons/marker.
- Independent reviewed-state badges: 12px soft-green circles with centered 10px checks in a fixed 14px status column. Current reviewed sections display both pink navigation and a green badge.
- One persistent 2px charcoal frame around each page's primary workspace. Drivers frames the whole right editor area; the reference library remains neutral.
- Rounded fields, pill actions, pink selection states, honey examples, neutral reference guides and blue Overview information needs.
- Stronger functional field borders, visible light/dark focus treatments, skip link and heading focus after sidebar/whole-page Continue navigation.
- Mobile section menu, stacked workspaces, readable writing fields and footer actions in normal flow.
- Public canonical playbook, contributor rules and [shared-style component showcase](../design/component-showcase.html).

Existing page geometry and conditional layouts are retained where useful. The old global theme is replaced; page layouts refer to shared semantic colors rather than a second set of hex values.

## Functional boundaries

`capture.js` and `reversibility.js` are unchanged. The `app.js` changes are limited to icon/navigation presentation, an Overview styling hook and navigation focus handling. Questions, page/field identities, section order, reviewed-state rules, grouping, assessment values, source relationships, migrations, localStorage key, saved answers and schema-version-2 exports remain unchanged. No AI integration, recommendation, psychological inference or new scoring is added.

## Validation

- All 12 existing dependency-free regression suites pass: advocate, drivers, integrity, judgment-contexts, judgment-examples, judgment, reversibility, review-connections, social, stress, timing and whole-flow.
- JavaScript syntax checks pass for `app.js`, `capture.js` and `reversibility.js`; whitespace checks pass.
- Real headless Chromium 138 rendered all 12 pages at viewport widths 1440, 1024, 768, 390 and 320 CSS pixels: 60 views, no page-wide horizontal overflow, one primary frame per page and no page-script errors in that sweep.
- Representative full-page screenshots were inspected for Decision, Drivers, Stress Test and narrow Reversibility. A filled Driver view exposed a title/remove layout issue; its shared grid was corrected and rechecked.
- Browser interaction checks cover mobile menu opening/closing and page selection; Reversibility writing retained across trail changes and reload; Driver name/direction interaction and reload; keyboard sidebar activation; heading focus after navigation; loaded local font/icon assets; exact completion circle/check dimensions and centering.
- The shared-style showcase is checked at four widths with no page-wide overflow; its unknown toggle preserves writing.
- Calculated contrast pairs and their intended roles are recorded in the playbook. The darker field border replaces the mock's low-contrast required field boundary.

Browser checks used the local source served through browser request routing. They verify this implementation in that browser; they are not a claim that every device or assistive technology was tested. Screenshots and browser tooling are QA-only and are not production dependencies.

## Remaining validation

- Full screen-reader testing and formal WCAG conformance review.
- Safari, Firefox, actual iOS/Android, forced-colors and text-spacing verification.
- Long real-world decisions, very large reflection libraries, alternate writing scripts and user comprehension testing.
- Visual confirmation of the published GitHub Pages deployment after the deployment finishes.

These remain open explicitly. Earlier notes describing browser QA as outstanding remain historical; this record establishes the limited Chromium checks completed for this rollout without closing unrelated usability or psychological-validation questions.

## Maintaining the standard

Read the playbook before UI changes. Reuse the tokens in `styles.css`, update the showcase for new states, and update the playbook only when a rule changes. The private notes hold decision history and pending validation; do not maintain a separately editable duplicate of the playbook there.
