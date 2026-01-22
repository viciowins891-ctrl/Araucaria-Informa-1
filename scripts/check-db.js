
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env');
        if (!fs.existsSync(envPath)) return {};
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
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = env['VITE_SupabaseUrl'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['VITE_SupabaseKey'];

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Credenciais ausentes.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listNews() {
    console.log("🔍 Verificando últimas notícias no banco de dados...");
    const { data, error } = await supabase
        .from('news')
        .select('id, title, created_at, category')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error("❌ Erro ao buscar:", error);
    } else {
        console.table(data.map(n => ({
            ID: n.id,
            Data: new Date(n.created_at).toLocaleString('pt-BR'),
            Titulo: n.title.substring(0, 50) + '...',
            Categoria: n.category
        })));

        console.log(`\nTotal encontrado: ${data.length}`);
    }
}

listNews();
