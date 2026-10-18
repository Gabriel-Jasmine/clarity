# Persistent guide navigation — 18 October 2026

The owner approved the clickable **How Clarity works** mock and requested the GitHub update. The existing briefing becomes a persistent guide at the same URL, `before-you-begin.html`.

## Approved behavior

- **Home** and **How Clarity works** are peers at the top of the desktop sidebar, followed by a neutral divider and the existing twelve decision sections. The guide is outside decision progress and has no completion badge or step number.
- The guide keeps the shared sidebar, Manrope typography, existing tokens and one charcoal workspace frame. Its current link uses the existing pink navigation marker. The explanatory paragraphs and instructions are retained; the separate content revision is not included.
- On mobile, **Home** stays visible beside **Menu**. Menu controls the guide link and decision sections together, preserving expanded-state and keyboard behavior.
- The main guide action reads **Begin my decision** before work is recorded and **Continue my decision** for saved work. Continue restores the last working section.
- Each section link on the guide enters that section in the existing tool. The one-time `section` query parameter is consumed; a later reload resumes the latest section. Invalid section parameters are ignored without losing other query/hash information.
- Guide and homepage scripts only read saved state. Reading the guide or opening Menu does not initialize a decision, change answers, mark sections reviewed or replace the saved last section. Guide section badges mirror saved reviewed states.

The application change adds only the native guide link/divider to navigation rendering. The section-entry script delegates to existing section buttons and handlers. Questions, section identities/order, reasoning, completion rules, assessments, capture/reversibility logic and exports are unchanged. Local `book-open` geometry comes from the same licensed `lucide-static@0.468.0` family.

## Validation

- All 13 existing regression suites passed. JavaScript syntax checks for `app.js`, `home.js` and `navigation.js`, plus whitespace checks, passed.
- Chromium checked all twelve tool sections at six widths (1440, 1024, 768, 759, 390 and 320px), for 72 scans, plus the guide at those widths. No horizontal overflow, script errors or missing assets were observed. Desktop and 320px guide screenshots were visually inspected.
- Twenty-four desktop/narrow tool → guide → resume round trips retained writing and the last section. Guide visits left saved JSON unchanged byte-for-byte.
- All twelve guide section links entered the requested section and retained it after reload. Invalid destinations preserved the existing last section and unrelated query parameters.
- First-entry guide use, adaptive action labels, saved reviewed indicators, keyboard links, mobile Menu open/closed behavior, Home entry and malformed/blocked storage passed. The guide does not initialize the tool or write decision data.
- The showcase's desktop/narrow layouts and menu were checked. Existing guide paragraphs, instructions and storage notice were compared with the baseline and preserved.

Broader browser/device behavior, screen-reader conformance and user comprehension remain unverified. Publication and live deployment are verified separately after the push. This record supersedes earlier standalone-briefing navigation and typography descriptions only; the homepage’s approved pink underline and artwork remain unchanged.
