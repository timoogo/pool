import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@/css': path.resolve(__dirname, './assets/css'),
      '@/js':path.resolve(__dirname, './assets/js')
    },
  },
  server: {
    host: true
  }
})