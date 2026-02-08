
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
const publicDir = path.join(rootDir, 'public');

// Helper to safely create dir
function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Read the clean index.html template from source
let html = fs.readFileSync(indexPath, 'utf8');

// --- Helper to REPLACE metatags in source HTML (which is clean, not minified yet) ---
function replaceMeta(content, property, newValue) {
    // 1. Try property="..." content="..."
    let regex = new RegExp(`(<meta[^>]*property="${property}"[^>]*content=")([^"]*)(")`, 'gi');
    if (regex.test(content)) return content.replace(regex, `$1${newValue}$3`);

    // 2. Try name="..." content="..."
    regex = new RegExp(`(<meta[^>]*name="${property}"[^>]*content=")([^"]*)(")`, 'gi');
    if (regex.test(content)) return content.replace(regex, `$1${newValue}$3`);

    // 3. If not found, create it (simplified fallback, inserts before </head>)
    return content.replace('</head>', `    <meta property="${property}" content="${newValue}" />\n</head>`);
}

function replaceTitle(content, newTitle) {
    return content.replace(/<title>.*?<\/title>/i, `<title>${newTitle}</title>`);
}

// --- Generate VAGAS in PUBLIC ---
console.log('Generating public/vagas/index.html...');
const vagasDir = path.join(publicDir, 'vagas');
ensureDir(vagasDir);

let vagasHtml = html;
vagasHtml = replaceTitle(vagasHtml, "Vagas de Emprego em Araucária - Araucária Informa");
vagasHtml = replaceMeta(vagasHtml, "description", "Confira as vagas de emprego atualizadas diariamente em Araucária. Oportunidades em grandes empresas, RHs e comércio local.");
vagasHtml = replaceMeta(vagasHtml, "og:title", "Vagas de Emprego em Araucária");
vagasHtml = replaceMeta(vagasHtml, "og:description", "Confira as vagas de emprego atualizadas diariamente em Araucária.");
vagasHtml = replaceMeta(vagasHtml, "og:image", "https://araucariainforma.com/images/share_jobs.jpg");
vagasHtml = replaceMeta(vagasHtml, "twitter:title", "Vagas de Emprego em Araucária");
vagasHtml = replaceMeta(vagasHtml, "twitter:description", "Confira as vagas de emprego atualizadas diariamente em Araucária.");
vagasHtml = replaceMeta(vagasHtml, "twitter:image", "https://araucariainforma.com/images/share_jobs.jpg");

// FIX: Ensure paths are absolute because we are one level deep (/vagas/)
vagasHtml = vagasHtml.replace(/src="\//g, 'src="/').replace(/href="\//g, 'href="/'); // Already absolute in source, just ensuring
vagasHtml = vagasHtml.replace(/src="\.\//g, 'src="/'); // Fix relative ./
vagasHtml = vagasHtml.replace(/href="\.\//g, 'href="/'); // Fix relative ./

fs.writeFileSync(path.join(vagasDir, 'index.html'), vagasHtml);
console.log('✅ Generated public/vagas/index.html');


// --- Generate SERVICOS in PUBLIC ---
console.log('Generating public/servicos/index.html...');
const servicosDir = path.join(publicDir, 'servicos');
ensureDir(servicosDir);

let servicosHtml = html;
servicosHtml = replaceTitle(servicosHtml, "Horários de Ônibus e Telefones Úteis - Araucária Informa");
servicosHtml = replaceMeta(servicosHtml, "description", "Consulte horários do Triar, Metropolitana, telefones de emergência, farmácias de plantão e serviços públicos de Araucária.");
servicosHtml = replaceMeta(servicosHtml, "og:title", "Horários de Ônibus e Telefones Úteis");
servicosHtml = replaceMeta(servicosHtml, "og:description", "Consulte horários do Triar, Metropolitana, telefones emergência e farmácias.");
servicosHtml = replaceMeta(servicosHtml, "og:image", "https://araucariainforma.com/images/share_services.jpg");
servicosHtml = replaceMeta(servicosHtml, "twitter:title", "Horários de Ônibus e Telefones Úteis");
servicosHtml = replaceMeta(servicosHtml, "twitter:description", "Consulte horários do Triar, Metropolitana, telefones emergência e farmácias.");
servicosHtml = replaceMeta(servicosHtml, "twitter:image", "https://araucariainforma.com/images/share_services.jpg");

// Fix paths too
servicosHtml = servicosHtml.replace(/src="\.\//g, 'src="/').replace(/href="\.\//g, 'href="/');

fs.writeFileSync(path.join(servicosDir, 'index.html'), servicosHtml);
console.log('✅ Generated public/servicos/index.html');
