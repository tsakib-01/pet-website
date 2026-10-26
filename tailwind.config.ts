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
        brand: {
          espresso: "#583D32",     // Color 1: Rich Warm Dark / Main Text
          olive: "#C9C986",        // Color 2: Sage Pear / Verified Accents
          taupe: "#7F6F72",        // Color 3: Warm Slate / Supporting Neutral
          cream: "#E8D5C5",        // Color 4: Warm Almond Linen / Paper Base
          terracotta: "#D57746",   // Color 5: Rust Orange / Urgent Alerts & CTA
          
          paper: "#FAF4EE",        // Lightest paper tint
          creamDark: "#DDD0BF",    // Slightly darker paper crease
          espressoDark: "#3E2B23", // Deepest shadow tone
          oliveLight: "#E4E4BC",   // Light olive tint
          terracottaSoft: "#F3A982",// Soft terracotta
        },
      },
      boxShadow: {
        'paper-sm': '2.5px 2.5px 0px #583D32',
        'paper': '4.5px 4.5px 0px #583D32',
        'paper-lg': '7px 7px 0px #583D32',
        'paper-orange': '4px 4px 0px #D57746',
        'pill': '3.5px 3.5px 0px #583D32',
        'pill-hover': '5.5px 5.5px 0px #583D32',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'pill': '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
