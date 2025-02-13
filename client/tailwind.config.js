/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {
      // backgroundImage: {
      //   'main-bg-texture': "url('/public/bg.png')"
      // },
      // fontFamily: {
      //   sans: ['var(--font-exo)'],
      // }
    },
  },
  plugins: [],
};
