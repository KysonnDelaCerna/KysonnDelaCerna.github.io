/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      scale: {
        "1000": "10",
        "750": "7.5",
        "500": "5",
        "300": "3"
      },
      transitionDuration: {
        "1500": "1500"
      }
    },
  },
  plugins: [],
}

