# Working on Clarity

Current section labels/icons are defined in [Approved section titles and icons](docs/SECTION_NAMES_2026-10-19.md). Use their exact title case and singular **The Decision**. Preserve internal section/source/group keys and historical quotations; use the display aliases rather than migrating saved state for a label change.

Before UI work, read [the UI/UX Playbook](docs/CLARITY_UI_UX_PLAYBOOK.md) and the relevant current product/language decisions. The playbook is the canonical design standard; the private product-notes repository records rationale and history.

Before any question, copy, example, synthesis or AI work, read [Decision language and framing](docs/DECISION_LANGUAGE.md). “Decision” names the overall matter; “this / doing this / if you do this” refers to the concrete action under consideration. The opening is “What decision are you trying to make?” with the external starter “I’m deciding whether to…”. Preserve one-action scope, action-only storage, raw existing writing and historical prompt/source wording. Do not reintroduce “make this choice”, infer commitment or claim alternative comparison.

- Reuse the semantic tokens in `styles.css` and established components. Keep pink for selection, green for completion, blue for Overview information needs and honey for optional guidance.
- Use one 2px charcoal structural frame per page's main working surface. Keep navigation completion badges small and independent of current-page selection.
- Give filled/fully framed text surfaces and all text-button bounds (including transparent actions and their focus outlines) explicit internal padding using the shared `--cl-inset-*` role tokens. Check collapsed, active-editor, expanded, selected, hover and narrow states; outer margins do not replace inner padding.
- Preserve approved questions, section IDs/order, assessment meanings, saved answers, source identities, current/inactive/history distinctions and export schema unless functional changes are separately authorized.
- Do not prefill production decisions with showcase samples. Use generic fictional examples in design references.
- Update `design/component-showcase.html` when adding components/states. Update the playbook only when a design rule changes; record meaningful changes and actual rollout status in the private notes.
- Run appropriate existing regression suites: `for test in tests/*.cjs; do node "$test" || exit 1; done`. Run syntax checks for changed JavaScript and `git diff --check`.
- Verify layout and keyboard behavior in a real browser when possible. DOM/storage tests do not establish visual quality, accessibility conformance or user comprehension. State checks that remain outstanding.
- Keep locally bundled font/icon licenses with their assets. Production should not require a remote icon script.
- Do not publish or push changes without authorization in the task. Continue within authorization already given; routine reversible implementation choices do not require repeated approval.

