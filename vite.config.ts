import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages: site is served from https://<user>.github.io/pixcuro/
  base: '/pixcuro/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'bg-removal': ['@imgly/background-removal'],
          'archive': ['jszip', 'file-saver'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
})
