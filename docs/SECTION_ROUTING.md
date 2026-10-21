# Section routing architecture — 2026-10-21

## Approved design
Clarity has one shared stateful decision app, accessible from twelve stable canonical public URLs. Each section uses a physical static HTML entry wrapper at `<slug>/index.html` for GitHub Pages and Cloudflare Workers compatibility. Wrappers load the same JavaScript, styles and decision data; they MUST be regenerated when the common `decision.html` shell changes. Section URLs do not contain decision answers.

## Section ID / slug map
- 0: The Decision — /the-decision/
- 1: Things Dear to You — /things-dear-to-you/
- 2: The Trade-Offs — /the-trade-offs/
- 3: Carrot on the Stick — /carrot-on-the-stick/
- 4: What Compounds — /what-compounds/
- 5: The Domino Effect — /the-domino-effect/
- 6: The Devil's Advocate — /the-devils-advocate/
- 7: Wiggle Room — /wiggle-room/
- 8: Tricks of the Mind — /tricks-of-the-mind/
- 9: Reversibility — /reversibility/
- 10: Decision Drivers — /decision-drivers/
- 11: Decision Overview — /decision-overview/

## Invariants and future maintenance
- The numeric IDs remain immutable even if journey order or user-facing titles change; `sectionSlugs` in `app.js` is ordered by ID, not by `stepOrder`.
- Existing `clarity-v1` storage, reviewed/completion logic, undo and in-progress draft state must not be changed by URL navigation.
- Legacy `decision.html` and `decision.html?section=N` must keep functioning. Existing links can resolve into canonical routes.
- Direct URL entry, refresh, sidebar, Continue, Back, overview edit shortcuts, browser Back/Forward, and reset must work independently; do not enforce completion gates through routes.
- Do not put private text or decision state into the URL, query, hash, or analytics; merely sharing a section link never shares local answers.
- Keep all paths portable across GitHub Pages `/clarity/` and Cloudflare root deployments; check base href and assets after changes.
- Keep individual decision workflow pages out of search indexing; the homepage is the public SEO landing page.
- If a slug is intentionally renamed, retain a redirect/legacy alias for existing bookmarks.

## Regression checklist
Test all twelve deep links, refresh, old `decision.html?section=N` links, mobile and desktop navigation, browser history, unfinished work, localStorage persistence, reset, and completion indicators. Ensure `decision.html` and all wrappers share the same shell and scripts.

## 2026-10-21 routing regression fix
The initial route update accidentally duplicated declarations and inserted malformed routing JavaScript, causing decision pages to blank. Consolidated routing into one route map/one popstate handler and repaired navigation.js syntax. The legacy decision.html shell uses `<base href="./">`, while per-section wrappers use `<base href="../">`: these stable base URLs prevent client-side transitions from creating nested section paths. Keep these base tags when regenerating shell files. Automated syntax and routing checks are in `tests/section-routes.cjs`.
