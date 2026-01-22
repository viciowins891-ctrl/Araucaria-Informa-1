
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SupabaseUrl;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SupabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

async function countTodayNews() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const { data, count, error } = await supabase
        .from('news')
        .select('*', { count: 'exact' })
        .gte('created_at', todayISO);

    if (error) {
        console.error("Error:", error);
    } else {
        console.log(`Notícias criadas hoje (${todayISO}): ${count}`);
        console.log("Títulos encontrados:");
        data.forEach(n => console.log(`- [${n.id}] ${n.title}`));
    }
}

countTodayNews();
