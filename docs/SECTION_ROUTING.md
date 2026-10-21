# Section routing architecture (2026-10-21)

## Decision
Each of Clarity's twelve sections has a stable public path, separate from the displayed title. Routes are indexed by the existing stable numeric section IDs, **not** by the journey/navigation order. The app remains one shared stateful experience; section wrappers simply load the same app. No decision answer content belongs in URL paths, hashes, or query strings.

## Routes
- 0 The Decision: /the-decision/
- 1 Things Dear to You: /things-dear-to-you/
- 2 The Trade-Offs: /the-trade-offs/
- 3 Carrot on the Stick: /carrot-on-the-stick/
- 4 What Compounds: /what-compounds/
- 5 The Domino Effect: /the-domino-effect/
- 6 The Devil's Advocate: /the-devils-advocate/
- 7 Wiggle Room: /wiggle-room/
- 8 Tricks of the Mind: /tricks-of-the-mind/
- 9 Reversibility: /reversibility/
- 10 Decision Drivers: /decision-drivers/
- 11 Decision Overview: /decision-overview/

## Invariants
- All section URLs can load directly or refresh on static hosting, with HTML wrappers at `<slug>/index.html`, not dependent on a Cloudflare rewrite.
- `app.js` is the authoritative route map. Route wrappers should remain byte-equivalent to `decision.html` except for their `<base href="../">` line; if the shell changes, sync every wrapper.
- The section IDs, localStorage key `clarity-v1`, saved data, completion/review semantics and option data must never change just for URL routing.
- Sidebar, Back, Continue and Decision Overview editing use pushState; browser Back/Forward use popstate. Routes don't enforce completion gates.
- Legacy `decision.html` and `decision.html?section=ID` remain valid. The latter resolves to the canonical section on load. Home and guide links are regular navigations.
- Unknown URLs must not expose saved data or create new routes; route URLs alone cannot share answers, which live only in the user's browser.
- Confirm behavior on both GitHub Pages (subpath `/clarity/`) and Cloudflare Workers (root), especially relative asset paths.

## Maintenance checklist
1. When renaming section copy, keep the existing slug; if intentionally changing a slug, add a redirect/alias.
2. Keep IDs and `sectionSlugs` positions aligned, even if navigation is reordered.
3. After changing `decision.html` scripts or layout, regenerate its section wrapper entry files.
4. Test direct link, refresh, mobile/desktop navigation, browser history, form autosave, legacy links, incomplete sections, reset, and back/forward.
5. Keep the workflow sections unindexed by search engines unless a separate SEO decision is made; do not insert decision input into URLs or tracking.

## Hosting note
Physical static entry pages are used instead of Cloudflare SPA fallback, because generic fallback would serve the marketing homepage `index.html` rather than the decision application. This also retains GitHub Pages compatibility.
