/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#070709",
          900: "#0a0a0c",
          850: "#0f0f13",
          800: "#121216",
          700: "#1a1a22",
          600: "#242430",
        },
        pdr: {
          amber: "#f59e0b",
          orange: "#ea580c",
          gold: "#fbbf24",
          light: "#ffedd5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-syne)", "var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glow-amber": "0 0 25px -3px rgba(245, 158, 11, 0.4)",
        "glow-orange": "0 0 35px -5px rgba(234, 88, 12, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
