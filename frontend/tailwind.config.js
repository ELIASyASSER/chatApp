/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        sColor:"#08abec"
      },
      backgroundClip:{
        text:"text"
      },
      textStroke:{
        '0.5':'0.5px'
      },
      keyframes:{
        fill:{
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        }
      },
      animation:{
        fill:"fill 7s linear infinite"
      },
      transitionProperty:{
        "transition":"2s"
      }
    },
  },
  plugins: [
    function({addUtilities}) {
      addUtilities({
        '.text-stroke':{
          '-webkit-text-stroke':'0.5px #fff'
        },
        '.bg-clip-text':{
          '-webkit-background-clip':'text',
          'background-clip':'text'
        }
      })
    }
  ],
}