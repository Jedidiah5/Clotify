/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E6D5F7',
          DEFAULT: '#9747FF',
          dark: '#7535CC',
        },
        secondary: {
          light: '#F8F8F8',
          DEFAULT: '#333333',
          dark: '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
} 