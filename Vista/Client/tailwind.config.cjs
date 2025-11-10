/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          900: "#312e81",
        },
        purple: {
          100: "#f3e8ff",
          200: "#e9d5ff",
        },
        blue: {
          100: "#dbeafe",
          200: "#bfdbfe",
        },
      },
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
