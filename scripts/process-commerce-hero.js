import sharp from 'sharp';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique.png');
const outputDesktop = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique.webp');
const outputMobile = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique_mobile.webp');

async function processImages() {
    try {
        console.log('Processing Commerce Hero Images...');

        // Desktop Version: 1200px width, decent quality
        await sharp(inputPath)
            .resize({ width: 1200 })
            .webp({ quality: 80, smartSubsample: true })
            .toFile(outputDesktop);
        console.log('Created commerce_hero_unique.webp (Desktop)');

        // Mobile Version: 640px width, aggressive compression for < 50KB target
        await sharp(inputPath)
            .resize({ width: 640 })
            .webp({ quality: 50, smartSubsample: true })
            .toFile(outputMobile);
        console.log('Created commerce_hero_unique_mobile.webp (Mobile)');

    } catch (e) {
        console.error(e);
    }
}

processImages();
