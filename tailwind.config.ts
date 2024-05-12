import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-whitney)"],
        mono: ["var(--font-ginto)"]
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
        placeholder: "#DBDBDB",
        systemRed: "#EB5757"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config