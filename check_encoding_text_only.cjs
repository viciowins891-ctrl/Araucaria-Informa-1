
const fs = require('fs');
const path = require('path');

const TEXT_EXTENSIONS = new Set([
    '.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.html', '.css', '.txt', '.sql', '.xml', '.svg', '.sh', '.bat', '.ps1', '.yml', '.yaml'
]);

function isTextFile(filePath) {
    return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function checkFile(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        // Check for invalid UTF-8 sequences
        const str = buffer.toString('utf8');

        // If the string contains the replacement character for INVALID sequences bytes
        // Note: Buffer.toString() generally replaces errors with \uFFFD.
        // We want to distinguish "valid character that looks like replacement" vs "actual parsing error".
        // But for code files, they shouldn't usually contain \uFFFD unless something is wrong.

        if (str.includes('\uFFFD')) {
            console.log(`[POTENTIAL CORRUPTION] ${filePath}`);
            // Let's print a snippet where the error is
            const idx = str.indexOf('\uFFFD');
            const surr = str.substring(Math.max(0, idx - 20), Math.min(str.length, idx + 20)).replace(/\n/g, '\\n');
            console.log(`Context: ...${surr}...`);
            return false;
        }
        return true;
    } catch (err) {
        console.error(`Error reading ${filePath}: ${err.message}`);
        return false;
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (file.startsWith('.') || file === 'node_modules' || file === 'dist') {
            continue;
        }

        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                traverseDir(fullPath);
            } else if (stat.isFile()) {
                if (isTextFile(fullPath)) {
                    checkFile(fullPath);
                }
            }
        } catch (e) {
            // Ignore access errors
        }
    }
}

console.log('Starting TEXT FILE UTF-8 validation...');
traverseDir(process.cwd());
console.log('Validation complete.');
