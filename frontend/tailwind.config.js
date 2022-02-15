module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Oswald: "'Oswald', sans-serif;",
      },
    },
  },
  plugins: [require('@themesberg/flowbite/plugin')],
}
