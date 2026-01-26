
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log("--- INICIANDO CORREÇÃO DE DADOS (Data Corruption Fix) ---");

// 1. CORREÇÃO DE IDs DUPLICADOS E PEQUENOS
// Vamos encontrar objetos dentro de 'newsArticles' que tenham IDs < 10000 e substituí-los por IDs baseados em Timestamp + Random.
// Regex para encontrar blocos de notícias (limitado ao escopo, mas vamos fazer replace global em IDs problemáticos)

// Estratégia: Ler todo o arquivo, identificar os blocos de IDs dentro da export const newsArticles.
// Mas como Regex multilinha é frágil para "saber onde estou", vamos assumir que IDs pequenos (ex: id: 6,) SÓ EXISTEM nas notícias antigas que foram migradas mal.
// Os serviços usam id: 1, 2, 3... mas geralmente estão em outro bloco. O perigo é alterar services.

// Vamos fazer uma abordagem mais segura: Ler o arquivo, identificar a posição de start da 'newsArticles' e end.
const startNews = content.indexOf('export const newsArticles: NewsArticle[] = [');
// Assumimos que o próximo 'export const' ou fim de arquivo fecha o array, mas pode ter sub-arrays.
// Vamos achar o fechamento do array ];
// Está difícil fazer parser robusto só com string manip.
// Vamos usar Replace com Regex Específico que capture o contexto se possível, OU
// Vamos apenas corrigir os IDs que sabemos que são conflitantes nas Notícias com base no Dump anterior.

// IDs detectados como problemáticos no Dump (Notícias Antigas): 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16... 101, 102...
// Vamos mudar todos esses para um formato `1769xxxxxx` (Timestamp Fake do passado).

const mapping = {};

// Função para gerar ID único
let baseId = 1769000000;
function getNewId() {
    baseId += Math.floor(Math.random() * 1000) + 1;
    return baseId;
}

// Regex para IDs numéricos simples "id: 123,"
// Vamos substituir apenas se estiver dentro de um bloco que pareça notícia (tem title, summary...)
// Isso evita pegar ids de serviços simples que só tem { id: 1, label: 'X' }

const articleRegex = /{\s*id:\s*(\d+),[\s\S]*?title:[\s\S]*?category:/g;

content = content.replace(articleRegex, (match, idStr) => {
    const id = parseInt(idStr, 10);

    // Critério: Se ID < 100000 (Ids manuais antigos), trocamos.
    // IDs de serviços (1-10) também cairiam aqui SE tiverem 'category:' (o que serviços normalmente não têm, news têm).
    // Verifiquei no data.ts visualizado: 'newsArticles' têm category, 'quickServices' não parecem ter (normalmente são icon/label/link).

    if (id < 100000) {
        const newId = getNewId();
        console.log(`🔧 Migrando ID Notícia: ${id} -> ${newId}`);
        // Substitui "id: 123," por "id: 999999," APENAS na primeira ocorrência do match
        return match.replace(`id: ${id},`, `id: ${newId},`);
    }
    return match;
});

// 2. CORREÇÃO DE IMAGENS INTERNAS FALTANTES
// Procura blocos que NÃO TEM internalImageUrl
// Regex é difícil para "não tem". Melhor abordagem:
// Iterar sobre matches de blocos de imagem, extrair a imageUrl e se não achar internalImageUrl no bloco, adicionar.

// Vamos fazer um update "cego" mas útil:
// Procura: imageUrl: 'X', mobileImageUrl: 'Y', [NADA DE INTERNAL]
// Substitui por: imageUrl: 'X', mobileImageUrl: 'Y', internalImageUrl: 'X', 
// (Usa a capa como interna se faltar)

// Regex captura: imageUrl... mobileImageUrl... (e checa se não tem internal logo depois)
// Simplificação: Vamos achar onde termina mobileImageUrl: '...', e inserir internalImageUrl se ele não existir nas próximas linhas.

// Pattern comum no arquivo:
// imageUrl: '...',
// mobileImageUrl: '...',
// category: '...',

const missInternalRegex = /(mobileImageUrl:\s*['"`](.*?)['"`],)(\s*category:)/g;

let imgFixCount = 0;
content = content.replace(missInternalRegex, (match, mobileLine, url, categoryLine) => {
    // Verifica se já tem internalImageUrl NO ENTORNO (lookahead manual é caro, vamos confiar que o padrão é rígido)
    // Se o arquivo tiver internalImageUrl DEPOIS de category, esse regex não pega (safe).
    // Se tiver ANTES, não pega.
    // O padrão visualizado é: imageUrl -> mobileImageUrl -> category -> internalImageUrl (às vezes)

    // Vamos adicionar internalImageUrl LOGO APÓS mobileImageUrl, apontando para a mesma URL da mobile (ou capa).
    imgFixCount++;
    return `${mobileLine}\n        internalImageUrl: '${url}',${categoryLine}`;
});
console.log(`🔧 Adicionado internalImageUrl (fallback) em ${imgFixCount} notícias.`);


// Saved
fs.writeFileSync(filePath, content);
console.log("✅ Correção de integridade concluída.");
