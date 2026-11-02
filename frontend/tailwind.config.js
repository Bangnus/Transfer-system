/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const twColors = require("tailwindcss/colors");

// Colours come from the RUTS logo: navy #001C54 and gold #FDB813.
// Breakpoints are Tailwind's defaults (mobile-first: sm 640, md 768, lg 1024, xl 1280).
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Material Tailwind swaps in its own palette, so bring back the Tailwind scales we use
        slate: twColors.slate,
        emerald: twColors.emerald,
        red: twColors.red,
        navy: {
          50: '#eef2fa',
          100: '#d9e1f2',
          200: '#b3c3e5',
          300: '#8098cf',
          400: '#4d6bb4',
          500: '#2a4a96',
          600: '#173579',
          700: '#0d2763',
          800: '#071f5a',
          900: '#001c54', // logo navy
          950: '#00113a',
        },
        gold: {
          50: '#fff9e8',
          100: '#fef0c4',
          200: '#fee08a',
          300: '#fdcd4c',
          400: '#fdb813', // logo gold
          500: '#e09d00',
          600: '#b67a00',
          700: '#8c5c05',
          800: '#6e480b',
          900: '#5c3c0e',
        },
        // kept for older markup
        customYellow: '#FDB813',
        customBlue: '#001C54',
        customGray: '#F2F4F7',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
        display: ['"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 28, 84, 0.06), 0 1px 3px rgba(0, 28, 84, 0.04)',
        pop: '0 12px 32px -8px rgba(0, 28, 84, 0.22), 0 2px 6px rgba(0, 28, 84, 0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
});
