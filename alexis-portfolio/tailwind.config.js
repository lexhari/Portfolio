/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'norwige': ['Norwige', 'sans-serif'],
        'dm-sans': ['DM Sans Variable', 'sans-serif'],
        'bricolage-grotesque': ['Bricolage Grotesque Variable', 'sans-serif']
      },
      colors: {
        navy: "#004169",
        pink: "#FFA8C8",
        yellow: "#FFDF5D",
        creamBG: "#FAF9F6",
        offBlack: "#1f1f1f"
      },
      spacing: {
        'horizontal': '6.25rem'
      }
    },
  },
  plugins: [],
} 