/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
        'lexend-exa': ['Lexend Exa', 'sans-serif'],
        'lexend-mega': ['Lexend Mega', 'sans-serif'],
      },
  },
  plugins: [],
}
}