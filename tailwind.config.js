/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': {
          DEFAULT: '#2D3A30',
          dark: '#1F2821',
          light: '#3D4A40',
        },
        'slate-pacific': {
          DEFAULT: '#4A5D66',
          dark: '#3A4D56',
          light: '#5A6D76',
        },
        'foggy': {
          DEFAULT: '#F2F4F3',
          dark: '#E2E4E3',
          light: '#FFFFFF',
        },
        'redwood': {
          DEFAULT: '#7A443A',
          dark: '#5A342A',
          light: '#9A544A',
        },
      },
      fontFamily: {
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [],
}
