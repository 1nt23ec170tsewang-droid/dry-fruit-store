/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ladakh: {
          brown: '#8B4513',
          orange: '#d97706',
          beige: '#fef3c7',
          cream: '#fff7ed',
          deep: '#78350f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

