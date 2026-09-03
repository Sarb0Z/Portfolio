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
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
      },
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
        primary: colors.orange,
        gray: colors.zinc,
      },
      maxWidth: {
        site: '72rem',
        prose: '42rem',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '42rem',
            color: 'rgb(var(--ink) / 0.86)',
            'h1,h2,h3,h4': { color: 'rgb(var(--ink))' },
            strong: { color: 'rgb(var(--ink))' },
            hr: { borderColor: 'rgb(var(--line) / 0.15)' },
            'thead th': { color: 'rgb(var(--ink))' },
            'tbody tr': { borderBottomColor: 'rgb(var(--line) / 0.15)' },
          },
        },
        invert: {
          css: {
            color: 'rgb(var(--ink) / 0.86)',
            'h1,h2,h3,h4': { color: 'rgb(var(--ink))' },
            strong: { color: 'rgb(var(--ink))' },
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
