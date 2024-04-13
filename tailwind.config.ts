import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-whitney)"],
        ginto: ["var(--font-ginto)"]
      },
      colors: {
        brand: "#FEE57E",
        snowGrey: "#F8F8F8",
        success: "#86D190",
        bodyText: "#6A536B",
        headlineText: "#4B2E4C",
        actionLink: "#5C5CF2",
        subtext: "#856E83",
        displayText: "#0E0E25",
        borderBg: "#E0E0E0",
        checkboxUnselected: "#DFD1FA",
        checkboxSelected: "#884EF9",
        disabledText: "#BDBDBD",
        focused: "#92D5F2",
        placeholder: "#DBDBDB"
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-radix")()
  ],
};
export default config;
