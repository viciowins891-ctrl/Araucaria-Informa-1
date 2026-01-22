
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

async function bumpWomenFootball() {
    console.log("⚽ Bumping Women's Football article...");

    // 1. Get current details to log
    const { data: news } = await supabase
        .from('news')
        .select('*')
        .eq('id', 249)
        .single();

    if (news) {
        console.log("Current State:");
        console.log(`- Title: ${news.title}`);
        console.log(`- Image: ${news.image_url}`);
        console.log(`- Mobile Image: ${news.mobile_image_url}`);
        console.log(`- Date: ${news.publish_date}`);

        // 2. Update Date to bring to top (Same level as Food Trucks)
        // Using 2026-01-22T15:00:00 to be just slightly newer/older than Food Trucks depending on exact time
        const newDate = '2026-01-22T15:00:00';

        const { error } = await supabase
            .from('news')
            .update({ publish_date: newDate })
            .eq('id', 249);

        if (error) console.error("❌ Error updating:", error);
        else console.log(`✅ Date updated to ${newDate}! It should now act as a secondary highlight.`);

    } else {
        console.error("❌ Article ID 249 not found!");
    }
}

bumpWomenFootball();
