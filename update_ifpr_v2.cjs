const fs = require('fs');

const filePath = 'c:\\Users\\humbe\\.gemini\\antigravity\\scratch\\data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Novo summary
const newSummary = "ARAUCÁRIA - O Ministério da Educação autorizou oficialmente as obras de melhorias no campus do Instituto Federal do Paraná (IFPR) em Araucária. O projeto contempla reformas estruturais, modernização de laboratórios e ampliação das áreas de convivência.";

// Novo content com a imagem embutida
const newContent = `
        <p><strong>ARAUCÁRIA</strong> - O Ministério da Educação autorizou oficialmente as obras de melhorias no campus do Instituto Federal do Paraná (IFPR) em Araucária. O investimento faz parte de um pacote de modernização da rede federal de ensino técnico e profissionalizante no Paraná.</p>
        
        <p>As obras contemplam reformas estruturais nos prédios existentes, modernização de laboratórios de informática e eletrônica, ampliação das áreas de convivência estudantil e melhorias na acessibilidade do campus. O projeto prevê também a construção de novos espaços para atividades práticas e workshops.</p>

        <figure class="my-8">
            <img src="/images/ifpr-pedreiro.png" alt="Operários trabalhando na construção do IFPR Araucária" class="w-full rounded-xl shadow-lg" />
            <figcaption class="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">Obras de modernização do campus IFPR Araucária em andamento</figcaption>
        </figure>

        <h3>Investimento na Educação Profissional</h3>
        <p>Segundo a direção do IFPR, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas do Ministério da Educação. A expectativa é que as obras sejam concluídas ainda em 2026, permitindo que mais estudantes sejam atendidos com infraestrutura de qualidade.</p>

        <p>"É uma mudança significativa para nossa comunidade educacional", afirmou a direção do campus. Com a conclusão desta etapa, novos cursos técnicos poderão ser oferecidos, fortalecendo a formação profissional dos jovens de Araucária e região metropolitana de Curitiba.</p>

        <h3>Impacto Regional</h3>
        <p>O IFPR Araucária é referência em ensino técnico na região, oferecendo cursos gratuitos de qualidade em áreas como Informática, Eletrônica, Mecânica e Administração. A ampliação da infraestrutura deve atrair mais investimentos educacionais para o município, consolidando Araucária como polo de educação profissional no Paraná.</p>
    `;

// Encontrar o índice do artigo IFPR
const startMarker = 'id: 1769118198,';
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
    console.error('❌ Artigo IFPR não encontrado!');
    process.exit(1);
}

// Encontrar o final do objeto (próximo '},')
let endIndex = content.indexOf('\n    },', startIndex);
if (endIndex === -1) {
    console.error('❌ Fim do artigo não encontrado!');
    process.exit(1);
}
endIndex += 6; // Inclui '\n    },'

// Extrair o artigo atual
const currentArticle = content.substring(startIndex - 8, endIndex); // -8 para pegar o '    {' antes do id

// Criar o novo artigo
const newArticle = `    {
        id: 1769118198,
        title: "Ministro da Educação autoriza obras de melhorias no IFPR Araucária",
        summary: \`${newSummary}\`,
        content: \`${newContent}\`,
        imageUrl: '/images/ifpr-obras-capa.png',
        mobileImageUrl: '/images/ifpr-obras-capa.png',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/ifpr-obras-interna.png',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },`;

// Substituir
content = content.substring(0, startIndex - 8) + newArticle + content.substring(endIndex);

// Salvar
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Artigo IFPR atualizado com sucesso!');
console.log(`📝 Summary: ${newSummary.substring(0, 50)}...`);
console.log(`📝 Content length: ${newContent.length} chars`);
