
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ID do Vôlei
const id = '1769253501';

// Novos Dados do jogo REAL (Araucária x ELASE)
const newTitle = 'Hoje tem decisão: Araucária Vôlei enfrenta o ELASE pela Superliga B';
const newSummary = 'Partida desta quarta-feira (24) no Ginásio Joval de Paula Souza vale a liderança e promessa de casa cheia.';
const newImageUrl = '/images/araucaria-volei-vs-elase-capa.png';
const newInternalImageUrl = '/images/araucaria-volei-spike-interna.png';

const newBody = `
        <p><strong>ARAUCÁRIA</strong> - É dia de jogão em Araucária! Nesta quarta-feira (24), o <strong>Araucária Vôlei/SMEL</strong> recebe a equipe do <strong>ELASE</strong> (SC) pela 8ª rodada da Superliga B Masculina 2025/26. A partida está marcada para as 19h30 no Ginásio Joval de Paula Souza.</p>
        
        <p>O confronto é direto na parte de cima da tabela. Vindo de uma sequência importante de treinos, o time da casa conta com o apoio da torcida para superar os catarinenses e se consolidar no G4 da competição.</p>

        <h3>Ingressos</h3>
        <p>A entrada é franca, mas a organização pede a doação de 1kg de alimento não perecível. A expectativa é de ginásio lotado, repetindo a festa bonita que a torcida araucariense tem feito nos jogos em casa.</p>

        <p>"O grupo está focado. Sabemos da qualidade do adversário, mas dentro do nosso caldeirão, quem manda é o Araucária", afirmou o técnico da equipe.</p>
    `;

// Regex para substituir o bloco inteiro
const blockRegex = /{\s*id: 1769253501,[\s\S]*?author: ['"].*?['"]\s*},/m;

const newBlock = `{
        id: 1769253501,
        title: "${newTitle}",
        summary: "${newSummary}",
        content: \`${newBody}\`,
        imageUrl: '${newImageUrl}',
        mobileImageUrl: '${newImageUrl}',
        category: 'Esporte',
        categoryColor: 'indigo',
        internalImageUrl: '${newInternalImageUrl}',
        publishDate: '2026-01-24',
        author: 'Esporte na Rede'
    },`;

if (blockRegex.test(content)) {
    content = content.replace(blockRegex, newBlock);
    fs.writeFileSync(filePath, content);
    console.log('Notícia do Vôlei atualizada com o jogo de HOJE!');
} else {
    console.error('Bloco da notícia do Vôlei não encontrado.');
}

