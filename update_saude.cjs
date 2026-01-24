
const fs = require('fs');

const filePath = 'data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Bloco Novo Otimizado
const newBlock = `    {
        id: 1769252001,
        title: "Saúde de Araucária bate recorde com 150 mil atendimentos",
        summary: "Secretaria de Saúde divulga balanço positivo com aumento de 50 mil agendamentos em comparação ao ano anterior.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - A saúde pública do município alcançou uma marca histórica neste semestre. Segundo dados divulgados hoje pela Secretaria Municipal de Saúde (SMSA), foram realizados mais de 149.186 procedimentos entre janeiro e julho.</p>
        
        <p>O número representa um aumento de quase 50 mil atendimentos em relação ao mesmo período do ano passado. "É o resultado da ampliação do horário das UBS e da contratação de novos médicos", celebra a secretária da pasta.</p>

        <h3>Foco na Prevenção</h3>
        <p>Além das consultas curativas, o relatório aponta crescimento nos programas de prevenção, como o Hiperdia (hipertensão e diabetes) e pré-natal, garantindo mais qualidade de vida a longo prazo para a população.</p>
        \`,
        imageUrl: '/images/saude-recorde-150mil.png',
        mobileImageUrl: '/images/saude-recorde-150mil.png',
        category: 'Saúde',
        categoryColor: 'green',
        internalImageUrl: '/images/saude-recorde-150mil.png',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },`;

// Regex para encontrar o bloco antigo
const regex = /\{\s*id: 1769252001,[\s\S]*?author: 'Redação Squad'\s*\}/;

if (regex.test(content)) {
    content = content.replace(regex, newBlock);
    fs.writeFileSync(filePath, content);
    console.log('Fixed Saude news block with real photo.');
} else {
    console.error('Could not find Saude news block.');
}
