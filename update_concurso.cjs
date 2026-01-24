
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ID da notícia
const id = '1769250610';

// Novos Dados
const newTitle = 'Concurso Araucária PR: FAFIPA é a banca organizadora';
const newSummary = 'Fundação de Apoio ao Câmpus de Paranavaí foi escolhida para organizar o próximo concurso público do município. Edital deve sair em breve.';
const newImageUrl = '/images/concurso-araucaria-banca-capa.png';
const newInternalImageUrl = '/images/concurso-araucaria-banca-interna.png';
const newAuthor = 'Concursos BR';

const newBody = `
        <p><strong>ARAUCÁRIA</strong> - A Prefeitura de Araucária definiu a banca organizadora do próximo concurso público municipal. A escolhida foi a Fundação de Apoio ao Câmpus de Paranavaí (FAFIPA), instituição com vasta experiência em certames no estado do Paraná.</p>
        
        <p>A contratação marca um passo importante para a realização do concurso, que é aguardado com grande expectativa. Segundo fontes ligadas à administração, o objetivo é preencher vagas em diversas áreas, reforçando o quadro de servidores para melhorar o atendimento à população.</p>

        <h3>O que esperar da prova?</h3>
        <p>Especialistas em concursos alertam que a FAFIPA costuma elaborar provas com questões objetivas e textos diretos. "É o momento de focar na resolução de questões anteriores da banca para entender o perfil de cobrança", recomenda Ana Silva, consultora pedagógica.</p>

        <p>O edital oficial, com o detalhamento das vagas, salários e cronograma, deve ser publicado nas próximas semanas no Diário Oficial do Município.</p>
    `;

// Vamos substituir o bloco inteiro para garantir limpeza total
// O bloco começa com id: 1769250610 e termina no }, antes do proximo.

// Regexp para capturar o bloco
const blockRegex = /{\s*id: 1769250610,[\s\S]*?author: 'Redação Squad'\s*},/m;

const newBlock = `{
        id: 1769250610,
        title: "${newTitle}",
        summary: "${newSummary}",
        content: \`${newBody}\`,
        imageUrl: '${newImageUrl}',
        mobileImageUrl: '${newImageUrl}',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '${newInternalImageUrl}',
        publishDate: '2026-01-24',
        author: '${newAuthor}'
    },`;

if (blockRegex.test(content)) {
    content = content.replace(blockRegex, newBlock);
    fs.writeFileSync(filePath, content);
    console.log('Notícia do Concurso atualizada com sucesso!');
} else {
    console.error('Bloco da notícia do Concurso não encontrado.');
}

