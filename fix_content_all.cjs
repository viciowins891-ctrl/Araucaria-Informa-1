
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Mapeamento de Correções
const updates = [
    {
        id: 1769111662,
        title: 'Obras de pavimentação transformam o Jardim Plínio',
        content: `
            <p><strong>ARAUCÁRIA</strong> - Chega de barro e poeira. Máquinas da Prefeitura iniciaram nesta semana o asfaltamento das principais vias do <strong>Jardim Plínio</strong>. A obra, uma reivindicação de mais de uma década dos moradores, promete mudar a paisagem e a rotina do bairro.</p>
            <p>O projeto contempla não apenas o pavimento asfáltico, mas também a instalação de manilhas para drenagem pluvial, meio-fio e calçadas com acessibilidade. "Era difícil sair de casa em dia de chuva, o ônibus escolar nem subia a rua. Agora vai melhorar 100%", comemora Dona Maria, moradora da região há 15 anos.</p>
            <h3>Mobilidade Urbana</h3>
            <p>A pavimentação deve facilitar também o acesso de serviços essenciais, como ambulâncias e coleta de lixo. A previsão da Secretaria de Obras é entregar as ruas prontas em até 60 dias, se as condições climáticas ajudarem.</p>
            `
    },
    {
        id: 1769112101,
        title: 'Volta às aulas: 18 mil alunos recebem novos kits escolares',
        content: `
            <p><strong>ARAUCÁRIA</strong> - O ano letivo começou com novidade na mochila para os estudantes da rede municipal. A Secretaria de Educação iniciou a entrega dos kits de material escolar e uniformes completos para os mais de 18 mil alunos das escolas e CMEIs da cidade.</p>
            <p>Cada kit é composto de acordo com a idade da criança, incluindo cadernos, lápis de cor, agenda, mochila reforçada e o novo uniforme de verão e inverno. A medida visa garantir igualdade de condições para todos os estudantes e aliviar o orçamento das famílias no início do ano.</p>
            <h3>Investimento no Futuro</h3>
            <p>"Ver todas as crianças uniformizadas e com material de qualidade dignifica a escola pública", afirmou a diretora do <strong>CAIC</strong> durante a distribuição. Pais e responsáveis podem retirar os kits diretamente nas unidades de ensino ao longo desta semana.</p>
            `
    },
    {
        id: 1769112147,
        title: 'SMMA intensifica combate à Dengue no bairro Costeira',
        content: `
            <p><strong>ARAUCÁRIA</strong> - O bairro <strong>Costeira</strong> é o foco de uma nova ação de combate à Dengue nesta semana. Agentes de endemias da Secretaria Municipal de Meio Ambiente (SMMA) estão visitando casa por casa para orientar moradores e eliminar focos do mosquito <em>Aedes aegypti</em>.</p>
            <p>O levantamento rápido indicou um aumento na presença de larvas em vasos de plantas e entulhos nos quintais da região. "A prevenção é uma responsabilidade de todos. Dez minutos por semana vistoriando o quintal são suficientes para evitar a doença", alerta o coordenador de Vigilância Ambiental.</p>
            <h3>Mutirão de Limpeza</h3>
            <p>No próximo sábado, caminhões da Prefeitura passarão recolhendo móveis velhos, pneus e objetos que possam acumular água. Os moradores devem colocar os materiais na calçada até as 8h da manhã.</p>
            `
    },
    {
        id: 1769112338,
        title: 'Feirão de Empregos do CIAR atrai centenas de candidatos',
        content: `
            <p><strong>ARAUCÁRIA</strong> - A fila dobrou a esquina no <strong>Sine de Araucária</strong> nesta sexta-feira. O motivo: um feirão de empregos promovido por empresas do <strong>Companhia de Desenvolvimento de Araucária (CIAR)</strong>, ofertando 300 vagas imediatas.</p>
            <p>As oportunidades são focadas principalmente no setor industrial, com vagas para soldador, auxiliar de produção, operador de empilhadeira e técnico em logística. O aquecimento do setor automotivo e petroquímico na região tem impulsionado a demanda por mão de obra qualificada.</p>
            <h3>Oportunidade</h3>
            <p>"Estou desempregado há seis meses, essa é a minha chance de voltar ao mercado", contou João Paulo, morador do <strong>Fazenda Velha</strong>, enquanto aguardava a entrevista. As empresas realizam a triagem e algumas contratações já saem certas no mesmo dia.</p>
            `
    },
    {
        id: 1769112325,
        title: 'Defesa Civil monitora Rio Iguaçu após chuvas intensas',
        content: `
            <p><strong>ARAUCÁRIA</strong> - As fortes chuvas dos últimos dias colocaram a Defesa Civil do município em estado de atenção. O nível do <strong>Rio Iguaçu</strong> subiu consideravelmente, exigindo monitoramento constante, especialmente nas áreas ribeirinhas do <strong>Jardim Iguaçu</strong> e região rural.</p>
            <p>Apesar do aumento do volume de água, a Defesa Civil tranquiliza a população: ainda não há risco iminente de transbordo grave, mas o alerta permanece. Equipes estão de prontidão 24 horas para atuar em caso de emergência ou necessidade de remoção preventiva de famílias.</p>
            <h3>Prevenção</h3>
            <p>A Prefeitura orienta os moradores a cadastrarem seus celulares no sistema de alerta via SMS (envie seu CEP para 40199) para receber avisos meteorológicos em tempo real. O monitoramento continuará até que as chuvas cessem e o nível do rio normalize.</p>
            `
    },
    {
        id: 1769112488,
        title: 'Semáforos inteligentes agilizam trânsito na Av. Archelau',
        content: `
            <p><strong>ARAUCÁRIA</strong> - Quem passa pela <strong>Avenida Archelau de Almeida Torres</strong> nos horários de pico já percebeu a diferença. Entrou em operação nesta semana o novo sistema de semáforos inteligentes, capaz de analisar o fluxo de veículos e ajustar o tempo de sinal verde automaticamente.</p>
            <p>O objetivo é reduzir as longas filas que se formavam no final da tarde, facilitando o retorno dos trabalhadores para casa. Segundo testes iniciais do Departamento de Trânsito, o tempo de deslocamento no trecho entre o Centro e o Costeira reduziu em cerca de 20%.</p>
            <h3>Modernização Viária</h3>
            <p>A tecnologia, que utiliza sensores e câmeras, deve ser expandida em breve para a <strong>Rodovia do Xisto</strong> e outras artérias importantes da cidade. "É mais qualidade de vida para quem antes perdia tempo parado no trânsito", destaca o diretor de Trânsito.</p>
            `
    }
];

let updatedCount = 0;

updates.forEach(update => {
    // Regex cuidadosa para encontrar o objeto pelo ID
    // Procura: id: NUMERO, (qualquer coisa até) content: `(CONTEUDO)`
    const regex = new RegExp(`({\\s*id:\\s*${update.id}[\\s\\S]*?title:\\s*)(['"].*?['"])([\\s\\S]*?content:\\s*\`)([\\s\\S]*?)(\`[\\s\\S]*?})`, 'm');

    if (regex.test(content)) {
        // Se tiver título novo definido, usa, senão mantém o grupo de captura original
        const replacementTitle = update.title ? `'${update.title}'` : '$2';

        // Substituição
        content = content.replace(regex, (match, prefix, oldTitle, mid, oldContent, suffix) => {
            const newTitle = update.title ? `'${update.title}'` : oldTitle;
            return `${prefix}${newTitle}${mid}${update.content}${suffix}`;
        });
        updatedCount++;
        console.log(`Notícia ID ${update.id} atualizada.`);
    } else {
        console.warn(`Notícia ID ${update.id} não encontrada para atualização.`);
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`Sucesso! ${updatedCount} notícias foram reescritas com conteúdo de alta qualidade.`);
} else {
    console.log('Nenhuma atualização realizada.');
}

