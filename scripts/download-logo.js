
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bras%C3%A3o_de_Armas_do_Munic%C3%ADpio_de_Arauc%C3%A1ria.jpg/240px-Bras%C3%A3o_de_Armas_do_Munic%C3%ADpio_de_Arauc%C3%A1ria.jpg";
const outputPath = path.join(process.cwd(), 'public', 'images', 'brasao_araucaria.jpg');

const file = fs.createWriteStream(outputPath);
https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log("Download completed.");
    });
}).on('error', (err) => {
    fs.unlink(outputPath);
    console.error("Error downloading image:", err.message);
});
