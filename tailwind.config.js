const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./client/*.{html,js}", "./client/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        lg: "0 0px 20px -10px rgba(0, 0, 0, 0.02), 0 4px 7px -4px rgba(0,0,0,0.2)",
      },
      colors: {
        transparent: "transparent",
        "light-grey": "#FAFAFA",
      },
      fontFamily: {
        sans: ["freight-neo-pro", ...defaultTheme.fontFamily.sans],
        serif: ["freight-neo-pro", ...defaultTheme.fontFamily.serif],
      },
    },
    container: {
      center: true,
    },
  },
};
