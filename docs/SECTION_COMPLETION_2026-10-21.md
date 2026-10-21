# Section checks require completed answers

21 October 2026. Build `20261021-section-completion`. Includes the current canonical section routes. Hosting verification remains separate.

## Confirmed cause

Continue appended the current section to `data.reviewed` regardless of missing answers. Tool navigation rendered green checks solely from that array. The standalone guide repeated the same assumption. These are shared JavaScript paths, so the defect affects phone, tablet and desktop even though it was reported on a phone.

## Correction

Extract `sectionAnswerChecks()` from the existing assessment rules. Use it for assessment missing items, Continue eligibility and section completion. A section's check requires its required answers and a current reviewed flag. Decision Drivers additionally requires pending assessment changes to be acknowledged. Continue can still skip any incomplete section, but cannot create a reviewed flag for it. Old false reviewed flags cannot produce badges because rendering checks actual completeness too.

Save refreshes existing navigation status slots and accessible completion labels without replacing the active answer field. Deleting an answer or invalidating its review removes the check immediately. Filling the required answers and continuing restores it. Overview has no input fields; its indicator derives from all eleven answer sections being complete. Section IDs and journey order remain unchanged.

The read-only guide uses an additive `completionStatus` projection created by the tool from the same rules. `completion.js` checks its version and answer-state checksum before displaying any checks. It ignores UI position and the cache itself when calculating freshness. A missing, malformed, legacy or stale projection displays no check until the tool recalculates it; the guide never writes or initializes a decision. The checksum detects accidental staleness and is not a security feature. Bump the projection version if completion rules change in future.

## All-section audit

| Section | Existing completion requirements reused |
| --- | --- |
| The Decision | Action, aim, consequence horizon, deadline response/details when Yes, waiting reflection or offered response |
| Things Dear to You | Life priorities, affected areas including specified Other when selected, boundary response and written boundaries when Yes |
| The Trade-Offs | At least one realistic alternative, immediate and future cost writing or their offered unknown responses |
| Carrot on the Stick | Gain, relief and direction-fit writing or their offered response states |
| What Compounds | Each of the three reflections or its offered unknown response |
| The Domino Effect | One immediate change and two explicitly ended, internally complete consequence trails |
| The Devil's Advocate | Written failure outcome and connection writing or its offered no/unknown response |
| Wiggle Room | All six condition responses, summary when required or offered unknown, and boundary compatibility when boundaries exist |
| Reversibility | Written return route for reversible; written lasting consequences and adjustment response for irreversible, with adjustment writing when Yes |
| Decision Drivers | Expectation basis or offered unknown, at least one complete current Driver, and no unacknowledged assessment changes |
| Tricks of the Mind | Required challenge, change-evidence and context responses, including writing on branches that require it |
| Decision Overview | All eleven answer sections complete and currently reviewed |

Optional answers remain optional, including starting inclination and life direction under the existing product contract. Explicit unknown/none states count where offered; a green check means the reflection was completed and reviewed, not that the decision is certain or advisable. No new questions, required acknowledgements, scores, branching or device-specific completion rules are added.

## Verification

`tests/section-completion.cjs` passes empty-Continue traversal, all twelve sidebar statuses, false legacy reviewed flags, a complete journey, removal of required answers in each input section, conditional unknown/none handling, selected Other specifics, immediate status refresh, guide freshness and read-only guide behavior. The shared tests load `completion.js` before application code, matching both HTML entry points. Syntax and whitespace checks pass.

All 18 suites were attempted: 14 pass; the same four pre-existing failures remain in `drivers.cjs`, `reversibility.cjs`, `review-connections.cjs` and `whole-flow.cjs`, as documented in the preceding Other release. No new failing suite was introduced. These DOM/storage checks establish the shared completion behavior, not real-browser layout or accessibility conformance. Chromium is unavailable and its installation failed; phone/tablet/desktop browser verification remains outstanding. Cloudflare deployment is not verified by these local checks.

## Integration with section routes

Rebased onto the current routing repair (`b44736d`) before publication. Regenerated all twelve physical section wrappers from the current decision shell, retaining their stable `../` base and routing logic. Every entry loads completion.js before app.js. The guide derives section IDs from canonical slug links and uses the same freshness-checked projection. The route regression now asserts complete shell equality and completion-script ordering for every wrapper. Existing simulated-browser harnesses include the route listener API.
