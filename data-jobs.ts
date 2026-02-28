
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

// Atualizado em: 28/02/2026 — Araucária (hoje)
// LINKS: usam parâmetro de busca direta para a empresa/vaga no Indeed
export const jobs: Job[] = [
    // ─── ARAUCÁRIA — VAGAS RECENTES ────────────────────────────────────────────
    {
        id: 301,
        title: 'APRENDIZ DE ATENDENTE DE RESTAURANTE',
        company: "McDonald's Restaurante - Arcos Dorados",
        description: 'Prestar atendimento aos clientes nos pontos de vendas; Preparar sanduíches, bebidas e sobremesas no Méqui.',
        salary: 'A combinar',
        type: 'CLT',
        location: 'Centro - Araucária, PR',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=APRENDIZ+DE+ATENDENTE+DE+RESTAURANTE+McDonalds&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Gosto por atendimento ao cliente', 'Disponibilidade de horário', 'Ensino médio (cursando ou completo)']
    },
    {
        id: 302,
        title: 'Analista de Departamento Pessoal Pleno',
        company: 'Tainara Souza - Rh e Carreira',
        description: 'Atuação em rotinas de departamento pessoal em nível pleno na região de Araucária.',
        salary: 'R$ 3.700 – R$ 4.000',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Analista+de+Departamento+Pessoal+Pleno+Tainara+Souza&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência consolidada em DP', 'Conhecimento em rotinas trabalhistas', 'Perfil analítico']
    },
    {
        id: 303,
        title: 'Auxiliar Geral - Meio Ambiente | PCD',
        company: 'Universidade Livre para Eficiência Humana',
        description: 'Auxiliar em tarefas gerais de conservação e meio ambiente. Vaga exclusiva para pessoas com deficiência.',
        salary: 'R$ 1.796,60',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+Geral+Meio+Ambiente+PCD+Universidade+Livre&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Vaga exclusiva PCD', 'Auxílio em serviços gerais', 'Disponibilidade para Araucária']
    },
    {
        id: 304,
        title: 'Consultor de Vendas Araucária/Presencial',
        company: 'Sommare Conecta',
        description: 'Prospecção de clientes e fechamento de vendas de forma presencial em Araucária.',
        salary: 'R$ 1.900 – R$ 3.000',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Consultor+de+Vendas+Sommare+Conecta&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência em vendas diretas', 'Comunicação assertiva', 'Atuação presencial']
    },
    {
        id: 305,
        title: 'Técnico Segurança do Trabalho',
        company: 'Alsco Uniformes',
        description: 'Garantir a segurança dos colaboradores através de inspeções, treinamentos e controle de EPIs.',
        salary: 'A combinar',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Tecnico+Seguranca+do+Trabalho+Alsco+Uniformes&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Curso Técnico em Segurança do Trabalho', 'Registro ativo no conselho', 'Experiência industrial']
    },
    {
        id: 306,
        title: 'Assistente Administrativo | PCD',
        company: 'Universidade Livre para Eficiência Humana',
        description: 'Apoio administrativo em diversos setores. Vaga dedicada a pessoas com deficiência.',
        salary: 'R$ 2.409,90',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Assistente+Administrativo+PCD+Universidade+Livre&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['PCD', 'Rotinas administrativas', 'Informática básica']
    },
    {
        id: 307,
        title: 'Auxiliar de Produção - Expedição',
        company: 'Bruson Metalúrgica',
        description: 'Atuar no setor de expedição auxiliando na movimentação de materiais e separação.',
        salary: 'R$ 2.270,40',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Auxiliar+de+Producao+Expedicao+Bruson+Metalurgica&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Disponibilidade para turno noturno', 'Experiência em produção/logística', 'Trabalho em equipe']
    },
    {
        id: 308,
        title: 'Torneiro Mecânico II',
        company: 'Berneck S.A Painéis e Serrados',
        description: 'Operação de torno mecânico para confecção e reparo de peças industriais.',
        salary: 'A combinar',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Torneiro+Mecanico+II+Berneck&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Experiência comprovada como torneiro', 'Leitura e interpretação de desenhos', 'Conhecimento em usinagem']
    },
    {
        id: 309,
        title: 'Operador Multifuncional / empilhadeira',
        company: 'Angelo Burbello',
        description: 'Operação de empilhadeira e auxílio em diversas funções no pátio da construção civil.',
        salary: 'R$ 2.265,00 – R$ 2.529,30',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+Multifuncional+empilhadeira+Angelo+Burbello&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Curso de Operador de Empilhadeira', 'Habilitação ativa', 'Experiência em materiais de construção']
    },
    {
        id: 310,
        title: 'Operador de Produção I',
        company: 'Copa Energia',
        description: 'Enchimento e movimentação de cilindros de gás de forma segura e eficiente.',
        salary: 'A combinar',
        type: 'CLT',
        location: 'Araucária, PR',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+de+Producao+Copa+Energia&l=Arauc%C3%A1ria%2C+PR',
        requirements: ['Ensino médio completo', 'Disponibilidade de horário', 'Experiência em produção industrial']
    }
];
