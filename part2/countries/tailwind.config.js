import plugin from 'tailwindcss/plugin';
/** @type {import('tailwindcss').Config} */

// npm install @tailwindcss/line-clamp  -------- and require('@tailwindcss/line-clamp') in the plugin section of the configuration to use line-clamp-1


export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {

      fontFamily:{
        poppins : '"Poppins", sans-serif',
        parkinsans : '"Parkinsans", sans-serif',
        quicksand : '"Quicksand", sans-serif',
        bangers : '"Bangers", system-ui',
        specialElite : '"Special Elite", system-ui',
        shadows : '"Shadows Into Light", cursive',
        Handlee : '"Handlee", cursive'
      },

      animation: {
        breath: 'breath 1.5s ease-in-out infinite',
        forward: 'forward 1s ease-in-out  infinite',
        backward: 'backward 1s ease-in-out  infinite',
        down: 'down 1s ease-in-out  infinite',
        up: 'up 1s ease-in-out  infinite'
      },

      keyframes:{
        breath:{
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)', // Slightly enlarge the element
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        forward: {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(25%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        backward: {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(-25%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        down: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(25%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        up: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-25%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        }
      }
    },
  },
  plugins: [
    plugin(function ({addComponents, theme}){
      addComponents({

        '.horizontal' : {
          display: 'flex',
          alignItems:'center',
          flexDirection : 'row'
        },

        '.vertical' : {
          display: 'flex',
          alignItems:'flex-start',
          flexDirection : 'column'
        },

        '.flex-center' : {
          display: 'flex',
          alignItems:'center',
          justifyContent: 'center'
        },

        '.grid-center' : {
          display: 'grid',
          placeItems:'center',
        },

        '.abs-center-x' :{
          left: '50%',
          '--tw-translate-x' : '-50%',
          transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))'
        },
        
        '.abs-center-y' :{
          top: '50%',
          '--tw-translate-y' : '-50%',
          transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))'
        },
        
        '.abs-center-xy' :{
          left: '50%',
          top: '50%',
          '--tw-translate-y' : '-50%',
          '--tw-translate-x' : '-50%',
          transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))'
        },

        '.stack' : {
          display: 'grid',
          '&>*':{
            gridArea : '1/1'
          }
        },

        '.w-unset' :{
          width : 'unset'
        },

        '.w-100dvw' :{
          width : '100dvw'
        },

        '.min-w-unset' :{
          minWidth : 'unset'
        },

        '.max-w-unset' :{
          maxWidth : 'unset'
        },

        '.h-unset' :{
          height : 'unset'
        },

        '.h-100dvh' :{
          height : '100dvh'
        },

        '.max-h-unset' :{
          maxHeight : 'unset'
        },

        '.min-h-unset' :{
          minHeight : 'unset'
        },
        
        '.all-unset' :{
          all : 'unset'
        },

        '.bg-unset' :{
          background : 'unset'
        },

        '.bg-c-unset' :{
          backgroundColor : 'unset'
        },

        '.no-select' : {
          '-webkit-touch-callout' : 'none',
          '-webkit-user-select'   : 'none',
          '-khtml-user-select'    : 'none',
          '-moz-user-select'      : 'none',
          '-ms-user-select'       : 'none',
          'user-select'           : 'none'
        },

        '.noselect' : {
          '-webkit-touch-callout' : 'none',
          '-webkit-user-select'   : 'none',
          '-khtml-user-select'    : 'none',
          '-moz-user-select'      : 'none',
          '-ms-user-select'       : 'none',
          'user-select'           : 'none'
        },
        '.no-scrollbar': {
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', /* IE and Edge */
        'scrollbar-width': 'none', /* Firefox */
      }
        
      })
    }),
    
  ],
}

