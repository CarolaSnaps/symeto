import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseClient(): SupabaseClient {
  const url: string | undefined = import.meta.env.VITE_SUPABASE_URL;
  const anonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing Supabase env: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  }

  return createClient(url, anonKey);
}


