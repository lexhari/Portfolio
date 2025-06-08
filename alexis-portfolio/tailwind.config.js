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
        navyBlue: "#004169",
        pinkCute: "#FFA8C8",
        yellowCute: "#FFDF5D",
        creamBG: "#FFFEF4",
        offBlack: "#1f1f1f"
      }
    },
  },
  plugins: [],
} 