# wild-as-clone

A Next.js starter project inspired by [craft.wild.as](https://craft.wild.as) — a minimal, premium design studio website.

## ✨ Features

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Framer Motion** for scroll-triggered animations
- **React Three Fiber + Drei** for WebGL background
- **Custom GLSL Shader** — subtle flowing noise background
- **Responsive design** for all screen sizes
- **Smooth scroll** navigation
- **Mobile-friendly** hamburger menu
- **Rich hover interactions** on project cards

## 🎨 Sections

1. **Navigation** — Fixed header with blur backdrop on scroll
2. **Hero** — Large typography with subtle entrance animations
3. **Work Grid** — 9 project cards with advanced hover effects
4. **About** — Two-column layout with studio story and stats
5. **AI Levels** — Three-tier service cards (L1/L3/L5)
6. **Contact** — Email and address with social links
7. **Footer** — Minimal footer with copyright

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎭 WebGL Background

The background uses a custom GLSL fragment shader with multi-octave simplex noise:

- **3 layers** of noise at different frequencies
- **Very slow animation** (0.08x time scale) — barely perceptible
- **Dark palette** — near-black tones with subtle warm/cool shifts
- **Vignette effect** — edges slightly darker
- **Fixed position** — stays behind all content

### Shader Details

```glsl
// 3-octave simplex noise
float n1 = snoise(uv * 2.0 + t * 0.3);      // Large forms
float n2 = snoise(uv * 4.0 - t * 0.2) * 0.5; // Medium detail
float n3 = snoise(uv * 8.0 + t * 0.1) * 0.25; // Fine detail
```

## 🎯 Project Card Hover Effects

Each card features a multi-layered hover interaction:

| Effect | Description |
|--------|-------------|
| **Scale** | Image scales from 1.0 → 1.1 over 0.7s |
| **Opacity** | Gradient opacity increases 0.5 → 0.8 |
| **Accent Glow** | Colored blur-3xl glow fades in behind image |
| **Arrow Button** | Top-right circle slides up + fades in |
| **View Pill** | Bottom-left "View case" pill slides up |
| **Underline** | Title underline expands 0% → 100% width |
| **Text Shift** | Category/description colors lighten |
| **CTA Slide** | "View case study" text shifts right 4px |
| **Arrow Rotate** | Arrow icon rotates -45° on hover |
| **Scanline** | Subtle pulse overlay on hover |
| **Noise Texture** | SVG noise overlay for film grain feel |

## 🛠️ Customization

### Replace Project Data
Edit `components/WorkGrid.tsx`:
```tsx
const projects = [
  {
    id: 1,
    title: 'Your Project',
    category: 'Category',
    description: 'Description',
    color: 'from-purple-900/30 to-blue-900/30',
    accent: 'bg-purple-500/20',
    year: '2024',
  },
  // ...
]
```

### Adjust WebGL Background
Edit `components/WebGLBackground.tsx`:
- Change `uTime * 0.08` for faster/slower animation
- Modify `color1`, `color2`, `color3` for different tones
- Adjust noise frequencies (`uv * 2.0`, `uv * 4.0`, `uv * 8.0`)

### Update Contact Info
Edit `components/Contact.tsx`:
```tsx
<a href="mailto:your@email.com">your@email.com</a>
```

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| **Primary Background** | `#0a0a0a` (neutral-950) |
| **Text Primary** | `#ffffff` |
| **Text Secondary** | `#a3a3a3` (neutral-400) |
| **Font Sans** | Inter |
| **Font Serif** | Playfair Display |
| **Border Radius** | `0.75rem` (rounded-xl) |
| **Transition Easing** | `[0.22, 1, 0.36, 1]` (custom cubic-bezier) |
| **Card Gap** | `2.5rem` (gap-10) |

## 📦 Dependencies

```json
{
  "next": "14.2.5",
  "react": "^18.3.1",
  "framer-motion": "^11.3.0",
  "@react-three/fiber": "^8.16.8",
  "@react-three/drei": "^9.108.4",
  "three": "^0.166.1",
  "lucide-react": "^0.400.0"
}
```

## 📄 License

MIT
