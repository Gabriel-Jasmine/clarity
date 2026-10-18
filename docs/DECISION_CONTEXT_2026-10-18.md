# Shared decision context — 18 October 2026

Owner-approved presentation correction, following review of the current-interface mock. Playbook 1.5.1; asset build `20261018-decision-context`.

## Scope

- One neutral reference box directly after the section description, outside the charcoal question/task frame.
- **You’re considering** spans the first row; **Aim for this decision** and **Direction in life** share the second row on desktop and stack at 760px and below.
- Reuse the current neutral surface, radius, 16px internal inset, 14px/600 labels, 16px/400 writing and padded Edit controls. Existing Edit destinations remain Decision and What Matters.
- Remove separate/duplicate reminders inside Trade-Offs, Incentives, Compounding, Further Consequences, The Devil’s Advocate and Stress Test; replace the duplicate action reminders in Reversibility and Decision Drivers.
- Decision collects the information and has no repeated reference box. What Matters shows the existing action and aim while collecting life direction. The Overview report retains its own standalone decision heading.
- Update the same reference component in the developer showcase. Guide changes are limited to its stylesheet cache version.

No other questions, guides, examples, controls, sidebar treatment, typography, colors, report content, assessment logic, review rules, stored data, source identities or export schema are changed. The homepage, illustrations, URLs and navigation destinations are unchanged.

## Verification

- All 14 existing regression suites pass. The Stress Test presentation assertion now checks for one shared box before its workspace and no duplicate inner context; all its functional assertions remain.
- JavaScript syntax checks and `git diff --check` pass.
- Chromium comparisons against parent commit `09e677f0c7870b7c991614efdb2e3e7aa0d684fd`: 216 section/state/width scans (12 sections × empty/written/unknown states × 1440, 1024, 768, 760, 390 and 320px).
- Task markup is identical after excluding the replaced reference components. Unrelated computed styles, stored decision data and structured export text are identical to the parent for every scan.
- Exactly one charcoal task frame, one shared box on each applicable page, correct reading order, shared typography and insets, expected unknown-state text, no horizontal overflow and no browser errors or missing assets.
- Keyboard activation of all three Edit controls reaches the existing source section and preserves writing. Mobile Menu/section navigation preserves reviewed state.
- Guide and showcase remain readable at phone width and do not change stored decision data. Desktop and phone Incentives screenshots visually inspected.

These checks cover the scoped presentation correction. They are not a claim of complete accessibility conformance or user comprehension testing.
