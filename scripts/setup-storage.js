
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
// MUST Use Service Role Key for Admin tasks like creating buckets
const supabase = createClient(env['VITE_SupabaseUrl'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function setupStorage() {
    console.log("📦 Verificando/Criando Bucket 'news-images' no Supabase...");

    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error("❌ Erro ao listar buckets:", error);
        return;
    }

    const bucketName = 'news-images';
    const exists = buckets.find(b => b.name === bucketName);

    if (exists) {
        console.log(`✅ Bucket '${bucketName}' já existe.`);
        // Ensure it's public
        const { error: updateError } = await supabase.storage.updateBucket(bucketName, {
            public: true
        });
        if (updateError) console.warn("⚠️ Aviso ao atualizar bucket para publico:", updateError.message);
        else console.log("🌍 Bucket configurado como PÚBLICO.");

    } else {
        console.log(`🔨 Criando bucket '${bucketName}'...`);
        const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 5242880, // 5MB limit
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
        });

        if (createError) {
            console.error("❌ Erro ao criar bucket:", createError.message);
        } else {
            console.log("✅ Bucket criado com sucesso!");
        }
    }
}

setupStorage();
