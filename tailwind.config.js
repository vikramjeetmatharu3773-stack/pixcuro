/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bbddfd',
          300: '#7ec4fb',
          400: '#39a6f6',
          500: '#118ce6',
          600: '#066fc4',
          700: '#07599e',
          800: '#0a4b81',
          900: '#0e3f6b',
          950: '#0a2845',
        },
        ink: {
          50: '#f7f8fa',
          100: '#eef0f3',
          200: '#dadfe6',
          300: '#b8c0cc',
          400: '#8c95a7',
          500: '#697386',
          600: '#525a6c',
          700: '#424857',
          800: '#383d49',
          900: '#252934',
          950: '#161922',
        },
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(15, 23, 42, 0.12)',
        ring: '0 0 0 1px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 240ms ease-out',
        'slide-up': 'slideUp 280ms cubic-bezier(0.22, 1, 0.36, 1)',
        'pulse-soft': 'pulseSoft 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
