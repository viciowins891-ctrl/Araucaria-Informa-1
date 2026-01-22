
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

async function bumpDates() {
    console.log("📅 Adjusting dates to control sort order...");

    // 1. Top Tier (Hero + Top Grid): 2026-01-23
    // Lixo Zero (251), Plano Diretor (250), Saneamento (247)
    const tier1 = [251, 250, 247];
    const { error: err1 } = await supabase
        .from('news')
        .update({ publish_date: '2026-01-23T12:00:00' })
        .in('id', tier1);

    if (err1) console.error("Error Tier 1:", err1);
    else console.log("✅ Tier 1 (Hero group) bumped to 23rd.");

    // 2. Second Tier (Visible in Grid): 2026-01-22
    // Food Trucks (257)
    const { error: err2 } = await supabase
        .from('news')
        .update({ publish_date: '2026-01-22T12:00:00' })
        .ilike('title', '%Food Trucks%');

    if (err2) console.error("Error Tier 2:", err2);
    else console.log("✅ Tier 2 (Food Trucks) bumped to 22nd.");

    // 3. Third Tier (Below fold): 2026-01-21
    // Vacinação (258)
    // No action needed if it's already 21st.
}

bumpDates();
