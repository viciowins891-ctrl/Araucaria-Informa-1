
const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        const str = buffer.toString('utf8');
        
        // Check if recreating the buffer from the string matches the original buffer
        // This is a simple heuristic. A more robust one checks for replacement characters.
        // However, Node.js Buffer.toString('utf8') replaces invalid sequences with  (U+FFFD).
        
        if (str.includes('')) {
             console.log(`[INVALID UTF-8 DETECTED] File: ${filePath}`);
             // Print the surrounding context of the invalid character
             const index = str.indexOf('');
             const start = Math.max(0, index - 20);
             const end = Math.min(str.length, index + 20);
             console.log(`Context: ...${str.substring(start, end).replace(/\n/g, '\\n')}...`);
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
