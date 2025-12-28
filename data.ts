
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
        id: 2029,
        title: 'Feira de Adoção Pet acontece neste fim de semana no Parque Cachoeira',
        summary: 'Centenas de cães e gatos esperam por um novo lar. Evento conta com orientação veterinária e brincadeiras para a família.',
        content: `
            <p>Se você está pensando em aumentar a família com um amigo de quatro patas, este fim de semana é a oportunidade perfeita. O Parque Cachoeira recebe mais uma edição da <strong>Grande Feira de Adoção Pet de Araucária</strong>.</p>

            <h2>Amor em Forma de Pêlos</h2>
            <p>O evento reunirá cerca de 50 animais, entre cães e gatos, filhotes e adultos, todos vermifugados e, no caso dos adultos, castrados. Os animais são resgatados por ONGs locais e pela Secretaria de Meio Ambiente (SMMA).</p>
            <p>"Adotar é um ato de amor e responsabilidade. Nossos animais passam por uma triagem rigorosa de saúde e comportamento para garantir que estejam prontos para um novo lar", explica a veterinária responsável.</p>

            <h2>Atrações para Toda a Família</h2>
            <p>Além da adoção, quem passar pelo parque poderá aproveitar:</p>
            <ul>
                <li><strong>Orientação Veterinária Gratuita:</strong> Tire dúvidas sobre cuidados básicos, vacinação e alimentação.</li>
                <li><strong>Microchipagem Gratuita:</strong> Para os animais adotados no evento (e vagas limitadas para a comunidade).</li>
                <li><strong>Apresentação de Agility:</strong> Cães treinados mostrando suas habilidades na pista de obstáculos.</li>
                <li><strong>Espaço Kids:</strong> Com pintura facial e balões para as crianças.</li>
            </ul>

            <h3>Requisitos para Adoção</h3>
            <p>Para levar um pet para casa, é necessário ser maior de 18 anos, apresentar documento com foto (RG/CNH), comprovante de residência e passar por uma breve entrevista com os protetores. A ideia é garantir uma adoção responsável e evitar devoluções futuras.</p>
        `,
        imageUrl: '/images/pet_adoption_cover_final_v1.png',
        category: 'Cidade', // Ou Meio Ambiente
        categoryColor: 'blue',
        publishDate: '2025-12-29', // Data futura garantida
        author: 'Araucária Urgente'
    },
    {
        id: 2028,
        title: 'Festival de Food Trucks agita o Centro Cívico nesta sexta',
        summary: 'Evento reúne o melhor da gastronomia sobre rodas, música ao vivo e diversão para toda a família em Araucária.',
        content: `
            <p>O fim de semana começa com muito sabor e animação em Araucária. O <strong>Festival de Food Trucks</strong> estacionou no Centro Cívico nesta sexta-feira, transformando o espaço em uma grande praça de alimentação a céu aberto.</p>

            <h2>Diversidade Gastronômica</h2>
            <p>Quem passar pelo local vai encontrar uma variedade incrível de opções culinárias. São mais de 15 operações oferecendo desde os clássicos até novidades gourmet:</p>
            <ul>
                <li><strong>Hambúrgueres Artesanais:</strong> Com blends de carnes nobres e molhos especiais.</li>
                <li><strong>Chopes Artesanais:</strong> Cervejarias locais marcando presença com estilos variados (IPA, Pilsen, Weiss).</li>
                <li><strong>Churros e Doces:</strong> Opções de sobremesa que vão do churros espanhol ao sorvete na chapa.</li>
                <li><strong>Culinária Internacional:</strong> Pratos mexicanos, massas italianas e comida oriental.</li>
            </ul>

            <h2>Ambiente Familiar e Música ao Vivo</h2>
            <p>O evento foi pensado para receber as famílias araucarienses. O espaço conta com área kids segura para as crianças brincarem enquanto os pais aproveitam a noite. Além disso, o palco principal recebe bandas locais tocando o melhor do pop rock e MPB, garantindo a trilha sonora perfeita para o happy hour.</p>

            <h2>Impulso à Economia Local</h2>
            <p>"Eventos como este são fundamentais para movimentar a economia da cidade, gerando renda para os pequenos empreendedores e oferecendo lazer de qualidade para a população sem precisar ir para Curitiba", destaca a organização.</p>

            <h3>Serviço</h3>
            <p>O festival acontece no estacionamento do Centro Cívico (ao lado da Prefeitura), com entrada gratuita. As atividades seguem até às 23h, com segurança reforçada e banheiros químicos à disposição do público.</p>
        `,
        imageUrl: '/images/food_trucks_cover_final_v3.png',
        category: 'Cultura', // Ou Lazer/Cidade
        categoryColor: 'orange',
        publishDate: '2025-12-28', // Data futura/atual para ficar no topo
        author: 'Araucária Urgente'
    },
    {
        id: 2027,
        title: 'Prefeitura inicia revitalização da Av. Archelau de Almeida Torres',
        summary: 'Confira os detalhes sobre este importante acontecimento recente em nossa cidade. A via é uma das mais importantes de Araucária.',
        content: `
            <p>Nesta semana, a Prefeitura de Araucária deu um passo decisivo para a modernização da infraestrutura urbana do município. As máquinas já estão na pista para a aguardada revitalização da <strong>Avenida Archelau de Almeida Torres</strong>, considerada uma das artérias vitais para o trânsito da cidade, conectando diversos bairros ao centro e servindo como rota diária para milhares de motoristas e pedestres.</p>

            <h2>Um Projeto Abrangente de Modernização</h2>
            <p>O projeto não se resume apenas a um novo asfalto. Trata-se de uma requalificação completa da via. Segundo a Secretaria Municipal de Obras Públicas (SMOP), as intervenções incluem:</p>
            <ul>
                <li><strong>Recuperação Profunda do Pavimento:</strong> Remoção da camada asfáltica antiga e deteriorada, seguida da aplicação de CBUQ (Concreto Betuminoso Usinado a Quente) de alta durabilidade, projetado para suportar o tráfego intenso de veículos leves e pesados.</li>
                <li><strong>Nova Sinalização Vertical e Horizontal:</strong> Pintura de faixas com material termoplástico (maior visibilidade noturna) e instalação de novas placas de trânsito, focando na redução de acidentes.</li>
                <li><strong>Acessibilidade e Calçadas:</strong> Reformas em pontos críticos das calçadas e adequação de rampas de acessibilidade, garantindo o direito de ir e vir para pessoas com mobilidade reduzida.</li>
                <li><strong>Iluminação em LED:</strong> Substituição das luminárias antigas por tecnologia LED, que além de gerar uma economia de até 50% aos cofres públicos, oferece uma luminosidade superior, aumentando a sensação de segurança para quem transita à noite.</li>
            </ul>

            <h2>Impacto na Mobilidade Urbana</h2>
            <p>A Avenida Archelau sofreu por anos com o desgaste natural e o aumento exponencial da frota de veículos em Araucária. Buracos e ondulações eram queixas frequentes da população. Com a obra, a expectativa é não apenas melhorar o conforto ao dirigir, mas também a fluidez do tráfego.</p>
            <p>"Essa obra era uma demanda antiga da população e agora está saindo do papel. Não estamos apenas tapando buracos, estamos reconstruindo a qualidade dessa via para que ela dure por muitos anos", destacou o prefeito durante a vistoria técnica no início dos trabalhos.</p>

            <h2>Orientações aos Motoristas</h2>
            <p>Durante o período de obras, o trânsito na região exigirá paciência e atenção redobrada. O Departamento de Trânsito de Araucária informa que haverá operações de "Pare e Siga" e desvios pontuais conforme o avanço das máquinas. Recomenda-se o uso de rotas alternativas, especialmente nos horários de pico, para evitar congestionamentos.</p>

            <h3>Investimento no Futuro</h3>
            <p>Além da Archelau, a prefeitura anunciou que este pacote de obras deve contemplar outras vias importantes nos próximos meses. A revitalização faz parte de um plano maior de mobilidade que visa preparar Araucária para o crescimento projetado para a próxima década.</p>
            <p>As obras têm prazo estimado de conclusão de 90 dias, dependendo das condições climáticas.</p>
        `,
        imageUrl: '/images/archelau_definitiva.png?v=fixed',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '2025-12-27',
        author: 'Araucária Urgente'
    },
    {
        id: 2026, // High ID to appear on top
        title: 'Araucária Vôlei vence Juiz de Fora e dispara na liderança da Superliga B',
        summary: 'Em noite de ginásio lotado, equipe mantém 100% de aproveitamento ao bater rival direto por 3 a 1 e fica mais perto do acesso à elite.',
        content: `
            <p>O sonho da elite do voleibol nacional está cada vez mais próximo. Na noite deste sábado, o <strong>Araucária Vôlei</strong> deu mais uma demonstração de força ao vencer o Juiz de Fora Vôlei por <strong>3 sets a 1</strong> (parciais de 25/18, 22/25, 25/20 e 25/21), em partida válida pela 8ª rodada da Superliga B.</p>
            
            <p>O confronto, realizado no Ginásio Joval de Paula Souza, colocou frente a frente o líder e um dos candidatos ao G4. Com a vitória, a equipe araucariense mantém sua invencibilidade na competição e se isola ainda mais no topo da tabela, consolidando-se como a favorita ao título.</p>

            <h3>O Jogo: Domínio e Superação</h3>
            <p>Empurrado pela torcida que lotou as arquibancadas, o time da casa começou avassalador. Com um saque forçado que desestabilizou a linha de passe mineira, o Araucária fechou o primeiro set com tranquilidade. No segundo set, o Juiz de Fora equilibrou as ações e, aproveitando alguns erros de contra-ataque dos anfitriões, conseguiu empatar a partida.</p>
            <p>"Sabíamos que não seria fácil. Eles têm um time alto e qualificado. Mas nossa equipe teve maturidade para voltar ao jogo no terceiro set", analisou o técnico do Araucária.</p>

            <h3>O "Caldeirão" Fez a Diferença</h3>
            <p>Nos sets decisivos, o fator casa pesou. A torcida transformou o ginásio em um verdadeiro caldeirão, e o bloqueio do Araucária começou a funcionar, parando os principais atacantes adversários. O ponto da vitória veio em um ataque de fundo, levando o público ao delírio.</p>
            
            <h3>Rumo à Superliga A</h3>
            <p>Com 24 pontos conquistados em 8 jogos, o Araucária Vôlei abre uma vantagem confortável para o segundo colocado. A meta agora é garantir matematicamente a classificação para as semifinais nas primeiras posições, o que daria a vantagem de decidir os playoffs em casa.</p>
            <p>A equipe volta à quadra no próximo fim de semana, desta vez fora de casa, buscando manter a sequência histórica de vitórias.</p>
        `,
        imageUrl: '/images/araucaria_volei_real_final_v1.jpg',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '2025-12-27',
        author: 'Araucária Urgente'
    },
    {
        id: 2025, // High ID to ensure it appears on top
        title: 'Novas turbinas da REPAR aumentam eficiência energética em 15%',
        summary: 'Investimento milionário na refinaria moderniza parque industrial e reduz emissões de CO2, garantindo maior sustentabilidade para a região.',
        content: `
            <p>A Refinaria Presidente Getúlio Vargas (REPAR), localizada em Araucária, deu um passo significativo rumo à modernização e sustentabilidade de suas operações. Nesta semana, foram inauguradas as novas turbinas de alta eficiência energética, um investimento estratégico que promete aumentar em 15% a capacidade de geração de energia da unidade, sem elevar o consumo de combustíveis.</p>
            
            <h3>Tecnologia de Ponta e Sustentabilidade</h3>
            <p>O projeto, que levou cerca de 18 meses para ser concluído, envolveu a substituição de equipamentos da década de 70 por modelos de última geração. As novas turbinas utilizam tecnologia aeroderivativa – similar à de motores de avião – que permite um aproveitamento termodinâmico muito superior.</p>
            <p>"Não estamos falando apenas de economia financeira, mas de um ganho ambiental imensurável. Com essa eficiência, deixaremos de emitir toneladas de CO2 na atmosfera anualmente, alinhando a refinaria com as metas globais de descarbonização", explicou o gerente de engenharia da unidade.</p>

            <h3>Impacto Econômico para Araucária</h3>
            <p>O investimento na casa dos R$ 450 milhões movimentou a economia local durante a fase de instalação, gerando mais de 300 empregos diretos e indiretos para trabalhadores especializados da região. Além disso, a maior eficiência da refinaria garante maior segurança energética para todo o estado do Paraná, especialmente em períodos de alta demanda.</p>

            <h3>O Futuro da Energia</h3>
            <p>Este movimento faz parte de um plano maior de investimentos da Petrobras para o sul do país. Estão previstas ainda melhorias nas unidades de tratamento de diesel e gasolina, visando a produção de combustíveis cada vez mais limpos (S-10). Para Araucária, sediar uma das refinarias mais eficientes do país significa garantia de arrecadação (ICMS) e atração de novas indústrias satélites para o Polo Petroquímico.</p>
            
            <p>A cerimônia de inauguração contou com a presença de autoridades estaduais e municipais, que destacaram a importância da simbiose entre o desenvolvimento industrial e a preservação ambiental.</p>
        `,
        imageUrl: '/images/repar_turbines_new_final.jpg',
        category: 'Economia',
        categoryColor: 'blue',
        publishDate: '2025-12-27',
        author: 'Araucária Urgente'
    },
    {
        id: 101, // ID Único Real
        title: 'Araucária zera fila de espera por vagas em CMEIs para 2025',
        summary: 'Prefeitura anuncia que todas as 1.500 crianças de 0 a 3 anos inscritas tiveram vagas ofertadas.',
        content: `
            <p>Um marco histórico para a educação de Araucária. A Secretaria Municipal de Educação confirmou nesta semana que a fila de espera por vagas em Centros Municipais de Educação Infantil (CMEIs) foi totalmente zerada.</p>
            <p>O avanço beneficia cerca de 1.500 famílias que aguardavam vaga para o ano letivo de 2025. "Trabalhamos duro na ampliação das unidades e em parcerias para garantir esse direito fundamental", afirmou a secretária de educação.</p>
        `,
        imageUrl: '/images/custom_cmei_official.webp', // Versão Otimizada (WebP) para LCP rápido
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '2025-12-20',
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
        publishDate: '2025-12-18',
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
        imageUrl: '/images/custom_poupatempo_official.webp', // Foto oficial externa sem máscaras
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '2025-12-15',
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
        publishDate: '2025-12-12',
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
        imageUrl: '/images/custom_drugs.webp', // Nova imagem gerada (Nano Banana Pro)
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: '2025-12-10',
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
        imageUrl: '/images/vacinacao_meta_2024.webp',
        category: 'Saúde',
        categoryColor: 'blue',
        publishDate: '2025-12-08',
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
        publishDate: '2025-12-05',
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
        publishDate: '2025-12-01',
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
        id: 110,
        title: 'Feira Gastronômica traz Food Trucks e música para o Centro',
        summary: 'Evento na Praça Central reúne o melhor da culinária de rua e opções de lazer para toda a família.',
        content: `
            <p>A Praça Central de Araucária será palco neste fim de semana de mais uma edição da Feira Gastronômica Noturna. O evento reúne dezenas de Food Trucks oferecendo desde hambúrgueres artesanais até pratos típicos da culinária polonesa, como o pierogi.</p>
            <p>Além da gastronomia, a feira contará com apresentações musicais de artistas locais. "É uma opção de lazer acessível e segura para as famílias araucarienses", destacou o organizador.</p>
            <p>O evento começa às 18h e vai até as 22h, com entrada gratuita.</p>
        `,
        imageUrl: '/images/food_trucks_cover_new_final.png',
        category: 'Lazer',
        categoryColor: 'yellow',
        publishDate: getPastDate(1),
        author: 'Guia Curitiba'
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
        imageUrl: '/images/vacinacao_meta_2024.webp',
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
        imageUrl: '/images/placeholder_educacao.png',
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
        imageUrl: '/images/ciclovia_industrial.webp',
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
        imageUrl: '/images/tapa_buracos_real_final.webp',
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
        imageUrl: '/images/custom_gm_official_jeep.webp', // Foto Oficial (Jeep/Chaves)
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
        imageUrl: '/images/custom_hospital_official.webp', // Foto Oficial Inauguração (Corte Fita)
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
        imageUrl: '/images/robotics_fair_real_final_v2.webp',
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
        imageUrl: '/images/supermarket_opening_real_final_v2.webp',
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
        imageUrl: '/images/limpeza_rio_iguacu_real.webp',
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
        imageUrl: '/images/news_chess_tournament.png',
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
        imageUrl: '/images/vocational_course_real_v2.webp',
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
        // URL Corrigida (Caminho Local) para evitar erro 404
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
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
        imageUrl: '/images/startup_app_real.webp',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        publishDate: getPastDate(32),
        author: 'Inovação Tech'
    },
    {
        id: 20,
        title: 'Praça da Bíblia recebe nova iluminação em LED',
        summary: 'Revitalização do espaço público garante mais segurança e lazer para as famílias à noite.',
        content: `
            <p>Quem passa pela Praça da Bíblia à noite já percebe a diferença. A Prefeitura concluiu nesta semana a instalação do novo sistema de iluminação em LED em todo o perímetro da praça.</p>
            <p>"Agora dá para trazer as crianças para brincar com tranquilidade", elogiou uma moradora local. Além das novas luminárias, o paisagismo foi recuperado e bancos foram reformados.</p>
            <p>O projeto faz parte do programa "Cidade Iluminada", que prevê a modernização da iluminação pública em diversos bairros.</p>
        `,
        imageUrl: '/images/plaza_bible_lighting_night.png',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(35),
        author: 'Redação Municipal'
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
        imageUrl: '/images/hackathon_real.webp',
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
        imageUrl: '/images/sitio_ecologico_trilhas.webp',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: getPastDate(42),
        author: 'Jornal do Campo'
    },
    {
        id: 23,
        title: 'Araucária recebe etapa do Campeonato Paranaense de Futsal',
        summary: 'Ginásio Joval de Paula Souza será palco de grandes jogos neste fim de semana.',
        content: `
            <p>A torcida araucariense tem um encontro marcado neste fim de semana. A cidade sediará uma das etapas decisivas do Campeonato Paranaense de Futsal, recebendo equipes de todo o estado.</p>
            <p>A equipe local busca a classificação para as finais e conta com o apoio da arquibancada. "Jogar em casa faz toda a diferença", afirmou o técnico.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1518611507436-e92e60832012?auto=format&fit=crop&q=80&w=1000',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: getPastDate(45),
        author: 'Esporte News'
    },
    {
        id: 24,
        title: 'Campanha do Agasalho arrecada 2 toneladas de doações',
        summary: 'Solidariedade marcou o inverno em Araucária com recorde de arrecadação.',
        content: `
            <p>O Provopar de Araucária divulgou o balanço final da Campanha do Agasalho deste ano. Foram arrecadadas cerca de 2 toneladas de roupas e cobertores, que já foram distribuídos para famílias em situação de vulnerabilidade.</p>
            <p>A campanha contou com pontos de coleta em comércios, escolas e empresas da cidade.</p>
        `,
        imageUrl: '/images/winter_clothing_drive_real_v2.webp',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(48),
        author: 'Social Araucária'
    },
    {
        id: 25,
        title: 'Novo binário no Centro melhora fluxo de veículos',
        summary: 'Mudanças no trânsito das ruas Victor do Amaral e São Vicente agradam motoristas.',
        content: `
            <p>Após uma semana de implantação, o novo binário no centro de Araucária já apresenta resultados positivos. O tempo médio de deslocamento nos horários de pico reduziu em 15%, segundo dados do Departamento de Trânsito.</p>
            <p>A obra incluiu nova sinalização semafórica e faixas exclusivas para conversão.</p>
        `,
        imageUrl: '/images/binario_centro_cover.webp',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: getPastDate(50),
        author: 'Trânsito Seguro'
    },
    {
        id: 26,
        title: 'Festival Gastronômico de Inverno começa hoje',
        summary: 'Restaurantes da cidade oferecem pratos especiais com descontos exclusivos.',
        content: `
            <p>Começou hoje o 3º Festival Gastronômico de Inverno de Araucária. Durante os próximos 15 dias, 20 restaurantes participantes oferecerão um menu especial com entrada, prato principal e sobremesa a preço fixo.</p>
            <p>O objetivo é valorizar a culinária local e aquecer o comércio durante a estação mais fria do ano.</p>
        `,
        imageUrl: '/images/gastronomic_festival_real_final_v2.webp',
        category: 'Cultura',
        categoryColor: 'yellow',
        publishDate: getPastDate(52),
        author: 'Roteiro Gourmet'
    },
    {
        id: 27,
        title: 'Escolas municipais recebem lousas digitais',
        summary: 'Tecnologia chega à sala de aula para modernizar o ensino em Araucária.',
        content: `
            <p>A Secretaria de Educação iniciou a instalação de lousas digitais interativas em todas as salas de aula do ensino fundamental. O equipamento permite aos professores utilizarem recursos de vídeo e internet durante as aulas, tornando o aprendizado mais dinâmico.</p>
            <p>"É um salto de qualidade pedagógica que coloca nossa rede no século XXI", destacou a secretária.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: getPastDate(55),
        author: 'EducaTech'
    },
    {
        id: 28,
        title: 'Empresa de logística abre 50 vagas de emprego',
        summary: 'Oportunidades são para motoristas, conferentes e auxiliares administrativos.',
        content: `
            <p>Uma grande empresa do setor logístico, instalada próximo à Rodovia do Xisto, anunciou a abertura de 50 novas vagas de emprego imediato. A expansão das atividades visa atender o aumento da demanda no final do ano.</p>
            <p>Os interessados devem cadastrar currículo no site da empresa ou comparecer ao SINE Araucária.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
        category: 'Economia',
        categoryColor: 'blue',
        publishDate: getPastDate(57),
        author: 'Vagas & Oportunidades'
    },
    {
        id: 29,
        title: 'Araucária investe em iluminação LED nos bairros',
        summary: 'Mais econômicas e eficientes, novas lâmpadas aumentam a segurança nas ruas.',
        content: `
            <p>O programa "Araucária Mais Iluminada" chegou ao bairro Capela Velha. Equipes da prefeitura estão substituindo as antigas lâmpadas de vapor de sódio por luminárias de LED, que iluminam mais e consomem menos energia.</p>
            <p>A meta é atingir 100% da iluminação pública com LED até o final do próximo ano.</p>
        `,
        imageUrl: '/images/iluminacao_led_cover.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: getPastDate(60),
        author: 'Cidade Luz'
    },
    {
        id: 30,
        title: 'Biblioteca Municipal promove feira de troca de livros',
        summary: 'Evento incentiva a leitura e a circulação de obras literárias na comunidade.',
        content: `
            <p>Neste sábado, a Biblioteca Pública de Araucária realiza mais uma edição da sua tradicional Feira de Troca de Livros. A regra é simples: traga um livro usado em bom estado e troque por outro de seu interesse.</p>
            <p>O evento é gratuito e aberto a toda a comunidade, contando também com contação de histórias para as crianças.</p>
        `,
        imageUrl: '/images/feira_livros_cover.png',
        category: 'Cultura',
        categoryColor: 'yellow',
        publishDate: getPastDate(62),
        author: 'Cultura Viva'
    },
    {
        id: 31,
        title: 'Dia D de vacinação pet acontece neste domingo',
        summary: 'Mutirão oferecerá vacina antirrábica gratuita para cães e gatos na Praça da Bíblia.',
        content: `
            <p>A Secretaria de Meio Ambiente convoca os tutores de cães e gatos para o Dia D de Vacinação Antirrábica. A imunização é gratuita e obrigatória para o controle da raiva.</p>
            <p>Equipes estarão concentradas na Praça da Bíblia das 9h às 17h. É importante levar os animais em caixas de transporte ou com guias e coleiras.</p>
        `,
        imageUrl: '/images/vacinacao_pet_cover.png',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(65),
        author: 'Saúde Animal'
    },
    {
        id: 32,
        title: 'Feira do Produtor ganha nova cobertura',
        summary: 'Reforma garante mais conforto para feirantes e clientes em dias de chuva.',
        content: `
            <p>A tradicional Feira do Produtor, realizada às quartas e sábados, agora conta com uma cobertura metálica totalmente nova. A obra era uma reivindicação antiga dos agricultores, que sofriam com a exposição ao sol forte e chuvas.</p>
            <p>"Agora temos dignidade para trabalhar e nossos clientes podem comprar com calma", comemorou o presidente da associação dos feirantes.</p>
        `,
        imageUrl: '/images/feira_produtor_roof_cover.png',
        category: 'Economia',
        categoryColor: 'indigo',
        publishDate: getPastDate(68),
        author: 'Agro Araucária'
    },
    {
        id: 33,
        title: 'Coral Municipal abre audições para novas vozes',
        summary: 'Interessados podem se inscrever até o fim do mês; não é preciso experiência profissional.',
        content: `
            <p>Se você gosta de cantar, essa é a sua chance. O Coral Municipal de Araucária abriu vagas para os naipes de soprano, contralto, tenor e baixo. As audições acontecerão na Casa da Cultura.</p>
            <p>O grupo se apresenta em eventos oficiais e festivais de música. Os ensaios são semanais e gratuitos.</p>
        `,
        imageUrl: '/images/coral_municipal_cover.png',
        category: 'Cultura',
        categoryColor: 'indigo',
        publishDate: getPastDate(70),
        author: 'Cultura Viva'
    },
    {
        id: 34,
        title: 'Parque Cachoeira recebe mutirão de limpeza',
        summary: 'Voluntários se reúnem para preservar um dos principais cartões postais da cidade.',
        content: `
            <p>Um grupo de 50 voluntários dedicou a manhã de domingo para cuidar do Parque Cachoeira. A ação envolveu o recolhimento de lixo nas trilhas e o plantio de 200 mudas de árvores nativas.</p>
            <p>A iniciativa visa conscientizar os visitantes sobre a importância de não deixar resíduos na natureza.</p>
        `,
        imageUrl: '/images/parque_cachoeira_cleanup_cover.png',
        category: 'Cidade',
        categoryColor: 'green',
        publishDate: getPastDate(72),
        author: 'EcoAção'
    },
    {
        id: 35,
        title: 'Araucária sedia encontro de carros antigos',
        summary: 'Relíquias automotivas invadem o Centro Cívico e atraem multidão.',
        content: `
            <p>O ronco dos motores clássicos tomou conta do Centro Cívico neste fim de semana. O 5º Encontro de Carros Antigos de Araucária reuniu colecionadores de todo o Brasil, com exposição de modelos raros das décadas de 20 a 80.</p>
            <p>O evento também contou com mercado de pulgas (peças antigas) e praça de alimentação com food trucks.</p>
        `,
        imageUrl: '/images/carros_antigos_cover.png',
        category: 'Cultura',
        categoryColor: 'yellow',
        publishDate: getPastDate(75),
        author: 'Motor News'
    },
    {
        id: 36,
        title: 'Prefeitura alerta para o prazo do IPTU',
        summary: 'Contribuintes têm até o dia 10 para pagar a cota única com desconto.',
        content: `
            <p>A Secretaria de Finanças reforça que o prazo para pagamento do IPTU com desconto de 15% na cota única encerra-se no próximo dia 10. Os carnês já foram entregues, mas a segunda via pode ser emitida pelo site oficial.</p>
            <p>A arrecadação do imposto é fundamental para os investimentos em saúde, educação e asfalto.</p>
        `,
        imageUrl: '/images/iptu_real_final_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: getPastDate(78),
        author: 'Finanças em Dia'
    },
    {
        id: 37,
        title: 'Novos horários de ônibus começam a valer segunda-feira',
        summary: 'CMTC anuncia ajustes nas linhas Tupy e Costeira para atender demanda.',
        content: `
            <p>A Companhia Municipal de Transporte Coletivo (CMTC) informou que, a partir desta segunda-feira, haverá alteração na grade de horários das linhas Tupy e Costeira. O objetivo é aumentar a frequência nos horários de pico da manhã e tarde.</p>
            <p>Os novos horários já estão disponíveis no aplicativo do transporte e nos terminais.</p>
        `,
        imageUrl: '/images/bus_schedule_main.png',
        category: 'Cidade',
        categoryColor: 'gray',
        publishDate: getPastDate(80),
        author: 'Mobilidade Urbana'
    },
    {
        id: 38,
        title: 'Semana do Meio Ambiente terá oficinas e palestras',
        summary: 'Programação inclui distribuição de mudas e gincana ecológica nas escolas.',
        content: `
            <p>Para celebrar a Semana Mundial do Meio Ambiente, a prefeitura organizou uma série de atividades educativas. O destaque fica para as oficinas de compostagem doméstica e reciclagem criativa, abertas ao público no Parque Tecnológico.</p>
            <p>"Pequenas atitudes mudam o mundo. Queremos engajar a população na preservação local", disse o diretor de meio ambiente.</p>
        `,
        imageUrl: '/images/environment_week_collage.webp',
        category: 'Cidade',
        categoryColor: 'green',
        publishDate: getPastDate(82),
        author: 'EcoNews'
    },
    {
        id: 39,
        title: 'Araucária Vôlei vence mais uma na Superliga B',
        summary: 'Time da casa mantém invencibilidade e lidera a competição nacional.',
        content: `
            <p>Em uma partida eletrizante, o Araucária Vôlei derrotou o time de Blumenau por 3 sets a 1 e manteve a liderança isolada da Superliga B. O ginásio estava lotado e a torcida empurrou o time em cada ponto.</p>
            <p>O próximo desafio será fora de casa, contra o vice-líder, valendo a ponta da tabela.</p>
        `,
        imageUrl: '/images/araucaria_volei_cover_final.webp',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: getPastDate(85),
        author: 'Esporte News'
    },
    {
        id: 40,
        title: 'Curso de culinária saudável forma primeira turma',
        summary: 'Projeto social capacita moradores para a geração de renda com alimentação.',
        content: `
            <p>Aconteceu ontem a formatura da primeira turma do projeto "Cozinha e Saúde". Vinte participantes receberam o certificado de conclusão do curso de culinária saudável e reaproveitamento de alimentos.</p>
            <p>Além de promover a saúde, o curso incentiva o empreendedorismo, ensinando a precificar e vender marmitas fit.</p>
        `,
        imageUrl: '/images/healthy_cooking_cover_real_final.webp',
        category: 'Cidade',
        categoryColor: 'red',
        publishDate: getPastDate(88),
        author: 'Cidadania Ativa'
    },
    {
        id: 41,
        title: 'Inscrições abertas para o concurso de fotografia',
        summary: 'Tema deste ano é "Olhares sobre Araucária"; prêmios chegam a R$ 2 mil.',
        content: `
            <p>Fotógrafos amadores e profissionais já podem inscrever seus trabalhos no 10º Concurso Municipal de Fotografia. O tema "Olhares sobre Araucária" convida a registrar as belezas urbanas e rurais da cidade.</p>
            <p>As melhores fotos farão parte de uma exposição itinerante e do calendário oficial do município.</p>
        `,
        imageUrl: '/images/photography_contest_cover_real_final.webp',
        category: 'Cultura',
        categoryColor: 'indigo',
        publishDate: getPastDate(90),
        author: 'Arte em Foco'
    },
    {
        id: 42,
        title: 'UBS do Califórnia terá horário estendido',
        summary: 'Unidade passa a atender até as 22h para facilitar acesso de trabalhadores.',
        content: `
            <p>A partir do próximo mês, a Unidade Básica de Saúde (UBS) do bairro Califórnia funcionará em horário estendido, das 7h às 22h. A medida visa atender a população que trabalha durante o dia e não consegue buscar atendimento no horário comercial.</p>
            <p>Serão ofertadas consultas médicas, odontológicas e vacinação no período noturno.</p>
        `,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
        category: 'Saúde',
        categoryColor: 'blue',
        publishDate: getPastDate(92),
        author: 'Saúde Agora'
    },
    {
        id: 43,
        title: 'FestaJunina das escolas municipais reúne famílias',
        summary: 'Quadrilhas, comidas típicas e brincadeiras animam o sábado letivo.',
        content: `
            <p>O sábado foi de festa nas escolas municipais. O tradicional "Arraiá da Educação" integrou família e escola com muita música, dança e pescaria.</p>
            <p>A renda arrecadada nas barracas de alimentação será revertida para melhorias nas próprias instituições, decididas pelas APMFs.</p>
        `,
        imageUrl: '/images/festa_junina_real_cover.webp',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: getPastDate(95),
        author: 'Educação Viva'
    },
    {
        id: 44,
        title: 'Câmara homenageia pioneiros da cidade',
        summary: 'Sessão solene entregou título de Cidadão Benemérito a personalidades locais.',
        content: `
            <p>Em uma noite de emoção, a Câmara Municipal realizou a entrega de títulos de Cidadão Benemérito a cinco personalidades que contribuíram para o desenvolvimento de Araucária. Entre os homenageados estavam professores aposentados e antigos comerciantes.</p>
            <p>"Reconhecer nossa história é valorizar nosso futuro", discursou o presidente da casa.</p>
        `,
        imageUrl: '/images/pioneers_homage_real_final_v2.png',
        category: 'Cidade',
        categoryColor: 'gold',
        publishDate: getPastDate(98),
        author: 'Memória Viva'
    },
    {
        id: 45,
        title: 'Jogos Escolares de Araucária começam nesta sexta',
        summary: 'Mais de 2 mil alunos atletas competem em 10 modalidades esportivas.',
        content: `
            <p>A tocha olímpica simbólica percorreu as escolas da cidade anunciando a abertura dos Jogos Escolares de Araucária (JEA). A cerimônia de abertura acontece nesta sexta-feira no Ginásio do CSU.</p>
            <p>Os jogos promovem a integração entre as escolas públicas e particulares, revelando novos talentos para o esporte municipal.</p>
        `,
        imageUrl: '/images/jea_real_final_v2.webp',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: getPastDate(100),
        author: 'Esporte na Escola'
    }
];

export const events: Event[] = [
    {
        id: 1,
        title: 'Festa do Pêssego',
        description: 'A tradicional celebração da colheita com a melhor gastronomia polonesa e shows regionais.',
        imageUrl: '/images/festa_pessego_real.webp',
        date: getUpcomingDate(5), // Daqui a 5 dias (Futuro)
        time: '18:00 - 23:00',
        location: 'Parque Cachoeira'
    },
    {
        id: 2,
        title: 'Feira Gastronômica Noturna',
        description: 'Pastel, pierogi e food trucks na praça central. Traga sua família!',
        imageUrl: '/images/food_trucks_cover_new_final.png?v=final_fix_v5',
        date: getUpcomingDate(2), // Daqui a 2 dias (Futuro Próximo)
        time: '18:00 - 22:00',
        location: 'Praça Central'
    },
    {
        id: 3,
        title: 'Concerto no Teatro da Praça',
        description: 'Apresentação especial da orquestra municipal com clássicos e música popular brasileira.',
        imageUrl: '/images/coral_municipal_internal_v2.png',
        date: getUpcomingDate(7), // Daqui a uma semana (Futuro)
        time: '19:30',
        location: 'Teatro da Praça'
    },
    {
        id: 4,
        title: 'Bazar Beneficente da APAE',
        description: 'Grande bazar com roupas, calçados e utensílios a preços acessíveis. Toda a renda será revertida para a instituição.',
        imageUrl: '/images/feira_livros_cover.png',
        date: getUpcomingDate(10),
        time: '09:00 - 17:00',
        location: 'Salão Paroquial Matriz'
    },
    {
        id: 5,
        title: 'Final do Campeonato Amador de Futebol',
        description: 'A grande decisão do campeonato varzeano de Araucária. Venha torcer pelo seu time do bairro!',
        imageUrl: '/images/araucaria_ec_jogo.webp',
        date: getUpcomingDate(14),
        time: '15:30',
        location: 'Estádio Municipal'
    }
];

export const businesses: Business[] = [
    {
        id: 1,
        name: 'Panificadora e Confeitaria Araucária',
        category: 'Alimentação',
        imageUrl: '/images/panificadora_araucaria_real.webp',
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
        imageUrl: '/images/bookstore_vinyl_real.webp',
        address: 'Av. Victor do Amaral, 456',
        phone: '(41) 3901-6789',
        website: 'livrariaexemplo.com.br',
        description: 'Acervo completo de livros novos e usados, vinis e raridades.'
    },
    {
        id: 3,
        name: 'Auto Mecânica Confiança',
        category: 'Serviços',
        imageUrl: '/images/auto_mechanic_shop_real.webp',
        address: 'Rodovia do Xisto, 789',
        phone: '(41) 3901-1011',
        website: 'mecanicaexemplo.com.br',
        description: 'Serviços completos de mecânica, elétrica e funilaria para seu veículo.'
    },
    {
        id: 4,
        name: 'Academia Corpo & Movimento',
        category: 'Serviços',
        imageUrl: '/images/gym_body_movement_real.webp',
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
        imageUrl: '/images/pharmacy_interior_real.webp',
        address: 'Av. Archelau de Almeida Torres, 500',
        phone: '(41) 3643-9999',
        website: 'farmaciasaude.com.br',
        description: 'Medicamentos, perfumaria e manipulação com os melhores preços.'
    },
    {
        id: 6,
        name: 'Pet Shop Amigo Fiel',
        category: 'Serviços',
        imageUrl: '/images/pet_shop_interior_real.webp',
        address: 'Rua Miguel Bertolino Pizatto, 88',
        phone: '(41) 3901-5555',
        website: 'petshopamigo.com.br',
        description: 'Banho, tosa e clínica veterinária 24 horas para seu melhor amigo.'
    },
    {
        id: 7,
        name: 'Restaurante Sabor da Terra',
        category: 'Alimentação',
        imageUrl: '/images/restaurant_buffet_real.webp',
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
