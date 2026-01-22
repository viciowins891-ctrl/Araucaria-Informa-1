
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

async function fixFoodTrucksV2() {
    console.log("🔧 Fixing Food Trucks News (V2 - Full Sync with Static Data)...");

    // 1. Find the article (search broadly to find the existing one)
    const { data: news } = await supabase
        .from('news')
        .select('*')
        .ilike('title', '%Food Trucks%');

    if (!news || news.length === 0) {
        console.error("❌ Article not found!");
        return;
    }

    // Sort to find the most relevant one (likely the one we just edited or the latest)
    // We assume there's one main "Food Trucks" article.
    const article = news[0];
    console.log(`Found: [${article.id}] ${article.title}`);

    // 2. Prepare Updates (Matching ID 9999 from data.ts)
    const newTitle = "Feira Gastronômica traz Food Trucks e música para o <strong>Centro</strong>";
    const newSummary = "Evento na Praça Central reúne o melhor da culinária de rua e opções de lazer para toda a família.";

    // Content from ID 9999
    const newContent = `
        <p>A Praça Central de Araucária se transformou no ponto de encontro oficial das famílias neste fim de semana. A Feira Gastronômica Noturna bateu recorde de público, reunindo mais de 20 opções de Food Trucks que oferecem uma verdadeira volta ao mundo gastronômica — do clássico hambúrguer artesanal ao pierogi polonês, patrimônio da nossa cidade.</p>

        <p>Além dos sabores, o evento se destaca pela segurança e organização. "É um ambiente pensado para que pais possam trazer seus filhos com tranquilidade, curtir boa música ao vivo e valorizar os artistas da terra", afirma a organização.</p>

        <p>A movimentação não se restringe apenas ao <strong>Centro</strong>. Bairros vizinhos como <strong>Fazenda Velha</strong>, <strong>Estação</strong> e <strong>Vila Nova</strong> sentem o reflexo positivo imediato. Moradores dessas regiões aproveitam a proximidade para frequentar a feira a pé, ocupando os espaços públicos e aquecendo o comércio local no trajeto, como padarias e pequenos mercados.</p>

        <p>Para quem vem de mais longe, como do <strong>Jardim Iguaçu</strong> ou <strong>Costeira</strong>, a feira se tornou o principal destino de lazer nas noites de sexta e sábado, integrando diferentes regiões da cidade em um único espaço de convivência.</p>
    `;

    // Image from ID 9999 (using specific cover instead of generic hero)
    const newImageUrl = "/images/food_trucks_cover_v29.png";
    const newMobileImageUrl = "/images/food_trucks_cover_v29_mobile.webp";

    // 3. Update
    const { error } = await supabase
        .from('news')
        .update({
            title: newTitle,
            summary: newSummary,
            content: newContent,
            image_url: newImageUrl,
            mobile_image_url: newMobileImageUrl,
            category: "Lazer"
            // maintain publish date
        })
        .eq('id', article.id);

    if (error) console.error("❌ Error updating:", error);
    else console.log("✅ Article updated successfully (Full Sync)!");
}

fixFoodTrucksV2();
