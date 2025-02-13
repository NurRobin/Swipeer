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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'highlight-color': 'var(--highlight-color)',
        'shadow-color': 'var(--shadow-color)',
        'background-color': 'var(--background-color)',
        'text-color': 'var(--text-color)',
      },
    },
  },
  plugins: [],
};
export default config;
