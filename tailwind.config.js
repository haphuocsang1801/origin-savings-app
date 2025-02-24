/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        workSans: ['Work Sans', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        blueGray900: 'var(--blueGray900)',
        neutralWhite: 'var(--neutralWhite)',
        blueGray50: 'var(--blueGray50)',
        blueGray100: 'var(--blueGray100)',
        blueGray300: 'var(--blueGray300)',
        blueGray400: 'var(--blueGray400)',
        blueGray10: 'var(--blueGray10)',
        blueGray600: 'var(--blueGray600)',
        brandColorPrimary: 'var(--brandColorPrimary)',
        brandColorSecondary: 'var(--brandColorSecondary)',
        brandColorTertiary: 'var(--brandColorTertiary)'
      },
      boxShadow: {
        level4: 'var(--shadowLevel4)',
      }
    }
  },
  plugins: []
}
