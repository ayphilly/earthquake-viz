/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dark: "#080A12",
        main: {
          bg: "#F9FAFB",
          100: "#E5EFFF",
          200: "#B7D3FF",
          300: "#8AB7FF",
          400: "#5C9BFF",
          500: "#2E7FFF",
          600: "#0061F9",
          700: "#0051D0",
          800: "#0041A7",
          900: "#00317F",
          901: "#002156",
          902: "#001433",
          903: "#030407",
        },
        sec: {
          100: "#F8F9FF",
          200: "#E4E9FF",
          300: "#D0D9FF",
          400: "#BBC8FF",
          500: "#A1AEE9",
          600: "#8391CC",
          700: "#6876AE",
          800: "#505D91",
          900: "#3B4674",
          901: "#283157",
          902: "#181E34",
        },
      }
    },
  },
  plugins: [],
}