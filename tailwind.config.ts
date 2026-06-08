import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C1917',
          hover: '#292524',
        },
        secondary: {
          DEFAULT: '#44403C',
        },
        accent: {
          DEFAULT: '#CA8A04',
          hover: '#A16207',
          light: '#FDE68A',
        },
        surface: '#FFFFFF',
        background: '#FAFAF9',
        border: {
          DEFAULT: '#E7E5E4',
          hover: '#D6D3D1',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'DM Sans', 'sans-serif'],
        body: ['var(--font-body)', 'DM Sans', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(28, 25, 23, 0.05)',
        'sm': '0 1px 3px rgba(28, 25, 23, 0.1)',
        'md': '0 4px 6px rgba(28, 25, 23, 0.1)',
        'lg': '0 10px 15px rgba(28, 25, 23, 0.1)',
        'xl': '0 20px 25px rgba(28, 25, 23, 0.1)',
        'gold': '0 4px 14px rgba(202, 138, 4, 0.25)',
        'card': '0 4px 6px rgba(28, 25, 23, 0.1)',
        'card-hover': '0 10px 15px rgba(28, 25, 23, 0.15)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
