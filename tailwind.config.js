/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cave: { 950: '#101515', 900: '#18201f', 800: '#252e2b' },
        rune: { mint: '#86f0be', gold: '#f5c65d', coral: '#ff806b', sky: '#7bd5e7' },
      },
      fontFamily: { pixel: ['"Press Start 2P"', 'monospace'], terminal: ['VT323', 'monospace'] },
      boxShadow: { pixel: '4px 4px 0 #090d0d' },
    },
  },
  plugins: [],
};