# Local visual assets

- `clarity-galaxy.png`: owner-approved AI-generated editorial illustration, 18 October 2026. Reclining gender-ambiguous figure with crossed legs beneath a compact constellation of a heart, question mark, two stars, emotion waves and exclamation mark. Keep the open constellation, hand-drawn line style and honey-yellow accents. The live headline, description and controls remain accessible HTML; this image contains no homepage text. Used with `mix-blend-mode:darken` to retain the shared ivory canvas without a visible image panel.

- `manrope-latin.woff2`: Manrope variable Latin font, weights 400–700. Downloaded from Google Fonts, `https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2`. License: `MANROPE_OFL.txt`, from `google/fonts/ofl/manrope/OFL.txt`.
- `icons.svg`: selected, unmodified icon geometries from `lucide-static@0.468.0`, bundled into an SVG symbol sprite, including `house` for the global Home link. License: `LUCIDE_LICENSE.txt` from that package.

Keep asset licenses and attribution when replacing or adding assets. The app uses local assets and does not load a remote font service or icon runtime. Other writing scripts use the system font fallback. The component showcase references these same assets.

- `select-chevron.svg`: the same unmodified `chevron-down` geometry from the bundled Lucide sprite, supplied as a standalone CSS background for native select controls. Uses the existing `LUCIDE_LICENSE.txt`.
