/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Poppins'", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          500: "#6366f1",
          400: "#818cf8",
          300: "#a5b4fc",
        },
        dark: {
          900: "#0F172A",
          800: "#111827",
          700: "#1F2937",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 50%), linear-gradient(90deg, rgba(56,189,248,0.08) 0%, transparent 50%)",
      },
      boxShadow: {
        "glow-lg": "0 0 60px rgba(99,102,241,0.35)",
        "glow-md": "0 0 35px rgba(56,189,248,0.25)",
      },
    },
  },
  plugins: [],
};
