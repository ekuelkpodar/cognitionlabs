import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", ...fontFamily.sans]
      },
      colors: {
        brand: {
          50: "#f3f6ff",
          100: "#dce6ff",
          200: "#b4c8ff",
          300: "#8aa8ff",
          400: "#6289ff",
          500: "#4268e4",
          600: "#2f4dc0",
          700: "#233f96",
          800: "#1a2f6e",
          900: "#10204a"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
