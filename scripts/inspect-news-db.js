
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

async function inspectNews() {
    console.log("Fetching top 10 news from Supabase...");
    const { data, error } = await supabase
        .from('news')
        .select('id, title, publish_date, image_url')
        .order('publish_date', { ascending: false })
        .limit(10);

    if (error) {
        console.error("Error fetching news:", error);
        return;
    }

    console.log("Top 10 News in DB:");
    data.forEach(n => {
        console.log(`[${n.publish_date}] ID: ${n.id} - ${n.title.substring(0, 50)}... | Img: ${n.image_url ? 'Yes' : 'No'}`);
    });
}

inspectNews();
