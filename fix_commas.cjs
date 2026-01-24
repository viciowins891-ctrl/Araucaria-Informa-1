
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace double commas with single comma
// Match },, optionally with whitespace in between
const newContent = content.replace(/},\s*,/g, '},');

if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log('Fixed double commas in data.ts');
} else {
    console.log('No double commas found.');
}
