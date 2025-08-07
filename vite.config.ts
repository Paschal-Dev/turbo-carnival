// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Optional: Add this if you need global process.env access
  define: {
    'process.env': {}
  }
})