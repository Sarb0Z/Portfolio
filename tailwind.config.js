// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
    './data/**/*.{js,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
        fuggles: ['var(--font-fuggles)', 'cursive'],
      },
      colors: {
        primary: colors.blue,
        gray: colors.gray,
        purpleCustom: '#3940F5',
        cosmic: {
          900: '#0a0a1a',
          800: '#12122a',
          700: '#1a1a3a',
          600: '#22224a',
          500: '#2a2a5a',
        },
        nebula: {
          pink: '#ec4899',
          purple: '#8b5cf6',
          blue: '#3b82f6',
        },
        starlight: {
          DEFAULT: '#f8fafc',
          dim: '#94a3b8',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(139, 92, 246, 0.3)',
        'glow-md': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 30px rgba(139, 92, 246, 0.5)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.4)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-sky': '0 0 20px rgba(14, 165, 233, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '15%': { transform: 'rotate(14.0deg)' },
          '30%': { transform: 'rotate(-8.0deg)' },
          '40%': { transform: 'rotate(14.0deg)' },
          '50%': { transform: 'rotate(-4.0deg)' },
          '60%': { transform: 'rotate(10.0deg)' },
          '70%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        pathGlow: {
          '0%, 100%': { strokeOpacity: '0.4' },
          '50%': { strokeOpacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        wave: 'wave 1.5s infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'twinkle-delayed': 'twinkle 3s ease-in-out 1s infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'path-glow': 'pathGlow 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.purpleCustom'),
              fontWeight: '700',
              textUnderlineOffset: '4px',
              '&:hover': {
                textDecoration: 'underline',
                textUnderlineOffset: '5px',
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.wide'),
            },
            h2: {
              textDecoration: 'underline',
              textUnderlineOffset: '6px',
              textDecorationThickness: '1px',
            },
            p: {
              // lineHeight: '2.5rem',
              // fontWeight: '500',
            },
            'li, ul': {
              // fontWeight: '500',
              // lineHeight: '2.5rem',
            },
            h3: {
              fontWeight: '600',
            },
            strong: {
              fontWeight: '800',
            },
            code: {
              color: theme('colors.black'),
              fontWeight: '700',
              padding: '2px',
              borderRadius: '0.375rem',
              backgroundColor: theme('colors.gray.300'),
            },
          },
        },
        invert: {
          css: {
            a: {
              // color: theme('colors.primary.500'),
              color: theme('colors.blue.400'),
              '&:hover': {
                color: `${theme('colors.green.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
}
