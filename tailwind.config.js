/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx,ts}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('tailwindcss-visuallyhidden')(),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
