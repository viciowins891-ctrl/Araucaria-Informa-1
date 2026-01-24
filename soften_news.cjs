
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Mapeamento de "Softening" (Tornar mais realista e menos fake news)
const updates = [
    {
        id: 3001,
        title: 'Araucária destaca-se na geração de empregos na região',
        summary: 'Setor industrial e de serviços impulsionam novas contratações no município neste trimestre.',
        content: `
            <p><strong>ARAUCÁRIA</strong> - O mercado de trabalho em Araucária segue aquecido. Dados recentes mostram um saldo positivo na criação de vagas formais, impulsionado principalmente pela retomada da produção industrial e pela abertura de novos comércios nos bairros.</p>
            <p>O <strong>Sine Municipal</strong> tem registrado uma procura constante por profissionais qualificados, especialmente nas áreas de logística e manutenção. "A diversidade da nossa economia ajuda a manter a estabilidade mesmo em momentos de oscilação nacional", avalia especialistas do setor.</p>
            <h3>Qualificação</h3>
            <p>Para quem busca uma oportunidade, a recomendação é investir em cursos técnicos. A demanda por mão de obra especializada continua alta nas grandes empresas do polo industrial (CIAR).</p>
            `
    },
    {
        id: 3002,
        title: 'Araucária avança na digitalização de serviços públicos',
        summary: 'Aplicativo da Prefeitura facilita a vida do cidadão e reduz filas em repartições.',
        content: `
            <p><strong>ARAUCÁRIA</strong> - Solicitar alvarás, consultar débitos ou agendar atendimentos ficou mais fácil. O investimento em tecnologia tem permitido que cada vez mais serviços da Prefeitura sejam acessados diretamente pelo celular, através do aplicativo "Araucária Digital".</p>
            <p>A modernização visa desburocratizar a máquina pública e oferecer mais comodidade. "O objetivo é que o cidadão só precise ir presencialmente à Prefeitura quando for estritamente necessário", explica a equipe de TI do município.</p>
            <h3>Conectividade</h3>
            <p>Além dos serviços online, o programa de inclusão digital segue expandindo o acesso à internet gratuita em praças e parques, como no <strong>Parque Cachoeira</strong>, permitindo que a população usufrua dos espaços públicos com conectividade.</p>
            `
    },
    {
        id: 102,
        title: 'Lei Orçamentária prioriza investimentos em Saúde e Obras',
        summary: 'Câmara Municipal discute as diretrizes para o orçamento do próximo ano com foco no bem-estar social.',
        content: `
            <p><strong>ARAUCÁRIA</strong> - A Câmara Municipal iniciou as discussões sobre a Lei Orçamentária Anual (LOA). A proposta enviada pelo Executivo prevê a manutenção dos investimentos prioritários em Saúde e Educação, além de garantir recursos para obras de infraestrutura em andamento.</p>
            <p>O planejamento financeiro busca equilibrar as contas públicas sem comprometer a qualidade dos serviços prestados à população. "A responsabilidade fiscal é a base para que possamos continuar investindo na cidade", destaca a relatoria da comissão de finanças.</p>
            <h3>Participação Popular</h3>
            <p>Audiências públicas serão realizadas nas próximas semanas para que a comunidade possa apresentar sugestões e acompanhar onde os recursos municipais serão aplicados.</p>
            `
    },
    {
        id: 104,
        title: 'Saúde e Educação recebem reforço no planejamento municipal',
        summary: 'Novos recursos serão destinados à manutenção de escolas e unidades básicas de saúde.',
        content: `
            <p><strong>ARAUCÁRIA</strong> - A Prefeitura anunciou um reforço no cronograma de manutenção das escolas municipais e Unidades Básicas de Saúde (UBS). O objetivo é realizar melhorias estruturais, como pintura, reparos elétricos e adequação de acessibilidade.</p>
            <p>No bairro <strong>Capela Velha</strong>, a ampliação da capacidade de atendimento das unidades escolares é uma das prioridades para acompanhar o crescimento populacional da região.</p>
            <h3>Gestão Eficiente</h3>
            <p>Os investimentos são fruto de uma gestão orçamentária focada em resultados. A expectativa é que as melhorias proporcionem um ambiente mais acolhedor e seguro para estudantes, pacientes e servidores públicos.</p>
            `
    },
    {
        id: 9001,
        title: 'Sanepar amplia rede de esgoto no bairro Iguaçu',
        summary: 'Obras de saneamento avançam para levar mais saúde e qualidade de vida aos moradores.',
        content: `
            <p><strong>ARAUCÁRIA</strong> - As obras de expansão da rede de esgoto seguem avançando no bairro <strong>Iguaçu</strong>. Equipes da Sanepar e da Prefeitura trabalham na instalação de novas tubulações que vão beneficiar centenas de famílias.</p>
            <p>O investimento em saneamento básico é fundamental para a saúde preventiva e preservação ambiental. "O acesso à rede de esgoto valoriza o imóvel e, principalmente, reduz doenças", reforça a coordenação de obras.</p>
            <h3>Transtornos Temporários</h3>
            <p>Durante a execução dos trabalhos, algumas ruas podem sofrer interdições parciais. A orientação é que motoristas e pedestres redobrem a atenção à sinalização nos trechos em obras.</p>
            `
    },
    {
        id: 3003,
        title: 'Hospital Municipal moderniza parque tecnológico',
        summary: 'Novos equipamentos de diagnóstico por imagem chegam para agilizar atendimentos.',
        content: `
            <p><strong>ARAUCÁRIA</strong> - O Hospital Municipal de Araucária (HMA) recebeu novos equipamentos para o setor de diagnóstico por imagem. A atualização tecnológica visa melhorar a precisão dos exames e reduzir o tempo de espera dos pacientes.</p>
            <p>Com a modernização, exames de Raio-X e tomografias ganham em qualidade e rapidez. "É um investimento direto na capacidade de resposta do nosso sistema de saúde", afirma a direção do hospital.</p>
            <h3>Atendimento Regional</h3>
            <p>O HMA é referência para diversas especialidades e atende moradores de todos os bairros, do <strong>Centro</strong> à área rural como <strong>Guajuvira</strong>, garantindo acesso universal a serviços de média complexidade.</p>
            `
    }
];

let updatedCount = 0;

updates.forEach(update => {
    // Regex para encontrar o objeto pelo ID e substituir Título, Summary e Content
    // A regex captura: (id: NUM,) ... (title: "...",) (summary: "...",) (content: `...`,)
    // Isso é complexo num replace só, faremos em partes ou com regex bem flexível.

    // Estratégia: Encontrar o bloco do ID e substituir as chaves específicas dentro dele é arriscado com regex simples.
    // Vamos substituir o bloco inteiro das chaves se estiverem próximas, ou usar uma regex que pegue do ID até o CONTENT.

    const finder = new RegExp(`(id:\\s*${update.id},[\\s\\S]*?title:\\s*)(['"].*?['"])([\\s\\S]*?summary:\\s*)(['"].*?['"]|[\\s\\S]*?)(,[\\s\\S]*?content:\\s*\`)([\\s\\S]*?)([\`])`, 'm');

    if (finder.test(content)) {
        content = content.replace(finder, (match, preTitle, oldTitle, preSum, oldSum, preCont, oldCont, endCont) => {
            return `${preTitle}'${update.title}'${preSum}'${update.summary}'${preCont}${update.content}${endCont}`;
        });
        updatedCount++;
        console.log(`Notícia ID ${update.id} (Tornada Realista) atualizada.`);
    } else {
        // Tentar regex alternativa para aspas doubles no summary se falhar
        const finder2 = new RegExp(`(id:\\s*${update.id},[\\s\\S]*?title:\\s*)(['"].*?['"])([\\s\\S]*?summary:\\s*)(\`[\\s\\S]*?\`)(,[\\s\\S]*?content:\\s*\`)([\\s\\S]*?)([\`])`, 'm');
        if (finder2.test(content)) {
            content = content.replace(finder2, (match, preTitle, oldTitle, preSum, oldSum, preCont, oldCont, endCont) => {
                return `${preTitle}'${update.title}'${preSum}'${update.summary}'${preCont}${update.content}${endCont}`;
            });
            updatedCount++;
            console.log(`Notícia ID ${update.id} (Tornada Realista - Variante) atualizada.`);
        } else {
            console.warn(`Notícia ID ${update.id} não pôde ser atualizada (Regex mismatch).`);
        }
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`Sucesso! ${updatedCount} notícias foram ajustadas para o padrão 'Sem Mentiras/Realista'.`);
} else {
    console.log('Nenhuma atualização realizada.');
}

