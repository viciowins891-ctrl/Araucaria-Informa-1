
const fs = require('fs');

function checkPackageJson() {
    const buffer = fs.readFileSync('package.json');
    const content = buffer.toString('binary'); // read as raw binary string

    // Find the line with "name"
    const nameIndex = content.indexOf('"name"');
    if (nameIndex === -1) {
        console.log('Could not find "name" field');
        return;
    }

    // Get context around "name"
    const snippet = buffer.subarray(nameIndex, nameIndex + 50);
    console.log('Hex dump of "name" field in package.json:');
    console.log(snippet.toString('hex'));

    // Check if it parses as JSON with UTF-8
    try {
        JSON.parse(buffer.toString('utf8'));
        console.log('JSON.parse(utf8) SUCCESS');
    } catch (e) {
        console.log('JSON.parse(utf8) FAILED:', e.message);
    }
}

checkPackageJson();
