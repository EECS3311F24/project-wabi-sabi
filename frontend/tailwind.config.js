/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'wabi-red': '#FF7D59',
        'wabi-btn-primary-unselected': '#E3644D',
        'wabi-btn-hover-primary-unselected': '#CC5A45',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
