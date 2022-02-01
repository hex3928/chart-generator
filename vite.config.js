import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    "apiUrl": JSON.stringify("https://api.covid19api.com")
  },
  base: "/chart-generator",
  build: { outDir: "docs" },
})
