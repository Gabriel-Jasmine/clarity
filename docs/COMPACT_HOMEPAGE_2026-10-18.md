# Compact homepage — 18 October 2026

Approved for publication at 22:31 MYT after the owner reviewed desktop and phone mocks. This supersedes the original homepage description, invitation and larger proportions.

## Exact copy

Headline: **A good decision begins with Clarity**

Description (35 words, 213 characters including spaces):

> And Clarity begins with the right questions. The kind that untangle your thoughts and bring the ghosts influencing your decision into the light. So you can understand what’s driving you before deciding what to do.

Separate invitation: **Shall we begin?**

Primary link: **Let’s begin** → existing **How Clarity works** guide.

## Layout

Keep the centered stack and exact approved galaxy artwork. Desktop illustration width is at most 340px (255px high), headline 52px / 1.1, description 18px / 1.5 with a 660px maximum line width. At widths of 600px or less, illustration width is at most 240px (180px high), headline 32px / 1.13 and description 17px / 1.5. Headline spacing becomes 20px desktop / 18px mobile. The separate invitation has a 12px gap before the 48px primary link.

Header padding is reduced; the saved-work shortcut stays on one line with a minimum 44px target to prevent wrapping from pushing the phone CTA downward. The homepage uses normal document flow with no fixed viewport-height lock, clipping, hidden content or sticky button overlay. Very short or zoomed viewports may scroll naturally.

The existing pink underline (`#EDBDDF`), honey galaxy accents, serif stack, illustration bytes, keyboard links, guide/tool navigation and saved-decision contracts remain unchanged. Showcase and Playbook 1.4.1 reflect the adopted copy and proportions. No application, capture, reversibility or export logic changes.

## Verification

- All 13 existing regression suites, `node --check home.js` and whitespace checks passed.
- Chromium checked nine viewport sizes in both fresh and saved-work states (18 views): 1440 × 900, 1366 × 768, 1280 × 720, 1024 × 768, 768 × 1024, 600 × 800, 390 × 844, 375 × 667 and 320 × 568.
- All homepage components, including the complete button, fit in the checked viewports at widths of at least 375px. On 1280 × 720, the button bottom is 679px. On 375 × 667, it is 633px fresh / 636px with the returning-user shortcut, leaving at least 31px below the button.
- At 320 × 568, the page scrolls naturally and the complete CTA remains reachable. This is not a universal first-screen guarantee across devices, fonts, browser chrome or zoom settings.
- Exact description and invitation, pink underline, minimum 48px primary target, no horizontal overflow, no missing assets and no script errors were verified. Desktop and 375px screenshots were inspected against the approved mock.
- Homepage visits retained saved JSON byte-for-byte; the returning shortcut restored recorded writing and Further Consequences. Native keyboard links reached the existing guide and tool. Showcase desktop/narrow layout and Menu behavior passed.

Other browsers/devices, screen-reader conformance and comprehension remain unverified. Source publication and live deployment are checked separately after the push.
