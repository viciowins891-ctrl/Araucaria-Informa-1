
import { google } from 'googleapis';
import { getDriveAuth, genAI } from './shared.js';

export async function runScout() {
    console.log("🔍 [Agente Pesquisador] Iniciando varredura...");

    try {
        const auth = await getDriveAuth();
        const drive = google.drive({ version: 'v3', auth });

        // 1. Encontrar pasta "Noticias (Drop aqui)"
        // Para simplificar, vamos buscar pelo nome em qualquer lugar
        const res = await drive.files.list({
            q: "name = 'Noticias (Drop aqui)' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
            fields: 'files(id, name)'
        });

        let folderId;
        if (res.data.files.length > 0) {
            folderId = res.data.files[0].id;
        } else {
            console.log("⚠️ Pasta 'Noticias (Drop aqui)' não encontrada. Usando modo Busca Web direto.");
            return await runWebSearchFallback();
        }

        // 2. Listar arquivos na pasta
        const fileRes = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: 'files(id, name, mimeType, webContentLink)'
        });

        const files = fileRes.data.files;

        if (files.length > 0) {
            console.log(`📂 Encontrados ${files.length} arquivos no Drive.`);
            // Retorna o primeiro arquivo para processamento (FIFO)
            const file = files[0];

            // Ler conteúdo do arquivo (Simulação de leitura de Texto/Docs)
            // Para simplificar: usamos o nome do arquivo como "Pauta" se não conseguirmos ler o body
            // Em produção leria o stream do arquivo.
            return {
                type: 'drive_file',
                data: {
                    id: file.id,
                    title: file.name,
                    content: `Conteúdo extraído do arquivo ${file.name}. (Simulado para este protótipo)`
                }
            };
        } else {
            console.log("📭 Pasta vazia. Ativando busca na Web...");
            return await runWebSearchFallback();
        }

    } catch (e) {
        console.error("Erro no Pesquisador:", e);
        return await runWebSearchFallback();
    }
}

async function runWebSearchFallback() {
    console.log("🌍 [Agente Pesquisador] Buscando notícias recentes de Araucária na Web...");
    // Simulação de busca real via LLM com groundness (ou hallucination controlada)
    // Aqui usamos o Gemini para simular que "leu" a web ou invocar tools se fosse o vertex.

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
        Liste 1 (UMA) notícia urgente e realista sobre Araucária, Paraná, Brasil.
        Baseie-se em fatos comuns da região: Indústria (Petrobras/Repar), Clima, Política Local ou Trânsito na Rodovia do Xisto.
        Retorne apenas o título e um resumo curto dos fatos brutos.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
        type: 'web_search',
        data: {
            title: "Notícia Web (Automática)",
            content: text
        }
    };
}
