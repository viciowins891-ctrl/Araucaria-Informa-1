
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
// LINKS: usam parâmetro "as_cmp" do Indeed para filtrar por empresa específica
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
        contactLink: 'https://br.indeed.com/empregos?q=Operador+Log%C3%ADstico+Gonvarri&l=Arauc%C3%A1ria%2C+PR&sort=date&radius=25',
        requirements: ['Ensino Médio Completo', 'Curso de Empilhadeira (obrigatório)', 'Disponibilidade de horários']
    },
    {
        id: 202,
        title: 'Desenvolvedor Back-end (Pleno/Sênior)',
        company: 'Atman Systems',
        description: 'Desenvolvimento de APIs para produtos digitais, integração com hardware e dispositivos IoT. Empresa de tecnologia sediada em Araucária. Benefícios: VA, VR, Unimed, Dental Uni, Seguro de Vida.',
        salary: 'R$ 5.000 - R$ 11.000',
        type: 'CLT',
        location: 'Araucária (Híbrido)',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Desenvolvedor+Back-end+Atman+Systems&l=Paran%C3%A1&sort=date&radius=100',
        requirements: ['Experiência em APIs REST', 'SQL/NoSQL', 'Integração com IoT (diferencial)']
    },
    {
        id: 203,
        title: 'Vendedor Interno',
        company: 'BRW Suprimentos Escolares',
        description: 'Vendas internas, atendimento ao cliente, prospecção, elaboração de propostas e acompanhamento de pedidos. Horário: seg. a quinta 08h–18h e sexta 08h–17h. Benefícios: Unimed, Odonto, PLR, Parking gratuito e VT.',
        salary: 'R$ 2.094 + Benefícios',
        type: 'CLT',
        location: 'Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Vendedor+Interno+BRW+Suprimentos&l=Arauc%C3%A1ria%2C+PR&sort=date&radius=25',
        requirements: ['Comunicação e proatividade', 'Foco em resultados', 'Ensino Médio Completo']
    },
    {
        id: 204,
        title: 'Auxiliar de Serviços Gerais',
        company: 'JVS Facilities (Condor – Capela Velha)',
        description: 'Limpeza e conservação de áreas internas e externas do novo Condor do bairro Capela Velha em Araucária. Atividades: varrição, lavagem de pisos, sanitários e corredores. Benefícios: VA, VR, VT e Seguro de Vida. Vaga publicada em 17/02/2026.',
        salary: 'R$ 1.650 + Benefícios',
        type: 'CLT',
        location: 'Araucária (Capela Velha)',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Servi%C3%A7os+Gerais&l=Arauc%C3%A1ria%2C+PR&sort=date&radius=25',
        requirements: ['Ensino Fundamental', 'Disponibilidade de horários', 'Experiência em limpeza (diferencial)']
    },

    // ─── CURITIBA — COMPLEMENTO REGIONAL ─────────────────────────────────────
    {
        id: 205,
        title: 'Operador de Manufatura C',
        company: 'Electrolux (CIC)',
        description: 'Atua na produção de eletrodomésticos na unidade CIC (R. João Lunardelli, 2205). Turno: seg. a sáb. 14h30–22h30. Benefícios: Refeitório no local, Odonto, Ticket Pontualidade R$ 450, VA.',
        salary: 'R$ 1.751,91 + Ticket Pontualidade R$ 450',
        type: 'CLT',
        location: 'Curitiba (CIC)',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/cmp/Electrolux/jobs?l=Curitiba%2C+PR',
        requirements: ['Ensino Médio Completo', 'Disponibilidade para turno tarde/noite', 'Experiência industrial (diferencial)']
    },
    {
        id: 206,
        title: 'Auxiliar de Produção',
        company: 'Indústria Curitiba (CIC)',
        description: 'Abastecimento de linha de produção, separação e embalagem de materiais na Cidade Industrial de Curitiba. Benefícios: AM, Odonto, VA, VR, VT. Sem exigência de experiência anterior.',
        salary: 'R$ 2.000 + Benefícios',
        type: 'CLT',
        location: 'Curitiba (CIC)',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+de+Produ%C3%A7%C3%A3o&l=Curitiba%2C+PR&radius=25',
        requirements: ['Ensino Fundamental Completo', 'Disponibilidade de horário']
    },
    {
        id: 207,
        title: 'Assistente de Logística',
        company: 'Transportadora Curitiba',
        description: 'Suporte a motoristas, organização de rotas de entrega e controle de cargas. Benefícios: AM, VR, VA, VT e Seguro de Vida.',
        salary: 'R$ 2.200 + Benefícios',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Assistente+de+Log%C3%ADstica&l=Curitiba%2C+PR&radius=25',
        requirements: ['Ensino Médio', 'Organização e agilidade', 'Experiência em logística (diferencial)']
    },
    {
        id: 208,
        title: 'Auxiliar Administrativo',
        company: 'Empresa local Curitiba',
        description: 'Rotinas de escritório, emissão de notas fiscais e suporte ao setor financeiro. Horário comercial, segunda a sexta.',
        salary: 'R$ 1.800 - R$ 2.300',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Administrativo&l=Curitiba%2C+PR&radius=25',
        requirements: ['Excel Básico/Intermediário', 'Comunicação oral e escrita', 'Ensino Médio Completo']
    },
    {
        id: 209,
        title: 'Consultor Comercial',
        company: 'Empresa de Serviços Curitiba',
        description: 'Prospecção de clientes, elaboração de propostas comerciais e relacionamento pós-venda. Metas com comissionamento atrativo.',
        salary: 'R$ 2.000 + Comissões (até R$ 5.000)',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Consultor+Comercial&l=Curitiba%2C+PR&radius=25',
        requirements: ['Experiência em vendas', 'Perfil empreendedor', 'CNH B (diferencial)']
    },
    {
        id: 210,
        title: 'Operador Multifuncional',
        company: 'Indústria Curitiba',
        description: 'Atua em diferentes setores da linha de produção industrial conforme demanda. Vaga para indústria de grande porte em Curitiba. Benefícios completos.',
        salary: 'R$ 2.100 + Benefícios',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+Multifuncional&l=Curitiba%2C+PR&radius=25',
        requirements: ['Disponibilidade para turnos', 'Ensino Médio', 'Experiência industrial']
    },
    {
        id: 211,
        title: 'Estoquista / Aux. de Almoxarifado',
        company: 'Distribuidora (Bairro Hauer)',
        description: 'Controle e organização de estoque, recebimento e expedição de mercadorias. Bairro Hauer, Curitiba. Benefícios: Odonto Bradesco, Seguro de Vida e Day Off no aniversário.',
        salary: 'R$ 1.900 + Benefícios',
        type: 'CLT',
        location: 'Curitiba (Hauer)',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Estoquista&l=Curitiba%2C+PR&radius=25',
        requirements: ['Ensino Médio', 'Organização', 'Experiência em almoxarifado (diferencial)']
    },
    {
        id: 212,
        title: 'Assistente Comercial (sem exp.)',
        company: 'Empresa Curitiba',
        description: 'Atendimento e suporte à equipe de vendas, prospecção ativa de clientes. Treinamento completo oferecido. Ótima oportunidade para quem está começando. Benefícios: AM, VA, VT.',
        salary: 'R$ 1.800 + Comissões',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 3 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Assistente+Comercial&l=Curitiba%2C+PR&radius=25',
        requirements: ['Boa comunicação', 'Proatividade', 'Ensino Médio Completo']
    },
    {
        id: 213,
        title: 'Soldador (MIG/MAG)',
        company: 'Metalúrgica Curitiba (CIC)',
        description: 'Soldagem de peças metálicas estruturais para indústria automotiva em Curitiba. Alta demanda por profissionais qualificados na CIC.',
        salary: 'R$ 2.700 + Benefícios',
        type: 'CLT',
        location: 'Curitiba (CIC)',
        date: 'Há 4 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Soldador+MIG+MAG&l=Curitiba%2C+PR&radius=25',
        requirements: ['Certificação de Soldagem', 'Experiência comprovada MIG/MAG', 'Ensino Fundamental']
    },
    {
        id: 214,
        title: 'Gerente Comercial',
        company: 'Empresa de Serviços Curitiba',
        description: 'Gestão de equipe de vendas, definição de estratégias e metas comerciais. Publicada em fevereiro de 2026 para profissional sênior com liderança comprovada.',
        salary: 'R$ 5.000 - R$ 8.000 + Variável',
        type: 'CLT',
        location: 'Curitiba',
        date: 'Há 4 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Gerente+Comercial&l=Curitiba%2C+PR&radius=25',
        requirements: ['Experiência em gestão de equipes', 'Superior Completo', 'Perfil estratégico']
    },
];
