import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Polyfill process.env to prevent "ReferenceError: process is not defined" in browser
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});