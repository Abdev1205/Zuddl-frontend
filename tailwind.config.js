/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7436d8",
        primaryLight: "#005580",
        secondary: "#F5F5F5",
        secondaryLight: "#D9400E",
        lightGrey: "#F5F5F5",
        black: "#333333",
        lightBlack: "#555555",
        green: "#108A00",
      },
      boxShadow: {
        sidebar: "0px 2px 10px rgba(0, 0, 0, 0.1);",
        dropdownPopup: "0px 4px 26px rgba(0, 0, 0, 0.125)",
        formCard:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      },
      fontFamily: {
        inter: ["inter"],
      },
      keyframes: {
        arrowDown: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
      },
      animation: {
        arrowDown: "arrowDown .2s ease-in-out forwards",
      },
      translate: {
        extra: '200%',
      },
      screens: {
        'sm_desktop': '1310px',
        'md_tablet': '1100px',
        'lg_tablet': '1160px',
        'xl_tablet': '1193px',
        'sm_tablet': '710px',
        'xl_phone': '855px',
        'lg_phone': '500px',
        'xsm_tablet': '534px',
        'md_phone': '410px',
      },
    },
  },
  plugins: [],
}
