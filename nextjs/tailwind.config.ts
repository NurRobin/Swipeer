import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        foreground: "var(--foreground-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        highlight: "var(--highlight-color)",
        shadow: "var(--shadow-color)",
        text: "var(--text-color)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'custom-light': '0 2px 5px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 2px 10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;