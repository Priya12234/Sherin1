/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        italiana: ["Italiana", "serif"],
        italianno: ["Italianno", "cursive"],
        playfair: ['"Playfair Display"', "serif"],
        plusjakartasans: ["'Plus Jakarta Sans'", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
