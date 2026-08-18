# Component Registry

> Reference document for all reusable components.
> Check this before creating any new component.

---

## MagneticButton

**File:** `components/MagneticButton.tsx`

**Purpose:** Universal interactive button wrapper that physically pulls towards the mouse cursor on hover, creating a "magnetic" attraction effect.

**When to use:**
- Any clickable element that should feel physically interactive
- CTA buttons, icon buttons, toolbar controls

**When NOT to use:**
- Large clickable areas (cards, full sections)
- Non-interactive decorative elements

**Variants:**

| Variant | Props | Styling |
|---|---|---|
| CTA (Primary) | `className`, `style` with 6px clip-path | `px-8 py-4 bg-neutral-900 text-white font-bold tracking-widest uppercase` |
| Icon | `className`, `style` with 3-4px clip-path | `w-10/12 h-10/12 bg-neutral-900 flex items-center justify-center text-white` |
| Control | `className` | `px-2 py-1 text-xs` + active: `text-black border-b border-black` |

**Props:**
```tsx
interface Props {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
  style?: React.CSSProperties
}
```

**Interaction behavior:**
- Enter: captures `boundingRect`
- Move: translates element 30% towards mouse (`300ms, power2.out`)
- Leave: returns to origin with elastic bounce (`700ms, elastic.out(1, 0.3)`)
- Mobile (coarse pointer): magnetic effect disabled
- `data-cursor="button"` is always applied

**Design tokens used:** `motion.easing.outSmooth`, `motion.easing.spring`, `motion.physics.magneticRatio`

---

## MouseParallaxImage

**File:** `components/MouseParallaxImage.tsx`

**Purpose:** Next.js `<Image>` wrapper that creates a subtle parallax effect — the image pans opposite to mouse direction, simulating a 3D window.

**When to use:**
- Project card thumbnails
- Any image where mouse-driven depth is desired

**When NOT to use:**
- Small icons or avatars
- Canvas-rendered pixel art
- Images that need precise alignment (diagrams)

**Props:**
```tsx
interface Props {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string         // Applied to the <Image> itself
  containerClassName?: string // Applied to the outer container
}
```

**Interaction behavior:**
- Move: image translates up to ±15px (`800ms, power2.out`)
- Leave: returns to center (`1200ms, power2.out`)
- Pre-scaled 1.05× to prevent edge reveal during parallax
- Mobile: parallax disabled
- `data-cursor="view"` is always applied to the container

**Design tokens used:** `motion.easing.outSmooth`, `image.parallaxScale`, `image.parallaxOffset`

---

## CustomCursor

**File:** `components/CustomCursor.tsx`

**Purpose:** Dual-layer custom cursor with mix-blend-mode difference and hover morphing states.

**When to use:**
- Mounted once globally in `page.tsx`
- Never instantiated more than once

**Morph states** (driven by `data-cursor` attribute on target elements):

| State | Ring Size | Ring Fill | Dot | Text |
|---|---|---|---|---|
| `default` | 40px | transparent | visible | hidden |
| `view` | 80px | transparent | hidden | "VIEW" |
| `button` | 24px | solid white | hidden | hidden |
| `text` | 60px | transparent | hidden | hidden |

**Responsive:** Hidden on mobile (`hidden md:flex`). Disabled for `pointer: coarse`.

**Design tokens used:** `cursor.*`, `motion.duration.fast`, `motion.easing.outHeavy`

---

## AnimatedCounter

**File:** `components/AnimatedCounter.tsx`

**Purpose:** Spring-animated number that counts up when scrolled into view.

**When to use:**
- Statistics, metrics, numbered achievements

**Props:**
```tsx
interface Props {
  from?: number    // Default: 0
  to: number
  duration?: number // Default: 1.5
}
```

**Behavior:** Uses Framer Motion `useSpring` with `useInView({ once: true })`. Reduced motion: shows final value immediately.

---

## SmoothScroll

**File:** `components/SmoothScroll.tsx`

**Purpose:** Lenis smooth scroll wrapper for the entire application.

**When to use:**
- Wraps `{children}` in `layout.tsx` — always active

**Configuration:** `lerp: 0.08`, `duration: 1.5`, `smoothWheel: !shouldReduceMotion`

---

## usePixelCanvas (Hook)

**File:** `hooks/usePixelCanvas.ts`

**Purpose:** Universal Canvas 2D lifecycle manager. Handles DPR-aware sizing, resize events, IntersectionObserver-based pause for offscreen canvases, and requestAnimationFrame loop.

**When to use:**
- Every Canvas 2D visualization in the project

**Config:**
```tsx
interface PixelCanvasConfig {
  onDraw: (ctx, width, height, time) => void  // Called every frame
  onResize?: (width, height) => void
  onInit?: (width, height) => void             // Called once on first mount
  pauseOffscreen?: boolean                     // Default: true
}
```

**Returns:** `ref` to attach to `<canvas>` element.

---

## Section Components

### HeroSection ⭐ Signature
**File:** `components/HeroSection.tsx`
**Pattern:** Editorial split header + interactive pixel landscape with configurable cell/brush size.
**Unique features:** Shockwave on click, controls bar with S/M/L toggles.

### ExperimentsSection
**File:** `components/ExperimentsSection.tsx`
**Pattern:** Headline + GSAP ScrollTrigger horizontal scroll rail with ExperimentCards.
**Reusable pattern:** The horizontal rail logic could be extracted.

### ProjectsSection
**File:** `components/ProjectsSection.tsx`
**Pattern:** Label + Headline + GSAP ScrollTrigger horizontal scroll rail with ProjectCards (image + metadata).
**Reusable pattern:** Same rail logic as ExperimentsSection.

### ManifestoSection
**File:** `components/ManifestoSection.tsx`
**Pattern:** Editorial split — large headline left, body text + PixelFaces right.
**Contains:** Internal `PixelFace` sub-component (8×8 pixel-art face via Canvas 2D).

### ProcessSection ⭐ Signature
**File:** `components/ProcessSection.tsx`
**Pattern:** Headline + scroll-driven Canvas 2D particle animation + 4-column description grid.
**Unique:** 300 particles interpolating between 3 spatial states based on scroll progress.

### SystemSection ⭐ Signature
**File:** `components/SystemSection.tsx`
**Pattern:** Headline + scroll-driven stepped Canvas 2D diagram.
**Unique:** 4-step reveal (Tokens → Components → Product UI → Feedback Loop) with connection lines.

### FooterSection ⭐ Signature
**File:** `components/FooterSection.tsx`
**Pattern:** Full-screen Canvas 2D with physics-driven pixel text + CTA + skyline equalizer.
**Unique:** Text rasterized via offscreen canvas `measureText` → `getImageData` → physical pixel particles.
