import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Leitor simples de .env
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                envVars[key.trim()] = value.trim();
            }
        });
        return envVars;
    } catch (e) {
        console.error("Erro ao ler .env", e);
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = env['VITE_SupabaseUrl'];
const supabaseKey = env['VITE_SupabaseKey'];

if (!supabaseUrl || !supabaseKey) {
    console.error("Erro: Credenciais do Supabase não encontradas no .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLatestNews() {
    console.log("Verificando últimas notícias no banco de dados...");

    // Select simples
    const { data: news, error } = await supabase
        .from('news')
        .select('id, title, publish_date, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Erro ao buscar notícias:", error);
        return;
    }

    if (news && news.length > 0) {
        console.log("\n--- Últimas Notícias Encontradas ---");
        news.forEach(n => {
            console.log(`[ID: ${n.id}] Data: ${n.publish_date} - ${n.title}`);
            console.log(`       (Registrado no sistema em: ${new Date(n.created_at).toLocaleString()})`);
        });

        const aiNews = news.filter(n => n.id >= 1000);
        if (aiNews.length > 0) {
            console.log(`\n✅ SUCESSO: Encontrei ${aiNews.length} notícias novas geradas pela IA!`);
        } else {
            console.log("\n⏳ AVISO: Ainda não vejo notícias novas (ID > 1000). Pode ser que o cache do browser do usuário ainda não tenha vencido os 7 dias ou algo impediu a execução.");
        }
    } else {
        console.log("Nenhuma notícia encontrada no banco de dados.");
    }
}

checkLatestNews();
