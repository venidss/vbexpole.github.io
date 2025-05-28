/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray': {
          900: '#121212',
          1000: '#090909'
        }
      }
    },
  },
  plugins: [],
};
