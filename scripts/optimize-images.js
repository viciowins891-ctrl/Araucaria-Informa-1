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
        if (file.match(/\.(jpg|jpeg|png)$/i)) { // Converting source formats. Skipping webp to avoid re-convert unless it's strictly requested.
            // But user said "convert heavy images... to webp". The heavy ones might be png/jpg.
            // If there are heavy webp, we could re-compress them too. 
            // Let's include webp but skip files that look like our output format ("_mobile.webp")

            if (file.includes('_mobile')) continue;

            const inputPath = path.join(imagesDir, file);
            const name = path.parse(file).name;
            const outputPath = path.join(imagesDir, `${name}_mobile.webp`);

            try {
                const metadata = await sharp(inputPath).metadata();
                const inputStats = fs.statSync(inputPath);

                console.log(`Processing ${file} (${Math.round(inputStats.size / 1024)}KB)...`);

                // Resize logic: max width 640px for mobile
                let resizeOptions = {};
                if (metadata.width > 640) {
                    resizeOptions = { width: 640 };
                } else {
                    // If it's already small enough in pixels, maybe just compress?
                    // But let's keep it as is or maybe just max 640 is fine.
                }

                // Attempt 1: Good quality
                await sharp(inputPath)
                    .resize(resizeOptions)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                let outputStats = fs.statSync(outputPath);

                // Optimize loop: if > 50KB, reduce quality
                if (outputStats.size > targetSize) {
                    console.log(`  > Result ${Math.round(outputStats.size / 1024)}KB is > 50KB. Retrying with lower quality...`);
                    await sharp(inputPath)
                        .resize(resizeOptions)
                        .webp({ quality: 60 })
                        .toFile(outputPath);
                    outputStats = fs.statSync(outputPath);
                }

                if (outputStats.size > targetSize) {
                    console.log(`  > Still ${Math.round(outputStats.size / 1024)}KB. Trying aggressive compression...`);
                    await sharp(inputPath)
                        .resize(resizeOptions)
                        .webp({ quality: 40 })
                        .toFile(outputPath);
                    outputStats = fs.statSync(outputPath);
                }

                console.log(`  => Created ${path.basename(outputPath)}: ${Math.round(outputStats.size / 1024)}KB`);
                processedCount++;

            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }

    console.log(`\nDone! Processed ${processedCount} images.`);
}

processImages();
