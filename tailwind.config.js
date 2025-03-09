/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "elodoo-yellow": "#F8DE23",
        "elodoo-green": "#4ADE80", 
        "elodoo-blue": "#00cccc",
        'light-blue': '#E0F2FE',
      },
    },
  },
  plugins: [],
}