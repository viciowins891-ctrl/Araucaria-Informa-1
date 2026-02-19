
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
            // Try .env.local as fallback
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

async function fixFoodTrucksFinal() {
    console.log("🔧 Fixing Food Trucks News (Final Fix - Prevents Revert)...");

    const targetTitle = "Feira Gastronômica traz Food Trucks e música para o <strong>Centro</strong>";
    const targetImage = "/images/food_trucks_cover_v29.png";
    const targetMobileImage = "/images/food_trucks_cover_v29_mobile.webp";
    const targetInternalImage = "/images/food_trucks_cover_v29.png"; // Using cover as internal for consistency

    // 1. Update Supabase (Source of Truth)
    console.log("   ☁️ Updating Supabase...");

    // 1. Update Supabase (Source of Truth)
    console.log("   ☁️ Updating Supabase...");

    // Search by ID first (more robust)
    const targetIdIdx = 1769002173;
    let { data: news } = await supabase
        .from('news')
        .select('*')
        .eq('id', targetIdIdx);

    if (!news || news.length === 0) {
        // Fallback to title search
        console.warn("   ⚠️ ID not found, trying title search...");
        const { data: newsTitle } = await supabase
            .from('news')
            .select('*')
            .ilike('title', '%Food Trucks%');
        news = newsTitle;
    }

    if (!news || news.length === 0) {
        console.error("❌ Article not found in DB!");
    } else {
        const article = news[0];
        console.log(`Found DB Article: [${article.id}] ${article.title}`);

        const { error } = await supabase
            .from('news')
            .update({
                title: targetTitle,
                image_url: targetImage,
                internal_image_url: targetInternalImage, // CRITICAL FIX
                category: "Lazer"
            })
            .eq('id', article.id);

        if (error) console.error("❌ Error updating DB:", error);
        else console.log("✅ DB Article updated successfully!");
    }

    // 2. Update Local File (Immediate Fix)
    console.log("   💾 Updating data.ts...");
    const dataPath = path.resolve(process.cwd(), 'data.ts'); // Correct path relative to CWD
    if (!fs.existsSync(dataPath)) {
        console.error(`❌ data.ts not found at ${dataPath}`);
        return;
    }
    let content = fs.readFileSync(dataPath, 'utf-8');

    // Regex to find the article block
    // We look for the ID or title.
    // Since title might have changed, let's look for ID 1769002173 or close match.
    // Or title content.

    // Strategy: Replace specific fields for this article ID block.
    // We know the ID is 1769002173 in the local file.
    const localId = 1769002173;

    const idRegex = new RegExp(`id:\\s*${localId},[\\s\\S]*?imageUrl:\\s*'([^']*)'[\\s\\S]*?internalImageUrl:\\s*'([^']*)'`, 'm');
    const match = content.match(new RegExp(`id:\\s*${localId},`));

    if (match) {
        const startIndex = match.index;
        const nextIdIndex = content.indexOf('id:', startIndex + 20);
        const endIndex = nextIdIndex !== -1 ? nextIdIndex : content.length;

        const chunk = content.substring(startIndex, endIndex);

        let newChunk = chunk;

        // Update Title (if needed, to ensure consistency)
        // Note: Title in file has <strong> tags, handle carefully.
        // It's easier to just replace the image lines.

        newChunk = newChunk.replace(/imageUrl:\s*'[^']*'/, `imageUrl: '${targetImage}'`);
        newChunk = newChunk.replace(/mobileImageUrl:\s*'[^']*'/, `mobileImageUrl: '${targetMobileImage}'`);
        newChunk = newChunk.replace(/internalImageUrl:\s*'[^']*'/, `internalImageUrl: '${targetInternalImage}'`);

        content = content.substring(0, startIndex) + newChunk + content.substring(endIndex);

        fs.writeFileSync(dataPath, content, 'utf-8');
        console.log("✅ data.ts updated successfully!");
    } else {
        console.error("❌ Article ID not found in data.ts!");
    }
}

fixFoodTrucksFinal();
