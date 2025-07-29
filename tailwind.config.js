/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,css,html}"],
  theme: {
    extend: {
      colors: {
        celestepa: "#28ABE1",
        moradopa: "#652D92",
        grispa: "#948E90",
        celesteclaropa: "#8CCFEA",
        moradoclaropa: "#DBC4F8",
        blanco: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
