/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        secondary: "var(--secondary)",
        card: "var(--card)",
        border: "var(--border)",
        accent: {
          DEFAULT: "#2563EB",
          success: "#16A34A",
          warning: "#D97706",
          error: "#DC2626",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
      },
      borderRadius: {
        'input': '16px',
        'button': '18px',
        'card': '24px',
        'chat': '22px',
      },
    },
  },
  plugins: [],
}
