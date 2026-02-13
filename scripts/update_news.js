const fs = require('fs');
const path = require('path');

const currentDataPath = path.resolve('data.ts');
const fileContent = fs.readFileSync(currentDataPath, 'utf-8');

// 1. Pegar Header
const headerToken = 'export const newsArticles: NewsArticle[] = [';
const headerEndIndex = fileContent.indexOf(headerToken);
const header = fileContent.substring(0, headerEndIndex + headerToken.length);

// 2. Definir 10 Novas Notícias
const newNews = `
    {
        id: 1771000010,
        title: "CPI do Transporte: Câmara investiga acordo milionário",
        summary: "Comissão Processante apura contrato de R$ 31 milhões da Prefeitura. Prefeito é alvo da investigação.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - A Câmara Municipal de Araucária instaurou uma Comissão Processante (CPI) para investigar um acordo de R$ 31 milhões firmado entre a Prefeitura e uma empresa de transporte coletivo. A denúncia aponta supostas irregularidades no contrato emergencial, que teria sido assinado sem o devido processo licitatório.</p>
        <p>O prefeito Luiz Gustavo Botogoski nega as acusações e afirma que o acordo visava garantir a continuidade do serviço de ônibus na cidade, evitando uma paralisação que prejudicaria milhares de trabalhadores. "Todas as decisões foram tomadas com base em pareceres jurídicos e visando o interesse público", declarou em nota oficial.</p>
        <h3>Próximos Passos</h3>
        <p>A comissão terá 90 dias para ouvir testemunhas, analisar documentos e apresentar um relatório final, que poderá recomendar a cassação do mandato do chefe do executivo ou o arquivamento da denúncia. A população promete acompanhar de perto as sessões.</p>
        \`,
        imageUrl: '/images/news_budget.png',
        mobileImageUrl: '/images/news_budget.png',
        internalImageUrl: '/images/camara_araucaria_internal_final.png',
        category: 'Política',
        categoryColor: 'purple',
        publishDate: '2026-02-13',
        author: 'Redação Política'
    },
    {
        id: 1771000009,
        title: "Violência no Terminal Central assusta passageiros",
        summary: "Briga entre adolescentes termina com dois feridos no início da semana. Guarda Municipal reforça patrulhamento.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - Um episódio de violência chocou quem passava pelo Terminal Central de Araucária nesta segunda-feira (09). Uma discussão entre grupos de adolescentes evoluiu para agressão física, resultando em dois jovens feridos por arma branca. As vítimas foram socorridas pelo SIATE e encaminhadas ao Hospital Municipal sem risco de morte.</p>
        <p>A Guarda Municipal agiu rápido e apreendeu um menor suspeito de iniciar o tumulto. O caso reacende o debate sobre a segurança no transporte público.</p>
        <h3>Segurança Reforçada</h3>
        <p>Em resposta, a Secretaria de Segurança Pública anunciou que dobrará o efetivo da GM nos terminais nos horários de pico e instalará novas câmeras de monitoramento com reconhecimento facial para inibir a ação de infratores.</p>
        \`,
        imageUrl: '/images/gm_viaturas_cover_v2.png',
        mobileImageUrl: '/images/gm_viaturas_cover_v2.png',
        internalImageUrl: '/images/gma_viaturas_manual.png',
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: '2026-02-10',
        author: 'Araucária Alerta'
    },
    {
        id: 1771000008,
        title: "Tragédia na Rodovia do Xisto: Motociclista perde a vida",
        summary: "Acidente no km 160 da BR-476 mobilizou equipes de resgate neste fim de semana.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - Um grave acidente registrado na manhã deste domingo (08) tirou a vida de um motociclista de 35 anos na Rodovia do Xisto (BR-476), próximo à divisa com a Lapa. Segundo a Polícia Rodoviária Federal, a moto colidiu frontalmente com um veículo de passeio que tentava uma ultrapassagem em local proibido.</p>
        <p>O trânsito ficou parcialmente bloqueado por cerca de três horas para o trabalho da perícia. Este é o terceiro acidente fatal no trecho apenas neste ano, levantando questionamentos sobre a necessidade de duplicação da via.</p>
        \`,
        imageUrl: '/images/defesa-civil-rio-iguacu-capa-real.png',
        mobileImageUrl: '/images/defesa-civil-rio-iguacu-capa-real.png',
        internalImageUrl: '/images/defesa_civil_internal_generated.png',
        category: 'Trânsito',
        categoryColor: 'gray',
        publishDate: '2026-02-09',
        author: 'Trânsito Agora'
    },
    {
        id: 1771000007,
        title: "Engavetamento trava Contorno Sul e afeta Araucária",
        summary: "Acidente envolvendo sete veículos causou congestionamento quilométrico na manhã de terça-feira.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - Motoristas que precisaram se deslocar para Curitiba na manhã desta terça-feira (03) enfrentaram um teste de paciência. Um engavetamento envolvendo sete veículos no Contorno Sul (BR-376) travou completamente o fluxo na região da Cidade Industrial, com reflexos diretos na saída de Araucária.</p>
        <p>Apesar da gravidade da cena, apenas feridos leves foram registrados. A concessionária responsável levou quatro horas para liberar a pista, desviando o tráfego por dentro dos bairros e sobrecarregando a Avenida das Araucárias.</p>
        \`,
        imageUrl: '/images/semaforo-archelau-v2-capa.png',
        mobileImageUrl: '/images/semaforo-archelau-v2-capa.png',
        internalImageUrl: '/images/semaforos_archelau_internal_real.png',
        category: 'Trânsito',
        categoryColor: 'gray',
        publishDate: '2026-02-04',
        author: 'Redação Squad'
    },
    {
        id: 1771000006,
        title: "Obras mudam trânsito no Contorno Norte",
        summary: "Desvios começam a operar nesta quarta-feira para construção de novo viaduto.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - Atenção motoristas: a partir desta quarta-feira (11), o tráfego no Contorno Norte sofrerá alterações importantes. O Departamento de Estradas de Rodagem (DER-PR) inicia a construção de um novo viaduto de acesso, exigindo o bloqueio parcial de pistas.</p>
        <p>Quem utiliza a rota diariamente deve buscar caminhos alternativos ou antecipar a saída de casa em pelo menos 30 minutos. A obra tem previsão de duração de 8 meses e promete desafogar um dos principais gargalos logísticos da Região Metropolitana.</p>
        \`,
        imageUrl: '/images/pavimentacao-jardim-plinio-final.png',
        mobileImageUrl: '/images/pavimentacao-jardim-plinio-final.png',
        internalImageUrl: '/images/pavimentacao_jardim_plinio_internal_real.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '2026-02-11',
        author: 'Mobilidade Urbana'
    },
    {
        id: 1771000005,
        title: "Polícia prende suspeito de tráfico no Campina da Barra",
        summary: "Denúncias anônimas levaram a PM até residência utilizada para armazenamento de entorpecentes.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - Uma operação da Polícia Militar resultou na prisão de um homem de 28 anos suspeito de comandar o tráfico de drogas na região do Campina da Barra. A ação ocorreu na tarde de segunda-feira (09), após denúncias de moradores pelo 190.</p>
        <p>Na residência, foram encontrados 5kg de maconha e porções de cocaína prontas para venda. O detido, que já possuía passagens pelo sistema prisional, foi encaminhado à Delegacia de Araucária.</p>
        \`,
        imageUrl: '/images/pcpr_incineration_cover_final_v2.png',
        mobileImageUrl: '/images/pcpr_incineration_cover_final_v2.png',
        internalImageUrl: '/images/pcpr_incineration_internal_real.png',
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: '2026-02-10',
        author: 'PCPR News'
    },
    {
        id: 1771000004,
        title: "Tribunal do Júri julga tentativa de homicídio nesta quinta",
        summary: "Caso de 2024 vai a julgamento popular no Fórum de Araucária.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - O Tribunal do Júri de Araucária se reúne nesta quinta-feira (12) para julgar um caso de tentativa de homicídio ocorrido no bairro Capela Velha em 2024. O réu é acusado de disparar contra um vizinho após uma discussão fútil.</p>
        <p>A sessão é aberta ao público e deve atrair estudantes de Direito e familiares dos envolvidos. A expectativa é que o veredito seja anunciado no final da tarde.</p>
        \`,
        imageUrl: '/images/concurso-araucaria-banca-capa.png',
        mobileImageUrl: '/images/concurso-araucaria-banca-capa.png',
        internalImageUrl: '/images/concurso_estudos_internal.jpg',
        category: 'Justiça',
        categoryColor: 'blue',
        publishDate: '2026-02-12',
        author: 'Justiça em Pauta'
    },
    {
        id: 1771000003,
        title: "Via Araucária instala painéis inteligentes na BR-476",
        summary: "Modernização visa alertar motoristas sobre acidentes e obras em tempo real.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - A concessionária Via Araucária iniciou a instalação de painéis de mensagem variável (PMV) ao longo da BR-476. Os equipamentos permitirão a comunicação direta com os motoristas, informando sobre condições de tráfego, acidentes e obras na pista.</p>
        <p>Durante a instalação, haverá bloqueios parciais no sistema "pare e siga" entre os dias 06 e 23 de fevereiro. A modernização faz parte do contrato de concessão e visa reduzir acidentes no trecho urbano de Araucária.</p>
        \`,
        imageUrl: '/images/ciclovia_industrial_cover_v2.png',
        mobileImageUrl: '/images/ciclovia_industrial_cover_v2.png',
        internalImageUrl: '/images/ciclovia_industrial_angle_gen.png',
        category: 'Infraestrutura',
        categoryColor: 'indigo',
        publishDate: '2026-02-07',
        author: 'Estradas PR'
    },
    {
        id: 1771000002,
        title: "Colisão com bitrem deixa quatro feridos na entrada da cidade",
        summary: "Acidente envolveu caminhão e dois carros de passeio na manhã desta terça.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - Um susto para quem chegava a Araucária na manhã desta terça-feira (03). Uma carreta bitrem colidiu lateralmente com dois automóveis na rotatória de acesso à cidade, deixando quatro pessoas feridas. As vítimas foram atendidas pelo Corpo de Bombeiros e liberadas no local com ferimentos leves.</p>
        <p>O acidente causou lentidão por mais de uma hora. Testemunhas relatam que o caminhão teria avançado a preferencial, mas as causas ainda serão apuradas.</p>
        \`,
        imageUrl: '/images/hospital_equipment_araucaria_final_v5.png',
        mobileImageUrl: '/images/hospital_equipment_araucaria_final_v5.png',
        internalImageUrl: '/images/hospital_equipment_delivery_real.jpg',
        category: 'Trânsito',
        categoryColor: 'gray',
        publishDate: '2026-02-03',
        author: 'Bombeiros News'
    },
    {
        id: 1771000001,
        title: "Araucária registra alta nos índices de violência em 2026",
        summary: "Dados parciais apontam crescimento de ocorrências em comparação ao mesmo período de 2025.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - Um levantamento preliminar das forças de segurança aponta um cenário preocupante para o início de 2026. Araucária registrou um aumento de 15% nos casos de furtos e roubos em janeiro, comparado ao ano anterior. Os homicídios também tiveram leve alta.</p>
        <p>As autoridades atribuem o cenário à migração de criminosos de outras regiões e prometem intensificar as operações integradas entre Polícia Militar, Civil e Guarda Municipal nos bairros mais afetados.</p>
        \`,
        imageUrl: '/images/gm_viaturas_cover_v2.png',
        mobileImageUrl: '/images/gm_viaturas_cover_v2.png',
        internalImageUrl: '/images/gma_viaturas_manual.png',
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: '2026-02-13',
        author: 'Segurança Pública'
    },`;

// 3. Pegar News Antigas a Manter (Do inicio até a notícia que será removida "Startup local" id 1769015223)
const cutoffString = 'id: 1769015223';
const cutoffIndex = fileContent.indexOf(cutoffString);

if (cutoffIndex === -1) {
    console.error("Could not find the cutoff news article. Aborting.");
    process.exit(1);
}

// Procura a virgula que separa essa notícia da anterior para cortar antes dela.
// A noticia anterior termina e tem uma virgula e geralmente "    }," ou "},".
// Então busco a última "}," antes do cutoffIndex.
const middleContent = fileContent.substring(headerEndIndex + headerToken.length, cutoffIndex);
const lastCleanIndex = middleContent.lastIndexOf('},');
const cleanMiddle = middleContent.substring(0, lastCleanIndex + 2); // Pega até o '},'

// 4. Pegar Footer
// O footer começa após o bloco removido. O bloco a ser removido vai até o fim do array newsArticles.
// Procuramos onde começa o próximo export (events).
const eventsToken = 'export const events: Event[] = [';
const eventsStartIndex = fileContent.indexOf(eventsToken);

// O array newsArticles fecha com '];' antes do events.
// Vamos pegar tudo a partir do ]; que está antes de events.
const footerStartIndex = fileContent.lastIndexOf('];', eventsStartIndex);
const footer = fileContent.substring(footerStartIndex);

// 5. Montar Arquivo
const newContent = header + '\n' + newNews + cleanMiddle + '\n' + footer;

fs.writeFileSync(currentDataPath, newContent, 'utf-8');
console.log('Success: data.ts updated.');
