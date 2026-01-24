
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Identifica o bloco da notícia do Paraná-Japão pelo ID 1769250987
const id = '1769250987';

// Novo conteúdo
const newTitle = 'Programa Interconexões Paraná-Japão terá investimento de R$ 3 milhões';
const newSummary = 'Projeto fortalecerá a cooperação tecnológica e cultural entre o estado e o país asiático, com foco no desenvolvimento sustentável.';
const newImageUrl = '/images/interconexoes-parana-japao-capa.png';
const newInternalImageUrl = '/images/interconexoes-parana-japao-interna.png';

// Regex para substituir o bloco inteiro ou partes específicas. 
// Como a formatação está ruim, vamos tentar substituir campos chave.

// Substituir Título
content = content.replace(
    /title:\s*"Programa Interconexões Paraná-Japão terá investimento de R\$ 3 milhões - fappr.pr.gov.br"/,
    `title: "${newTitle}"`
);

// Substituir Summary
content = content.replace(
    /summary:\s*"[^"]*ARAUCÁRIA - Programa Interconexões[^"]*"/,
    `summary: "${newSummary}"`
);

// Substituir Content (limpeza básica)
const newBody = `
        <p><strong>ARAUCÁRIA</strong> - O Governo do Estado confirmou um aporte de R$ 3 milhões para o Programa Interconexões Paraná-Japão. A iniciativa visa fomentar o intercâmbio tecnológico e cultural, beneficiando diretamente municípios com forte presença da comunidade nipônica, como Araucária.</p>
        
        <p>O investimento será destinado à modernização de infraestrutura e criação de espaços de convivência que celebrem a união entre as duas culturas. "É um reconhecimento da importância histórica e econômica dessa parceria", afirmou representante da Fundação Araucária.</p>

        <h3>Futuro Sustentável</h3>
        <p>Além das obras físicas, o programa prevê workshops e parcerias com universidades japonesas, focando em soluções para cidades inteligentes e sustentabilidade ambiental.</p>
    `;

// O content atual é multilinha e dificil de dar match exato com regex simples por causa das quebras.
// Vamos achar o ID e substituir as props próximas.

// Estrategia: Achar o indice do ID, e substituir as linhas seguintes até achar o próximo objeto.
// Mas regex com replace é mais seguro se conseguirmos um match unico.

// Vamos substituir as URLs das imagens que são unicas (baseadas no seed do pollinations ou algo assim, mas as atuais sao URLs longas).
// As URLs atuais no arquivo (vistas no passo anterior):
// imageUrl: 'https://image.pollinations.ai/...seed=53572'
// internalImageUrl: 'https://image.pollinations.ai/...seed=12001'

// Vamos usar um replace mais genérico para este bloco específico.
const blockStart = content.indexOf(`id: ${id},`);
if (blockStart !== -1) {
    // Achar o fim deste bloco (próximo }, ou id:)
    // Mas é arriscado.

    // Vamos usar replace direto nas linhas conhecidas "sujas" dentro deste contexto?
    // Não, o contexto é global.

    // Melhor: Reconstruir o objeto limpo.

    // 1. Remove o bloco antigo
    // O bloco antigo começa em `id: 1769250987,` e vai até `author: 'Redação Squad'\n},`
    // Vamos tentar localizar isso com precisão.

    const regexBlock = /{\s*id: 1769250987,[\s\S]*?author: 'Redação Squad'\s*},/m;

    const newBlock = `{
        id: 1769250987,
        title: "${newTitle}",
        summary: "${newSummary}",
        content: \`${newBody}\`,
        imageUrl: '${newImageUrl}',
        mobileImageUrl: '${newImageUrl}',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '${newInternalImageUrl}',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },`;

    if (regexBlock.test(content)) {
        content = content.replace(regexBlock, newBlock);
        fs.writeFileSync(filePath, content);
        console.log('Notícia atualizada com sucesso!');
    } else {
        console.error('Nao foi possivel encontrar o bloco da noticia via Regex.');
        // Fallback: Tentar substituir só as imagens se o bloco falhar
    }
} else {
    console.error('ID nao encontrado.');
}

