module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210, 12%, 90%)",
        input: "hsl(210, 12%, 90%)",
        ring: "hsl(210, 70%, 56%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(210, 10%, 20%)",
        primary: {
          DEFAULT: "hsl(168, 45%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(168, 47%, 62%)",
          foreground: "hsl(168, 50%, 15%)",
        },
        tertiary: {
          DEFAULT: "hsl(10, 80%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        accent: {
          DEFAULT: "hsl(210, 70%, 56%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        neutral: {
          DEFAULT: "hsl(0, 0%, 98%)",
          foreground: "hsl(210, 10%, 20%)",
        },
        success: {
          DEFAULT: "hsl(142, 40%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(38, 85%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsl(210, 15%, 95%)",
          foreground: "hsl(210, 9%, 40%)",
        },
        destructive: {
          DEFAULT: "hsl(10, 80%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(210, 10%, 20%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(210, 10%, 20%)",
        },
        gray: {
          50: "hsl(210, 20%, 98%)",
          100: "hsl(210, 15%, 95%)",
          200: "hsl(210, 12%, 90%)",
          300: "hsl(210, 10%, 80%)",
          400: "hsl(210, 8%, 70%)",
          500: "hsl(210, 7%, 55%)",
          600: "hsl(210, 9%, 40%)",
          700: "hsl(210, 10%, 30%)",
          800: "hsl(210, 12%, 20%)",
          900: "hsl(210, 14%, 10%)",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(168, 47%, 62%), hsl(168, 45%, 45%))',
        'gradient-2': 'linear-gradient(135deg, hsl(10, 80%, 60%), hsl(210, 70%, 56%))',
        'button-border-gradient': 'linear-gradient(135deg, hsl(210, 70%, 56%), hsl(168, 47%, 62%))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
