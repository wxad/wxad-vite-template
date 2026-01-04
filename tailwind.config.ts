import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  corePlugins: {
    preflight: false,
  },
  plugins: [],
} satisfies Config

export default config
