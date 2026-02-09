
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
        title: 'Auxiliar de Produção',
        company: 'Gelopar Refrigeração',
        description: 'Vaga para auxiliar na linha de produção. Horário comercial ou turnos. Benefícios: Alimentação no local, Vale-transporte, Assistência Médica.',
        salary: 'R$ 2.200 - R$ 2.279',
        type: 'CLT',
        location: 'Centro Industrial de Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Produção+Gelopar&l=Araucária',
        logoUrl: 'https://www.gelopar.com.br/assets/img/logo.png',
        requirements: ['Ensino Fundamental Completo', 'Disponibilidade de horários']
    },
    {
        id: 2,
        title: 'Estoquista',
        company: 'CD Boticário (Via Agências)',
        description: 'Atuação no Centro de Distribuição do Boticário. Separação, organização e movimentação de mercadorias. Turnos disponíveis.',
        salary: 'R$ 2.193 + Benefícios',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Estoquista+Boticário&l=Araucária',
        requirements: ['Ensino Médio Completo', 'Experiência em logística é diferencial']
    },
    {
        id: 3,
        title: 'Auxiliar de Logística',
        company: 'Mercado Livre (Mercado Envios)',
        description: 'Recebimento, embalagem e etiquetagem de produtos no centro de distribuição. Ambiente dinâmico com oportunidades de crescimento.',
        salary: 'R$ 1.901 + Bônus',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Logística+Mercado+Livre&l=Araucária',
        requirements: ['Ensino Médio', 'Disponibilidade de horário']
    },
    {
        id: 4,
        title: 'Porteiro / Controlador de Acesso',
        company: 'Condomínios e Empresas Diversas',
        description: 'Controle de entrada e saída de pessoas e veículos. Vagas em escala 12x36 (Diurno/Noturno).',
        salary: 'R$ 1.800 - R$ 2.415',
        type: 'CLT',
        location: 'Araucária',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Porteiro+12x36&l=Araucária',
        requirements: ['Ensino Médio', 'Curso de Portaria/Vigilância']
    },
    {
        id: 5,
        title: 'Zeladora / Limpeza',
        company: 'Grupo Service',
        description: 'Limpeza e conservação de ambientes, recolhimento de lixo e organização. Vaga para início imediato.',
        salary: 'R$ 1.590,00',
        type: 'CLT',
        location: 'Araucária',
        date: '07/02/2026',
        contactLink: 'https://br.indeed.com/empregos?q=Zeladora+Grupo+Service&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência na função', 'Residir em Araucária']
    },
    {
        id: 6,
        title: 'Motorista Entregador',
        company: 'Transportadoras Locais',
        description: 'Entregas em Araucária e Região Metropolitana. Necessário CNH (categoria B ou C/D dependendo do veículo).',
        salary: 'A combinar',
        type: 'CLT',
        location: 'Araucária',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Motorista+Entregador&l=Araucária',
        requirements: ['CNH Ativa', 'EAR (Exerce Atividade Remunerada)']
    },
    {
        id: 7,
        title: 'Auxiliar Administrativo (PCD)',
        company: 'Empresas de Araucária',
        description: 'Vagas inclusivas para auxiliar administrativo. Rotinas de escritório, planilhas e atendimento.',
        salary: 'R$ 1.800 - R$ 2.200',
        type: 'CLT',
        location: 'Araucária',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Administrativo+PCD&l=Araucária',
        requirements: ['Ensino Médio', 'Laudo PCD atualizado']
    },
    {
        id: 8,
        title: 'Assistente de Vendas Internas',
        company: 'Comércio Local',
        description: 'Atendimento ao cliente via telefone e WhatsApp, prospecção e fechamento de vendas.',
        salary: 'R$ 1.800 + Comissões',
        type: 'CLT',
        location: 'Centro de Araucária',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Vendas+Internas&l=Araucária',
        requirements: ['Boa comunicação', 'Ensino Médio']
    }
];
