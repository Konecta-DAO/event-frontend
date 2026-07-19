/** @type {import('tailwindcss').Config} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
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