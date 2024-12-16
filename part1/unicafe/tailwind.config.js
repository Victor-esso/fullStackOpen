/** @type {import('tailwindcss').Config} */

// npm install @tailwindcss/line-clamp  -------- and require('@tailwindcss/line-clamp') in the plugin section of the configuration to use line-clamp-1

const plugin = require('tailwindcss/plugin')

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
        bangers : '"Bangers", system-ui'
      },

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

        '.min-w-unset' :{
          minWidth : 'unset'
        },

        '.max-w-unset' :{
          maxWidth : 'unset'
        },

        '.h-unset' :{
          height : 'unset'
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
        }
        
      })
    }),
    
  ],
}

