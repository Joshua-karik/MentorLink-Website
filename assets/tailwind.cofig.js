/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // This glob pattern will scan all HTML and JS files within your project and its subdirectories.
    // It's generally more robust than listing individual files like input.css for content scanning.
    "./**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        blob: "blob 7s infinite cubic-bezier(0.6, 0.05, 0.1, 0.9)",
      },
    },
  },
  plugins: [],
};