/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Geist", "serif"],
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "18px",
      md: "24px",
      lg: "45px",
      xl: "76.5px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006AFF",
          dark: "#0058D3",
        },
      },
    },
  },
  plugins: [],
};
