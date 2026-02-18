import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public', 'images');

const inputFile = path.join(publicDir, 'qualy_service_real.jpg');
const tempFile = path.join(publicDir, 'qualy_service_real_temp.jpg');

async function optimize() {
    if (!fs.existsSync(inputFile)) {
        console.error('Arquivo não encontrado:', inputFile);
        return;
    }

    console.log('Otimizando imagem Qualy Service...');

    try {
        await sharp(inputFile)
            .resize(800, 600, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 85 })
            .toFile(tempFile);

        // Substituir original
        fs.unlinkSync(inputFile);
        fs.renameSync(tempFile, inputFile);

        console.log('✅ Imagem otimizada com sucesso!');

        // Limpar placeholder antigo se existir
        const oldPlaceholder = path.join(publicDir, 'agnaldo_service_placeholder.jpg');
        if (fs.existsSync(oldPlaceholder)) {
            fs.unlinkSync(oldPlaceholder);
            console.log('🗑️ Placeholder antigo removido.');
        }

    } catch (err) {
        console.error('Erro na otimização:', err);
    }
}

optimize();
