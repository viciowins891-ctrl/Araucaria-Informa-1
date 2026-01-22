
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

async function fixFoodTrucks() {
    console.log("🔧 Fixing Food Trucks News...");

    // 1. Find the article
    const { data: news } = await supabase
        .from('news')
        .select('*')
        .ilike('title', '%Food Trucks%');

    if (!news || news.length === 0) {
        console.error("❌ Article not found!");
        return;
    }

    const article = news[0];
    console.log(`Found: [${article.id}] ${article.title}`);

    // 2. Prepare Updates
    const newTitle = "Festival de Food Trucks agita o Centro Cívico de Araucária"; // Removed "nesta sexta"
    const newSummary = "Evento na Praça Central reúne o melhor da culinária de rua e opções de lazer para toda a família. Confira as atrações e horários."; // Real summary

    // 3. Update
    const { error } = await supabase
        .from('news')
        .update({
            title: newTitle,
            summary: newSummary,
            // Keep date as is or update if needed. 
            // publish_date: '2026-01-20T12:00:00+00:00' 
        })
        .eq('id', article.id);

    if (error) console.error("❌ Error updating:", error);
    else console.log("✅ Article updated successfully!");
}

fixFoodTrucks();
