/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*{js,jsx}",
  ],
  theme: {
    colors: {
      black: "hsl(0, 0%, 0%)",
      white: "hsl(0, 100%, 100%)",
      darkCyan: "hsl(180, 29%, 50%)",
      lightGrayishCyan: "hsl(180, 52%, 96%)",
      filterGrayishCyan: "hsl(180, 31%, 95%)",
      darkGrayishCyan: "hsl(180, 8%, 52%)",
      veryDarkGrayishCyan: "hsl(180, 14%, 20%)",
    },
    fontFamily: {
      mainFont: "League Spartan",
    },
    extend: {
      screens: {
        sm: "500px",
      },
    },
  },
  plugins: [],
};
