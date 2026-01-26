
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
const backupPath = path.join(__dirname, 'data.ts.bak');

// Backup
if (!fs.existsSync(backupPath)) {
    try {
        fs.copyFileSync(filePath, backupPath);
        console.log("Backup criado: data.ts.bak");
    } catch (e) { }
}

const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);
const outputLines = [];
let insideNewsArray = false;
let currentBlock = [];
let currentArticleTitle = null;
const processedTitles = new Set();
let removedCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detectar início do array de notícias
    if (line.includes('export const newsArticles: NewsArticle[] = [')) {
        insideNewsArray = true;
        outputLines.push(line);
        continue;
    }

    if (insideNewsArray) {
        // Detectar FIM do array
        if (line.includes('];')) {
            // Processar último bloco pendente
            if (currentBlock.length > 0) {
                if (currentArticleTitle && !processedTitles.has(currentArticleTitle)) {
                    processedTitles.add(currentArticleTitle);
                    outputLines.push(...currentBlock);
                } else if (currentArticleTitle) {
                    console.log(`🗑️ Removida duplicata (fim): "${currentArticleTitle.substring(0, 30)}..."`);
                    removedCount++;
                } else {
                    // Bloco sem título? Mantém por segurança
                    outputLines.push(...currentBlock);
                }
            }
            insideNewsArray = false;
            currentBlock = [];
            currentArticleTitle = null;
            outputLines.push(line);
            continue;
        }

        // Detectar INÍCIO de um objeto {
        // Assume que cada notícia começa com um { na indentação padrão
        if (trimmed.startsWith('{') && (line.includes('id:') || (lines[i + 1] && lines[i + 1].includes('id:')))) {
            // Processar bloco ANTERIOR se houver
            if (currentBlock.length > 0) {
                if (currentArticleTitle && !processedTitles.has(currentArticleTitle)) {
                    processedTitles.add(currentArticleTitle);
                    outputLines.push(...currentBlock);
                } else if (currentArticleTitle) {
                    console.log(`🗑️ Removida duplicata: "${currentArticleTitle.substring(0, 30)}..."`);
                    removedCount++;
                } else {
                    // Bloco sem título?
                    outputLines.push(...currentBlock);
                }
            }
            // Iniciar NOVO bloco
            currentBlock = [line];
            currentArticleTitle = null;

            // Tentar extrair título
            const titleMatch = line.match(/title:\s*['"`](.*?)['"`]/);
            if (titleMatch) currentArticleTitle = titleMatch[1];

        } else if (currentBlock.length > 0) {
            // Estamos DENTRO de um bloco
            currentBlock.push(line);
            if (!currentArticleTitle) {
                const titleMatch = line.match(/title:\s*['"`](.*?)['"`]/);
                if (titleMatch) currentArticleTitle = titleMatch[1];
            }
        } else {
            // Linhas soltas dentro do array (comentários, vazios)
            outputLines.push(line);
        }

    } else {
        // Fora do array newsArticles
        outputLines.push(line);
    }
}

fs.writeFileSync(filePath, outputLines.join('\n'));
console.log(`✅ Deduplicação concluída. ${removedCount} duplicatas removidas.`);
