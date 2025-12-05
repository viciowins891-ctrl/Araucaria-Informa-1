
import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from '../types';

// Função auxiliar para mapear categorias a imagens do Unsplash
const getImageForCategory = (category: string, keyword: string): string => {
    // Palavras-chave para refinar a busca de imagem
    const searchTerms = `${category} ${keyword}`.toLowerCase();
    
    // Mapeamento de imagens de alta qualidade por categoria/tema
    if (category === 'Esporte') return 'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=1000';
    if (category === 'Educação') return 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=1000';
    if (category === 'Tecnologia') return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
    if (category === 'Turismo') return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000';
    if (searchTerms.includes('policia') || searchTerms.includes('segurança')) return 'https://images.unsplash.com/photo-1555627034-7033509618f0?auto=format&fit=crop&q=80&w=1000';
    if (searchTerms.includes('obras') || searchTerms.includes('construção')) return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000';
    if (searchTerms.includes('chuva') || searchTerms.includes('clima')) return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1000';
    
    // Padrão genérico de cidade/Araucária
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
    // INICIALIZAÇÃO DA API (Utiliza a chave do ambiente)
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const model = 'gemini-2.5-flash';

    const prompt = `
        Você é um jornalista local especializado na cidade de Araucária, Paraná, Brasil.
        
        TAREFA:
        Pesquise as notícias mais recentes (últimos 7 dias) sobre Araucária, PR.
        Selecione as 4 notícias mais relevantes e variadas (Política, Obras, Esporte, Comunidade, Policial).
        
        FORMATO DE RESPOSTA:
        Você DEVE retornar APENAS um JSON válido. Não inclua texto explicativo antes ou depois do JSON.
        
        O JSON deve ser uma lista (array) de objetos com esta estrutura exata:
        [
          {
            "title": "string",
            "summary": "string",
            "content": "string (HTML)",
            "category": "string",
            "publishDate": "string",
            "author": "string"
          }
        ]
        
        IMPORTANTE:
        Use a ferramenta Google Search para encontrar fatos reais e recentes.
    `;

    try {
        // Correção: Removemos responseMimeType e responseSchema, pois não são suportados com tools no momento.
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });

        // Extração manual do JSON da resposta de texto
        let jsonString = response.text || '[]';
        
        // Remove blocos de código markdown se existirem (```json ... ```)
        jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
        
        let rawArticles = [];
        try {
            rawArticles = JSON.parse(jsonString);
        } catch (parseError) {
            console.error("Erro ao fazer parse do JSON da IA:", parseError);
            console.log("Conteúdo recebido:", jsonString);
            // Fallback para array vazio se o parse falhar
            return [];
        }
        
        // Extração dos links de grounding (Fontes)
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        // Processamento final dos artigos
        const processedArticles: NewsArticle[] = rawArticles.map((article: any, index: number) => {
            // Tenta encontrar um link de fonte relevante nos chunks
            let sourceUrl = '';
            let sourceName = '';
            
            // Lógica simplificada para atribuir fontes (pega a primeira disponível se houver)
            if (groundingChunks.length > 0 && groundingChunks[0].web) {
                 sourceUrl = groundingChunks[0].web.uri;
                 sourceName = groundingChunks[0].web.title;
            }

            return {
                id: Date.now() + index, // ID único baseado em timestamp
                title: article.title,
                summary: article.summary,
                content: article.content,
                category: article.category,
                categoryColor: getColorForCategory(article.category),
                publishDate: article.publishDate,
                author: article.author || 'IA Araucária Informa',
                imageUrl: getImageForCategory(article.category, article.title), // Seleciona imagem baseada no tema
                sourceUrl: sourceUrl,
                sourceName: sourceName
            };
        });

        return processedArticles;

    } catch (error) {
        console.error("Erro ao buscar notícias com IA:", error);
        // Não lançamos erro para não quebrar a aplicação silenciosa, apenas retornamos vazio
        return [];
    }
};
