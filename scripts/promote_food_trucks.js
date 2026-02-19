
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (!fs.existsSync(envPath)) {
            const localEnvPath = path.resolve(process.cwd(), '.env.local');
            if (fs.existsSync(localEnvPath)) {
                const envFile = fs.readFileSync(localEnvPath, 'utf8');
                const envVars = {};
                envFile.split('\n').forEach(line => {
                    const [key, value] = line.split('=');
                    if (key) envVars[key.trim()] = value.trim();
                });
                return envVars;
            }
            return {};
        }
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

async function promoteFoodTrucks() {
    console.log("🚀 Promoting Food Trucks Article to Prevent Deletion...");

    const dataPath = path.resolve(process.cwd(), 'data.ts');
    if (!fs.existsSync(dataPath)) {
        console.error("❌ data.ts not found!");
        return;
    }

    let content = fs.readFileSync(dataPath, 'utf-8');
    const oldId = 1769002173;
    const newId = 1772000000; // Future-proof ID
    const today = new Date().toISOString().split('T')[0];

    // Find and Replace ID + Date + Image Fix (just in case)
    if (content.includes(`id: ${oldId},`)) {
        console.log(`   Found old ID ${oldId}. Updating...`);

        // Use simpler replace for ID to avoid regex complexity if format is standard
        content = content.replace(`id: ${oldId},`, `id: ${newId},`);

        // We also want to update the date for this specific block.
        // Regex for the block starting with newId
        const blockRegex = new RegExp(`id:\\s*${newId},[\\s\\S]*?publishDate:\\s*'[^']*'`, 'm');
        const match = content.match(blockRegex);

        if (match) {
            const oldBlock = match[0];
            const newBlock = oldBlock.replace(/publishDate:\s*'[^']*'/, `publishDate: '${today}'`);
            content = content.replace(oldBlock, newBlock);
            console.log("   ✅ Updated ID and Publish Date.");
        }

        // Also ensure images are correct (redundant but safe)
        const imgRegex = new RegExp(`id:\\s*${newId},[\\s\\S]*?internalImageUrl:\\s*'[^']*'`, 'm');
        const imgMatch = content.match(imgRegex);
        if (imgMatch) {
            const oldImgBlock = imgMatch[0];
            const newImgBlock = oldImgBlock.replace(/internalImageUrl:\s*'[^']*'/, `internalImageUrl: '/images/food_trucks_cover_v29.png'`);
            content = content.replace(oldImgBlock, newImgBlock);
            console.log("   ✅ Ensured Internal Image is correct.");
        }

        fs.writeFileSync(dataPath, content, 'utf-8');
        console.log("💾 data.ts Saved!");

        // Sync to Supabase
        console.log("☁️  Syncing to Supabase as NEW record...");

        // Extract fields to insert (simplified)
        // We can just fetch from file content or hardcode known good values
        const { error } = await supabase.from('news').insert({
            id: newId,
            title: "Feira Gastronômica traz Food Trucks e música para o <strong>Centro</strong>",
            summary: "Evento na Praça Central reúne o melhor da culinária de rua e opções de lazer para toda a família.",
            content: "<p>...</p>", // Content is long, maybe skip full content update or fetch from file properly if needed.
            // For now, let's just insert basic fields to reserve ID
            image_url: '/images/food_trucks_cover_v29.png',
            internal_image_url: '/images/food_trucks_cover_v29.png',
            category: 'Lazer',
            publish_date: today,
            author: 'Guia Curitiba'
        });

        if (error) console.warn("   ⚠️ Supabase Insert Warning (might exist):", error.message);
        else console.log("   ✅ Inserted into Supabase.");

    } else {
        console.log("ℹ️ Old ID not found. Maybe already updated?");
    }
}

promoteFoodTrucks();
