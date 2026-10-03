/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          primary: '#2E5E3E',
          'primary-hover': '#244B32',
          'primary-light': '#EAF2EC',
          sand: '#FAF8F5',
          'sand-card': '#FFFFFF',
          'sand-muted': '#F4EFE6',
          'sand-border': '#E4DDD0',
          text: '#1C2B20',
          muted: '#526356',
          caution: '#D97706',
          'caution-light': '#FEF3C7',
          risk: '#DC2626',
          'risk-light': '#FEE2E2',
          safe: '#15803D',
          'safe-light': '#DCFCE7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Bengali', 'sans-serif'],
        bengali: ['Noto Sans Bengali', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
