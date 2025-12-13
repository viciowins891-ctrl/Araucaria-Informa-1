
import { NewsArticle, Event, Business } from './types';

// Função auxiliar APENAS para Eventos (para que pareçam sempre futuros/próximos)
const getUpcomingDate = (daysFromNow: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('pt-BR'); // Retorna formato DD/MM/AAAA
};

// Função auxiliar para gerar datas passadas recentes (para notícias)
const getPastDate = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('pt-BR'); // Retorna formato DD/MM/AAAA
};

// URLs atualizadas para imagens urbanas e contextuais de alta qualidade.
// Garante que não tenhamos links quebrados e que a estética seja coesa.

export const newsArticles: NewsArticle[] = [
    {
        id: 101, // ID Único Real
        title: 'Araucária zera fila de espera por vagas em CMEIs para 2025',
        summary: 'Prefeitura anuncia que todas as 1.500 crianças de 0 a 3 anos inscritas tiveram vagas ofertadas.',
        content: `
            <p>Um marco histórico para a educação de Araucária. A Secretaria Municipal de Educação confirmou nesta semana que a fila de espera por vagas em Centros Municipais de Educação Infantil (CMEIs) foi totalmente zerada.</p>
            <p>O avanço beneficia cerca de 1.500 famílias que aguardavam vaga para o ano letivo de 2025. "Trabalhamos duro na ampliação das unidades e em parcerias para garantir esse direito fundamental", afirmou a secretária de educação.</p>
        `,
        imageUrl: '/images/news_cmei_realistic.png', // Versão realista gerada pelo Nano Banana Pro
        category: 'Educação',
        categoryColor: 'red',
        publishDate: getPastDate(0), // Hoje
        author: 'Redação Municipal'
    },
    {
        id: 102,
        title: 'Orçamento Municipal para 2026 deve chegar a R$ 2,3 bilhões',
        summary: 'Previsão orçamentária aponta crescimento na arrecadação e maiores investimentos em obras e saúde.',
        content: `
            <p>A Lei Orçamentária Anual (LOA) discutida na Câmara Municipal projeta um orçamento recorde de aproximadamente R$ 2,3 bilhões para Araucária em 2026.</p>
            <p>A prioridade dos recursos será para a manutenção dos serviços de saúde e grandes obras de infraestrutura viária, como a duplicação de avenidas importantes e a construção do novo hospital.</p>
        `,
        imageUrl: '/images/news_budget.png', // Nova imagem gerada (Nano Banana Pro)
        category: 'Economia',
        categoryColor: 'blue',
        publishDate: getPastDate(1), // Ontem
        author: 'Câmara Municipal'
    },
    {
        id: 103,
        title: 'Governador inaugura unidade do Poupatempo em Araucária',
        summary: 'Nova agência no centro unifica mais de 240 serviços estaduais e facilita a vida do cidadão.',
        content: `
            <p>Foi inaugurada oficialmente a primeira unidade de rua do Poupatempo no Paraná, localizada em Araucária. O espaço moderno facilita a vida do cidadão, permitindo emitir documentos como RG e CNH, além de solicitar serviços da Copel e Sanepar em um único lugar.</p>
            <p>"É o fim da burocracia e das filas. O cidadão resolve tudo em um só lugar", destacou o governador Ratinho Jr durante a cerimônia.</p>
        `,
        imageUrl: '/images/custom_poupatempo_official.jpg', // Foto oficial externa sem máscaras
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(2),
        author: 'Agência Estadual'
    },
    {
        id: 104,
        title: 'Pacote de investimentos federais destina R$ 20 milhões para Araucária',
        summary: 'Recursos anunciados pelo Governo Federal serão aplicados na saúde e educação.',
        content: `
            <p>Em visita oficial, representantes do Governo Federal anunciaram um pacote de investimentos para Araucária. Serão R$ 2,8 milhões destinados à Saúde e R$ 18 milhões para a Educação, focados na ampliação da rede física de atendimento.</p>
            <p>Os recursos devem ser liberados já no início do próximo semestre, acelerando obras paradas e equipando novas unidades.</p>
        `,
        imageUrl: '/images/news_investments.png', // Nova imagem gerada (Nano Banana Pro)
        category: 'Política',
        categoryColor: 'purple',
        publishDate: getPastDate(3),
        author: 'Brasília News'
    },
    {
        id: 105,
        title: 'Polícia Civil incinera 114 kg de drogas apreendidas na região',
        summary: 'Ação realizada nesta semana marca o combate efetivo ao tráfico em Araucária.',
        content: `
            <p>A Polícia Civil do Paraná (PCPR) realizou a incineração de mais de 114 quilos de entorpecentes apreendidos em operações recentes em Araucária.</p>
            <p>O delegado responsável destacou a importância das denúncias anônimas da população para o sucesso das apreensões. Todo o material foi destruído em fornos industriais com autorização judicial.</p>
        `,
        imageUrl: '/images/custom_drugs.jpg', // Nova imagem gerada (Nano Banana Pro)
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: getPastDate(3),
        author: 'PCPR'
    },
    {
        id: 106,
        title: 'Vacinação contra Vírus Sincicial Respiratório (VSR) para gestantes',
        summary: 'Saúde inicia imunização para proteger recém-nascidos de infecções graves.',
        content: `
            <p>A Secretaria Municipal de Saúde iniciou a campanha de vacinação contra o VSR voltada para gestantes. A medida visa transmitir anticorpos para o bebê ainda na gestação, garantindo proteção contra bronquiolites e pneumonias nos primeiros meses de vida.</p>
            <p>As doses estão disponíveis em todas as Unidades Básicas de Saúde (UBS) do município.</p>
        `,
        imageUrl: '/images/vacinacao_meta_2024.jpg',
        category: 'Saúde',
        categoryColor: 'blue',
        publishDate: getPastDate(4),
        author: 'Saúde Agora'
    },
    {
        id: 107,
        title: 'Cantata de Natal emociona fiéis no Santuário',
        summary: 'Apresentação "Um Conto de Natal" reuniu centenas de pessoas no fim de semana.',
        content: `
            <p>O clima natalino tomou conta de Araucária com a belíssima apresentação da Cantata 'Um Conto de Natal' na Paróquia Nossa Senhora do Perpétuo Socorro. O evento contou com coral infantil e orquestra, emocionando o público presente.</p>
            <p>Novas apresentações estão programas para o próximo fim de semana na Praça da Matriz.</p>
        `,
        imageUrl: '/images/cantata_natal_real.png', // Nova imagem gerada
        category: 'Cultura',
        categoryColor: 'indigo',
        publishDate: getPastDate(5),
        author: 'Cultura Viva'
    },
    {
        id: 108,
        title: 'Ciclone extratropical: Equipes trabalham para restabelecer energia',
        summary: 'Após tempestade, Copel atua para religar 21 unidades consumidoras ainda sem luz.',
        content: `
            <p>O ciclone extratropical que atingiu a região sul nos últimos dias deixou estragos pontuais em Araucária. Segundo boletim da Copel, cerca de 21 unidades consumidoras permaneciam sem energia nesta manhã.</p>
            <p>Equipes de emergência estão nas ruas para remover galhos de árvores sobre a fiação e normalizar o serviço o mais rápido possível.</p>
        `,
        imageUrl: '/images/news_cyclone_energy.png', // Eletricistas no Caminhão (Nano Banana Pro)
        category: 'Cidade',
        categoryColor: 'gray',
        publishDate: getPastDate(6),
        author: 'Tempo Agora'
    },
    {
        id: 109, // Novo ID para o Ginásio
        title: 'Ginásio Joval de Paula Souza será reformado',
        summary: 'Prefeitura anuncia revitalização completa do complexo esportivo no Parque Cachoeira.',
        content: `
            <p>Um dos principais palcos do esporte araucariense, o Ginásio Joval de Paula Souza, passará por uma ampla reforma. O anúncio foi feito pela Secretaria de Esporte e Lazer, que prevê melhorias no piso da quadra, vestiários e cobertura.</p>
            <p>As obras devem começar no próximo mês e visam oferecer mais conforto e segurança para atletas e torcedores. O ginásio ficará fechado durante o período de intervenção, com atividades remanejadas para outros locais.</p>
        `,
        imageUrl: '/images/custom_gym_official.png', // Foto oficial (Enviada pelo User)
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: getPastDate(4),
        author: 'Esporte News'
    },
    {
        id: 6,
        title: 'Câmara aprova incentivo ao turismo rural',
        summary: 'Caminho do Guajuvira e roteiros poloneses receberão verba para sinalização e melhorias.',
        content: `
            <p>Em sessão realizada ontem, a Câmara Municipal de Araucária aprovou por unanimidade o projeto de lei que cria incentivos fiscais e destina verbas para o desenvolvimento do turismo rural na região.</p>
            
            <p>O foco principal são os roteiros do Caminho do Guajuvira e as rotas da colônia polonesa, que possuem grande potencial gastronômico e cultural. Com o novo investimento, será feita a melhoria da sinalização turística, a pavimentação de trechos críticos de estradas rurais e o apoio à divulgação dos produtores locais.</p>
            
            <p>Pequenos agricultores que abrirem suas propriedades para visitação ou venda de produtos coloniais (como queijos, vinhos e doces) terão descontos em taxas municipais.</p>
            
            <p>"Araucária tem belezas rurais que muita gente desconhece. Queremos que o curitibano e o próprio araucariense passem o fim de semana aqui, consumindo nossos produtos e valorizando nossa história", defendeu a vereadora autora do projeto.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: getPastDate(9),
        author: 'Jornal do Campo'
    },
    {
        id: 7,
        title: 'Campanha de Vacinação atinge meta no município',
        summary: 'Secretaria de Saúde comemora alta adesão da população na campanha contra a gripe.',
        content: `
            <p>A Secretaria Municipal de Saúde de Araucária divulgou hoje que a campanha de vacinação contra a gripe atingiu 95% da meta estipulada para o público-alvo. O resultado coloca o município entre os mais eficientes do estado na imunização.</p>
            <p>As unidades básicas de saúde funcionaram em horário estendido durante a última semana para garantir que trabalhadores pudessem se vacinar. "A conscientização da população foi fundamental. Vacinas salvam vidas", reforçou a diretora de epidemiologia.</p>
            <p>Ainda há doses disponíveis para a população geral em todas as UBS do município. É necessário apresentar documento com foto e carteirinha de vacinação.</p>
        `,
        imageUrl: '/images/vacinacao_meta_2024.jpg',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(10),
        author: 'Saúde em Foco'
    },
    {
        id: 8,
        title: 'Festival de Teatro Infantil lota auditórios',
        summary: 'Semana da criança foi marcada por apresentações culturais gratuitas em diversas escolas.',
        content: `
            <p>A magia do teatro invadiu as escolas municipais de Araucária. O Festival de Teatro Infantil, promovido pela Secretaria de Cultura, realizou mais de 20 apresentações gratuitas ao longo da última semana, atingindo cerca de 5 mil crianças.</p>
            <p>Peças clássicas e produções locais fizeram parte do repertório. O objetivo do projeto é formar plateia e incentivar o gosto pela arte desde cedo. "Ver o brilho nos olhos das crianças não tem preço", disse um dos atores da companhia local.</p>
            <p>O encerramento do festival acontecerá no próximo domingo, com uma apresentação aberta ao público no Parque Cachoeira.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1544390022-d7486e92b8d0?auto=format&fit=crop&q=80&w=1000',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: getPastDate(12),
        author: 'Cultura Viva'
    },
    {
        id: 9,
        title: 'Novas ciclovias conectam bairros industriais',
        summary: 'Projeto de mobilidade urbana facilita o deslocamento de trabalhadores para a área industrial.',
        content: `
            <p>A Prefeitura iniciou as obras de expansão da malha cicloviária na região industrial. O projeto prevê a conexão entre os bairros residenciais e o complexo da REPAR, oferecendo uma alternativa de transporte segura e sustentável para os trabalhadores.</p>
            <p>Além da pavimentação exclusiva para bicicletas, o projeto inclui iluminação específica e sinalização reforçada nos cruzamentos. A previsão é que as obras sejam concluídas em 4 meses.</p>
            <p>A iniciativa faz parte do Plano de Mobilidade Urbana, que visa reduzir o tráfego de veículos pesados e incentivar o transporte ativo.</p>
        `,
        imageUrl: '/images/ciclovia_industrial.jpg',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: getPastDate(14),
        author: 'Mobilidade Urbana'
    },
    {
        id: 10,
        title: 'Operação Tapa-Buracos avança no Jardim Iguaçu',
        summary: 'Equipes da Secretaria de Obras trabalham em ritmo acelerado para recuperar vias danificadas pelas chuvas.',
        content: `
            <p>A Secretaria de Obras Públicas intensificou nesta semana a Operação Tapa-Buracos no bairro Jardim Iguaçu. A ação visa recuperar o asfalto danificado pelas fortes chuvas que atingiram a região no último mês.</p>
            <p>Segundo o cronograma, as ruas principais serão atendidas prioritariamente para garantir o fluxo do transporte coletivo. Em seguida, as equipes entrarão nas vias secundárias.</p>
            <p>Moradores podem solicitar reparos através do aplicativo oficial da prefeitura ou pelo telefone da ouvidoria.</p>
        `,
        imageUrl: '/images/tapa_buracos_real_final.jpg',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: getPastDate(15),
        author: 'Redação Municipal'
    },
    {
        id: 11,
        title: 'Guarda Municipal recebe novas viaturas',
        summary: 'Investimento na segurança pública inclui renovação da frota e novos equipamentos de proteção.',
        content: `
            <p>A Guarda Municipal de Araucária recebeu hoje 5 novas viaturas totalmente equipadas para o patrulhamento preventivo. O investimento faz parte do pacote de segurança pública anunciado no início do ano.</p>
            <p>Além dos veículos, foram entregues novos coletes balísticos e rádios de comunicação digital. "Com esses equipamentos, conseguiremos reduzir o tempo de resposta às ocorrências", afirmou o comandante da GM.</p>
            <p>As novas viaturas já estão em circulação nos bairros com maior índice de criminalidade.</p>
        `,
        imageUrl: '/images/custom_gm_official_jeep.jpg', // Foto Oficial (Jeep/Chaves)
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(16),
        author: 'Segurança em Pauta'
    },
    {
        id: 12,
        title: 'Hospital Municipal inaugura nova ala pediátrica',
        summary: 'Ampliação promete dobrar a capacidade de atendimento infantil e conta com equipamentos de última geração.',
        content: `
            <p>O Hospital Municipal de Araucária (HMA) inaugurou nesta manhã sua nova ala pediátrica. O espaço foi totalmente reformulado para oferecer um ambiente mais acolhedor e humanizado para as crianças e seus familiares.</p>
            <p>Com a expansão, o número de leitos de internação infantil passou de 15 para 30. Além disso, foram adquiridos novos equipamentos de monitoramento vital e respiradores específicos para o público pediátrico.</p>
            <p>"Saúde é prioridade. Nossas crianças merecem o melhor atendimento possível, sem precisar se deslocar para Curitiba", destacou a direção do hospital.</p>
        `,
        imageUrl: '/images/custom_hospital_official.jpg', // Foto Oficial Inauguração (Corte Fita)
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(18),
        author: 'Saúde Agora'
    },
    {
        id: 13,
        title: 'Feira de Robótica reúne estudantes da rede pública',
        summary: 'Alunos apresentaram projetos inovadores focados em sustentabilidade e automação.',
        content: `
            <p>O Parque Cachoeira foi palco da 5ª Feira de Robótica e Inovação das escolas municipais. Mais de 50 projetos foram expostos, variando desde braços mecânicos feitos com material reciclável até sistemas de irrigação automatizada para hortas escolares.</p>
            <p>O evento visa estimular o interesse pela ciência e tecnologia desde cedo. Os três melhores projetos receberam kits de programação e uma visita técnica a uma grande indústria de tecnologia da região.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: getPastDate(20),
        author: 'EducaTech'
    },
    {
        id: 14,
        title: 'Novo supermercado gera 200 empregos diretos',
        summary: 'Grande rede varejista abre as portas no bairro Costeira, movimentando a economia local.',
        content: `
            <p>A economia de Araucária ganhou um reforço importante nesta semana com a inauguração de uma nova unidade de uma grande rede de supermercados no bairro Costeira.</p>
            <p>O empreendimento gerou cerca de 200 vagas de emprego direto, priorizando a contratação de moradores da região através do SINE municipal. "É uma oportunidade de primeiro emprego para muitos jovens", comentou o gerente da loja.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(21),
        author: 'Economia Local'
    },
    {
        id: 15,
        title: 'Limpeza do Rio Iguaçu retira 5 toneladas de lixo',
        summary: 'Ação voluntária mobilizou comunidade e ONGs ambientais no último fim de semana.',
        content: `
            <p>Um mutirão de limpeza realizado nas margens do Rio Iguaçu, no trecho que corta Araucária, resultou na retirada de mais de 5 toneladas de resíduos sólidos. A ação contou com a participação de 100 voluntários, incluindo escoteiros e moradores ribeirinhos.</p>
            <p>Entre os itens encontrados estavam pneus, plásticos e até móveis velhos. A Secretaria de Meio Ambiente apoiou a ação com caminhões para o transporte correto do material recolhido.</p>
        `,
        imageUrl: '/images/limpeza_rio_iguacu_real.jpg',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(22),
        author: 'EcoAção'
    },
    {
        id: 16,
        title: 'Torneio de Xadrez movimenta o fim de semana',
        summary: 'Competição reuniu enxadristas de todas as idades no Centro de Convivência.',
        content: `
            <p>O raciocínio lógico e a estratégia foram os protagonistas no Torneio Municipal de Xadrez, realizado neste sábado. O evento reuniu mais de 80 participantes, divididos em categorias do sub-10 ao veterano.</p>
            <p>O destaque ficou para a jovem promessa local, Ana Clara, de 12 anos, que venceu a categoria sub-14 invicta. "O xadrez ajuda muito na escola e na concentração", disse a campeã.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=1000',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: getPastDate(25),
        author: 'Esporte Araucária'
    },
    {
        id: 17,
        title: 'Curso gratuito de qualificação profissional abre inscrições',
        summary: 'Senai e Prefeitura oferecem vagas para cursos na área industrial e administrativa.',
        content: `
            <p>Estão abertas as inscrições para os cursos gratuitos de qualificação profissional oferecidos em parceria entre a Prefeitura de Araucária e o Senai. São 300 vagas distribuídas em cursos de mecânica básica, eletricidade predial e assistente administrativo.</p>
            <p>As aulas iniciam no próximo mês e os interessados devem comparecer à Agência do Trabalhador com documentos pessoais e comprovante de residência. O objetivo é preparar a mão de obra local para as demandas do polo industrial.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: getPastDate(28),
        author: 'Carreira e Futuro'
    },
    {
        id: 18,
        title: 'Rota de Turismo Rural ganha nova sinalização',
        summary: 'Prefeitura instala placas indicativas no Caminho do Vinho e Guajuvira para orientar visitantes.',
        content: `
            <p>O Departamento de Turismo iniciou a instalação de novas placas de sinalização turística nas principais rotas rurais do município. A ação visa facilitar o acesso de visitantes aos restaurantes coloniais, vinícolas e chácaras de lazer.</p>
            <p>"Com a sinalização adequada, esperamos um aumento de 30% no fluxo de turistas nos finais de semana", projetou o diretor de turismo. O projeto também inclui mapas digitais acessíveis via QR Code em pontos estratégicos.</p>
            <p>A rota do Guajuvira é famosa por suas paisagens bucólicas e pela venda direta de produtos da agricultura familiar, como queijos, salames e doces caseiros.</p>
        `,
        // URL Turismo Rural
        imageUrl: '/images/rota_turismo_rural.jpg',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: getPastDate(30),
        author: 'Turismo Araucária'
    },
    {
        id: 19,
        title: 'Startup local desenvolve app para transporte escolar',
        summary: 'Aplicativo criado por jovens araucarienses permite aos pais rastrearem vans escolares em tempo real.',
        content: `
            <p>Uma startup incubada no parque tecnológico de Araucária lançou nesta semana um aplicativo inovador voltado para a segurança no transporte escolar. A ferramenta permite que pais e responsáveis acompanhem o trajeto da van escolar em tempo real pelo celular.</p>
            <p>"A ideia surgiu da nossa própria necessidade de saber se nossos irmãos menores tinham chegado bem à escola", conta um dos fundadores, estudante de Análise de Sistemas da facear.</p>
            <p>O aplicativo já está sendo testado por 15 motoristas de van da cidade e tem recebido feedback positivo pela facilidade de uso e precisão do GPS.</p>
        `,
        imageUrl: '/images/startup_app_real.jpg',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        publishDate: getPastDate(32),
        author: 'Inovação Tech'
    },
    {
        id: 20,
        title: 'Ginásio Joval de Paula Souza será reformado',
        summary: 'Complexo esportivo receberá novo piso, iluminação de LED e melhorias na acessibilidade.',
        content: `
            <p>A Secretaria de Esporte e Lazer anunciou a reforma completa do Ginásio de Esportes Joval de Paula Souza, no Parque Cachoeira. O local, palco de grandes competições estaduais, necessitava de reparos estruturais.</p>
            <p>O projeto contempla a troca completa do piso da quadra por um material flutuante de alto desempenho, ideal para a prática de vôlei e basquete. Além disso, vestiários e arquibancadas serão adequados às normas de acessibilidade.</p>
            <p>Durante as obras, as escolinhas de esporte serão remanejadas para quadras de escolas municipais próximas.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: getPastDate(35),
        author: 'Esporte News'
    },
    {
        id: 21,
        title: 'Hackathon Municipal reúne 500 jovens programadores',
        summary: 'Maratona de programação buscou soluções digitais para problemas urbanos da cidade.',
        content: `
            <p>O primeiro Hackathon Municipal de Araucária foi um sucesso absoluto. O evento, realizado no último fim de semana no Parque Tecnológico, reuniu cerca de 500 estudantes e profissionais de tecnologia.</p>
            <p>O desafio proposto foi criar aplicativos que ajudassem a resolver problemas de mobilidade e gestão de resíduos. A equipe vencedora desenvolveu um sistema que gamifica a reciclagem nos bairros.</p>
            <p>"Araucária tem muitos talentos na área de TI, e eventos como esse mostram que podemos ser um polo de inovação", disse o secretário de Planejamento.</p>
        `,
        imageUrl: '/images/hackathon_real.jpg',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        publishDate: getPastDate(40),
        author: 'Tech News'
    },
    {
        id: 22,
        title: 'Sítio Ecológico abre novas trilhas para ecoturismo',
        summary: 'Propriedade rural em Guajuvira aposta no turismo de natureza e observação de aves.',
        content: `
            <p>O turismo rural em Araucária ganhou mais uma atração de peso. O Sítio Ecológico Recanto das Águas inaugurou neste sábado três novas trilhas interpretativas em meio à mata nativa.</p>
            <p>As trilhas possuem diferentes níveis de dificuldade e são guiadas por biólogos que explicam sobre a flora e fauna local. O local também montou uma estrutura para observação de aves (birdwatching), atraindo fotógrafos de natureza.</p>
            <p>Após a caminhada, os visitantes podem desfrutar de um café colonial com produtos feitos na própria fazenda.</p>
        `,
        imageUrl: '/images/sitio_ecologico_trilhas.jpg',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: getPastDate(42),
        author: 'Jornal do Campo'
    }
];

export const events: Event[] = [
    {
        id: 1,
        title: 'Festa do Pêssego',
        description: 'A tradicional celebração da colheita com a melhor gastronomia polonesa e shows regionais.',
        imageUrl: '/images/festa_pessego_real.jpg',
        date: getUpcomingDate(5), // Daqui a 5 dias (Futuro)
        time: '18:00 - 23:00',
        location: 'Parque Cachoeira'
    },
    {
        id: 2,
        title: 'Feira Gastronômica Noturna',
        description: 'Pastel, pierogi e food trucks na praça central. Traga sua família!',
        imageUrl: '/images/feira_noturna_real_v2.jpg',
        date: getUpcomingDate(2), // Daqui a 2 dias (Futuro Próximo)
        time: '18:00 - 22:00',
        location: 'Praça Central'
    },
    {
        id: 3,
        title: 'Concerto no Teatro da Praça',
        description: 'Apresentação especial da orquestra municipal com clássicos e música popular brasileira.',
        imageUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=1000',
        date: getUpcomingDate(7), // Daqui a uma semana (Futuro)
        time: '19:30',
        location: 'Teatro da Praça'
    }
];

export const businesses: Business[] = [
    {
        id: 1,
        name: 'Panificadora e Confeitaria Araucária',
        category: 'Alimentação',
        imageUrl: '/images/panificadora_araucaria_real.jpg',
        address: 'Rua das Flores, 123 - Centro',
        phone: '(41) 3901-2345',
        website: 'padariaexemplo.com.br',
        description: 'Pães artesanais, tortas e doces finos. O melhor café da manhã da cidade.',
        isFeatured: true
    },
    {
        id: 2,
        name: 'Livraria e Sebo Cultural',
        category: 'Varejo',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000',
        address: 'Av. Victor do Amaral, 456',
        phone: '(41) 3901-6789',
        website: 'livrariaexemplo.com.br',
        description: 'Acervo completo de livros novos e usados, vinis e raridades.'
    },
    {
        id: 3,
        name: 'Auto Mecânica Confiança',
        category: 'Serviços',
        imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=1000',
        address: 'Rodovia do Xisto, 789',
        phone: '(41) 3901-1011',
        website: 'mecanicaexemplo.com.br',
        description: 'Serviços completos de mecânica, elétrica e funilaria para seu veículo.'
    },
    {
        id: 4,
        name: 'Academia Corpo & Movimento',
        category: 'Serviços',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua São Vicente, 200 - Centro',
        phone: '(41) 3642-0000',
        website: 'academiacm.com.br',
        description: 'Estrutura completa para musculação, crossfit e aulas de dança.',
        isFeatured: true
    },
    {
        id: 5,
        name: 'Farmácia Saúde Total',
        category: 'Varejo',
        imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=1000',
        address: 'Av. Archelau de Almeida Torres, 500',
        phone: '(41) 3643-9999',
        website: 'farmaciasaude.com.br',
        description: 'Medicamentos, perfumaria e manipulação com os melhores preços.'
    },
    {
        id: 6,
        name: 'Pet Shop Amigo Fiel',
        category: 'Serviços',
        imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua Miguel Bertolino Pizatto, 88',
        phone: '(41) 3901-5555',
        website: 'petshopamigo.com.br',
        description: 'Banho, tosa e clínica veterinária 24 horas para seu melhor amigo.'
    },
    {
        id: 7,
        name: 'Restaurante Sabor da Terra',
        category: 'Alimentação',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua Pedro Druszcz, 150',
        phone: '(41) 3642-7777',
        website: 'sabordaterra.com.br',
        description: 'Buffet por quilo e à la carte com o melhor da comida caseira.'
    }
];

// Dados para a seção de Serviços Úteis
export const services = [
    { id: 1, title: 'Horário de Ônibus', icon: 'directions_bus', color: 'bg-blue-500' },
    { id: 2, title: 'Portal da Transparência', icon: 'manage_search', color: 'bg-green-500' },
    { id: 3, title: 'Vagas de Emprego', icon: 'work', color: 'bg-orange-500' },
    { id: 4, title: 'Nota Fiscal Eletrônica', icon: 'receipt_long', color: 'bg-purple-500' },
    { id: 5, title: 'Saúde Online', icon: 'medical_services', color: 'bg-red-500' },
    { id: 6, title: 'Ouvidoria', icon: 'headset_mic', color: 'bg-teal-500' },
];

export const allNewsCategories = ['Todas', 'Cidade', 'Infraestrutura', 'Esporte', 'Educação', 'Tecnologia', 'Turismo'];
export const allBusinessCategories = ['Todas', 'Alimentação', 'Serviços', 'Varejo'];
