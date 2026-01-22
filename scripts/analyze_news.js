
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

async function analyzeNews() {
    console.log("📊 Analyzing News Database...");

    // Fetch all news
    const { data: news, error } = await supabase
        .from('news')
        .select('id, title, publish_date, category')
        .order('publish_date', { ascending: false });

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log(`Total Articles: ${news.length}`);

    // Check for Duplicates by Title (fuzzy)
    const titleMap = {};
    const duplicates = [];
    const dateIssues = [];

    const today = new Date().toISOString().split('T')[0];

    news.forEach(n => {
        // Normalize title for key
        const key = n.title.toLowerCase().trim();

        if (titleMap[key]) {
            duplicates.push({ original: titleMap[key], duplicate: n });
        } else {
            titleMap[key] = n;
        }

        // Check for "Old news with current date" suspicion
        // (Just logging anything with today's date that looks generic)
        if (n.publish_date.startsWith(today) || n.publish_date.startsWith('2026-01-22')) {
            dateIssues.push(n);
        }
    });

    console.log("\n🚨 POTENTIAL DUPLICATES:");
    duplicates.forEach(d => {
        console.log(`   keep: [${d.original.id}] ${d.original.publish_date} - ${d.original.title}`);
        console.log(`   KILL: [${d.duplicate.id}] ${d.duplicate.publish_date} - ${d.duplicate.title}`);
        console.log('---');
    });

    console.log("\n📅 RECENTLY DATED (Next 24h/Today) - Verify if these are real current news:");
    dateIssues.forEach(n => {
        console.log(`   [${n.id}] ${n.publish_date} - ${n.title}`);
    });
}

analyzeNews();
