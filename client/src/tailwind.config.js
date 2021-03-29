module.exports = {
  purge: {
      content:[
      './public/**/*.html',
      './src/pages/*.{js,jsx,ts,tsx,vue}',
      './src/components/**/*.{js,jsx,ts,tsx,vue}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['responsive', 'motion-safe', 'motion-reduce'],
      backgroundColor: ['active'],
      transform: ['hover', 'focus']
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
