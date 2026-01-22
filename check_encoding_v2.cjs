
const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        // Check for common invalid UTF-8 byte sequences
        // or simply try to decode and check for replacement char (U+FFFD)
        // Node's buffer.toString() uses the replacement char for invalid sequences.
        const str = buffer.toString('utf8');

        // However, we want to know if there WAS an invalid sequence.
        // A simple way is to compare buffer lengths if we re-encode, 
        // but the replacement char is 3 bytes (EF BF BD), so length might change or not predictable.

        // Better check: scan the buffer manually for invalid UTF-8.
        // Or simply: check if the string contains the replacement character \uFFFD
        if (str.includes('\uFFFD')) {
            console.log(`[INVALID UTF-8] ${filePath}`);
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
        if (file.startsWith('.') || file === 'node_modules' || file === 'dist' || file.endsWith('.zip') || file.endsWith('.png') || file.endsWith('.ico')) {
            continue;
        }

        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                traverseDir(fullPath);
            } else if (stat.isFile()) {
                checkFile(fullPath);
            }
        } catch (e) {
            // Ignore access errors
        }
    }
}

console.log('Starting UTF-8 validation...');
traverseDir(process.cwd());
console.log('Validation complete.');
