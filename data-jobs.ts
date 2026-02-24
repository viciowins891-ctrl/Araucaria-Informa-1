
export interface Job {
    id: number;
    title: string;
    company: string;
    description: string;
    salary: string;
    type: 'CLT' | 'Estágio' | 'PJ' | 'Temporário';
    location: string;
    date: string;
    contactLink: string;
    logoUrl?: string;
    requirements?: string[];
}

// Atualizado em: 24/02/2026 — Araucária (hoje) + Curitiba (complemento regional)
export const jobs: Job[] = [

    // ─── ARAUCÁRIA — VAGAS DE HOJE ────────────────────────────────────────────
    {
        id: 201,
        title: 'Operador Logístico II',
        company: 'ArcelorMittal Gonvarri Brasil',
        description: 'Movimentações com empilhadeira, recebimento, descarga e armazenagem de materiais, carregamento de caminhões e abastecimento das linhas produtivas. Benefícios: Unimed, Odonto, PPR, Refeição no local, VA R$ 1.000, Fretado/VT, Convênio Farmácia e Auxílio Educação.',
        salary: 'A combinar + Benefícios completos',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+Log%C3%ADstico&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Ensino Médio Completo', 'Curso de Empilhadeira (obrigatório)', 'Disponibilidade de horários', 'Fácil acesso a Araucária']
    },
    {
        id: 202,
        title: 'Desenvolvedor Back-end (Pleno/Sênior)',
        company: 'Atman Systems',
        description: 'Desenvolvimento de sistemas e APIs em empresa de tecnologia sediada em Araucária. Ambiente colaborativo e benefícios diferenciados: VA, VR, Unimed, Dental Uni, Seguro de Vida.',
        salary: 'R$ 5.000 - R$ 11.000',
        type: 'CLT',
        location: 'Araucária (Híbrido)',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Desenvolvedor+Back-end&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência em APIs REST', 'SQL/NoSQL', 'Superior ou Técnico em TI']
    },
    {
        id: 203,
        title: 'Vendedor Interno',
        company: 'BRW Suprimentos Escolares',
        description: 'Vendas de balcão, atendimento ao cliente e organização de loja de suprimentos. Vaga publicada em 24/02/2026. Ótimo ambiente e possibilidade de crescimento.',
        salary: 'R$ 1.690 + Comissões',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Vendedor+Interno&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Ensino Médio', 'Boa comunicação', 'Experiência em vendas (diferencial)']
    },
    {
        id: 204,
        title: 'Auxiliar Administrativo I',
        company: 'RH Nossa',
        description: 'Rotinas administrativas, controle de planilhas e suporte à equipe. Publicada em 23/02/2026. Horário: segunda a quinta 07h–17h, sexta 07h–16h.',
        salary: 'R$ 2.549 + VA + VT',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Administrativo&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Excel Intermediário', 'Ensino Médio Completo', 'Boa comunicação']
    },

    // ─── CURITIBA — COMPLEMENTO REGIONAL ─────────────────────────────────────
    {
        id: 205,
        title: 'Operador de Manufatura',
        company: 'Electrolux',
        description: 'Operação de linha de manufatura em indústria de eletrodomésticos. Uma das maiores fábricas do país com plano de carreira estruturado. Benefícios: AM, Odonto, VA, VR, VT, PLR.',
        salary: 'R$ 2.400 + PLR',
        type: 'CLT',
        location: 'Curitiba (CIC)',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Electrolux+Operador&l=Curitiba%2C+PR',
        requirements: ['Ensino Médio Completo', 'Disponibilidade para turnos', 'Experiência industrial (diferencial)']
    },
    {
        id: 206,
        title: 'Auxiliar de Produção',
        company: 'Indústria (via Indeed CIC)',
        description: 'Abastecimento de linha de produção, separação e embalagem de materiais na Cidade Industrial de Curitiba. Benefícios: AM, Odonto, VA, VR, VT.',
        salary: 'R$ 2.000 + Benefícios',
        type: 'CLT',
        location: 'Curitiba (CIC)',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+de+Produ%C3%A7%C3%A3o&l=Curitiba%2C+PR',
        requirements: ['Ensino Fundamental Completo', 'Disponibilidade de horário']
    },
    {
        id: 207,
        title: 'Assistente de Logística',
        company: 'Transportadora (via Indeed Curitiba)',
        description: 'Suporte a motoristas, organização de rotas de entrega e controle de cargas. Benefícios: AM, VR, VA, VT e Seguro de Vida.',
        salary: 'R$ 2.200 + Benefícios',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Assistente+de+Log%C3%ADstica&l=Curitiba%2C+PR',
        requirements: ['Ensino Médio', 'Organização e agilidade', 'Experiência em logística (diferencial)']
    },
    {
        id: 208,
        title: 'Auxiliar Administrativo',
        company: 'Empresa local (via Catho Curitiba)',
        description: 'Rotinas de escritório, atendimento ao cliente, emissão de notas fiscais e suporte ao setor financeiro. Horário comercial, de segunda a sexta-feira.',
        salary: 'R$ 1.800 - R$ 2.300',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Administrativo&l=Curitiba%2C+PR',
        requirements: ['Excel Básico/Intermediário', 'Comunicação oral e escrita', 'Ensino Médio Completo']
    },
    {
        id: 209,
        title: 'Consultor Comercial',
        company: 'Empresa de Serviços (via Infojobs)',
        description: 'Prospecção de clientes, elaboração de propostas comerciais e relacionamento pós-venda. Metas agressivas com comissionamento atrativo.',
        salary: 'R$ 2.000 + Comissões (até R$ 5.000)',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Consultor+Comercial&l=Curitiba%2C+PR',
        requirements: ['Experiência em vendas', 'Perfil empreendedor', 'CNH B (diferencial)']
    },
    {
        id: 210,
        title: 'Operador Multifuncional',
        company: 'Indústria (via Jobijoba Curitiba)',
        description: 'Atua em diferentes setores da linha de produção industrial conforme demanda. Vaga para indústria de grande porte na região de Curitiba. Benefícios completos.',
        salary: 'R$ 2.100 + Benefícios',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+Multifuncional&l=Curitiba%2C+PR',
        requirements: ['Disponibilidade para turnos', 'Ensino Médio', 'Experiência industrial']
    },
    {
        id: 211,
        title: 'Estoquista / Auxiliar de Almoxarifado',
        company: 'Distribuidora (via Indeed Hauer)',
        description: 'Controle e organização de estoque, recebimento e expedição de mercadorias. Bairro Hauer, Curitiba. Benefícios: plano odontológico Bradesco, seguro de vida e Day Off no aniversário.',
        salary: 'R$ 1.900 + Benefícios',
        type: 'CLT',
        location: 'Curitiba (Hauer)',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Estoquista&l=Curitiba%2C+PR',
        requirements: ['Ensino Médio', 'Organização', 'Experiência em almoxarifado (diferencial)']
    },
    {
        id: 212,
        title: 'Assistente Comercial',
        company: 'Empresa (via Indeed Curitiba)',
        description: 'Atendimento e suporte à equipe de vendas, prospecção ativa de clientes e controle de CRM. Sem experiência? Treinamento completo oferecido. Benefícios: AM, VA, VT.',
        salary: 'R$ 1.800 + Comissões',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Assistente+Comercial&l=Curitiba%2C+PR',
        requirements: ['Boa comunicação', 'Proatividade', 'Ensino Médio Completo']
    },
    {
        id: 213,
        title: 'Soldador (MIG/MAG)',
        company: 'Metalúrgica Curitiba (via Trabalha Brasil)',
        description: 'Soldagem de peças metálicas estruturais para indústria automotiva e de equipamentos em Curitiba. Alta demanda por profissionais qualificados na região.',
        salary: 'R$ 2.700 + Benefícios',
        type: 'CLT',
        location: 'Curitiba (CIC)',
        date: 'Há 4 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Soldador&l=Curitiba%2C+PR',
        requirements: ['Certificação de Soldagem', 'Experiência comprovada em MIG/MAG', 'Ensino Fundamental']
    },
    {
        id: 214,
        title: 'Gerente Comercial',
        company: 'Empresa de Serviços (via Jobijoba)',
        description: 'Gestão de equipe de vendas, definição de estratégias e metas comerciais. Vaga publicada em fevereiro de 2026 para profissional sênior com liderança comprovada.',
        salary: 'R$ 5.000 - R$ 8.000 + Variável',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 4 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Gerente+Comercial&l=Curitiba%2C+PR',
        requirements: ['Experiência em gestão de equipes', 'Perfil analítico e estratégico', 'Superior Completo']
    },
];
