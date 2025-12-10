
import { createClient } from '@supabase/supabase-js';

// Accessing variables injected by Vite define plugin
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL ou Key não encontradas. Certifique-se de configurar o .env');
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);
