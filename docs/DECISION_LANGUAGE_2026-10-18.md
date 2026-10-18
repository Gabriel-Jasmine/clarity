# Decision-language rollout — 18 October 2026

Build: `20261018-decision-language` · UI/UX Playbook: **1.5.0** · Owner-authorised implementation and publication.

## Result and scope

The opening now asks **What decision are you trying to make?**, provides the external **I’m deciding whether to…** cue and asks **What are you hoping to achieve?**. The current vocabulary distinguishes the whole decision from the contemplated action through this/doing this/if you do this. The [standing contract and complete static-copy inventory](DECISION_LANGUAGE.md) govern future work.

The pass covers affected prompts, page descriptions, helpers/examples where affected, starting-leaning labels, context references, empty states, information needs, boundary responses, Overview groups, AI context, guide, component showcase, accessible labels, cache-versioned scripts/styles and current export definitions. Twenty question definitions advance to wording version 2, with previous wording retained. The component showcase and Playbook include the external 16px/26px regular starter. App README and AGENTS link the standing contract; all nine private root reference documents and private AGENTS point future work to it.

The current shared-origin Further Consequences explanation is retained; this vocabulary pass does not restore an older two-independent-starting-results design. The same immediate change still anchors both trails. The guide receives terminology/scope alignment, not the separately discussed full content redesign. Existing fictional scenarios are retained except for the agreed opening/example framing; adopting one shared fictional case remains separate.

## Compatibility

- Existing action text is kept verbatim, including full sentences, line breaks, whitespace and the word choice in user writing. The starter is not saved, prepended, stripped or used to recase text.
- The existing trimmed decision-summary mirror is unchanged; the raw action field and Q01 record preserve exact writing.
- make/not values, storage key, internal identifiers, option/source/Driver relationships, 77 question IDs and schema version 2 are unchanged. There is no review-policy reset or answer migration.
- Direction, importance, evidence, strength, hard-boundary and uncertainty meanings stay intact. Alternatives remain unranked.
- Retired questions, old response labels and source/history quotations retain their wording. New current definitions do not claim to reconstruct an old user's capture date or prompt exposure.
- Only the exact pair of known complete Devil's Advocate no-connection system-label formats, matching the same structured current outcome/response, are treated as equivalent for freshness. Arbitrary writing is never normalized. Genuine answer/action/source changes still trigger the existing review behavior.

## Verification completed

- **14 regression suites** pass, including `tests/decision-language.cjs` and all 13 previous suites.
- JavaScript syntax checks for app, capture and reversibility pass; `git diff --check` passes.
- **72 browser page/width scans** cover all 12 sections at 1440, 1024, 768, 759, 390 and 320 CSS pixels. No page overflow, missing assets or runtime errors were observed. Each main workspace retained one 2px frame; current visible system copy did not retain the choice noun.
- The starter's computed 16px/26px/400 role, textarea accessible association, initially blank action, unchanged make/not persistence and reload were checked in Chromium.
- Long exact existing writing, raw export, boundary selected states, expanded Judgment Check questions, keyboard focus, read-only guide visits, mobile Menu and saved-section continuation pass.
- Desktop and narrow Decision renders were inspected visually.

These checks do not establish screen-reader conformance, every physical device/browser, scientific validity or user comprehension. Those broader checks remain open. Public commit/remote verification and any hosting deployment outcome are recorded in the private release record; a successful push must not be reported as a verified live deployment.
