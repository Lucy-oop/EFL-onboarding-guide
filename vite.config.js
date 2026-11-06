import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages serves the site at https://lucy-oop.github.io/EFL-onboarding-guide/
export default defineConfig({
  plugins: [react()],
  base: '/EFL-onboarding-guide/',
})
