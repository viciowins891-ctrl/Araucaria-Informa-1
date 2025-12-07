
import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from '../types';

// Função auxiliar para mapear categorias a imagens do Unsplash - URLs Atualizadas e Mais Confiáveis
const getImageForCategory = (category: string, keyword: string): string => {
    const searchTerms = `${category} ${keyword}`.toLowerCase();
    
    // URLs revisadas e testadas (Coleção Editorial/News do Unsplash)
    if (category === 'Esporte') return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000'; // Esporte Genérico
    if (category === 'Educação') return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000'; // Educação/Escola
    if (category === 'Tecnologia') return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'; // Chip/Tech
    if (category === 'Turismo') return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000'; // Viagem/Turismo
    
    if (searchTerms.includes('policia') || searchTerms.includes('segurança') || searchTerms.includes('guarda')) 
        return 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?auto=format&fit=crop&q=80&w=1000'; // Segurança/Polícia (Generico)
        
    if (searchTerms.includes('obras') || searchTerms.includes('construção') || searchTerms.includes('asfalto')) 
        return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000'; // Construção Civil
        
    if (searchTerms.includes('chuva') || searchTerms.includes('clima') || searchTerms.includes('tempo')) 
        return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1000'; // Clima
    
    if (searchTerms.includes('saúde') || searchTerms.includes('hospital') || searchTerms.includes('vacina'))
        return 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000'; // Saúde

    // Fallback padrão de cidade/notícia
    return 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1000';
};

const getColorForCategory = (category: string): string => {
    const map: Record<string, string> = {
        'Cidade': 'blue',
        'Infraestrutura': 'purple',
        'Esporte': 'green',
        'Educação': 'red',
        'Tecnologia': 'yellow',
        'Turismo': 'indigo',
        'Segurança': 'red',
        'Saúde': 'green',
        'Política': 'blue'
    };
    return map[category] || 'blue';
};

export const fetchWeeklyNewsWithAI = async (): Promise<NewsArticle[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';

    // Prompt refinado para segurança e formato
    const prompt = `
        Você é um jornalista local especializado na cidade de Araucária, Paraná, Brasil.
        
        TAREFA:
        Pesquise as notícias mais recentes (últimos 7 dias) sobre Araucária, PR.
        Selecione as 4 notícias mais relevantes e variadas.

        SEGURANÇA HTML:
        No campo "content", use APENAS tags HTML seguras: <p>, <b>, <strong>, <i>, <em>, <br>.
        NUNCA use tags <script>, <iframe>, <object> ou atributos de evento (onclick).
        
        FORMATO DE RESPOSTA:
        Retorne estritamente um JSON Array. Não inclua texto antes ou depois.
        Estrutura:
        [
          {
            "title": "Título curto",
            "summary": "Resumo de 2 linhas",
            "content": "Conteúdo HTML seguro",
            "category": "Uma de: Cidade, Infraestrutura, Esporte, Educação, Tecnologia, Turismo, Segurança",
            "publishDate": "DD/MM/YYYY",
            "author": "Nome da Fonte"
          }
        ]
        
        IMPORTANTE:
        Use a ferramenta Google Search para encontrar fatos reais e recentes.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });

        let jsonString = response.text || '[]';
        
        // CORREÇÃO DE ROBUSTEZ: Tenta extrair o JSON usando Regex caso venha envolto em Markdown ou texto
        // Procura por um array JSON [...]
        const jsonMatch = jsonString.match(/\[[\s\S]*\]/);

        if (jsonMatch) {
            jsonString = jsonMatch[0];
        } else {
            console.warn("IA não retornou um array JSON válido. Resposta bruta:", response.text);
            return [];
        }
        
        let rawArticles = [];
        try {
            rawArticles = JSON.parse(jsonString);
        } catch (parseError) {
            console.error("Erro fatal ao parsear JSON da IA:", parseError);
            return [];
        }
        
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        const processedArticles: NewsArticle[] = rawArticles.map((article: any, index: number) => {
            let sourceUrl = '';
            let sourceName = '';
            
            // Tentativa de grounding básico (pega o primeiro link se houver). 
            // Em uma implementação ideal, pediríamos as fontes dentro do próprio JSON, mas isso evita alucinações de links.
            if (groundingChunks.length > 0 && groundingChunks[0].web) {
                 sourceUrl = groundingChunks[0].web.uri;
                 sourceName = groundingChunks[0].web.title;
            }

            // Geração de ID mais segura para evitar colisão
            const safeId = Date.now() + Math.floor(Math.random() * 1000) + index;

            return {
                id: safeId,
                title: article.title,
                summary: article.summary,
                content: article.content, // HTML Sanitizado pelo prompt
                category: article.category,
                categoryColor: getColorForCategory(article.category),
                publishDate: article.publishDate,
                author: article.author || 'IA Araucária Informa',
                imageUrl: getImageForCategory(article.category, article.title),
                sourceUrl: sourceUrl,
                sourceName: sourceName
            };
        });

        return processedArticles;

    } catch (error) {
        console.error("Erro na pipeline de IA:", error);
        return [];
    }
};
