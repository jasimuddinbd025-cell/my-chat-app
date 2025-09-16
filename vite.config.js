import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',   // ✅ SPA এর জন্য
  plugins: [react()]
})