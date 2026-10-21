# A compact Other affected area

Approved 21 October 2026. Build `20261021-affected-other`.

The owner selected **Inside the option** from three working mockups. Add **Other** only to the third question in Things Dear to You, **Which of these could be meaningfully affected if you do this?** The existing nine areas remain available independently of the top-three life priorities. No None or uncertainty response is added by this approval.

## Interaction and presentation

Other is an independent native checkbox, initially unchecked. Selecting it reveals one labelled single-line input inside the same pink selection tile, below its checkbox row and aligned with its text. Use **Please specify** and **Name the area…**. The input retains the shared 16px writing role, 44px minimum height, visible native focus and role-based insets. Keep the current grid and page layout. The checkbox label does not wrap the text input.

The reveal changes local visibility and disabled state without replacing the selected checkbox or unrelated writing nodes. Deselecting hides the field and retains the exact draft, including across reloads. Reselecting restores it. Hidden writing does not become current evidence or a visible history prompt. Specifying an area is required when Other is selected; a specified Other may be the only affected area. Top-three priority selection is unchanged.

## State, review and export

Store `other` in the existing `stakes` list and the exact writing in additive `stakesOtherText`, defaulting to an empty string for older saves. Normalize stakes against all nine life domains plus Other, rather than filtering them against the person's top-three priorities. This also corrects the old reload filter that could remove an independently selected affected area.

Only selected Other writing participates in the Things Dear to You review snapshot. Active edits or selecting/deselecting Other invalidate that section's review; an inactive draft change does not. Existing Driver/source rules remain unchanged. Affected areas are contextual answers, not automatically generated Drivers.

The visible Overview and readable AI context include selected Other writing. If selected but empty, the review displays **Other — [Not specified]**, and the section remains incomplete. Deselecting excludes the draft from the readable current answer. Capture schema stays at version 2. Q07 retains its prompt/version and gains area response labels. Add Q78 **Please specify**, with its Other-area context, correct section and conditional active/required states. A deselected draft appears only as an explicitly inactive retained capture record.

## Verification and existing limitations

- `tests/affected-areas.cjs` passes selection, only-Other completion, escaping, exact writing restoration/reload, independent area persistence, active/inactive capture and review invalidation.
- JavaScript syntax checks and `git diff --check` pass.
- All 16 existing/new regression suites were attempted: 12 pass; four fail at the same assertions on the baseline with the minimal function restoration below: `drivers.cjs`, `reversibility.cjs`, `review-connections.cjs`, `whole-flow.cjs`. The failures concern changed-source Driver presentation/review and optional Reversibility controls, not the Other field. They remain unresolved; this release does not claim a fully passing suite.
- The original baseline has a malformed comment containing literal backslash-n sequences immediately before `activeDriverSources`. That comments out the function and causes a ReferenceError when relevant Drivers are loaded. Restore actual newlines to make the existing function executable; do not alter its body or source-eligibility policy. Baseline comparisons above include only this restoration, before the Other changes.
- Browser layout/keyboard testing was attempted, but no Chromium executable is installed and the browser download returned invalid archives. No real-browser visual, keyboard, assistive-technology or live-hosting verification is claimed for this release. The feature needs those checks when a browser environment is available.

The component showcase includes the interactive selected/empty specimen and allows checking its collapsed and restored states. No production answer is prefilled. Public homepage, unrelated questions and assessment meanings are unchanged.
