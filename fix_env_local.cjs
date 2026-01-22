
const fs = require('fs');

const file = '.env.local';
const buffer = fs.readFileSync(file);
console.log('Original hex:', buffer.subarray(0, 20).toString('hex'));

let content = buffer.toString('utf8');

// If it has a BOM or garbage at start, strip it.
// Finding the first alphanumeric char
const match = content.match(/[a-zA-Z]/);
if (match) {
    const startIndex = match.index;
    console.log(`Text starts at index ${startIndex}`);

    // Check if we need to filter out null bytes (if it was UTF-16)
    // If we see many null bytes, it might be UTF-16.
    if (buffer.includes(0x00)) {
        console.log('Detected null bytes, assuming UTF-16/UCS-2. Converting...');
        // Try reading as utf16le
        content = buffer.toString('utf16le');
        // If that still has garbage at start (BOM), strip it
        content = content.trim();
        // Remove BOM char if present
        if (content.charCodeAt(0) === 65279) { // 0xFEFF
            content = content.substring(1);
        }
    } else {
        // Just UTF-8 with garbage at start
        content = content.substring(startIndex);
    }
}

console.log('--- CLEANED CONTENT ---');
console.log(content);

// Write back as pure UTF-8
fs.writeFileSync(file, content, 'utf8');
console.log(`Rewrite complete: ${file}`);
