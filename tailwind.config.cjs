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
        hoverPurple: '#6746b2',
        cyan: '#00c9cf',
        lightCyan: '#28eaef',
        darkCyan: '#006671',
      },
      screens: {
        xs: '320px',
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
