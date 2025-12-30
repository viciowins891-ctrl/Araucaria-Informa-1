
export interface Job {
    id: number;
    title: string;
    company: string;
    description: string;
    salary: string;
    type: 'CLT' | 'Estágio' | 'PJ' | 'Temporário';
    location: string;
    date: string;
    contactLink: string; // WhatsApp ou Email
    logoUrl?: string;
    requirements?: string[];
}

export const jobs: Job[] = [
    {
        id: 1,
        title: 'Vendedor Externo',
        company: 'Distribuidora Araucária',
        description: 'Responsável por realizar visitas a clientes, apresentar produtos e retirar pedidos. Necessário veículo próprio.',
        salary: 'R$ 2.500 + Comissão',
        type: 'CLT',
        location: 'Centro',
        date: 'Hoje',
        contactLink: 'https://wa.me/5541999999999',
        requirements: ['CNH B', 'Experiência em vendas', 'Veículo próprio']
    },
    {
        id: 2,
        title: 'Auxiliar Administrativo',
        company: 'Escritório Contábil Silva',
        description: 'Emissão de notas fiscais, controle de planilhas e atendimento ao cliente.',
        salary: 'R$ 1.800 + VR',
        type: 'CLT',
        location: 'Estação',
        date: 'Ontem',
        contactLink: 'mailto:vagas@silvacontabil.com',
        requirements: ['Ensino Médio Completo', 'Excel Intermediário']
    },
    {
        id: 3,
        title: 'Estágio em Marketing',
        company: 'Agência Criativa',
        description: 'Auxiliar na criação de posts para redes sociais e edição de vídeos curtos.',
        salary: 'R$ 1.200 (Bolsa)',
        type: 'Estágio',
        location: 'Centro',
        date: '28/12',
        contactLink: 'https://wa.me/5541988888888',
        requirements: ['Cursando Publicidade ou Design', 'Conhecimento em Canva/Photoshop']
    },
    {
        id: 4,
        title: 'Operador de Empilhadeira',
        company: 'Logística Capela',
        description: 'Movimentação de cargas no armazém e separação de pedidos.',
        salary: 'R$ 2.200 + Benefícios',
        type: 'Temporário',
        location: 'Capela Velha',
        date: '27/12',
        contactLink: 'https://wa.me/5541977777777',
        requirements: ['Curso de Operador', 'Experiência na função']
    }
];
