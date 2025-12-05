
import { NewsArticle, Event, Business } from './types';

// URLs atualizadas com imagens de alta disponibilidade do Unsplash.
// Correção final para Centro Histórico e Estádio.

export const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: 'Revitalização do Centro Histórico e Praça Central',
        summary: 'A prefeitura entregou as obras de melhoria no entorno da Igreja Matriz, valorizando o patrimônio local.',
        // Nova imagem: Igreja/Praça (Link alternativo de alta disponibilidade)
        imageUrl: 'https://images.unsplash.com/photo-1565058087756-3392f0224168?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: 'Publicado hoje'
    },
    {
        id: 2,
        title: 'REPAR bate recorde de eficiência energética',
        summary: 'A Refinaria Presidente Getúlio Vargas, ícone industrial da cidade, anuncia novos índices de produtividade.',
        // Imagem FUNCIONAL
        imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1000',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: 'Publicado ontem'
    },
    {
        id: 3,
        title: 'Araucária EC disputa liderança no Estádio do Pinhão',
        summary: 'O time da casa conta com a torcida para o confronto decisivo deste domingo no municipal.',
        // Nova imagem: Campo de Futebol (Opção mais estável)
        imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1000', 
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '01/12/2025'
    },
    {
        id: 4,
        title: 'Projeto Social leva Judô para escolas municipais',
        summary: 'Iniciativa tem formado cidadãos através da disciplina e prática esportiva no contraturno escolar.',
        // Imagem: Kimonos/Judô
        imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=1000',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '30/11/2025'
    },
    {
        id: 5,
        title: 'Tecnologia: Araucária investe em Cidades Inteligentes',
        summary: 'Novos pontos de Wi-Fi gratuito e monitoramento digital começam a ser instalados nos bairros.',
        // Imagem: Tecnologia/Conexão
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        publishDate: '29/11/2025'
    },
    {
        id: 6,
        title: 'Câmara aprova incentivo ao turismo rural',
        summary: 'Caminho do Guajuvira e roteiros poloneses receberão verba para sinalização e melhorias.',
        // Imagem: Estrada rural
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: '28/11/2025'
    }
];

export const events: Event[] = [
    {
        id: 1,
        title: 'Festa do Pêssego',
        description: 'A tradicional celebração da colheita com a melhor gastronomia polonesa e shows regionais.',
        // Imagem: Pêssegos
        imageUrl: 'https://images.unsplash.com/photo-1521666996657-37e753907eb6?auto=format&fit=crop&q=80&w=1000',
        time: '18:00 - 23:00',
        location: 'Parque Cachoeira'
    },
    {
        id: 2,
        title: 'Feira Gastronômica Noturna',
        description: 'Pastel, pierogi e food trucks na praça central. Traga sua família!',
        // Imagem FUNCIONAL
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000',
        time: 'Sáb e Dom, 18:00 - 22:00',
        location: 'Praça Central'
    },
    {
        id: 3,
        title: 'Concerto no Teatro da Praça',
        description: 'Apresentação especial da orquestra municipal com clássicos e música popular brasileira.',
        // Imagem: Palco/Teatro
        imageUrl: 'https://images.unsplash.com/photo-1465847899078-68dd99e9e96e?auto=format&fit=crop&q=80&w=1000',
        time: 'Sextas, às 19:30',
        location: 'Teatro da Praça'
    }
];

export const businesses: Business[] = [
    {
        id: 1,
        name: 'Panificadora e Confeitaria Araucária',
        category: 'Alimentação',
        // Imagem: Padaria
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000',
        address: 'Rua das Flores, 123 - Centro',
        phone: '(41) 3901-2345',
        website: 'padariaexemplo.com.br'
    },
    {
        id: 2,
        name: 'Livraria e Sebo Cultural',
        category: 'Varejo',
        // Imagem: Livraria
        imageUrl: 'https://images.unsplash.com/photo-1507842217121-ad957430939e?auto=format&fit=crop&q=80&w=1000',
        address: 'Av. Victor do Amaral, 456',
        phone: '(41) 3901-6789',
        website: 'livrariaexemplo.com.br'
    },
    {
        id: 3,
        name: 'Auto Mecânica Confiança',
        category: 'Serviços',
        // Imagem: Mecânica
        imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=1000',
        address: 'Rodovia do Xisto, 789',
        phone: '(41) 3901-1011',
        website: 'mecanicaexemplo.com.br'
    }
];

export const allNewsCategories = ['Todas', 'Cidade', 'Infraestrutura', 'Esporte', 'Educação', 'Tecnologia', 'Turismo'];
export const allBusinessCategories = ['Todas', 'Alimentação', 'Serviços', 'Varejo'];
