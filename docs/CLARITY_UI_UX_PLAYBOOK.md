# Clarity UI/UX Playbook

Version **1.3.1** · Adopted 18 October 2026 · Owner: Clarity product owner

**Purpose:** give every future Clarity interface update one shared visual and interaction standard. The agreed mock establishes the direction; this playbook makes it repeatable across the product.

**Status:** adopted presentation standard. Version 1.2.2 extends the same compact-control inset to transparent Edit, Review, Add and Show more buttons, including their keyboard focus outline. See [button spacing validation](BUTTON_SPACING_2026-10-18.md). Version 1.2.1 enforces explicit internal padding for framed and filled text surfaces; see [surface spacing validation](SURFACE_SPACING_2026-10-18.md). Version 1.2.0 adds a single reading order across all 12 pages: the page description precedes personal decision references, and a local example follows its question/guidance and precedes its answer field. It includes the version 1.1.0 typography correction. Existing data, reasoning and export contracts remain unchanged. See [content-order validation](CONTENT_ORDER_2026-10-18.md) and [typography audit](TYPOGRAPHY_AUDIT_2026-10-17.md) for evidence and remaining limits.

## Contents

Version 1.3.1 adds the approved global Home route, clickable wordmarks and an always-visible mobile Home control beside Sections. See section 9 and [navigation validation](HOME_NAVIGATION_2026-10-18.md).

Version 1.3.0 adds the owner-approved editorial homepage, local constellation artwork, honey underline and homepage → briefing → existing-tool entry flow. Its serif and unframed homepage treatments are scoped exceptions in sections 5 and 7; the working tool retains the existing standard. See [homepage implementation and validation](HOMEPAGE_2026-10-18.md).

1. Authority, scope and documentation homes
2. Product experience and design principles
3. Agreed direction and implementation defaults
4. Color system and attention hierarchy
5. Typography
6. Spacing, proportions and page layout
7. Signature frame, borders and surfaces
8. Icons and shape language
9. Navigation and section completion
10. Buttons and actions
11. Writing fields and conditional answers
12. Choices, pills, tiles and assessment controls
13. Guidance, examples and reference material
14. Repeated cards, tables and consequence chains
15. Decision Drivers and source relationships
16. Reversibility and review connections
17. Overview and export
18. Shared states, feedback and recovery
19. Dialogs and destructive actions
20. Responsive behavior
21. Accessibility and motion
22. Language and information integrity
23. Page-by-page application map
24. Design tokens and implementation contract
25. Maintenance, change control and adoption
26. Quality checklist and review templates
27. Decision register and validation backlog
28. Sources and evidence limits

## 1. Authority, scope and documentation homes

### What this governs

The application shell, navigation, colors, typography, icons, shapes, spacing, controls, component states, disclosure order, responsive behavior, accessibility and presentation of existing product behavior. It applies to new features, small fixes, new pages and revisions to existing components.

It does not authorize changes to psychological interpretation, questions, assessment meaning, scoring, source grouping rules, completion conditions, historical records, schema, migrations or export content. A visual change must preserve those contracts. Functional proposals require their own product decision.

### Documentation baseline before adoption

Repository inspection before this adoption found:

| Location | Existing purpose | Appropriate role going forward |
| --- | --- | --- |
| `Gabriel-Jasmine/clarity/README.md`, “Visual system” | Short visual description, currently describing the earlier serif/dither direction | Link to the playbook and summarize the adopted design; distinguish target design from shipped UI |
| `Gabriel-Jasmine/clarity-product-decision-notes/UX_UI_LOG.md` | Chronological interface and interaction history | Record why a visual rule changed; link to the resulting playbook version |
| `CURRENT_PRODUCT.md` in product notes | Current implemented product behavior | Record rollout status after implementation, without describing mockups as shipped |
| `CLARITY_LANGUAGE_GUIDE.md` in product notes | Approved terms, meanings and wording | Remain authoritative for product copy |
| `PRODUCT_REASONING.md` in product notes | Product rationale | Remain authoritative for reasoning and functional decisions |
| `CHANGELOG.md` in product notes | Dated change index | Index meaningful design and rollout changes |
| `OPEN_QUESTIONS.md` in product notes | Pending decisions and validation | Track unresolved visual/usability questions and close them with evidence |

That baseline had no dedicated comprehensive UI/UX playbook. This document now fills that role; the chronological UX/UI log remains the decision history.

### Canonical arrangement

**One normative playbook:** `docs/CLARITY_UI_UX_PLAYBOOK.md` in the public application repository. Developers find the rules alongside the code.

**One decision history:** retain `UX_UI_LOG.md` in the product-notes repository. Add a link to the canonical playbook in that repository’s README and maintenance map. Avoid maintaining two editable full copies. A frozen export is allowed if clearly marked with the originating version and commit.

**One token source:** the production token block at the top of `styles.css`. Existing page variables alias the semantic tokens during this rollout. Do not introduce a second competing token definition.

**One living visual reference:** `design/component-showcase.html` contains representative components and states and loads the production stylesheet. It is a developer review surface, not a new step in the user journey. It is not a substitute for the complete current product.

**Contributor entry point:** `AGENTS.md` instructs contributors to read the playbook before UI work, reuse tokens/components, preserve functional contracts, and update documentation and showcase when introducing a design rule.

Authority is scoped: the language guide governs wording; current product decisions govern behavior; this playbook governs appearance and interaction presentation. Resolve conflicts explicitly rather than silently changing behavior to fit a mock. The latest dated functional decisions supersede older product descriptions. The latest adopted playbook governs visual rules; historical logs remain history.

## 2. Product experience and design principles

Clarity should feel calm, thoughtful and approachable, with enough structure to make a complex decision easier to work through. The user’s writing is the central content.

1. **Make the next useful action clear.** A visible question, its relevant guidance, an answer area and a nearby action should form a coherent unit.
2. **Use hierarchy before decoration.** Group related information with space, headings and surfaces before adding color or borders.
3. **Keep color meanings stable.** A color should help users predict meaning across pages.
4. **Preserve agency.** Selection, completion and assessment must reflect actual user actions or existing product rules. Styling must not imply a recommendation.
5. **Keep thinking continuous.** Switching sections or answer branches must preserve writing and avoid unnecessary focus jumps.
6. **Distinguish current thinking from history.** Earlier answers remain available and clearly identified; they do not silently become current evidence.
7. **Show assistance at the point of need.** Essential definitions precede decisions. Longer examples and reference guides can be disclosed locally.
8. **Keep the design recognizable across pages.** The same shell, type scale, radii, action shapes, color roles and structural frame apply even when page content differs.
9. **Make compact visuals usable.** Small icons may sit inside generous click targets. Readable text takes priority over reproducing a compressed mock’s density.

## 3. Agreed direction and production defaults

| Status | Rule |
| --- | --- |
| Agreed visual direction | Soft ivory canvas, greyish ivory supporting surfaces and ivory-white writing areas |
| Agreed visual direction | Dark sidebar, dark text and restrained dark primary actions |
| Agreed visual direction | Rounded sans-serif typography, restrained outline icons, rounded cards and pill actions |
| Agreed visual direction | Soft pink communicates selected/current items |
| Agreed visual direction | Small filled soft-green circles with dark checks communicate completed sections |
| Agreed visual direction | Completion and current selection can appear together |
| Agreed visual direction | Reflection library stays neutral; blue is used for open information needs in Overview |
| Agreed visual direction | Honey yellow supports examples or optional guidance |
| Adopted treatment | One persistent 2px charcoal frame around the main working surface; Drivers uses the entire editing workspace |
| Adopted treatment, monitor proportions | 12px completion circle; centered 10px check icon box; reserved status column |
| Adopted production font | Manrope; exact font of the reference screenshot was not verified |
| Adopted implementation defaults | Production type sizes, sidebar width, breakpoints, control heights, spacing scale, interaction details and accessibility refinements in this document |

Earlier experiments using `#C34863` as the main accent belong to the design history. The later approved reference-style mock uses soft pink `#EDBDDF`. Do not mix the two palettes in implementation. Reintroducing the earlier rose is a separate design change.

## 4. Color system and attention hierarchy

### Neutral foundations

| Token | Hex | Assignment | Logic |
| --- | --- | --- | --- |
| `--cl-canvas` | `#FAF4E4` | Main page canvas | Warm continuous base; the largest light area |
| `--cl-surface` | `#EDE8DC` | Supporting cards and grouped content | Separates related content without adding strong contrast |
| `--cl-surface-reference` | `#E4E0D4` | Earlier-reflection library | Makes reference material distinct from current writing |
| `--cl-surface-work` | `#F9F5EB` | Main framed workspace | A light working surface between canvas and field white |
| `--cl-field` | `#FFFCF3` | Inputs, writing areas, report paper | The clearest surface for personal content |
| `--cl-ink` | `#20211F` | Main text and headings | Readability and hierarchy |
| `--cl-muted` | `#64645D` | Secondary explanations, metadata and placeholders | Less emphasis while remaining readable |
| `--cl-sidebar` | `#141513` | Sidebar | Stable navigation anchor |
| `--cl-sidebar-ink` | `#EAECE3` | Inactive navigation labels | Readable, restrained contrast |
| `--cl-sidebar-muted` | `#B8B9AF` | Sidebar metadata | Lower emphasis than navigation |
| `--cl-primary` | `#171A16` | Primary buttons | One clear action without consuming the pink selection role |
| `--cl-primary-hover` | `#343832` | Primary button hover | Restrained visible change |

### Semantic accents

| Token | Hex | Assignment | Do not use for |
| --- | --- | --- | --- |
| `--cl-pink` | `#EDBDDF` | Selected pills; current sidebar label/icon/marker | Errors, correctness or completion |
| `--cl-pink-soft` | `#F8DEED` | Selected choice tiles and source rows | Entire content columns or all active writing fields |
| `--cl-pink-ink` | `#71375C` | Text on pink surfaces | General secondary text |
| `--cl-selection-border` | `#98537C` | Selected control outline | Small text on pale pink; use pink ink for text |
| `--cl-blue` | `#D5E2F4` | Overview’s “What you still need to find out” panel | Reflection library, general selection, all information cards |
| `--cl-blue-ink` | `#34465F` | Text and icons inside blue panels | Navigation or default controls |
| `--cl-honey` | `#FAE69E` | Examples and optional guidance | Automatic assessment of a choice or routine errors |
| `--cl-honey-ink` | `#5F542D` | Guidance labels and icons | General interface text |
| `--cl-green` | `#CAE1C5` | Completion badge background | Good decisions, reliable evidence or safe outcomes |
| `--cl-green-ink` | `#344332` | Check mark inside completion badge | Decorative body copy |

Pastels have a similar soft, light character. Their semantic role comes from repeated use, labels and icons, not from assuming that hue alone explains meaning. Blue and honey identify types of supporting information; they are not additional universal selection colors. Selected items inside those panels still use the pink control treatment when selection is needed.

### Structural and feedback colors

| Token | Hex | Assignment |
| --- | --- | --- |
| `--cl-frame` | `#343832` | Signature structural frame |
| `--cl-divider` | `#D7D2C6` | Decorative separators |
| `--cl-control-border` | `#858176` | Required field/control boundaries; accessibility refinement |
| `--cl-focus` | `#8A4A73` | Keyboard focus on light surfaces |
| `--cl-error` | `#9C3648` | Error text and error border; functional default |
| `--cl-error-surface` | `#FAE8EA` | Small error region when needed; functional default |
| `--cl-disabled-surface` | `#DDD9CF` | Inactive writing areas |

The mock’s pale `#B5B1A6` field border has approximately 2.09:1 contrast against `#FFFCF3`. When a boundary is needed to identify a control, use `#858176` instead. Decorative dividers can stay pale. This preserves the soft palette while improving identification.

### Attention order

The page title establishes location. The framed working surface establishes the task. The question and personal writing carry the main content. Pink shows current choice; a dark button identifies the main action. Blue or honey draws attention only to the relevant kind of assistance. Small green completion circles sit below the main content in prominence.

Most of the content area should stay neutral. Do not impose arbitrary color percentages; inspect the page in grayscale and at normal viewing size. If guidance visually dominates the writing, reduce its area or use disclosure. The sidebar is a stable dark anchor; do not add large dark panels throughout the content to balance it.

### Calculated color checks

Ratios use WCAG relative-luminance math for opaque sRGB pairs, rounded to two decimals. These are checks of these pairs, not an accessibility certification of the app.

| Foreground / background | Ratio | Intended use |
| --- | --- | --- |
| `#20211F` / `#FAF4E4` | 14.73:1 | Main text on canvas |
| `#64645D` / `#EDE8DC` | 4.88:1 | Secondary text on supporting surface |
| `#64645D` / `#FFFCF3` | 5.81:1 | Secondary/placeholder text in fields |
| `#71375C` / `#EDBDDF` | 5.39:1 | Text on selected pink |
| `#71375C` / `#F8DEED` | 6.93:1 | Text on soft selection fill |
| `#34465F` / `#D5E2F4` | 7.32:1 | Blue information panel text |
| `#5F542D` / `#FAE69E` | 6.04:1 | Honey guidance text |
| `#344332` / `#CAE1C5` | 7.56:1 | Completion check |
| `#858176` / `#FFFCF3` | 3.79:1 | Field boundary |
| `#858176` / `#EDE8DC` | 3.18:1 | Control boundary on supporting surface |

Do not reduce text opacity indiscriminately. Check the actual rendered foreground/background combination, including hover, disabled, focus and selected states.

## 5. Typography

**Approved entry-page exception, 18 October 2026:** the marketing homepage uses an editorial system-serif stack (`Georgia, "Times New Roman", serif`) for its wordmark, headline, description, invitation and primary link, matching the owner-approved mock. The briefing heading uses that same display stack; its instructions use Manrope. This exception is scoped to `home.css`; it does not change typography in the decision workspace or user writing. System-serif appearance varies by platform; no additional remote font dependency is introduced.

Use **Manrope** as the production family, following the mock: `Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Use actual 400/500/600/700 weights. Verify font loading and fallback widths. The variable Latin font is self-hosted in `assets/manrope-latin.woff2`, with its Open Font License in `assets/MANROPE_OFL.txt`. Other scripts use the fallback stack. Production does not depend on the mock’s external font link.

The reference font was not positively identified. Describe Manrope as the selected implementation family, not an exact recovered reference font.

### Role-based type scale

All ordinary interface and user-writing text uses Manrope. Distinguish purpose with size, weight, line height and spacing; do not introduce a second font family for user writing.

| Role | Examples | Size / line-height | Weight |
| --- | --- | --- | --- |
| Page title | Decision, Stress Test | 30 / 38px desktop; 26 / 34px narrow | 700 |
| Section/panel title | What is driving your view; Your reflections | 22 / 30px | 700 |
| Main question / subsection heading | What choice are you considering? | 18 / 28px | 600 |
| User writing and stored answer | Typed answer, earlier reflection, source quote | 16 / 26px | 400 |
| Entity/category name | Driver name, selectable tile title, Money row label | 16 / 26px | 600 |
| Field/context/report label | Importance; Decision aim; Outcome | 14 / 22px | 600 |
| Help, examples and status explanations | Writing guidance; missing-answer explanation | 14 / 22px | 400 |
| Button and navigation | Continue; Review; sidebar section | 14 / 22px | 600 button; 500 navigation |
| Metadata | Earlier-writing status, progress count, badge | 12 / 18px | 400–500 |

Use semantic size, line-height and weight tokens: `--cl-size-page`, `--cl-size-section`, `--cl-size-question`, `--cl-size-body`, `--cl-size-label`, `--cl-size-meta` and their corresponding `--cl-line-*` / `--cl-weight-*` tokens. Production uses rem equivalents. Page selectors map markup to these roles; they do not introduce new sizes.

**Role precedes HTML tag.** A main question stays 18px/600 whether rendered as a field span, legend, label or nested heading. A section heading stays 22px/700 whether the document hierarchy requires h2 or h3. A compact metric label such as Importance remains 14px/600. Explicitly mark a primary question inside a generic field with `type-question`; do not infer roles from punctuation, text length or a page's name.

**Separate labels from user content.** Render a known label such as Outcome, Possible connection, Money or Check whether this choice respects in its own element, followed by the value on a new line with about 6px separation. Keep long personal answers at 16px/400 with original line breaks. Do not bold an entire personal answer to create a heading. Named entities such as a Driver title can use the 16px/600 entity role; they are not narrative paragraphs.

For typed source material, use its actual field metadata. Do not split arbitrary user text at colons or search for words such as Outcome inside it. Retained snapshots that cannot be safely mapped to exact structured fields stay verbatim, labelled as snapshots. Typography must not replace an earlier quote with current writing.

**Completion copy:** the approved Overview heading is **Things to finish or review**. Distinguish unanswered questions from sections awaiting review. Present the section name in 16px/600, its explanation in 14px/400 and the existing Review action separately. This is a workflow list, separate from unknown decision information in the blue panel. Keep the underlying completeness rules and export wording intact.

**Answers and guidance:** answer writing may be larger than supporting descriptions: 16px regular answers, 14px regular guidance and 18px semibold main questions. Compact report labels use 14px semibold on their own line. This is a Clarity hierarchy choice, not a universal requirement. Do not make essential substantive instructions small or faint simply because they are descriptive; use the 16px body role when they carry primary content. Maintain readable contrast and text resizing.

**Responsive behavior:** only the page title scales down by default. User writing remains 16px, questions 18px and contextual labels 14px on narrow screens. Reflow the component rather than shrinking its typography to fit. Text sizing must honor browser zoom and user font settings.

**Verification:** measure computed font size/weight/line-height in a browser, rather than assuming a CSS declaration won the cascade. Check main questions, compact labels, filled and empty fields, source quotes, conditional branches, report labels and status rows. Compare the same role across all pages. A layout/overflow pass alone does not verify visual hierarchy.

The compact originating showcase's 11–13px specimen text is not a production reading standard. Raw structured export uses monospace; the rest of the product stays in the shared family. The brand wordmark may retain its identity sizing and is not a general content-heading token.

## 6. Spacing, proportions and page layout

Spacing scale: **4, 8, 12, 16, 20, 24, 32, 40, 48px**. Use 2px only for optical/structural details. Use shared tokens rather than slightly different margins in each page.

| Relationship | Default |
| --- | --- |
| Label to field | 8px |
| Helper to writing area | 12–16px |
| Related controls | 8px |
| Fields within one group | 20–24px |
| Separate question groups | 32px |
| Main page sections | 40px |
| Card/workspace padding | 24px desktop, 16px narrow |
| Main columns | 24px gap |
| Icon to label | 8px |

### Text inside filled and framed surfaces

A visible fill or full enclosing border needs its own internal padding. Transparent text buttons need padding inside the button itself too: their hit area and keyboard focus outline must never hug the label. Audit button bounds even when there is no painted background or border. Outer margins separate components; they do not create space between text and the component's edge. Do not add a background/radius to a previously flush layout row without adding an appropriate inset in the same rule.

| Surface role | Internal padding |
| --- | --- |
| Primary workspace | 24px desktop; 16px below 760px |
| Supporting information/reference panel | 16px on all sides |
| Compact filled header row | 8px top/bottom; 16px left/right |
| Compact text control | 8px top/bottom; 12px left/right, with existing target-height rules; applies to transparent actions too |
| Larger repeated editing item | Existing shared 20px treatment may remain |
| Compact status badge | Existing 4px top/bottom; 8px left/right |

Use `--cl-inset-workspace`, `--cl-inset-panel`, `--cl-inset-row-block` and `--cl-inset-control-inline`. Keep the same role consistent across pages; do not give badges the same padding as a workspace. Existing native fields retain their shared internal text padding. Icon-only controls and completion indicators may use centered glyphs rather than text padding.

Further Consequences uses a padded header and active editor. Its recorded answer aligns with the header's 16px text inset. Keep vertical padding off the clamped paragraph itself so two-line truncation and Show more remain accurate. Filled hover treatments on text actions also need an internal inset. Expanded Reversibility guides retain 16px after the last paragraph; collapsed summaries keep their existing comfortable targets.

Native select controls use the local Lucide chevron at 16px, vertically centered with a 12px right inset. Reserve 44px at the text end so values cannot run beneath the arrow; retain the 12px leading text inset. Keep the native select element, keyboard behavior and focus ring. In forced-colors mode restore the browser arrow. Driver assessment controls wrap according to available width rather than squeezing long values into narrow columns.

Check actual text bounds against all four edges in default, filled, collapsed, active-editor, expanded, selected, hover, keyboard-focus and narrow states. A border/background rule that looks correct in an empty card may still fail after a row is collapsed. Preserve native focus rings, writing, typography and interaction behavior.

### Shell

Desktop default: 232px sidebar; main content with 32px outer padding; generous available width without making long writing lines unbounded. Sidebar corners remain rounded, approximately 18px, with a small outer inset. The canvas fills the browser; there is no thick frame around the whole application.

A single writing page should generally cap its main reading surface around 880px. A true reference/editor workspace or report can use approximately 1120px. These are layout defaults to test with real content, not forced widths. Do not center every component independently.

Standard reading order: **page title → page description → existing decision aim/life-direction references → task content → existing page actions**. The shell may retain compact progress and truthful save state. Use the shared 14px/22px regular description role. Render exactly one page introduction at the start of the content area, before personal context, source references or the main workspace. Orientation explains what the section is for; the user’s aim and life direction then anchor that task. Do not hide the page description inside a later card or repeat it below context. Preserve page-specific context: Decision is still collecting the aim; What Matters shows the existing aim reference while asking for life direction. Do not add redundant references merely to make every page identical.

Use one page scrollbar by default. A long desktop sidebar may have its own navigation scroll region. Avoid nested scrolling inside ordinary writing cards. Do not pin action bars where they cover writing or keyboard focus.

## 7. Signature frame, borders and surfaces

**Public entry flow:** `index.html` is the centered editorial homepage, followed by `before-you-begin.html`, then the existing tool at `decision.html`. The homepage is intentionally unframed and has no sidebar or progress meter. Its illustration precedes the headline, description, invitation and primary action. The briefing uses one shared workspace frame. The 12 decision sections retain their existing shell and framing.

The approved homepage headline is “A good decision begins with Clarity”. Only “Clarity” receives two loose underline strokes in the existing `--cl-honey` token (`#FAE69E`). The user-approved constellation illustration is bundled locally; no generated text is baked into the live page. Honey accents in this entry-page illustration/underline are a scoped brand treatment, not a decision assessment or selection state. Maintain a text heading and native link controls, meaningful image alt text, responsive widths, adequate inner padding and visible keyboard focus. `Let’s begin` leads to the briefing; the briefing leads to the existing tool. The optional returning-user shortcut reads saved state without changing it.

**Every main Clarity page uses one continuous 2px charcoal frame around its primary working surface.** Default radius: **14px**. Frame color: **`#343832`**. It provides a repeated design signature and establishes the task boundary.

It is structural, remains visible while the workspace is idle, and does not indicate which field has focus. Keyboard focus uses a separate ring on the actual control.

Apply the frame to the smallest coherent region containing the page’s primary task, not to every card and not to the browser-sized page. Multiple questions can sit within the same frame using spacing and thin separators. Do not add a second nested signature frame around an active driver card.

| Surface | Default treatment |
| --- | --- |
| Application/browser canvas | No enclosing border |
| Main workspace | 2px charcoal; 14px radius; light working surface |
| Supporting cards | Soft neutral fill; 14px radius; no heavy border |
| Fields | Ivory-white fill; 1px functional boundary; 10px radius |
| Small contained items | 10–12px radius |
| Buttons and short pills | Fully rounded |
| Dialog | 14px radius; 1px boundary; restrained overlay elevation |

If the primary task spans several stages, keep a stable workspace frame while its contents change. On small screens, retain the 2px frame and reduce padding; do not remove the signature solely because the layout stacks. Print can use a thin monochrome outline if the heavier frame wastes space.

Avoid decorative heavy underlines, heavy borders on all containers, large drop shadows and repeated concentric boxes. Surface differences should remain subtle; structural frames and actual control boundaries have separate jobs.

## 8. Icons and shape language

Use one consistent Lucide outline icon family or an explicitly adopted equivalent throughout the app. Production integration must bundle or supply the chosen library consistently rather than depending on a mock renderer.

Default icon box: 16px for navigation, inline controls and compact labels; 20px for section-title accents; 24px only for occasional empty states. Normal outline stroke: approximately 1.75–2.0 in the chosen icon system. Do not mix emoji, filled icons and unrelated outline families as interchangeable navigation symbols.

Icons aid recognition of navigation, editing, adding, removing, expanding, copying and downloading. Keep visible text for ambiguous actions. Decorative icons are hidden from assistive technology. Icon-only actions need accessible names and a visible tooltip on hover/focus where useful.

Circular neutral icon backgrounds may be used for section headers. Do not put every icon in a colored circle. Green filled circles are specifically reserved for completion indicators. A small icon must have a larger interaction area when it is actionable.

## 9. Navigation and section completion

### Global homepage route

The Clarity wordmark links to `index.html` on the homepage, briefing and every decision page. Provide an explicit **Home** link with the bundled outline house icon as well: top right on the briefing, below the wordmark/tagline and above a neutral divider on the desktop tool sidebar. Keep Home separate from the twelve decision sections; it has no section number, progress state or completion badge.

On mobile, the tool's top row contains **Clarity**, **Home** and **Sections**. Home is always available when the section menu is closed or open. Preserve at least 44px targets and the shared compact-control internal insets. The section menu retains its existing keyboard behavior, expanded state and section selection logic. Links and controls must fit at 320px without clipping or overlap.

Use **Home**, not **Back**, for the homepage destination. Home and the wordmark perform ordinary navigation without resetting saved state, marking a section reviewed or introducing a confirmation dialog. The homepage's **Continue my decision** shortcut resumes existing saved work at the recorded section in the same browser. The working tool's section-level Back/Continue and explicit New decision behavior remain unchanged.

Retain the current page order and approved names:

**Decision → What Matters → Trade-Offs → Incentives → Compounding → Further Consequences → The Devil’s Advocate → Stress Test → Reversibility → Decision Drivers → Judgment Check → Decision Overview.**

Each row has three stable columns: **16px icon, flexible label, 14px status slot**. Use an 8px gap. Reserve the status slot even when no completion icon is present. Navigation rows are at least 44px tall; long labels may wrap, increasing row height. All status badges stay aligned to the same right column.

### Completion badge proportions

- Circle: 12 × 12px, `#CAE1C5`, no heavy outer ring.
- Check: 10 × 10px SVG box, `#344332`, centered with flex/grid; stroke approximately 2.6.
- Center the circle vertically in its row and horizontally in the 14px reserved status slot.
- Do not enlarge it to match a 16px navigation icon. The status indicator is subordinate.
- Do not align it with `margin-left:auto` against variably wrapping text.
- The badge is not a separate tiny button. The navigation row is the interactive target.

These dimensions reproduce the latest mock correction; validate the chosen icon’s optical balance at actual size. A 10px icon box does not mean the drawn glyph should fill every pixel.

### Independent row states

| State | Label/icon | Left marker | Completion slot |
| --- | --- | --- | --- |
| Incomplete, inactive | Neutral light | None | Empty reserved slot |
| Incomplete, current | Soft pink | 2px soft pink | Empty reserved slot |
| Complete, inactive | Neutral light | None | Small green circle/check |
| Complete, current | Soft pink | 2px soft pink | Same green circle/check |

Hover uses a subtle dark neutral surface. Focus uses a soft-pink outline on the dark sidebar; the plum focus token is for light surfaces. Never turn the green circle pink when its section becomes current.

Use `aria-current="page"` for current page navigation. Convey completion through accessible text such as “Decision Drivers, completed,” while keeping the visible label exact. Completion comes from the existing product rules. The design must not redefine completion as merely opening a page, writing any text or resolving every uncertainty.

If the current review is invalidated by an edit under existing rules, remove its completed indicator accordingly and show the approved local review messaging. Do not invent permanent warning badges, new completion scores or new mandatory acknowledgements.

## 10. Buttons and actions

| Variant | Appearance | Use |
| --- | --- | --- |
| Primary | Dark fill, ivory-white text, pill | One main action within a task/action group |
| Secondary | Transparent/light neutral, 1px control border, dark text | Supporting or cancel action |
| Text link | Dark/plum text with visible underline where appropriate | Local navigation or low-emphasis action |
| Icon button | Neutral circular surface | Familiar compact action with accessible name |
| Destructive | Error-colored text/border, explicit wording | Removing/resetting user content |

Default button height: 40px, 14–16px horizontal padding; minimum touch target: 44px where practical. Compact 32–36px secondary buttons may be used in dense desktop editors with adequate spacing. Icon-only controls should provide at least a 40px target, 44px on touch layouts. Do not confuse a small glyph with a small target.

Keep action hierarchy local: Add, Save, Continue, Copy and Update are not all primary at once. Use verb-object labels when the object is not clear. Preserve existing approved action wording.

Hover changes fill/border without movement. Pressed state may darken slightly. Disabled controls use a clearly inactive surface and cannot activate; explain why where the reason is not obvious. Busy actions prevent duplicate submissions and use a brief truthful status label. Selection pink is not a replacement for the primary action color.

## 11. Writing fields and conditional answers

A writing group follows one order: **persistent question → relevant guidance/definitions and personal context → example → answer field → existing answer-state controls/status**. Examples are local to the question they support, not collected at the bottom of the page. An input label can remain immediately beside its field when a larger question introduces the group. In Reversibility, the direct writing label comes before its helper/example. Preserve conditional visibility and existing disclosure states; a collapsed example stays in the same position before writing. Do not move essential definitions into an optional example.

Use 16px input text, a 44px minimum single-line height and about 120px initial height for a main narrative field. Short supporting textareas can start near 88px. Allow vertical resizing or accessible auto-growth. Long writing must not be clipped, replaced by ellipses or forced into a tiny fixed-height editor.

Placeholders give a short starting cue; they do not replace a label or contain the only instruction. Full example answers stay visibly outside and before the related field (or in the existing local disclosure), so typing does not erase the example. Keep short writing cues in the empty field. Samples are never saved as the user’s response. Decision and Trade-Offs now display their existing sample text above the field rather than keeping the full sample only in the placeholder.

Field states: default, hover, focus, filled, unknown/inactive, invalid and read-only. Filled fields keep the same neutral styling; they do not turn green. A focus ring does not change the answer state. Invalid fields use error text and an error border with an associated message; do not use pink as an error signal.

For an existing “I don’t know yet” control, preserve the current retained-writing behavior. Associate the label and helper correctly, convey why the field is inactive and keep writing available when the user switches back. Unknown, blank, none and not applicable remain distinct wherever the product already distinguishes them.

Conditional answers reveal directly beneath the controlling choice. Change visibility without replacing unrelated input nodes, clearing writing or moving focus unnecessarily. If an active element is about to be hidden, move focus to its controlling choice deliberately. Do not preselect sample responses used in the showcase for new production decisions.

## 12. Choices, pills, tiles and assessment controls

Use native radios for mutually exclusive choices and native checkboxes for independent selections. Put related radios in a labelled group. Pill appearance must not disguise the underlying selection semantics.

| State | Surface | Boundary/indicator |
| --- | --- | --- |
| Unselected | Ivory-white or neutral | Functional 1px border and native indicator |
| Hover | Slightly warmer neutral | Same dimensions |
| Selected | Soft pink or pink | Plum outline plus checked/pressed indicator |
| Focused | Existing state remains | Additional visible focus ring |
| Disabled | Inactive neutral | Inactive control and explanation where needed |

Use `aria-pressed` for real toggle buttons; use radio semantics for one-of-many choices. Do not add `role="tab"` unless implementing the complete tab interaction pattern. Stage buttons can remain ordinary buttons with an explicit current state.

Tiles may combine a short title and brief explanation. Keep selectable targets large and labels clickable. A limit such as choosing up to three priorities must be announced and enforced using the existing rule, without silently deselecting a prior answer.

Assessment values remain visually neutral choices. Use pink for whichever answer is selected. Never color “Supports it” green and “Against it” red, or make stronger evidence brighter. Preserve the existing Driver directions exactly: **Supports it / Against it / Neither / Not sure**. Strength is not probability; evidence labels are user assessments. A styling update must not rename or merge these meanings.

## 13. Guidance, examples and reference material

| Content type | Treatment | Information order |
| --- | --- | --- |
| Essential definition | Neutral helper text | Visible before the choice |
| Short example or optional coaching | Small honey surface, labelled | After its question and guidance/context, before the related answer; existing disclosures stay local |
| Earlier user writing | Greyish ivory reference card | Explicit source, current/history status and exact text |
| Long guide | Neutral disclosure/table | Clear summary; expands locally |
| Open information need in Overview | Blue region | Clear heading, unanswered items and existing action |

The reflections column remains neutral because it contains reference material to work with. Blue should identify an information need, not all content from another page. Honey is assistance, not a good/bad result or a universal warning background.

Use one small icon and a concise label if they help recognition. Do not repeat the same helper in several cards. Do not hide a definition necessary to understand the initial choices. Disclosure controls need visible expanded/collapsed state, keyboard operation and a correctly associated content region.

## 14. Repeated cards, tables and consequence chains

### Repeated cards and boundaries

Use the same radius, title hierarchy, field styling and action placement across boundary items, checks, adjustments and driver cards. Add controls sit after the list or at a consistent group header. Removing a card must affect the correct stable item even after earlier items are removed. Preserve existing undo and retained-state behavior.

Hard boundaries remain distinct from ordinary drivers and scores. Use explicit labels and existing compatibility states, not decorative red/green outcome coding. Do not make every hard-boundary card another 2px framed workspace.

### Tables

Use visible headers, left-aligned prose, top-aligned cells and thin row separators. Avoid alternating bright fills and oversized gridlines. Keep controls inside cells large enough to operate. On narrow screens, reflow to labelled rows/cards when relationships remain clear; preserve a horizontal table region only when two-dimensional comparison is essential, and label its scroll area. Do not make the whole page scroll horizontally.

### Further Consequences

Frame immediate change and both consequence trails as one coherent workspace. Use thin neutral connectors and indentation; connectors indicate sequence, not certainty. Start both trails from the same immediate change. Use neutral styling for all later nodes: a trail’s first possibility does not make every later consequence good or bad.

Place “Then what?” and “That’s it” next to the relevant continuation. Finished trails show a clear local end/reopen state according to current behavior. Adding a node may move focus to its field, but must not discard previous writing. Empty/finished trails preserve their existing completion rules. On small screens, stack trails with their headings intact.

## 15. Decision Drivers and source relationships

Desktop layout: neutral reference library on the left; editing workspace on the right, approximately 45/55 where content permits. **The 2px signature frame surrounds the whole right editing workspace.** Individual driver cards inside use space, light surfaces and thin dividers.

The current source destination must be visible through explicit text and a selected/current treatment. Keep that pink treatment separate from the structural frame. The frame remains in place when the destination changes.

Selecting a source uses pink fill, a visible checkbox and a clear destination. Source text remains exact and available. Supporting reflections sit directly below the driver title and can expand. Keep source section names and freshness/history labels near the quote they describe.

Preserve automatic grouping, manual drivers, move correction, last-link hiding/restoration, stable identities and retained assessments. Do not replace them with visually attractive but behaviorally different drag-and-drop. If drag-and-drop is later added, provide an equivalent accessible move action and obtain a functional decision first.

The two review checkboxes retain their exact wording in both states:

- **This is still relevant**
- **This is my thinking now**

Their visual checked state is pink/neutral control selection, not a green section-completion badge. These controls have different meanings and must not be collapsed into one toggle. Make current versus earlier quote versions and inactive sources explicit. The UI must not imply external verification of a source.

Keep **Why this matters** and the expectation-basis question distinct in presentation and meaning. Preserve the entire expectation/dependency guidance and existing Overview/export content. The abbreviated component mock does not authorize shortening the production page.

## 16. Reversibility and review connections

Retain the current two opening responses, **Reversible / Irreversible**, with visible definitions and no new default selection. Selected state is pink. Do not assign green to reversible or red to irreversible; they are provisional user judgments, not safe/unsafe classifications.

Keep the practical route, lasting commitments, possible adjustments and relevant checks in their approved trail/stage structure. The main frame stays stable around the active task. Optional practical-demand selections use normal tile/pill selection styling. Reuse existing local stage behavior; do not add new required steps to showcase every component.

First pass uses ordinary neutral task styling without change warnings. After a linked basis changes, put **Does your assessment still fit?** beside the affected existing assessment and identify the actual changed section. Preserve **See what changed / Keep my assessment / Change my assessment / Save assessment** and their existing behavior. Do not add permanent generic “Needs another look” badges.

**Use this approach** leads to the existing editable confirmation. **Update my decision** adopts; **Keep considering it** cancels. Preserve earlier wording and snapshots and the existing affected-review reopening rules. These functional interactions are not new proposals in this playbook.

Do not add “Return to [page]” shortcuts or mandatory Reversibility acknowledgements. Use the established sidebar and approved contextual actions. Supporting notes are labelled as notes, not silently counted as tasks.

## 17. Overview and export

The report is a main working/reading surface with the shared charcoal frame and light paper-like interior. Retain the full product report. Order and content come from the current product specification, not from the abbreviated showcase.

Use neutral sections for the decision, current thinking, assessed drivers, supporting context and earlier writing. Blue is reserved for **What you still need to find out**. Keep explicit unresolved checks distinct from notes, incomplete capture, review status, hard-boundary conflicts and historical answers. A completed section may still contain unresolved information.

Show status in words with any icon/color. Do not turn a report into a green readiness certificate, a recommendation or an unsupported all-clear. Repeated representations of a quote remain one piece of evidence.

Use collapsible supporting context for long details while keeping essential warnings and current outcomes visible. Keep existing edit/review actions near the relevant content. Copy/export controls are a compact action group; announce success only after the operation succeeds and show recoverable failure states.

Raw export previews use monospace with wrapping where practical. Preserve exact writing, source IDs, active/inactive/history distinctions and schema. Print/export styling should use readable monochrome hierarchy, avoid clipped text and not rely on colored panels to carry meaning. Never print navigation as part of the user’s report unless the export explicitly requires it.

## 18. Shared states, feedback and recovery

| State | Presentation | Required behavior |
| --- | --- | --- |
| Empty | Neutral surface, short explanation, one useful action | No implied failure or placeholder answers |
| Saving | Small truthful status near context | Does not steal focus or block writing |
| Saved | Quiet text/icon | Only after successful persistence; do not imply cloud sync |
| Save failed | Persistent local message with recovery | Keep entered text; explain available recovery |
| Loading | Neutral placeholder or short text only if needed | No fabricated AI/thinking animation |
| Unknown | Explicit answer state | Distinct from blank; preserve prior writing |
| Incomplete | Text and contextual action | No premature validation while freely typing |
| Review changed | Approved local changed-basis prompt | Only affected assessments; preserve first-pass experience |
| Historical/inactive | Clear label with neutral lower emphasis | Remains readable and available, not current evidence |
| Validation error | Error border, icon/text and instruction | Associate message; preserve answer |
| Copy/download success | Brief local status | Announce politely; no modal required |
| Operation failed | Concrete message and retry/fallback | No false success state |

Do not use a toast as the sole location of an important save error. Do not clear the page on a failed export. Keep status announcements concise and avoid announcing every keystroke. Existing autosave and review-invalidation rules remain unchanged.

## 19. Dialogs and destructive actions

Use a dialog for a consequential confirmation or an existing focused editing flow. Avoid confirmation dialogs for routine navigation, opening a disclosure or changing a reversible selection.

Dialog surface: ivory-white, 14px corners, clear title, concise explanation, fields if relevant, and a clear action group. Default maximum width around 520px with a 16px viewport margin. On narrow screens, allow the dialog body to scroll and keep its title/actions accessible.

Trap focus only in a true modal, make the background inert, supply an accessible name, provide a visible cancel/close action, support Escape where appropriate and restore focus to the opener. Put initial focus on a useful field or safe action. Do not default focus to destructive confirmation.

A destructive action names what it removes. Reset/new-decision actions must follow existing persistence and confirmation behavior. A palette change is not permission to clear browser data. Preserve recoverable undo where already supported; new deletion/undo behavior needs its own implementation decision.

## 20. Responsive behavior

These are starting breakpoints, to adjust through actual content testing rather than device labels.

| Available viewport | Shell and content |
| --- | --- |
| 1100px and wider | Full sidebar; reference/editor columns where useful; 32px main padding |
| 760–1099px | Sidebar may narrow to about 208px; 24px main padding; stack workspace columns when fields become cramped |
| Below 760px | Section-menu trigger; full-width page; 16px padding; single-column writing and stacked reference/editor |

Do not force an icon-only sidebar that hides section meanings. A mobile section drawer keeps labels, current state and small completion circles. Its trigger exposes open/closed state, supports keyboard operation and returns focus correctly. If modal, apply modal rules; if inline, do not trap focus.

At narrow widths, reference material should appear as an accessible disclosure before the editor; opening it must not clear the editor. Stack assessment controls with their labels rather than shrinking text. Actions may wrap, with the main action in a clear stable position. Long titles, quotes and translated strings must wrap without displacing status badges.

Keep the 12px completion badge; increase the row target, not the glyph. Test 320 CSS-pixel reflow and browser zoom. Content that genuinely requires two-dimensional layout needs a contained exception, not a page-wide horizontal scrollbar.

## 21. Accessibility and motion

Target WCAG 2.2 AA for production implementation and testing. The playbook is a design target, not a conformance statement.

- Ordinary text should meet at least 4.5:1 contrast; qualifying large text at least 3:1. Treat 4.5:1 as the default target for all product copy.
- Required component boundaries and meaningful graphical indicators need at least 3:1 against adjacent colors where the criterion applies. Pale decorative dividers have a different role.
- Visible keyboard focus is mandatory. On light surfaces use a 2px plum outline with 3px offset; on the dark sidebar use soft pink. Inspect actual adjacent colors and forced-color behavior.
- The 2px structural workspace frame is not the focus indicator. Sticky headers, footers and overlays must not hide focused controls.
- WCAG 2.2’s pointer target minimum is 24 × 24 CSS pixels, with defined exceptions. Clarity’s preferred ordinary touch target is 44px; compact controls require appropriate target size/spacing. A decorative 12px completion circle is not an interactive target.
- Use semantic headings, landmarks, labels, fieldsets, legends, native controls and visible error text. Names must include visible action wording.
- Do not convey selection, completion, warnings or current/history status with color alone.
- Keep logical reading and tab order after reflow. Native radios use normal arrow-key behavior; do not implement every radio as an unrelated tab stop.
- Test keyboard-only operation, screen reader naming/announcements, zoom, text-spacing overrides, high contrast/forced colors and reduced motion.

Default motion: 120–180ms color/opacity transitions. No bouncing completion badges, celebratory confetti, large selection animations or continuous animated gradients. Respect `prefers-reduced-motion`; immediate state changes are sufficient. Avoid smooth auto-scrolling when it disorients the user.

Relevant W3C references are listed in section 28. Meeting a few color and size checks does not establish full compliance or usability.

## 22. Language and information integrity

Follow the existing `CLARITY_LANGUAGE_GUIDE.md` and the latest dated product decisions. Use plain language, sentence-case labels and neutral descriptions. Preserve approved page names and source wording.

Do not introduce internal terms such as schema versions, stale flags, data migrations or model architecture into ordinary user flows. Explain an actual user consequence, such as a changed answer or an earlier assessment, using approved language.

Preserve these distinctions in labels and hierarchy:

- Selected versus completed.
- Completed/reviewed versus resolved information.
- Current writing versus retained earlier writing.
- User-assessed evidence versus independently verified fact.
- Directional strength versus probability/confidence.
- A possible adjustment versus an adopted current approach.
- A written note versus an unanswered check.
- An information need versus a system error.

Use generic fictional examples. Do not insert the owner’s personal life or earlier private decisions into reusable screenshots. Do not silently rewrite user quotes to improve layout. Escape user content and preserve exact exported writing.

## 23. Page-by-page application map

This map assigns visual structure to all current pages. It does not replace the detailed page specifications or authorize removing fields not listed here.

| Page | Signature frame contains | Supporting treatment and accents |
| --- | --- | --- |
| Decision | Main choice/context writing and current existing timing groups | Neutral context; pink answer selection; local neutral history/review invitation |
| What Matters | Life-direction reflection, priorities and boundaries as a coherent workspace | Neutral priority tiles; selected pink; boundaries explicitly labelled |
| Trade-Offs | Sacrifice/alternative exploration task | Neutral guides; honey examples; no automatic ranking color |
| Incentives | Rewards/relief reflection and alignment task | Neutral guide table/disclosure; honey example; pink existing responses |
| Compounding | Current choice context and three written reflections | Neutral life-area guide; honey example; no gain/loss green/red scheme |
| Further Consequences | Immediate change plus both consequence trails | Thin neutral connectors; locally labelled continuation/end states |
| The Devil’s Advocate | Failure/outcome writing and its choice connection | Neutral example and guidance hierarchy; selected pink; no danger-themed full page |
| Stress Test | Assessment and accompanying capacity/setback writing | Neutral scenarios; honey coaching; existing explicit tolerance/status labels |
| Reversibility | Active reversible route or irreversible stages | Pink trail/stage selection; neutral source reuse; guidance before writing |
| Decision Drivers | Entire right editing workspace | Left reflection library greyish ivory; selected sources/current destination pink |
| Judgment Check | Relevant choice groups and conditional writing | Neutral questions; honey examples; pink response state; no bias diagnosis styling |
| Decision Overview | Full report body | Blue open-information panel; neutral driver groups, warnings and history; compact dark export actions |

On Drivers, the expectation-basis group may sit below the two-column area using the existing layout. It must not receive a second heavy frame just to match the editor. The whole page should still read as one coherent task.

## 24. Design tokens and implementation contract

### Shared token contract

The following definitions describe the production token contract. `styles.css` is the authoritative executable definition; compatibility variables alias these semantic tokens. Update this reference when the contract changes.

```css
:root {
  --cl-canvas: #FAF4E4;
  --cl-surface: #EDE8DC;
  --cl-surface-reference: #E4E0D4;
  --cl-surface-work: #F9F5EB;
  --cl-field: #FFFCF3;
  --cl-ink: #20211F;
  --cl-muted: #64645D;
  --cl-sidebar: #141513;
  --cl-sidebar-ink: #EAECE3;
  --cl-sidebar-muted: #B8B9AF;
  --cl-primary: #171A16;
  --cl-primary-hover: #343832;
  --cl-pink: #EDBDDF;
  --cl-pink-soft: #F8DEED;
  --cl-pink-ink: #71375C;
  --cl-selection-border: #98537C;
  --cl-blue: #D5E2F4;
  --cl-blue-ink: #34465F;
  --cl-honey: #FAE69E;
  --cl-honey-ink: #5F542D;
  --cl-green: #CAE1C5;
  --cl-green-ink: #344332;
  --cl-frame: #343832;
  --cl-divider: #D7D2C6;
  --cl-control-border: #858176;
  --cl-focus: #8A4A73;
  --cl-error: #9C3648;
  --cl-error-surface: #FAE8EA;
  --cl-disabled-surface: #DDD9CF;

  --cl-font: "Manrope", system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  --cl-radius-field: 10px;
  --cl-radius-small: 12px;
  --cl-radius-workspace: 14px;
  --cl-radius-sidebar: 18px;
  --cl-radius-pill: 999px;
  --cl-frame-width: 2px;
  --cl-space-1: 4px;
  --cl-space-2: 8px;
  --cl-space-3: 12px;
  --cl-space-4: 16px;
  --cl-space-5: 20px;
  --cl-space-6: 24px;
  --cl-space-8: 32px;
  --cl-space-10: 40px;
  --cl-space-12: 48px;
  --cl-inset-workspace: var(--cl-space-6); /* 16px on narrow layouts */
  --cl-inset-panel: var(--cl-space-4);
  --cl-inset-row-block: var(--cl-space-2);
  --cl-inset-control-inline: var(--cl-space-3);
--cl-size-page:1.875rem;--cl-size-section:1.375rem;--cl-size-question:1.125rem;
 --cl-size-body:1rem;--cl-size-label:.875rem;--cl-size-meta:.75rem;
 --cl-line-page:2.375rem;--cl-line-section:1.875rem;--cl-line-question:1.75rem;
 --cl-line-body:1.625rem;--cl-line-label:1.375rem;--cl-line-meta:1.125rem;
 --cl-weight-body:400;--cl-weight-control:500;--cl-weight-label:600;--cl-weight-heading:700;
 --cl-type-body:var(--cl-size-body);--cl-type-label:var(--cl-size-label);--cl-type-meta:var(--cl-size-meta);
  --cl-sidebar-width: 232px;
  --cl-control-height: 44px;
  --cl-completion-size: 12px;
  --cl-completion-icon: 10px;
  --cl-status-column: 14px;
  --cl-motion-fast: 150ms;
}

.cl-workspace {
  border: var(--cl-frame-width) solid var(--cl-frame);
  border-radius: var(--cl-radius-workspace);
  background: var(--cl-surface-work);
  padding: var(--cl-space-6);
  min-width: 0;
}
.cl-nav-row {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) var(--cl-status-column);
  gap: var(--cl-space-2);
  align-items: center;
  min-height: 44px;
}
.cl-nav-label { min-width: 0; }
.cl-completion {
  display: grid;
  place-items: center;
  justify-self: center;
  width: var(--cl-completion-size);
  height: var(--cl-completion-size);
  border-radius: 50%;
  background: var(--cl-green);
  color: var(--cl-green-ink);
  line-height: 0;
}
.cl-completion svg {
  display: block;
  width: var(--cl-completion-icon);
  height: var(--cl-completion-icon);
  stroke-width: 2.6;
}
.cl-control:focus-visible {
  outline: 2px solid var(--cl-focus);
  outline-offset: 3px;
}
.cl-sidebar .cl-control:focus-visible {
  outline-color: var(--cl-pink);
}
@media (prefers-reduced-motion: reduce) {
  .cl-control { transition: none; scroll-behavior: auto; }
}
```

### Engineering rules

Reuse existing component structures and shared classes. Define new colors, radii and spacing through semantic tokens, not page-specific hex values. Remove superseded overrides as the rollout advances; do not accumulate competing themes at the bottom of `styles.css`.

Keep presentation changes separate from data migrations. Preserve stable field IDs, source IDs, event bindings, user writing, current/history semantics, local persistence and export schema. A full page rerender must not disrupt active writing or assistive technology unnecessarily.

Retain the current lightweight HTML/CSS/JavaScript architecture unless a separate technical decision authorizes changing it. A style refresh does not require a framework rewrite, backend, login or AI API.

Do not turn a component showcase into the functional specification. The current product and language guide remain the source for complete questions, choices, examples and interactions.

## 25. Maintenance, change control and adoption

### Adoption record

The product owner reviewed the full component mock, accepted it and explicitly authorized updating the application and both repositories on 17 October 2026. Version 1.0.0 establishes this standard. The rollout adds the shared stylesheet, local Manrope font and licensed Lucide sprite; updates sidebar markup and the Overview information-needs styling hook; adds the contributor rules and production component showcase; and updates the private documentation links and history. No reasoning or data migration is introduced.

Read `docs/UI_ROLLOUT_2026-10-17.md` for actual validation and remaining limits. Future design changes follow the maintenance process below. Repository publication follows the user's existing explicit authorization practices; routine implementation choices within an authorized task do not need repeated permission.

Version 1.1.0 was approved on 18 October 2026 following the all-page typography audit and focused mock. It enforces the shared role scale, separates known report labels from exact writing, and simplifies the pending-work heading to “Things to finish or review.” It changes presentation and status copy only; completeness, reasoning, stored writing and exported strings retain their existing meanings.

Version 1.2.0 standardizes page introductions and local example placement across the product on 18 October 2026. Existing description and example wording is relocated; brief introductions are added to Decision, What Matters and Overview where there was no page-level orientation. Existing examples in Decision and Trade-Offs become persistent above-field content, with shorter placeholder cues. This preserves questions, answers, conditional behavior, review rules and exports.

### Every future UI update

1. Read the adopted playbook and relevant current product/language guidance.
2. Identify affected components and existing reusable patterns.
3. Implement within the rules. If a new rule is needed, document the problem, proposed rule, affected pages and alternatives before treating it as standard.
4. Update the showcase for new components/states. Keep long text, narrow layouts, selected/completed combinations and error states represented.
5. Verify relevant behavior and layout. Do not call DOM tests a visual browser test.
6. Update the playbook only when the rule changes; ordinary compliant fixes do not need an artificial version bump.
7. Record a meaningful rule change in `UX_UI_LOG.md` and `CHANGELOG.md`; update current product status and open questions as applicable.
8. Record rollout scope and any temporary exceptions. An exception needs a reason, owner and follow-up; it does not quietly become another theme.

### Versioning

Use semantic-style versions for the standard: patch for clarification with no intended UI change; minor for compatible new components or defaults; major for changed palette roles, typography family, navigation architecture or visual identity requiring coordinated migration. Draft versions remain marked draft. Record date, rule IDs/sections, reason and rollout status with each adopted version.

The product owner approves changes to the design standard. Developers may make routine implementation choices within it. Repository publication and functional changes follow existing authorization practices; do not invent a separate approval gate for every reversible spacing fix.

### Repository maintenance map

The application README links to this standard, the component showcase and the rollout record. `AGENTS.md` makes reading the playbook part of UI work. The private notes README links here; `UX_UI_LOG.md` explains visual decisions, `CURRENT_PRODUCT.md` records implementation status, `CHANGELOG.md` indexes the change and `OPEN_QUESTIONS.md` tracks unresolved validation. Update the language guide only if wording changes; update psychological/reasoning registers only when that scope changes.

## 26. Quality checklist and review templates

### Required review checklist

- [ ] Main task and next action are evident without reading all helpers.
- [ ] Page uses the shared shell, type scale, spacing and shape system.
- [ ] Text has internal space on all four edges of every filled/framed surface, including collapsed, expanded, active, hover and narrow states.
- [ ] One 2px structural frame encloses the appropriate primary workspace.
- [ ] No browser-sized decorative frame or nested heavy card frames.
- [ ] Pink means selection/current state; green means section completion.
- [ ] Blue is assigned to open information needs; reflection library stays neutral.
- [ ] Honey guidance is subordinate to personal writing.
- [ ] Current and completed sidebar states work independently.
- [ ] Completion circles stay 12px, centered in a fixed status slot with long labels.
- [ ] Required control boundaries, text and focus states meet the chosen contrast targets.
- [ ] Controls have labels, correct semantics and practical interaction targets.
- [ ] Keyboard, focus restoration, disclosure and modal behavior work.
- [ ] Narrow layout, long content, zoom and font fallback are checked.
- [ ] Unknown/none/blank, current/inactive/history and reviewed/unresolved remain distinct.
- [ ] Switching choices preserves writing and existing grouping/review behavior.
- [ ] Save/copy/export feedback reflects actual outcomes.
- [ ] Full Overview/export content and approved wording are preserved.
- [ ] Appropriate current regression suites pass when implementation changes could affect behavior.
- [ ] Real-browser visual/accessibility checks are recorded separately from automated tests.
- [ ] Documentation identifies implemented work, remaining validation and temporary exceptions.

### Standard change record

```text
Change ID:
Date and playbook version:
Problem observed:
Evidence / affected user task:
Rule or component changed:
Reason and alternatives considered:
Affected pages and states:
Functional/data impact (or none):
Approval / decision status:
Implementation scope and commit:
Validation actually completed:
Known limitations / open follow-up:
```

### UI pull-request description template

```text
Problem and resulting behavior:
Affected components/pages:
Playbook rules followed or proposed change:
Representative before/after views:
Behavior/data compatibility:
Validation completed:
Remaining checks or temporary exceptions:
Documentation and showcase updates:
```

### Future assistant/developer brief

> Work on Clarity’s UI using the adopted UI/UX Playbook. Keep the warm ivory/greyish ivory surfaces, dark sidebar, rounded sans typography, outline icons, pill controls and one charcoal structural frame per primary workspace. Pink is selection, green is completion, blue is open information needs and honey is optional guidance. Reuse tokens and components. Preserve approved wording, reasoning, assessment, persistence, source/history and export contracts. Distinguish implemented work from proposed work and record actual validation. Propose any new design rule explicitly rather than introducing a one-off style.

## 27. Decision register and validation backlog

| ID | Decision/status | Next action |
| --- | --- | --- |
| UI-01 | Adopted warm neutral/pastel direction | Preserve semantic token roles |
| UI-02 | Agreed neutral reflection library; blue Overview information needs | Continue testing long production reports |
| UI-03 | Agreed filled soft-green completion circle | Browser-measured at 12px/10px; monitor future navigation changes |
| UI-04 | Latest mock uses structural 2px charcoal workspace frame | One frame verified per page at five widths |
| UI-05 | Manrope adopted and bundled; original reference font unverified | Maintain local asset/license and fallback tests |
| UI-06 | Production type/spacing/width/breakpoint defaults adopted | Review at actual desktop/mobile size |
| UI-07 | Darker functional boundaries and dark-surface focus adopted | Verify all adjacent color/state combinations |
| UI-08 | Error/recovery presentation adopted as shared default | Integrate with real error conditions, no invented save state |
| UI-09 | Canonical documentation structure adopted | Keep public standard and private history linked |
| UI-10 | Build 20261017-ui-playbook implements the shared presentation | Track page-level adoption and outstanding browser/accessibility checks |
| UI-11 | Playbook 1.1.0 / build 20261018-typography enforces type roles and approved review wording | Maintain all-page computed-style checks and structured label/value rendering |
| UI-12 | Playbook 1.2.0 / build 20261018-content-order unifies descriptions and examples | Keep one introduction before references and each example before its related answer |
| UI-13 | Playbook 1.2.1 / build 20261018-surface-insets enforces internal surface spacing | Use role-based inset tokens and inspect populated/expanded/collapsed/hover/narrow states |
| UI-14 | Playbook 1.2.2 / build 20261018-button-insets covers transparent text-button bounds | Edit, Review, Add and Show more share 8px vertical / 12px horizontal padding; inspect focus outlines as well as painted surfaces |

Minimum visual review set: empty/fresh writing; long writing; completed inactive section; completed current section; long wrapped nav label; unknown with retained writing; selected source and active destination; changed assessment; Reversibility trail switch; Overview information needs and historical content; narrow menu; dialog; validation/save/export failure.

Pending checks must remain pending until performed. Source inspection and calculated ratios provide useful evidence, but neither verifies layout, screen-reader experience or user understanding. Do not mark the entire design “validated” because the HTML parses.

## 28. Sources and evidence limits

### Product and design evidence

- Originating visual reference: the full component showcase accepted in the design conversation on 17 October 2026. The maintained [production-style component showcase](../design/component-showcase.html) now records reusable states using the same stylesheet/assets as the app. Neither showcase substitutes for the complete product specification.
- [Application README](https://github.com/Gabriel-Jasmine/clarity/blob/main/README.md), inspected 17 October 2026, file SHA `34787ad5d6419b74b889e289d8b434fd85c0200c`.
- [Product-notes README](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/README.md), file SHA `8203c8a44fffeead16e886d0bb0fa91237f1de09`.
- [Current product](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/CURRENT_PRODUCT.md), file SHA `9614fb7a12eda358ff4446c6f9e9d0dd2a9b9378`.
- [UX/UI history](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/UX_UI_LOG.md), file SHA `947e63447e11a4b14ef69e586c2afc6f744f43d0`.
- [Language guide](https://github.com/Gabriel-Jasmine/clarity-product-decision-notes/blob/main/CLARITY_LANGUAGE_GUIDE.md), file SHA `f1ac84146e9f86580a04614a2e4abdc601107460`.

These are inspected file versions, not claims about later repository state. Product notes contain historical descriptions; the latest dated entries govern the current behavior. The new visual direction supersedes earlier serif/dither exploration, while historical reasoning remains available.

### Accessibility references

- W3C, [Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- W3C, [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- W3C, [Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- W3C, [Focus Not Obscured (Minimum), SC 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).
- W3C, [Reflow, SC 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

References checked on 17 October 2026. The Understanding pages explain the criteria; the normative WCAG recommendation determines conformance. This playbook’s 44px preferred touch targets and typography/spacing defaults are Clarity design choices, not claims that WCAG prescribes those exact values.
