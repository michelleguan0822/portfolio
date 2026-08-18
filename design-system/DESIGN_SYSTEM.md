# DESIGN SYSTEM — Editorial Design Engineer Portfolio

> **Design Archaeology Report**
> Extracted from the existing codebase as a single source of truth.
> No new aesthetic has been invented. Every rule below was discovered inside the website.

---

## 01. Visual Personality

| Trait | Description |
|---|---|
| **Archetype** | Swiss modernist editorial × pixel-art illustration hybrid |
| **Mood** | Precise, restrained, engineering-grade craft with playful pixel warmth |
| **Mode** | Light-mode only (`#FAFAFA` base) |
| **Density** | High whitespace, low content density per viewport |
| **Typography feel** | Oversized, bold, uppercase headlines. Quiet, medium-weight body. |
| **Illustration feel** | 8-bit pixel-art diagrams rendered in Canvas 2D. Never photographic illustrations. |
| **Interaction feel** | Physics-based (spring, friction, damping). Never decorative. Every motion has mass. |
| **Border language** | Hairline `1px` dividers. `border-black/10`. Never rounded corners on cards. |
| **Shape language** | Intentionally sharp rectangles + `clip-path` stepped corners (faux-pixel bevels) |

---

## 02. Color Tokens

### Semantic Palette

```
--color-bg-primary:        #FAFAFA     (neutral-50)
--color-bg-secondary:      #FFFFFF     (white, used on ProcessSection)
--color-bg-surface:        #FFFFFF     (card backgrounds)

--color-text-primary:      #171717     (neutral-900)
--color-text-secondary:    #525252     (neutral-600)
--color-text-muted:        #737373     (neutral-500)
--color-text-label:        #A3A3A3     (neutral-400)

--color-border-primary:    rgba(0,0,0,0.10)   (border-black/10)
--color-border-subtle:     rgba(0,0,0,0.05)   (border-black/5)

--color-selection-bg:      rgba(0,0,0,0.10)
--color-selection-text:    #000000
```

### Accent Palette (Pixel System)

These 5 colors are the **only** accent colors. They appear exclusively in Canvas 2D pixel illustrations, tags, and pixel-face icons. They do NOT appear as text colors or backgrounds for DOM elements (except tags).

```
--color-accent-navy:       #001F54
--color-accent-blue:       #034078
--color-accent-orange:     #FEA82F
--color-accent-yellow:     #FFD700
--color-accent-lime:       #A3E635
```

### Cursor System Colors

```
--color-cursor-ring:       rgba(255,255,255,0.5)
--color-cursor-dot:        #FFFFFF
--color-cursor-blend:      mix-blend-mode: difference
```

> [!IMPORTANT]
> The accent palette is restricted to the pixel illustration system. Never use `#FFD700` or `#A3E635` as a button color, heading color, or section background. They exist only inside Canvas and tag badges.

---

## 03. Typography System

### Font Families

```
--font-primary:    'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif
--font-serif:      'Playfair Display', Georgia, serif   (declared but UNUSED in current site)
```

> [!NOTE]
> `Playfair Display` is loaded but never referenced in any component. It exists as a reserved serif option. The entire site uses Inter exclusively.

### Typography Scale

| Token | Usage | Size (Mobile → Desktop) | Weight | Leading | Tracking | Transform |
|---|---|---|---|---|---|---|
| **Display** | Hero `h1` | `text-6xl` → `text-[9rem]` | 700 (bold) | `leading-[0.85]` | `tracking-tighter` | `uppercase` |
| **H2-Hero** | Hero subtitle | `text-2xl` → `text-5xl` | 500 (medium) | `leading-tight` | — | `uppercase` |
| **H2-Section** | Section headlines | `text-4xl` → `text-7xl` / `text-8xl` | 700 (bold) | `leading-[1.1]` / `leading-[1]` | `tracking-tight` | `uppercase` |
| **H3-Card** | Card titles | `text-2xl` → `text-3xl` | 700 (bold) | — | `tracking-tight` | `uppercase` |
| **Body-Large** | Manifesto paragraphs | `text-lg` → `text-xl` | 500 (medium) | `leading-relaxed` | — | — |
| **Body** | Hero description, process items | `text-base` → `text-lg` | 500 (medium) | `leading-relaxed` | — | — |
| **Body-Small** | Face captions, tag descriptions | `text-sm` | 500 (medium) | — | — | — |
| **Label** | Section labels, process steps | `text-xs` / `text-sm` | 700 (bold) | — | `tracking-widest` | `uppercase` |
| **Tag** | Badge labels | `text-[10px]` | 700 (bold) | — | `tracking-widest` | `uppercase` |
| **Controls** | Canvas toolbar labels | `text-xs` | 700 (bold) | — | `tracking-widest` | `uppercase` |
| **Cursor-Text** | "View" inside cursor | `text-[10px]` | 700 (bold) | — | `tracking-widest` | `uppercase` |

### Typography Rules

1. **All headings are uppercase.** No exceptions.
2. **Body text is never uppercase** (except labels and tags).
3. **font-weight distribution**: Headlines always `bold (700)`. Body always `medium (500)`. Labels always `bold (700)`.
4. **Max heading width**: `max-w-4xl` for section headlines, `max-w-lg` for subtitles, `max-w-sm` for descriptions.
5. **No heading uses `font-serif`** in the current implementation.

---

## 04. Spacing System

### Extracted Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `space-1` | `4px` (gap-1) | Tag internal padding |
| `space-2` | `8px` (gap-2, p-2, px-2) | Tag gap, control padding |
| `space-3` | `12px` (py-3, gap-3) | Control bar vertical |
| `space-4` | `16px` (gap-4, mb-4, p-4) | Face-caption gap |
| `space-6` | `24px` (gap-6, px-6, mb-6) | Mobile edge padding, image-to-caption |
| `space-8` | `32px` (gap-8, p-8, mt-8, pt-8) | Card padding, inter-element |
| `space-12` | `48px` (gap-12, md:px-12) | Tablet edge padding, card rail gap, column gap |
| `space-16` | `64px` (gap-16, mb-16, mt-16) | Section headline → content |
| `space-24` | `96px` (lg:px-24, gap-24, mb-24) | Desktop edge padding, headline → rail |
| `space-32` | `128px` (py-32) | Section vertical padding |
| `space-48` | `192px` (mt-48) | Footer overlay offset |

### Page Edge Padding (Critical Pattern)

```
Mobile:   px-6    (24px)
Tablet:   md:px-12  (48px)
Desktop:  lg:px-24  (96px)
```

> [!IMPORTANT]
> This `px-6 md:px-12 lg:px-24` pattern is the **single most repeated class string** in the entire codebase. It appears in every section. All future sections MUST use this exact padding to maintain the left-edge alignment grid.

### Vertical Rhythm

```
Section padding:         py-32 (128px top and bottom)
Headline → content:      mb-16 or mb-24 (64px or 96px)
Content → sub-content:   mt-16 (64px)
Inter-card gap:          gap-8 or gap-12 (32px or 48px)
```

---

## 05. Layout System

### Page Container

- **No max-width container.** Content flows full-width, constrained only by edge padding.
- Page width: `100vw` minus edge padding.
- No centered `max-w-7xl` wrapper.

### Grid Patterns

| Pattern | Usage | Structure |
|---|---|---|
| **Editorial Split** | Hero, Manifesto | `flex-col md:flex-row` with `w-1/2` halves |
| **Horizontal Scroll Rail** | Projects, Experiments | GSAP ScrollTrigger pinned `flex gap-N w-max` |
| **4-Column Grid** | Process steps | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12` |
| **Full-Bleed Canvas** | Hero, Process, System, Footer | `w-full` canvas inside `relative` container |

### Background Grid Overlay

The body has a CSS structural grid:
- **12-column vertical lines** at `rgba(0,0,0,0.03)` — barely visible
- **Horizontal baseline lines** every `48px` at `rgba(0,0,0,0.03)`

### Section Composition Order

```
1. HeroSection         — Editorial Split + Full-Bleed Canvas
2. ExperimentsSection   — Headline + Horizontal Scroll Rail (cards)
3. ProjectsSection      — Label + Headline + Horizontal Scroll Rail (image cards)
4. ManifestoSection     — Editorial Split (headline + paragraphs + pixel faces)
5. ProcessSection       — Headline + Full-Bleed Canvas + 4-Column Grid
6. SystemSection        — Headline + Scroll-Driven Canvas Diagram
7. FooterSection        — Full-Screen Canvas + Overlay Controls
```

---

## 06. Border & Shape Language

### Border Tokens

```
--border-section:     1px solid rgba(0,0,0,0.10)    // border-b border-black/10
--border-card:        1px solid rgba(0,0,0,0.10)     // border border-black/10
--border-image:       1px solid rgba(0,0,0,0.05)     // border border-black/5
--border-canvas:      1px solid rgba(0,0,0,0.10)     // border-y border-black/10
--border-control-active: 1px solid #000              // border-b border-black
```

### Border Radius

```
--radius-none:    0px       (ALL cards, images, sections, containers)
--radius-full:    9999px    (cursor dot and ring ONLY)
```

> [!CAUTION]
> This site uses **zero border-radius on all content elements**. Cards, images, buttons, tags — all sharp corners. The only rounded element is the cursor. Do NOT introduce `rounded-lg` or `rounded-xl` on any content component.

### Stepped Corner Shape (Signature)

The site's unique shape language uses `clip-path: polygon(...)` to create pixel-beveled corners:

```css
/* Button — 6px steps */
clip-path: polygon(
  6px 0, calc(100% - 6px) 0,
  100% 6px, 100% calc(100% - 6px),
  calc(100% - 6px) 100%, 6px 100%,
  0 calc(100% - 6px), 0 6px
);

/* Small button — 3-4px steps */
clip-path: polygon(
  4px 0, calc(100% - 4px) 0,
  100% 4px, 100% calc(100% - 4px),
  calc(100% - 4px) 100%, 4px 100%,
  0 calc(100% - 4px), 0 4px
);

/* Tag — 2px steps */
clip-path: polygon(
  2px 0, calc(100% - 2px) 0,
  100% 2px, 100% calc(100% - 2px),
  calc(100% - 2px) 100%, 2px 100%,
  0 calc(100% - 2px), 0 2px
);
```

Step size scales with element size: `2px` (tags) → `3-4px` (small buttons) → `6px` (large buttons).

---

## 07. Shadow & Depth

```
Shadows used:     NONE
Elevation:        NONE
Glassmorphism:    Minimal — backdrop-blur-sm on controls bar ONLY
Overlays:         NONE
```

The site is intentionally flat. Depth comes from **interaction physics** (spring, parallax), not visual shadows.

---

## 08. Component Inventory

### A. Primitives

| Component | File | Purpose |
|---|---|---|
| **MagneticButton** | `MagneticButton.tsx` | Universal interactive button with GSAP magnetic pull |
| **MouseParallaxImage** | `MouseParallaxImage.tsx` | Next.js Image with mouse-following parallax, pre-scaled 1.05x |
| **CustomCursor** | `CustomCursor.tsx` | Dual-layer cursor (ring + dot) with mix-blend-mode and hover morphing |
| **AnimatedCounter** | `AnimatedCounter.tsx` | Spring-animated number counter (Framer Motion useSpring) |
| **SmoothScroll** | `SmoothScroll.tsx` | Lenis wrapper (lerp: 0.08, duration: 1.5) |
| **PixelFace** | Inside `ManifestoSection.tsx` | 8x8 pixel-art face via Canvas 2D with wobble |

### B. Section Components

| Component | File | Pattern | Signature? |
|---|---|---|---|
| **HeroSection** | `HeroSection.tsx` | Editorial Split + Interactive Canvas + Controls | Yes |
| **ExperimentsSection** | `ExperimentsSection.tsx` | Headline + Horizontal Scroll Rail (cards) | Reusable |
| **ProjectsSection** | `ProjectsSection.tsx` | Label + Headline + Horizontal Scroll Rail (image cards) | Reusable |
| **ManifestoSection** | `ManifestoSection.tsx` | Editorial Split (headline + body + pixel faces) | Reusable |
| **ProcessSection** | `ProcessSection.tsx` | Headline + Scroll-Driven Canvas + 4-Column Grid | Yes |
| **SystemSection** | `SystemSection.tsx` | Headline + Scroll-Driven Step Canvas Diagram | Yes |
| **FooterSection** | `FooterSection.tsx` | Full-Screen Physics Canvas + CTA | Yes |

### C. Hooks

| Hook | File | Purpose |
|---|---|---|
| **usePixelCanvas** | `hooks/usePixelCanvas.ts` | Universal Canvas 2D lifecycle (DPR, resize, IntersectionObserver, rAF) |

### D. Utilities

| Utility | File | Purpose |
|---|---|---|
| **cn** | `utils/cn.ts` | clsx + tailwind-merge class merger |

---

## 09. Component Variants

### MagneticButton

| Variant | Usage | Styling |
|---|---|---|
| **CTA** | Footer "Get In Touch" | `px-8 py-4 bg-neutral-900 text-white` + 6px stepped clip-path |
| **Icon** | Arrow buttons | `w-10/12 h-10/12 bg-neutral-900 text-white` + 3-4px stepped clip-path |
| **Control** | Canvas toolbar | `px-2 py-1 text-xs` + active: `text-black border-b border-black` |

### Cards

| Variant | Section | Structure |
|---|---|---|
| **ProjectCard** | Projects | Image (4:3) + Title + Subtitle + Tags. `w-[85vw] md:w-[60vw] lg:w-[45vw]`. Grayscale → color on hover. |
| **ExperimentCard** | Experiments | No image. Title + Tags. `w-[70vw] md:w-[40vw] lg:w-[25vw] aspect-square`. White bg + border. |

---

## 10. Motion System

### Motion Tokens

| Token | Value | Usage |
|---|---|---|
| `motion-instant` | `100ms` | Cursor dot follow |
| `motion-fast` | `300-400ms` | Magnetic pull, cursor morph, link underline |
| `motion-default` | `500-800ms` | Cursor ring, parallax, hover transitions |
| `motion-slow` | `1200-1500ms` | Parallax return, smooth scroll |
| `motion-glacial` | `2500ms` | Footer play animation sweep |

### Easing Tokens

| Token | GSAP / CSS Value | Usage |
|---|---|---|
| `ease-out-smooth` | `power2.out` | Parallax, cursor dot, magnetic pull |
| `ease-out-heavy` | `power3.out` | Cursor ring, morph transitions |
| `ease-spring` | `elastic.out(1, 0.3)` | Button return to origin |
| `ease-back` | `backOut` (Framer) | Arrow button reveal |
| `ease-link` | `cubic-bezier(0.22, 1, 0.36, 1)` | CSS underline transition |
| `ease-none` | `linear` | ScrollTrigger scrub |

### Physics Constants

| Parameter | Value | Component |
|---|---|---|
| Spring stiffness (hero) | `0.1` | HeroSection |
| Spring stiffness (footer) | `0.08` | FooterSection |
| Friction | `0.8 – 0.85` | All pixel physics |
| Mouse repulsion radius | `80-250px` | HeroSection (configurable) |
| Mouse repulsion radius | `100px` | FooterSection |
| Lenis lerp | `0.08` | SmoothScroll |
| Lenis duration | `1.5s` | SmoothScroll |

### Cursor Morph States

| Trigger (`data-cursor`) | Ring Size | Dot | Text |
|---|---|---|---|
| `default` | 40px, border white/50 | visible | hidden |
| `"view"` | 80px, border white/20 | hidden | "VIEW" visible |
| `"button"` | 24px, solid white fill | hidden | hidden |
| `"text"` | 60px, border white/10 | hidden | hidden |

---

## 11. Illustration System — Pixel Art Rules

| Rule | Value |
|---|---|
| **Renderer** | HTML Canvas 2D exclusively |
| **Grid resolution** | 8px, 10px, 12px, or 20px cells |
| **Cell gap** | `cellSize - 1` → always 1px gap |
| **Color palette** | Strictly the 5 accent colors |
| **Background** | Transparent over `#FAFAFA` |
| **Physics** | Spring-return + mouse repulsion |
| **Grid snapping** | `Math.round(pos / cellSize) * cellSize` |

---

## 12. Responsive System

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Edge padding | `px-6` (24px) | `md:px-12` (48px) | `lg:px-24` (96px) |
| Hero headline | `text-6xl` | `text-8xl` | `text-[9rem]` |
| Section headlines | `text-4xl` | `text-5xl/6xl` | `text-7xl/8xl` |
| Hero layout | Stacked | Side-by-side | Side-by-side |
| Project cards | `w-[85vw]` | `w-[60vw]` | `w-[45vw]` |
| Experiment cards | `w-[70vw]` | `w-[40vw]` | `w-[25vw]` |
| Process grid | 1 column | 2 columns | 4 columns |
| Custom cursor | Hidden | Visible | Visible |
| Magnetic/Parallax | Disabled | Active | Active |

---

## 13. Duplicate Cleanup Recommendations

1. **Extract `COLORS` to `tokens.ts`** — currently defined 3 times in Hero, Footer, Manifesto.
2. **Extract `ArrowButton`** — same arrow+clip-path pattern in Projects and Experiments.
3. **Extract `HorizontalScrollRail`** — share ScrollTrigger pin+scrub logic.

---

## 14. Signature Components (Do Not Systematize)

| Component | Reason |
|---|---|
| HeroSection | Custom interactive pixel landscape |
| FooterSection | Physics-driven text rasterization |
| ProcessSection Canvas | 3-state particle interpolation |
| SystemSection Canvas | Stepped diagram with connections |
| PixelFace | 8x8 binary face with wobble |

---

## 15. Anti-Patterns (Forbidden)

- No rounded corners on content elements
- No box shadows or drop shadows
- No gradient section backgrounds
- No glassmorphism beyond controls bar
- No colored section backgrounds (only #FAFAFA and #FFFFFF)
- No SVG illustrations (use Canvas 2D pixel art)
- No navigation bars or hamburger menus
- No colors outside the defined palettes
- No CSS transitions for scroll effects (use GSAP scrub)
- No decorative elements without interaction purpose
