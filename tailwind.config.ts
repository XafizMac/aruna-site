import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        wiggle: 'wiggle 100s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { 
            top: '50%',
            left: "50%",
            transform: "scale(1.4)",
          },
          '25%': {
            top: '30%',
            left: "40%",
            transform: "scale(1.6)",
          },
          '50%': { 
            top: '40%',
            left: "20%",
            transform: "scale(1)",
          },
          '75%': {
            top: '60%',
            left: "50%",
            transform: "scale(1.3)",
          },
          '100%': {
            top: '50%',
            left: "50%",
            transform: "scale(1.4)",
          },
        }
      }
    },
  },
  plugins: [],
};
export default config;
