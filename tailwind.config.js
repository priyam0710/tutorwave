/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        /* ── CSS variable bridge (existing system) ── */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',

        /* ── TutorWave Brand Palette ── */
        /* Foundation — dominant interface colours */
        'tw-white':    '#FFFFFF',
        'tw-offwhite': '#F8FAFC',
        'tw-navy':     '#0D1118',   /* Deep Navy — primary text + dark sections */
        'tw-dark':     '#25262A',   /* Dark Grey — secondary dark text */

        /* Primary — Electric Blue (CTAs, links, highlights) */
        'tw-blue':     '#0A6FF7',
        'tw-blue-hover': '#0858C8',
        'tw-blue-light': '#EBF4FF',

        /* Secondary — Sky Blue (subtle accents only) */
        'tw-sky':      '#4BC2FD',

        /* Accent — use sparingly as brand highlights */
        'tw-yellow':   '#F8AD03',   /* Golden Yellow */
        'tw-teal':     '#0C8F81',   /* Teal */
        'tw-coral':    '#D6041A',   /* Coral */

        /* Neutrals */
        'tw-border':   '#E5E7EB',   /* Light Border */
        'tw-muted':    '#6B7280',   /* Muted Text */
        'tw-input-bg': '#F8FAFC',
      },

      fontFamily: {
        /* Primary — Manrope with Inter fallback */
        sans: ['var(--font-manrope)', 'Inter', 'system-ui', 'sans-serif'],
        /* No decorative/serif fonts in the design system */
      },

      fontSize: {
        /* Display scale */
        'display-2xl': ['clamp(2.75rem, 6vw, 5rem)',   { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-xl':  ['clamp(2.25rem, 5vw, 4rem)',   { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-lg':  ['clamp(1.875rem, 4vw, 3rem)',  { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        /* Heading scale */
        'heading-xl':  ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        'heading-lg':  ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading-md':  ['1.25rem',  { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm':  ['1.0625rem', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '600' }],
        /* Body scale */
        'body-lg':     ['1.0625rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-md':     ['0.9375rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm':     ['0.875rem',  { lineHeight: '1.6',  fontWeight: '400' }],
        /* UI scale */
        'label':       ['0.875rem',  { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'caption':     ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'overline':    ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em',  fontWeight: '700' }],
      },

      borderRadius: {
        DEFAULT: '0.875rem',
        'sm':   '0.5rem',
        'md':   '0.75rem',
        'lg':   '1rem',
        'xl':   '1.25rem',
        '2xl':  '1.5rem',    /* Cards */
        '3xl':  '2rem',      /* Hero visuals */
        '4xl':  '2.5rem',    /* Large hero cards */
        'pill': '9999px',    /* Badges, tags only */
      },

      spacing: {
        /* Section spacing */
        'section-sm': '4rem',
        'section-md': '6rem',
        'section-lg': '8rem',
        'section-xl': '10rem',
      },

      boxShadow: {
        /* TutorWave shadow system — subtle, not heavy */
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.06)',
        'card-md': '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)',
        'card-lg': '0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.08)',
        'blue-sm': '0 4px 12px rgba(10,111,247,0.18)',
        'blue-md': '0 8px 24px rgba(10,111,247,0.22)',
        'blue-lg': '0 12px 32px rgba(10,111,247,0.28)',
        'none':    'none',
      },

      backgroundImage: {
        'tw-gradient':       'linear-gradient(135deg, #0A6FF7 0%, #4BC2FD 100%)',
        'tw-gradient-dark':  'linear-gradient(135deg, #0D1118 0%, #25262A 100%)',
        'tw-gradient-subtle':'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        'tw-glow':           'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(10,111,247,0.08) 0%, transparent 70%)',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};