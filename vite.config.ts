import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      // To avoid cors issue
      '^/server/.*': {
        target: 'http://34.132.31.226:8090/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/*.*\/server/, ''),
      }
    }
  },
  envDir: './environments'
})
