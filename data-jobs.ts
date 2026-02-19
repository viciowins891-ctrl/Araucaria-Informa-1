
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
        id: 201,
        title: 'Auxiliar de Logística',
        company: 'Mercado Livre (Mercado Envios)',
        description: 'Atuar no centro de distribuição, separação de pedidos e organização de estoque. Benefícios: Auxílio-creche, Assistência Médica/Odontológica, Fretado e Refeição no local.',
        salary: 'R$ 1.900 + Benefícios',
        type: 'CLT',
        location: 'Araucária (Thomaz Coelho)',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Mercado+Livre&l=Araucária',
        requirements: ['Ensino Médio Completo', 'Disponibilidade de horário']
    },
    {
        id: 202,
        title: 'Jovem Aprendiz - Merchandising',
        company: 'Nestlé',
        description: 'Oportunidade para iniciar carreira em uma multinacional. Suporte às atividades de merchandising e reposição. Vaga inclusiva.',
        salary: 'R$ 1.100 + Benefícios',
        type: 'Estágio',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Nestlé+Aprendiz&l=Araucária',
        requirements: ['18 a 22 anos', 'Ensino Médio Completo ou Cursando']
    },
    {
        id: 203,
        title: 'Auxiliar de Produção',
        company: 'Berneck S.A.',
        description: 'Linha de produção de painéis de madeira. Empresa oferece PPR (Participação nos Lucros), Plano de Saúde Unimed e Odonto.',
        salary: 'R$ 2.100 + PPR',
        type: 'CLT',
        location: 'Thomaz Coelho, Araucária',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Berneck&l=Araucária',
        requirements: ['Ensino Fundamental Completo', 'Disponibilidade para turnos']
    },
    {
        id: 204,
        title: 'Assistente de Atendimento',
        company: 'Abler / CiX',
        description: 'Atendimento ao cliente multicanal, suporte a dúvidas e resolução de chamados. Vaga híbrida após período de experiência.',
        salary: 'R$ 1.800 + VA/VR',
        type: 'CLT',
        location: 'Centro',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Atendimento&l=Araucária',
        requirements: ['Boa comunicação', 'Conhecimento básico em informática']
    },
    {
        id: 205,
        title: 'Auxiliar de Frota (Check List)',
        company: 'Cia Verde Logística',
        description: 'Realizar checklist de veículos, controle de pneus e pequenas manutenções preventivas na frota.',
        salary: 'R$ 2.200 + Cesta Básica',
        type: 'CLT',
        location: 'Rodovia do Xisto',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Cia+Verde&l=Araucária',
        requirements: ['CNH B', 'Noções de mecânica básica']
    },
    {
        id: 206,
        title: 'Operador de Empilhadeira',
        company: 'Coca-Cola (FEMSA)',
        description: 'Movimentação de carga em armazém logístico. Necessário curso de reciclagem em dia.',
        salary: 'R$ 2.600 + Benefícios',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Empilhadeira&l=Araucária',
        requirements: ['Curso de Empilhadeira', 'Experiência de 6 meses']
    },
    {
        id: 207,
        title: 'Auxiliar de Limpeza',
        company: 'Grupo Service',
        description: 'Limpeza e conservação de ambientes industriais e administrativos. Vaga para turno diurno.',
        salary: 'R$ 1.590 + VA + VT',
        type: 'CLT',
        location: 'Diversos Locais',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Limpeza&l=Araucária',
        requirements: ['Experiência anterior', 'Residir em Araucária']
    },
    {
        id: 208,
        title: 'Assistente Administrativo',
        company: 'Potencial Petróleo',
        description: 'Rotinas administrativas, emissão de notas fiscais e controle de planilhas. Oportunidade de carreira.',
        salary: 'R$ 2.549 + Plano de Carreira',
        type: 'CLT',
        location: 'Zona Industrial',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Potencial&l=Araucária',
        requirements: ['Excel Intermediário', 'Ensino Médio Completo']
    },
    {
        id: 209,
        title: 'Cozinheira Industrial',
        company: 'Sodexo',
        description: 'Preparo de refeições em grande escala para refeitório de empresa. Experiência em cozinha industrial obrigatória.',
        salary: 'R$ 2.100 + Alimentação no Local',
        type: 'CLT',
        location: 'CIAR',
        date: 'Há 4 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Sodexo&l=Araucária',
        requirements: ['Experiência comprovada', 'Higiene e organização']
    },
    {
        id: 210,
        title: 'Vendedor Interno',
        company: 'Comércio Local (Material de Construção)',
        description: 'Vendas de balcão, atendimento ao cliente e organização de loja. Preferência para quem conhece materiais de construção.',
        salary: 'R$ 1.850 + Comissões',
        type: 'CLT',
        location: 'Costeira',
        date: 'Há 5 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Vendedor&l=Araucária',
        requirements: ['Gosto por vendas', 'Simpatia']
    },
    {
        id: 211,
        title: 'Porteiro / Controlador de Acesso',
        company: 'Padrão Segurança',
        description: 'Controle de entrada e saída de veículos e pessoas em indústria. Escala 12x36.',
        salary: 'R$ 2.050 + Periculosidade (se aplicável)',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 5 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Porteiro&l=Araucária',
        requirements: ['Curso de Vigilante/Portaria', 'Informatica Básica']
    }
];
