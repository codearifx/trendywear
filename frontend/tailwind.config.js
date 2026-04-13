/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00f2fe',
        secondary: '#4facfe',
        accent: '#0fff50',
        dark: '#0f0f0f',
        card: '#18181b',
      }
    },
  },
  plugins: [],
}
