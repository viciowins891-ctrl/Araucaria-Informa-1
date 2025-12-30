import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disable sharp cache to prevent file locking/memory issues on Windows
sharp.cache(false);

const imagesDir = path.join(process.cwd(), 'public', 'images');
const targetSize = 50 * 1024; // 50KB
const MAX_RETRIES = 5; // Prevent infinite loops

async function processImages() {
    console.log(`Scanning for images in: ${imagesDir}`);

    if (!fs.existsSync(imagesDir)) {
        console.error('Images directory not found!');
        return;
    }

    const files = fs.readdirSync(imagesDir);
    let processedCount = 0;


    // Filter valid files first
    const filterArg = process.argv[2];
    const validFiles = files.filter(file => {
        const isImage = file.match(/\.(jpg|jpeg|png|webp)$/i) && !file.includes('_mobile');
        if (!isImage) return false;

        // If a filter argument is provided, only include files that contain the filter string
        if (filterArg && !file.toLowerCase().includes(filterArg.toLowerCase())) {
            return false;
        }

        return true;
    });

    console.log(`Found ${validFiles.length} images to process${filterArg ? ` (filtered by '${filterArg}')` : ''}.`);

    for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const inputPath = path.join(imagesDir, file);
        const name = path.parse(file).name;
        const outputPath = path.join(imagesDir, `${name}_mobile.webp`);

        // Log progress every 10 images or for the first few
        if (i % 10 === 0 || i < 5) {
            console.log(`[${i + 1}/${validFiles.length}] Checking ${file}...`);
        }

        if (fs.existsSync(outputPath)) {
            try {
                const inputStat = fs.statSync(inputPath);
                const outputStat = fs.statSync(outputPath);
                if (outputStat.mtime > inputStat.mtime) {
                    continue;
                }
            } catch (e) {
                // Ignore stat errors, just re-process
            }
        }

        try {
            // Read into buffer once to avoid file locking issues
            const inputBuffer = fs.readFileSync(inputPath);
            const metadata = await sharp(inputBuffer).metadata();

            let currentWidth = 640;
            let currentQuality = 80;
            let attempt = 0;

            // Initial processing
            await sharp(inputBuffer)
                .resize({ width: currentWidth, withoutEnlargement: true })
                .webp({ quality: currentQuality })
                .toFile(outputPath);

            let outputStats = fs.statSync(outputPath);

            // Optimization loop
            while (outputStats.size > targetSize && attempt < MAX_RETRIES) {
                attempt++;

                if (currentQuality > 40) {
                    currentQuality -= 20;
                } else {
                    currentWidth = Math.round(currentWidth * 0.8);
                }

                if (currentWidth < 300) break;

                // console.log(`  > Retry ${attempt}: ${currentWidth}px @ Q${currentQuality}`);

                await sharp(inputBuffer)
                    .resize({ width: currentWidth, withoutEnlargement: true })
                    .webp({ quality: currentQuality })
                    .toFile(outputPath);

                outputStats = fs.statSync(outputPath);
            }

            if (outputStats.size > targetSize) {
                console.log(`  [WARN] ${file} -> ${Math.round(outputStats.size / 1024)}KB (Limit exceeded)`);
            } else {
                console.log(`  [OK] ${file} -> ${Math.round(outputStats.size / 1024)}KB`);
            }

            processedCount++;

            // Add a small delay to prevent overwhelming the file watcher (Vite) and causing freezes
            await new Promise(resolve => setTimeout(resolve, 200));

        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    }

    console.log(`\nDone! Processed ${processedCount} images.`);
}

processImages();
