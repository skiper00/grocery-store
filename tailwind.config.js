
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#70c05b',
        'custom-black': '#414141',
        'main-color': '#fbf8ec'
      },
      boxShadow:{
      'border': '0 0 0 1px #70c05b',
      },
    },
    screens:{
      'sm' : {'max':'368px'},
      'md' :  {'min': '369px', 'max': '768px'},
      'lg' : '769px'
    }
  },
  plugins: [],
}

