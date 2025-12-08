import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from '../types';

// Mapeamento inteligente de imagens baseadas em palavras-chave do título
const getImageForContext = (title: string, category: string): string => {
    const t = title.toLowerCase();
    
    // URLs de alta qualidade do Unsplash
    if (t.includes('polícia') || t.includes('preso') || t.includes('assalto') || t.includes('guarda')) return 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('prefeitura') || t.includes('câmara') || t.includes('vereador') || t.includes('prefeito')) return 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('escola') || t.includes('aluno') || t.includes('educação')) return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('saúde') || t.includes('hospital') || t.includes('vacina') || t.includes('upa')) return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('obra') || t.includes('asfalto') || t.includes('rua') || t.includes('construção')) return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('festa') || t.includes('cultura') || t.includes('show')) return 'https://images.unsplash.com/photo-1514525253440-b393452e3720?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('esporte') || t.includes('futebol') || t.includes('jogo')) return 'https://images.unsplash.com/photo-1579952363873-27f3bde9be2f?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('chuva') || t.includes('tempo') || t.includes('frio')) return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1000';
    if (t.includes('acidente') || t.includes('trânsito')) return 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&q=80&w=1000';

    // Padrão genérico de Araucária
    return 'https://images.unsplash.com/photo-1444723121867-c612671f26ae?q=80&w=1000&auto=format&fit=crop';
};

const getColorForCategory = (category: string): string => {
    const map: Record<string, string> = {
        'Cidade': 'blue', 'Infraestrutura': 'purple', 'Esporte': 'green',
        'Educação': 'red', 'Tecnologia': 'yellow', 'Turismo': 'indigo',
        'Segurança': 'red', 'Saúde': 'green', 'Política': 'blue'
    };
    return map[category] || 'blue';
};

// Função poderosa para gerar artigos longos que aprovam no AdSense
export const generateDeepArticle = async (topic: string = ''): Promise<NewsArticle[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';

    const searchContext = topic ? `sobre "${topic}"` : "sobre fatos recentes, política, obras ou eventos comunitários";

    const prompt = `
        Você é um Editor Chefe de um jornal sério em Araucária, Paraná.
        
        OBJETIVO:
        Escreva 1 (UM) artigo jornalístico completo, profundo e ORIGINAL ${searchContext} em Araucária/PR.
        
        REGRAS RÍGIDAS PARA ADSENSE (SEO):
        1. **Tamanho:** O texto DEVE ter no mínimo 500 a 700 palavras. Texto curto será rejeitado.
        2. **Estrutura:** Use tags HTML para estruturar o texto no campo 'content':
           - <h3> para subtítulos (mínimo 3 subtítulos).
           - <p> para parágrafos (bem desenvolvidos).
           - <ul>/<li> para listas se necessário.
           - <blockquote> para citações (invente citações de autoridades locais baseadas no contexto se não encontrar reais).
        3. **Originalidade:** Não copie trechos. Reescreva tudo com suas palavras em tom formal e informativo.
        4. **Fatos:** Use a ferramenta GoogleSearch para encontrar dados reais (nomes de ruas, bairros, políticos locais, valores de obras).
        
        SAÍDA ESPERADA:
        Retorne APENAS um JSON Array válido. Não use blocos de código markdown (como \`\`\`json).
        Exemplo:
        [
          {
            "title": "Título Impactante e Jornalístico",
            "summary": "Um resumo denso de 2 ou 3 frases para o card.",
            "content": "O TEXTO HTML LONGO E COMPLETO AQUI...",
            "category": "Escolha entre: Cidade, Infraestrutura, Esporte, Educação, Segurança, Saúde, Política",
            "publishDate": "DD/MM/YYYY",
            "author": "Redação Araucária Informa",
            "sourceName": "Nome do jornal/site onde achou a info (ex: O Popular, Prefeitura)"
          }
        ]
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                // IMPORTANTE: responseMimeType removido pois conflita com googleSearch.
                // O parsing manual abaixo garante o JSON.
            }
        });

        let jsonString = response.text || "";
        
        // Limpeza robusta para garantir que pegamos apenas o JSON, caso a IA envie texto extra
        jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
        const startIndex = jsonString.indexOf('[');
        const endIndex = jsonString.lastIndexOf(']');
        
        if (startIndex !== -1 && endIndex !== -1) {
            jsonString = jsonString.substring(startIndex, endIndex + 1);
        }

        let rawArticles = [];
        
        try {
            rawArticles = JSON.parse(jsonString);
        } catch (e) {
            console.error("Erro parse JSON", e);
            console.log("Conteúdo recebido:", jsonString);
            throw new Error("A IA não retornou um JSON válido. Tente novamente.");
        }

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return rawArticles.map((article: any) => {
            // Tenta pegar link real do grounding
            let sourceUrl = '';
            if (groundingChunks.length > 0 && groundingChunks[0].web) {
                 sourceUrl = groundingChunks[0].web.uri;
            }

            return {
                id: Date.now(), // ID temporário
                title: article.title,
                summary: article.summary,
                content: article.content,
                category: article.category,
                categoryColor: getColorForCategory(article.category),
                publishDate: new Date().toLocaleDateString('pt-BR'),
                author: article.author || 'Redação',
                imageUrl: getImageForContext(article.title, article.category),
                sourceUrl: sourceUrl,
                sourceName: article.sourceName || 'Fonte Oficial'
            };
        });

    } catch (error) {
        console.error("Erro ao gerar artigo profundo:", error);
        throw error;
    }
};

// Mantém a função antiga para compatibilidade, mas agora ela chama a nova
export const fetchWeeklyNewsWithAI = async () => {
    return generateDeepArticle();
};