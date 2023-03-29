/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '3.75': '0.9375rem',
        '7.5': '1.875rem',
      },
      colors: {
        'chrome': '#EEEEEE',
        'light-gray': '#CCCCCC',
        'gray': '#BBBBBB',
        'dark-gray': '#AAAAAA',
        'light-blue': '#41A0FF',
        'black': '#121212',
        'blue': '#0080FF',
        'dark-blue': '#005FBC',
      },
      fontSize: {
        '10px': ['10px', '12px'],
        '13px': ['13px', '15px'],
        '15px': ['15px', '18px'],
        '28px': ['28px', '33px'],
      },
      animation: {
        'todo-enter': 'fade-in 0.5s ease-in-out',
        'todo-leave': 'fade-in 0.5s ease-in-out reverse',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },
      },
    },
  },
  plugins: [],
}

