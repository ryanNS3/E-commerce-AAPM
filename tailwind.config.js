/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    extend: {
      boxShadow: {
        'card-e-nexus': '0px 4px 24px #E9E9E9',
        'menu-mobile': '0px 8px #000, 0px -8px #000',
        'menu-mobile-active': '0px 0px #000, 0px 0px #000',
      },
      animation: {
        modalAnimation: 'rightToLeft 0.3s ease-in-out forwards',
        topToButton: 'topToButton 0.3s ease-in-out forwards',
        ButtonToTop: 'buttonToTop 0.3s ease-in-out forwards',
        menuMobileActive: 'minWidthToMaxWidth 0.8s ease-in-out forwads',
      },

      transitionDuration: {
        600: '600ms',
        800: '800ms',
      },

      keyframes: {
        rightToLeft: {
          '100%': {
            transform: 'translateX(10px)',
            opacity: 1,
          },
        },
        minWidthToMaxWidth: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
        topToButton: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        buttonToTop: {
          '0%': {
            transform: 'translateY(1000px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
      },
      spacing: {
        1: '0.25rem',
        2: '0.50rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.50rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.50rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        66: '16.5rem',
        72: '18rem',
        78: '19.5rem',
        84: '21rem',
        90: '22.5rem',
        96: '24rem',
      },
    },

    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },

    // Ajustar o fontsize de acordo com o projeto no figma
    fontSize: {
      h1: [
        '5rem',
        {
          lineHeight: '5.25rem',
          letterSpacing: '0',
          fontWeight: '800',
        },
      ],
      h2: [
        '4.5rem',
        {
          lineHeight: '5.8rem',
          letterSpacing: '0',
          fontWeight: '600',
        },
      ],
      h3: [
        '3.5rem',
        {
          lineHeight: '4.1rem',
          letterSpacing: '1%',
          fontWeight: '600',
        },
      ],
      h4: [
        '2.5rem',
        {
          lineHeight: '3rem',
          letterSpacing: '-1%',
          fontWeight: '600',
          case: 'upper',
        },
      ],
      h5: [
        '2rem',
        {
          lineHeight: '2.3rem',
          letterSpacing: '2%',
          fontWeight: '600',
        },
      ],
      sub1: [
        '1.5rem',
        {
          lineHeight: '1.9rem',
          letterSpacing: '2%',
          fontWeight: '600',
          case: 'upper',
        },
      ],
      sub2: [
        '1.25rem',
        {
          lineHeight: '1.7rem',
          letterSpacing: '2%',
          fontWeight: '500',
        },
      ],
      fun1: [
        '1.25rem',
        {
          lineHeight: '1.7rem',
          letterSpacing: '2%',
          fontWeight: '700',
          case: 'upper',
        },
      ],
      fun2: [
        '0.938rem',
        {
          lineHeight: '1.3rem',
          letterSpacing: '2%',
          fontWeight: '600',
          case: 'upper',
        },
      ],
      ct1: [
        '1.375rem',
        {
          lineHeight: '1.8rem',
          letterSpacing: '1%',
          fontWeight: '400',
        },
      ],
      ct2: [
        '0.938rem',
        {
          lineHeight: '1.3rem',
          letterSpacing: '1%',
          fontWeight: '400',
        },
      ],
      ct3: [
        '0.75rem',
        {
          lineHeight: '1rem',
          letterSpacing: '1%',
          fontWeight: '400',
        },
      ],
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      branco: '#FFFFFF',
      preto: '#000',
      vermelho: {
        300: '#D93131',
      },
      rosa: {
        50: '#f5d0ff',
        100: '#eba5ff',
        200: '#de7ff9',
        300: '#b13fd1',
        400: '#9f2dbf',
        500: '#8b1faa',
        600: '#741190',
        700: '#62097b',
        800: '#4c0461',
        850: '#320240',
        900: '#1c0123',
        destaque: '#cb6ce6',
      },
      cinza: {
        50: '#F9F9F9',
        100: '#E6E6E6',
        200: '#CCCCCC',
        300: '#999999',
        400: '#666666',
        500: '#4D4D4D',
        700: '#333333',
        800: '#1A1A1A',
        950: '#0A0A0A',
      },
      roxo: {
        50: '#F5ECFF',
        100: '#EBD8FF',
        200: '#D6B4F8',
        400: '#A979DA',
        500: '#905EC2',
        600: '#7251B3',
        700: '#5E38A7',
        750: '#4C2499',
        800: '#2E0879',
        850: '#190245',
        900: '#120132',
        1000: '#080018',
      },
      backgroundImage: {
        'gradiente-enfase': 'linear-gradient(to right, #BD3FD1, #9332AE)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const noScrollBar = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },

        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      }

      addUtilities(noScrollBar)
    },

    function ({ addUtilities }) {
      const newUtilities = {
        '.menu-mobile-active': {
          '@apply relative w-6 h-6': {},
        },
        '.menu-mobile-active::before, .menu-mobile-active::after': {
          '@apply absolute w-6 h-1 bg-preto rounded transition-transform duration-200 ease-in-out':
            {},
          content: '""',
        },
        '.menu-mobile-active::before': {
          '@apply top-1/2 left-1/2': {},
          transform: 'translate(-50%, -50%) rotate(-50deg)',
        },
        '.menu-mobile-active::after': {
          '@apply top-1/2 left-1/2': {},
          transform: 'translate(50%, 50%) rotate(50deg)',
        },
        '.menu-mobile-active.active::before': {
          transform: 'translate(-50%, -50%) rotate(-50deg)',
        },
        '.menu-mobile-active.active::after': {
          transform: 'translate(50%, 50%) rotate(-45deg)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
