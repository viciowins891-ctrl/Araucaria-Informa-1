
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

async function cleanup() {
    console.log("🧹 Cleaning up duplicate/bad Food Trucks articles...");

    // 1. Delete matching OLD title
    const { count, error } = await supabase
        .from('news')
        .delete({ count: 'exact' })
        .ilike('title', '%Festival de Food Trucks%');

    if (error) console.error("Error deleting:", error);
    else console.log(`Deleted ${count} bad articles.`);

    // 2. Ensure the GOOD one exists (ID 257 should have "Feira Gastronômica" by now)
    // If ID 257 had "Festival..." title, it was just deleted?
    // Wait. My v3 script Updated ID 257 to "Feira...".
    // So ID 257 does NOT match "Festival...".
    // So ID 257 is safe.

    // Check what remains
    const { data: remaining } = await supabase
        .from('news')
        .select('*')
        .ilike('title', '%Food Trucks%');

    console.log("Remaining Food Trucks articles:", remaining?.map(n => `[${n.id}] ${n.title}`));
}

cleanup();
