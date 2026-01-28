const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

// Regex to find IDs
const idRegex = /id:\s*(\d+)/g;
let match;
const ids = new Map();
const duplicates = [];

while ((match = idRegex.exec(content)) !== null) {
    const id = match[1];
    if (ids.has(id)) {
        duplicates.push(id);
    } else {
        ids.set(id, true);
    }
}

if (duplicates.length > 0) {
    console.log('--- DUPLICATE IDs FOUND ---');
    console.log(duplicates);
} else {
    console.log('--- No Duplicate IDs found ---');
}
