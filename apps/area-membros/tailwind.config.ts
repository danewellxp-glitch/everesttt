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
        "everest-black":    "#080B10",
        "everest-dark":     "#0E1117",
        "everest-card":     "#131823",
        "everest-gray":     "#1E2636",
        "everest-border":   "#263040",
        "everest-stone":    "#7A8899",
        "everest-snow":     "#EDF2F7",
        "everest-muted":    "#A0AFBF",
        "everest-red":      "#FF4D4F",
        "everest-red-dark": "#C82323",
        "everest-gold":     "#F5C842",
        "everest-gold-dim": "#D4A800",
        "everest-blue":     "#3B82F6",
        "everest-blue-dim": "#1D4ED8",
        "everest-teal":     "#14B8A6",
        "everest-purple":   "#A855F7",
      },
      fontFamily: {
        sans:    ["Inter", "sans-serif"],
        heading: ["Sora", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":         "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.15), transparent)",
      },
      boxShadow: {
        "card":       "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        "glow-blue":  "0 0 20px rgba(59,130,246,0.3)",
        "glow-gold":  "0 0 20px rgba(245,200,66,0.25)",
        "glow-red":   "0 0 20px rgba(255,77,79,0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "fade-in":    "fadeIn 0.4s ease-out",
        "slide-up":   "slideUp 0.4s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
