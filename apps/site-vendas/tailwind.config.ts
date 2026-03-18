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
        /* Fundos claro */
        "ev-cream":    "#FFFCEE",
        "ev-beige":    "#EDE3D8",
        "ev-beige-md": "#D7C7AB",
        /* Fundo escuro */
        "ev-dark":     "#0E0E0E",
        "ev-dark-2":   "#1A1A1A",
        /* Texto */
        "ev-ink":      "#101010",
        "ev-ink-2":    "#555555",
        "ev-cream-txt":"#FFFCEE",
        /* CTA */
        "ev-red":      "#F92726",
        "ev-red-dk":   "#A61919",
        "ev-red-wine": "#A61919",
        /* Mantém retrocompatibilidade área de membros */
        "everest-black": "#0E0E0E",
        "everest-dark":  "#1A1A1A",
        "everest-gray":  "#2A2A2A",
        "everest-stone": "#8B949E",
        "everest-snow":  "#FFFCEE",
        "everest-red":   "#F92726",
        "everest-red-dark": "#A61919",
        "everest-gold":  "#D7C7AB",
        "everest-blue":  "#1F6FEB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at center, #0d1b2e 0%, #0A0A0A 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
