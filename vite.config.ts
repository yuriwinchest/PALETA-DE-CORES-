import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: cast process to any to avoid type error with cwd()
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Injects the API_KEY from Vercel environment variables into the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});