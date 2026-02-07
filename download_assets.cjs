
const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    {
        url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop', // Ônibus Amarelo/Transporte
        dest: 'public/images/share_services.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop', // Aperto de Mão/Business (Vagas)
        dest: 'public/images/share_jobs.jpg'
    }
];

const downloadImage = (url, dest) => {
    const file = fs.createWriteStream(path.join(__dirname, dest));
    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(() => console.log(`Downloaded: ${dest}`));
        });
    }).on('error', function (err) {
        fs.unlink(dest);
        console.error(`Error downloading ${dest}: ${err.message}`);
    });
};

// Ensure directory exists
const dir = path.join(__dirname, 'public/images');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

images.forEach(img => downloadImage(img.url, img.dest));
