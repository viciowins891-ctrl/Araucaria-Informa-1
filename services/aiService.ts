
import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from '../types';

// Função auxiliar para mapear categorias a imagens do Unsplash
const getImageForCategory = (category: string, keyword: string): string => {
    const searchTerms = `${category} ${keyword}`.toLowerCase();
    
    if (category === 'Esporte') return 'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=1000';
    if (category === 'Educação') return 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=1000';
    if (category === 'Tecnologia') return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
    if (category === 'Turismo') return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000';
    if (searchTerms.includes('policia') || searchTerms.includes('segurança')) return 'https://images.unsplash.com/photo-1555627034-7033509618f0?auto=format&fit=crop&q=80&w=1000';
    if (searchTerms.includes('obras') || searchTerms.includes('construção')) return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000';
    if (searchTerms.includes('chuva') || searchTerms.includes('clima')) return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1000';
    
    return 'https://images.unsplash.com/photo-1444723121867-c612671f26ae?auto=format&fit=crop&q=80&w=1000';
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
        
        // CORREÇÃO DE ROBUSTEZ: Encontrar o primeiro '[' e o último ']'
        // Isso ignora textos como "Aqui está o JSON:" ou blocos de markdown mal formatados
        const startIndex = jsonString.indexOf('[');
        const endIndex = jsonString.lastIndexOf(']') + 1;

        if (startIndex !== -1 && endIndex !== -1) {
            jsonString = jsonString.substring(startIndex, endIndex);
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
