
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key) envVars[key.trim()] = value.trim();
        });
        return envVars;
    } catch (e) { return {}; }
}

const env = loadEnv();
const url = env['VITE_SupabaseUrl'];
const anonKey = env['VITE_SupabaseKey']; // USANDO A CHAVE PÚBLICA (ANON)

console.log("Teste de Acesso Frontend (Anon Key):");
console.log("URL:", url);
console.log("Key (First 10):", anonKey?.substring(0, 10) + "...");

const supabase = createClient(url, anonKey);

async function testFetch() {
    const { data, error } = await supabase.from('news').select('id, title').limit(5);

    if (error) {
        console.error("❌ ERRO DE PERMISSÃO/ACESSO:", error);
        console.log("DICA: Verifique se o RLS (Row Level Security) está ativo na tabela 'news' e se existe uma política 'Enable read access for all users'.");
    } else {
        console.log(`✅ Sucesso! Retornados ${data.length} itens.`);
        if (data.length === 0) {
            console.log("⚠️ Acesso permitido, mas tabela vazia ou RLS filtrando tudo.");
        } else {
            console.table(data);
        }
    }
}

testFetch();
