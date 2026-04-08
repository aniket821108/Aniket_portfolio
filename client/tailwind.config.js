/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#050810',
        'surface-1': '#0d1117',
        'surface-2': '#111827',
        accent: '#7c5af0',
        'accent-light': '#a78bfa',
        'cyan-accent': '#22d3ee',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#4b5563',
        border: 'rgba(255,255,255,0.06)',
        'border-light': 'rgba(255,255,255,0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,90,240,0.18) 0%, transparent 70%)',
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM40 0h1v40H0z' fill='rgba(255,255,255,0.015)'/%3E%3Cpath d='M0 0h40v1H0zM0 40h40v1H0z' fill='rgba(255,255,255,0.015)'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.4)',
        accent: '0 0 40px rgba(124,90,240,0.35)',
        'accent-sm': '0 0 20px rgba(124,90,240,0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
