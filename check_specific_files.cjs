
const fs = require('fs');

const filesToCheck = [
    'ATUALIZAR_SITE.bat',
    'ATUALIZAR_JACARE.bat',
    '.env',
    '.env.local',
    '.env.production.local'
];

filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
        const buffer = fs.readFileSync(file);
        const str = buffer.toString('utf8');
        if (str.includes('\uFFFD')) {
            console.log(`[INVALID UTF-8] ${file}`);
            console.log('--- CONTENT START ---');
            console.log(str);
            console.log('--- CONTENT END ---');
        } else {
            console.log(`[OK] ${file}`);
        }
    } else {
        console.log(`[MISSING] ${file}`);
    }
});
