import type { Config } from "tailwindcss"

const spacing = {}
for (let index = 0; index <= 500; index += 1) {
  spacing[index] = `${index}${index === 0 ? "" : "px"}`
}

const colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000",
  white: "#fff",
  green: "#07c160",
  orange: "#eda20c",
  blue: "#296bef",
  red: "#d9514c",
  gray: {
    0: "#ffffff",
    50: "rgba(33, 34, 38, 0.03)",
    100: "rgba(33, 34, 38, 0.05)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(32, 33, 38, 0.1)",
    400: "rgba(32, 33, 38, 0.12)",
    500: "rgba(32, 33, 38, 0.16)",
    600: "rgba(32, 33, 38, 0.22)",
    700: "rgba(32, 33, 38, 0.36)",
    800: "rgba(32, 33, 38, 0.58)",
    850: "rgba(32, 33, 38, 0.72)",
    900: "rgba(32, 33, 38, 0.88)",
    950: "rgba(32, 33, 38, 0.98)",
  },
  primary: {
    1: "#eff4ff",
    2: "#d1e0ff",
    3: "#b4cdff",
    4: "#96b9ff",
    5: "#78a5ff",
    6: "#5b92ff",
    7: "#296bef",
    8: "#2966df",
    9: "#144dbe",
    10: "#00359e",
  }
}

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    extend: {
      spacing,
    },
    colors,
    borderRadius: {
      none: "0px",
      2: "2px",
      4: "4px",
      6: "6px",
      8: "8px",
      10: "10px",
      12: "12px",
      16: "16px",
      20: "20px",
      24: "24px",
      52: "52px",
      full: "9999px",
    },
    fontFamily: {},
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    keyframes: {},
    letterSpacing: {
      0: "0",
      0.5: "0.5px",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
    },
    lineHeight: {
      none: "1",
      12: "12px",
      14: "14px",
      16: "16px",
      17: "17px",
      18: "18px",
      20: "20px",
      24: "24px",
      25: "25px",
      28: "28px",
      32: "32px",
      36: "36px",
      40: "40px",
      42: "42px",
      48: "48px",
      52: "52px",
      64: "64px",
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
} satisfies Config

export default config
