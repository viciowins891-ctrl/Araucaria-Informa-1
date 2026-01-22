
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

async function findSaneamento() {
    const { data, error } = await supabase
        .from('news')
        .select('id, title, publish_date, image_url')
        .ilike('title', '%Saneamento%');

    if (error) console.error(error);
    else console.log("Saneamento News:", data);

    const { data: d2 } = await supabase
        .from('news')
        .select('id, title, publish_date')
        .ilike('title', '%Lixo%');
    console.log("Lixo News:", d2);
}

findSaneamento();
