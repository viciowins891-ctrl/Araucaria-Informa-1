import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(process.cwd(), 'public', 'logo-tree.png');
const publicDir = path.join(process.cwd(), 'public');

async function restoreIcons() {
    try {
        console.log(`Loading logo from: ${logoPath}`);

        // 1. Favicon.png (192x192 - High Res for Tabs/PWA)
        await sharp(logoPath)
            .resize(192, 192)
            .toFile(path.join(publicDir, 'favicon.png'));
        console.log('Generated favicon.png (192x192)');

        // 2. Apple Touch Icon (180x180 - iOS Standard)
        await sharp(logoPath)
            .resize(180, 180)
            .toFile(path.join(publicDir, 'apple-touch-icon.png'));
        console.log('Generated apple-touch-icon.png (180x180)');

        // 3. Favicon.ico (32x32 - Legacy)
        await sharp(logoPath)
            .resize(32, 32)
            .toFormat('png')
            .toFile(path.join(publicDir, 'favicon.ico'));
        console.log('Generated favicon.ico (32x32)');

    } catch (e) {
        console.error('Error generating icons:', e);
    }
}

restoreIcons();
