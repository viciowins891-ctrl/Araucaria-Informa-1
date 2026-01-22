
import { genAI } from './shared.js';

export async function runPhotographer(newsDraft) {
    console.log("📸 [Agente Fotógrafo] Criando imagem fotojornalística...");

    // 1. Criar o Prompt (Engenharia de Prompt via LLM)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const promptEngineering = `
        Analise esta notícia de Araucária: "${newsDraft.title}".
        Resumo: ${newsDraft.content.substring(0, 150)}...
        
        Crie um prompt em INGLÊS para um gerador de imagem (Flux/Midjourney).
        Foco: FOTOJORNALISMO, Realismo, 8k, Iluminação Natural, Ambiente Urbano Brasileiro.
        NÃO inclua texto na imagem.
        Retorne APENAS o prompt em inglês.
    `;

    const result = await model.generateContent(promptEngineering);
    const imagePrompt = result.response.text().trim();

    console.log(`   🎨 Prompt Gerado: "${imagePrompt}"`);

    // 2. Gerar a URL (Pollinations)
    // Codifica o prompt para URL
    const encodedPrompt = encodeURIComponent(imagePrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&model=flux&nologo=true`;

    console.log(`   🔗 URL da Imagem: ${imageUrl}`);

    return {
        ...newsDraft,
        imageUrl: imageUrl
    };
}
