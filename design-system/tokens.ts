/**
 * Design Tokens — Editorial Design Engineer Portfolio
 * 
 * Single source of truth for all visual constants.
 * Extracted from the existing codebase via design archaeology.
 * 
 * Usage: import { tokens } from '@/design-system/tokens'
 */

export const tokens = {
  color: {
    bg: {
      primary: '#FAFAFA',
      secondary: '#FFFFFF',
      surface: '#FFFFFF',
    },
    text: {
      primary: '#171717',
      secondary: '#525252',
      muted: '#737373',
      label: '#A3A3A3',
    },
    border: {
      primary: 'rgba(0,0,0,0.10)',
      subtle: 'rgba(0,0,0,0.05)',
    },
    selection: {
      bg: 'rgba(0,0,0,0.10)',
      text: '#000000',
    },
    accent: {
      navy: '#1F3A5F',   // Dark Navy
      blue: '#4D7298',   // Steel Blue
      orange: '#9FB4D1', // Periwinkle
      yellow: '#B1CDE0', // Sky Blue
      lime: '#F3D0C7',   // Pale Peach
    },
    cursor: {
      ring: 'rgba(255,255,255,0.5)',
      dot: '#FFFFFF',
    },
  },

  /** The 5-color pixel accent palette used across all Canvas 2D illustrations */
  PIXEL_COLORS: ['#1F3A5F', '#4D7298', '#9FB4D1', '#B1CDE0', '#F3D0C7'] as const,

  typography: {
    fontFamily: {
      primary: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      serif: "'Playfair Display', Georgia, serif",
    },
    scale: {
      display: { mobile: 'text-6xl', tablet: 'text-8xl', desktop: 'text-[9rem]', weight: 'font-bold', leading: 'leading-[0.85]', tracking: 'tracking-tighter', transform: 'uppercase' },
      h2Hero: { mobile: 'text-2xl', tablet: 'text-4xl', desktop: 'text-5xl', weight: 'font-medium', leading: 'leading-tight', transform: 'uppercase' },
      h2Section: { mobile: 'text-4xl', tablet: 'text-5xl', desktop: 'text-7xl', weight: 'font-bold', leading: 'leading-[1.1]', tracking: 'tracking-tight', transform: 'uppercase' },
      h3Card: { mobile: 'text-2xl', tablet: 'text-3xl', desktop: 'text-3xl', weight: 'font-bold', tracking: 'tracking-tight', transform: 'uppercase' },
      bodyLarge: { mobile: 'text-lg', desktop: 'text-xl', weight: 'font-medium', leading: 'leading-relaxed' },
      body: { mobile: 'text-base', desktop: 'text-lg', weight: 'font-medium', leading: 'leading-relaxed' },
      bodySmall: { size: 'text-sm', weight: 'font-medium' },
      label: { size: 'text-xs', weight: 'font-bold', tracking: 'tracking-widest', transform: 'uppercase' },
      tag: { size: 'text-[10px]', weight: 'font-bold', tracking: 'tracking-widest', transform: 'uppercase' },
    },
  },

  spacing: {
    edgePadding: {
      mobile: 'px-6',       // 24px
      tablet: 'md:px-12',   // 48px
      desktop: 'lg:px-24',  // 96px
    },
    /** Shorthand class string for consistent page edge padding */
    edgePaddingClass: 'px-6 md:px-12 lg:px-24',
    sectionVertical: 'py-32',  // 128px
    headlineToContent: 'mb-16', // 64px (or mb-24 = 96px for large gaps)
    cardGap: 'gap-12',         // 48px
    railGap: 'gap-8',          // 32px (experiments) or gap-12 (projects)
  },

  layout: {
    maxWidth: 'none',  // No max-width container
    gridColumns: 12,   // CSS background grid (decorative)
    baselineHeight: 48, // px — horizontal baseline grid
  },

  radius: {
    none: '0px',     // ALL content elements
    full: '9999px',  // Cursor only
  },

  shadow: {
    // Intentionally empty. This site uses zero shadows.
  },

  border: {
    section: 'border-b border-black/10',
    card: 'border border-black/10',
    image: 'border border-black/5',
    canvas: 'border-y border-black/10',
    controlActive: 'border-b border-black',
  },

  clipPath: {
    /** Stepped pixel-bevel corners — scales with element size */
    button: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
    buttonSmall: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)',
    buttonTiny: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)',
    tag: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)',
  },

  motion: {
    duration: {
      instant: 100,    // ms — cursor dot
      fast: 300,       // ms — magnetic, morph, underline
      default: 500,    // ms — cursor ring, hover
      slow: 1200,      // ms — parallax return
      glacial: 2500,   // ms — footer play sweep
    },
    easing: {
      outSmooth: 'power2.out',
      outHeavy: 'power3.out',
      spring: 'elastic.out(1, 0.3)',
      back: 'back.out(1.7)',
      link: 'cubic-bezier(0.22, 1, 0.36, 1)',
      none: 'none',
    },
    physics: {
      springHero: 0.1,
      springFooter: 0.08,
      friction: { min: 0.8, max: 0.85 },
      repulsionRadius: { min: 80, default: 150, max: 250 },
      magneticRatio: 0.3,   // Element moves 30% towards mouse
    },
    lenis: {
      lerp: 0.08,
      duration: 1.5,
    },
  },

  cursor: {
    states: {
      default: { ringSize: 40, dotVisible: true, textVisible: false, borderColor: 'rgba(255,255,255,0.5)', fill: 'transparent' },
      view: { ringSize: 80, dotVisible: false, textVisible: true, borderColor: 'rgba(255,255,255,0.2)', fill: 'transparent' },
      button: { ringSize: 24, dotVisible: false, textVisible: false, borderColor: 'white', fill: 'white' },
      text: { ringSize: 60, dotVisible: false, textVisible: false, borderColor: 'rgba(255,255,255,0.1)', fill: 'transparent' },
    },
    morphDuration: 400,  // ms
    morphEasing: 'power3.out',
  },

  responsive: {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
    },
  },

  image: {
    aspectRatio: '4/3',
    defaultFilter: 'grayscale(100%)',
    hoverFilter: 'grayscale(0%)',
    parallaxScale: 1.05,
    parallaxOffset: 30,  // px max offset (×0.5 = 15px each direction)
  },

  pixel: {
    gridResolutions: [8, 10, 12, 20] as const,
    cellGap: 1,  // px — always cellSize - 1
  },
} as const

export type DesignTokens = typeof tokens
