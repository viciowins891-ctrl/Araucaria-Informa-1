import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SupabaseUrl;
const supabaseKey = import.meta.env.VITE_SupabaseKey;

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = async (): Promise<SupabaseClient> => {
    if (supabaseInstance) return supabaseInstance;

    const { createClient } = await import('@supabase/supabase-js');
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
    return supabaseInstance;
};

// Mantemos a exportação antiga para compatibilidade, mas ela forçará o bundle se usada.
// O ideal é migrar para getSupabase() nos pontos críticos.
// Por enquanto, vamos remover o export default/const direto para forçar a refatoração onde importa.
// export const supabase = createClient(supabaseUrl, supabaseKey);
