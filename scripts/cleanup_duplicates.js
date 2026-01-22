
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

async function deleteSpam() {
    console.log("🧹 Deleting spam duplicates...");

    const spamTitles = [
        'Feira de Adoção Pet acontece neste fim de semana no Parque Cachoeira',
        'Novas turbinas da REPAR aumentam eficiência energética em 15%',
        'Prefeitura inicia revitalização da Av. Archelau de Almeida Torres',
        'Araucária Vôlei vence mais uma e segue líder na Superliga',
        'Feira Gastronômica traz Food Trucks e música para o Centro', // Delete ALL (Static ID 9999 handles this)
        'Festival de Food Trucks agita o Centro Cívico nesta sexta', // Old bad title
        'Campanha de Vacinação contra a Gripe bate meta em Araucária',
        'Guarda Municipal recebe novas viaturas tecnológicas'
    ];

    let totalDeleted = 0;

    for (const title of spamTitles) {
        // Use ilike for safety against minor differences
        const { count, error } = await supabase
            .from('news')
            .delete({ count: 'exact' })
            .ilike('title', title);

        if (error) {
            console.error(`❌ Error deleting "${title}":`, error.message);
        } else {
            console.log(`✅ Deleted ${count} copies of: "${title}"`);
            totalDeleted += (count || 0);
        }
    }

    console.log(`\n🎉 Cleanup Complete! Deleted ${totalDeleted} spam records.`);
}

deleteSpam();
