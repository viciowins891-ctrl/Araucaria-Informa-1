
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

async function bumpNews() {
    // Future date to force top: 2026-01-22
    const yesterday = '2026-01-22T12:00:00+00:00';

    console.log(`Bumping news dates to yesterday: ${yesterday}`);

    // 1. Saneamento (247) & Lixo Zero (251)
    const { error: e1 } = await supabase
        .from('news')
        .update({ publish_date: yesterday })
        .in('id', [247, 251]);

    if (e1) console.error("Error updating 247/251:", e1);
    else console.log("✅ Bumped Saneamento (247) and Lixo Zero (251)");

    // 2. Find and bump 'Plano Diretor'
    const { data: pdNews, error: pdError } = await supabase
        .from('news')
        .select('id, title')
        .ilike('title', '%Plano Diretor%');

    if (pdError || !pdNews || pdNews.length === 0) {
        console.error("❌ 'Plano Diretor' news not found for bumping.");
    } else {
        const pdIds = pdNews.map(n => n.id);
        const { error: bumpError } = await supabase
            .from('news')
            .update({ publish_date: yesterday })
            .in('id', pdIds);

        if (bumpError) console.error("Error bumping Plano Diretor:", bumpError);
        else console.log(`✅ Bumped Plano Diretor (IDs: ${pdIds.join(', ')})`);
    }
}

bumpNews();
