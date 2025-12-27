import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path to point to 'public/images' relative to this script location
// Assuming script is in 'scripts/' and images in 'public/images'
const imagesDir = path.join(process.cwd(), 'public', 'images');
const targetSize = 50 * 1024; // 50KB

async function processImages() {
    console.log(`Scanning for images in: ${imagesDir}`);

    if (!fs.existsSync(imagesDir)) {
        console.error('Images directory not found!');
        return;
    }

    const files = fs.readdirSync(imagesDir);
    let processedCount = 0;

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            // Skip files that are already our mobile output
            if (file.includes('_mobile')) continue;

            const inputPath = path.join(imagesDir, file);
            const name = path.parse(file).name;
            const outputPath = path.join(imagesDir, `${name}_mobile.webp`);

            try {
                const metadata = await sharp(inputPath).metadata();
                // Skip if it is a webp small enough, BUT we are creating _mobile versions, so we should allow creating it if it doesn't exist or we want to ensure mobile optimization.
                // Let's just create the mobile version.

                const inputStats = fs.statSync(inputPath);
                // console.log(`Processing ${file} (${Math.round(inputStats.size / 1024)}KB)...`);

                let currentWidth = 640;
                let currentQuality = 80;

                // Initial Attempt
                await sharp(inputPath)
                    .resize({ width: currentWidth, withoutEnlargement: true })
                    .webp({ quality: currentQuality })
                    .toFile(outputPath);

                let outputStats = fs.statSync(outputPath);

                // Loop to reduce size
                while (outputStats.size > targetSize && (currentQuality > 20 || currentWidth > 320)) {
                    // Strategy: First reduce quality down to 40, then reduce resolution
                    if (currentQuality > 40) {
                        currentQuality -= 20;
                    } else {
                        // Quality is low (40 or 20), reduce resolution
                        currentWidth = Math.round(currentWidth * 0.8); // Reduce by 20%
                    }

                    // Safety break
                    if (currentWidth < 300) break;

                    // console.log(`  > ${Math.round(outputStats.size / 1024)}KB > 50KB. Retrying: ${currentWidth}px @ Q${currentQuality}...`);

                    // Overwrite
                    await sharp(inputPath)
                        .resize({ width: currentWidth, withoutEnlargement: true })
                        .webp({ quality: currentQuality })
                        .toFile(outputPath);

                    outputStats = fs.statSync(outputPath);
                }

                if (outputStats.size > targetSize) {
                    console.log(`  [WARN] Could not get ${file} under 50KB. Final: ${Math.round(outputStats.size / 1024)}KB`);
                } else {
                    console.log(`  [OK] ${file} -> ${Math.round(outputStats.size / 1024)}KB`);
                }

                processedCount++;

            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }

    console.log(`\nDone! Processed ${processedCount} images.`);
}

processImages();
