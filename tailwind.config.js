module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#554DB6',
        secondary: "#67E1E2",
        accent: '#FFE84E'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
