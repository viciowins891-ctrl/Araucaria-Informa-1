
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
const supabase = createClient(env['VITE_SupabaseUrl'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function findWomenFootball() {
    console.log("🔍 Searching for Women's Football news...");

    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .or('title.ilike.%feminino%,title.ilike.%futebol%,title.ilike.%fenix%,content.ilike.%feminino%');

    if (error) {
        console.error("❌ Error searching:", error);
        return;
    }

    if (news && news.length > 0) {
        console.log(`✅ Found ${news.length} articles:`);
        news.forEach(n => {
            console.log(`- [${n.id}] ${n.title} (Date: ${n.publish_date})`);
        });
    } else {
        console.log("❌ No articles found matching criteria.");
    }
}

findWomenFootball();
