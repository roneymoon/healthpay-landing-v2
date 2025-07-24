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
        'bricolage': ['var(--font-bricolage)', '"Bricolage Grotesque"', 'sans-serif'],
        'grotesque': ['var(--font-bricolage)', '"Bricolage Grotesque"', 'sans-serif'],
        'sans': ['var(--font-bricolage)', '"Bricolage Grotesque"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        'nav': '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        'primary': '#FF6B35',
        'primary-dark': '#FF8A3D',
        'dark': '#111111',
        'light-grey': '#F5F5F5',
      },
      borderRadius: {
        '4xl': '32px',
      },
      backgroundImage: {
        'gradient-orangish': "linear-gradient(to bottom, rgba(255,106,0,0.05), rgba(0,0,0,0.95))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config