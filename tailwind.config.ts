import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "bg-secondary": "hsl(var(--bg-secondary))",
        "bg-elevated": "hsl(var(--bg-elevated))",
        "bg-hover": "hsl(var(--bg-hover))",
        brand: {
          coral: "hsl(var(--brand-coral))",
          "coral-hover": "hsl(354 93% 65%)",
          maroon: "hsl(var(--brand-maroon))",
          "maroon-hover": "hsl(340 48% 42%)",
          purple: "hsl(var(--brand-purple))",
          sage: "hsl(var(--brand-sage))",
          "sage-hover": "hsl(100 36% 82%)",
          "blue-gray": "hsl(var(--brand-blue-gray))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "blob-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(50px, 100px) scale(1.1)" },
          "50%": { transform: "translate(100px, 50px) scale(0.95)" },
          "75%": { transform: "translate(30px, -50px) scale(1.05)" },
        },
        "blob-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(-80px, 60px) scale(1.15)" },
          "50%": { transform: "translate(-40px, -80px) scale(0.9)" },
          "75%": { transform: "translate(60px, 40px) scale(1.08)" },
        },
        "blob-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(70px, -60px) scale(0.92)" },
          "50%": { transform: "translate(-50px, 80px) scale(1.12)" },
          "75%": { transform: "translate(-80px, -30px) scale(1.02)" },
        },
        "blob-4": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "33%": { transform: "translate(-45%, -55%) scale(1.18)" },
          "66%": { transform: "translate(-55%, -45%) scale(0.88)" },
        },
        "blob-5": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "20%": { transform: "translate(-60px, -40px) scale(1.1)" },
          "40%": { transform: "translate(40px, -70px) scale(0.95)" },
          "60%": { transform: "translate(80px, 30px) scale(1.08)" },
          "80%": { transform: "translate(-30px, 60px) scale(0.92)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "blob-1": "blob-1 25s ease-in-out infinite",
        "blob-2": "blob-2 30s ease-in-out infinite",
        "blob-3": "blob-3 28s ease-in-out infinite",
        "blob-4": "blob-4 22s ease-in-out infinite",
        "blob-5": "blob-5 35s ease-in-out infinite",
      },
      boxShadow: {
        "coral-glow": "0 8px 24px hsl(354 93% 60% / 0.3)",
        "sage-glow": "0 12px 40px hsl(100 36% 76% / 0.15)",
        "purple-glow": "0 8px 32px hsl(320 36% 24% / 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
