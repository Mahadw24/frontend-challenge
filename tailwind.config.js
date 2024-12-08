module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this path matches your src folder structure
    './components/**/*.{js,ts,jsx,tsx}', // Include other folders if necessary
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#7E57C2',
          600: '#673AB7',
        },
      },
      fontFamily: {
        mono: ['Roboto Mono', 'monospace'], // Map Roboto Mono to font-mono
      },
    },
  },
  plugins: [],
};