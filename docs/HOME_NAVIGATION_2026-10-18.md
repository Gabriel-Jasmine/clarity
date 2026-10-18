# Home navigation — 18 October 2026

The owner approved the navigation mock and requested publication. This release adds native links to the homepage from the briefing and the shared decision-tool shell.

## Behavior and layout

- The briefing has a house icon and **Home** at the top right.
- The desktop tool places Home below the Clarity wordmark/tagline, above a neutral divider and the twelve decision sections.
- Mobile places **Clarity**, **Home** and **Sections** in the top row. Home is visible whether the menu is open or closed. Existing storage and New decision controls remain available below.
- The Clarity wordmark also links home on all entry and working pages.
- Home does not reset the decision, mark a section reviewed or ask for confirmation. **Continue my decision** uses the existing saved-state shortcut and restores the recorded section in the same browser.
- The original application, capture and reversibility JavaScript, questions, section identities/order, storage, assessment and export contracts are unchanged. Mock-only simplified fields and example answers are not transferred into production.

The treatment uses existing color, typography, spacing, focus and control tokens. Home has at least a 44px target and 8px vertical / 12px horizontal inner padding. Its unmodified house geometry is bundled from the same licensed `lucide-static@0.468.0` icon family. No remote runtime is added. Versioned stylesheet URLs are updated on the homepage, briefing, tool and component showcase.

## Validation

- All 13 existing regression suites, `node --check home.js` and `git diff --check` passed.
- Real Chromium: all twelve sections at 1440, 1024, 768, 759, 390 and 320px, for 72 page/width scans. Home targets are at least 44px; the narrow header controls stay within the viewport without overlap; no page-wide overflow was observed.
- Twenty-four Home → Continue my decision round trips, covering every section on desktop and at 320px, retained writing and resumed the recorded section. The homepage left the saved JSON unchanged byte-for-byte.
- Keyboard activation of Home and the tool wordmark, briefing Home/wordmark navigation, mobile menu open/closed behavior and section selection passed.
- No script errors or missing assets were observed. Desktop and 320px screenshots were visually inspected.

These checks do not establish screen-reader conformance, other-browser/device behavior or user comprehension. Source publication and live deployment are verified separately after the push. The fuller briefing-page design remains separate work; this release changes only its navigation.
