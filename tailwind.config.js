
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
      'card': '1px 2px 4px 0px rgba(0, 0, 0, 0.1)',
      'hover-card': '4px 8px 16px 0px rgba(255, 102, 51, 0.2)'
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

