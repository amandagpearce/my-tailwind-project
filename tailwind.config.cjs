module.exports = {
  mode: 'jit', // Enable JIT mode
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
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
        header: '8rem', // Adjust the value as needed
      },
      colors: {
        white: '#FFF',
        purple: '#442A7E',
        hoverPurple: '#6746b2',
      },
      screens: {
        xs: '320px',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        display: ['Staatliches', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
      fontSize: {
        '8xl': '6.875rem',
      },
    },
  },
  corePlugins: {
    // Other core plugins...
    transitionProperty: false,
    transitionTimingFunction: false,
    transitionDuration: false,
    transitionDelay: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '@layer transitions': {
          '.modal-enter': {
            transform: 'translateY(-10rem)',
            opacity: '0',
          },
          '.modal-enter-active': {
            transform: 'translateY(0)',
            opacity: '1',
            transition: 'all 200ms',
          },
          '.modal-exit': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '.modal-exit-active': {
            transform: 'translateY(-10rem)',
            opacity: '0',
            transition: 'all 200ms',
          },
        },
      });
    },
  ],
};
