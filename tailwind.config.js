/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0f2744', 2: '#1a3a5c' },
        akh: {
          teal: '#1d9e75',
          blue: '#378add',
          amber: '#ef9f27',
          red: '#e24b4a',
          purple: '#534ab7',
          coral: '#d85a30',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
