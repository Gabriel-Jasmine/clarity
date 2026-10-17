# Text-button spacing correction

Date: 18 October 2026 (Asia/Singapore)
Playbook: 1.2.2
Build: `20261018-button-insets`

## Finding and correction

The owner reported cramped Edit buttons on Further Consequences and Decision Drivers after the surface-spacing release. The remaining defect was in shared transparent actions: `.reference-edit` retained 4px side padding, while `.edit-link` and `.add` retained 0px. A keyboard focus outline exposed the cramped button bounds even though the surrounding panel had comfortable padding. The earlier painted-surface scan did not inspect transparent button bounds; its passing result did not cover this case.

Use the existing compact-control tokens on `.add`, `.edit-link`, `.reference-edit` and `.consequence-text-action`: **8px vertical / 12px horizontal**. Remove later zero/4px and top-zero overrides. Consequence actions retain their existing 44px minimum height; coarse-pointer targets retain their existing 44px rule. Driver activation already uses the same 8px/12px inset. Preserve the native keyboard focus outline. Icon-only controls and navigation stages retain their separate centered/compact roles.

The playbook and contributor instructions explicitly include transparent button bounds and focus outlines. The component showcase now includes Edit, Review, Add and Show more actions using production styles, with instructions to inspect keyboard focus.

## Verification

Chromium inspected all 12 pages at 1440, 1024, 768, 390 and 320px with fictional populated writing and expanded disclosures: 60 page/width views and 415 visible text-button measurements. Every visible affected action was checked in default, hover and keyboard-focus states against both computed padding and rendered text bounds. No compact-action inset violations, page errors or page-wide overflow were found. Desktop and 320px focused Edit screenshots were inspected.

Keyboard Enter activates reference Edit on both reported pages, preserving the existing choice text at its destination; Driver targeting updates correctly at desktop and 320px. The separate 320px long-consequence test passes Show more/Show less, Edit focus, retained writing and re-compaction. The showcase passes desktop/390/320px layout and editor focus checks. All 13 existing regression suites and whitespace checks pass.

Production application, reversibility and capture JavaScript are unchanged. This correction changes presentation and design documentation only. These are Chromium fixture checks, not a claim about every possible string or a full cross-browser/accessibility certification. Publication and deployment evidence is recorded in the private product notes.
