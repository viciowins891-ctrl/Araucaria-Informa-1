
import { NewsArticle, Event, Business } from './types';

// Função auxiliar APENAS para Eventos (para que pareçam sempre futuros/próximos)
const getUpcomingDate = (daysFromNow: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('pt-BR'); // Retorna formato DD/MM/AAAA
};

// URLs atualizadas para imagens urbanas e contextuais de alta qualidade.
// Garante que não tenhamos links quebrados e que a estética seja coesa.

export const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: 'Revitalização do Centro Histórico e Praça Central',
        summary: 'A prefeitura entregou as obras de melhoria no entorno da Igreja Matriz, com foco na preservação das araucárias centenárias.',
        content: `
            <p>A Prefeitura de Araucária entregou oficialmente as obras de revitalização do Centro Histórico e da Praça Central Dr. Vicente Machado. O projeto, que durou cerca de oito meses, teve como principal objetivo a valorização do patrimônio histórico e a preservação das araucárias centenárias que dão nome à cidade.</p>
            
            <p>Entre as melhorias realizadas, destacam-se a troca de todo o calçamento por paver drenante, a instalação de nova iluminação em LED, que garante mais segurança aos frequentadores no período noturno, e a restauração dos bancos e do coreto.</p>
            
            <p>"Esta obra não é apenas estética, é um resgate da nossa identidade. A praça é o coração da cidade e precisava desse cuidado", afirmou o secretário de Urbanismo durante a cerimônia. O paisagismo também foi renovado, com o plantio de flores da estação e a manutenção cuidadosa das árvores nativas.</p>

            <p>A população já pode usufruir do espaço, que contará com uma agenda cultural especial nos finais de semana, incluindo feiras de artesanato e apresentações musicais.</p>
        `,
        // Imagem: Praça pública com igreja/arquitetura histórica ao fundo
        imageUrl: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '15/03/2024',
        author: 'Redação Municipal'
    },
    {
        id: 2,
        title: 'REPAR bate recorde de eficiência energética',
        summary: 'A Refinaria Presidente Getúlio Vargas, ícone industrial da cidade, anuncia novos índices de produtividade.',
        content: `
            <p>A Refinaria Presidente Getúlio Vargas (REPAR), localizada em Araucária, anunciou que atingiu um novo recorde de eficiência energética em suas operações. O marco reforça a posição da unidade como uma das mais importantes do sistema de refino nacional.</p>
            
            <p>Segundo o relatório técnico divulgado, a refinaria conseguiu aumentar sua produção de diesel S-10 e gasolina, reduzindo simultaneamente o consumo de energia e a emissão de gases de efeito estufa. Isso foi possível graças à implementação de novas tecnologias de automação e ao aprimoramento dos processos de craqueamento catalítico.</p>
            
            <p>O impacto econômico para a região é significativo. A REPAR é responsável por uma grande fatia da arrecadação de impostos do município, e o aumento da eficiência garante a manutenção de postos de trabalho e atrai empresas satélites para o polo industrial.</p>
            
            <p>Especialistas do setor de energia apontam que Araucária continua sendo um ponto estratégico para a logística de combustíveis no sul do Brasil, abastecendo não apenas o Paraná, mas também partes de Santa Catarina e Mato Grosso do Sul.</p>
        `,
        // Imagem: Indústria / Refinaria ao pôr do sol (Clássica de Araucária)
        imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1000',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '10/04/2024',
        author: 'Carlos Mendes'
    },
    {
        id: 3,
        title: 'Araucária EC disputa liderança no Estádio do Pinhão',
        summary: 'O time da casa conta com a torcida para o confronto decisivo deste domingo no municipal.',
        content: `
            <p>O clima é de decisão em Araucária. O Araucária Esporte Clube (AEC) entra em campo no Estádio Municipal do Pinhão valendo a liderança do campeonato estadual da segunda divisão. A expectativa é de casa cheia.</p>
            
            <p>O time vem de uma sequência invicta de cinco jogos e aposta na força do ataque, comandado pelo artilheiro da competição, para superar o adversário. Durante a semana, o técnico realizou treinos táticos focados na bola parada, que tem sido uma das principais armas da equipe.</p>
            
            <p>"A torcida é o nosso 12º jogador. Precisamos lotar o Pinhão e empurrar o time do começo ao fim", convocou o capitão da equipe em entrevista coletiva. Os ingressos já estão à venda na bilheteria do estádio e em pontos comerciais parceiros.</p>
            
            <p>Além do jogo, haverá uma ação social no intervalo, com sorteio de brindes e arrecadação de alimentos não perecíveis para instituições de caridade locais.</p>
        `,
        // Imagem: Estádio de Futebol com gramado verde
        imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=1000', 
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '22/05/2024',
        author: 'Esporte Araucária'
    },
    {
        id: 4,
        title: 'Projeto Social leva Judô para escolas municipais',
        summary: 'Iniciativa tem formado cidadãos através da disciplina e prática esportiva no contraturno escolar.',
        content: `
            <p>Um projeto inovador está transformando a rotina de crianças da rede municipal de ensino em Araucária. O programa "Tatame Cidadão" oferece aulas gratuitas de Judô no contraturno escolar, unindo esporte, disciplina e educação.</p>
            
            <p>Atualmente atendendo mais de 200 alunos, a iniciativa visa não apenas formar atletas, mas principalmente cidadãos. "O Judô ensina respeito ao próximo, autocontrole e persistência. São valores que as crianças levam para a sala de aula e para a vida", explica o sensei coordenador do projeto.</p>
            
            <p>Os resultados já são visíveis: diretores das escolas participantes relatam melhora no comportamento e no rendimento escolar dos praticantes. Além disso, alguns alunos já começam a se destacar em competições regionais, trazendo medalhas para a cidade.</p>
            
            <p>Para o próximo ano, a Secretaria de Educação planeja expandir o projeto para mais três escolas, além de incluir novas modalidades de artes marciais.</p>
        `,
        // Imagem: Kimonos/Judô
        imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=1000',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '05/06/2024',
        author: 'Ana Silva'
    },
    {
        id: 5,
        title: 'Tecnologia: Araucária investe em Cidades Inteligentes',
        summary: 'Novos pontos de Wi-Fi gratuito e monitoramento digital começam a ser instalados nos bairros.',
        content: `
            <p>Araucária está dando passos largos rumo ao futuro. A prefeitura iniciou nesta semana a instalação de novos pontos de Wi-Fi gratuito em praças e parques da cidade, como parte do programa "Araucária Conectada".</p>
            
            <p>Além da internet livre, o projeto contempla a instalação de câmeras de monitoramento inteligente integradas à Guarda Municipal. Esses equipamentos utilizam inteligência artificial para identificar placas de veículos suspeitos e situações de risco, aumentando a segurança nos bairros.</p>
            
            <p>Outra novidade é a modernização dos semáforos nas principais avenidas, que passarão a ser sincronizados digitalmente para melhorar o fluxo do trânsito nos horários de pico (a chamada "onda verde").</p>
            
            <p>"Queremos usar a tecnologia para facilitar a vida do cidadão, seja garantindo acesso à informação ou melhorando a mobilidade urbana", destacou o diretor de Tecnologia da Informação do município.</p>
        `,
        // Imagem: Tecnologia urbana / Conectividade
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        publishDate: '12/08/2024',
        author: 'Tech News'
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
        // Imagem: Estrada rural tranquila com natureza
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: '30/09/2024',
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
        imageUrl: 'https://images.unsplash.com/photo-1632613713312-3026338e5557?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '02/10/2024',
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
        publishDate: '15/10/2024',
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
        imageUrl: 'https://images.unsplash.com/photo-1528629297340-d1d46694574e?auto=format&fit=crop&q=80&w=1000',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '20/10/2024',
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
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '25/10/2024',
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
        imageUrl: 'https://images.unsplash.com/photo-1555627034-7033509618f0?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '28/10/2024',
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
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '01/11/2024',
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
        imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a78e?auto=format&fit=crop&q=80&w=1000',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '05/11/2024',
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
        publishDate: '08/11/2024',
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
        imageUrl: 'https://images.unsplash.com/photo-1618477461853-586eff3f7280?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '12/11/2024',
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
        publishDate: '15/11/2024',
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
        publishDate: '18/11/2024',
        author: 'Carreira e Futuro'
    }
];

export const events: Event[] = [
    {
        id: 1,
        title: 'Festa do Pêssego',
        description: 'A tradicional celebração da colheita com a melhor gastronomia polonesa e shows regionais.',
        imageUrl: 'https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&q=80&w=1000',
        date: getUpcomingDate(5), // Daqui a 5 dias (Futuro)
        time: '18:00 - 23:00',
        location: 'Parque Cachoeira'
    },
    {
        id: 2,
        title: 'Feira Gastronômica Noturna',
        description: 'Pastel, pierogi e food trucks na praça central. Traga sua família!',
        imageUrl: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&q=80&w=1000',
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
        imageUrl: 'https://images.unsplash.com/photo-1556217477-d325251ece38?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua das Flores, 123 - Centro',
        phone: '(41) 3901-2345',
        website: 'padariaexemplo.com.br'
    },
    {
        id: 2,
        name: 'Livraria e Sebo Cultural',
        category: 'Varejo',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000',
        address: 'Av. Victor do Amaral, 456',
        phone: '(41) 3901-6789',
        website: 'livrariaexemplo.com.br'
    },
    {
        id: 3,
        name: 'Auto Mecânica Confiança',
        category: 'Serviços',
        imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=1000',
        address: 'Rodovia do Xisto, 789',
        phone: '(41) 3901-1011',
        website: 'mecanicaexemplo.com.br'
    },
    {
        id: 4,
        name: 'Academia Corpo & Movimento',
        category: 'Serviços',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua São Vicente, 200 - Centro',
        phone: '(41) 3642-0000',
        website: 'academiacm.com.br'
    },
    {
        id: 5,
        name: 'Farmácia Saúde Total',
        category: 'Varejo',
        imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=1000',
        address: 'Av. Archelau de Almeida Torres, 500',
        phone: '(41) 3643-9999',
        website: 'farmaciasaude.com.br'
    },
    {
        id: 6,
        name: 'Pet Shop Amigo Fiel',
        category: 'Serviços',
        imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua Miguel Bertolino Pizatto, 88',
        phone: '(41) 3901-5555',
        website: 'petshopamigo.com.br'
    },
    {
        id: 7,
        name: 'Restaurante Sabor da Terra',
        category: 'Alimentação',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua Pedro Druszcz, 150',
        phone: '(41) 3642-7777',
        website: 'sabordaterra.com.br'
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
