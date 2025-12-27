import sharp from 'sharp';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique.png');
// Vamos salvar com o mesmo nome final webp para substituir a atual
const outputDesktop = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique.webp');
const outputMobile = path.join(process.cwd(), 'public', 'images', 'commerce_hero_unique_mobile.webp');

async function fixAndProcessImages() {
    try {
        console.log('Fixing Commerce Hero Image (Removing Duplication/Collage)...');

        // A imagem original é 1024x1024.
        // Se for uma colagem, vamos pegar apenas a metade superior para garantir uma cena única e limpa.
        // Vamos extrair um retangulo de 1024x550 (aprox metade superior com um pouco de sangria se não for colagem exata)
        // Na verdade, 1024x512 é mais seguro se for split screen.

        const regionToExtract = { left: 0, top: 0, width: 1024, height: 512 };

        // Process Desktop: Extract top half -> Resize to 1200w (upscale smooth) -> WebP
        await sharp(inputPath)
            .extract(regionToExtract)
            .resize({ width: 1200, fit: 'cover' }) // Estica um pouco ou ajusta
            .webp({ quality: 80, smartSubsample: true })
            .toFile(outputDesktop);
        console.log('Fixed commerce_hero_unique.webp (Desktop - Top Half)');

        // Process Mobile: Extract top half -> Resize to 640w -> WebP < 50KB
        await sharp(inputPath)
            .extract(regionToExtract)
            .resize({ width: 640, fit: 'cover' })
            .webp({ quality: 50, smartSubsample: true })
            .toFile(outputMobile);
        console.log('Fixed commerce_hero_unique_mobile.webp (Mobile - Top Half)');

    } catch (e) {
        console.error(e);
    }
}

fixAndProcessImages();
