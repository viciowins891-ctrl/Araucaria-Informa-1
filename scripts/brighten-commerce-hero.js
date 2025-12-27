import sharp from 'sharp';
import path from 'path';

// Re-using the cropped logic but adding brightness/saturation boost
const inputPath = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique.png');
const outputDesktop = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique_bright.webp');
const outputMobile = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique_bright_mobile.webp');

async function brightenImage() {
    try {
        console.log('Brightening Commerce Hero Image...');

        // Mesma região de crop (top half)
        const regionToExtract = { left: 0, top: 0, width: 1024, height: 512 };

        // Process Desktop: Crop -> Brightness 1.3 -> Saturation 1.2 -> WebP
        await sharp(inputPath)
            .extract(regionToExtract)
            .modulate({
                brightness: 1.3, // Aumenta brilho em 30%
                saturation: 1.2  // Aumenta saturação em 20% para ficar vibrante
            })
            .resize({ width: 1200, fit: 'cover' })
            .webp({ quality: 90, smartSubsample: true }) // Qualidade um pouco maior p/ desktop
            .toFile(outputDesktop);
        console.log('Created commerce_hero_unique_bright.webp');

        // Process Mobile
        await sharp(inputPath)
            .extract(regionToExtract)
            .modulate({
                brightness: 1.3,
                saturation: 1.2
            })
            .resize({ width: 640, fit: 'cover' })
            .webp({ quality: 60, smartSubsample: true })
            .toFile(outputMobile);
        console.log('Created commerce_hero_unique_bright_mobile.webp');

    } catch (e) {
        console.error(e);
    }
}

brightenImage();
