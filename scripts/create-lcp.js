import sharp from 'sharp';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'images', 'background_city_aerial_mobile.webp');
const outputPath = path.join(process.cwd(), 'public', 'images', 'hero_mobile_lcp.webp');

async function createLCPImage() {
    try {
        console.log('Creating ultra-optimized LCP image...');
        await sharp(inputPath)
            .resize({ width: 480 })
            .webp({ quality: 50, smartSubsample: true })
            .toFile(outputPath);
        console.log('Created hero_mobile_lcp.webp');
    } catch (e) {
        console.error(e);
    }
}

createLCPImage();
