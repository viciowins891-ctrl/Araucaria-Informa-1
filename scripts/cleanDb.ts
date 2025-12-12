
import { createClient } from '@supabase/supabase-js';
// import * as dotenv from 'dotenv';

// Tenta carregar variáveis de ambiente, mas vamos usar hardcoded se falhar pois estamos no ambiente local do usuário
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://hegadwldpjjzucdqcymi.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ2Fkd2xkcGpqenVjZHFjeW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODQ3MzYsImV4cCI6MjA4MDg2MDczNn0.VqT6IgJtoRxSUh8gB2Cf_ggvpQKDbRlh9nrIthMqQSI";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function cleanDatabase() {
    console.log('Iniciando limpeza do banco de dados...');


    const { error: errorNews } = await supabase
        .from('news_articles')
        .delete()
        .neq('id', 0);

    if (errorNews) console.error('Erro ao limpar notícias:', errorNews);
    else console.log('Notícias limpas.');

    const { error: errorEvents } = await supabase
        .from('events')
        .delete()
        .neq('id', 0);

    if (errorEvents) console.error('Erro ao limpar eventos:', errorEvents);
    else console.log('Eventos limpos.');

    console.log('Banco de dados resetado. O app passará a usar os dados locais (data.ts) atualizados.');
}

cleanDatabase();
