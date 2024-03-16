/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'red-orange': '#d45113',
        'carrot-orange': '#f9a03f',
        'seal-brown': '#441c08',
        'prussian-blue': '#003049',
        'fire-engine-red': '#d62828',
        'orange-wheel': '#f77f00',
        'xanthous': '#fcbf49',
        'vanilla': 'rgb(234, 226, 183, 0.5)',
        'grey': '#efefef',
        'light-orange': '#ffa329',
      },
      gridTemplateColumns: {
        'media': 'repeat(auto-fit, minmax(15rem, 1fr))',
        'media-item': '3fr 2fr'
      }
    },
  },
  plugins: [],
}

