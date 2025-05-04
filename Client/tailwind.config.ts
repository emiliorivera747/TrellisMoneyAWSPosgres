import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          "100": "#edf2ff",
          "200": "#dbe4ff",
          "300": "#bac8ff",
          "400": "#91a7ff",
          "500": "#748ffc",
          "600": "#5c7cfa",
          "700": "#4c6ef5",
          "800": "#4263eb",
          "900": "#3b5bdb",
          "1000": "#364fc7",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          "100": "#f4fce3",
          "200": "#e9fac8",
          "300": "#d8f5a2",
          "400": "#c0eb75",
          "500": "#a9e34b",
          "600": "#94d82d",
          "700": "#82c91e",
          "800": "#74b816",
          "900": "#66a80f",
          "1000": "#5c940d",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          "100": "#f8f9fa",
          "200": "#f1f3f5",
          "300": "#e9ecef",
          "400": "#dee2e6",
          "500": "#ced4da",
          "600": "#adb5bd",
          "700": "#868e96",
          "800": "#495057",
          "900": "#343a40",
          "1000": "#212529",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  types: ["node", "jest", "@testing-library/jest-dom"],

  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        ".no-scrollbar": {
          "scrollbar-width": "none", // For non-WebKit browsers
          "-ms-overflow-style": "none", // For IE and Edge
          "&::-webkit-scrollbar": {
            display: "none", // For WebKit browsers
          },
        },
      });
    },
  ],
};
export default config;
