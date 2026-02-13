import { NewsArticle, Event, Business } from './types';
// Função auxiliar APENAS para Eventos (para que pareçam sempre futuros/próximos)
const getUpcomingDate = (daysFromNow: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    // Retorna formato YYYY-MM-DD (ISO) para garantir ordenação correta
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
// Função auxiliar para gerar datas passadas recentes (para notícias)
const getPastDate = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    // Retorna formato YYYY-MM-DD (ISO) para garantir ordenação correta
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
// URLs atualizadas para imagens urbanas e contextuais de alta qualidade.
// Garante que não tenhamos links quebrados e que a estética seja coesa.
export const newsArticles: NewsArticle[] = [
    {
        id: 1771000030,
        title: "Araucária 136 Anos: Feriado leva multidão ao Parque Cachoeira",
        summary: "Aniversário da cidade foi celebrado com shows, bolo de 136kg e atrações para toda a família nesta terça-feira (11).",
        content: `
        <p><strong>ARAUCÁRIA</strong> - O feriado de 11 de fevereiro, data que marca os **136 anos de emancipação política de Araucária**, foi celebrado em grande estilo pela população. O Parque Cachoeira, principal cartão-postal da cidade, ficou pequeno para as milhares de famílias que compareceram para prestigiar a festa, aproveitando o dia de sol e a vasta programação gratuita.</p>
        <p>Quem passou pelo local encontrou uma estrutura impressionante. A criançada se divertiu nos brinquedos infláveis gigantes montados no gramado, que garantiram a alegria dos pequenos durante toda a tarde. A praça de alimentação, com food trucks e feira gastronômica, ofereceu o melhor da culinária local, enquanto no palco principal, artistas regionais animaram o público com música sertaneja, pop e rock.</p>
        <h3>Tradição e Confraternização</h3>
        <p>O momento mais aguardado, no entanto, foi o tradicional corte do bolo. Neste ano, um bolo simbólico e decorado de 136kg foi o centro das atenções, representando a união e a partilha da comunidade araucariense. Autoridades locais realizaram o corte oficial, distribuindo fatias para a multidão que cercava a mesa principal, num gesto de confraternização que já virou tradição no município.</p>
        <p>"Araucária é uma cidade construída por gente trabalhadora e acolhedora. Celebrar mais um ano de história aqui no Parque, vendo as famílias reunidas, é renovar nossa esperança no futuro", destacou a organização do evento. O feriado transcorreu com segurança reforçada pela Guarda Municipal e Polícia Militar, garantindo um clima de paz e diversão para todos.</p>
        `,
        imageUrl: '/images/araucaria_136_aniversario_capa_v2.jpg',
        mobileImageUrl: '/images/araucaria_136_aniversario_capa_v2.jpg',
        internalImageUrl: '/images/araucaria_136_aniversario_interna_v2.jpg',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '2026-02-13',
        author: 'Redação Oficial'
    },
    {
        id: 1771000020,
        title: "Araucária E.C. apresenta elenco para a Divisão de Acesso 2026",
        summary: "O 'Cacique' aposta na mescla de experiência e jovens da base para buscar o retorno à elite do futebol paranaense.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A temporada 2026 começou oficialmente para o Araucária Esporte Clube. Em evento realizado nesta manhã no Estádio Municipal, a diretoria apresentou o elenco que disputará a Segunda Divisão do Campeonato Paranaense. Com o lema "Rumo à Elite", o Cacique investiu em reforços pontuais para o setor defensivo, mas manteve a espinha dorsal da equipe que quase subiu no ano passado.</p>
        <p>O destaque fica por conta da promoção de cinco atletas do <strong>Sub-20</strong>, categoria que vem brilhando nos estaduais contra gigantes como Coritiba e Athletico. "Essa garotada tem o DNA do clube. Eles sabem o peso dessa camisa", afirmou o técnico Marquinhos.</p>
        <h3>Estreia em Casa</h3>
        <p>A estreia está marcada para o próximo domingo, contra o Paraná Clube, com promessa de casa cheia. A torcida organizada Fúria do Cacique já organiza uma caravana partindo da Praça da Matriz.</p>
        `,
        imageUrl: '/images/araucaria_ec_jogo.webp', // Usar imagem de time genérica ou placeholder
        mobileImageUrl: '/images/araucaria_ec_jogo_mobile.webp',
        internalImageUrl: '/images/futsal_action_unique.png', // Reutilizando ação esportiva
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '2026-02-12',
        author: 'Esporte na Rede'
    },
    {
        id: 1771000019,
        title: "Copa Tião Calado: Grêmio vence Beira Rio em clássico eletrizante",
        summary: "Rodada da 'Primeirona' foi marcada por muitos gols e arquibancada lotada no campo do Costeira.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - O futebol amador de Araucária provou mais uma vez porque é uma paixão municipal. No clássico da rodada da Copa Tião Calado, o <strong>Grêmio Araucariense</strong> venceu o tradicional <strong>Beira Rio</strong> por 3 a 2, em uma partida decidida nos acréscimos.</p>
        <p>O jogo, disputado no campo do Costeira, reuniu centenas de torcedores das duas comunidades. O gol da vitória saiu aos 48 minutos do segundo tempo, em cobrança de falta magistral do meia Canhoto. Com o resultado, o Grêmio assume a liderança isolada do Grupo B.</p>
        <h3>Várzea Viva</h3>
        <p>"Isso aqui é futebol raiz. Domingo de manhã, família na beira do campo e muita raça", celebrou o presidente da Liga Desportiva. A próxima rodada promete, com o duelo entre Tropical e Juventus.</p>
        `,
        imageUrl: '/images/placeholder_esporte.webp', // Reutilizando img esporte
        mobileImageUrl: '/images/placeholder_esporte_mobile.webp',
        internalImageUrl: '/images/futsal_action_unique.png',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '2026-02-12',
        author: 'Várzea News'
    },
    {
        id: 1771000018,
        title: "CPI do Transporte: Câmara investiga contrato de R$ 31 milhões",
        summary: "Comissão Processante apura supostas irregularidades em acordo emergencial da Prefeitura.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A política local está em ebulição. A Câmara Municipal instalou esta semana uma Comissão Processante (CPI) para investigar o contrato de R$ 31 milhões firmado entre a Prefeitura e a nova operadora do transporte coletivo. A oposição alega falta de transparência na dispensa de licitação.</p>
        <p>Em nota, o Executivo defendeu a legalidade do ato, afirmando que a medida foi necessária para evitar o colapso do sistema de ônibus após a falência da antiga concessionária. Os vereadores terão 90 dias para apresentar o relatório final.</p>
        `,
        imageUrl: '/images/news_budget.png',
        mobileImageUrl: '/images/news_budget.png',
        internalImageUrl: '/images/camara_araucaria_internal_final.png',
        category: 'Política',
        categoryColor: 'purple',
        publishDate: '2026-02-12',
        author: 'Redação Política'
    },
    {
        id: 1771000017,
        title: "Araucária Vôlei vence Maringá e segue invicto na Superliga B",
        summary: "Ginásio Joval de Paula Souza virou caldeirão na noite de quarta-feira. Time busca o acesso.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - O projeto de levar Araucária à elite do vôlei nacional segue firme. Jogando em casa, no Ginásio Joval de Paula Souza (Parque Cachoeira), o <strong>Araucária Vôlei/SMEL</strong> derrotou o forte time de Maringá por 3 sets a 1.</p>
        <p>A torcida compareceu em peso, transformando o ginásio em um caldeirão. O oposto Bruno foi o maior pontuador da partida, com 22 acertos. "A energia dessa torcida é o nosso sétimo jogador", elogiou o técnico. O próximo desafio é fora de casa, contra o líder Juiz de Fora.</p>
        `,
        imageUrl: '/images/gym_volleyball_final_cover_v5.png',
        mobileImageUrl: '/images/gym_volleyball_final_cover_v5.png',
        internalImageUrl: '/images/gym_volleyball_internal_final_v5_mobile.webp',
        category: 'Esporte',
        categoryColor: 'orange',
        publishDate: '2026-02-11',
        author: 'Esporte em Foco'
    },
    {
        id: 1771000016,
        title: "Obras no Contorno Norte exigem atenção redobrada",
        summary: "Bloqueios parciais para construção de viaduto geram lentidão nos horários de pico.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - O motorista que utiliza o Contorno Norte para acessar Curitiba deve ter paciência. As obras do novo viaduto de interconexão entraram em uma fase crítica, exigindo o estreitamento de pista no km 12.</p>
        <p>O Departamento de Estradas de Rodagem (DER) recomenda rotas alternativas pela Rodovia do Xisto ou pelo centro de Campo Largo. A previsão é que as interferências no tráfego durem cerca de três semanas.</p>
        `,
        imageUrl: '/images/pavimentacao-jardim-plinio-final.png',
        mobileImageUrl: '/images/pavimentacao-jardim-plinio-final.png',
        internalImageUrl: '/images/pavimentacao_jardim_plinio_internal_real.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '2026-02-11',
        author: 'Mobilidade Urbana'
    },
    {
        id: 1771000015,
        title: "Atleta de Araucária é ouro no Brasileiro de Judô",
        summary: "Jovem do Projeto 'Esporte Cidadão' subiu ao lugar mais alto do pódio em São Paulo.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - O esporte araucariense tem um novo campeão nacional. Felipe Santos, de 16 anos, conquistou a medalha de ouro na categoria meio-médio do Campeonato Brasileiro de Judô Sub-18, disputado neste fim de semana em São Paulo.</p>
        <p>Felipe é fruto do projeto social "Esporte Cidadão", mantido pela Prefeitura no CAIC. "Essa medalha é para todos que acreditaram em mim, especialmente meus treinadores do município", disse o atleta emocionado ao desembarcar com o ouro no peito.</p>
        `,
        imageUrl: '/images/judo_escolas_real.jpg', // Usar placeholder ou genérica
        mobileImageUrl: '/images/judo_escolas_real_mobile.webp',
        internalImageUrl: '/images/chess_players_unique.png', // Reutilizando img genérica de esporte individual
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '2026-02-10',
        author: 'Esporte na Rede'
    },
    {
        id: 1771000014,
        title: "Segurança: GM apreende drogas no Campina da Barra",
        summary: "Operação saturação resultou na prisão de dois suspeitos e apreensão de entorpecentes.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A Guarda Municipal de Araucária (GMA) realizou uma importante apreensão de drogas na noite de ontem no bairro Campina da Barra. Durante patrulhamento preventivo, uma equipe da ROMU desconfiou de movimentação suspeita em um terreno baldio.</p>
        <p>Dois indivíduos foram abordados e com eles encontrados 2kg de maconha e pinos de cocaína. A ação faz parte da "Operação Bairro Seguro", que tem intensificado rondas nas regiões mais afastadas do centro.</p>
        `,
        imageUrl: '/images/pcpr_incineration_cover_final_v2.png',
        mobileImageUrl: '/images/pcpr_incineration_cover_final_v2.png',
        internalImageUrl: '/images/pcpr_incineration_internal_real.png',
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: '2026-02-09',
        author: 'Araucária Alerta'
    },
    {
        id: 1771000013,
        title: "Inscrições abertas para as Escolinhas de Esporte da Prefeitura",
        summary: "Vagas gratuitas para Futsal, Natação e Ginástica Rítmica para crianças e adolescentes.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A Secretaria Municipal de Esporte e Lazer (SMEL) abriu hoje as inscrições para as turmas de 2026 das escolinhas esportivas. São mais de 1.500 vagas distribuídas em diversas modalidades, com destaque para a Natação (no CSU) e a Ginástica Rítmica.</p>
        <p>O objetivo é democratizar o acesso ao esporte e descobrir novos talentos. "Queremos tirar a criança da rua e colocar na quadra, na piscina", afirmou o secretário. As inscrições devem ser feitas presencialmente nos núcleos esportivos dos bairros.</p>
        `,
        imageUrl: '/images/hortas_escolas_cover_v27.jpg', // Reutilizando img escola/criança
        mobileImageUrl: '/images/hortas_escolas_cover_v27.jpg',
        internalImageUrl: '/images/teatro_infantil_internal_real.png',
        category: 'Esporte', // Foco em Esporte público
        categoryColor: 'green',
        publishDate: '2026-02-08',
        author: 'Prefeitura Municipal'
    },
    {
        id: 1771000012,
        title: "Acidente grave bloqueia Rodovia do Xisto por 3 horas",
        summary: "Colisão entre caminhão e moto causou congestionamento quilométrico próximo à Repar.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - Um grave acidente paralisou a Rodovia do Xisto (BR-476) na manhã desta sexta-feira. Uma colisão lateral envolvendo um caminhão tanque e uma motocicleta bloqueou totalmente a pista sentido Curitiba, na altura da Refinaria.</p>
        <p>O motociclista foi socorrido pelo helicóptero da PRF em estado grave. O trânsito precisou ser desviado por dentro da área urbana, causando lentidão na Avenida das Araucárias. A pista foi liberada por volta do meio-dia.</p>
        `,
        imageUrl: '/images/defesa-civil-rio-iguacu-capa-real.png',
        mobileImageUrl: '/images/defesa-civil-rio-iguacu-capa-real.png',
        internalImageUrl: '/images/defesa_civil_internal_generated.png',
        category: 'Trânsito',
        categoryColor: 'gray',
        publishDate: '2026-02-07',
        author: 'Trânsito Agora'
    },
    {
        id: 1771000011,
        title: "Violência no Terminal: Adolescentes são apreendidos após briga",
        summary: "Confronto entre grupos rivais assustou passageiros no Terminal Central.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A segurança nos terminais de ônibus voltou a ser pauta após uma confusão generalizada no Terminal Central. Dois grupos de adolescentes se enfrentaram na plataforma de embarque, gerando pânico entre os usuários.</p>
        <p>A Guarda Municipal interveio rapidamente, apreendendo três menores com soqueiras e canivetes. Ninguém ficou ferido gravemente, mas o episódio reforça a necessidade de monitoramento constante nos horários de saída escolar.</p>
        `,
        imageUrl: '/images/gm_viaturas_cover_v2.png',
        mobileImageUrl: '/images/gm_viaturas_cover_v2.png',
        internalImageUrl: '/images/gma_viaturas_manual.png',
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: '2026-02-06',
        author: 'Segurança Pública'
    },
    {
        id: 1769253501,
        title: "Hoje tem decisão: Araucária Vôlei enfrenta o ELASE pela Superliga B",
        summary: "Partida desta quarta-feira (24) no Ginásio Joval de Paula Souza vale a liderança e promessa de casa cheia.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - É dia de jogão em Araucária! Nesta quarta-feira (24), o <strong>Araucária Vôlei/SMEL</strong> recebe a equipe do <strong>ELASE</strong> (SC) pela 8ª rodada da Superliga B Masculina 2025/26. A partida está marcada para as 19h30 no Ginásio Joval de Paula Souza.</p>
        <p>O confronto é direto na parte de cima da tabela. Vindo de uma sequência importante de treinos, o time da casa conta com o apoio da torcida para superar os catarinenses e se consolidar no G4 da competição.</p>
        <h3>Ingressos</h3>
        <p>A entrada é franca, mas a organização pede a doação de 1kg de alimento não perecível. A expectativa é de ginásio lotado, repetindo a festa bonita que a torcida araucariense tem feito nos jogos em casa.</p>
        <p>"O grupo está focado. Sabemos da qualidade do adversário, mas dentro do nosso caldeirão, quem manda é o Araucária", afirmou o técnico da equipe.</p>

    `,
        imageUrl: '/images/araucaria-volei-vs-elase-capa_mobile.png',
        mobileImageUrl: '/images/araucaria-volei-vs-elase-capa_mobile.png',
        internalImageUrl: '/images/araucaria_volei_match_action.png',
        category: 'Esporte',
        categoryColor: 'indigo',
        publishDate: '2026-01-24',
        author: 'Esporte na Rede'
    },
    {
        id: 1769252001,
        title: "Saúde de Araucária bate recorde com 150 mil atendimentos",
        summary: "Secretaria de Saúde divulga balanço positivo com aumento de 50 mil agendamentos em comparação ao ano anterior.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A saúde pública do município alcançou uma marca histórica neste semestre. Segundo dados divulgados hoje pela Secretaria Municipal de Saúde (SMSA), foram realizados mais de 149.186 procedimentos entre janeiro e julho.</p>
        
        <p>O número representa um aumento de quase 50 mil atendimentos em relação ao mesmo período do ano passado. "É o resultado da ampliação do horário das UBS e da contratação de novos médicos", celebra a secretária da pasta.</p>
        <h3>Oportunidade</h3>
        
        <p>Além das consultas curativas, o relatório aponta crescimento nos programas de prevenção, como o Hiperdia (hipertensão e diabetes) e pré-natal, garantindo mais qualidade de vida a longo prazo para a população.</p>
        
        <p>A movimentação gerada pela ampliação dos atendimentos trouxe vida nova para o entorno das unidades de saúde. Moradores e comerciantes de regiões como <strong>Jardim Iguaçu</strong> e <strong>Fazenda Velha</strong> já sentem a diferença: a circulação constante de pacientes e profissionais aqueceu as vendas em padarias e farmácias locais, além de aumentar a sensação de segurança e valorizar os imóveis próximos a esses equipamentos públicos.</p>`,
        imageUrl: '/images/saude-recorde-150mil.png',
        mobileImageUrl: '/images/saude-recorde-150mil.png',
        internalImageUrl: '/images/saude_atendimento_interno.png',
        category: 'Saúde',
        categoryColor: 'green',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },
    {
        id: 1769252002,
        title: "Araucária lança 'Programa Criança Segura' nas escolas",
        summary: "Iniciativa pioneira visa fortalecer a proteção de crianças e adolescentes nas redes pública e privada de ensino.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A Prefeitura oficializou nesta manhã o lançamento do "Programa Criança Segura", uma iniciativa robusta voltada à proteção integral dos estudantes da cidade. O projeto, que integra forças da Guarda Municipal, Polícia Militar e Secretaria de Educação, visa criar um cinturão de segurança no entorno das instituições de ensino, prevenindo incidentes e garantindo tranquilidade para pais e alunos.</p>
        
        <p>Uma das principais inovações é a instalação de "botões de pânico" silenciosos em todas as salas de aula e secretarias, conectados diretamente à central de monitoramento da Guarda Municipal (GMA). O tempo de resposta para ocorrências escolares promete cair drasticamente com a nova tecnologia, que já está em fase de testes em colégios do <strong>Jardim Tupy</strong> e <strong>Campina da Barra</strong>, regiões com alta densidade estudantil.</p>
        <h3>Educação em Foco</h3>
        
        <p>Além da tecnologia, o fator humano é central no programa. Professores e pedagogos passarão por treinamentos específicos para identificar sinais de vulnerabilidade e mediar conflitos, enquanto os alunos receberão palestras sobre cidadania e segurança digital. A ação se estende também às famílias, com workshops sobre parentalidade responsável.</p>
        
        <p>O impacto da medida já movimenta a rotina nos bairros. No <strong>Capela Velha</strong>, por exemplo, a presença ostensiva das patrulhas escolares nos horários de entrada e saída tem inibido a presença de estranhos e melhorado o trânsito local. Comerciantes próximos às escolas, como donos de vans e papelarias, celebram a iniciativa, percebendo que um ambiente escolar seguro valoriza toda a vizinhança e atrai mais famílias para a região.</p>`,
        imageUrl: '/images/crianca-segura-final.png', // TRAVA: IMAGEM MANUAL
        mobileImageUrl: '/images/crianca-segura-final.png',
        internalImageUrl: '/images/crianca-segura-botao-interna.png',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },
    {
        id: 1769250291,
        title: "No Dia Nacional da Araucária, Paraná completa cinco anos da lei que permite o manejo sustentável da espécie - assembleia.pr.leg.br",
        summary: "ARAUCÁRIA - No Dia Nacional da Araucária, Paraná completa cinco anos da lei que permite o manejo sustentável da espécie. A iniciativa une preservação e renda.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - O Paraná celebra cinco anos da lei pioneira que regulamenta o plantio e o manejo sustentável da espécie símbolo do estado, a <em>Araucaria angustifolia</em>. A legislação transformou a forma como o produtor rural enxerga a árvore: de um entrave na lavoura para um ativo econômico valioso, conciliando preservação ambiental com geração de renda através da extração legal do pinhão e madeira certificada.</p>
        
        <p>Em Araucária, município que carrega a árvore no nome, os reflexos dessa mudança cultural são claros. Nas comunidades rurais de <strong>Guajuvira</strong> e <strong>Roça Nova</strong>, famílias inteiras têm investido no plantio de novas mudas, apostando na longevidade da espécie.</p>
        <h3>Oportunidade</h3>
        
        <p>A Secretaria de Agricultura aponta que a regularização trouxe segurança jurídica para quem preserva. O pinhão araucariense, famoso pela qualidade, agora chega aos mercados com selo de origem, valorizando o trabalho de quem mantém a floresta em pé. "É o fim do conflito entre produzir e preservar. Hoje, a araucária é sinônimo de futuro para nossa região", celebra um produtor local.</p>`,
        imageUrl: '/images/araucaria-aniversario-lei-capa.png',
        mobileImageUrl: '/images/araucaria-aniversario-lei-capa.png',
        internalImageUrl: '/images/araucaria-manejo-sustentavel-interna.png',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },
    {
        id: 1769250987,
        title: "Programa Interconexões Paraná-Japão terá investimento de R$ 3 milhões",
        summary: "Projeto fortalecerá a cooperação tecnológica e cultural entre o estado e o país asiático, com foco no desenvolvimento sustentável.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A cooperação internacional entre o Paraná e o Japão ganha um novo capítulo com o aporte confirmado de R$ 3 milhões pelo Governo do Estado. O recurso, liberado através da Secretaria da Ciência, Tecnologia e Ensino Superior, será destinado ao Programa Interconexões, que visa modernizar a infraestrutura cultural e tecnológica em municípios com forte herança nipônica.</p>
        
        <p>Em Araucária, o investimento já tem destino certo: a revitalização de espaços públicos que celebram essa parceria histórica. O projeto inclui a construção de novos equipamentos de lazer e convivência, desenhados para integrar a arquitetura moderna com elementos tradicionais japoneses, criando pontos turísticos que valorizam a identidade local.</p>
        <h3>Investimento e Melhorias</h3>
        
        <p>Além do aspecto urbanístico, o programa foca no intercâmbio de conhecimento. "Não estamos falando apenas de obras, mas de construir pontes para o futuro. A ideia é trazer tecnologias de sustentabilidade e *smart cities* desenvolvidas no Japão para aplicar na realidade das nossas cidades", explica um representante da Fundação Araucária.</p>
        
        <p>A comunidade japonesa local recebeu a notícia com entusiasmo, vendo no projeto uma oportunidade de manter vivas as tradições e, ao mesmo tempo, inserir o município em uma rota global de inovação.</p>`,
        imageUrl: '/images/interconexoes-parana-japao-capa.png',
        mobileImageUrl: '/images/interconexoes-parana-japao-capa.png',
        internalImageUrl: '/images/interconexoes-parana-japao-interna.png',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },
    {
        id: 1769250568,
        title: "Araucária comemora 136 anos com Corrida de Rua e atrações especiais",
        summary: "Evento esportivo reunirá centenas de atletas neste fim de semana para celebrar o aniversário da cidade. Programação inclui caminhada e atividades para a família.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - Em comemoração aos 136 anos de emancipação política de Araucária, a cidade se prepara para receber a tradicional <strong>Corrida de Rua de Aniversário</strong>. O evento, que acontece neste domingo, promete movimentar as ruas do Centro com centenas de atletas profissionais e amadores.</p>
        <p>A largada será na Praça da Bíblia, com percursos de 5km e 10km, além de uma caminhada participativa de 3km para envolver toda a comunidade. "É um momento de celebrar nossa história cuidando da saúde e ocupando os espaços públicos com alegria", destaca a Secretaria de Esporte e Lazer (SMEL).</p>
        <h3>Festa para a Família</h3>
        <p>Além da prova, a programação festiva inclui uma praça de alimentação com Food Trucks, apresentações culturais locais e brinquedos para as crianças. O trânsito na região central terá bloqueios parciais durante a manhã para garantir a segurança dos corredores.</p>
        <p>As inscrições para a corrida já estão encerradas, mas a população é convidada a prestigiar e torcer pelos atletas, fortalecendo o espírito esportivo que marca o aniversário da cidade.</p>
    `,
        imageUrl: '/images/araucaria_run_136_years.png',
        mobileImageUrl: '/images/araucaria_run_136_years.png',
        internalImageUrl: '/images/araucaria_run_internal.png',
        category: 'Esporte',
        categoryColor: 'indigo',
        publishDate: '2026-01-24',
        author: 'Esporte em Foco'
    },
    {
        id: 1769250610,
        title: "Concurso Araucária PR: FAFIPA é a banca organizadora",
        summary: "Fundação de Apoio ao Câmpus de Paranavaí foi escolhida para organizar o próximo concurso público do município. Edital deve sair em breve.",
        content: `
        <p><strong>ARAUCÁRIA</strong> - A Prefeitura de Araucária definiu a banca organizadora do próximo concurso público municipal. A escolhida foi a Fundação de Apoio ao Câmpus de Paranavaí (FAFIPA), instituição com vasta experiência em certames no estado do Paraná.</p>
        <p>A contratação marca um passo importante para a realização do concurso, que é aguardado com grande expectativa. Segundo fontes ligadas à administração, o objetivo é preencher vagas em diversas áreas, reforçando o quadro de servidores para melhorar o atendimento à população.</p>
        <h3>O que esperar da prova?</h3>
        <p>Especialistas em concursos alertam que a FAFIPA costuma elaborar provas com questões objetivas e textos diretos. "É o momento de focar na resolução de questões anteriores da banca para entender o perfil de cobrança", recomenda Ana Silva, consultora pedagógica.</p>
        <p>O edital oficial, com o detalhamento das vagas, salários e cronograma, deve ser publicado nas próximas semanas no Diário Oficial do Município.</p>

    `,
        imageUrl: '/images/concurso-araucaria-banca-capa.png',
        mobileImageUrl: '/images/concurso-araucaria-banca-capa.png',
        internalImageUrl: '/images/concurso_estudos_internal.jpg',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '2026-01-24',
        author: 'Concursos BR'
    },
    {
        id: 1769111662,
        title: 'Obras de pavimentação transformam o Jardim Plínio',
        summary: 'Máquinas da Prefeitura iniciaram o asfaltamento das ruas principais do Jardim Plínio. A obra, aguardada há 10 anos, trará dignidade aos moradores.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - Chega de barro e poeira. Máquinas da Prefeitura iniciaram nesta semana o asfaltamento das principais vias do <strong>Jardim Plínio</strong>. A obra, uma reivindicação de mais de uma década dos moradores, promete mudar a paisagem e a rotina do bairro.</p>
        <p>O projeto contempla não apenas o pavimento asfáltico, mas também a instalação de manilhas para drenagem pluvial, meio-fio e calçadas com acessibilidade. "Era difícil sair de casa em dia de chuva, o ônibus escolar nem subia a rua. Agora vai melhorar 100%", comemora Dona Maria, moradora da região há 15 anos.</p>
        <h3>Mobilidade Urbana</h3>
        <p>A pavimentação deve facilitar também o acesso de serviços essenciais, como ambulâncias e coleta de lixo. A previsão da Secretaria de Obras é entregar as ruas prontas em até 60 dias, se as condições climáticas ajudarem.</p>

    `,
        imageUrl: '/images/pavimentacao-jardim-plinio-final.png', // TRAVA: IMAGEM MANUAL
        mobileImageUrl: '/images/pavimentacao-jardim-plinio-final.png',
        internalImageUrl: '/images/pavimentacao_jardim_plinio_internal_real.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '2026-01-24',
        author: 'Redação Squad'
    },
    {
        id: 1769118198,
        title: "Ministro da Educação autoriza obras de melhorias no IFPR Araucária",
        summary: `ARAUCÁRIA - O Ministério da Educação autorizou oficialmente as obras de melhorias no campus do Instituto Federal do Paraná(IFPR) em Araucária.O projeto contempla reformas estruturais, modernização de laboratórios e ampliação das áreas de convivência.`,
        content: `
        <p><strong>ARAUCÁRIA</strong> - O Ministério da Educação autorizou oficialmente as obras de melhorias no campus do Instituto Federal do Paraná (IFPR) em Araucária. O investimento faz parte de um pacote de modernização da rede federal de ensino técnico e profissionalizante no Paraná.</p>
        <p>As obras contemplam reformas estruturais nos prédios existentes, modernização de laboratórios de informática e eletrônica, ampliação das áreas de convivência estudantil e melhorias na acessibilidade do campus. O projeto prevê também a construção de novos espaços para atividades práticas e workshops.</p>
        <h3> Investimento na Educação Profissional </h3>
        <p> Segundo a direção do IFPR, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas do Ministério da Educação.A expectativa é que as obras sejam concluídas ainda em 2026, permitindo que mais estudantes sejam atendidos com infraestrutura de qualidade.</p>
        <p> "É uma mudança significativa para nossa comunidade educacional", afirmou a direção do campus.Com a conclusão desta etapa, novos cursos técnicos poderão ser oferecidos, fortalecendo a formação profissional dos jovens de Araucária e região metropolitana de Curitiba.</p>
        <h3> Impacto Regional </h3>
        <p> O IFPR Araucária é referência em ensino técnico na região, oferecendo cursos gratuitos de qualidade em áreas como Informática, Eletrônica, Mecânica e Administração.A ampliação da infraestrutura deve atrair mais investimentos educacionais para o município, consolidando Araucária como polo de educação profissional no Paraná.</p>

    `,
        imageUrl: '/images/ifpr-obras-capa.png',
        mobileImageUrl: '/images/ifpr-obras-capa.png',
        internalImageUrl: '/images/ifpr_construction_worker_internal.jpg',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112101,
        title: 'Volta às aulas: 18 mil alunos recebem novos kits escolares',
        summary: 'A Secretaria de Educação iniciou a distribuição dos kits de material escolar e uniforme para todos os alunos da rede municipal.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - O ano letivo começou com novidade na mochila para os estudantes da rede municipal. A Secretaria de Educação iniciou a entrega dos kits de material escolar e uniformes completos para os mais de 18 mil alunos das escolas e CMEIs da cidade.</p>
        <p>Cada kit é composto de acordo com a idade da criança, incluindo cadernos, lápis de cor, agenda, mochila reforçada e o novo uniforme de verão e inverno. A medida visa garantir igualdade de condições para todos os estudantes e aliviar o orçamento das famílias no início do ano.</p>
        <h3>Investimento no Futuro</h3>
        <p>"Ver todas as crianças uniformizadas e com material de qualidade dignifica a escola pública", afirmou a diretora do <strong>CAIC</strong> durante a distribuição. Pais e responsáveis podem retirar os kits diretamente nas unidades de ensino ao longo desta semana.</p>

    `,
        imageUrl: '/images/volta-aulas-kits-capa.png',
        mobileImageUrl: '/images/volta-aulas-kits-capa.png',
        internalImageUrl: '/images/volta_aulas_classroom_unique.png',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112147,
        title: 'SMMA intensifica combate à Dengue no bairro Costeira',
        summary: 'A Secretaria de Meio Ambiente emitiu um alerta sobre o aumento de focos do mosquito Aedes aegypti no bairro Costeira.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - O combate à Dengue ganhou reforço estratégico nesta semana com uma operação concentrada no bairro <strong>Costeira</strong>. Equipes da Secretaria Municipal de Meio Ambiente (SMMA), em parceria com a Vigilância Epidemiológica, iniciaram uma varredura minuciosa em residências e comércios da região, identificada pelo último Levantamento Rápido de Índices de Infestação (LIRAa) como uma área de alerta para a proliferação do mosquito <em>Aedes aegypti</em>.</p>
        <p>A ação mobiliza cerca de 30 agentes de endemias que, além de eliminar focos de água parada, realizam um trabalho educativo fundamental. "Encontramos muitas larvas em locais que passam despercebidos, como calhas entupidas e bandejas de geladeira. A prevenção de dez minutos semanais é a única barreira eficaz contra o surto", adverte a coordenação da Vigilância Ambiental.</p>
        <h3>Mutirão de Limpeza</h3>
        <p>Para complementar as vistorias, a Prefeitura programou um grande <strong>Bota-Fora</strong> para este sábado. Caminhões da coleta especial percorrerão todas as ruas do bairro recolhendo pneus, móveis velhos, eletrodomésticos em desuso e qualquer material que possa acumular água da chuva. A orientação é que os moradores disponham os entulhos nas calçadas até as 8h da manhã.</p>
        <p>A SMMA reforça que a recusa em permitir a entrada dos agentes ou a reincidência em manter focos pode gerar notificações conforme o Código Sanitário. Em caso de sintomas como febre alta e dores no corpo, a recomendação é procurar imediatamente a UPA.</p>
    `,
        imageUrl: '/images/smma-dengue-costeira-capa-real.png', // TRAVA: IMAGEM MANUAL
        mobileImageUrl: '/images/smma-dengue-costeira-capa-real.png',
        internalImageUrl: '/images/smma_dengue_internal_real.jpg',
        category: 'Saúde',
        categoryColor: 'green',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112338,
        title: 'Feirão de Empregos do CIAR atrai centenas de candidatos',
        summary: 'O polo industrial de Araucária (CIAR) realiza nesta sexta-feira um feirão de empregos com 300 vagas para os níveis técnico e operacional.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - A busca por uma nova oportunidade de trabalho mobilizou centenas de moradores na manhã desta sexta-feira. Antes mesmo do sol nascer, a fila já dobrava o quarteirão do Sine de Araucária, refletindo a grande expectativa para o Feirão de Empregos promovido pelas empresas do <strong>Centro Industrial de Araucária (CIAR)</strong>. O evento oferta mais de 300 vagas imediatas, reafirmando o aquecimento econômico da região.</p>
        <p>As contratações são focadas no coração pulsante da cidade: a indústria. Grandes multinacionais dos setores automotivo, petroquímico e de logística buscam preencher quadros com urgência. Cargos como <strong>Soldador MIG/MAG</strong>, <strong>Operador de Empilhadeira</strong>, <strong>Técnico em Automação</strong> e <strong>Auxiliar de Produção</strong> estão entre os mais disputados, com salários iniciais competitivos e pacotes de benefícios atraentes.</p>
        <h3>Oportunidade de Crescimento</h3>
        <p>"Cheguei às 4h da manhã e estou confiante. Estou desempregado há seis meses e essa é a chance de garantir o sustento da minha família", relatou João Paulo, morador do bairro <strong>Fazenda Velha</strong>, enquanto aguardava com a carteira de trabalho em mãos. Segundo a organização, o processo seletivo inclui triagem de currículos e entrevistas instantâneas, com possibilidade de candidatos saírem contratados no mesmo dia.</p>
        <p>O Feirão segue até às 16h ou até o preenchimento total das vagas. Interessados devem levar documentos pessoais (RG, CPF) e Carteira de Trabalho (física ou digital).</p>
    `,
        imageUrl: '/images/feirao-empregos-ciar-capa.png', // TRAVA: IMAGEM MANUAL
        mobileImageUrl: '/images/feirao-empregos-ciar-capa.png',
        internalImageUrl: '/images/feirao_empregos_ciar_internal_real.png',
        category: 'Economia',
        categoryColor: 'blue',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112325,
        title: 'Defesa Civil monitora Rio Iguaçu após chuvas intensas',
        summary: 'As fortes chuvas colocaram a Defesa Civil em estado de atenção. O monitoramento no Rio Iguaçu indica nível elevado, mas sob controle.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - As fortes chuvas dos últimos dias colocaram a Defesa Civil do município em estado de atenção. O nível do <strong>Rio Iguaçu</strong> subiu consideravelmente, exigindo monitoramento constante, especialmente nas áreas ribeirinhas do <strong>Jardim Iguaçu</strong> e região rural.</p>
        <p>Apesar do aumento do volume de água, a Defesa Civil tranquiliza a população: ainda não há risco iminente de transbordo grave, mas o alerta permanece. Equipes estão de prontidão 24 horas para atuar em caso de emergência ou necessidade de remoção preventiva de famílias.</p>
        <h3>Prevenção</h3>
        <p>A Prefeitura orienta os moradores a cadastrarem seus celulares no sistema de alerta via SMS (envie seu CEP para 40199) para receber avisos meteorológicos em tempo real. O monitoramento continuará até que as chuvas cessem e o nível do rio normalize.</p>

    `,
        imageUrl: '/images/defesa-civil-rio-iguacu-capa-real.png', // TRAVA: IMAGEM MANUAL
        mobileImageUrl: '/images/defesa-civil-rio-iguacu-capa-real.png',
        internalImageUrl: '/images/defesa_civil_internal_generated.png',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112488,
        title: 'Semáforos inteligentes agilizam trânsito na Av. Archelau',
        summary: 'Motoristas que trafegam pela Av. Archelau já sentem a diferença com o novo sistema semafórico inteligente que reduz filas.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - Quem passa pela <strong>Avenida Archelau de Almeida Torres</strong> nos horários de pico já percebeu a diferença. Entrou em operação nesta semana o novo sistema de semáforos inteligentes, capaz de analisar o fluxo de veículos e ajustar o tempo de sinal verde automaticamente.</p>
        <p>O objetivo é reduzir as longas filas que se formavam no final da tarde, facilitando o retorno dos trabalhadores para casa. Segundo testes iniciais do Departamento de Trânsito, o tempo de deslocamento no trecho entre o Centro e o Costeira reduziu em cerca de 20%.</p>
        <h3>Modernização Viária</h3>
        <p>A tecnologia, que utiliza sensores e câmeras, deve ser expandida em breve para a <strong>Rodovia do Xisto</strong> e outras artérias importantes da cidade. "É mais qualidade de vida para quem antes perdia tempo parado no trânsito", destaca o diretor de Trânsito.</p>

    `,
        imageUrl: '/images/semaforo-archelau-v2-capa.png', // TRAVA: IMAGEM MANUAL DEFINIDA PELO USUARIO
        mobileImageUrl: '/images/semaforo-archelau-v2-capa.png',
        internalImageUrl: '/images/semaforos_archelau_internal_real.png',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769000146,
        title: 'Sanepar amplia rede de esgoto no bairro Iguaçu',
        summary: 'Obras de saneamento avançam para levar mais saúde e qualidade de vida aos moradores.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - As obras de expansão da rede de esgoto no bairro <strong>Iguaçu</strong> entraram em uma nova e decisiva fase nesta semana. O projeto, fruto de uma parceria entre a Sanepar e a Prefeitura de Araucária, prevê a instalação de mais de 5 quilômetros de novas tubulações, beneficiando diretamente cerca de 800 famílias que ainda dependiam de fossas sépticas.</p>
        
        <p>A intervenção concentra-se atualmente nas ruas próximas à <strong>Avenida Archelau de Almeida Torres</strong>, onde equipes técnicas trabalham na escavação e assentamento dos coletores. "O saneamento é a obra mais importante que uma cidade pode ter, pois é saúde na veia. Cada real investido aqui economiza quatro reais lá na frente em tratamento de doenças", destacou o gerente regional da Sanepar durante visita técnica ao canteiro de obras.</p>
        
        <h3>Valorização e Saúde Pública</h3>
        <p>Além do impacto óbvio na saúde pública, reduzindo a incidência de doenças de veiculação hídrica, a chegada da rede de esgoto traz uma valorização imediata aos imóveis da região. Especialistas do setor imobiliário estimam uma valorização de até 15% nas residências que passam a contar com o serviço.</p>
        
        <h3>Cronograma e Trânsito</h3>
        <p>A previsão de conclusão desta etapa é para o final do próximo mês. Até lá, motoristas devem ficar atentos a bloqueios parciais e desvios sinalizados nas ruas internas do bairro. A Prefeitura pede compreensão pelos transtornos temporários, reforçando que o benefício será permanente para toda a comunidade.</p>
    `,
        imageUrl: '/images/saneamento-iguacu-capa.png',
        mobileImageUrl: '/images/saneamento-iguacu-capa.png',
        internalImageUrl: '/images/sanepar_internal_generated.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: '2026-01-22',
        author: 'Redação Municipal'
    },
    {
        id: 1769000232,
        title: 'Programa Lixo Zero mobiliza escolas e comunidade',
        summary: 'Iniciativa educativa transforma resíduos em recursos e promove a reciclagem nos bairros.',
        content: `<p><strong>ARAUCÁRIA</strong> - Araucária dá mais um passo rumo à sustentabilidade com o lançamento do programa "Lixo Zero". A iniciativa visa reduzir em 30% o volume de resíduos enviados ao aterro sanitário através da educação ambiental e do incentivo à compostagem.</p>
        <h3>Educação em Foco</h3>
        
        <p> Escolas municipais do <strong>Centro</strong> e <strong>Costeira</strong> já aderiram, transformando restos de merenda em adubo para as hortas comunitárias. "A criança aprende na escola e ensina os pais em casa. É uma mudança cultural", destaca a Secretária de Meio Ambiente.</p>`,
        imageUrl: '/images/lixo-zero-manual.png',
        mobileImageUrl: '/images/lixo-zero-manual.png',
        internalImageUrl: '/images/lixo-zero-interna-manual.jpg',
        category: 'Cidade',
        categoryColor: 'green',
        publishDate: '2026-01-22',
        author: 'EcoAção'
    },
    {
        id: 1769000473,
        title: 'Festival da Cultura Tropeira agita o Parque Cachoeira',
        summary: 'Música raiz, culinária típica e apresentações de laço comprido marcam o fim de semana.',
        content: `<p><strong>ARAUCÁRIA</strong> - O resgate das tradições está garantido em Araucária. O Festival da Cultura Tropeira reuniu milhares de visitantes no <strong>Parque Cachoeira</strong> para celebrar a história dos condutores de tropas que ajudaram a construir o Paraná.</p>
        <h3>Saiba Mais</h3>
        
        <p>O cheiro de feijão tropeiro e arroz carreteiro tomou conta da praça de alimentação, enquanto violeiros animavam o público com moda de viola autêntica.</p>`,
        imageUrl: '/images/festival-tropeiro-capa-manual.jpg',
        mobileImageUrl: '/images/festival-tropeiro-capa-manual.jpg',
        internalImageUrl: '/images/festival_tropeiro_sabores_internal.jpg',
        category: 'Cultura',
        categoryColor: 'indigo',
        publishDate: '2026-01-22',
        author: 'Cultura Viva'
    },
    {
        id: 1769001213,
        title: 'Araucária destaca-se na geração de empregos na região',
        summary: 'Setor industrial e de serviços impulsionam novas contratações no município neste trimestre.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - O mercado de trabalho em Araucária segue aquecido. Dados recentes mostram um saldo positivo na criação de vagas formais, impulsionado principalmente pela retomada da produção industrial e pela abertura de novos comércios nos bairros.</p>
        <p>O <strong>Sine Municipal</strong> tem registrado uma procura constante por profissionais qualificados, especialmente nas áreas de logística e manutenção. "A diversidade da nossa economia ajuda a manter a estabilidade mesmo em momentos de oscilação nacional", avalia especialistas do setor.</p>
        <h3>Qualificação</h3>
        <p>Para quem busca uma oportunidade, a recomendação é investir em cursos técnicos. A demanda por mão de obra especializada continua alta nas grandes empresas do polo industrial (CIAR).</p>

    `,
        imageUrl: '/images/employment_drop_new_cover.png',
        mobileImageUrl: '/images/employment_drop_new_cover_mobile.webp',
        internalImageUrl: '/images/araucaria_employment_internal_final_v5.png',
        category: 'Economia',
        categoryColor: 'blue',
        publishDate: '2026-01-04', // DATA FUTURA PARA FORÇAR TOPO
        author: 'Redação Araucária'
    },
    {
        id: 1769001982,
        title: '<strong>Parque Cachoeira</strong> terá cinema ao ar livre neste sábado',
        summary: 'Projeto "Cine Família" traz clássicos da animação para telão gigante no parque.',
        content: `<p><strong>ARAUCÁRIA</strong> - Prepare a pipoca e a canga! Neste sábado, o <strong>Parque Cachoeira</strong> se transforma em um grande cinema a céu aberto. O projeto "Cine Família", totalmente gratuito, exibirá filmes infantis a partir das 19h em um telão de alta definição montado próximo ao lago.</p>
        <p>A iniciativa visa não apenas oferecer lazer, mas também democratizar o acesso à cultura. "Muitas crianças nunca tiveram a experiência de ver um filme em tela grande. Trazer isso para o parque, um ambiente democrático por natureza, é transformar o espaço público em sala de estar da cidade", destaca a organização.</p>
        <p>Eventos como este têm um efeito multiplicador na economia local e na vida comunitária.Pela proximidade, moradores dos bairros <strong>Iguaçu</strong>, <strong>Estação</strong> e <strong>Centro</strong> são os mais beneficiados, podendo acessar o parque a pé. Essa movimentação gera um "cinturão de segurança" natural nas ruas do entorno e aquece o comércio local, com aumento de até 40% no movimento de padarias e sorveterias da região.</p>
        <p>Além do aspecto econômico, o cinema ao ar livre fortalece o sentimento de pertença.Em tempos de entretenimento individual, reunir centenas de famílias no gramado cria memórias afetivas e reforça os laços sociais que tornam Araucária uma cidade mais acolhedora.</p>`,
        imageUrl: '/images/cinema_beauty_beast_v2.jpg',
        mobileImageUrl: '/images/cinema_beauty_beast_v2_mobile.webp',
        internalImageUrl: '/images/cinema_lion.png',
        category: 'Cultura',
        categoryColor: 'yellow',
        publishDate: '2026-01-04', // DATA FUTURA PARA FORÇAR TOPO
        author: 'Cultura Viva'
    },
    {
        id: 1769002173,
        title: 'Feira Gastronômica traz Food Trucks e música para o <strong>Centro</strong>',
        summary: 'Evento na Praça Central reúne o melhor da culinária de rua e opções de lazer para toda a família.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Praça Central de Araucária se transformou no ponto de encontro oficial das famílias neste fim de semana.A Feira Gastronômica Noturna bateu recorde de público, reunindo mais de 20 opções de Food Trucks que oferecem uma verdadeira volta ao mundo gastronômica — do clássico hambúrguer artesanal ao pierogi polonês, patrimônio da nossa cidade.</p>
        
        <p> Além dos sabores, o evento se destaca pela segurança e organização. "É um ambiente pensado para que pais possam trazer seus filhos com tranquilidade, curtir boa música ao vivo e valorizar os artistas da terra", afirma a organização.</p>
        <h3>Segurança Pública</h3>
        
        <p> A movimentação não se restringe apenas ao <strong> Centro </strong>. Bairros vizinhos como <strong>Fazenda Velha</strong>, <strong>Estação </strong> e <strong>Vila Nova</strong> sentem o reflexo positivo imediato.Moradores dessas regiões aproveitam a proximidade para frequentar a feira a pé, ocupando os espaços públicos e aquecendo o comércio local no trajeto, como padarias e pequenos mercados.</p>
        
        <p> Para quem vem de mais longe, como do <strong>Jardim Iguaçu </strong> ou <strong>Costeira</strong>, a feira se tornou o principal destino de lazer nas noites de sexta e sábado, integrando diferentes regiões da cidade em um único espaço de convivência.</p>`,
        imageUrl: '/images/food_trucks_cover_v29.png',
        mobileImageUrl: '/images/food_trucks_cover_v29_mobile.webp',
        internalImageUrl: '/images/food_trucks_araucaria.jpg',
        category: 'Lazer',
        categoryColor: 'yellow',
        publishDate: '2026-01-04', // Mantendo hoje para destaque
        author: 'Guia Curitiba'
    },
    {
        id: 1769002660,
        title: 'Hospital Municipal moderniza parque tecnológico',
        summary: 'Novos equipamentos de diagnóstico por imagem chegam para agilizar atendimentos.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - O Hospital Municipal de Araucária (HMA) recebeu novos equipamentos para o setor de diagnóstico por imagem. A atualização tecnológica visa melhorar a precisão dos exames e reduzir o tempo de espera dos pacientes.</p>
        <p>Com a modernização, exames de Raio-X e tomografias ganham em qualidade e rapidez. "É um investimento direto na capacidade de resposta do nosso sistema de saúde", afirma a direção do hospital.</p>
        <h3>Atendimento Regional</h3>
        <p>O HMA é referência para diversas especialidades e atende moradores de todos os bairros, do <strong>Centro</strong> à área rural como <strong>Guajuvira</strong>, garantindo acesso universal a serviços de média complexidade.</p>

    `,
        imageUrl: '/images/hospital_equipment_araucaria_final_v5.png',
        mobileImageUrl: '/images/hospital_equipment_araucaria_final_v5_mobile.webp',
        internalImageUrl: '/images/hospital_equipment_delivery_real.jpg',
        category: 'Saúde',
        categoryColor: 'green',
        publishDate: '2025-12-29',
        author: 'Saúde Agora'
    },
    {
        id: 1769003490,
        title: 'Escolas da rede municipal ganham hortas comunitárias',
        summary: 'Projeto "Sementes do Futuro" transforma pátios escolares em salas de aula vivas, envolvendo mais de 3.000 alunos e famílias de diversos bairros.',
        content: `<p><strong>ARAUCÁRIA</strong> - Da terra para o prato da merenda.Esse é o lema do projeto "Sementes do Futuro", que acaba de completar seis meses de atividades e já transformou a rotina de dez escolas municipais de Araucária.A iniciativa, que converte pátios ociosos em salas de aula a céu aberto, está ensinando na prática sobre ciclos naturais, biologia e responsabilidade ambiental para mais de 3.000 alunos da rede pública.</p>
        <p> O projeto começou como um piloto no <strong> Jardim Tupy </strong>, mas o sucesso foi tão imediato que a Secretaria de Educação expandiu rapidamente para unidades no <strong>Jardim Iguaçu</strong> e na <strong> Costeira </strong>. "O que antes era apenas um gramado sem uso ou um canto de terra batida, hoje produz alface, tomate, cenoura, beterraba e diversos temperos que vão direto para a cozinha da escola", explica a diretora Maria Helena, de uma das unidades beneficiadas.</p>
        <h3>Educação Nutricional na Prática </h3>
        <p> A principal mudança percebida, no entanto, não está apenas na horta, mas no refeitório.Nutricionistas da rede municipal relatam uma diminuição drástica no desperdício de alimentos(sobras nos pratos). "As crianças criam um vínculo com o alimento. Elas plantaram a semente, regaram, cuidaram e viram crescer. Quando aquele alimento chega no prato, elas comem com orgulho e curiosidade, vencendo a resistência a vegetais", afirma Ana Paula, nutricionista responsável pelo acompanhamento do projeto.</p>
        <p> Além dos vegetais tradicionais, o projeto introduziu timidamente o cultivo de PANCs(Plantas Alimentícias Não Convencionais), resgatando saberes antigos e diversificando ainda mais a dieta escolar com nutrientes poderosos e muitas vezes esquecidos.</p>
        <h3> Engajamento que Ultrapassa os Muros </h3>
        <p> O impacto social do "Sementes do Futuro" já ultrapassou os muros da escola.Aos sábados, mutirões de manutenção reúnem pais, avós e moradores vizinhos, transformando a escola em um verdadeiro polo comunitário de convivência.</p>
        <p> Em bairros como o <strong> Capela Velha </strong>, o efeito multiplicador é visível: famílias começaram a replicar o modelo em casa, criando pequenas hortas em quintais e até em varandas de apartamentos, utilizando o apoio técnico e as mudas excedentes fornecidas pelos agrônomos da prefeitura.</p>
        <p>"Meu filho de 8 anos me ensinou a fazer compostagem. Hoje reduzimos nosso lixo orgânico pela metade e temos tempero fresco todo dia sem agrotóxico", conta Ricardo Mendes, morador do <strong>Jardim Plínio </strong> e pai de aluno. O projeto prova que a educação ambiental, quando vivenciada na prática, planta raízes profundas que sustentam a saúde de toda a comunidade.</p>

    `,
        imageUrl: '/images/hortas_escolas_cover_v27.jpg',
        mobileImageUrl: '/images/hortas_escolas_cover_v27_mobile.webp',
        internalImageUrl: '/images/hortas_escolas_new_internal.jpg',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '2025-12-29',
        author: 'Educação Futuro'
    },
    {
        id: 1769003522,
        title: 'Araucária avança na digitalização de serviços públicos',
        summary: 'Aplicativo da Prefeitura facilita a vida do cidadão e reduz filas em repartições.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - Solicitar alvarás, consultar débitos ou agendar atendimentos ficou mais fácil. O investimento em tecnologia tem permitido que cada vez mais serviços da Prefeitura sejam acessados diretamente pelo celular, através do aplicativo "Araucária Digital".</p>
        <p>A modernização visa desburocratizar a máquina pública e oferecer mais comodidade. "O objetivo é que o cidadão só precise ir presencialmente à Prefeitura quando for estritamente necessário", explica a equipe de TI do município.</p>
        <h3>Conectividade</h3>
        <p>Além dos serviços online, o programa de inclusão digital segue expandindo o acesso à internet gratuita em praças e parques, como no <strong>Parque Cachoeira</strong>, permitindo que a população usufrua dos espaços públicos com conectividade.</p>

    `,
        imageUrl: '/images/araucaria_smart_city_final_v8.png',
        mobileImageUrl: '/images/araucaria_smart_city_final_v8_mobile.webp',
        internalImageUrl: '/images/araucaria_smart_city_collage_manual.png',
        category: 'Tecnologia',
        categoryColor: 'indigo',
        publishDate: '2025-12-29',
        author: 'Tech News'
    },
    {
        id: 1769004272,
        title: 'Ginásio Joval de Paula Souza será palco de final estadual',
        summary: 'Araucária recebe as melhores equipes de vôlei do Paraná para disputa do título.',
        content: `<p><strong>ARAUCÁRIA</strong> - O esporte respira em Araucária.A Federação Paranaense confirmou que nossa cidade será a sede das finais do Campeonato Paranaense de Vôlei, consolidando o município como referência na organização de grandes eventos esportivos.</p>
        
        <p> As partidas, que reunirão as quatro melhores equipes do estado, prometem lotar o Ginásio Joval de Paula Souza.A expectativa da organização é receber mais de 2.000 torcedores por dia. "A estrutura do ginásio foi totalmente revitalizada para oferecer conforto e segurança às famílias", destaca o diretor de esportes.</p>
        
        <p> Além do espetáculo em quadra, o evento tem um forte cunho social.Os ingressos serão solidários, trocados por 1kg de alimento não perecível, que será destinado ao Programa de Segurança Alimentar do município.</p>
        <h3>Segurança Pública</h3>
        
        <h2> Movimento nos Bairros Vizinhos </h2>
        <p> A realização de um evento deste porte traz reflexos imediatos para além das quadras.Bairros no entorno do ginásio, como o <strong> Centro </strong> e o <strong>Fazenda Velha</strong>, preparam - se para um final de semana atípico e lucrativo.</p>
        
        <p> Donos de lanchonetes, postos de gasolina e pequenos comércios locais já reforçaram seus estoques prevendo o aumento do fluxo de visitantes.A circulação de torcedores de outras cidades também movimenta a rede hoteleira e gastronômica, injetando capital novo na economia local e valorizando o potencial turístico - esportivo de Araucária.</p>`,
        imageUrl: '/images/gym_volleyball_final_cover_v5.png',
        mobileImageUrl: '/images/gym_volleyball_final_cover_v5_mobile.webp',
        internalImageUrl: '/images/gym_volleyball_internal_final_v5_mobile.webp',
        category: 'Esporte',
        categoryColor: 'orange',
        publishDate: '2025-12-29',
        author: 'Esporte News'
    },
    {
        id: 1769005049, // ID Único Real
        title: 'Araucária zera fila de espera por vagas em CMEIs para 2025',
        summary: 'Prefeitura anuncia que todas as 1.500 crianças de 0 a 3 anos inscritas tiveram vagas ofertadas.',
        content: `<p><strong>ARAUCÁRIA</strong> - Um marco histórico para a educação de Araucária.A Secretaria Municipal de Educação confirmou nesta semana que a fila de espera por vagas em Centros Municipais de Educação Infantil(CMEIs) foi totalmente zerada.</p>
        
        <p> O avanço beneficia cerca de 1.500 famílias que aguardavam vaga para o ano letivo de 2025. "Trabalhamos duro na ampliação das unidades e em parcerias para garantir esse direito fundamental", afirmou a secretária.</p>
        <h3>Oportunidade</h3>
        
        <h2> Alívio no Califórnia e Tupy </h2>
        <p> A medida traz impacto imediato para pais que residem em áreas de alta demanda, como <strong> Califórnia </strong> e <strong>Tupy</strong>.Com a vaga garantida próxima a casa, as famílias economizam tempo de deslocamento.O comércio local, como papelarias e lojas de uniformes nessas regiões, já projeta um aumento nas vendas para o início do ano letivo.</p>`,
        imageUrl: '/images/cmei_zerando_fila_cover_v4.png', // Imagem real enviada pelo usuário (v4)
        mobileImageUrl: '/images/cmei_zerando_fila_cover_v4.png',
        internalImageUrl: '/images/cmei_araucaria_real.png',
        category: 'Educação',
        categoryColor: 'red',
        publishDate: '2025-12-20',
        author: 'Redação Municipal'
    },
    {
        id: 1769005176,
        title: 'Lei Orçamentária prioriza investimentos em Saúde e Obras',
        summary: 'Câmara Municipal discute as diretrizes para o orçamento do próximo ano com foco no bem-estar social.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - A Câmara Municipal iniciou as discussões sobre a Lei Orçamentária Anual (LOA). A proposta enviada pelo Executivo prevê a manutenção dos investimentos prioritários em Saúde e Educação, além de garantir recursos para obras de infraestrutura em andamento.</p>
        <p>O planejamento financeiro busca equilibrar as contas públicas sem comprometer a qualidade dos serviços prestados à população. "A responsabilidade fiscal é a base para que possamos continuar investindo na cidade", destaca a relatoria da comissão de finanças.</p>
        <h3>Participação Popular</h3>
        <p>Audiências públicas serão realizadas nas próximas semanas para que a comunidade possa apresentar sugestões e acompanhar onde os recursos municipais serão aplicados.</p>

    `,
        imageUrl: '/images/news_budget.png', // Nova imagem gerada (Nano Banana Pro)
        mobileImageUrl: '/images/news_budget_mobile.webp',
        internalImageUrl: '/images/camara_araucaria_internal_final.png',
        category: 'Economia',
        categoryColor: 'blue',
        publishDate: '2025-12-18',
        author: 'Câmara Municipal'
    },
    {
        id: 1769006114,
        title: 'Saúde e Educação recebem reforço no planejamento municipal',
        summary: 'Novos recursos serão destinados à manutenção de escolas e unidades básicas de saúde.',
        content: `
        <p><strong>ARAUCÁRIA</strong> - A Prefeitura anunciou um reforço no cronograma de manutenção das escolas municipais e Unidades Básicas de Saúde (UBS). O objetivo é realizar melhorias estruturais, como pintura, reparos elétricos e adequação de acessibilidade.</p>
        <p>No bairro <strong>Capela Velha</strong>, a ampliação da capacidade de atendimento das unidades escolares é uma das prioridades para acompanhar o crescimento populacional da região.</p>
        <h3>Gestão Eficiente</h3>
        <p>Os investimentos são fruto de uma gestão orçamentária focada em resultados. A expectativa é que as melhorias proporcionem um ambiente mais acolhedor e seguro para estudantes, pacientes e servidores públicos.</p>

    `,
        imageUrl: '/images/news_investments.png', // Nova imagem gerada (Nano Banana Pro)
        mobileImageUrl: '/images/news_investments_mobile.webp',
        internalImageUrl: '/images/news_budget.png',
        category: 'Política',
        categoryColor: 'purple',
        publishDate: '2025-12-12',
        author: 'Brasília News'
    },
    {
        id: 1769006673,
        title: 'Polícia Civil incinera 114 kg de drogas apreendidas na região',
        summary: 'Ação realizada nesta semana marca o combate efetivo ao tráfico em Araucária.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Polícia Civil do Paraná(PCPR) realizou a incineração de mais de 114 quilos de entorpecentes apreendidos em operações recentes em Araucária.</p>
        
        <p> O delegado responsável destacou a importância das denúncias anônimas da população para o sucesso das apreensões.Todo o material foi destruído em fornos industriais com autorização judicial.</p>
        <h3>Segurança Pública</h3>
        
        <h2> Segurança no Campina da Barra </h2>
        <p> A operação teve foco especial em pontos críticos denunciados pela comunidade do <strong>Campina da Barra </strong>. A retirada de circulação dessa grande quantidade de entorpecentes impacta diretamente na redução de pequenos furtos na região, devolvendo a sensação de segurança para comerciantes e moradores que transitam pelo bairro à noite.</p>`,
        imageUrl: '/images/pcpr_incineration_cover_final_v2.png',
        mobileImageUrl: '/images/pcpr_incineration_cover_final_v2.png',
        internalImageUrl: '/images/pcpr_incineration_internal_real.png',
        category: 'Segurança',
        categoryColor: 'red',
        publishDate: '2025-12-10',
        author: 'PCPR'
    },
    {
        id: 1769006754,
        title: 'Vacinação contra Vírus Sincicial Respiratório (VSR) para gestantes',
        summary: 'Saúde inicia imunização para proteger recém-nascidos de infecções graves.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Secretaria Municipal de Saúde iniciou a campanha de vacinação contra o VSR voltada para gestantes.A medida visa transmitir anticorpos para o bebê ainda na gestação, garantindo proteção contra bronquiolites e pneumonias nos primeiros meses de vida.</p>
        
        <p> As doses estão disponíveis em todas as Unidades Básicas de Saúde(UBS) do município para o público - alvo.</p>
        <h3>Prevenção e Cuidado</h3>
        
        <h2> Adesão no CSU e Boqueirão </h2>
        <p> As UBSs do <strong>CSU </strong> e <strong>Boqueirão</strong> registraram a maior procura no primeiro dia de campanha.Gestantes dessas comunidades destacam a facilidade de ter o imunizante perto de casa. "É uma tranquilidade saber que meu bebê já vai nascer protegido", relatou uma futura mãe moradora do <strong>Boqueirão </strong>.</p>`,
        imageUrl: '/images/vaccination_vsr_cover_v3.png',
        category: 'Saúde',
        categoryColor: 'blue',
        internalImageUrl: '/images/vaccination_vsr_gestante_gen.png',
        publishDate: '2025-12-08',
        author: 'Saúde Agora'
    },
    {
        id: 1769007605,
        title: 'Cantata de Natal emociona fiéis no Santuário',
        summary: 'Apresentação "Um Conto de Natal" reuniu centenas de pessoas no fim de semana.',
        content: `<p><strong>ARAUCÁRIA</strong> - O clima natalino tomou conta de Araucária com a belíssima apresentação da Cantata 'Um Conto de Natal' na Paróquia Nossa Senhora do Perpétuo Socorro.O evento contou com coral infantil e orquestra, emocionando o público presente.</p>
        
        <p> Novas apresentações estão programadas para o próximo fim de semana na Praça da Matriz.</p>
        <h3>Programação</h3>
        
        <h2> Turismo Regional </h2>
        <p> O evento atraiu não apenas moradores do <strong>Centro </strong>, mas caravanas de bairros como <strong>Iguaçu</strong> e <strong> Estação </strong>. O brilho das luzes e a música clássica movimentaram as cafeterias e sorveterias do entorno da Praça, que operaram com lotação máxima, celebrando o espírito natalino e o aquecimento da economia local.</p>`,
        imageUrl: '/images/cantata_natal_real.png', // Nova imagem gerada
        mobileImageUrl: '/images/cantata_natal_real_mobile.webp',
        internalImageUrl: '/images/cantata_natal_angle_v2_gen.png',
        category: 'Cultura',
        categoryColor: 'indigo',
        publishDate: '2025-12-05',
        author: 'Cultura Viva'
    },
    {
        id: 1769007953,
        title: 'Ciclone extratropical: Equipes trabalham para restabelecer energia',
        summary: 'Após tempestade, Copel atua para religar 21 unidades consumidoras ainda sem luz.',
        content: `<p><strong>ARAUCÁRIA</strong> - O ciclone extratropical que atingiu a região sul nos últimos dias deixou estragos pontuais em Araucária.Segundo boletim da Copel, cerca de 21 unidades consumidoras permaneciam sem energia nesta manhã.</p>
        
        <p> Equipes de emergência estão nas ruas para remover galhos de árvores sobre a fiação e normalizar o serviço o mais rápido possível.</p>
        <h3>Saiba Mais</h3>
        
        <h2> Jardim Turim Afetado </h2>
        <p> Os ventos fortes causaram quedas de árvores principalmente na região do <strong>Jardim Turim </strong> e <strong>Shangri-lá</strong>.Equipes da Prefeitura concentraram esforços nessas localidades durante a madrugada para desobstruir vias e garantir o retorno da energia, minimizando os transtornos para os moradores.</p>`,
        imageUrl: '/images/news_cyclone_energy.png', // Eletricistas no Caminhão (Nano Banana Pro)
        mobileImageUrl: '/images/news_cyclone_energy_mobile.webp',
        internalImageUrl: '/images/cyclone_repair_internal.webp',
        category: 'Cidade',
        categoryColor: 'gray',
        publishDate: '2025-12-01',
        author: 'Tempo Agora'
    },
    {
        id: 1769008352, // Novo ID para o Ginásio
        title: 'Ginásio Joval de Paula Souza será reformado',
        summary: 'Prefeitura anuncia revitalização completa do complexo esportivo no <strong>Parque Cachoeira</strong>.',
        content: `<p><strong>ARAUCÁRIA</strong> - Um dos principais palcos do esporte araucariense, o Ginásio Joval de Paula Souza, passará por uma ampla reforma.O anúncio foi feito pela Secretaria de Esporte e Lazer, que prevê melhorias no piso da quadra, vestiários e cobertura.</p>
        
        <p> As obras devem começar no próximo mês e visam oferecer mais conforto e segurança para atletas e torcedores.</p>
        <h3>Investimento e Melhorias</h3>
        
        <h2> Alternativa para Atletas </h2>
        <p> Durante as obras, as escolinhas de vôlei e futsal que atendem crianças do <strong>Parque Cachoeira </strong> e <strong>Centro</strong> serão transferidas temporariamente para ginásios no <strong> Fazenda Velha </strong>. A medida garante que nenhum atleta tenha seu treinamento interrompido, mantendo o calendário esportivo da cidade ativo e descentralizado.</p>`,
        imageUrl: '/images/custom_gym_official.png', // Foto oficial (Enviada pelo User)
        mobileImageUrl: '/images/custom_gym_official_mobile.webp',
        internalImageUrl: '/images/gym_renovation_unique.png',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '2025-11-28',
        author: 'Esporte News'
    },
    {
        id: 1769008601,
        title: 'Câmara aprova incentivo ao turismo rural',
        summary: 'Caminho do <strong>Guajuvira</strong> e roteiros poloneses receberão verba para sinalização e melhorias.',
        content: `<p><strong>ARAUCÁRIA</strong> - Em sessão realizada ontem, a Câmara Municipal de Araucária aprovou por unanimidade o projeto de lei que cria incentivos fiscais e destina verbas para o desenvolvimento do turismo rural na região.</p>
        
        <p> O foco principal são os roteiros do Caminho do <strong>Guajuvira </strong> e as rotas da colônia polonesa, que possuem grande potencial gastronômico e cultural. Com o novo investimento, será feita a melhoria da sinalização turística, a pavimentação de trechos críticos de estradas rurais e o apoio à divulgação dos produtores locais.</p>
        <h3>Sustentabilidade</h3>
        
        <p>Pequenos agricultores que abrirem suas propriedades para visitação ou venda de produtos coloniais(como queijos, vinhos e doces) terão descontos em taxas municipais.</p>
        
        <p> "Araucária tem belezas rurais que muita gente desconhece. Queremos que o curitibano e o próprio araucariense passem o fim de semana aqui, consumindo nossos produtos e valorizando nossa história", defendeu a vereadora autora do projeto.</p>`,
        imageUrl: '/images/rural_tourism_araucaria_path.png',
        mobileImageUrl: '/images/rural_tourism_araucaria_path_mobile.webp',
        internalImageUrl: '/images/turismo_rural_araucaria_gen.png',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: '2025-11-15',
        author: 'Jornal do Campo'
    },
    {
        id: 1769008740,
        title: 'Campanha de Vacinação atinge meta no município',
        summary: 'Secretaria de Saúde comemora alta adesão da população na campanha contra a gripe.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Secretaria Municipal de Saúde de Araucária divulgou hoje que a campanha de vacinação contra a gripe atingiu 95 % da meta estipulada para o público - alvo.O resultado coloca o município entre os mais eficientes do estado na imunização.</p>
        
        <p> As unidades básicas de saúde funcionaram em horário estendido durante a última semana para garantir que trabalhadores pudessem se vacinar. "A conscientização da população foi fundamental. Vacinas salvam vidas", reforçou a diretora de epidemiologia.</p>
        <h3>Prevenção e Cuidado</h3>
        
        <p> Ainda há doses disponíveis para a população geral em todas as UBS do município.É necessário apresentar documento com foto e carteirinha de vacinação.</p>`,
        imageUrl: '/images/vacinacao_meta_2024.webp',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/vacinacao_gripe_humanos_real.png',
        publishDate: '2025-11-10',
        author: 'Saúde em Foco'
    },
    {
        id: 1769009366,
        title: 'Festival de Teatro Infantil lota auditórios',
        summary: 'Semana da criança foi marcada por apresentações culturais gratuitas em diversas escolas.',
        content: `<p><strong>ARAUCÁRIA</strong> - A magia do teatro invadiu as escolas municipais de Araucária.O Festival de Teatro Infantil, promovido pela Secretaria de Cultura, realizou mais de 20 apresentações gratuitas ao longo da última semana, atingindo cerca de 5 mil crianças.</p>
        
        <p> Peças clássicas e produções locais fizeram parte do repertório.O objetivo do projeto é formar plateia e incentivar o gosto pela arte desde cedo. "Ver o brilho nos olhos das crianças não tem preço", disse um dos atores da companhia local.</p>
        <h3>Educação em Foco</h3>
        
        <p> O encerramento do festival acontecerá no próximo domingo, com uma apresentação aberta ao público no <strong> Parque Cachoeira </strong>.</p>`,
        imageUrl: '/images/teatro_infantil_cover_real.png',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/teatro_infantil_internal_real.png',
        publishDate: '2025-11-05',
        author: 'Cultura Viva'
    },
    {
        id: 1769010006,
        title: 'Novas ciclovias conectam bairros industriais',
        summary: 'Projeto de mobilidade urbana facilita o deslocamento de trabalhadores para a área industrial.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Prefeitura iniciou as obras de expansão da malha cicloviária na região industrial.O projeto de 5km conecta estrategicamente os bairros <strong> Thomaz Coelho </strong> e <strong>Cidade <strong>Industrial</strong> de Araucária(CIAR) </strong>, uma das zonas com maior fluxo diário de trabalhadores.</p>
        
        <p>O ciclista que sai da <strong> Chapada </strong> ou do <strong>Barigui</strong> não precisará mais disputar espaço com caminhões pesados na Rodovia do Xisto. "É segurança para o trabalhador e agilidade para a indústria", resume o secretário de obras.</p>
        <h3>Investimento e Melhorias</h3>
        
        <h2> Mobilidade e Saúde </h2>
        <p> Além do reduzir o trânsito nos horários de pico, a ciclovia incentiva a prática de exercícios.Moradores do <strong>Jardim Tupy </strong> já utilizam o trecho pronto para caminhadas e corridas noturnas, beneficiados pela nova iluminação de LED instalada em todo o percurso.</p>`,
        imageUrl: '/images/ciclovia_industrial_cover_v2.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: '/images/ciclovia_industrial_angle_gen.png',
        publishDate: '2025-10-30',
        author: 'Mobilidade Urbana'
    },
    {
        id: 1769010550,
        title: 'Operação Tapa-Buracos avança no <strong>Jardim Iguaçu</strong>',
        summary: 'Equipes da Secretaria de Obras trabalham em ritmo acelerado para recuperar vias danificadas pelas chuvas.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Secretaria de Obras Públicas intensificou nesta semana a Operação Tapa - Buracos no bairro <strong> Jardim Iguaçu </strong>, atendendo a uma demanda antiga dos moradores. A ação concentra-se inicialmente na <strong>Avenida Archelau de Almeida Torres</strong> e ruas transversais, principais corredores de ônibus da região.</p>
        
        <p> As equipes também atuam na recuperação de vias no <strong> Jardim Plínio </strong> e <strong>Jardim Shangri-lá</strong>, onde o asfalto sofreu maior desgaste pelas chuvas recentes.O objetivo é garantir a segurança viária e evitar prejuízos aos motoristas.</p>
        <h3>Oportunidade</h3>
        
        <h2> Valorização Imobiliária </h2>
        <p> Além do conforto ao dirigir, a manutenção viária impacta diretamente na valorização dos imóveis. "Rua arrumada traz outra cara pro bairro", comenta um comerciante local.A previsão é estender os trabalhos para o <strong> Jardim Planalto </strong> na próxima semana.</p>`,
        imageUrl: '/images/tapa_buracos_iguacu_cover_v2.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: '/images/tapa_buracos_internal_real.png',
        publishDate: '2025-10-25',
        author: 'Redação Municipal'
    },
    {
        id: 1769010785,
        title: 'Guarda Municipal recebe novas viaturas',
        summary: 'Investimento na segurança pública inclui renovação da frota e novos equipamentos de proteção.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Guarda Municipal de Araucária recebeu hoje 5 novas viaturas Jeep Commander, totalmente equipadas e blindadas para o patrulhamento ostensivo.Os veículos serão destinados à Ronda Ostensiva Municipal(ROMU), reforçando o combate à criminalidade.</p>
        
        <p> As novas unidades já estão em operação, com foco no patrulhamento escolar nos bairros <strong> Fazenda Velha </strong> e <strong>Capela Velha</strong>, além de reforçar a segurança no comércio da região central durante o horário bancário.</p>
        <h3>Oportunidade</h3>
        
        <h2> Resposta Rápida no Costeira </h2>
        <p> Uma base móvel será instalada rotativamente na região do <strong>Costeira </strong> e <strong>Jardim Tropical</strong>, reduzindo o tempo de resposta a ocorrências nestas localidades. "A presença física da viatura inibe delitos e traz tranquilidade para quem chega do trabalho à noite", afirmou o comandante.</p>`,
        imageUrl: '/images/gm_viaturas_cover_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/gma_viaturas_manual.png',
        publishDate: '2025-10-20',
        author: 'Segurança em Pauta'
    },
    {
        id: 1769011351,
        title: 'Hospital Municipal inaugura nova ala pediátrica',
        summary: 'Ampliação promete dobrar a capacidade de atendimento infantil e conta com equipamentos de última geração.',
        content: `<p><strong>ARAUCÁRIA</strong> - O Hospital Municipal de Araucária(HMA) inaugurou nesta manhã sua nova ala pediátrica, um marco para a saúde pública da cidade.O espaço, decorado de forma lúdica, conta com 30 novos leitos e equipamentos de UTI neopediátrica de última geração.</p>
        
        <p> A ampliação desafoga o sistema de saúde, evitando que famílias do <strong>Jardim Califórnia </strong> ou <strong>Tindiquera</strong> precisem se deslocar até hospitais da capital em casos de emergência.O atendimento é 100 % SUS e funciona 24 horas.</p>
        <h3>Prevenção e Cuidado</h3>
        
        <h2> Humanização no Atendimento </h2>
        <p> Mais do que estrutura, o foco é o acolhimento. "Uma criança doente fragiliza a família inteira. Aqui, oferecemos não só medicina, mas conforto", diz a diretora clínica.A nova ala já recebe pacientes de bairros distantes como <strong> Guajuvira </strong>, garantindo equidade no acesso à saúde de qualidade.</p>`,
        imageUrl: '/images/hma_pediatria_cover_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/hma_pediatria_angle_gen.png',
        publishDate: '2025-10-15',
        author: 'Saúde Agora'
    },
    {
        id: 1769011624,
        title: 'Feira de Robótica reúne estudantes da rede pública',
        summary: 'Alunos apresentaram projetos inovadores focados em sustentabilidade e automação.',
        content: `<p><strong>ARAUCÁRIA</strong> - O <strong> Parque Cachoeira </strong> foi palco da 5ª Feira de Robótica e Inovação das escolas municipais. Mais de 50 projetos foram expostos, variando desde braços mecânicos feitos com material reciclável até sistemas de irrigação automatizada para hortas escolares.</p>
        <h3>Educação em Foco</h3>
        
        <p>O evento visa estimular o interesse pela ciência e tecnologia desde cedo.Os três melhores projetos receberam kits de programação e uma visita técnica a uma grande indústria de tecnologia da região.</p>`,
        imageUrl: '/images/school_robotics_fair_project.png',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/custom_robotics_official.jpg',
        publishDate: '2025-10-10',
        author: 'EducaTech'
    },
    {
        id: 1769011870,
        title: 'Novo supermercado gera 200 empregos diretos',
        summary: 'Grande rede varejista abre as portas no bairro <strong>Costeira</strong>, movimentando a economia local.',
        content: `<p><strong>ARAUCÁRIA</strong> - O desenvolvimento econômico do bairro <strong>Costeira</strong> ganhou um novo impulso nesta semana com a inauguração de uma grande unidade varejista. O empreendimento, que ocupa uma área de 2.000m², não apenas amplia as opções de compra para a comunidade, mas se consolida como um motor vital de geração de renda na região.</p>
        <h3>Impacto Local e Empregos</h3>
        
        <p>Ao todo, foram criadas <strong>200 vagas de emprego direto</strong>, preenchidas majoritariamente por moradores de Araucária. A seleção, realizada em parceria estratégica com a Agência do Trabalhador (SINE), focou em funções como operadores de caixa, repositores, açougueiros e equipe administrativa. "Priorizar quem mora perto reduz o trânsito e melhora a qualidade de vida do trabalhador", destaca o gerente regional.</p>

        <h2>Primeiro Emprego</h2>
        <p>A iniciativa também abriu portas para jovens em busca da primeira oportunidade no mercado de trabalho. Cerca de 30% das contratações foram destinadas a esse público, com programas de treinamento interno. Para comerciantes vizinhos, a chegada do mercado deve aumentar o fluxo de pessoas na Avenida, beneficiando todo o comércio local.</p>`,
        imageUrl: '/images/new_supermarket_interior.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/news_supermarket_jobs.png',
        publishDate: '2025-10-05',
        author: 'Economia Local'
    },
    {
        id: 1769012743,
        title: 'Limpeza do Rio Iguaçu retira 5 toneladas de lixo',
        summary: 'Ação voluntária mobilizou comunidade e ONGs ambientais no último fim de semana.',
        content: `<p><strong>ARAUCÁRIA</strong> - Um verdadeiro exército de voluntários retirou mais de 5 toneladas de lixo das margens do Rio Iguaçu neste fim de semana.A ação concentrou - se no trecho próximo à <strong> Ponte do Rio Passaúna </strong> e no <strong>Parque Barigui</strong> de Araucária.</p>
        
        <p> Moradores do <strong>Jardim Dalla Torre </strong> e <strong>Estação</strong> participaram ativamente, recolhendo desde garrafas PET até sofás descartados irregularmente.O material reciclável foi destinado à cooperativa de catadores do bairro <strong> Sabiá </strong>, gerando renda para dezenas de famílias.</p>
        <h3>Sustentabilidade</h3>
        
        <h2>Consciência Ambiental </h2>
        <p> "O rio é nosso. Se a gente não cuidar, quem vai?", questionou uma moradora do <strong>Thomaz Coelho </strong>. A Secretaria de Meio Ambiente anunciou a instalação de ecobarreiras em afluentes no <strong>Capela Velha</strong> para impedir que novos resíduos cheguem ao leito principal do rio.</p>`,
        imageUrl: '/images/limpeza_rio_iguacu_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/limpeza_rio_iguacu_gen.png',
        publishDate: '2025-10-01',
        author: 'EcoAção'
    },
    {
        id: 1769013037,
        title: 'Torneio de Xadrez movimenta o fim de semana',
        summary: 'Competição reuniu enxadristas de todas as idades no <strong>Centro</strong> de Convivência.',
        content: `<p><strong>ARAUCÁRIA</strong> - O raciocínio lógico e a estratégia foram os protagonistas no Torneio Municipal de Xadrez, realizado neste sábado.O evento reuniu mais de 80 participantes, divididos em categorias do sub - 10 ao veterano.</p>
        <h3>Educação em Foco</h3>
        
        <p> O destaque ficou para a jovem promessa local, Ana Clara, de 12 anos, que venceu a categoria sub - 14 invicta. "O xadrez ajuda muito na escola e na concentração", disse a campeã.</p>`,
        imageUrl: '/images/news_chess_tournament.png',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/chess_players_unique.png',
        publishDate: '2025-09-25',
        author: 'Esporte Araucária'
    },
    {
        id: 1769013799,
        title: 'Curso gratuito de qualificação profissional abre inscrições',
        summary: 'Senai e Prefeitura oferecem vagas para cursos na área industrial e administrativa.',
        content: `<p><strong>ARAUCÁRIA</strong> - A Prefeitura de Araucária, em parceria estratégica com o Senai, abriu <strong>300 vagas gratuitas</strong> para cursos de qualificação profissional voltados ao mercado industrial e administrativo. A iniciativa visa preparar a mão de obra local para atender a crescente demanda das empresas do Polo Industrial (CIAR), que frequentemente relatam dificuldade em encontrar profissionais capacitados.</p>
        <h3>Cursos Oferecidos</h3>
        
        <p>As vagas estão distribuídas em três áreas: <strong>Mecânica Básica</strong> (120 vagas, 160h), <strong>Eletricidade Predial</strong> (100 vagas, 180h) e <strong>Assistente Administrativo</strong> (80 vagas, 120h). Todos os cursos são certificados pelo Senai e incluem aulas práticas em laboratórios equipados. "É a chance de entrar no mercado com um diploma reconhecido nacionalmente", destaca o coordenador do programa.</p>

        <h2>Como Se Inscrever</h2>
        <p>Os interessados devem comparecer à <strong>Agência do Trabalhador</strong> (Rua Pedro Druszcz, Centro) com RG, CPF e comprovante de residência atualizado. As aulas iniciam em <strong>março</strong> e acontecem no contraturno escolar, facilitando a participação de jovens e adultos. Prioridade para moradores de Araucária desempregados ou em busca do primeiro emprego.</p>`,
        imageUrl: '/images/vocational_course_real_v2.webp',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/news_vocational_course_v2.png',
        publishDate: '2025-09-20',
        author: 'Carreira e Futuro'
    },
    {
        id: 1769014746,
        title: 'Rota de Turismo Rural ganha nova sinalização',
        summary: 'Prefeitura instala placas indicativas no Caminho do Vinho e <strong>Guajuvira</strong> para orientar visitantes.',
        content: `<p><strong>ARAUCÁRIA</strong> - O Departamento de Turismo iniciou a instalação de novas placas de sinalização turística nas principais rotas rurais do município.A ação visa facilitar o acesso de visitantes aos restaurantes coloniais, vinícolas e chácaras de lazer.</p>
        
        <p> "Com a sinalização adequada, esperamos um aumento de 30% no fluxo de turistas nos finais de semana", projetou o diretor de turismo.O projeto também inclui mapas digitais acessíveis via QR Code em pontos estratégicos.</p>
        <h3>Saiba Mais</h3>
        
        <p> A rota do <strong>Guajuvira </strong> é famosa por suas paisagens bucólicas e pela venda direta de produtos da agricultura familiar, como queijos, salames e doces caseiros.</p>`,
        imageUrl: '/images/rural_tourism_signage_araucaria.png',
        mobileImageUrl: '/images/rural_tourism_signage_araucaria_mobile.webp',
        internalImageUrl: '/images/rural_tourism_araucaria_path.png',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: '2025-09-15',
        author: 'Turismo Araucária'
    },
];
export const events: Event[] = [
    {
        id: 1769019227,
        title: 'Sessão Ordinária da Câmara',
        description: 'Acompanhe a votação de projetos importantes para a cidade.',
        imageUrl: '/images/camara-araucaria-final-no-logo.png',
        internalImageUrl: '/images/news_budget_chamber.png',
        date: 'Terça-feira, 18:00',
        time: '18:00',
        location: 'Câmara Municipal'
    },
    {
        id: 2,
        title: 'Feira do Produtor Rural',
        description: 'Produtos frescos direto do campo. Apoie a agricultura familiar de Araucária.',
        imageUrl: '/images/feira_definitiva_v100.png',
        internalImageUrl: '/images/feirao-empregos-ciar-interna.png',
        date: 'Quarta e Sábado',
        time: '08:00 - 13:00',
        location: 'Praça da Bíblia'
    },
    {
        id: 3,
        title: 'Dia D de Multivacinação',
        description: 'Atualize a carteirinha de vacinação de crianças e adolescentes. Todas as UBS abertas.',
        imageUrl: '/images/vaccination_vsr_cover_v3.png',
        internalImageUrl: '/images/vacinacao_campanha_interna.png',
        date: '25/01/2026',
        time: '08:00 - 17:00',
        location: 'Todas as UBS'
    },
    {
        id: 4,
        title: 'Mutirão de Empregos SINE',
        description: 'Mais de 200 vagas para entrevistas imediatas. Levar Carteira de Trabalho.',
        imageUrl: '/images/mutirao_sine_real_mobile.jpg',
        internalImageUrl: '/images/logistica_vagas_internal.jpg',
        date: '26/01/2026',
        time: '09:00 - 16:00',
        location: 'Agência do Trabalhador'
    },
    {
        id: 5,
        title: 'Vencimento IPTU (Cota Única)',
        description: 'Aproveite o desconto de 10% para pagamento à vista. Emita a guia no site.',
        imageUrl: '/images/prefeitura_orcamento_real.png',
        internalImageUrl: '/images/prefeitura_orcamento_real.webp',
        date: '10/02/2026',
        time: 'Até as 23:59',
        location: 'Online / Bancos'
    },
    {
        id: 6,
        title: 'Festa do Pêssego 2026 (Abertura)',
        description: 'Shows nacionais, gastronomia e exposição. O maior evento da região!',
        imageUrl: '/images/festa_pessego_real.jpg',
        internalImageUrl: '/images/festa_junina_school_internal.png',
        date: '05/02/2026',
        time: '19:00',
        location: 'Parque Cachoeira'
    }
];
export const businesses: Business[] = [
    {
        id: 1,
        name: 'Panificadora e Confeitaria Araucária',
        category: 'Alimentação',
        imageUrl: '/images/panificadora_araucaria_real.webp',
        internalImageUrl: '/images/araucaria-pinhao-detalhe-interna.png',
        address: 'Rua das Flores, 123 - <strong>Centro</strong>',
        phone: '(41) 3901-2345',
        website: 'padariaexemplo.com.br',
        description: 'Pães artesanais, tortas e doces finos. O melhor café da manhã da cidade.',
        isFeatured: true
    },
    {
        id: 2,
        name: 'Livraria e Sebo Cultural',
        category: 'Varejo',
        imageUrl: '/images/bookstore_vinyl_real.webp',
        internalImageUrl: '/images/bookstore_vinyl_real_mobile.webp',
        address: 'Av. Victor do Amaral, 456',
        phone: '(41) 3901-6789',
        website: 'livrariaexemplo.com.br',
        description: 'Acervo completo de livros novos e usados, vinis e raridades.'
    },
    {
        id: 3,
        name: 'Auto Mecânica Confiança',
        category: 'Serviços',
        imageUrl: '/images/auto_mechanic_shop_real.webp',
        internalImageUrl: '/images/pet_shop_interior_real.png',
        address: 'Rodovia do Xisto, 789',
        phone: '(41) 3901-1011',
        website: 'mecanicaexemplo.com.br',
        description: 'Serviços completos de mecânica, elétrica e funilaria para seu veículo.'
    },
    {
        id: 4,
        name: 'Academia Corpo & Movimento',
        category: 'Serviços',
        imageUrl: '/images/gym_body_movement_real.webp',
        internalImageUrl: '/images/gym_body_movement_real_mobile.webp',
        address: 'Rua São Vicente, 200 - <strong>Centro</strong>',
        phone: '(41) 3642-0000',
        website: 'academiacm.com.br',
        description: 'Estrutura completa para musculação, crossfit e aulas de dança.',
        isFeatured: true
    },
    {
        id: 5,
        name: 'Farmácia Saúde Total',
        category: 'Varejo',
        imageUrl: '/images/pharmacy_interior_real.webp',
        internalImageUrl: '/images/cmei_interior_pessoas.png',
        address: 'Av. Archelau de Almeida Torres, 500',
        phone: '(41) 3643-9999',
        website: 'farmaciasaude.com.br',
        description: 'Medicamentos, perfumaria e manipulação com os melhores preços.'
    },
    {
        id: 6,
        name: 'Pet Shop Amigo Fiel',
        category: 'Serviços',
        imageUrl: '/images/pet_shop_interior_real.webp',
        internalImageUrl: '/images/auto_mechanic_shop_real.png',
        address: 'Rua Miguel Bertolino Pizatto, 88',
        phone: '(41) 3901-5555',
        website: 'petshopamigo.com.br',
        description: 'Banho, tosa e clínica veterinária 24 horas para seu melhor amigo.'
    },
    {
        id: 7,
        name: 'Restaurante Sabor da Terra',
        category: 'Alimentação',
        imageUrl: '/images/restaurant_buffet_real.webp',
        internalImageUrl: '/images/restaurant_buffet_real_mobile.webp',
        address: 'Rua Pedro Druszcz, 150',
        phone: '(41) 3642-7777',
        website: 'sabordaterra.com.br',
        description: 'Buffet por quilo e à la carte com o melhor da comida caseira.'
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
