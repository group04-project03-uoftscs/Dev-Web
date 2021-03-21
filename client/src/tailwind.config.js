module.exports = {
  purge: {
      content:[
      './public/**/*.html',
      './src/pages/*.{js,jsx,ts,tsx,vue}',
      './src/components/**/*.{js,jsx,ts,tsx,vue}',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
