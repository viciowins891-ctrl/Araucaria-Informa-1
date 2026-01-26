
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log("--- INICIANDO PREENCHIMENTO DE CONTEÚDO VAZIO ---");

// Regex para capturar blocos com content vazio ou curto
// content: `...`
// Vamos procurar content: ``, ou content: `...` (muito curto)

// Estratégia: Iterar sobre todos os blocos, e se o content for curto, substituir por um texto gerado baseado no summary.

const blockRegex = /{\s*id:\s*(\d+)[\s\S]*?title:\s*['"`]([\s\S]*?)['"`][\s\S]*?summary:\s*['"`]([\s\S]*?)['"`][\s\S]*?content:\s*`([\s\S]*?)`/g;

let fixedCount = 0;

content = content.replace(blockRegex, (match, id, title, summary, currentContent) => {
    if (currentContent.length < 50) {
        console.log(`📝 Gerando conteúdo para ID ${id}: "${title.substring(0, 30)}..."`);

        const newContent = `
        <p><strong>ARAUCÁRIA</strong> - ${summary}</p>
        <p>Esta notícia está sendo atualizada pela nossa equipe de reportagem para trazer mais detalhes sobre o ocorrido.</p>
        <h3>Mais Informações</h3>
        <p>Fique atento às próximas atualizações do Araucária Informa para acompanhar o desenrolar desta pauta. A relevância deste tema para a comunidade reforça nosso compromisso com a informação precisa e ágil.</p>
        `;

        // Substitui o content antigo pelo novo no match
        // Cuidado: replace string dentro do match pode ser perigoso se tiver repetido. 
        // Vamos reconstruir a parte do content apenas.
        return match.replace(`content: \`${currentContent}\``, `content: \`${newContent}\``);
    }
    return match;
});

if (fixedCount > 0 || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Conteúdo preenchido em notícias vazias.`);
} else {
    console.log("Nenhuma notícia precisou de preenchimento.");
}
