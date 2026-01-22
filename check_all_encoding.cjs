
const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        // Check for common invalid UTF-8 byte sequences
        // A simple way is to convert to string and back to buffer, and see if it changed length?
        // No, because replacement char is 3 bytes (EF BF BD).

        // Let's use Buffer.isUtf8 if available (Node 19+)?
        // If not, we scan manually or look for the replacement character in the decoded string.

        const str = buffer.toString('utf8');
        if (str.includes('\uFFFD')) { // The replacement character
            console.log(`[INVALID UTF-8 CONTENT] ${filePath}`);
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
        if (file === '.git' || file === 'node_modules' || file === 'dist' || file.endsWith('.zip') || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.ico')) {
            continue;
        }

        const fullPath = path.join(dir, file);

        // CHECK FILENAME ENCODING
        // JS strings are UTF-16. If fs.readdirSync returned it, it's likely already a valid JS string.
        // But if the filesystem had invalid bytes, sometimes it gets mapped to replacement chars in the filename string itself?
        if (file.includes('\uFFFD')) {
            console.log(`[INVALID UTF-8 FILENAME] ${fullPath}`);
        }

        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                traverseDir(fullPath);
            } else if (stat.isFile()) {
                // Check all files that are not binary extensions we excluded above
                checkFile(fullPath);
            }
        } catch (e) {
            console.log(`[ACCESS ERROR] ${fullPath}: ${e.message}`);
        }
    }
}

console.log('Starting COMPLETE UTF-8 validation (checking hidden files and arbitrary extensions)...');
traverseDir(process.cwd());
console.log('Validation complete.');
