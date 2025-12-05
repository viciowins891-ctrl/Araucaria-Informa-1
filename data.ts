
import { NewsArticle, Event, Business } from './types';

// URLs atualizadas para imagens urbanas e contextuais de alta qualidade.
// Garante que não tenhamos links quebrados e que a estética seja coesa.

export const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: 'Revitalização do Centro Histórico e Praça Central',
        summary: 'A prefeitura entregou as obras de melhoria no entorno da Igreja Matriz, com foco na preservação das araucárias centenárias.',
        content: `
            <p>A Prefeitura de Araucária entregou oficialmente nesta manhã as obras de revitalização do Centro Histórico e da Praça Central Dr. Vicente Machado. O projeto, que durou cerca de oito meses, teve como principal objetivo a valorização do patrimônio histórico e a preservação das araucárias centenárias que dão nome à cidade.</p>
            
            <p>Entre as melhorias realizadas, destacam-se a troca de todo o calçamento por paver drenante, a instalação de nova iluminação em LED, que garante mais segurança aos frequentadores no período noturno, e a restauração dos bancos e do coreto.</p>
            
            <p>"Esta obra não é apenas estética, é um resgate da nossa identidade. A praça é o coração da cidade e precisava desse cuidado", afirmou o secretário de Urbanismo durante a cerimônia. O paisagismo também foi renovado, com o plantio de flores da estação e a manutenção cuidadosa das árvores nativas.</p>

            <p>A população já pode usufruir do espaço, que contará com uma agenda cultural especial nos finais de semana, incluindo feiras de artesanato e apresentações musicais.</p>
        `,
        // Imagem: Praça pública com igreja/arquitetura histórica ao fundo
        imageUrl: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: 'Publicado hoje',
        author: 'Redação Municipal'
    },
    {
        id: 2,
        title: 'REPAR bate recorde de eficiência energética',
        summary: 'A Refinaria Presidente Getúlio Vargas, ícone industrial da cidade, anuncia novos índices de produtividade.',
        content: `
            <p>A Refinaria Presidente Getúlio Vargas (REPAR), localizada em Araucária, anunciou nesta semana que atingiu um novo recorde de eficiência energética em suas operações. O marco reforça a posição da unidade como uma das mais importantes do sistema de refino nacional.</p>
            
            <p>Segundo o relatório técnico divulgado, a refinaria conseguiu aumentar sua produção de diesel S-10 e gasolina, reduzindo simultaneamente o consumo de energia e a emissão de gases de efeito estufa. Isso foi possível graças à implementação de novas tecnologias de automação e ao aprimoramento dos processos de craqueamento catalítico.</p>
            
            <p>O impacto econômico para a região é significativo. A REPAR é responsável por uma grande fatia da arrecadação de impostos do município, e o aumento da eficiência garante a manutenção de postos de trabalho e atrai empresas satélites para o polo industrial.</p>
            
            <p>Especialistas do setor de energia apontam que Araucária continua sendo um ponto estratégico para a logística de combustíveis no sul do Brasil, abastecendo não apenas o Paraná, mas também partes de Santa Catarina e Mato Grosso do Sul.</p>
        `,
        // Imagem: Indústria / Refinaria ao pôr do sol (Clássica de Araucária)
        imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1000',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: 'Publicado ontem',
        author: 'Carlos Mendes'
    },
    {
        id: 3,
        title: 'Araucária EC disputa liderança no Estádio do Pinhão',
        summary: 'O time da casa conta com a torcida para o confronto decisivo deste domingo no municipal.',
        content: `
            <p>O clima é de decisão em Araucária. Neste domingo, o Araucária Esporte Clube (AEC) entra em campo no Estádio Municipal do Pinhão valendo a liderança do campeonato estadual da segunda divisão. A expectativa é de casa cheia.</p>
            
            <p>O time vem de uma sequência invicta de cinco jogos e aposta na força do ataque, comandado pelo artilheiro da competição, para superar o adversário. Durante a semana, o técnico realizou treinos táticos focados na bola parada, que tem sido uma das principais armas da equipe.</p>
            
            <p>"A torcida é o nosso 12º jogador. Precisamos lotar o Pinhão e empurrar o time do começo ao fim", convocou o capitão da equipe em entrevista coletiva. Os ingressos já estão à venda na bilheteria do estádio e em pontos comerciais parceiros.</p>
            
            <p>Além do jogo, haverá uma ação social no intervalo, com sorteio de brindes e arrecadação de alimentos não perecíveis para instituições de caridade locais.</p>
        `,
        // Imagem: Estádio de Futebol com gramado verde
        imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=1000', 
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '01/12/2025',
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
        publishDate: '30/11/2025',
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
        publishDate: '29/11/2025',
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
        publishDate: '28/11/2025',
        author: 'Jornal do Campo'
    }
];

export const events: Event[] = [
    {
        id: 1,
        title: 'Festa do Pêssego',
        description: 'A tradicional celebração da colheita com a melhor gastronomia polonesa e shows regionais.',
        // Imagem: Cesta de pêssegos frescos
        imageUrl: 'https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&q=80&w=1000',
        time: '18:00 - 23:00',
        location: 'Parque Cachoeira'
    },
    {
        id: 2,
        title: 'Feira Gastronômica Noturna',
        description: 'Pastel, pierogi e food trucks na praça central. Traga sua família!',
        imageUrl: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&q=80&w=1000',
        time: 'Sáb e Dom, 18:00 - 22:00',
        location: 'Praça Central'
    },
    {
        id: 3,
        title: 'Concerto no Teatro da Praça',
        description: 'Apresentação especial da orquestra municipal com clássicos e música popular brasileira.',
        // Imagem: Teatro/Palco com cortinas ou orquestra
        imageUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=1000',
        time: 'Sextas, às 19:30',
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
