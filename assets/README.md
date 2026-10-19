# Local visual assets

- `clarity-galaxy.png`: owner-approved AI-generated editorial illustration, 18 October 2026. Reclining gender-ambiguous figure with crossed legs beneath a compact constellation of a heart, question mark, two stars, emotion waves and exclamation mark. Keep the open constellation, hand-drawn line style and honey-yellow accents. The live headline, description and controls remain accessible HTML; this image contains no homepage text. Used with `mix-blend-mode:darken` to retain the shared ivory canvas without a visible image panel.

- `manrope-latin.woff2`: Manrope variable Latin font, weights 400–700. Downloaded from Google Fonts, `https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2`. License: `MANROPE_OFL.txt`, from `google/fonts/ofl/manrope/OFL.txt`.
- `icons.svg`: the original unmodified geometries from `lucide-static@0.468.0` remain, including `house` for Home and `book-open` for How Clarity works. The approved 19 October section refresh adds unmodified `message-circle-question`, `gem`, `receipt`, `carrot`, `expand` and `ghost` geometries from `lucide@1.8.0`. Keep the existing Lucide ISC license/attribution in `LUCIDE_LICENSE.txt`.

Keep asset licenses and attribution when replacing or adding assets. The app uses local assets and does not load a remote font service or icon runtime. Other writing scripts use the system font fallback. The component showcase references these same assets.

- `select-chevron.svg`: the same unmodified `chevron-down` geometry from the bundled Lucide sprite, supplied as a standalone CSS background for native select controls. Uses the existing `LUCIDE_LICENSE.txt`.


## Approved custom section icons — 19 October 2026

- `domino-tile`: original owner-requested outline geometry showing two pip-marked tiles, one upright and one leaning against it. Replaces the previous consequence branch icon in current section navigation.
- `reverse-card`: original owner-requested card outline with opposing reverse arrows. Replaces the previous undo arrow for Undoability; it contains no third-party logo.

Both inherit currentColor and the existing 16px sidebar sizing, neutral/pink state and completion-slot rules. What Compounds retains `sprout`; The Devil’s Advocate, Decision Drivers and Decision Overview retain their original icons. [Canonical approved names and mapping](../docs/SECTION_NAMES_2026-10-19.md).
