import sharp from 'sharp';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'favicon.png');
const outputPath = path.join(process.cwd(), 'public', 'favicon.ico');

async function createFavicon() {
    try {
        console.log('Creating favicon.ico from favicon.png...');
        // Resize to 32x32 standard favicon size
        await sharp(inputPath)
            .resize(32, 32)
            .toFormat('png') // A maioria dos browsers modernos aceita PNG dentro de arquivo .ico ou apenas renomeado, mas vamos garantir 32x32
            .toFile(outputPath);

        console.log('Created favicon.ico (32x32)');
    } catch (e) {
        console.error(e);
    }
}

createFavicon();
