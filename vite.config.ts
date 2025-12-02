import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Cast process to any to avoid TS error if @types/node is missing or incomplete for cwd()
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // Polyfill process.env to work in the browser
    define: {
      // Explicitly inject the API_KEY from the build environment
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
      // Polyfill the rest of process.env to empty object to prevent crashes
      'process.env': {}
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});