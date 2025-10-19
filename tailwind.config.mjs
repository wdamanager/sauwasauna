/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // SAUWA Brand Colors (Brand Book Oficial)
        'sauwa-red': '#BA2515',        // Rojo oscuro primario
        'sauwa-orange': '#DB4529',     // Naranja/Rojo acento
        'sauwa-green': '#406E51',      // Verde bosque
        'sauwa-brown': '#897162',      // Marrón tierra
        'sauwa-gray': '#636464',       // Gris neutro
      },
      fontFamily: {
        // Tipografías SAUWA Brand
        'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'avenir': ['Avenir Next', 'Avenir', 'system-ui', 'sans-serif'],
        'sans': ['Avenir Next', 'system-ui', 'sans-serif'], // Default body
      },
    },
  },
  plugins: [],
};
