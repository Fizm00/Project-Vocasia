/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: '#193F3D',
        hoverGreen: '#145B54'
      }
    },
  },
  plugins: [],
}

