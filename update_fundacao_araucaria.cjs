const fs = require('fs');

const filePath = 'c:\\Users\\humbe\\.gemini\\antigravity\\scratch\\data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Novo summary
const newSummary = "ARAUCÁRIA - A Fundação Araucária anunciou um investimento de R$ 53,1 milhões para fortalecer os Institutos Nacionais de Ciência e Tecnologia (INCTs) sediados no Paraná. O aporte visa impulsionar pesquisas de ponta e consolidar o estado como polo de inovação científica.";

// Novo content com a imagem embutida
const newContent = `
        <p><strong>ARAUCÁRIA</strong> - A Fundação Araucária anunciou um investimento histórico de R$ 53,1 milhões destinado ao fortalecimento dos Institutos Nacionais de Ciência e Tecnologia (INCTs) sediados no Paraná. O aporte representa um marco para a pesquisa científica no estado e reforça o compromisso com a inovação tecnológica.</p>
        
        <p>Os recursos serão distribuídos entre diversos INCTs paranaenses que desenvolvem pesquisas em áreas estratégicas como biotecnologia, nanotecnologia, energias renováveis e ciências da saúde. O investimento contempla infraestrutura laboratorial, bolsas de pesquisa e equipamentos de última geração.</p>

        <figure class="my-8">
            <img src="/images/fundacao-araucaria-interna.png" alt="Laboratório de pesquisa da Fundação Araucária" class="w-full rounded-xl shadow-lg" />
            <figcaption class="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">Pesquisadores trabalham em laboratório de ponta financiado pela Fundação Araucária</figcaption>
        </figure>

        <h3>Impacto na Ciência Paranaense</h3>
        <p>Segundo a direção da Fundação Araucária, o investimento posiciona o Paraná como referência nacional em pesquisa científica. "Este é um investimento no futuro do nosso estado. Os INCTs são centros de excelência que geram conhecimento, formam recursos humanos qualificados e desenvolvem soluções inovadoras para desafios da sociedade", destacou a instituição.</p>

        <p>Os INCTs beneficiados atuam em parceria com universidades federais e estaduais do Paraná, promovendo a integração entre academia, setor produtivo e sociedade. A expectativa é que os recursos impulsionem a produção científica e atraiam novos investimentos para o estado.</p>

        <h3>Fortalecimento da Pesquisa Regional</h3>
        <p>O investimento da Fundação Araucária reforça o papel estratégico do Paraná no cenário científico nacional. Com laboratórios modernos e equipes multidisciplinares, os INCTs paranaenses desenvolvem pesquisas que contribuem para o avanço tecnológico e a competitividade do Brasil no mercado global de inovação.</p>
    `;

// Encontrar o índice do artigo da Fundação Araucária
const startMarker = 'id: 1769117661,';
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
    console.error('❌ Artigo da Fundação Araucária não encontrado!');
    process.exit(1);
}

// Encontrar o final do objeto (próximo '},')
let endIndex = content.indexOf('\n    },', startIndex);
if (endIndex === -1) {
    console.error('❌ Fim do artigo não encontrado!');
    process.exit(1);
}
endIndex += 6; // Inclui '\n    },'

// Criar o novo artigo
const newArticle = `    {
        id: 1769117661,
        title: "Fundação Araucária investe R$ 53,1 milhões no fortalecimento de INCTs sediados no Paraná",
        summary: \`${newSummary}\`,
        content: \`${newContent}\`,
        imageUrl: '/images/fundacao-araucaria-capa.png',
        mobileImageUrl: '/images/fundacao-araucaria-capa.png',
        category: 'Ciência',
        categoryColor: 'purple',
        internalImageUrl: '/images/fundacao-araucaria-interna.png',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },`;

// Substituir
content = content.substring(0, startIndex - 8) + newArticle + content.substring(endIndex);

// Salvar
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Artigo da Fundação Araucária atualizado com sucesso!');
console.log(`📝 Summary: ${newSummary.substring(0, 60)}...`);
console.log(`📝 Content length: ${newContent.length} chars`);
console.log(`🖼️ Imagem capa: /images/fundacao-araucaria-capa.png`);
console.log(`🖼️ Imagem interna: /images/fundacao-araucaria-interna.png`);
