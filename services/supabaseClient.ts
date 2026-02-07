import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovbbumhwnlzadfjcbfer.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92YmJ1bWh3bmx6YWRmamNiZmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDgyNjQsImV4cCI6MjA4NDI4NDI2NH0.eayWOfvhczVgRZ2SKZcVTlMIU23otcCQ6cEWbSGBzGw';

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
