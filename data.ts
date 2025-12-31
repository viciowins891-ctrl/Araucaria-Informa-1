
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
        id: 3001,
        title: 'Araucária registra queda histórica no desemprego',
        summary: 'Novas indústrias e comércio fortalecido geram mais de 2.000 vagas no último trimestre.',
        content: `
            <p>A economia de Araucária vive um momento de ouro. Dados do CAGED divulgados hoje mostram que o município registrou o menor índice de desemprego dos últimos 5 anos, consolidando-se como um dos principais polos de geração de renda do estado.</p>
            
            <p>O "boom" econômico é impulsionado por dois motores principais: a expansão das plantas industriais no complexo petroquímico e a criação de novas empresas de logística. "Não estamos apenas gerando vagas, estamos criando carreiras. A demanda por mão de obra qualificada nunca foi tão alta", celebra o secretário de trabalho.</p>

            <h2>Impacto nos Bairros</h2>
            <p>O aquecimento da economia não fica restrito à zona industrial. O efeito cascata é visível nos bairros adjacentes como Capela Velha e Jardim Industrial. Com mais pessoas empregadas, o comércio local — de padarias a lojas de construção — registra aumento no faturamento.</p>

            <p>Lojistas da Avenida Archelau já sentem a diferença no movimento, impulsionado pelo aumento do poder de compra das famílias. O ciclo virtuoso se fecha com o setor de serviços, que tem aberto novas frentes de trabalho para atender a essa demanda crescente.</p>
        `,
        imageUrl: '/images/employment_drop_new_cover.png',
        mobileImageUrl: '/images/employment_drop_new_cover_mobile.webp',
        category: 'Economia',
        categoryColor: 'blue',
        internalImageUrl: '/images/araucaria_employment_internal_final_v5.png',
        publishDate: '2025-12-30', // DATA FUTURA PARA FORÇAR TOPO
        author: 'Redação Araucária'
    },
    {
        id: 3005,
        title: 'Parque Cachoeira terá cinema ao ar livre neste sábado',
        summary: 'Projeto "Cine Família" traz clássicos da animação para telão gigante no parque.',
        content: `
            <p>Prepare a pipoca e a canga! Neste sábado, o Parque Cachoeira se transforma em um grande cinema a céu aberto. O projeto "Cine Família", totalmente gratuito, exibirá filmes infantis a partir das 19h em um telão de alta definição montado próximo ao lago.</p>
            
            <p>A iniciativa visa não apenas oferecer lazer, mas também democratizar o acesso à cultura. "Muitas crianças nunca tiveram a experiência de ver um filme em tela grande. Trazer isso para o parque, um ambiente democrático por natureza, é transformar o espaço público em sala de estar da cidade", destaca a organização.</p>

            <h3>Impacto na Região e Economia Local</h3>
            <p>Eventos como este têm um efeito multiplicador na economia local. Segundo dados da Secretaria de Turismo, dias de evento no parque registram um aumento de até 40% no movimento de food trucks e comércios do entorno.</p>
            
            <p>Além do aspecto econômico, o cinema ao ar livre fortalece o sentimento de pertença e comunidade. Em tempos onde o entretenimento é muitas vezes individual e dentro de casa, reunir centenas de famílias no gramado cria memórias afetivas e reforça os laços sociais que tornam Araucária uma cidade mais acolhedora e segura.</p>
        `,
        imageUrl: '/images/cinema_cover_real_final_v7.jpg',
        mobileImageUrl: '/images/cinema_cover_real_final_v7_mobile.webp',
        category: 'Cultura',
        categoryColor: 'yellow',
        internalImageUrl: '/images/cinema_lion.png',
        publishDate: '2025-12-30', // DATA FUTURA PARA FORÇAR TOPO
        author: 'Cultura Viva'
    },
    {
        id: 3003,
        title: 'Hospital Municipal recebe equipamentos de última geração',
        summary: 'Novos tomógrafos e aparelhos de raio-x digital agilizam diagnósticos na rede pública.',
        content: `
            <p>A saúde pública de Araucária deu um salto de qualidade. Chegaram hoje ao Hospital Municipal (HMA) os novos equipamentos de diagnóstico por imagem, incluindo tomógrafos computadorizados de 64 canais e aparelhos de raio-x digital. O investimento visa humanizar o atendimento e acelerar diagnósticos complexos.</p>
            
            <p>Com tecnologia de ponta, os novos tomógrafos reduzem o tempo de exame em 50%, permitindo maior rotatividade. "A meta é zerar a fila de espera por exames de imagem em até quatro semanas", projeta a direção clínica.</p>

            <h2>Saúde Perto de Casa</h2>
            <p>O impacto para a população é direto: fim das longas viagens de ambulância para Curitiba ou Campo Largo apenas para realizar exames. Moradores de bairros mais distantes, como o Guajuvira, agora contam com resolutividade dentro do próprio município.</p>

            <p>A modernização do parque tecnológico do HMA também atrai especialistas médicos para a cidade, fortalecendo a rede de atendimento especializada disponível para todos os araucarienses.</p>
        `,
        imageUrl: '/images/hospital_equipment_araucaria_final_v5.png',
        mobileImageUrl: '/images/hospital_equipment_araucaria_final_v5_mobile.webp',
        category: 'Saúde',
        categoryColor: 'green',
        internalImageUrl: '/images/hospital_delivery_trucks_internal.png',
        publishDate: '2025-12-29',
        author: 'Saúde Agora'
    },
    {
        id: 3004,
        title: 'Escolas da rede municipal ganham hortas comunitárias',
        summary: 'Alunos aprendem sobre sustentabilidade e alimentação saudável cultivando os próprios alimentos.',
        content: `
            <p>Da terra para o prato da merenda. Esse é o lema do projeto "Sementes do Futuro", já implantado em 10 escolas municipais de Araucária. A iniciativa transforma pátios ociosos em salas de aula a céu aberto, onde alunos aprendem na prática sobre ciclos naturais, biologia e responsabilidade ambiental.</p>
            
            <p>Os vegetais colhidos — alface, tomate, cenoura e temperos — vão direto para a cozinha da escola, enriquecendo o cardápio com alimentos frescos e livres de agrotóxicos. "As crianças comem com mais gosto o que elas mesmas plantaram", relata uma nutricionista da rede.</p>

            <h2>Impacto nos Bairros Adjacentes</h2>
            <p>O projeto ultrapassa os muros da escola e gera impacto positivo direto na vizinhança. Famílias de bairros adjacentes participam dos mutirões de colheita nos fins de semana e recebem consultoria para criar suas próprias hortas domésticas, fortalecendo a segurança alimentar e os laços comunitários da região.</p>
        `,
        imageUrl: '/images/hortas_escolas_cover_v27.jpg',
        mobileImageUrl: '/images/hortas_escolas_cover_v27_mobile.webp',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/school_garden_internal_final_v5.png',
        publishDate: '2025-12-29',
        author: 'Educação Futuro'
    },
    {
        id: 3002,
        title: 'Araucária lidera ranking de cidades inteligentes do PR',
        summary: 'Conectividade, semáforos inteligentes e serviços digitais colocam o município no topo.',
        content: `
            <p>Araucária é, oficialmente, a cidade mais inteligente da região metropolitana. O mais recente ranking nacional de Smart Cities colocou o município em destaque pela sua ampla cobertura de Wi-Fi gratuito em praças e parques, além da digitalização de 100% dos serviços públicos municipais.</p>
            
            <p>Hoje, é possível abrir empresas, solicitar alvarás ou agendar consultas médicas sem sair de casa, pelo aplicativo "Araucária Digital". "A tecnologia serve para facilitar a vida do cidadão, devolvendo a ele o tempo que antes era perdido em filas", afirmou o prefeito.</p>

            <h2>Inclusão Digital nos Bairros</h2>
            <p>A conectividade chegou forte nas áreas residenciais. Praças em bairros como Califórnia, CSU e Tupy agora contam com internet de alta velocidade gratuita. Isso democratiza o acesso à informação e permite que estudantes e trabalhadores utilizem os espaços públicos para estudos e qualificação profissional, impulsionando o desenvolvimento local.</p>
        `,
        imageUrl: '/images/araucaria_smart_city_final_v8.png',
        mobileImageUrl: '/images/araucaria_smart_city_final_v8_mobile.webp',
        internalImageUrl: '/images/araucaria_smart_city_internal_collage_final_v5.png',
        category: 'Tecnologia',
        categoryColor: 'indigo',
        publishDate: '2025-12-29',
        author: 'Tech News'
    },
    {
        id: 3006,
        title: 'Ginásio Joval de Paula Souza será palco de final estadual',
        summary: 'Araucária recebe as melhores equipes de vôlei do Paraná para disputa do título.',
        content: `
            <p>O esporte respira em Araucária. A Federação Paranaense confirmou que nossa cidade será a sede das finais do Campeonato Paranaense de Vôlei, consolidando o município como referência na organização de grandes eventos esportivos.</p>
            
            <p>As partidas, que reunirão as quatro melhores equipes do estado, prometem lotar o Ginásio Joval de Paula Souza. A expectativa da organização é receber mais de 2.000 torcedores por dia. "A estrutura do ginásio foi totalmente revitalizada para oferecer conforto e segurança às famílias", destaca o diretor de esportes.</p>

            <p>Além do espetáculo em quadra, o evento tem um forte cunho social. Os ingressos serão solidários, trocados por 1kg de alimento não perecível, que será destinado ao Programa de Segurança Alimentar do município.</p>

            <h2>Movimento nos Bairros Vizinhos</h2>
            <p>A realização de um evento deste porte traz reflexos imediatos para além das quadras. Bairros no entorno do ginásio, como o Centro e o Fazenda Velha, preparam-se para um final de semana atípico e lucrativo.</p>
            
            <p>Donos de lanchonetes, postos de gasolina e pequenos comércios locais já reforçaram seus estoques prevendo o aumento do fluxo de visitantes. A circulação de torcedores de outras cidades também movimenta a rede hoteleira e gastronômica, injetando capital novo na economia local e valorizando o potencial turístico-esportivo de Araucária.</p>
        `,
        imageUrl: '/images/gym_volleyball_final_cover_v5.png',
        mobileImageUrl: '/images/gym_volleyball_final_cover_v5_mobile.webp',
        category: 'Esporte',
        categoryColor: 'orange',
        internalImageUrl: '/images/gym_volleyball_internal_final_v5.png',
        publishDate: '2025-12-29',
        author: 'Esporte News'
    },
    {
        id: 101, // ID Único Real
        title: 'Araucária zera fila de espera por vagas em CMEIs para 2025',
        summary: 'Prefeitura anuncia que todas as 1.500 crianças de 0 a 3 anos inscritas tiveram vagas ofertadas.',
        content: `
            <p>Um marco histórico para a educação de Araucária. A Secretaria Municipal de Educação confirmou nesta semana que a fila de espera por vagas em Centros Municipais de Educação Infantil (CMEIs) foi totalmente zerada.</p>
            
            <p>O avanço beneficia cerca de 1.500 famílias que aguardavam vaga para o ano letivo de 2025. "Trabalhamos duro na ampliação das unidades e em parcerias para garantir esse direito fundamental", afirmou a secretária.</p>

            <h2>Alívio no Califórnia e Tupy</h2>
            <p>A medida traz impacto imediato para pais que residem em áreas de alta demanda, como **Califórnia** e **Tupy**. Com a vaga garantida próxima a casa, as famílias economizam tempo de deslocamento. O comércio local, como papelarias e lojas de uniformes nessas regiões, já projeta um aumento nas vendas para o início do ano letivo.</p>
        `,
        imageUrl: '/images/custom_cmei_official.webp', // Versão Otimizada (WebP) para LCP rápido
        mobileImageUrl: '/images/custom_cmei_official_mobile.webp',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/cmei_interior_pessoas.png',
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

            <h2>Obras no Industrial e Thomaz Coelho</h2>
            <p>Entre os destaques, está a revitalização asfáltica de vias arteriais no **Jardim Industrial** e **Thomaz Coelho**. A previsão é que as obras melhorem a fluidez do trânsito para quem se desloca diariamente para a capital. Além disso, recursos foram alocados para a reforma de UBSs no **Tindiquera**, atendendo a uma demanda antiga da comunidade.</p>
        `,
        imageUrl: '/images/news_budget.png', // Nova imagem gerada (Nano Banana Pro)
        mobileImageUrl: '/images/news_budget_mobile.webp',
        category: 'Economia',
        categoryColor: 'blue',
        internalImageUrl: '/images/prefeitura_orcamento_real.png',
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

            <h2>Facilidade para a Zona Rural</h2>
            <p>A localização estratégica no Centro beneficia especialmente moradores de áreas rurais distantes, como **Guajuvira** e **Roça Nova**. Antes obrigados a viajar até Curitiba para simples emissões de documentos, agora esses cidadãos resolvem pendências rapidamente, aproveitando a viagem para consumir no comércio central de Araucária.</p>
        `,
        imageUrl: '/images/custom_poupatempo_official.webp', // Foto oficial externa sem máscaras
        mobileImageUrl: '/images/custom_poupatempo_official_mobile.webp',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/poupatempo_atendimento_pessoas.png',
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

            <h2>Melhorias no Capela Velha</h2>
            <p>Parte significativa dos R$ 18 milhões será destinada à ampliação de escolas no bairro **Capela Velha**, uma das regiões que mais cresce na cidade. A construção de novas salas de aula e quadras poliesportivas promete transformar a realidade escolar local, oferecendo infraestrutura de ponta para centenas de alunos.</p>
        `,
        imageUrl: '/images/news_investments.png', // Nova imagem gerada (Nano Banana Pro)
        mobileImageUrl: '/images/news_investments_mobile.webp',
        category: 'Política',
        categoryColor: 'purple',
        internalImageUrl: '/images/investimento_federal_real.png',
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

            <h2>Segurança no Campina da Barra</h2>
            <p>A operação teve foco especial em pontos críticos denunciados pela comunidade do **Campina da Barra**. A retirada de circulação dessa grande quantidade de entorpecentes impacta diretamente na redução de pequenos furtos na região, devolvendo a sensação de segurança para comerciantes e moradores que transitam pelo bairro à noite.</p>
        `,
        imageUrl: '/images/custom_drugs.webp', // Nova imagem gerada (Nano Banana Pro)
        mobileImageUrl: '/images/custom_drugs_mobile.webp',
        category: 'Segurança',
        categoryColor: 'red',
        internalImageUrl: '/images/operacao_pcpr_viaturas.png',
        publishDate: '2025-12-10',
        author: 'PCPR'
    },
    {
        id: 106,
        title: 'Vacinação contra Vírus Sincicial Respiratório (VSR) para gestantes',
        summary: 'Saúde inicia imunização para proteger recém-nascidos de infecções graves.',
        content: `
            <p>A Secretaria Municipal de Saúde iniciou a campanha de vacinação contra o VSR voltada para gestantes. A medida visa transmitir anticorpos para o bebê ainda na gestação, garantindo proteção contra bronquiolites e pneumonias nos primeiros meses de vida.</p>
            
            <p>As doses estão disponíveis em todas as Unidades Básicas de Saúde (UBS) do município para o público-alvo.</p>

            <h2>Adesão no CSU e Boqueirão</h2>
            <p>As UBSs do **CSU** e **Boqueirão** registraram a maior procura no primeiro dia de campanha. Gestantes dessas comunidades destacam a facilidade de ter o imunizante perto de casa. "É uma tranquilidade saber que meu bebê já vai nascer protegido", relatou uma futura mãe moradora do Boqueirão.</p>
        `,
        imageUrl: '/images/vacinacao_meta_2024.webp',
        category: 'Saúde',
        categoryColor: 'blue',
        internalImageUrl: '/images/news_vaccine_pregnant.png',
        publishDate: '2025-12-08',
        author: 'Saúde Agora'
    },
    {
        id: 107,
        title: 'Cantata de Natal emociona fiéis no Santuário',
        summary: 'Apresentação "Um Conto de Natal" reuniu centenas de pessoas no fim de semana.',
        content: `
            <p>O clima natalino tomou conta de Araucária com a belíssima apresentação da Cantata 'Um Conto de Natal' na Paróquia Nossa Senhora do Perpétuo Socorro. O evento contou com coral infantil e orquestra, emocionando o público presente.</p>
            
            <p>Novas apresentações estão programadas para o próximo fim de semana na Praça da Matriz.</p>

            <h2>Turismo Regional</h2>
            <p>O evento atraiu não apenas moradores do Centro, mas caravanas de bairros como **Iguaçu** e **Estação**. O brilho das luzes e a música clássica movimentaram as cafeterias e sorveterias do entorno da Praça, que operaram com lotação máxima, celebrando o espírito natalino e o aquecimento da economia local.</p>
        `,
        imageUrl: '/images/cantata_natal_real.png', // Nova imagem gerada
        mobileImageUrl: '/images/cantata_natal_real_mobile.webp',
        category: 'Cultura',
        categoryColor: 'indigo',
        internalImageUrl: '/images/news_christmas_cantata.png',
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

            <h2>Jardim Turim Afetado</h2>
            <p>Os ventos fortes causaram quedas de árvores principalmente na região do **Jardim Turim** e **Shangri-lá**. Equipes da Prefeitura concentraram esforços nessas localidades durante a madrugada para desobstruir vias e garantir o retorno da energia, minimizando os transtornos para os moradores.</p>
        `,
        imageUrl: '/images/news_cyclone_energy.png', // Eletricistas no Caminhão (Nano Banana Pro)
        mobileImageUrl: '/images/news_cyclone_energy_mobile.webp',
        category: 'Cidade',
        categoryColor: 'gray',
        internalImageUrl: '/images/copel_repair_real_v2.png',
        publishDate: '2025-12-01',
        author: 'Tempo Agora'
    },
    {
        id: 109, // Novo ID para o Ginásio
        title: 'Ginásio Joval de Paula Souza será reformado',
        summary: 'Prefeitura anuncia revitalização completa do complexo esportivo no Parque Cachoeira.',
        content: `
            <p>Um dos principais palcos do esporte araucariense, o Ginásio Joval de Paula Souza, passará por uma ampla reforma. O anúncio foi feito pela Secretaria de Esporte e Lazer, que prevê melhorias no piso da quadra, vestiários e cobertura.</p>
            
            <p>As obras devem começar no próximo mês e visam oferecer mais conforto e segurança para atletas e torcedores.</p>

            <h2>Alternativa para Atletas</h2>
            <p>Durante as obras, as escolinhas de vôlei e futsal que atendem crianças do **Parque Cachoeira** e **Centro** serão transferidas temporariamente para ginásios no **Fazenda Velha**. A medida garante que nenhum atleta tenha seu treinamento interrompido, mantendo o calendário esportivo da cidade ativo e descentralizado.</p>
        `,
        imageUrl: '/images/custom_gym_official.png', // Foto oficial (Enviada pelo User)
        mobileImageUrl: '/images/custom_gym_official_mobile.webp',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/gym_interior_renovation.png',
        publishDate: getPastDate(4),
        author: 'Esporte News'
    },
    {
        id: 110,
        title: 'Feira Gastronômica traz Food Trucks e música para o Centro',
        summary: 'Evento na Praça Central reúne o melhor da culinária de rua e opções de lazer para toda a família.',
        content: `
            <p>A Praça Central de Araucária se transformou no ponto de encontro oficial das famílias neste fim de semana. A Feira Gastronômica Noturna bateu recorde de público, reunindo mais de 20 opções de Food Trucks que oferecem uma verdadeira volta ao mundo gastronômica — do clássico hambúrguer artesanal ao pierogi polonês, patrimônio da nossa cidade.</p>

            <p>Além dos sabores, o evento se destaca pela segurança e organização. "É um ambiente pensado para que pais possam trazer seus filhos com tranquilidade, curtir boa música ao vivo e valorizar os artistas da terra", afirma a organização.</p>

            <p>A movimentação não se restringe apenas ao Centro. Bairros vizinhos como Fazenda Velha, Estação e Vila Nova sentem o reflexo positivo imediato. Moradores dessas regiões aproveitam a proximidade para frequentar a feira a pé, ocupando os espaços públicos e aquecendo o comércio local no trajeto, como padarias e pequenos mercados.</p>

            <p>Para quem vem de mais longe, como do Jardim Iguaçu ou Costeira, a feira se tornou o principal destino de lazer nas noites de sexta e sábado, integrando diferentes regiões da cidade em um único espaço de convivência.</p>
        `,
        imageUrl: '/images/food_trucks_cover_v27.png',
        mobileImageUrl: '/images/food_trucks_cover_v26_mobile.webp',
        internalImageUrl: '/images/food_trucks_internal_v26.png',
        category: 'Lazer',
        categoryColor: 'yellow',
        publishDate: getPastDate(0), // Atualizado para hoje para garantir visibilidade
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
        internalImageUrl: '/images/rural_tourism_araucaria_path.png',
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
        internalImageUrl: '/images/news_vaccination_indoor_campaign.png',
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
        internalImageUrl: '/images/childrens_theater_stage_play.png',
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
        internalImageUrl: '/images/new_bike_path_industrial.png',
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
        internalImageUrl: '/images/road_repair_pothole_asphalt.png',
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
        internalImageUrl: '/images/municipal_guard_real.png',
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
        internalImageUrl: '/images/hospital_pediatric_ward_interior.png',
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
        internalImageUrl: '/images/school_robotics_fair_project.png',
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
        internalImageUrl: '/images/new_supermarket_interior.png',
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
        internalImageUrl: '/images/river_cleanup_volunteers.png',
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
        internalImageUrl: '/images/news_chess_inner_araucaria.png',
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
        internalImageUrl: '/images/vocational_training_industrial_class.png',
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
        internalImageUrl: '/images/rural_tourism_signage_araucaria.png',
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
        internalImageUrl: '/images/school_transport_app_araucaria.png',
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
        internalImageUrl: '/images/plaza_bible_internal_real.jpg',
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
        internalImageUrl: '/images/news_hackathon_coding.png',
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
        internalImageUrl: '/images/araucaria_futsal_real.jpg',
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
        internalImageUrl: '/images/campanha_agasalho_internal.jpg',
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
        internalImageUrl: '/images/binario_centro_internal.jpg',
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
        internalImageUrl: '/images/festival_gastronomico_internal.jpg',
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
        internalImageUrl: '/images/lousas_digitais_internal.jpg',
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
        internalImageUrl: '/images/logistica_vagas_internal.jpg',
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
        internalImageUrl: '/images/iluminacao_led_internal.jpg',
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
        internalImageUrl: '/images/feira_livros_internal_real.jpg',
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
        internalImageUrl: '/images/vacinacao_pet_internal.png',
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
        internalImageUrl: '/images/feira_produtor_roof_internal.png',
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
        internalImageUrl: '/images/coral_municipal_internal_v2.png',
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
        internalImageUrl: '/images/parque_cachoeira_internal_v2.png',
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
        internalImageUrl: '/images/carros_antigos_internal_v2.png',
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
        internalImageUrl: '/images/iptu_real_queue_final.jpg',
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
        internalImageUrl: '/images/bus_schedule_real_final_v5.png',
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
        internalImageUrl: '/images/environment_week_real_final_v1.jpg',
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
        imageUrl: '/images/araucaria_volei_new_final.jpg',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/araucaria_volei_inner_final.png',
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
        internalImageUrl: '/images/healthy_cooking_real_final_v1.jpg',
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
        internalImageUrl: '/images/photography_contest_camera_internal.jpg',
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
        internalImageUrl: '/images/ubs_california_inner_real_final.jpg',
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
        internalImageUrl: '/images/festa_junina_inner_real_final.jpg',
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
        internalImageUrl: '/images/pioneers_homage_inner_real_final.jpg',
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
        internalImageUrl: '/images/school_games_torch_internal.jpg',
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
        imageUrl: '/images/feira_gastronomica_event_cover.jpg',
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
        imageUrl: '/images/bazar_apae_event.png',
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
    },
    {
        id: 6,
        title: 'Exposição de Flores da Primavera (Exemplo Futuro)',
        description: 'Um espetáculo de cores e aromas com produtores locais de flores e plantas ornamentais.',
        imageUrl: '/images/flores_spring.jpg',
        date: '25/09/2026',
        time: '09:00 - 18:00',
        location: 'Parque Cachoeira'
    },
    {
        id: 7,
        title: 'Corrida de Rua de Araucária (Exemplo Futuro)',
        description: 'Desafio de 5km e 10km pelas ruas da cidade. Inscrições abertas!',
        imageUrl: '/images/araucaria_run.jpg',
        date: '15/11/2026',
        time: '07:00 (Largada)',
        location: 'Praça da Bíblia'
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
