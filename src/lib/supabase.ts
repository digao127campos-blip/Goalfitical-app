import { createClient } from '@supabase/supabase-js';

// Verificar se as variáveis de ambiente estão configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cliente Supabase (null se não configurado)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Modo de autenticação
export const authMode = supabase ? 'supabase' : 'mock';

// Log de status
if (typeof window !== 'undefined' && !supabase) {
  console.warn('⚠️ Supabase não configurado. Configure as variáveis de ambiente.');
}
