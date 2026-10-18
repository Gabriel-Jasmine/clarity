# Homepage title underline — 18 October 2026

The owner supplied a reference with a single straight, solid underline and requested that treatment beneath **Clarity** in the homepage title, using the UI palette's pink shade.

The underline now uses `--cl-pink` (`#EDBDDF`) and native text decoration: solid line, `.14em` thickness, `.03em` offset and no ink skipping. This keeps the line continuous across the word, including the descender, with square ends. The two honey-colored doodle pseudo-elements are removed. The style scales with the existing headline at narrow widths.

The headline wording, copy, CTA, navigation and illustration are unchanged. The galaxy retains its honey accents. The pink title underline is a scoped brand treatment; it does not change working-tool color meanings. The component showcase uses the same class and rule, and Playbook 1.3.2 records the revised treatment.

Validation: all 13 existing regression suites, JavaScript syntax and whitespace checks passed. Chromium checked the homepage at 1440, 390 and 320px: computed solid pink text decoration, no old pseudo-strokes, no page overflow, script errors or missing assets. Desktop and 320px title crops were visually inspected against the reference. Broader browser/device appearance remains unverified. Publication and deployment are verified separately after the source push.
