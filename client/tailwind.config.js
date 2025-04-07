/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'train-movement': 'trainMovement 20s linear infinite',
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
        'steam-rise': 'steamRise 3s ease-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        trainMovement: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        steamRise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 0.7 },
          '100%': { transform: 'translateY(-100px) scale(2)', opacity: 0 },
        },
        twinkle: {
          '0%': { opacity: 0.2 },
          '100%': { opacity: 0.8 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
