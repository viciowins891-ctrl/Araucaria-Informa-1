
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');
const lines = content.split('\n');
// Lines are 0-indexed. Line 655 in file is index 654.
// Let's print lines 650 to 660 (indexes 649 to 659)
for (let i = 649; i <= 659; i++) {
    console.log(`${i + 1}: ${JSON.stringify(lines[i])}`);
}
