import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#f9f5f0',
          700: '#2d1e2f',
        },
        aura: {
          400: '#c197d2',
          500: '#6fb3b8',
        },
      },
      animation: {
        breathe: 'breathe 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%': { transform: 'scale(0.95)', opacity: 0.8 },
          '50%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.95)', opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};

export default config;
