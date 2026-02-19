
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');

// Ensure the script runs only if dist/index.html exists
if (!fs.existsSync(indexPath)) {
    console.error('Error: dist/index.html not found. Run this script after "vite build".');
    process.exit(1);
}

// Function to safely create dir
function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Read the BUILT html (minified)
let html = fs.readFileSync(indexPath, 'utf8');

// --- Helper to replace meta tags (handling minified content) ---
function replaceMeta(content, key, value, newValue) {
    // Try property="key" content="..."
    let regex = new RegExp(`(<meta[^>]*${key}="${value}"[^>]*content=")([^"]*)(")`, 'i');
    if (regex.test(content)) {
        return content.replace(regex, `$1${newValue}$3`);
    }

    // Try content="..." property="key"
    regex = new RegExp(`(<meta[^>]*content=")([^"]*)("[^>]*${key}="${value}")`, 'i');
    if (regex.test(content)) {
        return content.replace(regex, `$1${newValue}$3`);
    }

    // Try name="key" content="..."
    regex = new RegExp(`(<meta[^>]*name="${value}"[^>]*content=")([^"]*)(")`, 'i');
    if (regex.test(content)) {
        return content.replace(regex, `$1${newValue}$3`);
    }

    return content;
}

function replaceTitle(content, newTitle) {
    return content.replace(/<title>.*?<\/title>/i, `<title>${newTitle}</title>`);
}

// --- Generate VAGAS ---
console.log('Generating Vagas static route...');
// No subdirectories needed for cleanUrls with direct file mapping in vercel.json if preferred
// But cleanUrls usually maps /vagas -> /vagas.html OR /vagas/index.html
// Let's stick to /vagas.html to match the vercel.json 'destination': '/vagas.html' perfectly.

let vagasHtml = html;
vagasHtml = replaceTitle(vagasHtml, "Vagas de Emprego em Araucária - Araucária Informa");
vagasHtml = replaceMeta(vagasHtml, "name", "description", "Confira as vagas de emprego atualizadas diariamente em Araucária. Oportunidades em grandes empresas, RHs e comércio local.");
vagasHtml = replaceMeta(vagasHtml, "property", "og:title", "Vagas de Emprego em Araucária");
vagasHtml = replaceMeta(vagasHtml, "property", "og:description", "Confira as vagas de emprego atualizadas diariamente em Araucária.");
vagasHtml = replaceMeta(vagasHtml, "property", "og:image", "https://araucariainforma.com/images/share_jobs.jpg");
vagasHtml = replaceMeta(vagasHtml, "name", "twitter:title", "Vagas de Emprego em Araucária");
vagasHtml = replaceMeta(vagasHtml, "property", "twitter:description", "Confira as vagas de emprego atualizadas diariamente em Araucária.");
vagasHtml = replaceMeta(vagasHtml, "name", "twitter:image", "https://araucariainforma.com/images/share_jobs.jpg");
vagasHtml = replaceMeta(vagasHtml, "property", "twitter:image", "https://araucariainforma.com/images/share_jobs.jpg");
vagasHtml = replaceMeta(vagasHtml, "property", "og:url", "https://araucariainforma.com/vagas");

// --- CRITICAL FIX: Remove Home Page App Shell (Feira Gastronômica) ---
// The index.html has a hardcoded shell for the Home Page LCP. 
// We must remove/replace it for other pages to avoid showing wrong content before React loads.
const shellRegex = /<div class="shell-hero">[\s\S]*?<\/div>\s*<!-- Fake Content Skeleton \(MATCHING: HomePage.tsx News Section\) -->[\s\S]*?<!-- Grid Skeleton -->[\s\S]*?<div style="height:400px;background-color:#f9fafb;border-radius:1rem;border:1px solid #f3f4f6;"><\/div>\s*<\/div>\s*<\/div>/i;

// Replace with a simple generic loader or specific skeleton for Vagas
const jobsSkeleton = `
<div style="padding-top: 80px; text-align: center;">
    <div style="height: 60px; background-color: #1d4ed8; color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold;">
        Vagas de Emprego
    </div>
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <div style="height: 200px; background-color: #f3f4f6; margin-bottom: 1rem; border-radius: 0.5rem;"></div>
        <div style="height: 200px; background-color: #f3f4f6; margin-bottom: 1rem; border-radius: 0.5rem;"></div>
        <div style="height: 200px; background-color: #f3f4f6; margin-bottom: 1rem; border-radius: 0.5rem;"></div>
    </div>
</div>
`;

// It's safer to just empty the root content or replace the specific shell div if we can match it accurately.
// Let's try to match the "shell-hero" specifically.
if (vagasHtml.includes('class="shell-hero"')) {
    // Replace the specific Hero section
    vagasHtml = vagasHtml.replace(/<div class="shell-hero">[\s\S]*?<\/div>/, jobsSkeleton);
    // Remove the News Skeleton below it too if possible, but the hero is the main culprit.
}


fs.writeFileSync(path.join(distDir, 'vagas.html'), vagasHtml);
console.log('✅ Generated dist/vagas.html');

// --- Generate SERVICOS ---
console.log('Generating Servicos static route...');

let servicosHtml = html;
servicosHtml = replaceTitle(servicosHtml, "Horários de Ônibus e Telefones Úteis - Araucária Informa");
servicosHtml = replaceMeta(servicosHtml, "name", "description", "Consulte horários do Triar, Metropolitana, telefones emergência e farmácias.");
servicosHtml = replaceMeta(servicosHtml, "property", "og:title", "Horários de Ônibus e Telefones Úteis");
servicosHtml = replaceMeta(servicosHtml, "property", "og:description", "Consulte horários do Triar, Metropolitana, telefones emergência e farmácias.");
servicosHtml = replaceMeta(servicosHtml, "property", "og:image", "https://araucariainforma.com/images/share_services.jpg");
servicosHtml = replaceMeta(servicosHtml, "name", "twitter:title", "Horários de Ônibus e Telefones Úteis");
servicosHtml = replaceMeta(servicosHtml, "property", "twitter:description", "Consulte horários do Triar, Metropolitana, telefones emergência e farmácias.");
servicosHtml = replaceMeta(servicosHtml, "name", "twitter:image", "https://araucariainforma.com/images/share_services.jpg");
servicosHtml = replaceMeta(servicosHtml, "property", "twitter:image", "https://araucariainforma.com/images/share_services.jpg");
servicosHtml = replaceMeta(servicosHtml, "property", "og:url", "https://araucariainforma.com/servicos");

// Replace shell for Servicos as well
// We can reuse the same skeleton or make a generic one, but let's just use the same "jobsSkeleton" variable (or similar generic loader) for simplicity as it's just a placeholder.
// Actually let's make a generic one.
const servicesSkeleton = `
<div style="padding-top: 80px; text-align: center;">
    <div style="height: 60px; background-color: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold;">
        Serviços e Horários
    </div>
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
         <div style="height: 100px; background-color: #f3f4f6; margin-bottom: 1rem; border-radius: 0.5rem;"></div>
         <div style="height: 100px; background-color: #f3f4f6; margin-bottom: 1rem; border-radius: 0.5rem;"></div>
    </div>
</div>
`;

if (servicosHtml.includes('class="shell-hero"')) {
    servicosHtml = servicosHtml.replace(/<div class="shell-hero">[\s\S]*?<\/div>/, servicesSkeleton);
}

fs.writeFileSync(path.join(distDir, 'servicos.html'), servicosHtml);
console.log('✅ Generated dist/servicos.html');
