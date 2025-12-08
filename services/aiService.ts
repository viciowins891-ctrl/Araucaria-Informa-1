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
    // Usando o modelo Pro para melhor raciocínio, ou Flash para rapidez.
    // O Flash é mais estável para JSON grandes.
    const model = 'gemini-2.5-flash';

    const searchContext = topic ? `sobre "${topic}"` : "sobre fatos recentes, política, obras ou eventos comunitários";

    const prompt = `
        Você é um Editor Chefe de um jornal sério em Araucária, Paraná.
        
        OBJETIVO:
        Escreva 1 (UM) artigo jornalístico completo, profundo e ORIGINAL ${searchContext} em Araucária/PR.
        
        REGRAS RÍGIDAS PARA ADSENSE (SEO):
        1. **Tamanho:** O texto DEVE ter no mínimo 500 a 700 palavras. Texto curto será rejeitado.
        2. **Título:** O título DEVE ser curto e direto (máximo 10 a 12 palavras) para não quebrar o layout mobile.
        3. **Estrutura:** Use tags HTML para estruturar o texto no campo 'content':
           - <h3> para subtítulos (mínimo 3 subtítulos).
           - <p> para parágrafos (bem desenvolvidos).
           - <ul>/<li> para listas se necessário.
           - <blockquote> para citações (invente citações de autoridades locais baseadas no contexto se não encontrar reais).
        4. **Originalidade:** Não copie trechos. Reescreva tudo com suas palavras em tom formal e informativo.
        5. **Fatos:** Use a ferramenta GoogleSearch para encontrar dados reais (nomes de ruas, bairros, políticos locais, valores de obras).
        
        SAÍDA OBRIGATÓRIA:
        Você deve retornar APENAS um JSON Array válido. 
        Não coloque crases (\`\`\`) ou a palavra json no inicio. Apenas comece com [ e termine com ].
        
        Exemplo de formato:
        [
          {
            "title": "Título Curto e Impactante (Máx 12 palavras)",
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
            }
        });

        let jsonString = response.text || "";
        
        // --- LIMPEZA MANUAL DO JSON ---
        // A IA às vezes coloca \`\`\`json no começo. Vamos remover isso.
        jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
        
        // Garante que pegamos apenas o array []
        const startIndex = jsonString.indexOf('[');
        const endIndex = jsonString.lastIndexOf(']');
        
        if (startIndex !== -1 && endIndex !== -1) {
            jsonString = jsonString.substring(startIndex, endIndex + 1);
        } else {
             // Se não achou JSON, tenta forçar um erro para cair no catch
             throw new Error("A IA não retornou um formato JSON válido.");
        }

        let rawArticles = [];
        
        try {
            rawArticles = JSON.parse(jsonString);
        } catch (e) {
            console.error("Erro no parse manual do JSON", e);
            console.log("String recebida:", jsonString);
            throw new Error("Falha ao processar o texto da IA. Tente novamente.");
        }

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return rawArticles.map((article: any) => {
            // Tenta pegar link real do grounding (fonte da pesquisa)
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