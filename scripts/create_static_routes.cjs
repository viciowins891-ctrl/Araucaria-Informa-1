
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

fs.writeFileSync(path.join(distDir, 'servicos.html'), servicosHtml);
console.log('✅ Generated dist/servicos.html');
