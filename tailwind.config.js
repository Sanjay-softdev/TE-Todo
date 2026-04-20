/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFDD00',
        tertiary: '#1A1A1A',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        muted: '#888888',
        error: '#E24B4A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs-label': ['9px', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.6px' }],
        'sm-body': ['13px', { lineHeight: '1.6' }],
        'base-ui': ['13px', { lineHeight: '1', fontWeight: '500' }],
        'heading': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'meta': ['10px', { lineHeight: '1' }],
      },
      borderRadius: {
        'button': '8px',
        'input': '6px',
        'chip': '4px',
        'tag': '3px',
        'logo': '8px',
      },
      spacing: {
        'screen': '16px',
        'field': '14px',
        'small': '6px',
      }
    },
  },
  plugins: [],
}
