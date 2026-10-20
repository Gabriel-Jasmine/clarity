# Shared layout rules

Date: 20 October 2026 (Asia/Singapore). Build `20261020-shared-layout`. UI/UX Playbook 1.9.0.

## Authorization and scope

After the scoped Trade-Offs correction, the owner requested an all-page layout audit. It covered Home, How Clarity works and all twelve decision sections, including expanded and populated states. The owner approved fixing the shared layout rules together first. This release implements the reported shared presentation corrections and the agreed page-width mapping. It does not redesign questions, reasoning or interactions.

## Causes and shared implementation

- Earlier `.card,.clarity,.state` padding overrides replaced the workspace token with 28px on desktop and 20px on intermediate screens. Removing them restores the existing 24px token and its 16px below-760px value without page-specific overrides.
- Only three writing screens had an 880px cap, while the header, progress and footer independently used up to 1184px and automatic horizontal margins. The shared `--cl-page-width` now controls every page anchor. It defaults to `--cl-width-writing` (880px); an ancestor selector chooses `--cl-width-workspace` (1184px) for the three specialized sections. The old Trade-Offs-only ancestor rule and separate screen caps are removed.
- Standalone briefing styles reused `.guide-content`, overriding reference-guide padding and imposing an 840px cap inside larger disclosures. The page wrapper is now `.briefing-content`, and its styles are scoped to `.guide-page`. Expandable guides retain `.guide-content` with full available width and 16px side/bottom insets.
- A legacy 950px Menu rule exposed the control while the sidebar was still visible. Removing it leaves the existing below-760px navigation behavior.
- Ordinary question groups now share one separator rule with 32px margin above and padding below the line. Standalone dividers use 32px on both sides. Existing guide-to-task separators remain; no empty opening line is introduced. Trade-Offs keeps its clean first section. The first Overview decision anchor no longer adds 20px beyond the frame inset.

The guide, tool, homepage and component-showcase stylesheet URLs receive the same cache key. The showcase documents the shared roles and retains a deliberately wider specimen canvas.

## Page map

| Page | Maximum content width | Treatment |
| --- | --- | --- |
| Home | Existing editorial proportions | Composition and behavior preserved |
| How Clarity works | 880px | Header/content aligned; shared frame padding; briefing styles isolated |
| The Decision | 880px | Header/progress/task/footer aligned; shared frame padding |
| Things Dear to You | 880px | Same shared anchors and padding |
| The Trade-Offs | 880px | Existing correction retained through shared rules |
| Carrot on the Stick | 880px | Shared anchors, padding, group rhythm and expanded-guide insets |
| What Compounds | 880px | Same shared writing layout and guide/group corrections |
| The Domino Effect | 880px | Current vertical writing flow retained; shared guides and group rhythm |
| The Devil’s Advocate | 880px | Shared writing layout and frame padding |
| Wiggle Room | 1184px | Assessment-table space retained; shared frame/guide/group corrections |
| Reversibility | 880px | Both trails and existing stages retained; shared padding and group rhythm |
| Decision Drivers | 1184px | Existing reference/editor workspace retained |
| Tricks of the Mind | 880px | Header/progress/task/footer aligned; shared frame padding |
| Decision Overview | 1184px | Report space retained; redundant first-block margin removed |

These maxima shrink with the available viewport. All page anchors share the same leading edge. Drivers retains its one signature frame around the right editor, rather than framing its reference library. No extra frame is added to the expectation-basis group. Print report width remains uncapped.

## Preserved contracts

`app.js`, `capture.js`, `reversibility.js`, `navigation.js`, `home.js` and `home.css` are byte-identical to the baseline. The tool/home HTML changes only its stylesheet version; briefing HTML additionally renames the presentation wrapper. Question and example copy, IDs, ordering, conditional controls, saved text/history, assessments, source/review meanings and schema are unchanged. No migration, production prefill, new example or automatic interpretation is added.

## Verification

- All 15 existing regression suites pass; whitespace checks pass.
- 249 rendered Chromium page/state/width snapshots cover all twelve sections, Home and the guide, from 320px to 1920px, with blank/populated writing, open guides/examples, active Drivers and both Reversibility trails/stages. Nine distinct viewport widths are represented across the scans and focused checks.
- Computed-style assertions verify one signature frame per decision page, exact workspace insets, equal header/progress/content/footer width and alignment, full guide insets, shared separator spacing, the page-width mapping and the corrected Overview opening.
- Focused browser checks verify native keyboard guide toggling and visible focus, mobile/tablet navigation on the tool and guide, exact writing after reload, read-only guide navigation, component-showcase reflow and uncapped printed report width.
- No whole-page horizontal overflow, page script error or missing local asset occurs in the tested states. Source comparison confirms unchanged application/data scripts and restricted entry-page edits. Home screenshots are pixel-identical to the baseline at 1440px and 390px. Representative corrected desktop and expanded phone-guide screenshots were visually inspected.

These are Chromium checks with responsive viewports, not physical-device, Safari/WebKit, screen-reader or comprehensive accessibility certification. Hosting deployment is distinct from the verified GitHub branch update. [Publication record](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/reviews/2026-10-20-shared-layout.md).
