# Text spacing inside framed and filled components

Date: 18 October 2026 (Asia/Singapore)
Playbook: 1.2.1
Build: `20261018-surface-insets`
Status: correction requested and authorized by the product owner. Publication/deployment evidence is recorded in the private product notes.

## Finding

The supplied screenshot showed a genuine zero-inset header in Further Consequences. A theme rule gave several existing layout rows a filled background and rounded corners without adding corresponding padding. Completed consequence headers, active consequence editors, The Devil's Advocate choice context and the Driver destination control could place text directly against an edge. Expanded Reversibility guides also left about 2px below the final text line, despite adequate horizontal spacing.

The audit uses fictional pottery-studio writing. The user's screenshot writing is not reproduced.

## Correction

- Shared semantic inset tokens: primary workspace 24px desktop / 16px narrow; supporting panel 16px; compact header row 8px vertical / 16px horizontal; compact text control 8px vertical / 12px horizontal.
- Add padding in the same rule that introduces a filled surface. Main framed Driver editing workspace now uses the same primary inset as other workspaces; supporting context/reference/report panels share the supporting-panel inset.
- Pad consequence summary headers and active editors, and align saved-answer text with the header inset. Hoverable Edit/Show more actions receive horizontal padding. Preserve the two-line clamp by keeping added vertical spacing outside the clamped paragraph.
- Add comfortable padding to The Devil's Advocate choice context and the Driver destination control.
- Give expanded Reversibility guides a 16px bottom inset; preserve closed-summary targets and avoid double bottom margins.
- Native dropdowns use the bundled Lucide chevron with a 12px right inset, 16px icon and 44px text-end reserve. Driver assessment controls wrap when needed. Native select behavior, focus and keyboard operation remain; forced colors restores the browser arrow.
- Retain smaller status badges, centered icon-only controls, field padding, existing typography, native focus and control semantics.
- Update the production-style showcase with the collapsed consequence header and editable state; document the shared rule and contributor checks.

## Scope and compatibility

This is a stylesheet/presentation correction. Application questions, examples, captures, saved writing, assessment/completion logic, source/history semantics and exports are unchanged. No application behavior or intelligent-layer changes are introduced.

## Verification

Chromium measured rendered text bounds relative to filled/full-border surfaces on all 12 pages at 1440, 1024, 768, 390 and 320px (60 views), with populated fictional answers and expanded disclosures. Five additional consequence-editor views and ten Reversibility/hover state views cover conditional states: 75 surface scans total. No remaining edge-contact findings, page-script errors or page-wide overflow were observed in these fixtures. Before/after and representative mobile screenshots were inspected.

A separate 320px long-answer check verifies Show more/Show less, Edit focus, retained text and re-compaction after the padding change. A follow-up review measures dropdown arrow position, text reserve and Driver value fit across all 12 pages at five widths (60 additional views), with no placement violations, clipped Driver values, page errors or page-wide overflow. Native keyboard selection works; forced colors restores the browser arrow; the local chevron asset loads successfully. All 13 existing regression suites, JavaScript syntax and whitespace checks pass.

The scan is implementation evidence for the reviewed fixtures, not a proof about every possible string, a full accessibility certification or a cross-browser/device test. Existing broader validation follow-ups remain open.
