
import { NewsArticle, Event, Business } from './types';

// URLs atualizadas para imagens urbanas e contextuais de alta qualidade.
// Garante que não tenhamos links quebrados e que a estética seja coesa.

export const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: 'Revitalização do Centro Histórico e Praça Central',
        summary: 'A prefeitura entregou as obras de melhoria no entorno da Igreja Matriz, com foco na preservação das araucárias centenárias.',
        // Imagem: Praça pública com igreja/arquitetura histórica ao fundo
        imageUrl: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?auto=format&fit=crop&q=80&w=1000',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: 'Publicado hoje'
    },
    {
        id: 2,
        title: 'REPAR bate recorde de eficiência energética',
        summary: 'A Refinaria Presidente Getúlio Vargas, ícone industrial da cidade, anuncia novos índices de produtividade.',
        // Imagem: Indústria / Refinaria ao pôr do sol (Clássica de Araucária)
        imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1000',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: 'Publicado ontem'
    },
    {
        id: 3,
        title: 'Araucária EC disputa liderança no Estádio do Pinhão',
        summary: 'O time da casa conta com a torcida para o confronto decisivo deste domingo no municipal.',
        // Imagem: Estádio de Futebol com gramado verde
        imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=1000', 
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
        // Imagem: Tecnologia urbana / Conectividade
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        publishDate: '29/11/2025'
    },
    {
        id: 6,
        title: 'Câmara aprova incentivo ao turismo rural',
        summary: 'Caminho do Guajuvira e roteiros poloneses receberão verba para sinalização e melhorias.',
        // Imagem: Estrada rural tranquila com natureza
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
