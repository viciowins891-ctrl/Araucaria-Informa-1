
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
        id: 101,
        title: 'Operador de Empilhadeira',
        company: 'Logística Paraná',
        description: 'Operação de empilhadeira elétrica e a gás, carga e descarga de caminhões. Necessário curso atualizado e experiência na função.',
        salary: 'R$ 2.450 + Benefícios',
        type: 'CLT',
        location: 'Thomaz Coelho, Araucária',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Operador+Empilhadeira&l=Araucária',
        requirements: ['Curso de Empilhadeira', 'CNH B']
    },
    {
        id: 102,
        title: 'Porteiro',
        company: 'Condomínio Residencial',
        description: 'Controle de entrada de visitantes, recebimento de encomendas e monitoramento. Escala 12x36 (Diurno).',
        salary: 'R$ 1.950 + VA',
        type: 'CLT',
        location: 'Centro',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Porteiro&l=Araucária',
        requirements: ['Ensino Médio', 'Curso de Portaria']
    },
    {
        id: 103,
        title: 'Atendente de Farmácia',
        company: 'Rede FarmaTotal',
        description: 'Atendimento ao cliente, leitura de receitas, organização de gôndolas e aplicação de injetáveis (diferencial).',
        salary: 'R$ 1.980 + Comissões',
        type: 'CLT',
        location: 'Centro',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Atendente+Farmácia&l=Araucária',
        requirements: ['Ensino Médio', 'Disponibilidade de horário']
    },
    {
        id: 110,
        title: 'Técnico em Segurança do Trabalho',
        company: 'Indústria Química (CIAR)',
        description: 'Fiscalização de NR, entrega de EPIs, treinamentos e relatórios de segurança. Vaga para turno administrativo.',
        salary: 'R$ 3.800 + Plano de Saúde',
        type: 'CLT',
        location: 'CIAR, Araucária',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Técnico+Segurança&l=Araucária',
        requirements: ['Curso Técnico Concluído', 'Registro Ativo']
    },
    {
        id: 120,
        title: 'Vendedor Externo',
        company: 'Distribuidora de Bebidas',
        description: 'Atendimento a bares e restaurantes da região. Necessário veículo próprio (moto). Ajuda de custo + comissão agressiva.',
        salary: 'R$ 1.800 + Variável (Média R$ 4k)',
        type: 'CLT',
        location: 'Araucária e Região',
        date: 'Ontem',
        contactLink: 'https://br.indeed.com/empregos?q=Vendedor+Externo&l=Araucária',
        requirements: ['CNH A', 'Experiência em Vendas']
    },
    {
        id: 130,
        title: 'Eletricista Industrial',
        company: 'Manutenção & Reparos',
        description: 'Manutenção preventiva e corretiva em painéis elétricos e maquinário industrial. Disponibilidade para plantões.',
        salary: 'R$ 3.500 + 30%',
        type: 'CLT',
        location: 'Araucária',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Eletricista+Industrial&l=Araucária',
        requirements: ['NR10', 'SEP', 'Curso Técnico']
    },
    {
        id: 140,
        title: 'Cozinheira Industrial',
        company: 'Refeições Coletivas',
        description: 'Preparo de grandes volumes (café, almoço e jantar). Experiência em cozinha industrial é indispensável.',
        salary: 'R$ 2.100 + Alimentação',
        type: 'CLT',
        location: 'Próximo à Repar',
        date: 'Há 2 dias',
        contactLink: 'https://br.indeed.com/empregos?q=Cozinheira&l=Araucária',
        requirements: ['Experiência comprovada', 'Disponibilidade de turno']
    },
    {
        id: 150,
        title: 'Jovem Aprendiz Administrativo',
        company: 'Cooperativa Agrícola',
        description: 'Oportunidade para primeiro emprego. Auxílio no arquivo, atendimento telefônico e rotinas administrativas.',
        salary: 'R$ 1.412 + VT',
        type: 'Estágio',
        location: 'Centro',
        date: 'Hoje',
        contactLink: 'https://br.indeed.com/empregos?q=Jovem+Aprendiz&l=Araucária',
        requirements: ['Ensino Médio em curso ou completo', '18 a 22 anos']
    },
    {
        id: 160,
        title: 'Vigia Noturno',
        company: 'Segurança Patrimonial',
        description: 'Ronda perimetral, controle de acesso e monitoramento de câmeras. Escala 12x36 noturna.',
        salary: 'R$ 1.850 + Adicional Noturno',
        type: 'CLT',
        location: 'Araucária (Industrial)',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Vigia&l=Araucária',
        requirements: ['Ensino Fundamental', 'Disponibilidade para noite']
    },
    {
        id: 170,
        title: 'Serviços Gerais - Zeladoria',
        company: 'Condomínio Club',
        description: 'Limpeza de áreas comuns, jardinagem básica e pequenos reparos. Vaga para início imediato.',
        salary: 'R$ 1.950 + Vale Refeição',
        type: 'CLT',
        location: 'Costeira',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Serviços+Gerais&l=Araucária',
        requirements: ['Experiência na função', 'Proatividade']
    },
    {
        id: 180,
        title: 'Recepcionista Clínica',
        company: 'Clínica de Saúde',
        description: 'Agendamento de consultas, autorização de guias de convênio e atendimento ao paciente.',
        salary: 'R$ 1.900 + Vale Alimentação',
        type: 'CLT',
        location: 'Centro',
        date: 'Recente',
        contactLink: 'https://br.indeed.com/empregos?q=Recepcionista&l=Araucária',
        requirements: ['Experiência com convênios', 'Simpatia e Proatividade']
    }
];
