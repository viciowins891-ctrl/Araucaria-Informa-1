
import { supabase, getDriveAuth } from './shared.js';
import { google } from 'googleapis';

export async function runWebmaster(finalNews) {
    console.log("🚀 [Agente de Operações] Publicando e Organizando...");

    // 1. Salvar no Supabase
    const { data, error } = await supabase.from('news').insert({
        title: finalNews.title,
        content: finalNews.content,
        summary: finalNews.content.substring(0, 100) + '...', // Extrai resumo simples
        category: finalNews.category,
        image_url: finalNews.imageUrl,
        publish_date: new Date().toISOString(),
        author: 'Squad AI'
    }).select();

    if (error) {
        console.error("❌ Erro no Supabase:", error.message);
        throw error;
    }

    console.log("   ✅ Notícia salva no Banco de Dados.");

    // 2. Limpar arquivo do Drive (se veio de lá)
    if (finalNews.sourceMetadata && finalNews.sourceMetadata.type === 'drive_file') {
        try {
            const fileId = finalNews.sourceMetadata.data.id;
            const auth = await getDriveAuth();
            const drive = google.drive({ version: 'v3', auth });

            await drive.files.delete({ fileId: fileId });
            console.log(`   🗑️ Arquivo fonte ${fileId} removido do Drive.`);
        } catch (e) {
            console.error("   ⚠️ Falha ao limpar Drive:", e.message);
        }
    }

    // 3. Trigger de Deploy (Simulado ou Real via Webhook Vercel)
    // console.log("   Build Trigger enviado para Vercel...");

    return data;
}
