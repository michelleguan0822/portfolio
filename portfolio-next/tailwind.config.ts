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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          primary: "#7983D9",
          secondary: "#70C05B",
          accent: "#FAE69E",
          dark: "#1D1C5C",
          sky: "#A3D8F4",
          lavender: "#C3B1E1",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto-flex)"],
        jakarta: ["var(--font-plus-jakarta-sans)"],
        mono: ["var(--font-jetbrains-mono)"],
        caveat: ["var(--font-caveat)"],
        pixel: ["var(--font-press-start-2p)"],
      },
    },
  },
  plugins: [],
};
export default config;
