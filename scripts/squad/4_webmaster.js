
import { supabase, getDriveAuth } from './shared.js';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runWebmaster(finalNews) {
    console.log("🚀 [Agente de Operações] Publicando e Organizando...");

    // 1. Salvar no Supabase (Tentativa Best Effort)
    try {
        await supabase.from('news').insert({
            title: finalNews.title,
            content: finalNews.content,
            summary: finalNews.content.substring(0, 150) + '...',
            category: finalNews.category,
            image_url: finalNews.imageUrl,
            internal_image_url: finalNews.internalImageUrl,
            publish_date: new Date().toISOString(),
            author: 'Squad AI'
        });
        console.log("   ✅ Notícia enviada para o Supabase.");
    } catch (e) {
        console.warn("   ⚠️ Falha ao salvar no Supabase (ignorando):", e.message);
    }

    // 2. Salvar Físico no data.ts (Garantia Local)
    try {
        console.log("   💾 Gravando no disco local (data.ts)...");
        const dataPath = path.resolve(__dirname, '../../data.ts');
        let content = fs.readFileSync(dataPath, 'utf-8');

        // Cria o objeto da nova notícia
        const newArticleBlock = `
    {
        id: ${Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000)},
        title: ${JSON.stringify(finalNews.title)},
        summary: ${JSON.stringify(finalNews.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...')},
        content: ${JSON.stringify(finalNews.content)},
        imageUrl: '${finalNews.imageUrl}',
        mobileImageUrl: '${finalNews.imageUrl}', // Fallback seguro
        category: '${finalNews.category}',
        categoryColor: '${getColorForCategory(finalNews.category)}',
        internalImageUrl: '${finalNews.internalImageUrl}',
        publishDate: '${new Date().toISOString().split('T')[0]}',
        author: 'Redação Squad'
    },`;

        // Injeta logo após o export const newsArticles: NewsArticle[] = [
        const marker = "export const newsArticles: NewsArticle[] = [";
        if (content.includes(marker)) {
            content = content.replace(marker, marker + newArticleBlock);
            fs.writeFileSync(dataPath, content, 'utf-8');
            console.log("   ✅ data.ts atualizado com sucesso!");
        } else {
            console.error("   ❌ Marcador não encontrado em data.ts");
        }

    } catch (e) {
        console.error("   ❌ Erro ao gravar no disco:", e.message);
    }

    // 3. Limpar arquivo do Drive (se veio de lá)
    if (finalNews.sourceMetadata && finalNews.sourceMetadata.type === 'drive_file') {
        try {
            const fileId = finalNews.sourceMetadata.data.id;
            const auth = await getDriveAuth();
            const drive = google.drive({ version: 'v3', auth });

            await drive.files.delete({ fileId: fileId });
            console.log(`   🗑️ Arquivo fonte ${fileId} removido do Drive.`);
        } catch (e) {
            // Silencia erro de drive se não configurado
        }
    }

    return finalNews;
}

function getColorForCategory(category) {
    const map = {
        'Saúde': 'green',
        'Infraestrutura': 'purple',
        'Esporte': 'indigo',
        'Economia': 'blue',
        'Cultura': 'yellow',
        'Cidade': 'blue',
        'Educação': 'red'
    };
    return map[category] || 'gray';
}
