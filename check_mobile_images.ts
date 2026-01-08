
import fs from 'fs';
import path from 'path';
import { newsArticles, events, businesses } from './data';

const imagesDir = path.join(process.cwd(), 'public');

function getExpectedMobilePath(originalUrl) {
    if (!originalUrl || originalUrl.startsWith('http')) return null;
    const cleanUrl = originalUrl.split('?')[0];
    const extension = path.extname(cleanUrl);
    const basePath = cleanUrl.substring(0, cleanUrl.lastIndexOf('.'));
    return `${basePath}_mobile.webp`;
}

function checkFile(url) {
    if (!url) return false;
    const cleanUrl = url.split('?')[0];
    const fullPath = path.join(imagesDir, cleanUrl);
    return fs.existsSync(fullPath);
}

const problems = [];

newsArticles.forEach(item => {
    // Se não tem mobile explícito, o sistema vai tentar adivinhar
    if (!item.mobileImageUrl && item.imageUrl && !item.imageUrl.startsWith('http')) {
        const expectedMobile = getExpectedMobilePath(item.imageUrl);
        if (!checkFile(expectedMobile)) {
            problems.push({
                id: item.id,
                title: item.title,
                issue: 'Missing implicit mobile image',
                original: item.imageUrl,
                expectedMobile: expectedMobile
            });
        }
    }

    // Se tem mobile explícito, verificar se existe (já fiz antes, mas reforçando)
    if (item.mobileImageUrl && !item.mobileImageUrl.startsWith('http')) {
        if (!checkFile(item.mobileImageUrl)) {
            problems.push({
                id: item.id,
                title: item.title,
                issue: 'Explicit mobile image missing',
                path: item.mobileImageUrl
            });
        }
    }
});

console.log(JSON.stringify(problems, null, 2));
