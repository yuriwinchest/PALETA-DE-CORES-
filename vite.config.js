import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    // Fix: cast process to any to avoid type error with cwd()
    // Load env file based on `mode` in the current working directory.
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        define: {
            // Injects the environment variables into the client-side code at build time
            'process.env.API_KEY': JSON.stringify(env.API_KEY),
            'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
            'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
        }
    };
});
