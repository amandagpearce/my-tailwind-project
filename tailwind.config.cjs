module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      colors: {
        white: '#FFF',
        purple: '#442A7E',
        lightPurple: '#820F90',
        hoverPurple: '#6746b2',
      },
    },
  },
  plugins: [],
};
