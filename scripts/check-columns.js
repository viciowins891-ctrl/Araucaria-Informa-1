
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
const serviceRole = env['SUPABASE_SERVICE_ROLE_KEY'];

const supabase = createClient(url, serviceRole);

async function checkColumns() {
    // Tenta inserir um registro dummy com source_url
    const { data, error } = await supabase.from('news').select('source_url').limit(1);

    if (error) {
        console.log("❌ Coluna source_url NÃO existe ou erro:", error.message);
    } else {
        console.log("✅ Coluna source_url EXISTE!");
    }

    const { data: d2, error: e2 } = await supabase.from('news').select('content').limit(1);
    if (e2) console.log("❌ Coluna content erro:", e2.message);
    else console.log("✅ Coluna content existe.");
}

checkColumns();
