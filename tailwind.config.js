/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Oswald'", "'Roboto Condensed'", "sans-serif"], // Marvel-like fonts
        marvel: ["'Marvel'", "sans-serif"],
      },
      colors: {
        marvel: {
          red: "#EC1D24",
          dark: "#202020",
          black: "#151515",
          gold: "#FFD700",
          blue: "#0078F2",
          silver: "#C0C0C0",
        },
        brand: {
          500: "#EC1D24", // Override brand with Marvel Red
          400: "#FF4D4D",
          300: "#FF8080",
        },
        dark: {
          900: "#050505",
          800: "#121212",
          700: "#1E1E1E",
        },
      },
      backgroundImage: {
        "comic-pattern":
          "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
        "hero-gradient": "linear-gradient(to right, #050505, #1a1a1a)",
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-red": "0 0 20px rgba(236, 29, 36, 0.5)",
        "glow-gold": "0 0 20px rgba(255, 215, 0, 0.5)",
        "glow-blue": "0 0 20px rgba(0, 120, 242, 0.5)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
