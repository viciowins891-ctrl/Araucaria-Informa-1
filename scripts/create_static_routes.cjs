
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
const vagasDir = path.join(distDir, 'vagas');
ensureDir(vagasDir);

let vagasHtml = html;
vagasHtml = replaceTitle(vagasHtml, "Vagas de Emprego em Araucária - Araucária Informa");
vagasHtml = replaceMeta(vagasHtml, "name", "description", "Confira as vagas de emprego atualizadas diariamente em Araucária. Oportunidades em grandes empresas, RHs e comércio local.");
vagasHtml = replaceMeta(vagasHtml, "property", "og:title", "Vagas de Emprego em Araucária");
vagasHtml = replaceMeta(vagasHtml, "property", "og:description", "Confira as vagas de emprego atualizadas diariamente em Araucária.");
vagasHtml = replaceMeta(vagasHtml, "property", "og:image", "https://araucariainforma.com/images/share_jobs.jpg");
vagasHtml = replaceMeta(vagasHtml, "name", "twitter:title", "Vagas de Emprego em Araucária");
vagasHtml = replaceMeta(vagasHtml, "property", "twitter:description", "Confira as vagas de emprego atualizadas diariamente em Araucária."); // Twitter often uses name or property
vagasHtml = replaceMeta(vagasHtml, "name", "twitter:image", "https://araucariainforma.com/images/share_jobs.jpg");
// Also standard twitter:image property
vagasHtml = replaceMeta(vagasHtml, "property", "twitter:image", "https://araucariainforma.com/images/share_jobs.jpg");


fs.writeFileSync(path.join(vagasDir, 'index.html'), vagasHtml);
console.log('✅ Generated dist/vagas/index.html');

// --- Generate SERVICOS ---
console.log('Generating Servicos static route...');
const servicosDir = path.join(distDir, 'servicos');
ensureDir(servicosDir);

let servicosHtml = html;
servicosHtml = replaceTitle(servicosHtml, "Horários de Ônibus e Telefones Úteis - Araucária Informa");
servicosHtml = replaceMeta(servicosHtml, "name", "description", "Consulte horários do Triar, Metropolitana, telefones de emergência, farmácias de plantão e serviços públicos de Araucária.");
servicosHtml = replaceMeta(servicosHtml, "property", "og:title", "Horários de Ônibus e Telefones Úteis");
servicosHtml = replaceMeta(servicosHtml, "property", "og:description", "Consulte horários do Triar, Metropolitana, telefones emergência e farmácias.");
servicosHtml = replaceMeta(servicosHtml, "property", "og:image", "https://araucariainforma.com/images/share_services.jpg");
servicosHtml = replaceMeta(servicosHtml, "name", "twitter:title", "Horários de Ônibus e Telefones Úteis");
servicosHtml = replaceMeta(servicosHtml, "name", "twitter:description", "Consulte horários do Triar, Metropolitana, telefones emergência e farmácias.");
servicosHtml = replaceMeta(servicosHtml, "name", "twitter:image", "https://araucariainforma.com/images/share_services.jpg");
// Also standard twitter:image property
servicosHtml = replaceMeta(servicosHtml, "property", "twitter:image", "https://araucariainforma.com/images/share_services.jpg");

fs.writeFileSync(path.join(servicosDir, 'index.html'), servicosHtml);
console.log('✅ Generated dist/servicos/index.html');
