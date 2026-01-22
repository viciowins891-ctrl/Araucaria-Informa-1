
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
            if (key) envVars[key.trim()] = value.trim();
        });
        return envVars;
    } catch (e) { return {}; }
}

const env = loadEnv();
const supabaseUrl = env.VITE_SupabaseUrl;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SupabaseKey;

console.log("URL:", supabaseUrl);
console.log("Key (starts with):", supabaseKey ? supabaseKey.substring(0, 5) : 'MISSING');

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkNews() {
    console.log("Checking latest news in Supabase...");
    const { data, error } = await supabase
        .from('news')
        .select('id, title, publish_date, created_at')
        .order('publish_date', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Supabase Error:", error);
    } else {
        console.log("Latest News in DB:");
        data.forEach(n => {
            console.log(`- [${n.id}] ${n.title} (Pub: ${n.publish_date}, Created: ${n.created_at})`);
        });
    }
}

checkNews();
