
import { genAI } from './shared.js';

export async function runEditor(rawFacts) {
    console.log("✍️ [Agente Redator] Escrevendo a notícia...");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        Você é o Editor Chefe do "Araucária Informa".
        Recebi estes fados brutos: "${rawFacts.data.content} - ${rawFacts.data.title}"
        
        Sua missão: Transformar isso em uma notícia curta e profissional.
        
        REGRAS RÍGIDAS:
        1. TÍTULO: Deve ser Impactante e curto.
        2. FORMATO: Exatamente 3 parágrafos curtos.
           - Pardágrafo 1: O que, onde, quando.
           - Parágrafo 2: Detalhes e contexto.
           - Parágrafo 3: Impacto na comunidade.
        3. ESTILO: Jornalismo Local, sério mas próximo.
        4. CATEGORIA: Escolha entre [Segurança, Política, Cidade, Esporte, Economia].

        SAÍDA (JSON Puro):
        {
            "title": "...",
            "content": "<p>...</p><p>...</p><p>...</p>",
            "category": "..."
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const newsDraft = JSON.parse(text);

        // Passa adiante os metadados da origem para o Webmaster limpar depois
        return {
            ...newsDraft,
            sourceMetadata: rawFacts
        };

    } catch (e) {
        console.error("❌ Falha na Redação:", e);
        throw e;
    }
}
