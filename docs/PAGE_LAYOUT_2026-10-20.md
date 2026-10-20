# Page-specific layout corrections

Date: 20 October 2026 (Asia/Singapore). Build `20261020-page-layout`; UI/UX Playbook 1.9.1.

## Scope

The owner authorized moving on to page-specific fixes after the shared layout release. A deeper inspection of all twelve pages found three reproducible remaining defects on Wiggle Room and The Domino Effect. Other pages retain the shared correction; this release does not claim to have redesigned every page.

## Confirmed defects and corrections

| Page/state | Evidence on the shared-layout baseline | Correction |
| --- | --- | --- |
| Wiggle Room, tablet with sidebar | At 760px/768px, the assessment dropdown had only about 132px/135px for a response whose text needs about 161px. There was no whole-page overflow, but the selected label could still clip. | Name the assessment container and stack its existing table rows when available container width is 600px or less. Keep the desktop table when enough space is available. All five response values, labels, descriptions and row controls remain. |
| Wiggle Room, hard-boundary assessment at 320px | “Conflicts with this boundary” needs about 206px; the native dropdown offered about 194px after its required insets. | Reuse the existing native radio-card component for the same three labels/values, allowing text to wrap. Each boundary has its own fieldset/group. Nothing is selected initially. Clear assessment preserves the former dropdown's blank option. Notes and historical source checks retain their existing behavior; keyboard focus returns to the appropriate radio after rendering. |
| The Domino Effect, open guide on phones | The table already stacked, but the later shared first-column rule still limited each body heading to 38% of the row. | Restore 100% heading width in this page's stacked guide below 601px. Keep the desktop two-column table, all content and the closed initial disclosure state. |

The affected tool and showcase assets receive a cache-key update. The showcase includes the blank wrapping boundary-assessment specimen. Home, briefing, shared page widths, frame padding, typography and other page structures are unchanged.

## Preserved behavior and records

The only application-script changes are the boundary-assessment presentation and its existing UI event binding, including focus/clear handling. `setBoundaryAnswer`, boundary freshness/history rules, notes, stress scoring/completeness, source identities and report/export functions are unchanged. Clearing and reassessing follows the previous blank-selection behavior: a superseded note stays in history rather than being attached automatically to a new assessment. The capture definitions/schema, current and historical prompt text, values `yes` / `no` / `unknown` / blank and assessment meanings are retained. No answer migration, new question, new example or production prefill is introduced.

## Verification

All 15 existing regression suites, JavaScript syntax and whitespace checks pass. A fresh 249-snapshot Chromium pass covers all twelve decision sections, Home and the guide, with populated/expanded states. No whole-page overflow, missing local asset, page script error or clipped static dropdown label appears in those tested states.

Focused before/after browser checks reproduce the original tablet-select and phone-guide defects. Twelve viewport widths (320, 390, 600, 601, 759, 760, 768, 800, 900, 950, 1024 and 1440px) verify panel-based reflow, all five stress responses, full-width stacked guide headings and readable boundary labels. Two independent boundary groups exercise blank initial state, native arrow-key selection and focus, clearing back to blank, conditional note hiding/restoration, exact multiline writing after reload and group independence. Capture records and the readable decision context compare exactly between the old and new application for the same saved state. The showcase is checked at 320px. Representative corrected screenshots are visually inspected.

These are responsive Chromium checks, not physical-device, Safari/WebKit, screen-reader or comprehensive accessibility certification. Hosting deployment remains distinct from GitHub publication. [Publication record](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/reviews/2026-10-20-page-layout.md).
