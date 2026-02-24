
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

// Atualizado em: 24/02/2026 — Vagas verificadas no Indeed, Catho, Randstad e Jooble
export const jobs: Job[] = [
    {
        id: 201,
        title: 'Operador Logístico II',
        company: 'ArcelorMittal Gonvarri Brasil',
        description: 'Movimentações logísticas com empilhadeira, recebimento, descarga e armazenagem de materiais, carregamento de caminhões e abastecimento das linhas de produção. Benefícios: Unimed, Odonto, PPR, Refeição no local, VA R$ 1.000, VT/Fretado, Convênio Farmácia e Auxílio Educação.',
        salary: 'A combinar + Benefícios completos',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+Log%C3%ADstico&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Ensino Médio Completo', 'Curso de Empilhadeira obrigatório', 'Disponibilidade de horários', 'Fácil acesso a Araucária']
    },
    {
        id: 202,
        title: 'Desenvolvedor Back-end (Pleno/Sênior)',
        company: 'Atman Systems',
        description: 'Desenvolvimento de sistemas back-end, APIs e integrações. Vaga híbrida em empresa de tecnologia sediada em Araucária. Benefícios: VA, VR, Unimed, Odonto (Dental Uni), Seguro de Vida.',
        salary: 'R$ 5.000 - R$ 11.000',
        type: 'CLT',
        location: 'Araucária (Híbrido)',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Desenvolvedor+Back-end&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência em APIs REST', 'SQL e NoSQL', 'Ensino Superior ou Técnico em TI']
    },
    {
        id: 203,
        title: 'Desenvolvedor Front-end (Pleno/Sênior)',
        company: 'Atman Systems',
        description: 'Desenvolvimento de interfaces modernas com React e outras tecnologias front-end. Ambiente colaborativo, empresa em crescimento. Benefícios: VA, VR, Plano de Saúde Unimed, Odonto, Seguro de vida.',
        salary: 'R$ 4.500 - R$ 9.000',
        type: 'CLT',
        location: 'Araucária (Híbrido)',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Desenvolvedor+Front-end&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['React.js', 'HTML/CSS', 'TypeScript', 'Experiência comprovada']
    },
    {
        id: 204,
        title: 'Vendedor Interno',
        company: 'BRW Suprimentos Escolares',
        description: 'Vendas de balcão e atendimento ao cliente na área de suprimentos. Vaga publicada em 24/02/2026. Ótimo ambiente de trabalho e possibilidade de crescimento na empresa.',
        salary: 'R$ 1.690 + Comissões',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Vendedor+Interno&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Ensino Médio', 'Boa comunicação', 'Experiência em vendas (diferencial)']
    },
    {
        id: 205,
        title: 'Auxiliar Administrativo',
        company: 'RH Nossa (Araucária)',
        description: 'Rotinas administrativas, controle de planilhas, emissão de documentos e suporte à equipe. Vaga publicada em 23/02/2026. Horário comercial, de segunda a sexta.',
        salary: 'R$ 2.549 + VA + VT',
        type: 'CLT',
        location: 'Araucária',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Administrativo&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Excel Intermediário', 'Ensino Médio Completo', 'Boa comunicação escrita']
    },
    {
        id: 206,
        title: 'Auxiliar de Produção I',
        company: 'RH Nossa (Araucária)',
        description: 'Auxílio na linha de produção industrial, montagem e organização. Turno fixo. Publicada em 22/02/2026. Empresa com bom ambiente e benefícios.',
        salary: 'R$ 2.000 + Benefícios',
        type: 'CLT',
        location: 'Araucária',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+de+Produ%C3%A7%C3%A3o&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Ensino Fundamental Completo', 'Disponibilidade para turnos', 'Experiência na indústria (diferencial)']
    },
    {
        id: 207,
        title: 'Operador de Máquinas',
        company: 'Indústria Araucária (via Trabalha Brasil)',
        description: 'Operação de máquinas industriais em linha de produção. Segunda a sexta-feira, horário fixo. Benefícios: vale-alimentação, assiduidade e seguro de vida.',
        salary: 'R$ 2.200 + Benefícios',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+de+M%C3%A1quinas&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência com operação de máquinas', 'Ensino Médio', 'Disponibilidade de horário']
    },
    {
        id: 208,
        title: 'Operador Corte e Dobra (Gerdau)',
        company: 'Gerdau',
        description: 'Operação de equipamentos de corte e dobra de aço em planta industrial. Uma das maiores siderúrgicas do Brasil. Benefícios completos: plano de saúde, VA, VR, PPR.',
        salary: 'A combinar + PPR',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Gerdau+Operador&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência na área siderúrgica', 'Ensino Médio Completo', 'Disponibilidade de turnos']
    },
    {
        id: 209,
        title: 'Auxiliar de Logística',
        company: 'Mercado Livre (Mercado Envios)',
        description: 'Separação, embalagem e organização de pedidos no centro de distribuição. Operação ágil em um dos maiores e-commerces do Brasil. Benefícios: Fretado, Refeição no local, Médico e Odonto.',
        salary: 'R$ 2.001 - R$ 3.000',
        type: 'CLT',
        location: 'Araucária (Thomaz Coelho)',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Mercado+Livre+Log%C3%ADstica&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Ensino Médio Completo', 'Disponibilidade de horário', 'Não exige experiência anterior']
    },
    {
        id: 210,
        title: 'Assistente Comercial',
        company: 'Empresa local (via Indeed)',
        description: 'Atendimento, prospecção de clientes e suporte à equipe de vendas. Foco em resultados. Benefícios: Unimed, Odonto, Estacionamento gratuito, PLR e VT.',
        salary: 'R$ 1.800 + Comissões',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Assistente+Comercial&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Comunicação e proatividade', 'Experiência em vendas (diferencial)', 'Ensino Médio']
    },
    {
        id: 211,
        title: 'Desenvolvedor Mobile (Pleno/Sênior)',
        company: 'Atman Systems',
        description: 'Desenvolvimento de aplicativos mobile (Android/iOS) com tecnologias modernas. Empresa de TI em Araucária com bom ambiente de trabalho. Benefícios: VA, VR, Unimed, Odonto, Seguro de Vida.',
        salary: 'R$ 4.500 - R$ 9.000',
        type: 'CLT',
        location: 'Araucária (Híbrido)',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Desenvolvedor+Mobile&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['React Native ou Flutter', 'Experiência em apps publicados', 'Superior ou Técnico em TI']
    },
    {
        id: 212,
        title: 'Soldador (MIG/MAG)',
        company: 'Indústria Araucária (via Trabalha Brasil)',
        description: 'Soldagem de peças metálicas em ambiente industrial. Alta demanda no polo industrial de Araucária (CIAR). Salário atraente e benefícios.',
        salary: 'R$ 2.700 + Benefícios',
        type: 'CLT',
        location: 'CIAR, Araucária',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Soldador&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Certificação de Soldagem', 'Experiência comprovada', 'Ensino Fundamental']
    },
    {
        id: 213,
        title: 'Auxiliar de Almoxarifado',
        company: 'RH Social Araucária',
        description: 'Controle e organização de estoque, conferência de materiais e suporte ao setor de compras. Publicada em 10/02/2026. Horário: seg. a quinta das 07h às 17h e sexta das 07h às 16h.',
        salary: 'R$ 2.549 + VT',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 5 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Almoxarifado&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência em almoxarifado', 'Excel básico', 'Ensino Médio']
    },
    {
        id: 214,
        title: 'Programador CNC',
        company: 'Metalúrgica (via Trabalha Brasil)',
        description: 'Programação e operação de máquinas CNC em indústria metalúrgica. Alta qualificação exigida, salário diferenciado no setor.',
        salary: 'R$ 5.000 + Benefícios',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 5 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Programador+CNC&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência em CNC', 'Leitura de projetos mecânicos', 'Cursos técnicos na área']
    },
];
