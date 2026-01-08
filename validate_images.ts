
import fs from 'fs';
import path from 'path';
import { newsArticles, events, businesses } from './data';

const imagesDir = path.join(process.cwd(), 'public');

function checkFile(url) {
    if (!url) return true; // Null/Empty is handled elsewhere or ignored
    if (url.startsWith('http')) return true; // External URL

    // Remove query params like ?v=...
    const cleanUrl = url.split('?')[0];
    const fullPath = path.join(imagesDir, cleanUrl);

    return fs.existsSync(fullPath);
}

const missing = [];

newsArticles.forEach(item => {
    if (!checkFile(item.imageUrl)) missing.push({ id: item.id, field: 'imageUrl', url: item.imageUrl, title: item.title });
    if (!checkFile(item.mobileImageUrl)) missing.push({ id: item.id, field: 'mobileImageUrl', url: item.mobileImageUrl, title: item.title });
    if (!checkFile(item.internalImageUrl)) missing.push({ id: item.id, field: 'internalImageUrl', url: item.internalImageUrl, title: item.title });
});

events.forEach(item => {
    if (!checkFile(item.imageUrl)) missing.push({ id: item.id, type: 'event', url: item.imageUrl, title: item.title });
});

businesses.forEach(item => {
    if (!checkFile(item.imageUrl)) missing.push({ id: item.id, type: 'business', url: item.imageUrl, name: item.name });
});

console.log(JSON.stringify(missing, null, 2));
