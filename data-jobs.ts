
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
        title: 'Soldador MIG/MAG',
        company: 'Metalúrgica Araucária (CIAR)',
        description: 'Vaga urgente para soldador com experiência em estruturas metálicas pesadas. Turno: Manhã/Tarde.',
        salary: 'R$ 3.200 + Periculosidade',
        type: 'CLT',
        location: 'Cidade Industrial (CIAR)',
        date: 'Hoje',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Experiência 2 anos', 'Certificação em dia']
    },
    {
        id: 2,
        title: 'Atendente de Farmácia',
        company: 'Rede FarmaTotal',
        description: 'Atendimento ao balcão, organização de medicamentos e operação de caixa. Disponibilidade para finais de semana.',
        salary: 'R$ 1.950 + Comissão',
        type: 'CLT',
        location: 'Costeira',
        date: 'Hoje',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Ensino Médio', 'Experiência prévia desejável']
    },
    {
        id: 3,
        title: 'Auxiliar de Logística',
        company: 'Centro Logístico BR-476',
        description: 'Separação de mercadorias (picking), etiquetagem e expedição. Vaga para início imediato (temporário com chance de efetivação).',
        salary: 'R$ 1.780 + VR + VA',
        type: 'Temporário',
        location: 'Thomaz Coelho',
        date: 'Ontem',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Ensino Fundamental', 'Disponibilidade noturna']
    },
    {
        id: 4,
        title: 'Técnico em Segurança do Trabalho',
        company: 'Construtora ObrasBrasil',
        description: 'Fiscalização de obras, entrega de EPIs e DDS diário em canteiro de obras no Jd. Iguaçu.',
        salary: 'R$ 3.800',
        type: 'CLT',
        location: 'Jardim Iguaçu',
        date: 'Ontem',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Curso Técnico Completo', 'Registro Ativo']
    },
    {
        id: 5,
        title: 'Estagiário de Administração',
        company: 'Prefeitura Municipal (RH)',
        description: 'Apoio no arquivo de documentos e atendimento aos servidores. Bolsa auxílio compatível com o semestre.',
        salary: 'R$ 1.100 (Bolsa)',
        type: 'Estágio',
        location: 'Centro (Paço Municipal)',
        date: '23/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Cursando Administração ou RH (1º ao 4º período)']
    },
    {
        id: 6,
        title: 'Motorista Carreteiro',
        company: 'TransAraucária',
        description: 'Transporte de cargas para o Porto de Paranaguá. Necessário CNH E e EAR.',
        salary: 'R$ 4.500 + Diárias',
        type: 'CLT',
        location: 'Rodovia do Xisto',
        date: '22/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['CNH E', 'Mopp Atualizado']
    },
    {
        id: 7,
        title: 'Repositor de Loja',
        company: 'Supermercado Condor',
        description: 'Reposição de gôndolas, verificação de validade e precificação. Vagas exclusivas para unidade Costeira.',
        salary: 'R$ 1.650 + Benefícios',
        type: 'CLT',
        location: 'Costeira',
        date: '22/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Sem experiência (Primeiro Emprego)']
    },
    {
        id: 8,
        title: 'Desenvolvedor Fullstack Jr',
        company: 'Tech Solutions (Parque Tecnológico)',
        description: 'Desenvolvimento de sistemas web utilizando React e Node.js. Oportunidade para crescer com a empresa.',
        salary: 'R$ 3.000',
        type: 'PJ',
        location: 'Fazenda Velha',
        date: '21/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['React', 'Node.js', 'Portfólio']
    },
    {
        id: 9,
        title: 'Padeiro / Confeiteiro',
        company: 'Panificadora Central',
        description: 'Produção de pães artesanais, bolos e salgados. Horário da madrugada.',
        salary: 'R$ 2.400',
        type: 'CLT',
        location: 'Centro',
        date: '20/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Experiência comprovada']
    },
    {
        id: 10,
        title: 'Mecânico Diesel',
        company: 'Oficina do Zé',
        description: 'Manutenção de caminhões e ônibus. Especialidade em motores e freios a ar.',
        salary: 'R$ 3.500 + Produtividade',
        type: 'CLT',
        location: 'Campina da Barra',
        date: '20/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Experiência em Linha Pesada']
    },
    {
        id: 11,
        title: 'Operador de Caixa',
        company: 'Atacadão',
        description: 'Operação de caixa e atendimento ao cliente. Vagas para turno tarde/noite.',
        salary: 'R$ 1.700,00',
        type: 'CLT',
        location: 'Capela Velha',
        date: '19/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Ensino Médio Completo', 'Disponibilidade de horário']
    },
    {
        id: 12,
        title: 'Estágio em Engenharia Civil',
        company: 'Construtora Sanches',
        description: 'Acompanhamento de medições, controle de qualidade e leitura de projetos.',
        salary: 'R$ 1.500,00 (Bolsa)',
        type: 'Estágio',
        location: 'Centro',
        date: '19/01',
        contactLink: 'https://wa.me/5541999904961',
        requirements: ['Cursando a partir do 5º período', 'AutoCAD']
    }
];
