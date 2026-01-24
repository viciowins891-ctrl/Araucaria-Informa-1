const fs = require('fs');

const filePath = 'c:\\Users\\humbe\\.gemini\\antigravity\\scratch\\data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Novo conteúdo do artigo IFPR
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

const newSummary = "ARAUCÁRIA - O Ministério da Educação autorizou oficialmente as obras de melhorias no campus do Instituto Federal do Paraná (IFPR) em Araucária. O projeto contempla reformas estruturais, modernização de laboratórios e ampliação das áreas de convivência.";

// Encontrar o artigo do IFPR (id: 1769118198)
const regex = /(\s+id: 1769118198,[\s\S]*?summary: )"[^"]*"(,[\s\S]*?content: )"[^"]*"(,)/;

content = content.replace(regex, (match, p1, p2, p3) => {
    return p1 + `"${newSummary}"` + p2 + `\`${newContent}\`` + p3;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Artigo IFPR atualizado com sucesso!');
