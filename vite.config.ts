import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@schemas': path.resolve(__dirname, './schemas'),
      '@img': path.resolve(__dirname, './src/img')
    }
  }
})
