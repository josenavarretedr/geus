import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from 'tailwindcss'


export default defineConfig({
  plugins: [vue()],
  // configure Vite to recognize the "@" symbol as the "src" folder in your project, you can modify the "resolve.alias"
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // PostCss and Tailwind
  css: {
    postcss: {
      plugins: [
        tailwindcss(),]
    }
  }

})
