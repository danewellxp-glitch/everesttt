import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "everest-black": "#0A0A0A",
        "everest-dark": "#111318",
        "everest-gray": "#1C2028",
        "everest-stone": "#8B949E",
        "everest-snow": "#E6EDF3",
        "everest-red": "#E03E3E",
        "everest-red-dark": "#B91C1C",
        "everest-gold": "#E3B341",
        "everest-blue": "#1F6FEB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
