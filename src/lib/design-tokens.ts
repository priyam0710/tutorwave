/**
 * TutorWave Design System — Design Tokens
 *
 * Single source of truth for all design values.
 * Use these tokens in components for consistency.
 *
 * COLOUR USAGE RULE:
 *   Dominant interface: white + navy + electric blue
 *   Accents (use sparingly): yellow, teal, coral, sky blue
 */

// ── Colour Palette ────────────────────────────────────────────

export const colors = {
  // Foundation — dominant interface
  white:    '#FFFFFF',
  offwhite: '#F8FAFC',
  navy:     '#0D1118',   // Deep Navy — primary text, dark sections
  dark:     '#25262A',   // Dark Grey — secondary dark text

  // Primary — Electric Blue (CTAs, links, key highlights)
  blue:      '#0A6FF7',
  blueHover: '#0858C8',
  blueLight: '#EBF4FF',

  // Secondary — Sky Blue (subtle accents only)
  sky: '#4BC2FD',

  // Accents — use sparingly as brand highlights
  yellow: '#F8AD03',  // Golden Yellow
  teal:   '#0C8F81',  // Teal
  coral:  '#D6041A',  // Coral

  // Neutrals
  border:  '#E5E7EB',  // Light Border
  muted:   '#6B7280',  // Muted Text
  inputBg: '#F8FAFC',
} as const;

// ── Typography ────────────────────────────────────────────────

export const typography = {
  // Font stack — Manrope primary, Inter fallback
  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",

  // Weight scale
  weights: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
  },

  // Hierarchy
  // H1: bold/extrabold, premium, highly readable
  // H2: bold
  // H3: semibold
  // Body: regular/medium
  // Buttons: semibold

  // Letter spacing
  tracking: {
    tight:    '-0.03em',   // H1 display
    snug:     '-0.02em',   // H2
    normal:   '-0.01em',   // H3, body
    wide:     '0.12em',    // Overlines/labels (uppercase)
  },
} as const;

// ── Border Radius ─────────────────────────────────────────────

export const radius = {
  sm:   '0.5rem',    // 8px  — small elements
  md:   '0.75rem',   // 12px — inputs, small cards
  lg:   '1rem',      // 16px — medium cards
  xl:   '1.25rem',   // 20px — standard cards
  '2xl':'1.5rem',    // 24px — large cards
  '3xl':'2rem',      // 32px — hero visuals
  pill: '9999px',    // Badges, tags only
} as const;

// ── Spacing Scale ─────────────────────────────────────────────

export const spacing = {
  // Section vertical padding
  sectionSm: '4rem',    // 64px  — compact sections
  sectionMd: '6rem',    // 96px  — standard sections
  sectionLg: '8rem',    // 128px — spacious sections
  sectionXl: '10rem',   // 160px — hero sections

  // Card padding
  cardSm:  '1rem',      // 16px
  cardMd:  '1.5rem',    // 24px
  cardLg:  '2rem',      // 32px
} as const;

// ── Shadows ───────────────────────────────────────────────────

export const shadows = {
  card:   '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.05)',
  cardMd: '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)',
  cardLg: '0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.08)',
  blueSm: '0 4px 12px rgba(10,111,247,0.18)',
  blueMd: '0 8px 24px rgba(10,111,247,0.22)',
  blueLg: '0 12px 32px rgba(10,111,247,0.28)',
} as const;

// ── Tailwind Class Helpers ────────────────────────────────────
// Ready-to-use Tailwind class strings for common patterns

export const tw = {
  // Buttons
  btnPrimary:   'btn-primary',
  btnSecondary: 'btn-secondary',
  btnOutline:   'btn-outline',
  btnWhite:     'btn-white',
  btnGhost:     'btn-ghost',
  btnSm:        'btn-sm',
  btnLg:        'btn-lg',

  // Cards
  card:          'card',
  cardInteractive: 'card-interactive',
  cardElevated:  'card-elevated',
  cardDark:      'card-dark',

  // Badges
  badgeBlue:    'badge badge-blue',
  badgeNavy:    'badge badge-navy',
  badgeYellow:  'badge badge-yellow',
  badgeTeal:    'badge badge-teal',
  badgeCoral:   'badge badge-coral',
  badgeNeutral: 'badge badge-neutral',

  // Labels
  sectionLabel:     'section-label',
  sectionLabelDark: 'section-label-dark',

  // Typography
  heroXl:     'text-hero-xl',
  sectionXl:  'text-section-xl',
  cardLg:     'text-card-lg',

  // Backgrounds
  bgLight: 'bg-section-light',
  bgWhite: 'bg-section-white',
  bgNavy:  'bg-section-navy',

  // Animation
  fadeIn:       'animate-fade-in',
  fadeInDelay1: 'animate-fade-in-delay-1',
  fadeInDelay2: 'animate-fade-in-delay-2',
  fadeInDelay3: 'animate-fade-in-delay-3',
  waveFloat:    'wave-float',
} as const;

// ── Section Layout Helpers ────────────────────────────────────

export const sectionClasses = {
  // Standard section wrapper
  base:    'py-16 md:py-24',
  compact: 'py-12 md:py-16',
  spacious:'py-20 md:py-32',

  // Container
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  containerNarrow: 'max-w-4xl mx-auto px-4 sm:px-6',
} as const;
