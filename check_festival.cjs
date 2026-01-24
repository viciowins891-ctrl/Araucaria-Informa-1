
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

const title = '7º Festival da Canção abre inscrições para talentos locais';
const hasTitle = content.includes(title);
const hasImage1 = content.includes('/images/festival-cancao-inscricoes-capa.png');
const hasImage2 = content.includes('/images/festival-cancao-palco-interna.png');

console.log(`Título encontrado: ${hasTitle}`);
console.log(`Imagem Capa encontrada: ${hasImage1}`);
console.log(`Imagem Interna encontrada: ${hasImage2}`);

if (hasTitle && hasImage1 && hasImage2) {
    console.log('ALTERAÇÃO CONFIRMADA COM SUCESSO.');
} else {
    console.error('ALGO ESTÁ FALTANDO.');
}
