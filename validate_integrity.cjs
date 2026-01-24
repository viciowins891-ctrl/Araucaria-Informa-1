
const fs = require('fs');

try {
    const content = fs.readFileSync('data.ts', 'utf8');

    // Extração "bruta" para análise (já que não podemos importar TS nativamente sem transpile complexo aqui)
    // Vamos extrair o array newsArticles na força bruta
    const start = content.indexOf('export const newsArticles: NewsArticle[] = [');
    const end = content.indexOf('export const events: Event[] = [');

    if (start === -1 || end === -1) throw new Error("Marcadores de início/fim não encontrados.");

    let block = content.substring(start, end);
    block = block.replace('export const newsArticles: NewsArticle[] = ', '');
    // remove o último ; e ]
    block = block.trim();
    while (block.endsWith(';') || block.endsWith(']')) {
        block = block.slice(0, -1).trim();
    }
    block += ']'; // fecha o array

    // Agora temos algo parecido com JSON, mas é JS (tem chaves sem aspas, template strings ` `)
    // Validar com regex IDs duplicados é mais seguro que tentar dar eval em código TS desconhecido.

    const idRegex = /id:\s*(\d+)/g;
    let match;
    const ids = [];
    const duplicates = [];

    while ((match = idRegex.exec(block)) !== null) {
        const id = match[1];
        if (ids.includes(id)) {
            duplicates.push(id);
        }
        ids.push(id);
    }

    console.log(`Total de IDs encontrados: ${ids.length}`);
    if (duplicates.length > 0) {
        console.error("ERRO CRÍTICO: IDs DUPLICADOS ENCONTRADOS!");
        console.error(duplicates);
    } else {
        console.log("Nenhum ID duplicado encontrado. Integridade básica OK.");
    }

    // Verificar se a primeira notícia é a do Vôlei (ID 1769253501)
    if (ids.length > 0 && ids[0] !== '1769253501') {
        console.warn(`AVISO: A primeira notícia NÃO é a do Vôlei (ID esperado: 1769253501, Encontrado: ${ids[0]}). A ordenação pode estar errada.`);
    } else {
        console.log("Verificação de Topo: OK (Vôlei está em primeiro).");
    }

} catch (e) {
    console.error("Erro na análise:", e.message);
}
