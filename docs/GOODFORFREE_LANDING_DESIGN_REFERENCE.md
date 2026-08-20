# goodforfree Landing Page — Design Reference

Status: Reference analysis. Not an implementation spec for CompliVerse.
Source: Figma `Good For Free - Design (Copy)`, file `gnHNQnNwtGeTgLcIjeBf1w`, node `664:104` ("landing Page").
Method: values read from Figma design context, not eyeballed from screenshots. Contrast ratios computed with the WCAG 2.x relative-luminance formula.

Two artboards exist and both were read:

| Artboard | Node | Width | Height |
|---|---|---|---|
| Desktop | `664:105` | 1440 px | 6409 px |
| Mobile | `664:419` + `664:425` | 393.86 px | 6298 px |

There is no tablet artboard. That absence drives most of section 8.

---

## 1. Typography

### 1.1 Family

One family for the entire page: **Urbanist** (Google Fonts, geometric sans). Five weights are in use — Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800. No serif, no mono, no secondary display face.

This is the single strongest thing about the design system. One family carrying five weights gives the page a consistent voice without needing a second typeface, and the weight jump from Regular to ExtraBold is wide enough to create clear hierarchy on its own.

### 1.2 Desktop type scale

Sizes are in px; line-height is the absolute value Figma reports, with the computed ratio in brackets.

| Role | Size / line-height | Weight | Colour | Node |
|---|---|---|---|---|
| Hero H1 | 48 / 64 [1.33] | ExtraBold | `#191919` | `664:135` |
| Dark CTA H2 | 40 / 48 [1.20] | ExtraBold | `#FFFFFF` | `664:379` |
| Section H2 | 32 / 48 [1.50] | ExtraBold | `#191919` | `664:176`, `664:281`, `664:310`, `664:317`, `664:347` |
| Install step number | 56 / 56 [1.00] | ExtraBold | `rgba(13,181,131,0.09)` | `664:285` |
| Install step title | 24 / 33 [1.375] | Bold | `#191919` | `664:286` |
| Step-badge title | 22 / 26.4 [1.20] | ExtraBold | `#191919` | `664:190` |
| Feature card title | 18 / 27 [1.50] | Bold | `#191919` | `664:329` |
| Hero body | 18 / 27 [1.50] | Regular | `#6F6F6F` | `664:136` |
| Section body | 16 / 24 [1.50] | Regular | `#6F6F6F` | `664:177`, `664:318` |
| Install body | 16 / 28 [1.75] | Regular | `var(--body-text, #6F6F6F)` | `664:287` |
| Nav link | 16 / 24 [1.50] | Medium | `#4B5563` | `664:110` |
| FAQ question | 16 / 24 [1.50] | SemiBold | `#111827` | `664:351` |
| Feature card body | 15 / 25.5 [1.70] | Regular | `#6F6F6F` / `#4B5563` | `664:330`, `664:337` |
| Eyebrow pill | 14 / 19.5 [1.39] | SemiBold | `#0DB583` | `664:134`, `664:174` |
| Step label ("Step 1") | 14 / 21 [1.50] | Medium | `#6F6F6F` | `664:188` |
| Social proof headline | 14 / 21 [1.50] | Bold | `#000000` | `664:156` |
| Footer column heading | 14 / 21 [1.50] | Bold, uppercase, `0.7px` tracking | `#FFFFFF` | `664:395` |
| Footer link | 14 / 21 [1.50] | Regular | `rgba(255,255,255,0.6)` | `664:397` |
| Footer legal | 13 / 19.5 [1.50] | Regular | `rgba(255,255,255,0.4)` | `664:417` |
| Social proof subline | 12 / 18 [1.50] | Regular | `#4B5563` | `664:157` |
| CTA microcopy | 12 / 18 [1.50] | Regular | `rgba(255,255,255,0.5)` | `664:388` |

**Observations.**

The ramp is 12 → 14 → 15 → 16 → 18 → 22 → 24 → 32 → 40 → 48 → 56. Eleven steps for a single landing page is more than the content needs, and three of them (14 / 15 / 16) are close enough that they read as noise rather than hierarchy. The 15px feature-card body in particular exists only because that one card component was built separately from the rest.

Line-height is disciplined: almost everything is exactly 1.5, headings tighten to 1.2–1.33, and long-form install copy loosens to 1.75. That is a correct instinct — bigger type wants tighter leading, sustained reading wants looser.

Letter-spacing is used exactly once, `0.7px` (0.05em) on the uppercase footer headings. Uppercase text does need positive tracking, so this is right, but it means there is no tracking token — it is a one-off value.

### 1.3 Mobile type scale

Only two roles change between the two artboards:

| Role | Desktop | Mobile | Scale factor |
|---|---|---|---|
| Hero H1 | 48 / 64 | 32 / 42.56 | 0.667× (ratio 1.33 preserved) |
| Hero body | 18 / 27 | 16 / 27 | 0.889× (ratio loosens 1.50 → 1.69) |
| Everything else | — | unchanged | 1.0× |

The H1 reduction is handled well — the size drops by a third but the 1.33 line-height ratio is preserved exactly, so the heading keeps its proportions.

The hero body is the mistake: the size drops from 18 to 16 but the line-height stays pinned at 27px, pushing the ratio to 1.69. On a 354px-wide column that reads as visibly airy and gappy compared to the same paragraph on desktop. Line-height should have scaled with it, to roughly 24px.

Section H2 staying at 32px on a 394px screen is aggressive but survivable, because "Built for transparency and real impact" is given 333px and wraps to three lines. Any longer heading at that size would overflow.

---

## 2. Colour

### 2.1 Brand

`#0DB583` — a saturated mint green. It carries the primary action colour, the accent word in the hero headline, every eyebrow pill, every icon, and the ghost step numerals. It is the only chromatic colour in the design apart from two step-icon accents.

Tints in use, all derived from the same green by alpha:

| Value | Use |
|---|---|
| `rgba(13,181,131,0.08)` | Eyebrow pill fill, icon chip fill |
| `rgba(13,181,131,0.09)` | Ghost step numerals `01 / 02 / 03` |
| `rgba(13,181,131,0.12)` | Step-badge icon bubble (steps 1 and 4) |
| `rgba(13,181,131,0.19)` | Eyebrow pill border |
| `rgba(13,181,131,0.31)` / `0.40` | Avatar overlay tints in the social-proof row |

Two non-brand accents appear only inside the step badges: `rgba(59,130,246,0.12)` (blue, step 2) and `rgba(245,184,0,0.15)` (amber, step 3). They differentiate the four steps but are not part of any documented palette.

### 2.2 Ink

| Value | Use |
|---|---|
| `#191919` | All headings |
| `#111827` | FAQ questions, secondary button label |
| `#4B5563` | Nav links, social-proof subline, two of three card bodies |
| `#6F6F6F` | Body copy — the only named Figma variable, "Body Text" |
| `#000000` | Social-proof headline only |

Five near-black-to-grey values for text is two too many. `#191919` and `#000000` are not visually distinguishable at 14px; `#111827` and `#4B5563` are both doing "secondary text" jobs in different components. The `#6F6F6F` / `#4B5563` split inside the *same* three-card row (`664:330` uses one, `664:337` and `664:345` use the other) is a straight inconsistency, not a decision.

### 2.3 Surfaces

| Value | Use |
|---|---|
| `#F2F4F5` | Nav bar, hero |
| `#FFFFFF` | Steps loop, video, FAQ sections |
| `#F7F9F8` | Install, transparency, FAQ row fill |
| `rgba(7,59,58,0.02)` | Transparency card fill |
| `linear-gradient(160.29deg, #00140E 0%, #002216 50%, #00140E 100%)` | Final CTA band |
| `#00140E` | Footer |

Sections alternate light-grey / white / light-grey to separate without borders, then the page resolves into a near-black green-tinted footer. The rhythm works. `#F2F4F5` and `#F7F9F8` are close enough to be one token; using both means the hero and the install section read as the same tier when they are not.

The final-CTA gradient runs at 160.29° from `#00140E` through `#002216` and back — a subtle vertical lift in the middle. It reads as a single dark field, which is the intent.

### 2.4 Borders

`#E5E5E5` (nav bottom), `#E5E7EB` (cards, secondary button, FAQ rows), `rgba(255,255,255,0.1)` (footer divider), `rgba(13,181,131,0.19)` (pill), `#FFFFFF` (avatar rings, install screenshot frame).

### 2.5 Token maturity

**One** Figma variable is defined across the whole page: `Body Text = #6f6f6f`. Every other colour is a raw hex or rgba literal committed directly to the layer.

That is the central structural weakness of the file. There is no palette, no semantic naming, no light/dark pairing, and no single place to change the brand green. Section 12 gives a token block that closes this gap.

---

## 3. Spacing and layout

### 3.1 Vertical rhythm

Section padding is genuinely consistent: **80px top and bottom on every section**, with the hero as the single deliberate exception at **100px**. That one rule does most of the work of making the page feel composed.

Internal gaps, in order of use: 6, 8, 11, 12, 15.99, 18, 19, 20, 31, 32, 44, 48, 52, 54, 64, 170.

A 4px base grid is clearly intended — 8, 12, 16, 20, 32, 44, 48, 64 all sit on it. But 6, 11, 18, 19, 31, 52, 54 do not, and 170 is not a spacing value at all (see 3.3). Roughly a third of the gaps are off-grid, which is what makes the page feel hand-placed rather than systematic when you measure it.

### 3.2 Horizontal gutters — the biggest inconsistency

Every desktop section sets its own horizontal padding, and no two agree:

| Section | Padding-x | Content width at 1440 |
|---|---|---|
| Nav (`664:106`) | 140 | 1160 |
| Hero (`664:125`) | 468 | 504 |
| Steps loop (`664:170`) | 231 | 978 (inner block fixed at 719) |
| How to install (`664:276`) | 142 | 1156 (inner block fixed at 984) |
| Video (`664:309`) | 142 | 1156 |
| Transparency (`664:315`) | 112 | 1216 |
| Final CTA (`664:375`) | 400 | 640 |
| Footer (`664:389`) | 120 | 1200 |
| FAQ (`664:346`) | 0 | rows fixed at 720 |

Eight different gutters producing eight different content widths. The left edge of the page therefore moves on every scroll — nav copy starts at 140, transparency cards at 112, footer at 120, and none of them line up.

The fix is a single `max-width` container with fluid side padding, and per-section *measure* limits applied to the text block instead of to the section. The hero's narrow 504px column and the CTA's 640px column are good typographic choices — they just should not be implemented as 468px and 400px of fixed padding.

### 3.3 Where auto-layout stops

Most sections use Figma auto-layout, which translates cleanly to flexbox. Three areas do not, and these are the areas that will not survive being coded:

1. **Steps loop `664:178`** — a fixed 719 × 480 canvas. All four step badges, five hand-drawn arrow SVGs, and the centre photo are absolutely positioned at hard `left`/`top` coordinates. Nothing reflows.
2. **Entire mobile hero `664:426`** — every child is absolutely positioned. The headline, paragraph, buttons, social proof, pill, and image cluster all sit at fixed offsets inside an 871px box.
3. **FAQ rows `664:349`** — the question text is at `left: 19.99px` and the chevron at `left: 678.82px`, both absolute inside a fixed 719.99px row. The chevron is positioned, not right-aligned.

There is also a **fixed 170px gap** in the install section (`664:283`, `664:294`) used to force the two staggered columns into visual alignment. It is a magic number tuned to the current copy length. Any text edit desynchronises the columns.

And the vertical divider between those columns (`664:293`) is a 1164px-long line rotated 90° inside a zero-width flex item. That should be a `border-left`.

---

## 4. Radius, borders, shadows

### 4.1 Corner radius

| Value | Use |
|---|---|
| 8 px | All buttons |
| 9.96 / 11.16 px | Hero image cluster |
| 10 / 11 px | Mobile hero image cluster |
| 12 px | Install screenshots |
| 16 px | Cards, FAQ rows, icon chips, video frame, step badges |
| `20023700px` / `16777200px` / `100px` / `297.778px` | Pills and circles |

The pill values are Figma's "fully rounded" flag serialised as an enormous number. They all mean the same thing and should map to a single `9999px`. Three different literals for one concept is a copy-paste artifact.

The real system is **8 for buttons, 16 for containers, full for pills**. The 9.96 / 10 / 11 / 11.16 / 12 spread on images is noise — it should be one value.

### 4.2 Border widths

`0.597`, `1`, `1.194`, `1.5`, `1.79`, `3.581` px.

Sub-pixel widths do not render reliably in browsers — `0.597px` will either disappear or snap to 1px depending on device pixel ratio, and it is used on the eyebrow pill, every FAQ row, and the footer divider. These values (and the matching `13.996`, `15.991`, `19.991`, `31.992`, `55.992`, `79.993` icon sizes) come from a fractional scale factor applied somewhere upstream. Round them all: `0.597 → 1`, `1.79 → 2`, `3.581 → 4`, `15.991 → 16`, `19.991 → 20`, `31.992 → 32`, `55.992 → 56`, `79.993 → 80`.

### 4.3 Shadows

| Shadow | Applied to |
|---|---|
| `0 8px 15px rgba(0,0,0,0.10)` | Step badges |
| `0 8px 40px rgba(0,0,0,0.12)` | Steps centre photo |
| `0 2px 44px rgba(0,0,0,0.14)` | Install screenshot, left column |
| `0 6px 32px rgba(0,0,0,0.08)` | Install screenshots, right column |
| `0 7.437px 7.437px rgba(255,255,255,0.25)` | Hero image cluster |

Four different shadows across four components, with no shared elevation scale. The two install screenshots sit side by side in the same row with *different* shadows (`0 2px 44px` at 14% vs `0 6px 32px` at 8%), which reads as an accident.

The hero shadow is white at 25% opacity on a `#F2F4F5` background — it is invisible. It renders nothing and should be deleted.

---

## 5. CTA inventory

Nine interactive element types, with every measurement:

| # | Label | Style | Padding | Type | Icon | Height | Node |
|---|---|---|---|---|---|---|---|
| 1 | `Add Extension` | Solid `#0DB583`, r8 | 24 / 10.5 | 15 SemiBold | 16px download | 44 | `664:119` |
| 2 | `Add Extension ` | Solid `#0DB583`, r8 | 32 / 15 | 17 Bold | 20px download | 55 | `664:138` |
| 3 | `How it Works` | White, 1.79px `#E5E7EB`, r8 | 29 / 15 | 17 SemiBold `#111827` | 18px play | 55 | `664:144` |
| 4 | `Get Started Free` | Solid `#0DB583`, r8 | 32 / 15 | 17 Bold | 20px | 55 | `664:303` |
| 5 | Video play | Solid `#0DB583`, 80px circle, 3.581px `rgba(255,255,255,0.3)` ring | — | — | 32px play | 80 | `664:312` |
| 6 | `View Transparency Report ` | Outline, 1.79px `#0DB583`, transparent | 26 / 13 | 15 SemiBold `#0DB583` | 16px | 49 | `664:745` |
| 7 | `Add the Extension` | Solid `#0DB583`, r8, full-width of 256px column | 39 / 17 | 18 Bold | 22px | 61 | `664:382` |
| 8 | FAQ row | `#F7F9F8`, r16, `#E5E7EB` hairline | 20 / 20 | 16 SemiBold | 20px chevron | 64 | `664:350` |
| 9 | Carousel dots | 3 × 12px dots `rgba(229,229,229,0.95)` + 33 × 12 active pill white | — | — | — | 12 | `664:166` |

**Findings.**

*The same action has four different labels.* Buttons 1, 2, 4, and 7 all install the browser extension, and they say "Add Extension", "Add Extension " (with a trailing space), "Get Started Free", and "Add the Extension". Pick one verb phrase and repeat it — repetition is what makes a primary action memorable, and variation here reads as four different offers. Buttons 2 and 6 also carry trailing whitespace in the layer text, which will show up as a stray space in the DOM.

*Four button heights, no scale.* 44 / 49 / 55 / 61. A three-step ladder (sm 40, md 48, lg 56) would cover every use here.

*Only one non-install CTA on the entire page.* "View Transparency Report" is the sole secondary path. A visitor who is interested but not ready to install has exactly one place to go and no email capture, no "see the impact data", no partner list.

*The primary and secondary hero buttons are not visually balanced.* Both are 55px tall, but the primary uses 32px padding against the secondary's 29px, and the secondary carries a 1.79px border. Matching them at the same padding with a 1px border would make the pair sit correctly.

*Tap targets.* Desktop is fine throughout. On mobile the hamburger (`664:420`) is 40 × 32 px — below the 44 × 44 minimum on the vertical axis. The mobile CTA buttons are fixed at 202px wide inside a 354px content column (57%), which is narrow for a thumb; full-width would be the normal treatment.

---

## 6. Page structure — desktop

`1440 × 6409`, eight sections top to bottom:

| # | Section | Node | Height | Background |
|---|---|---|---|---|
| 1 | Nav | `664:106` | 64 | `#F2F4F5` |
| 2 | Hero | `664:125` | 1077 | `#F2F4F5` |
| 3 | How-it-works loop | `664:170` | 846 | `#FFFFFF` |
| 4 | How to install | `664:276` | 1584 | `#F7F9F8` |
| 5 | Video | `664:309` | 706 | `#FFFFFF` |
| 6 | Transparency | `664:315` | 634 | `#F7F9F8` |
| 7 | FAQ | `664:346` | 630 | `#FFFFFF` |
| 8 | Final CTA + footer | `664:374` | 868 | gradient → `#00140E` |

**Section detail.**

*Nav* — logo left, then a right-aligned group of five links (How it Works, Impact, Transparency, Blogs, FAQ) plus the Add Extension button, `space-between`, 32px gaps. No dropdowns, no search, no login. 64px tall, not sticky in the design.

*Hero* — centred 504px column: eyebrow pill → 48px headline with the middle phrase in green → 18px paragraph → two buttons side by side → avatar stack with "12,400+ members" → a six-image overlapping cluster with carousel dots. A blurred 1314 × 1276 logo watermark sits behind at 10% opacity, `mix-blend-darken`, 50px blur.

*How-it-works loop* — the eyebrow/heading/body block is auto-layout, then a fixed 719 × 480 diagram: four step badges positioned clockwise (Install the Extension → Browse Articles → Ads Fund Meals → Families Get Fed) around a central 339 × 300 photo, joined by five hand-drawn green arrow SVGs. The badges overlap the photo edges.

*How to install* — two staggered columns split by a vertical rule. Left holds step 01 text, a screenshot, then step 03 text; right holds a screenshot, step 02 text, then a screenshot. Reading order zig-zags 01 → 02 → 03 across the divider. Each step is a ghost 56px numeral, a 24px Bold title, and 16px body. A `Get Started Free` button closes the section.

*Video* — a 32px heading and a 1156 × 450 poster with an 80px circular play button. No duration, no captions, no transcript.

*Transparency* — heading and 525px body, then three equal cards (Transparency Report, Impact Verification, Charity Accountability), each with a 56px icon chip, an 18px title, and 15px body. An outline CTA closes it.

*FAQ* — a 32px heading and five collapsed rows at 720 × 64, each with a question and a chevron. No answers are written.

*Final CTA + footer* — the CTA band centres a 70 × 64 logo, a 40px white headline, 16px body, a 256px-wide button, and 12px microcopy. The footer runs a brand column plus three link columns (Product, Trust, Community — four links each), then a hairline rule and a centred copyright line.

---

## 7. Page structure — mobile

`393.86 × 6298`, seven sections:

| # | Section | Node | Height |
|---|---|---|---|
| 1 | Navbar | `664:419` | 68 |
| 2 | Hero | `664:426` | 871 |
| 3 | How to install | `664:546` | 1697 |
| 4 | Video | `664:582` | 431 |
| 5 | Transparency | `664:592` | 1199 |
| 6 | FAQ | `664:631` | 582 |
| 7 | Final CTA | `664:670` | 585 |
| 8 | Footer | `664:699` | 864 |

**The how-it-works loop section is absent on mobile.** The 846px desktop section (`664:170`) has no mobile counterpart. Given that it is a fixed-canvas absolutely-positioned diagram, dropping it is the pragmatic call — but it means mobile visitors never see the four-step explanation, and the desktop narrative of "loop overview, then linear install" collapses to "install" alone. If the loop matters, it needs a stacked vertical version; if it does not, it is decoration on desktop too.

**What mobile does well.** Gutters are a consistent 20px everywhere (the 19.99 / 20.06 variance is float noise), which is far more disciplined than desktop's eight different values. The three transparency cards stack cleanly. The four footer columns become a 684px vertical stack. Sections keep their 64px vertical padding.

**Section growth.** Install goes 1584 → 1697 despite the narrower screen, because the two staggered columns unwrap into one long stack. Transparency nearly doubles, 634 → 1199. Total page height barely changes (6409 → 6298) only because the loop section was removed.

---

## 8. Responsiveness assessment

### 8.1 The missing middle

Two artboards, 394 and 1440. Everything between 394 and 1440 is undefined, and that is exactly the range — phone landscape, tablet portrait, tablet landscape, small laptop — where the desktop layout breaks.

### 8.2 Where each section fails as the viewport narrows

Because gutters are fixed padding rather than a max-width container, content width goes to zero at a computable point:

| Section | Fixed cost | Breaks below |
|---|---|---|
| How to install | 142 × 2 padding + 984px fixed inner | ~1268 px |
| Hero | 468 × 2 padding | ~1200 px (content width hits 0 at 936) |
| Steps loop | 231 × 2 padding + 719px fixed canvas | ~1181 px |
| Final CTA | 400 × 2 padding | ~1000 px (content width hits 0 at 800) |
| FAQ | 720px fixed rows, zero side padding | ~720 px |
| Transparency | 112 × 2, cards are flexible | ~700 px |

**The desktop composition is effectively rigid below roughly 1270px.** At 1024px — an ordinary iPad landscape — the install section's 984px inner block plus 284px of padding needs 1268px and will overflow horizontally.

### 8.3 What to change

Replace every fixed `padding-x` with one container (`max-width: 1200px; margin-inline: auto; padding-inline: clamp(20px, 5vw, 140px)`), and express the narrow hero and CTA columns as `max-width` on the text block rather than as section padding. That single change fixes six of the seven breakpoints above.

The three absolutely-positioned areas from 3.3 need real layout rules before they can be built: the steps loop should become a CSS grid that reflows to a vertical list, the FAQ chevron should be `justify-content: space-between`, and the mobile hero should be flex-column.

The 170px magic gap in the install section should be removed and the two columns aligned with grid rows instead.

### 8.4 Fluid type

The H1 jumps 48 → 32 with nothing in between. `clamp(2rem, 1.4rem + 2.6vw, 3rem)` reproduces both endpoints and fills the gap. Section H2 holds at 32px on both artboards, which will be tight at 394px — `clamp(1.5rem, 1.2rem + 1.4vw, 2rem)` would be safer.

---

## 9. Visibility and contrast audit

Computed against WCAG 2.x. Normal text needs 4.5:1, large text (≥24px, or ≥18.66px bold) and UI components need 3:1.

| Ratio | Required | Result | Element |
|---|---|---|---|
| **2.64:1** | 4.5 | **FAIL** | White text on `#0DB583` — every primary CTA and the play button |
| **2.39:1** | 3.0 | **FAIL** | `#0DB583` accent phrase in the 48px hero headline, on `#F2F4F5` |
| **2.23:1** | 4.5 | **FAIL** | `#0DB583` 14px eyebrow on the green-08 pill over `#F2F4F5` |
| **2.44:1** | 4.5 | **FAIL** | Same pill over white |
| **2.50:1** | 4.5 | **FAIL** | `#0DB583` 15px outline-button label on `#F7F9F8` |
| **1.09:1** | 3.0 | **FAIL** (decorative) | Ghost numerals `rgba(13,181,131,0.09)` on `#F7F9F8` |
| **3.79:1** | 4.5 | **FAIL** | Footer legal 13px `rgba(255,255,255,0.4)` on `#00140E` |
| 4.55:1 | 4.5 | pass, tight | `#6F6F6F` 18px hero body on `#F2F4F5` |
| 4.75:1 | 4.5 | pass | `#6F6F6F` 15px card body on `#F7F9F8` |
| 5.02:1 | 4.5 | pass | `#6F6F6F` 16px body on white |
| 5.30:1 | 4.5 | pass | CTA microcopy 12px `rgba(255,255,255,0.5)` on `#00140E` |
| 6.85:1 | 4.5 | pass | `#4B5563` nav link on `#F2F4F5` |
| 7.19:1 | 4.5 | pass | Footer link `rgba(255,255,255,0.6)` on `#00140E` |
| 10.78:1 | 4.5 | pass | CTA body `rgba(255,255,255,0.75)` on `#00140E` |
| 15.94:1 | 4.5 | pass | `#191919` heading on `#F2F4F5` |
| 16.78:1 | 4.5 | pass | `#111827` FAQ question on `#F7F9F8` |

### 9.1 The brand green is the accessibility problem

`#0DB583` fails in both directions. White on it is 2.64:1 — that is not a near miss, it is below even the 3:1 threshold for large text and UI components. It on a light background is 2.23–2.50:1. Every conversion element on the page is affected: all four install buttons, the play button, every eyebrow pill, the outline CTA, and the accent phrase in the headline.

**Fix.** Keep `#0DB583` for large decorative fills where nothing has to be read, and introduce a darker variant for anything carrying text:

| Candidate | White-on-it | Verdict |
|---|---|---|
| `#0DB583` | 2.64:1 | current, fails |
| `#0AA376` | 3.22:1 | still fails AA |
| `#088F61` | 4.11:1 | still fails |
| **`#08865F`** | **4.58:1** | **passes AA, closest to brand hue** |
| `#077F5C` | 5.00:1 | comfortable margin |

`#08865F` for button fills and green text preserves the identity while clearing AA. The hero accent phrase and the eyebrow pill text should use the same value.

### 9.2 The invisible numerals

`01 / 02 / 03` at `rgba(13,181,131,0.09)` measure 1.09:1 — functionally invisible. That is acceptable for pure decoration, but here they are **the only ordinal indicator in the install section**. Sighted users infer order from position; anyone with low vision gets three unnumbered blocks in a zig-zag layout whose reading order is already ambiguous (see 10.3). Either raise the opacity to something readable or add a real, visible step label.

### 9.3 Other visibility notes

The footer copyright at 13px and 40% white misses AA at 3.79:1. Raising the alpha to 0.55 clears it.

Hero body at 4.55:1 passes by 0.05 — any darkening of the `#F2F4F5` background pushes it under.

The hero's white shadow on a light background (4.3) renders nothing.

The blurred logo watermark behind the hero at 10% opacity with `mix-blend-darken` sits under the headline. It is faint enough not to affect the measured contrast, but blend modes over text are a risk worth testing on real displays.

---

## 10. Interaction states and UX findings

### 10.1 No states are designed at all

Across nine interactive element types there is **not one** hover, focus, active, disabled, loading, or error state in the file. Every element exists in exactly one appearance.

The most serious consequence is **no focus indicator anywhere**. Combined with 9.1, keyboard navigation would be invisible: a user tabbing through the page gets no ring, and the elements they are landing on already fail contrast. This is the single highest-priority gap in the file.

Minimum additions before build: a 2px offset focus ring on every interactive element, hover darkening on buttons, an FAQ open state, and a pressed state on the play button.

### 10.2 Undefined component behaviour

*FAQ* — all five rows are drawn collapsed. There is no expanded panel, no answer copy, no chevron rotation, and no single-open-vs-multi-open rule.

*Hero carousel* — four dots with the fourth active (a 33 × 12 pill against three 12px circles), but no arrows, no autoplay timing, no pause control, and no defined slide count. The dots are also 12px, below a comfortable tap target.

*Video* — a static poster and play button. No player, no duration, no captions or transcript.

*Mobile nav* — a hamburger is drawn but the drawer it opens does not exist in the file. The five nav links have no mobile home.

### 10.3 Content and narrative

**Sections 3 and 4 both explain how the product works, and they disagree.** Section 3 presents a four-step loop (Install → Browse → Ads Fund Meals → Families Get Fed); section 4 presents a three-step linear install (Install → Open a New Tab → Meals Get Funded). Same story, two step counts, 2430px apart. One of them should go, or they should be merged into a single canonical explanation.

**The eyebrow "Real, measurable impact" is used twice, and is wrong the second time.** It sits above section 3 (`664:174`) and again above section 4's "How to Install" heading (`664:280`). Installation instructions are not measurable impact.

**Section 3's heading does not match its content.** It reads "Together, we're making a difference" with the subhead "Here's what the community has achieved so far" — then shows a process diagram. There are no achievements, no numbers, nothing the community has done.

**There is no impact number anywhere on the page.** For a product whose entire proposition is converting browsing into meals, there is no meals-funded count, no dollars-raised figure, no families-reached number, and no date. The only quantity is "12,400+ members", which measures the audience rather than the outcome. This is the strongest available conversion lever and it is absent — the heading in section 3 even promises it and then does not deliver.

**Transparency is claimed but not shown.** The section promises audited metrics and vetted charities, but names no charity, shows no partner logo, and links to a report that has no preview. "Our Partners" exists in the footer with nothing behind it. For a page asking users to install an extension that observes their browsing, the trust burden is high and this does not discharge it.

**FAQ answers are not written.** Five reasonable questions — including "Is my data safe?", the one that decides installs for this product category — with no answers.

**Nav links outrun the page.** Five links, but only How it Works, Transparency, and FAQ have matching sections. "Impact" and "Blogs" have no destination.

**No privacy disclosure at the point of decision.** The extension replaces the new-tab page and serves ads against browsed content. Nothing near any install button says what is collected. The Privacy Policy link is in the footer, below the final CTA. For this product, a one-line data statement adjacent to the primary button is close to mandatory.

### 10.4 What the design gets right

Worth keeping in view, because the list above is long:

- One typeface, five weights, disciplined 1.5 line-height — a clear, consistent voice.
- 80px section padding held across all eight sections.
- Light/white/light alternation that separates sections without dividers.
- The hero's narrow centred measure (~504px) is genuinely good typography for a 48px headline.
- Social proof placed immediately below the hero CTAs, where it does the most work.
- The dark final CTA gives the page a decisive ending.
- The hand-drawn arrows in the loop diagram give the brand real warmth — a rare thing in this category.
- Mobile's consistent 20px gutter is more systematic than desktop's.

---

## 11. Applicability to CompliVerse

The current site (`GRC/app/globals.css`) runs Montserrat / Inter / Source Serif 4 on a blue `#0057ff` palette with a dark surface set. The reference runs Urbanist on green `#0DB583` on light surfaces. **They share no tokens.** Nothing here transfers as-is, and the audiences are opposite — a consumer donation product versus enterprise GRC buyers.

What is worth borrowing is the *method*, not the values:

1. **One section-padding rule.** 80px everywhere, one exception, is why that page feels composed. Ours can adopt the rule with our own value.
2. **A single container instead of per-section gutters.** This is the reference's worst flaw and worth avoiding rather than copying.
3. **Text measure as a max-width on the text block.** The 504px hero column is the right idea, wrongly implemented.
4. **Semantic tokens before literals.** One variable in the whole file is what makes the palette unfixable. Our `@theme` block already does this better.
5. **Contrast-check the accent before committing it.** Our `#0057ff` on white is worth running through the same calculation, since it is used the same way.
6. **Design the states.** Hover, focus, active, disabled, empty, loading — the absence of these is the reference's largest gap and the easiest to avoid.

What to reject outright: the absolute-positioned diagram, the sub-pixel borders, the four labels for one action, and the two-artboard-only responsive strategy.

---

## 12. Token block

If the reference palette is ever adopted, this is it in the project's Tailwind 4 `@theme` syntax, with the contrast fix from 9.1 applied and the sub-pixel values rounded.

```css
@theme {
  /* type */
  --font-urbanist: "Urbanist", sans-serif;

  --text-xs:   0.75rem;   /* 12 */
  --text-sm:   0.875rem;  /* 14 */
  --text-base: 1rem;      /* 16 */
  --text-lg:   1.125rem;  /* 18 */
  --text-xl:   1.375rem;  /* 22 */
  --text-2xl:  1.5rem;    /* 24 */
  --text-3xl:  2rem;      /* 32 */
  --text-4xl:  2.5rem;    /* 40 */
  --text-5xl:  3rem;      /* 48 */
  --text-6xl:  3.5rem;    /* 56 */

  /* brand — gff-600 is the AA-safe variant, use it for anything with text on it */
  --color-gff-500: #0db583;  /* decorative fills only, 2.64:1 with white */
  --color-gff-600: #08865f;  /* buttons and green text, 4.58:1 with white */
  --color-gff-700: #077f5c;  /* hover, 5.00:1 */

  /* ink */
  --color-ink-900: #191919;
  --color-ink-800: #111827;
  --color-ink-600: #4b5563;
  --color-ink-500: #6f6f6f;  /* the one Figma variable: "Body Text" */

  /* surface */
  --color-surface-0:    #ffffff;
  --color-surface-50:   #f7f9f8;
  --color-surface-100:  #f2f4f5;
  --color-surface-dark: #00140e;

  /* border */
  --color-line:        #e5e7eb;
  --color-line-invert: rgb(255 255 255 / 0.1);

  /* radius */
  --radius-btn:  8px;
  --radius-card: 16px;
  --radius-pill: 9999px;

  /* elevation — collapsed from the reference's four ad-hoc shadows */
  --shadow-card:  0 8px 15px rgb(0 0 0 / 0.10);
  --shadow-float: 0 8px 40px rgb(0 0 0 / 0.12);
}
```

Fluid heading to close the 394 → 1440 gap:

```css
.hero-h1 { font-size: clamp(2rem, 1.4rem + 2.6vw, 3rem); line-height: 1.33; }
```

Container to replace the eight fixed gutters:

```css
.container { max-inline-size: 1200px; margin-inline: auto; padding-inline: clamp(20px, 5vw, 140px); }
```

---

## 13. Fix order

If this design were being built as-is, in priority order:

1. Add focus rings to all nine interactive types — nothing is keyboard-accessible without them.
2. Swap `#0DB583` for `#08865F` on every element that carries text.
3. Replace the eight fixed gutters with one container; define a tablet range.
4. Write the FAQ answers, especially "Is my data safe?".
5. Add a real impact number, or delete the heading in section 3 that promises one.
6. Merge sections 3 and 4 into one explanation with one step count.
7. Settle on one label for the install action.
8. Rebuild the steps loop and mobile hero with real layout instead of absolute positioning.
9. Round the sub-pixel borders and icon sizes.
10. Fix the duplicated eyebrow, the trailing spaces in button labels, and delete the invisible white hero shadow.
