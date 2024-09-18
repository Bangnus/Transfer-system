/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#FDB813', 
        customBlue: '#001C54',
        customGray: '#F2F4F7',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}

