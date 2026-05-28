## Overview

Sentri's design language reads like a debugging console wearing a leather jacket. The home and product surfaces sit on a near-black violet midnight (`{colors.surface-canvas-dark}` / `{colors.surface-night}`), strewn with starfield textures and floating sticker-style mascots — astronauts, monsters, traffic cones — that puncture the seriousness of an observability product. Headlines run in a chunky proprietary display sans where the most important keywords are wrapped in lime-green highlight chips (`{colors.accent-lime}`), as if the copy itself has been marked up by a developer redlining their own console output.

The palette is deliberately narrow: deep midnight as the dominant canvas, electric lime as the primary attention-grabber, hot pink (`{colors.accent-pink}`) as a secondary punctuation, and a violet-mid (`{colors.accent-violet-mid}`) for tag chips and hairline strokes. White appears in two roles — as text on dark, and as the canvas for pricing, contact, and content-heavy pages where developers need to scan dense tables. The "single primary CTA" is visually inverted depending on context: filled black-violet (`{colors.primary}`) with white type on light surfaces, or filled white with dark type on dark surfaces. The button always reads as the strongest UI affordance regardless of polarity.

Typography splits cleanly between three families: a custom display sans for hero and section openers (chunky, near-condensed, slightly playful), Rubik for every UI text role (body, captions, eyebrow caps, button labels), and Monaco for code. Buttons and eyebrows almost always run in uppercase with a 0.2px tracking lift to give them the snap of console output.

**Key Characteristics:**
- Two-polarity canvas system: deep violet midnight (`{colors.surface-canvas-dark}`) for marketing hero and product feature pages, white (`{colors.surface-canvas-light}`) for pricing, contact, and dense reference content — the system never tries to blur the two.
- Lime keyword highlight (`{colors.accent-lime}`) treated as a typographic device, not a color swatch — it wraps single words inside the display headline to act as a syntax highlight on the reading flow.
- Sticker illustration system: floating mascot characters with hand-drawn outlines, appearing at section junctions, never inside cards — they create rhythm and personality between dense info blocks.
- Uppercase eyebrow + button caps in `{typography.button-cap}` and `{typography.eyebrow}`, with a consistent 0.2px tracking lift, give the brand its "developer console" cadence.
- Single-primary CTA hierarchy: every page has one filled button reading either `{colors.primary}` on light or `{colors.on-primary}` on dark; outlined and ghost variants are downgraded.
- Card surfaces follow the canvas: dark sections nest dark cards (`{colors.ink-deep}` with subtle hairline) and light sections nest white cards with `{colors.hairline-cloud}` borders — chrome stays consistent, only the polarity flips.
- A pricing-page color rhythm of cream-white tiers with one dark inverted "featured" tier (`{colors.surface-night}`), avoiding the typical accent-bordered featured pattern.

## Colors

> **Source pages:** home (`/welcome/`), product/error-monitoring, contact/enterprise, pricing.

### Brand & Accent
- **Midnight Violet** (`{colors.primary}` — `#150f23`): The system's primary action color and the deepest surface tone. Used for filled primary buttons on light surfaces, code-block backgrounds, and the strongest dark cards.
- **Ink Violet** (`{colors.ink-deep}` — `#1f1633`): Slightly lifted from primary, this is the marketing hero canvas and the default body-text color on light surfaces — a single token doing double duty as background and ink.
- **Electric Lime** (`{colors.accent-lime}` — `#c2ef4e`): The signature highlight color. Wrapped around individual headline keywords as a syntax-highlight chip (`{rounded.xs}` corner, no padding-y, 12px padding-x). Also used as the squiggly footer divider stroke. Never a button background.
- **Hot Pink** (`{colors.accent-pink}` — `#fa7faa`): Secondary punctuation color used for sticker outlines, chart points, and supporting accents — never on buttons, never on type at body size.
- **Violet Link** (`{colors.accent-violet}` — `#6a5fc1`): Inline link color when emphasis is needed beyond underline.
- **Deep Violet** (`{colors.accent-violet-deep}` — `#422082`): The select-dropdown fill on contact forms; also used on spotlight cards inside dark sections.
- **Mid Violet** (`{colors.accent-violet-mid}` — `#79628c`): Tag-chip fill and faint accent on dark surfaces.

### Surface
- **Dark Canvas** (`{colors.surface-canvas-dark}` — `#1f1633`): Hero, product, and feature-page background. Carries the deepest atmospheric weight.
- **Night** (`{colors.surface-night}` — `#150f23`): Cards on dark canvas, code blocks, and the "featured" pricing tier.
- **Light Canvas** (`{colors.surface-canvas-light}` — `#ffffff`): Pricing, contact, and dense-reference page background.
- **Surface Press Light** (`{colors.surface-press-light}` — `#f0f0f0`) and **Press Stronger** (`{colors.surface-press-stronger}` — `#efefef`): The pressed/active fill of inverted buttons on dark surfaces.
- **Hairline Violet** (`{colors.hairline-violet}` — `#362d59`): 1px borders on dark cards.
- **Hairline Cool** (`{colors.hairline-cool}` — `#cfcfdb`): 1px borders on text inputs and form fields.
- **Hairline Cloud** (`{colors.hairline-cloud}` — `#e5e7eb`): Pricing-table dividers and pricing-card borders on light canvas.

### Text
- **On Primary** (`{colors.on-primary}` — `#ffffff`): All text on dark canvas, all CTA labels on filled dark buttons.
- **Ink** (`{colors.ink}` — `#1f1633`): Body text on light canvas; identical hex to the dark canvas, repurposed as type.
- **Ink Press** (`{colors.ink-press}` — `#1a1a1a`): Reserved for the pressed/active state of inverted buttons.
- **On Dark Muted** (`{colors.on-dark-muted}` — `rgba(255,255,255,0.72)`): Secondary text, captions, and table cell values on dark canvas.
- **On Dark Faint** (`{colors.on-dark-faint}` — `rgba(255,255,255,0.18)`): Translucent surface-on-dark — used for ghost button fills and dimmed nav items.

### Semantic
- **Focus Ring** (`{colors.ring-focus}` — `rgba(59,130,246,0.5)`): Translucent blue focus ring — the only blue in the system, reserved for keyboard focus on form fields.

### Sentiment & Data Visualization
- **Positive** (`{colors.sentiment-positive}` — `#c2ef4e`): Electric lime repurposed as positive sentiment indicator for charts, donut segments, and sentiment badges. Shares hex with `accent-lime` to keep the palette lean.
- **Neutral** (`{colors.sentiment-neutral}` — `#8b8b9e`): Muted grey-violet for neutral sentiment — receded presence that doesn't compete with positive/negative signals.
- **Negative** (`{colors.sentiment-negative}` — `#e8594c`): Warm red for negative sentiment. Distinct from `accent-pink` (`#fa7faa`) to avoid ambiguity, but close enough to feel part of the family.
- **Severity Critical** (`{colors.severity-critical}` — `#dc2626`): Bold red for critical crisis alerts and critical-status badges.
- **Severity High** (`{colors.severity-high}` — `#ea580c`): Orange for high-severity warnings and high-priority indicators.
- **Severity Medium** (`{colors.severity-medium}` — `#d97706`): Amber for medium-severity notifications.
- **Severity Low** (`{colors.severity-low}` — `#79628c`): Reuses `accent-violet-mid` for low-severity or informational alerts.
- **Chart Grid Line** (`{colors.chart-grid}` — `rgba(255,255,255,0.08)` on dark, `rgba(0,0,0,0.06)` on light): Subtle grid lines for data charts.
- **Chart Axis Label** (`{colors.chart-axis}` — `rgba(255,255,255,0.25)` on dark, `rgba(0,0,0,0.15)` on light): Axis labels, tick marks, and secondary chart annotations.
- **Chart Area Fill** (`{colors.chart-fill}` — `rgba(194,239,78,0.12)`): Translucent lime fill under area charts — gives volume to trend lines without overwhelming the data.
- **Crisis Overlay** (`{colors.crisis-overlay}` — `rgba(220,38,38,0.08)` on dark, `rgba(220,38,38,0.04)` on light): Subtle red-tinted overlay applied to the dashboard canvas during active crisis mode.

### Widget Surface
- **Widget Surface Dark** (`{colors.widget-surface-dark}` — `#1a1128`): Card surface for dashboard widgets on the dark canvas — slightly lifted from `surface-canvas-dark`.
- **Widget Surface Light** (`{colors.widget-surface-light}` — `#ffffff`): Card surface for dashboard widgets on the light canvas — same as `surface-canvas-light` with `hairline-cloud` border for widget boundary.
- **Widget Header** (`{colors.widget-header}` — `rgba(255,255,255,0.04)` on dark, `rgba(0,0,0,0.02)` on light): Subtle header bar inside dashboard widget cards.

## Typography

### Font Family

The display tier is a proprietary geometric sans with chunky, near-condensed proportions and a slightly subversive personality (closing apertures, optical-stress letterforms). When unavailable, fall back to **Rubik** at heavier weights for visual continuity.

The UI tier is **Rubik** — an open-source Hebrew/Latin sans on Google Fonts — with system fallbacks (`-apple-system, system-ui, Segoe UI, Helvetica, Arial`). Rubik handles every body, caption, button, and eyebrow role.

The code tier is **Monaco** with Menlo and Ubuntu Mono fallbacks — used in code blocks, install snippets, and inline tokens.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-hero}` | 88px | 700 | 1.2 | 0 | Marketing hero headline (single line of attention) |
| `{typography.display-large}` | 60px | 500 | 1.1 | 0 | Section openers on dark surfaces |
| `{typography.heading-xl}` | 30px | 500 | 1.2 | 0 | Page titles on light surfaces (e.g., "Pricing plans for dev teams of all sizes") |
| `{typography.heading-lg}` | 27px | 500 | 1.25 | 0 | Sub-section headings, large card titles |
| `{typography.heading-md}` | 24px | 500 | 1.25 | 0 | Card titles, in-page section headings |
| `{typography.heading-sm}` | 20px | 600 | 1.25 | 0 | Compact card title, list-group title |
| `{typography.body-lg}` | 16px | 400 | 2.0 | 0 | Marketing-paragraph body — the airy, two-line-leading variant used in hero subtext |
| `{typography.body-strong}` | 16px | 600 | 1.5 | 0 | Emphasized body run, lead sentence |
| `{typography.body-md}` | 16px | 500 | 1.5 | 0 | Default UI body, table cells, form labels |
| `{typography.eyebrow}` | 15px | 500 | 1.4 | 0 | Section eyebrow above large headings, all-caps |
| `{typography.button-cap}` | 14px | 700 | 1.14 | 0.2px | Filled button labels (uppercase) |
| `{typography.button-cap-light}` | 14px | 500 | 1.29 | 0.2px | Ghost / outline button labels (uppercase) |
| `{typography.caption}` | 14px | 400 | 1.43 | 0 | Footer text, fine print, helper copy |
| `{typography.micro-cap}` | 10px | 600 | 1.8 | 0.25px | Status labels, badge text, micro-eyebrow |
| `{typography.code}` | 16px | 400 | 1.5 | 0 | Code block content |
| `{typography.code-strong}` | 16px | 700 | 1.5 | 0 | Highlighted code keyword |

### Principles
- **Two leading worlds.** Marketing copy uses 2.0 line-height on `{typography.body-lg}` — extremely airy, generous breathing room. Functional UI copy uses 1.5 line-height on `{typography.body-md}` — denser, closer to console output. The choice is deliberate: marketing reads like prose, the product reads like a log.
- **Caps with tracking.** All button labels and eyebrows are uppercase with 0.2px tracking. This is the brand's typographic signature — a console-prompt cadence applied to UI affordances.
- **Headlines as syntax.** The hero display is structured so a single keyword can be wrapped in a `{colors.accent-lime}` highlight chip without disrupting the reading order. Treat the lime chip as a glyph-level decoration, not a separate component.

### Note on Font Substitutes
Rubik is open-source on Google Fonts and is the safe default for everything except the hero display. For the proprietary display sans, suitable open substitutes are **Space Grotesk** (heavier weights), **Archivo** (semi-condensed weights), or **Hubot Sans** with optical-size axis at heavier ends — all carry the same chunky, near-condensed silhouette. Adjust line-height down by 0.05 when substituting, since the proprietary face has tighter leading at large sizes.

## Layout

### Spacing System
- **Base unit**: 8px
- **Tokens**: `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.section}` 96px
- **Section padding**: `{spacing.section}` 96px between major page bands on desktop, collapsing to `{spacing.xxl}` 32px–48px on mobile.
- **Card internal padding**: `{spacing.xxl}` 32px on pricing cards and large feature cards; `{spacing.lg}` 16px on compact tag/badge groups.
- **Form field padding**: `{spacing.sm}` 8px vertical, `{spacing.md}` 12px horizontal — matches the text-input token directly.

### Grid & Container
- Marketing pages use a wide centered container with generous outer gutters; max width sits around 1152px (one of the extracted breakpoints), with content inside flexing across 12 conceptual columns.
- Pricing splits into a 4-tier card row at desktop, collapsing to 2-up at mid widths and 1-up on mobile.
- The contact form uses a 2-column field layout (first/last name side-by-side) inside a single light-canvas panel.
- Breakpoints stair-step at 1440 → 1152 → 992 → 768 → 640 → 576 — see Responsive Behavior.

### Whitespace Philosophy
The dark canvas absorbs whitespace differently from light. On dark surfaces the brand stretches `{spacing.section}` generously between bands so floating mascots and starfield textures have room to breathe. On light surfaces (pricing, contact) the whitespace tightens — content density takes priority because users are scanning, comparing, and acting. Rule of thumb: hero and feature surfaces are spacious, transactional surfaces are dense.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 | Flat on canvas, no shadow | Default surface, dark or light |
| 1 | `box-shadow: rgba(0,0,0,0.08) 0 2px 8px 0` | Inverted buttons on dark canvas (light fill lifting off dark surface) |
| 2 | `box-shadow: rgba(0,0,0,0.1) 0 10px 15px -3px, rgba(0,0,0,0.1) 0 4px 6px -4px` | Floating cards on light canvas, modals |
| 3 | `box-shadow: rgb(21,15,35) 0 0 8px 6px` | Glow halo around primary CTA on dark hero — the dark color itself becomes the shadow, creating a vignette of canvas around the button |
| 4 | `box-shadow: rgba(0,0,0,0.18) 0 0.5rem 1.5rem` | Pressed inverted button on dark canvas |

### Decorative Depth
Sentri's depth doesn't come from drop shadows — it comes from the **starfield texture** on the hero canvas (subtle white-on-violet pinpricks at low opacity), the **floating sticker mascots** (drawn with hand-rendered outlines and saturated fills, layered above the canvas with no shadow), and the **lime squiggly divider** above the footer. These illustrative elements do the work that shadow stacks do in flatter design systems — they tell the eye where one section ends and another begins.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Badges, status pills, lime keyword highlight chips |
| `{rounded.sm}` | 6px | Text inputs, search boxes |
| `{rounded.md}` | 8px | Primary and inverted buttons, code blocks, select dropdowns |
| `{rounded.lg}` | 10px | Generic divs, container blocks |
| `{rounded.xl}` | 12px | Pricing cards, feature cards, navigation pill chrome |
| `{rounded.xxl}` | 18px | Image containers, large hero illustrations |
| `{rounded.full}` | 9999px | Avatars, circular icon buttons |

### Photography Geometry
The site doesn't use traditional photography — it uses **illustrated stickers and product UI screenshots** in roughly equivalent geometric roles. Product UI mocks sit inside `{rounded.xxl}` 18px containers, often tilted slightly off-axis, against the dark canvas with no border. Sticker mascots have no container at all — they are layered directly on canvas, often overlapping section boundaries to break the grid. Avatar treatments (in customer-logo strips) are simple greyscale wordmarks, not photos.

## Components

> **No hover states documented.** Every spec below shows only Default and Pressed/Active states. Variants are formal entries in the front-matter `components:` block.

### Buttons

**`button-primary`** — the dominant CTA across light surfaces.
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button-cap}` (uppercase, 14px / 700, 0.2px tracking), padding `{spacing.md} {spacing.lg}` (12px 16px), rounded `{rounded.md}`. On dark hero surfaces, add the level-3 glow halo for emphasis.
- Pressed state lives in `button-primary-pressed`: background flips to `{colors.surface-press-stronger}`, text to `{colors.ink-press}`. The button effectively swaps polarities on press.

**`button-inverted`** — the dominant CTA on dark canvas; visually identical hierarchy, polarity-flipped.
- Background `{colors.on-primary}` (white), text `{colors.ink-deep}`, same `{typography.button-cap}`, rounded `{rounded.md}`.
- Pressed in `button-inverted-pressed`: background drops to `{colors.surface-press-light}`, text to `{colors.ink-press}`.

**`button-ghost-on-dark`** — secondary CTA on dark canvas (e.g., "Get Demo" beside "Get Started").
- Translucent fill `{colors.on-dark-faint}`, text `{colors.on-primary}`, type `{typography.button-cap}`, padding `{spacing.sm}` (8px), rounded `{rounded.xl}`. The translucent fill lets the canvas texture show through.

**`button-violet-token`** — pill-shaped tag/category button used inline in product navs.
- Background `{colors.accent-violet-mid}`, text `{colors.on-primary}`, type `{typography.button-cap-light}`, padding `{spacing.sm} {spacing.lg}` (8px 16px), rounded `{rounded.xl}`, 1px hairline border in a slightly deeper violet.

**`button-disabled`**
- Background `{colors.hairline-cloud}`, text `{colors.on-dark-muted}`, otherwise identical to `button-primary`.

### Cards & Containers

**`card-pricing`** — the standard tier card on the pricing page.
- Background `{colors.surface-canvas-light}`, text `{colors.ink-deep}`, padding `{spacing.xxl}` 32px, rounded `{rounded.xl}` 12px, 1px `{colors.hairline-cloud}` border. Headline at top in `{typography.heading-md}`, price in `{typography.display-large}`, feature list in `{typography.body-md}`, primary CTA pinned to the bottom of the card.

**`card-pricing-featured`** — the dark inverted "featured" tier (Sentri uses the Business tier as the featured one).
- Background `{colors.surface-night}`, text `{colors.on-primary}`, otherwise identical structure to `card-pricing`. The inversion (rather than an accent-bordered light card) is the brand's distinctive choice — the featured tier reads as the brand's voice, not as a marketing decoration.

**`card-feature-dark`** — large feature-band card on dark surfaces, used to anchor product feature explanations.
- Background `{colors.ink-deep}`, text `{colors.on-primary}`, padding `{spacing.xxl}` 32px, rounded `{rounded.xxl}` 18px. Often holds a UI mock plus a 27px headline plus 16px body.

**`card-spotlight-violet`** — accent feature card with deeper violet fill, used for "Sentry-only" capability bands.
- Background `{colors.accent-violet-deep}`, text `{colors.on-primary}`, padding `{spacing.xxl}`, rounded `{rounded.xxl}`. The deep violet reads as a feature highlight without breaking out of the brand's purple family.

**`code-block`** — code/install snippets.
- Background `{colors.surface-night}`, text `{colors.on-primary}` rendered in `{typography.code}`. Padding `{spacing.lg}` 16px, rounded `{rounded.md}`. On dark canvas the code block is barely lifted from canvas — only the slightly deeper fill differentiates it.

### Inputs & Forms

**`text-input`** — the contact-form first/last/email/etc. fields.
- Background `{colors.surface-canvas-light}`, text `{colors.ink-deep}`, type `{typography.body-md}`, padding `{spacing.sm} {spacing.md}` (8px 12px), rounded `{rounded.sm}` 6px, 1px `{colors.hairline-cool}` border.
- Focus state in `text-input-focused`: same fill, but adds an inset shadow `rgba(0,0,0,0.15) 0 2px 10px inset` to suggest depth pressed inward.

**`select-violet`** — the dropdown variant used inside dark contact panels.
- Background `{colors.accent-violet-deep}`, text `{colors.on-primary}`, type `{typography.body-md}`, padding `{spacing.sm} {spacing.lg}`, rounded `{rounded.md}`. Distinctive because it doesn't mimic a plain text input — it reads as a deliberate brand surface.

### Navigation

**`nav-bar-light`** — the standard top nav across light pages (pricing, contact, docs).
- Background `{colors.surface-canvas-light}`, text `{colors.ink-deep}`, type `{typography.body-md}`. Logo wordmark on the left at ~145×32px, primary nav items mid-bar with dropdown carets, and a `Get Demo` ghost + `Get Started` filled `button-primary` pair on the right. Padding `{spacing.lg} {spacing.xl}` (16px 24px).

**Top Nav (dark variant)** — used on the home page; same structure but inverted polarity, sitting on `{colors.surface-canvas-dark}`. The right-side button becomes `button-inverted`.

**Mobile nav** — collapses to a hamburger toggle below the 768px breakpoint; dropdown carets become full-width accordion items.

### Pills, Badges, and Highlight Chips

**`pill-neutral-dark`** — small status / category pill on dark surfaces.
- Background `{colors.surface-night}`, text `{colors.on-primary}`, type `{typography.caption}` 12px, padding `{spacing.xs} {spacing.sm}` (4px 8px), rounded `{rounded.xs}` 4px.

**`chip-lime-keyword`** — the signature inline highlight wrapping single words inside the hero display headline.
- Background `{colors.accent-lime}`, text `{colors.ink-deep}`, type matches the surrounding `{typography.display-hero}`, rounded `{rounded.xs}` 4px, padding `0 {spacing.md}` (12px horizontal, 0 vertical so the chip hugs the cap-height).

### Signature Components

**Sticker Mascot Layer** — illustrated characters (astronauts, cartoon monsters, traffic cones, debugging avatars) drawn with hand-rendered outlines and saturated `{colors.accent-pink}` / `{colors.accent-lime}` fills. Mascots are placed at section junctions, often overlapping section boundaries by 30–40% of their height, with no container or shadow. They function as decorative section markers and brand personality carriers — never inside cards, never as buttons.

**Lime Squiggly Footer Divider** — a hand-drawn `{colors.accent-lime}` squiggle line, ~3px stroke, sitting above the footer at full container width. Replaces what would otherwise be a 1px hairline divider with a personality-laden flourish.

**Starfield Hero Texture** — a faint white-on-violet pinprick pattern overlaid on the hero canvas at very low opacity. Adds atmospheric depth to the dark canvas without visible decoration. Implemented as a background image, not as repeating CSS.

**Window-Chrome UI Mock** — product UI screenshots framed in `{rounded.xxl}` containers, often tilted ±2–3 degrees off axis, positioned overlapping section boundaries on the dark feature pages. The chrome itself is just a rounded image with a subtle hairline; the content is the actual product UI.

**`link-on-dark`** — inline links in body copy on dark surfaces. Default text is `{colors.on-primary}` rendered in `{typography.body-md}` with a persistent underline; the underline is the entire affordance, no color change. Sits flush in copy with no padding, no rounded corners beyond the inherited `{rounded.xs}`.

**`link-on-light`** — inline links in body copy on light surfaces. Same shape contract as `link-on-dark`, but text is `{colors.ink-deep}`. Used across pricing, contact, and docs surfaces.

**`footer-light`** — site-wide footer on the light-canvas template (pricing, contact, docs).
- Background `{colors.surface-canvas-light}`, text `{colors.ink-deep}`, type `{typography.caption}`, padding `{spacing.xxl} {spacing.xl}` (32px 24px). Topped by the lime squiggly divider — see Signature Components. Holds three to four columns of link groups, social icons in a horizontal strip at the bottom right, and a small legal/copyright row at the very bottom in `{typography.caption}`.

## Product Component Library

> These components extend the base design system for product surfaces — dashboards, sentiment feeds, crisis views, and configuration wizards. All tokens reference the base system; no new families are introduced.

### Data Visualization Components

#### `brand-health-gauge` — composite score gauge

Semicircular arc gauge displaying the Brand Health Score — the primary KPI on the executive dashboard.

- **Dark variant** (default on dark canvas): Arc track `rgba(255,255,255,0.08)`, arc fill `{colors.accent-lime}` (score ≥ 70) / `{colors.sentiment-negative}` (score < 40) / `{colors.sentiment-neutral}` (in between). Score label in `{typography.display-large}` centered in the arc. Sub-label "Brand Health" in `{typography.caption}` `{colors.on-dark-muted}`.
- **Light variant** (on light canvas): Arc track `{colors.hairline-cloud}`, same arc fill logic. Score label in `{colors.ink-deep}`, sub-label `rgba(0,0,0,0.5)`.
- **States**: Default (live data), Loading (pulsing skeleton arc at 30% opacity), Error (dashed arc, label "—", tooltip "Data unavailable").
- **Size**: Default 240×180px. Compact variant 160×120px for widget grid narrow mode.

#### `sentiment-donut` — proportional sentiment breakdown

Donut chart showing positive / neutral / negative distribution.

- **Segments**: Positive `{colors.sentiment-positive}`, Neutral `{colors.sentiment-neutral}`, Negative `{colors.sentiment-negative}`. Center hole displays the dominant sentiment label + percentage in `{typography.heading-md}`.
- **Legend**: Below the donut, three horizontal items in `{typography.caption}` with 8px color swatch circles (`{rounded.full}`).
- **States**: Default (animated segments sweep in clockwise), Loading (pulsing ring at 30% opacity), Empty (dashed ring with "No data" in center `{typography.body-md}` `{colors.on-dark-muted}`).
- **Responsive**: At ≤ 576px collapses to a horizontal stacked bar with percentage labels.

#### `volume-line-chart` — time-series mention volume

Line or area chart tracking mention volume over time.

- **Line**: Stroke `{colors.accent-lime}`, width 2px, no dash. Area fill `{colors.chart-fill}`.
- **Grid**: Horizontal lines in `{colors.chart-grid}`. Y-axis labels `{colors.chart-axis}` `{typography.micro-cap}`, right-aligned. X-axis time labels `{colors.chart-axis}` `{typography.micro-cap}`.
- **Tooltip**: Floating panel — background `{colors.surface-night}` on dark / `{colors.surface-canvas-light}` on light, border `{colors.hairline-violet}` / `{colors.hairline-cloud}`, rounded `{rounded.md}`, padding `{spacing.sm}`. Shows exact value, time, and % change in `{typography.caption}`.
- **Interaction**: Hover reveals vertical crosshair `rgba(255,255,255,0.2)`. Click point filters dashboard by that time window.
- **States**: Default, Loading (skeleton wave), Empty (baseline at 0 with "No mentions in this period").

#### `emotion-bar-chart` — secondary emotion breakdown

Horizontal bar chart for emotion distribution (Anger, Joy, Disappointment, Enthusiasm, Fear, etc).

- **Bars**: Rounded `{rounded.sm}`, height 24px. Colors cycle through `{colors.accent-lime}`, `{colors.accent-pink}`, `{colors.accent-violet}`, `{colors.sentiment-negative}`, `{colors.severity-medium}`, `{colors.severity-high}`.
- **Labels**: Emotion name left in `{typography.body-md}`, count/percentage right in `{typography.body-strong}`.
- **Max items**: Top 8 emotions. Remaining grouped into "Other" in `{colors.chart-axis}`.
- **States**: Default, Loading (skeleton bars), Empty (greyed bars at 10% width).

#### `competitor-matrix` — brand vs competitor comparison table

Full-width comparison table for Share of Voice, Sentiment, Engagement, and Volume.

- **Layout**: Brand column (leftmost) has `{colors.accent-lime}` 2px top border on header. Competitor columns use `{colors.chart-axis}` header accent.
- **Rows**: Metric name `{typography.body-md}` left. Cell values `{typography.body-strong}` right-aligned. Best-in-class row gets subtle `{colors.widget-surface-dark}` / `{colors.surface-press-light}` fill.
- **Header row**: Category labels in `{typography.eyebrow}` uppercase. Column headers in `{typography.button-cap-light}`.
- **States**: Default, Loading (skeleton rows), Empty ("Add competitors in Brand Setup to see comparison").
- **Responsive**: At ≤ 768px, horizontally scrollable with sticky brand column.

#### `geospatial-map-container` — regional sentiment heatmap wrapper

Container for the interactive map (Mapbox GL JS / Leaflet).

- **Container**: Rounded `{rounded.xl}`, overflow hidden, no internal padding.
- **Legend overlay**: Top-left floating panel — background `{colors.surface-night}` on dark / `{colors.surface-canvas-light}` on light, padding `{spacing.sm} {spacing.md}`, rounded `{rounded.md}`, 1px `{colors.hairline-violet}` / `{colors.hairline-cloud}` border. Gradient scale from `{colors.sentiment-positive}` through `{colors.sentiment-neutral}` to `{colors.sentiment-negative}`.
- **Tooltip**: City name `{typography.body-strong}`, sentiment breakdown `{typography.caption}`.
- **States**: Default, Loading (pulsing pin icon placeholder), Empty ("No geolocated mentions available" with world map outline at 20% opacity).

#### `keyword-tag-cloud` — trending keyword density display

Visual tag cloud of top mentioned keywords and hashtags.

- **Tags**: Inline `<span>` elements sized 12px–24px proportional to frequency. Color cycles `{colors.accent-lime}`, `{colors.on-dark-muted}`, `{colors.accent-violet}` on dark / `{colors.ink-deep}`, `{colors.sentiment-neutral}`, `{colors.accent-violet}` on light.
- **Interaction**: Click filters mention feed by keyword. Hover tooltip with mention count.
- **Max tags**: 30. Top 10 at full opacity, remaining at 60%.

### Dashboard Widgets

#### `widget-card` — universal widget container

Base container for all dashboard widgets.

- **Dark variant**: Background `{colors.widget-surface-dark}`, rounded `{rounded.lg}`, 1px `{colors.hairline-violet}` border, padding `{spacing.lg}` 16px. No shadow.
- **Light variant**: Background `{colors.widget-surface-light}`, rounded `{rounded.lg}`, 1px `{colors.hairline-cloud}` border, padding `{spacing.lg}` 16px. Level 2 elevation shadow.
- **Header**: Optional bar — title in `{typography.heading-sm}`, overflow menu `···` right, refresh timestamp `{typography.caption}` `{colors.on-dark-muted}`.
- **Drag handle**: 12×24px gripper (six dots), `{colors.on-dark-muted}`, visible on hover or edit mode.
- **Resize handle**: 8px square bottom-right, `{colors.accent-lime}` diagonal lines, visible on hover.
- **States**: Default, Dragging (level 3 elevation, 10deg rotation affordance), Loading (skeleton), Empty (centered icon + "No data"), Error (red header + "Failed to load" + retry `{typography.button-cap-light}`).
- **Widget toolbar**: Edit-mode floating toolbar above — `{colors.surface-night}` background, `{rounded.full}` pills for "Remove", "Edit", "Move".

#### `kpi-metric-display` — single-number KPI card

Compact card showing a single metric with label, value, and sparkline or delta.

- **Layout**: Stacked — label `{typography.eyebrow}` uppercase, value `{typography.display-large}` (48px — scaled for density), delta `{typography.body-md}` (green `{colors.sentiment-positive}` up, red `{colors.sentiment-negative}` down). Optional 20px inline sparkline beside delta.
- **Padding**: `{spacing.lg}` 16px. No border — relies on parent `widget-card`.
- **States**: Default, Loading (skeleton lines), Error ("—"), Empty ("0" or "N/A").

#### `widget-grid-container` — drag-and-drop dashboard grid

Top-level layout container for `widget-card` instances.

- **Implementation**: `react-grid-layout`. Container is transparent — no background, no border, no padding.
- **Gap**: 16px (`{spacing.lg}`). Columns: 12 at ≥ 1152px, 6 at 768–1151px, 1 at < 768px.
- **Edit mode**: Toggled via "Customize" button in dashboard header. Shows drag handles + "Add Widget" button at grid bottom — `button-ghost-on-dark` with `+` icon.
- **Widget picker modal**: Background `{colors.surface-night}` on dark / `{colors.surface-canvas-light}` on light, rounded `{rounded.xl}`, padding `{spacing.xxl}`. Grid of selectable widget cards with name + icon + 1-line description.
- **Layout persistence**: Auto-saves to user prefs via debounced API (2s after last interaction).

### Product-Specific Components

#### `mention-card` — individual social mention

Card representing a single social media post in the sentiment feed.

- **Layout**: Avatar 36×36px `{rounded.full}` left. Author name `{typography.body-strong}`, platform icon + timestamp `{typography.caption}` `{colors.on-dark-muted}`. Content `{typography.body-md}` 1.5 line-height. Media thumbnails (max 4, 80×80px, `{rounded.sm}`) below text. Sentiment badge + engagement stats (likes, comments, shares) bottom-right.
- **Padding**: `{spacing.lg}` 16px. Separator: 1px `{colors.hairline-violet}` on dark / `{colors.hairline-cloud}` on light.
- **Overflow menu**: `···` top-right — dropdown with "Open original", "Copy text", "Flag for review", "Add to report".
- **Sentiment indicator**: 4px colored dot left edge — green `{colors.sentiment-positive}`, grey `{colors.sentiment-neutral}`, red `{colors.sentiment-negative}`.
- **States**: Default, Selected (2px `{colors.accent-lime}` left border), New (subtle `{colors.chart-fill}` glow 3s on WebSocket arrival).

#### `sentiment-badge` — compact sentiment label

Small inline badge for sentiment classification + confidence.

- **Positive**: Background `{colors.sentiment-positive}` at 15% opacity, text `{colors.sentiment-positive}`, label "Positive" `{typography.micro-cap}`, padding `{spacing.xs} {spacing.sm}`, rounded `{rounded.xs}`.
- **Neutral**: Background `{colors.sentiment-neutral}` at 15% opacity, text `{colors.sentiment-neutral}`, label "Neutral".
- **Negative**: Background `{colors.sentiment-negative}` at 15% opacity, text `{colors.sentiment-negative}`, label "Negative".
- **With confidence**: Appends percentage — "Positive (92%)" in `{typography.micro-cap}` at 70% opacity.

#### `severity-badge` — crisis severity indicator

Badge for alert severity levels.

- **Critical**: Background `{colors.severity-critical}` 20% opacity, text `{colors.severity-critical}`, label "Critical". 4px dot left in `{colors.severity-critical}` with CSS pulse animation.
- **High**: Background `{colors.severity-high}` 20% opacity, text `{colors.severity-high}`, label "High".
- **Medium**: Background `{colors.severity-medium}` 20% opacity, text `{colors.severity-medium}`, label "Medium".
- **Low**: Background `{colors.severity-low}` 20% opacity, text `{colors.severity-low}`, label "Low".
- **Shape**: Pill `{rounded.full}`, padding `{spacing.xs} {spacing.sm}`, type `{typography.micro-cap}` +0.15px tracking.

#### `alert-card` — crisis alert notification

Card in the crisis dashboard for a single alert event.

- **Layout**: Severity badge top-left. Timestamp `{typography.caption}` `{colors.on-dark-muted}` top-right. Title `{typography.heading-sm}`. Summary `{typography.body-md}` (max 2 lines, ellipsis). Metrics row: negative count, total, negative % — each as compact inline `kpi-metric-display` (value `{typography.heading-md}`, label `{typography.micro-cap}`).
- **Action bar**: "View Source Timeline" (`button-ghost-on-dark`), "Acknowledge" (uses `{colors.severity-high}` bg for high+), "Dismiss" link `{typography.caption}`.
- **Padding**: `{spacing.xl}` 24px. Rounded `{rounded.lg}`.
- **States**: Default, Acknowledged (opacity 70%, badge "Acknowledged"), Resolved (opacity 40%, badge "Resolved" in `{colors.sentiment-neutral}`).

#### `crisis-banner` — crisis mode page indicator

Full-width banner at dashboard top when crisis mode is active.

- **Background**: `{colors.severity-critical}` at 12% opacity + 1px bottom border `{colors.severity-critical}` at 30%. Dashboard canvas gets `{colors.crisis-overlay}`.
- **Content**: Warning icon 20×20px + "Crisis Mode Active — sentimen negatif melonjak 340%" in `{typography.body-strong}`. "View Crisis Dashboard" CTA — `button-primary` style with `{colors.severity-critical}` background.
- **Dismiss**: `×` top-right in `{colors.on-dark-muted}`, visible only to Super Admin / Manager.
- **Animation**: Slide-down from top 300ms ease-out. Adds 4px top padding to page.

#### `source-timeline` — crisis source tracing

Vertical timeline of mentions that triggered a crisis.

- **Layout**: 2px vertical line `{colors.hairline-violet}` / `{colors.hairline-cloud}` left. Nodes: 12px filled circles — normal `{colors.accent-violet-mid}`, viral seed `{colors.severity-critical}`.
- **Each entry**: Time `{typography.micro-cap}` `{colors.on-dark-muted}`, platform icon, author `{typography.body-strong}`, content preview `{typography.body-md}` (1 line), engagement `{typography.caption}`. 24px vertical gap.
- **Seed highlight**: 2px `{colors.severity-critical}` left border + 5% background tint on viral entry.
- **Interaction**: Click opens full mention in feed panel.

#### `auto-response-panel` — AI crisis response drafts

Panel with AI-generated response drafts during crisis.

- **Layout**: Three tabs — "Press Release" / "Social Reply" / "DM Template" using `tab-navigation`. Each tab has a text preview in `{typography.body-md}` inside a `card-feature-dark`-style container.
- **Meta bar**: Confidence "AI Confidence: 87%" `{typography.caption}`, "Regenerate" link `{colors.accent-lime}`, "Copy" button (`button-ghost-on-dark`), "Edit in editor".
- **Feedback**: Thumbs up/down 16×16px icons `{colors.on-dark-muted}` — clicked fills lime (up) / negative (down).
- **States**: Default, Generating (typing animation — `|` cursor + characters appearing), Empty ("No response generated yet").
- **Limit**: Max 3 regenerations per alert. Counter "Regenerations: 1/3".

#### `tone-checker-panel` — content tone validation

Panel for the Content Tone Checker feature.

- **Layout**: Two-column at ≥ 992px, stacked below. Left: text input area. Right: results panel.
- **Text input**: Large multi-line area — background `{colors.surface-night}` on dark / `{colors.surface-canvas-light}` on light, border `{colors.hairline-violet}` / `{colors.hairline-cloud}`, rounded `{rounded.md}`, padding `{spacing.lg}`, type `{typography.body-md}`. Char counter bottom-right in `{typography.caption}`.
- **Platform selector**: Horizontal pill group using `button-violet-token`. Selected flips to `{colors.accent-lime}` bg, `{colors.ink-deep}` text.
- **Results panel**: Tone score as mini `brand-health-gauge` (120px arc). Issues list — each with `severity-badge`, message `{typography.body-md}`, suggestion `{typography.caption}` `{colors.accent-lime}`. Verdict: checkmark + "Fit for [platform]" or cross + "Needs revision" in `{typography.body-strong}`.
- **States**: Empty ("Analysis results appear here"), Loading (skeleton + pulsing "Analyzing..."), Complete, Error ("Analysis failed" + retry).

#### `wizard-step` — multi-step configuration form

Individual step in a multi-step wizard (Brand DNA Setup, onboarding).

- **Layout**: Full-width form section. Title `{typography.heading-md}`, description `{typography.body-md}` `{colors.on-dark-muted}`. Fields use existing `text-input`, `select-violet`, `button-primary`.
- **Step indicator**: Horizontal bar — completed steps filled `{colors.accent-lime}` with checkmark, current step outlined `{colors.accent-lime}` 2px border, future steps outlined `{colors.hairline-violet}` / `{colors.hairline-cloud}`. Labels `{typography.caption}`.
- **Navigation**: "Back" (`button-ghost-on-dark`), "Next/Save" (`button-primary` / `button-inverted`), "Skip" link `{typography.caption}` for optional steps.
- **States**: Default, Filled, Validation Error (field border `{colors.sentiment-negative}` + error `{typography.caption}` `{colors.sentiment-negative}`), Submitting (spinner on button).
- **Transitions**: 200ms fade-slide-right between steps. Validation error 150ms shake.

#### `filter-bar` — data filtering control

Horizontal filter row for sentiment feed, crisis list, reports.

- **Layout**: Horizontally scrollable pill row. Transparent background. Padding `{spacing.sm} 0`.
- **Filter pill**: `button-violet-token` style. Active: bg `{colors.accent-lime}`, text `{colors.ink-deep}`. Inactive: bg `{colors.accent-violet-mid}` 50% opacity, text `{colors.on-dark-muted}`. 8px gap. Dismiss `×` on active pills.
- **Clear all**: "Clear" link `{typography.caption}` `{colors.on-dark-muted}` — visible when ≥ 1 filter active.
- **Add filter**: "+ Filter" at row end — `button-ghost-on-dark`, opens dropdown menu.

#### `date-range-picker` — time range selector

Date range selector for filtering data by time period.

- **Trigger**: Button showing current range (e.g., "Last 7 Days") — `button-violet-token` style. Click opens dropdown.
- **Presets**: "24h", "7 Days", "30 Days", "90 Days", "1 Year", "Custom" — clickable rows `{typography.body-md}`. Selected gets `{colors.accent-lime}` left border.
- **Custom panel**: Two date inputs ("From" / "To") as compact `text-input` (32px height). "Apply" button below.
- **Dropdown**: Background `{colors.surface-night}` / `{colors.surface-canvas-light}`, rounded `{rounded.md}`, padding `{spacing.md}`, level 2 elevation. Min width 280px.

#### `tab-navigation` — horizontal tab bar

Tab bar for switching between related views (e.g. Sentiment / Mentions / Associations).

- **Layout**: Horizontal row. No background — flush on canvas. Bottom border 1px `{colors.hairline-violet}` / `{colors.hairline-cloud}`.
- **Tab item**: Label `{typography.body-md}`. Active: `{colors.accent-lime}` 2px bottom border, text `{colors.on-primary}`. Inactive: text `{colors.on-dark-muted}`. Hover: 80% opacity.
- **Padding**: `{spacing.md} {spacing.lg}` per tab. 4px gap.
- **Badge**: Optional count — `{colors.accent-violet-mid}` bg, `{rounded.full}`, `{typography.micro-cap}`.
- **Responsive**: At ≤ 640px, scrollable with right-edge fade gradient.

#### `mention-feed` — infinite-scroll mention list

Vertical scrollable list of `mention-card` items with infinite scroll.

- **Container**: No background, no border. Padding `{spacing.sm}`. Fills parent height.
- **Load more**: Spinner (16px, `{colors.accent-lime}`, CSS spin) appears 200px from bottom. Error: "Failed to load. Retry" `{typography.caption}`.
- **Empty state**: 40px icon 30% opacity + "No mentions yet" `{typography.body-md}` `{colors.on-dark-muted}`.
- **New mention indicator**: Floating pill "12 new mentions" — bg `{colors.accent-lime}`, text `{colors.ink-deep}`, `{rounded.full}`, click scrolls to top.

### Extended Navigation

#### `sidebar` — main application sidebar

Primary navigation sidebar for the product dashboard.

- **Width**: 240px expanded / 64px collapsed. Transition 200ms ease.
- **Background**: `{colors.surface-night}` on all canvases. Right border 1px `{colors.hairline-violet}`.
- **Logo area**: Top 56px — wordmark or 32×32px icon (collapsed).
- **Nav items**: Icon 20×20px + label `{typography.body-md}`. Height 44px. Active: `{colors.accent-lime}` 3px left border + bg `{colors.accent-lime}` 8% opacity. Inactive: `{colors.on-dark-muted}`, hover lifts to 80%.
- **Sections**: Group label `{typography.micro-cap}` uppercase, `{colors.on-dark-muted}` 50% opacity.
- **Collapse toggle**: Bottom — chevron button 36×36px, `{rounded.md}`, hover bg `{colors.accent-violet-mid}` 20% opacity.
- **States**: Expanded, Collapsed (icon-only), Hover-expand (floating label overlay on collapsed).

#### `breadcrumbs` — page hierarchy indicator

Breadcrumb navigation for deep pages.

- **Separator**: `>` in `{colors.on-dark-muted}` 50% opacity, 8px padding each side.
- **Items**: Root + intermediates `{typography.caption}` `{colors.on-dark-muted}`, current `{typography.caption}` `{colors.on-primary}` bold. Root/intermediate clickable.
- **Hover**: Clickable items lift to `{colors.accent-lime}`.

#### `data-table` — structured data table

General-purpose table for users list, billing history, data export.

- **Header row**: Background `rgba(255,255,255,0.04)` dark / `rgba(0,0,0,0.02)` light. Labels `{typography.eyebrow}` 13px uppercase. Bottom border 1px `{colors.hairline-violet}` / `{colors.hairline-cloud}`.
- **Body rows**: `{typography.body-md}` 15px. Height 48px. Bottom border at 50% opacity.
- **Hover row**: Background `rgba(194,239,78,0.04)`.
- **Selected row**: 2px `{colors.accent-lime}` left border + bg `rgba(194,239,78,0.06)`.
- **Sort indicator**: Arrow in `{colors.accent-lime}` when active, `{colors.on-dark-muted}` when inactive.
- **Pagination**: "Showing 1-20 of 143" `{typography.caption}` left. Prev/next as `button-ghost-on-dark` pills. Page numbers `{typography.caption}`.
- **Responsive**: At ≤ 768px, scrollable with sticky first column.

### Feedback & Loading

#### `loading-skeleton` — content placeholder

Skeleton loading placeholder for async content.

- **Animation**: Shimmer — `background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)` dark / `rgba(0,0,0,0.04)...rgba(0,0,0,0.08)...rgba(0,0,0,0.04)` light. Background-size 200% 100%, `shimmer 1.5s infinite`.
- **Shapes**: Rounded `{rounded.sm}`. Variants: `skeleton-text` (14px line), `skeleton-card` (card outline), `skeleton-chart` (chart area), `skeleton-avatar` (36×36px `{rounded.full}`).

#### `toast-notification` — transient notification

Temporary notification top-right of screen.

- **Variants**: Success (bg `{colors.sentiment-positive}` 15% + 4px left border `{colors.sentiment-positive}`), Error (`{colors.sentiment-negative}` 15%), Warning (`{colors.severity-medium}` 15%), Info (`{colors.accent-violet-mid}` 15%).
- **Layout**: Icon 16×16px + message `{typography.body-md}` + dismiss `×`. Padding `{spacing.md} {spacing.lg}`. Rounded `{rounded.md}`. Level 3 elevation.
- **Duration**: Auto-dismiss 5s. Pause on hover. Max 3 stacked with 8px gap.
- **Animation**: Slide-in right 300ms, slide-out right + fade 200ms.

---

## Do's and Don'ts

### Do
- Reserve `{colors.accent-lime}` for keyword-highlight chips inside display headlines and the footer squiggle divider — never use it as a button background, never as body text.
- Pair every `button-primary` with `{typography.button-cap}` in uppercase with 0.2px tracking — the cadence is part of the brand, not a stylistic option.
- Treat the dark canvas (`{colors.surface-canvas-dark}`) and light canvas (`{colors.surface-canvas-light}`) as two complete worlds — let one own marketing/feature pages and the other own transactional pages, with no half-measures.
- Use sticker mascots to break section boundaries — let them overlap, tilt, and float; constraining them inside cards drains their personality.
- Use `card-pricing-featured` (dark inverted tier) instead of an accent-bordered light tier for the featured pricing column.
- Default body line-height to 1.5 on functional UI surfaces and 2.0 on marketing surfaces — the difference is intentional.
- Use `{colors.sentiment-positive}`, `{colors.sentiment-neutral}`, and `{colors.sentiment-negative}` consistently across all sentiment indicators — charts, badges, mention cards, and filters must share the same semantic color mapping.
- Apply severity colors (`{colors.severity-critical}` → `{colors.severity-low}`) in strict order — critical for active crisis, high for warnings, medium for notifications, low for info.
- Default the product dashboard to the dark canvas (`{colors.surface-canvas-dark}`) — data products benefit from reduced glare during extended monitoring sessions.
- Keep widget cards flat on the dark canvas with hairline borders only — shadows on dark surfaces muddy the violet depth.
- Use `{typography.body-md}` (1.5 line-height) for all product UI copy — the denser rhythm matches the console-log cadence of a monitoring dashboard.
- Provide loading, empty, and error states for every data-driven component — a chart without an empty state is a broken component.
- Use `widget-card` as the universal container for all dashboard content — every chart, list, and metric must live inside a widget boundary.

### Don't
- Don't introduce additional accent colors beyond `{colors.accent-lime}` and `{colors.accent-pink}` — adding teal, orange, or yellow dilutes the violet-and-lime signature. Sentiment and severity colors are semantic, not accent — they are exempt from this rule.
- Don't apply drop shadows to cards on dark canvas — depth comes from texture and illustration, not from light-on-dark shadows that would muddy the violet.
- Don't use `{typography.display-hero}` (88px) for anything except the marketing hero — even sub-pages cap at `{typography.display-large}` (60px).
- Don't put body text in `{colors.accent-lime}` — it's a chip color, not a type color, and breaks contrast at body sizes.
- Don't soften the `{colors.primary}` button to a brand-violet — the near-black is the point; it reads as the most authoritative action regardless of canvas polarity.
- Don't put illustrated mascots inside cards or constrained containers — their job is to break grid, not occupy it.
- Don't mix sentiment color systems — positive must always be `{colors.sentiment-positive}`, never green from outside the palette or a custom hex.
- Don't overrule the tier-based feature gating in UI — widgets, filters, and actions unavailable to the user's tier should be visibly disabled (opacity 40%, "Upgrade" badge), not hidden.
- Don't use the crisis overlay (`{colors.crisis-overlay}`) outside of active crisis mode — it's a transient state indicator, not a theme option.
- Don't add mascots or illustration elements inside dashboard widgets — the product surface is a data tool, not a marketing page; sticker mascots belong on marketing surfaces only.
- Don't auto-play animations or auto-refresh charts more frequently than the documented intervals — data tool performance and predictability matter more than visual flair.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| 4K / Wide | ≥ 1440px | Full 4-tier pricing row, hero illustration sits beside headline at full scale |
| Desktop | 1152–1440px | Default content max-width sits at 1152px, all 4-tier patterns hold |
| Laptop | 992–1151px | Pricing collapses to 2-up rows, nav remains horizontal |
| Tablet | 768–991px | 2-column feature grids collapse to 1-up; nav still horizontal but compresses |
| Mobile Large | 640–767px | Hamburger nav appears; hero display drops from 88px to ~56px |
| Mobile | 576–639px | Single-column everything; section padding collapses from 96px to 32–48px |
| Small Mobile | 1–575px | Compact mode; sticker mascots drop in size or hide entirely to preserve content priority |

### Touch Targets
- Primary buttons hit a minimum 44×44px on mobile (12px vertical padding × 16px font + line-height = ~44px). Maintains WCAG AAA touch-target spec.
- Pill tags and badges in nav and feature surfaces stay above 32×32px even at small mobile breakpoints; they enlarge if necessary rather than shrink.
- Form fields stay at the 44px minimum height on mobile contact pages.

### Collapsing Strategy
- **Hero display headline** drops from 88px → 60px → 48px across the breakpoint stair; the lime keyword chip preserves padding and corner radius at every step.
- **Pricing tiers** stair-step from 4-up → 2-up → 1-up. The featured dark tier always remains visually distinguished — it never loses its inversion at any breakpoint.
- **Sticker mascots** are progressively de-emphasized: at desktop they overlap section boundaries; at tablet they shift to inline within section padding; at small mobile most are hidden via `display: none` to keep the content scan-able.
- **Top nav** collapses to a hamburger below 768px; the dropdown menu uses the same canvas polarity as the page (dark on hero, light on pricing).
- **Code blocks** preserve 16px Monaco at every breakpoint — they never scale down — but switch to horizontal scroll on overflow rather than wrap.

### Image Behavior
- Product UI mocks scale proportionally; on small mobile they often anchor to one edge with horizontal overflow rather than shrink to illegibility.
- Sticker mascots scale by 50–70% at mobile breakpoints, preserving their personality but ceding screen space to content.
- The lime footer squiggle scales the SVG to container width while keeping stroke width visually consistent.

## Iteration Guide

1. Focus on ONE component at a time. Don't rebuild the system — extend it.
2. Reference component names and tokens directly (`{colors.accent-lime}`, `{button-primary}-pressed`, `{rounded.xxl}`) — do not paraphrase.
3. Run `npx @google/design.md lint DESIGN.md` after edits — `broken-ref`, `contrast-ratio`, and `orphaned-tokens` warnings flag issues automatically.
4. Add new variants as separate component entries (`-pressed`, `-disabled`, `-focused`) — do not bury them inside prose.
5. Default to `{typography.body-md}` for product UI body and `{typography.body-lg}` for marketing prose — the leading difference is intentional and load-bearing.
6. Keep `{colors.accent-lime}` scarce — one lime element per viewport. The signature only works because it's rare.
7. When polarizing a new surface, choose one canvas (`{colors.surface-canvas-dark}` or `{colors.surface-canvas-light}`) and commit to it; don't blend the two on a single page band.
