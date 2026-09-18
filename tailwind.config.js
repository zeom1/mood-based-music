/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          bg: '#F4EFE6',
          text: '#2C1E16',
          orange: '#D96C06',
          yellow: '#E6A817',
          teal: '#2F665C',
          brown: '#5E3A21',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(44, 30, 22, 1)',
        'brutal-lg': '8px 8px 0px 0px rgba(44, 30, 22, 1)',
      }
    },
  },
  plugins: [],
}
