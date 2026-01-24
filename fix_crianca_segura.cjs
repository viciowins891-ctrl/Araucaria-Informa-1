
const fs = require('fs');

const filePath = 'data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Bloco Novo Limpo
const newBlock = `    {
        id: 1769252002,
        title: "Araucária lança 'Programa Criança Segura' nas escolas",
        summary: "Iniciativa pioneira visa fortalecer a proteção de crianças e adolescentes nas redes pública e privada de ensino.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - A Prefeitura lançou nesta manhã o "Programa Criança Segura", um pacote de medidas para aumentar a segurança nas escolas. A ação integra Guarda Municipal, Polícia Militar e comunidade escolar.</p>
        
        <p>O programa inclui a instalação de novos botões de pânico, treinamento para professores e palestras educativas para os alunos sobre segurança digital e comportamento preventivo.</p>

        <h3>Rede Unificada</h3>
        <p>O diferencial do projeto é a abrangência: escolas municipais, estaduais e até particulares participarão da rede de proteção, criando um cinturão de segurança em todo o município.</p>
        \`,
        imageUrl: '/images/crianca-segura-capa.png',
        mobileImageUrl: '/images/crianca-segura-capa.png',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/crianca-segura-botao-interna.png',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },`;

// Regex que captura o bloco antigo (com indentação louca)
// id: 1769252002 ... até author: 'Redação Squad' ... },
const regex = /\{\s*id: 1769252002,[\s\S]*?author: 'Redação Squad'\s*\}/;

if (regex.test(content)) {
    content = content.replace(regex, newBlock);
    fs.writeFileSync(filePath, content);
    console.log('Fixed Criança Segura news block with new images and strict formatting.');
} else {
    console.error('Could not find Criança Segura block pattern.');
    // Debug
    const idx = content.indexOf('1769252002');
    console.log('Context around ID:', content.substring(idx, idx + 200));
}
