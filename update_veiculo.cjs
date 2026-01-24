
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ID da notícia do veículo furtado
const id = '1769250568';

// Novos Dados
const newTitle = 'Guarda Municipal recupera em Araucária veículo furtado em Curitiba';
const newSummary = 'Ação rápida das equipes de segurança localizou o automóvel em residência suspeita; uma pessoa foi detida para averiguação.';
const newImageUrl = '/images/veiculo-furtado-araucaria-capa.png';
const newInternalImageUrl = '/images/veiculo-furtado-araucaria-interna.png';
const newAuthor = 'Segurança em Pauta';

const newBody = `
        <p><strong>ARAUCÁRIA</strong> - Um veículo com alerta de furto registrado em Curitiba foi recuperado nesta manhã pela Guarda Municipal de Araucária. O automóvel estava escondido no quintal de uma residência em um bairro da região.</p>
        
        <p>A operação teve início após denúncias anônimas sobre movimentação suspeita no local. Ao chegarem ao endereço, os agentes confirmaram, através da placa, que se tratava do carro subtraído no dia anterior na capital.</p>

        <h3>Ação Policial</h3>
        <p>Durante a abordagem, um homem que estava na residência foi encaminhado à delegacia para prestar esclarecimentos. "A integração entre as forças de segurança e a comunidade é fundamental para combater esse tipo de crime", destacou o comandante da operação.</p>

        <p>O veículo passará por perícia antes de ser devolvido ao proprietário.</p>
    `;

// Regex para substituir o bloco inteiro
const blockRegex = /{\s*id: 1769250568,[\s\S]*?author: 'Redação Squad'\s*},/m;

const newBlock = `{
        id: 1769250568,
        title: "${newTitle}",
        summary: "${newSummary}",
        content: \`${newBody}\`,
        imageUrl: '${newImageUrl}',
        mobileImageUrl: '${newImageUrl}',
        category: 'Segurança',
        categoryColor: 'red',
        internalImageUrl: '${newInternalImageUrl}',
        publishDate: '2026-01-24',
        author: '${newAuthor}'
    },`;

if (blockRegex.test(content)) {
    content = content.replace(blockRegex, newBlock);
    fs.writeFileSync(filePath, content);
    console.log('Notícia do Veículo Furtado atualizada com sucesso!');
} else {
    console.error('Bloco da notícia do Veículo Furtado não encontrado.');
}

