
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
        id: 1769112101,
        title: 'Volta às aulas: Escolas recebem kits de material escolar',
        summary: 'ARAUCÁRIA - A Secretaria de Educação iniciou a distribuição dos kits de material escolar e uniforme para os 18 mil alunos da rede municipal. ...',
        content: `
            
        <p><strong>ARAUCÁRIA</strong> - A Secretaria de Educação iniciou a distribuição dos kits de material escolar e uniforme para os 18 mil alunos da rede municipal. A entrega ocorre diretamente nas unidades escolares do CAIC e Tupy.</p>
        
        <p>A iniciativa visa atender as demandas crescentes da população e garantir mais qualidade de vida nos bairros. Segundo a prefeitura, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas.</p>

        <h3>Impacto Local</h3>
        <p>"É uma mudança significativa para nossa comunidade", afirmou um morador local ouvido pela reportagem. A expectativa é que, com a conclusão desta etapa, novos investimentos sejam atraídos para a região, fechando um ciclo virtuoso de desenvolvimento para Araucária.</p>
    
        `,
        imageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20students%20in%20classroom%20learning%2C%20brazil%20public%20school%20context%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=29025',
        mobileImageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20students%20in%20classroom%20learning%2C%20brazil%20public%20school%20context%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=29025', // Fallback seguro
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: 'https://image.pollinations.ai/prompt/close%20up%20detail%20shot%20of%20students%20in%20classroom%20learning%2C%20brazil%20public%20school%20context%2C%20focus%20on%20action%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=800&height=600&model=flux&nologo=true&seed=35787',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112147,
        title: 'SMMA alerta para aumento de casos de Dengue no Costeira',
        summary: 'ARAUCÁRIA - A Secretaria Municipal de Meio Ambiente (SMMA) emitiu um alerta nesta manhã sobre o aumento de focos do mosquito Aedes aegypti no...',
        content: `
            
        <p><strong>ARAUCÁRIA</strong> - A Secretaria Municipal de Meio Ambiente (SMMA) emitiu um alerta nesta manhã sobre o aumento de focos do mosquito Aedes aegypti no bairro Costeira. Mutirões de limpeza serão realizados no fim de semana.</p>
        
        <p>A iniciativa visa atender as demandas crescentes da população e garantir mais qualidade de vida nos bairros. Segundo a prefeitura, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas.</p>

        <h3>Impacto Local</h3>
        <p>"É uma mudança significativa para nossa comunidade", afirmou um morador local ouvido pela reportagem. A expectativa é que, com a conclusão desta etapa, novos investimentos sejam atraídos para a região, fechando um ciclo virtuoso de desenvolvimento para Araucária.</p>
    
        `,
        imageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20health%20agents%20inspecting%20houses%2C%20sanitary%20check%20context%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=51047',
        mobileImageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20health%20agents%20inspecting%20houses%2C%20sanitary%20check%20context%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=51047', // Fallback seguro
        category: 'Saúde',
        categoryColor: 'green',
        internalImageUrl: 'https://image.pollinations.ai/prompt/close%20up%20detail%20shot%20of%20health%20agents%20inspecting%20houses%2C%20sanitary%20check%20context%2C%20focus%20on%20action%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=800&height=600&model=flux&nologo=true&seed=7298',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112338,
        title: 'Feira de Empregos oferta 300 vagas no CIAR',
        summary: 'ARAUCÁRIA - O polo industrial de Araucária (CIAR) realiza nesta sexta-feira um feirão de empregos com 300 vagas para níveis técnico e operaci...',
        content: `
            
        <p><strong>ARAUCÁRIA</strong> - O polo industrial de Araucária (CIAR) realiza nesta sexta-feira um feirão de empregos com 300 vagas para níveis técnico e operacional. Interessados devem levar currículo e carteira de trabalho no Sine.</p>
        
        <p>A iniciativa visa atender as demandas crescentes da população e garantir mais qualidade de vida nos bairros. Segundo a prefeitura, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas.</p>

        <h3>Impacto Local</h3>
        <p>"É uma mudança significativa para nossa comunidade", afirmou um morador local ouvido pela reportagem. A expectativa é que, com a conclusão desta etapa, novos investimentos sejam atraídos para a região, fechando um ciclo virtuoso de desenvolvimento para Araucária.</p>
    
        `,
        imageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20busy%20commercial%20street%2C%20people%20shopping%2C%20storefronts%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=25038',
        mobileImageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20busy%20commercial%20street%2C%20people%20shopping%2C%20storefronts%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=25038', // Fallback seguro
        category: 'Economia',
        categoryColor: 'blue',
        internalImageUrl: 'https://image.pollinations.ai/prompt/close%20up%20detail%20shot%20of%20busy%20commercial%20street%2C%20people%20shopping%2C%20storefronts%2C%20focus%20on%20action%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=800&height=600&model=flux&nologo=true&seed=27001',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112325,
        title: 'Defesa Civil monitora nível do Rio Iguaçu após chuvas de verão',
        summary: 'ARAUCÁRIA - As fortes chuvas de verão colocaram a Defesa Civil em estado de atenção. O monitoramento no Rio Iguaçu indica nível elevado, mas ...',
        content: `
            
        <p><strong>ARAUCÁRIA</strong> - As fortes chuvas de verão colocaram a Defesa Civil em estado de atenção. O monitoramento no Rio Iguaçu indica nível elevado, mas ainda sem risco iminente de transbordo nas áreas habitadas.</p>
        
        <p>A iniciativa visa atender as demandas crescentes da população e garantir mais qualidade de vida nos bairros. Segundo a prefeitura, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas.</p>

        <h3>Impacto Local</h3>
        <p>"É uma mudança significativa para nossa comunidade", afirmou um morador local ouvido pela reportagem. A expectativa é que, com a conclusão desta etapa, novos investimentos sejam atraídos para a região, fechando um ciclo virtuoso de desenvolvimento para Araucária.</p>
    
        `,
        imageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20stormy%20clouds%20over%20city%2C%20wet%20streets%2C%20rain%20reflection%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=91761',
        mobileImageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20stormy%20clouds%20over%20city%2C%20wet%20streets%2C%20rain%20reflection%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=91761', // Fallback seguro
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: 'https://image.pollinations.ai/prompt/close%20up%20detail%20shot%20of%20stormy%20clouds%20over%20city%2C%20wet%20streets%2C%20rain%20reflection%2C%20focus%20on%20action%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=800&height=600&model=flux&nologo=true&seed=23220',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769111662,
        title: 'Obras de pavimentação chegam ao Jardim Plínio',
        summary: 'ARAUCÁRIA - Máquinas da prefeitura iniciaram hoje o asfaltamento das ruas principais do Jardim Plínio. A obra, aguardada há 10 anos, deve ser...',
        content: `
            
        <p><strong>ARAUCÁRIA</strong> - Máquinas da prefeitura iniciaram hoje o asfaltamento das ruas principais do Jardim Plínio. A obra, aguardada há 10 anos, deve ser concluída em 45 dias, melhorando o acesso ao transporte escolar.</p>
        
        <p>A iniciativa visa atender as demandas crescentes da população e garantir mais qualidade de vida nos bairros. Segundo a prefeitura, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas.</p>

        <h3>Impacto Local</h3>
        <p>"É uma mudança significativa para nossa comunidade", afirmou um morador local ouvido pela reportagem. A expectativa é que, com a conclusão desta etapa, novos investimentos sejam atraídos para a região, fechando um ciclo virtuoso de desenvolvimento para Araucária.</p>
    
        `,
        imageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20road%20construction%20workers%2C%20asphalt%20pairing%20machine%2C%20heavy%20machinery%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=11921',
        mobileImageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20road%20construction%20workers%2C%20asphalt%20pairing%20machine%2C%20heavy%20machinery%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=11921', // Fallback seguro
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: 'https://image.pollinations.ai/prompt/close%20up%20detail%20shot%20of%20road%20construction%20workers%2C%20asphalt%20pairing%20machine%2C%20heavy%20machinery%2C%20focus%20on%20action%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=800&height=600&model=flux&nologo=true&seed=99458',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769111830,
        title: 'Araucária Vôlei vence em casa e assume a liderança',
        summary: 'ARAUCÁRIA - Em uma partida eletrizante no Ginásio Joval de Paula Souza, o time da casa venceu o Maringá por 3 sets a 1. A torcida lotou as ar...',
        content: `
            
        <p><strong>ARAUCÁRIA</strong> - Em uma partida eletrizante no Ginásio Joval de Paula Souza, o time da casa venceu o Maringá por 3 sets a 1. A torcida lotou as arquibancadas e empurrou a equipe rumo à liderança do paranaense.</p>
        
        <p>A iniciativa visa atender as demandas crescentes da população e garantir mais qualidade de vida nos bairros. Segundo a prefeitura, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas.</p>

        <h3>Impacto Local</h3>
        <p>"É uma mudança significativa para nossa comunidade", afirmou um morador local ouvido pela reportagem. A expectativa é que, com a conclusão desta etapa, novos investimentos sejam atraídos para a região, fechando um ciclo virtuoso de desenvolvimento para Araucária.</p>
    
        `,
        imageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20volleyball%20match%20action%20inside%20gymnasium%2C%20players%20jumping%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=54684',
        mobileImageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20volleyball%20match%20action%20inside%20gymnasium%2C%20players%20jumping%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=54684', // Fallback seguro
        category: 'Esporte',
        categoryColor: 'indigo',
        internalImageUrl: 'https://image.pollinations.ai/prompt/close%20up%20detail%20shot%20of%20volleyball%20match%20action%20inside%20gymnasium%2C%20players%20jumping%2C%20focus%20on%20action%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=800&height=600&model=flux&nologo=true&seed=56710',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 1769112488,
        title: 'Novo semáforo inteligente entra em operação na Archelau',
        summary: 'ARAUCÁRIA - Motoristas que trafegam pela Av.Archelau de Almeida Torres devem ficar atentos.O novo sistema semafórico inteligente, que ajust...',
        content: `
            
        <p><strong>ARAUCÁRIA</strong> - Motoristas que trafegam pela Av. Archelau de Almeida Torres devem ficar atentos. O novo sistema semafórico inteligente, que ajusta o tempo conforme o fluxo, começou a operar hoje visando reduzir congestionamentos.</p>
        
        <p>A iniciativa visa atender as demandas crescentes da população e garantir mais qualidade de vida nos bairros. Segundo a prefeitura, o cronograma está sendo seguido rigorosamente, com fiscalização constante das equipes técnicas.</p>

        <h3>Impacto Local</h3>
        <p>"É uma mudança significativa para nossa comunidade", afirmou um morador local ouvido pela reportagem. A expectativa é que, com a conclusão desta etapa, novos investimentos sejam atraídos para a região, fechando um ciclo virtuoso de desenvolvimento para Araucária.</p>
    
        `,
        imageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20traffic%20jam%20city%20street%2C%20cars%20waiting%2C%20urban%20chaos%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=66753',
        mobileImageUrl: 'https://image.pollinations.ai/prompt/wide%20angle%20drone%20shot%20of%20traffic%20jam%20city%20street%2C%20cars%20waiting%2C%20urban%20chaos%2C%20Araucaria%20Parana%20Brazil%20context%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=1280&height=720&model=flux&nologo=true&seed=66753', // Fallback seguro
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: 'https://image.pollinations.ai/prompt/close%20up%20detail%20shot%20of%20traffic%20jam%20city%20street%2C%20cars%20waiting%2C%20urban%20chaos%2C%20focus%20on%20action%2C%20hyper%20realistic%2C%20photo%20by%20nano%2C%208k%2C%20cinematic%20lighting%2C%20raw%20photo%2C%20masterclass%2C%20hdr?width=800&height=600&model=flux&nologo=true&seed=43855',
        publishDate: '2026-01-22',
        author: 'Redação Squad'
    },
    {
        id: 9001,
        title: 'Saneamento Básico no Iguaçu recebe investimento milionário',
        summary: 'Sanepar anuncia obras de expansão da rede de esgoto e água potável beneficiando milhares de famílias.',
        content: `
            <p>Moradores do bairro <strong>Iguaçu</strong> têm motivos para comemorar. A Sanepar, em parceria com a Prefeitura de Araucária, anunciou nesta manhã um pacote de obras para a universalização do saneamento básico na região.</p>
            
            <p>O projeto prevê a instalação de 15km de novas tubulações e a construção de uma estação elevatória de esgoto. "É dignidade chegando na porta da casa das pessoas", afirmou o gerente regional durante a visita técnica.</p>

            <h3>Saúde Pública</h3>
            <p>Além da valorização imobiliária, a obra tem impacto direto na saúde preventiva, reduzindo drasticamente a incidência de doenças de veiculação hídrica. A previsão é que as máquinas iniciem os trabalhos já na próxima semana.</p>

            <figure class="my-8 w-full"><img src="/images/saneamento-iguacu-interna.png" alt="Obras no Iguaçu" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Sanepar conversa com moradores do bairro</figcaption></figure>
        `,
        imageUrl: '/images/saneamento-iguacu-capa.png',
        mobileImageUrl: '/images/saneamento-iguacu-capa.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: '/images/saneamento-iguacu-interna.png',
        publishDate: '2026-01-22',
        author: 'Redação Municipal'
    },
    {
        id: 9002,
        title: 'Programa Lixo Zero mobiliza escolas e comunidade',
        summary: 'Iniciativa educativa transforma resíduos em recursos e promove a reciclagem nos bairros.',
        content: `
            <p>Araucária dá mais um passo rumo à sustentabilidade com o lançamento do programa "Lixo Zero". A iniciativa visa reduzir em 30% o volume de resíduos enviados ao aterro sanitário através da educação ambiental e do incentivo à compostagem.</p>
            
            <p>Escolas municipais do <strong>Centro</strong> e <strong>Costeira</strong> já aderiram, transformando restos de merenda em adubo para as hortas comunitárias. "A criança aprende na escola e ensina os pais em casa. É uma mudança cultural", destaca a Secretária de Meio Ambiente.</p>

            <figure class="my-8 w-full"><img src="/images/lixo-zero-interna-manual.jpg" alt="Educação Ambiental" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Alunos aprendendo sobre separação correta</figcaption></figure>
        `,
        imageUrl: '/images/lixo-zero-manual.png',
        mobileImageUrl: '/images/lixo-zero-manual.png',
        category: 'Cidade',
        categoryColor: 'green',
        internalImageUrl: '/images/lixo-zero-interna-manual.jpg',
        publishDate: '2026-01-22',
        author: 'EcoAção'
    },
    {
        id: 9003,
        title: 'Festival da Cultura Tropeira agita o Parque Cachoeira',
        summary: 'Música raiz, culinária típica e apresentações de laço comprido marcam o fim de semana.',
        content: `
            <p>O resgate das tradições está garantido em Araucária. O Festival da Cultura Tropeira reuniu milhares de visitantes no <strong>Parque Cachoeira</strong> para celebrar a história dos condutores de tropas que ajudaram a construir o Paraná.</p>
            
            <p>O cheiro de feijão tropeiro e arroz carreteiro tomou conta da praça de alimentação, enquanto violeiros animavam o público com moda de viola autêntica.</p>

            <figure class="my-8 w-full"><img src="/images/festival-tropeiro-interna-manual.png" alt="Culinária Tropeira" class="w-full rounded-xl shadow-lg object-cover h-[400px]" /><figcaption class="text-sm text-gray-500 mt-2 text-center">Sabores tradicionais no Parque Cachoeira</figcaption></figure>
        `,
        imageUrl: '/images/festival-tropeiro-capa-manual.jpg',
        mobileImageUrl: '/images/festival-tropeiro-capa-manual.jpg',
        category: 'Cultura',
        categoryColor: 'indigo',
        internalImageUrl: '/images/festival-tropeiro-interna-manual.png',
        publishDate: '2026-01-22',
        author: 'Cultura Viva'
    },
    {
        id: 3001,
        title: 'Araucária registra queda histórica no desemprego',
        summary: 'Novas indústrias e comércio fortalecido geram mais de 2.000 vagas no último trimestre.',
        content: `
            <p>A economia de Araucária vive um momento de ouro. Dados do CAGED divulgados hoje mostram que o município registrou o menor índice de desemprego dos últimos 5 anos, consolidando-se como um dos principais polos de geração de renda do estado.</p>
            
            <p>O "boom" econômico é impulsionado por dois motores principais: a expansão das plantas industriais no complexo petroquímico e a criação de novas empresas de logística. "Não estamos apenas gerando vagas, estamos criando carreiras. A demanda por mão de obra qualificada nunca foi tão alta", celebra o secretário de trabalho.</p>

            <h2>Impacto nos Bairros</h2>
            <p>O aquecimento da economia não fica restrito à zona industrial. O efeito cascata é visível nos bairros adjacentes como <strong>Capela Velha</strong> e Jardim <strong>Industrial</strong>. Com mais pessoas empregadas, o comércio local — de padarias a lojas de construção — registra aumento no faturamento.</p>

            <p>Lojistas da Avenida Archelau já sentem a diferença no movimento, impulsionado pelo aumento do poder de compra das famílias. O ciclo virtuoso se fecha com o setor de serviços, que tem aberto novas frentes de trabalho para atender a essa demanda crescente.</p>
        `,
        imageUrl: '/images/employment_drop_new_cover.png',
        mobileImageUrl: '/images/employment_drop_new_cover_mobile.webp',
        category: 'Economia',
        categoryColor: 'blue',
        internalImageUrl: '/images/araucaria_employment_internal_final_v5.png',
        publishDate: '2026-01-04', // DATA FUTURA PARA FORÇAR TOPO
        author: 'Redação Araucária'
    },
    {
        id: 3005,
        title: '<strong>Parque Cachoeira</strong> terá cinema ao ar livre neste sábado',
        summary: 'Projeto "Cine Família" traz clássicos da animação para telão gigante no parque.',
        content: `
            <p>Prepare a pipoca e a canga! Neste sábado, o <strong>Parque Cachoeira</strong> se transforma em um grande cinema a céu aberto. O projeto "Cine Família", totalmente gratuito, exibirá filmes infantis a partir das 19h em um telão de alta definição montado próximo ao lago.</p>
            
            <p>A iniciativa visa não apenas oferecer lazer, mas também democratizar o acesso à cultura. "Muitas crianças nunca tiveram a experiência de ver um filme em tela grande. Trazer isso para o parque, um ambiente democrático por natureza, é transformar o espaço público em sala de estar da cidade", destaca a organização.</p>

            <p>Eventos como este têm um efeito multiplicador na economia local e na vida comunitária. Pela proximidade, moradores dos bairros <strong>Iguaçu</strong>, <strong>Estação</strong> e <strong>Centro</strong> são os mais beneficiados, podendo acessar o parque a pé. Essa movimentação gera um "cinturão de segurança" natural nas ruas do entorno e aquece o comércio local, com aumento de até 40% no movimento de padarias e sorveterias da região.</p>
            
            <p>Além do aspecto econômico, o cinema ao ar livre fortalece o sentimento de pertença. Em tempos de entretenimento individual, reunir centenas de famílias no gramado cria memórias afetivas e reforça os laços sociais que tornam Araucária uma cidade mais acolhedora.</p>
        `,
        imageUrl: '/images/cinema_cover_real_final_v7.jpg',
        mobileImageUrl: '/images/cinema_cover_real_final_v7_mobile.webp',
        category: 'Cultura',
        categoryColor: 'yellow',
        internalImageUrl: '/images/cinema_lion.png',
        publishDate: '2026-01-04', // DATA FUTURA PARA FORÇAR TOPO
        author: 'Cultura Viva'
    },
    {
        id: 3003,
        title: 'Hospital Municipal recebe equipamentos de última geração',
        summary: 'Novos tomógrafos e aparelhos de raio-x digital agilizam diagnósticos na rede pública.',
        content: `
            <p>A saúde pública de Araucária deu um salto de qualidade. Chegaram hoje ao Hospital Municipal (HMA) os novos equipamentos de diagnóstico por imagem, incluindo tomógrafos computadorizados de 64 canais e aparelhos de raio-x digital. O investimento visa humanizar o atendimento e acelerar diagnósticos complexos.</p>
            
            <p>Com tecnologia de ponta, os novos tomógrafos reduzem o tempo de exame em 50%, permitindo maior rotatividade. "A meta é zerar a fila de espera por exames de imagem em até quatro semanas", projeta a direção clínica.</p>

            <h2>Saúde Perto de Casa</h2>
            <p>O impacto para a população é direto: fim das longas viagens de ambulância para Curitiba ou Campo Largo apenas para realizar exames. Moradores de bairros mais distantes, como o <strong>Guajuvira</strong>, agora contam com resolutividade dentro do próprio município.</p>

            <p>A modernização do parque tecnológico do HMA também atrai especialistas médicos para a cidade, fortalecendo a rede de atendimento especializada disponível para todos os araucarienses.</p>
        `,
        imageUrl: '/images/hospital_equipment_araucaria_final_v5.png',
        mobileImageUrl: '/images/hospital_equipment_araucaria_final_v5_mobile.webp',
        category: 'Saúde',
        categoryColor: 'green',
        internalImageUrl: '/images/hospital_delivery_trucks_internal.png',
        publishDate: '2025-12-29',
        author: 'Saúde Agora'
    },
    {
        id: 3004,
        title: 'Escolas da rede municipal ganham hortas comunitárias',
        summary: 'Projeto "Sementes do Futuro" transforma pátios escolares em salas de aula vivas, envolvendo mais de 3.000 alunos e famílias de diversos bairros.',
        content: `
            <p>Da terra para o prato da merenda. Esse é o lema do projeto "Sementes do Futuro", que acaba de completar seis meses de atividades e já transformou a rotina de dez escolas municipais de Araucária. A iniciativa, que converte pátios ociosos em salas de aula a céu aberto, está ensinando na prática sobre ciclos naturais, biologia e responsabilidade ambiental para mais de 3.000 alunos da rede pública.</p>
            
            <p>O projeto começou como um piloto no <strong>Jardim Tupy</strong>, mas o sucesso foi tão imediato que a Secretaria de Educação expandiu rapidamente para unidades no <strong>Jardim Iguaçu</strong> e na <strong>Costeira</strong>. "O que antes era apenas um gramado sem uso ou um canto de terra batida, hoje produz alface, tomate, cenoura, beterraba e diversos temperos que vão direto para a cozinha da escola", explica a diretora Maria Helena, de uma das unidades beneficiadas.</p>

            <h3>Educação Nutricional na Prática</h3>
            <p>A principal mudança percebida, no entanto, não está apenas na horta, mas no refeitório. Nutricionistas da rede municipal relatam uma diminuição drástica no desperdício de alimentos (sobras nos pratos). "As crianças criam um vínculo com o alimento. Elas plantaram a semente, regaram, cuidaram e viram crescer. Quando aquele alimento chega no prato, elas comem com orgulho e curiosidade, vencendo a resistência a vegetais", afirma Ana Paula, nutricionista responsável pelo acompanhamento do projeto.</p>

            <p>Além dos vegetais tradicionais, o projeto introduziu timidamente o cultivo de PANCs (Plantas Alimentícias Não Convencionais), resgatando saberes antigos e diversificando ainda mais a dieta escolar com nutrientes poderosos e muitas vezes esquecidos.</p>

            <h3>Engajamento que Ultrapassa os Muros</h3>
            <p>O impacto social do "Sementes do Futuro" já ultrapassou os muros da escola. Aos sábados, mutirões de manutenção reúnem pais, avós e moradores vizinhos, transformando a escola em um verdadeiro polo comunitário de convivência.</p>
            
            <p>Em bairros como o <strong>Capela Velha</strong>, o efeito multiplicador é visível: famílias começaram a replicar o modelo em casa, criando pequenas hortas em quintais e até em varandas de apartamentos, utilizando o apoio técnico e as mudas excedentes fornecidas pelos agrônomos da prefeitura.</p>

            <p>"Meu filho de 8 anos me ensinou a fazer compostagem. Hoje reduzimos nosso lixo orgânico pela metade e temos tempero fresco todo dia sem agrotóxico", conta Ricardo Mendes, morador do <strong>Jardim Plínio</strong> e pai de aluno. O projeto prova que a educação ambiental, quando vivenciada na prática, planta raízes profundas que sustentam a saúde de toda a comunidade.</p>
        `,
        imageUrl: '/images/hortas_escolas_cover_v27.jpg',
        mobileImageUrl: '/images/hortas_escolas_cover_v27_mobile.webp',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/school_garden_internal_final_v5.png',
        publishDate: '2025-12-29',
        author: 'Educação Futuro'
    },
    {
        id: 3002,
        title: 'Araucária lidera ranking de cidades inteligentes do PR',
        summary: 'Conectividade, semáforos inteligentes e serviços digitais colocam o município no topo.',
        content: `
            <p>Araucária é, oficialmente, a cidade mais inteligente da região metropolitana. O mais recente ranking nacional de Smart Cities colocou o município em destaque pela sua ampla cobertura de Wi-Fi gratuito em praças e parques, além da digitalização de 100% dos serviços públicos municipais.</p>
            
            <p>Hoje, é possível abrir empresas, solicitar alvarás ou agendar consultas médicas sem sair de casa, pelo aplicativo "Araucária Digital". "A tecnologia serve para facilitar a vida do cidadão, devolvendo a ele o tempo que antes era perdido em filas", afirmou o prefeito.</p>

            <h2>Inclusão Digital nos Bairros</h2>
            <p>A conectividade chegou forte nas áreas residenciais. Praças em bairros como Califórnia, CSU e Tupy agora contam com internet de alta velocidade gratuita. Isso democratiza o acesso à informação e permite que estudantes e trabalhadores utilizem os espaços públicos para estudos e qualificação profissional, impulsionando o desenvolvimento local.</p>
        `,
        imageUrl: '/images/araucaria_smart_city_final_v8.png',
        mobileImageUrl: '/images/araucaria_smart_city_final_v8_mobile.webp',
        internalImageUrl: '/images/araucaria_smart_city_internal_collage_final_v5.png',
        category: 'Tecnologia',
        categoryColor: 'indigo',
        publishDate: '2025-12-29',
        author: 'Tech News'
    },
    {
        id: 3006,
        title: 'Ginásio Joval de Paula Souza será palco de final estadual',
        summary: 'Araucária recebe as melhores equipes de vôlei do Paraná para disputa do título.',
        content: `
            <p>O esporte respira em Araucária. A Federação Paranaense confirmou que nossa cidade será a sede das finais do Campeonato Paranaense de Vôlei, consolidando o município como referência na organização de grandes eventos esportivos.</p>
            
            <p>As partidas, que reunirão as quatro melhores equipes do estado, prometem lotar o Ginásio Joval de Paula Souza. A expectativa da organização é receber mais de 2.000 torcedores por dia. "A estrutura do ginásio foi totalmente revitalizada para oferecer conforto e segurança às famílias", destaca o diretor de esportes.</p>

            <p>Além do espetáculo em quadra, o evento tem um forte cunho social. Os ingressos serão solidários, trocados por 1kg de alimento não perecível, que será destinado ao Programa de Segurança Alimentar do município.</p>

            <h2>Movimento nos Bairros Vizinhos</h2>
            <p>A realização de um evento deste porte traz reflexos imediatos para além das quadras. Bairros no entorno do ginásio, como o <strong>Centro</strong> e o <strong>Fazenda Velha</strong>, preparam-se para um final de semana atípico e lucrativo.</p>
            
            <p>Donos de lanchonetes, postos de gasolina e pequenos comércios locais já reforçaram seus estoques prevendo o aumento do fluxo de visitantes. A circulação de torcedores de outras cidades também movimenta a rede hoteleira e gastronômica, injetando capital novo na economia local e valorizando o potencial turístico-esportivo de Araucária.</p>
        `,
        imageUrl: '/images/gym_volleyball_final_cover_v5.png',
        mobileImageUrl: '/images/gym_volleyball_final_cover_v5_mobile.webp',
        category: 'Esporte',
        categoryColor: 'orange',
        internalImageUrl: '/images/gym_volleyball_internal_final_v5.png',
        publishDate: '2025-12-29',
        author: 'Esporte News'
    },
    {
        id: 101, // ID Único Real
        title: 'Araucária zera fila de espera por vagas em CMEIs para 2025',
        summary: 'Prefeitura anuncia que todas as 1.500 crianças de 0 a 3 anos inscritas tiveram vagas ofertadas.',
        content: `
            <p>Um marco histórico para a educação de Araucária. A Secretaria Municipal de Educação confirmou nesta semana que a fila de espera por vagas em Centros Municipais de Educação Infantil (CMEIs) foi totalmente zerada.</p>
            
            <p>O avanço beneficia cerca de 1.500 famílias que aguardavam vaga para o ano letivo de 2025. "Trabalhamos duro na ampliação das unidades e em parcerias para garantir esse direito fundamental", afirmou a secretária.</p>

            <h2>Alívio no Califórnia e Tupy</h2>
            <p>A medida traz impacto imediato para pais que residem em áreas de alta demanda, como <strong>Califórnia</strong> e <strong>Tupy</strong>. Com a vaga garantida próxima a casa, as famílias economizam tempo de deslocamento. O comércio local, como papelarias e lojas de uniformes nessas regiões, já projeta um aumento nas vendas para o início do ano letivo.</p>
        `,
        imageUrl: '/images/cmei_zerando_fila_cover_v4.png', // Imagem real enviada pelo usuário (v4)
        mobileImageUrl: '/images/cmei_zerando_fila_cover_v4.png',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/cmei_interior_pessoas.png',
        publishDate: '2025-12-20',
        author: 'Redação Municipal'
    },
    {
        id: 102,
        title: 'Orçamento Municipal para 2026 deve chegar a R$ 2,3 bilhões',
        summary: 'Previsão orçamentária aponta crescimento na arrecadação e maiores investimentos em obras e saúde.',
        content: `
            <p>A Lei Orçamentária Anual (LOA) discutida na Câmara Municipal projeta um orçamento recorde de aproximadamente R$ 2,3 bilhões para Araucária em 2026.</p>
            
            <p>A prioridade dos recursos será para a manutenção dos serviços de saúde e grandes obras de infraestrutura viária, como a duplicação de avenidas importantes e a construção do novo hospital.</p>

            <h2>Obras no <strong>Industrial</strong> e Thomaz Coelho</h2>
            <p>Entre os destaques, está a revitalização asfáltica de vias arteriais no <strong>Jardim Industrial</strong> e <strong>Thomaz Coelho</strong>. A previsão é que as obras melhorem a fluidez do trânsito para quem se desloca diariamente para a capital. Além disso, recursos foram alocados para a reforma de UBSs no <strong>Tindiquera</strong>, atendendo a uma demanda antiga da comunidade.</p>
        `,
        imageUrl: '/images/news_budget.png', // Nova imagem gerada (Nano Banana Pro)
        mobileImageUrl: '/images/news_budget_mobile.webp',
        category: 'Economia',
        categoryColor: 'blue',
        internalImageUrl: '/images/prefeitura_orcamento_real.png',
        publishDate: '2025-12-18',
        author: 'Câmara Municipal'
    },
    {
        id: 103,
        title: 'Governador inaugura unidade do Poupatempo em Araucária',
        summary: 'Nova agência no centro unifica mais de 240 serviços estaduais e facilita a vida do cidadão.',
        content: `
            <p>Foi inaugurada oficialmente a primeira unidade de rua do Poupatempo no Paraná, localizada em Araucária. O espaço moderno facilita a vida do cidadão, permitindo emitir documentos como RG e CNH, além de solicitar serviços da Copel e Sanepar em um único lugar.</p>
            
            <p>"É o fim da burocracia e das filas. O cidadão resolve tudo em um só lugar", destacou o governador Ratinho Jr durante a cerimônia.</p>

            <h2>Facilidade para a Zona Rural</h2>
            <p>A localização estratégica no <strong>Centro</strong> beneficia especialmente moradores de áreas rurais distantes, como <strong>Guajuvira</strong> e <strong>Roça Nova</strong>. Antes obrigados a viajar até Curitiba para simples emissões de documentos, agora esses cidadãos resolvem pendências rapidamente, aproveitando a viagem para consumir no comércio central de Araucária.</p>
        `,
        imageUrl: '/images/poupatempo_inauguracao_v2.png', // Foto oficial externa sem máscaras v2
        mobileImageUrl: '/images/custom_poupatempo_official_mobile.webp',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/poupatempo_atendimento_pessoas.png',
        publishDate: '2025-12-15',
        author: 'Agência Estadual'
    },
    {
        id: 104,
        title: 'Pacote de investimentos federais destina R$ 20 milhões para Araucária',
        summary: 'Recursos anunciados pelo Governo Federal serão aplicados na saúde e educação.',
        content: `
            <p>Em visita oficial, representantes do Governo Federal anunciaram um pacote de investimentos para Araucária. Serão R$ 2,8 milhões destinados à Saúde e R$ 18 milhões para a Educação, focados na ampliação da rede física de atendimento.</p>
            
            <p>Os recursos devem ser liberados já no início do próximo semestre, acelerando obras paradas e equipando novas unidades.</p>

            <h2>Melhorias no Capela Velha</h2>
            <p>Parte significativa dos R$ 18 milhões será destinada à ampliação de escolas no bairro <strong>Capela Velha</strong>, uma das regiões que mais cresce na cidade. A construção de novas salas de aula e quadras poliesportivas promete transformar a realidade escolar local, oferecendo infraestrutura de ponta para centenas de alunos.</p>
        `,
        imageUrl: '/images/news_investments.png', // Nova imagem gerada (Nano Banana Pro)
        mobileImageUrl: '/images/news_investments_mobile.webp',
        category: 'Política',
        categoryColor: 'purple',
        internalImageUrl: '/images/investimento_federal_real.png',
        publishDate: '2025-12-12',
        author: 'Brasília News'
    },
    {
        id: 105,
        title: 'Polícia Civil incinera 114 kg de drogas apreendidas na região',
        summary: 'Ação realizada nesta semana marca o combate efetivo ao tráfico em Araucária.',
        content: `
            <p>A Polícia Civil do Paraná (PCPR) realizou a incineração de mais de 114 quilos de entorpecentes apreendidos em operações recentes em Araucária.</p>
            
            <p>O delegado responsável destacou a importância das denúncias anônimas da população para o sucesso das apreensões. Todo o material foi destruído em fornos industriais com autorização judicial.</p>

            <h2>Segurança no Campina da Barra</h2>
            <p>A operação teve foco especial em pontos críticos denunciados pela comunidade do <strong>Campina da Barra</strong>. A retirada de circulação dessa grande quantidade de entorpecentes impacta diretamente na redução de pequenos furtos na região, devolvendo a sensação de segurança para comerciantes e moradores que transitam pelo bairro à noite.</p>
        `,
        imageUrl: '/images/pcpr_drugs_incineration_v2.png', // Foto Real Incineração v2
        mobileImageUrl: '/images/custom_drugs_mobile.webp',
        category: 'Segurança',
        categoryColor: 'red',
        internalImageUrl: '/images/operacao_pcpr_viaturas.png',
        publishDate: '2025-12-10',
        author: 'PCPR'
    },
    {
        id: 106,
        title: 'Vacinação contra Vírus Sincicial Respiratório (VSR) para gestantes',
        summary: 'Saúde inicia imunização para proteger recém-nascidos de infecções graves.',
        content: `
            <p>A Secretaria Municipal de Saúde iniciou a campanha de vacinação contra o VSR voltada para gestantes. A medida visa transmitir anticorpos para o bebê ainda na gestação, garantindo proteção contra bronquiolites e pneumonias nos primeiros meses de vida.</p>
            
            <p>As doses estão disponíveis em todas as Unidades Básicas de Saúde (UBS) do município para o público-alvo.</p>

            <h2>Adesão no CSU e Boqueirão</h2>
            <p>As UBSs do <strong>CSU</strong> e <strong>Boqueirão</strong> registraram a maior procura no primeiro dia de campanha. Gestantes dessas comunidades destacam a facilidade de ter o imunizante perto de casa. "É uma tranquilidade saber que meu bebê já vai nascer protegido", relatou uma futura mãe moradora do <strong>Boqueirão</strong>.</p>
        `,
        imageUrl: '/images/vaccination_vsr_cover_v3.png',
        category: 'Saúde',
        categoryColor: 'blue',
        internalImageUrl: '/images/news_vaccine_pregnant.png',
        publishDate: '2025-12-08',
        author: 'Saúde Agora'
    },
    {
        id: 107,
        title: 'Cantata de Natal emociona fiéis no Santuário',
        summary: 'Apresentação "Um Conto de Natal" reuniu centenas de pessoas no fim de semana.',
        content: `
            <p>O clima natalino tomou conta de Araucária com a belíssima apresentação da Cantata 'Um Conto de Natal' na Paróquia Nossa Senhora do Perpétuo Socorro. O evento contou com coral infantil e orquestra, emocionando o público presente.</p>
            
            <p>Novas apresentações estão programadas para o próximo fim de semana na Praça da Matriz.</p>

            <h2>Turismo Regional</h2>
            <p>O evento atraiu não apenas moradores do <strong>Centro</strong>, mas caravanas de bairros como <strong>Iguaçu</strong> e <strong>Estação</strong>. O brilho das luzes e a música clássica movimentaram as cafeterias e sorveterias do entorno da Praça, que operaram com lotação máxima, celebrando o espírito natalino e o aquecimento da economia local.</p>
        `,
        imageUrl: '/images/cantata_natal_real.png', // Nova imagem gerada
        mobileImageUrl: '/images/cantata_natal_real_mobile.webp',
        category: 'Cultura',
        categoryColor: 'indigo',
        internalImageUrl: '/images/news_christmas_cantata.png',
        publishDate: '2025-12-05',
        author: 'Cultura Viva'
    },
    {
        id: 108,
        title: 'Ciclone extratropical: Equipes trabalham para restabelecer energia',
        summary: 'Após tempestade, Copel atua para religar 21 unidades consumidoras ainda sem luz.',
        content: `
            <p>O ciclone extratropical que atingiu a região sul nos últimos dias deixou estragos pontuais em Araucária. Segundo boletim da Copel, cerca de 21 unidades consumidoras permaneciam sem energia nesta manhã.</p>
            
            <p>Equipes de emergência estão nas ruas para remover galhos de árvores sobre a fiação e normalizar o serviço o mais rápido possível.</p>

            <h2>Jardim Turim Afetado</h2>
            <p>Os ventos fortes causaram quedas de árvores principalmente na região do <strong>Jardim Turim</strong> e <strong>Shangri-lá</strong>. Equipes da Prefeitura concentraram esforços nessas localidades durante a madrugada para desobstruir vias e garantir o retorno da energia, minimizando os transtornos para os moradores.</p>
        `,
        imageUrl: '/images/news_cyclone_energy.png', // Eletricistas no Caminhão (Nano Banana Pro)
        mobileImageUrl: '/images/news_cyclone_energy_mobile.webp',
        category: 'Cidade',
        categoryColor: 'gray',
        internalImageUrl: '/images/copel_repair_real_v2.png',
        publishDate: '2025-12-01',
        author: 'Tempo Agora'
    },

    {
        id: 109, // Novo ID para o Ginásio
        title: 'Ginásio Joval de Paula Souza será reformado',
        summary: 'Prefeitura anuncia revitalização completa do complexo esportivo no <strong>Parque Cachoeira</strong>.',
        content: `
            <p>Um dos principais palcos do esporte araucariense, o Ginásio Joval de Paula Souza, passará por uma ampla reforma. O anúncio foi feito pela Secretaria de Esporte e Lazer, que prevê melhorias no piso da quadra, vestiários e cobertura.</p>
            
            <p>As obras devem começar no próximo mês e visam oferecer mais conforto e segurança para atletas e torcedores.</p>

            <h2>Alternativa para Atletas</h2>
            <p>Durante as obras, as escolinhas de vôlei e futsal que atendem crianças do <strong>Parque Cachoeira</strong> e <strong>Centro</strong> serão transferidas temporariamente para ginásios no <strong>Fazenda Velha</strong>. A medida garante que nenhum atleta tenha seu treinamento interrompido, mantendo o calendário esportivo da cidade ativo e descentralizado.</p>
        `,
        imageUrl: '/images/custom_gym_official.png', // Foto oficial (Enviada pelo User)
        mobileImageUrl: '/images/custom_gym_official_mobile.webp',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/gym_interior_renovation.png',
        publishDate: '2025-11-28',
        author: 'Esporte News'
    },
    {
        id: 9999,
        title: 'Feira Gastronômica traz Food Trucks e música para o <strong>Centro</strong>',
        summary: 'Evento na Praça Central reúne o melhor da culinária de rua e opções de lazer para toda a família.',
        content: `
            <p>A Praça Central de Araucária se transformou no ponto de encontro oficial das famílias neste fim de semana. A Feira Gastronômica Noturna bateu recorde de público, reunindo mais de 20 opções de Food Trucks que oferecem uma verdadeira volta ao mundo gastronômica — do clássico hambúrguer artesanal ao pierogi polonês, patrimônio da nossa cidade.</p>

            <p>Além dos sabores, o evento se destaca pela segurança e organização. "É um ambiente pensado para que pais possam trazer seus filhos com tranquilidade, curtir boa música ao vivo e valorizar os artistas da terra", afirma a organização.</p>

            <p>A movimentação não se restringe apenas ao <strong>Centro</strong>. Bairros vizinhos como <strong>Fazenda Velha</strong>, <strong>Estação</strong> e <strong>Vila Nova</strong> sentem o reflexo positivo imediato. Moradores dessas regiões aproveitam a proximidade para frequentar a feira a pé, ocupando os espaços públicos e aquecendo o comércio local no trajeto, como padarias e pequenos mercados.</p>

            <p>Para quem vem de mais longe, como do <strong>Jardim Iguaçu</strong> ou <strong>Costeira</strong>, a feira se tornou o principal destino de lazer nas noites de sexta e sábado, integrando diferentes regiões da cidade em um único espaço de convivência.</p>
        `,
        imageUrl: '/images/food_trucks_cover_v29.png',
        mobileImageUrl: '/images/food_trucks_cover_v29_mobile.webp',
        internalImageUrl: '/images/food_trucks_internal_v26.png',
        category: 'Lazer',
        categoryColor: 'yellow',
        publishDate: '2026-01-04', // Mantendo hoje para destaque
        author: 'Guia Curitiba'
    },
    {
        id: 6,
        title: 'Câmara aprova incentivo ao turismo rural',
        summary: 'Caminho do <strong>Guajuvira</strong> e roteiros poloneses receberão verba para sinalização e melhorias.',
        content: `
            <p>Em sessão realizada ontem, a Câmara Municipal de Araucária aprovou por unanimidade o projeto de lei que cria incentivos fiscais e destina verbas para o desenvolvimento do turismo rural na região.</p>
            
            <p>O foco principal são os roteiros do Caminho do <strong>Guajuvira</strong> e as rotas da colônia polonesa, que possuem grande potencial gastronômico e cultural. Com o novo investimento, será feita a melhoria da sinalização turística, a pavimentação de trechos críticos de estradas rurais e o apoio à divulgação dos produtores locais.</p>
            
            <p>Pequenos agricultores que abrirem suas propriedades para visitação ou venda de produtos coloniais (como queijos, vinhos e doces) terão descontos em taxas municipais.</p>
            
            <p>"Araucária tem belezas rurais que muita gente desconhece. Queremos que o curitibano e o próprio araucariense passem o fim de semana aqui, consumindo nossos produtos e valorizando nossa história", defendeu a vereadora autora do projeto.</p>
        `,
        imageUrl: '/images/rural_tourism_araucaria_path.png',
        mobileImageUrl: '/images/rural_tourism_araucaria_path_mobile.webp',
        category: 'Turismo',
        categoryColor: 'indigo',
        internalImageUrl: '/images/rural_tourism_araucaria_path.png',
        publishDate: '2025-11-15',
        author: 'Jornal do Campo'
    },
    {
        id: 7,
        title: 'Campanha de Vacinação atinge meta no município',
        summary: 'Secretaria de Saúde comemora alta adesão da população na campanha contra a gripe.',
        content: `
            <p>A Secretaria Municipal de Saúde de Araucária divulgou hoje que a campanha de vacinação contra a gripe atingiu 95% da meta estipulada para o público-alvo. O resultado coloca o município entre os mais eficientes do estado na imunização.</p>
            <p>As unidades básicas de saúde funcionaram em horário estendido durante a última semana para garantir que trabalhadores pudessem se vacinar. "A conscientização da população foi fundamental. Vacinas salvam vidas", reforçou a diretora de epidemiologia.</p>
            <p>Ainda há doses disponíveis para a população geral em todas as UBS do município. É necessário apresentar documento com foto e carteirinha de vacinação.</p>
        `,
        imageUrl: '/images/vacinacao_meta_2024.webp',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/vacinacao_campanha_interna.png',
        publishDate: '2025-11-10',
        author: 'Saúde em Foco'
    },
    {
        id: 8,
        title: 'Festival de Teatro Infantil lota auditórios',
        summary: 'Semana da criança foi marcada por apresentações culturais gratuitas em diversas escolas.',
        content: `
            <p>A magia do teatro invadiu as escolas municipais de Araucária. O Festival de Teatro Infantil, promovido pela Secretaria de Cultura, realizou mais de 20 apresentações gratuitas ao longo da última semana, atingindo cerca de 5 mil crianças.</p>
            <p>Peças clássicas e produções locais fizeram parte do repertório. O objetivo do projeto é formar plateia e incentivar o gosto pela arte desde cedo. "Ver o brilho nos olhos das crianças não tem preço", disse um dos atores da companhia local.</p>
            <p>O encerramento do festival acontecerá no próximo domingo, com uma apresentação aberta ao público no <strong>Parque Cachoeira</strong>.</p>
        `,
        imageUrl: '/images/placeholder_educacao.png',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/childrens_theater_stage_play.png',
        publishDate: '2025-11-05',
        author: 'Cultura Viva'
    },
    {
        id: 9,
        title: 'Novas ciclovias conectam bairros industriais',
        summary: 'Projeto de mobilidade urbana facilita o deslocamento de trabalhadores para a área industrial.',
        content: `
            <p>A Prefeitura iniciou as obras de expansão da malha cicloviária na região industrial. O projeto de 5km conecta estrategicamente os bairros <strong>Thomaz Coelho</strong> e <strong>Cidade <strong>Industrial</strong> de Araucária (CIAR)</strong>, uma das zonas com maior fluxo diário de trabalhadores.</p>
            
            <p>O ciclista que sai da <strong>Chapada</strong> ou do <strong>Barigui</strong> não precisará mais disputar espaço com caminhões pesados na Rodovia do Xisto. "É segurança para o trabalhador e agilidade para a indústria", resume o secretário de obras.</p>

            <h2>Mobilidade e Saúde</h2>
            <p>Além do reduzir o trânsito nos horários de pico, a ciclovia incentiva a prática de exercícios. Moradores do <strong>Jardim Tupy</strong> já utilizam o trecho pronto para caminhadas e corridas noturnas, beneficiados pela nova iluminação de LED instalada em todo o percurso.</p>
        `,
        imageUrl: '/images/ciclovia_industrial_cover_v2.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: '/images/new_bike_path_industrial.png',
        publishDate: '2025-10-30',
        author: 'Mobilidade Urbana'
    },
    {
        id: 10,
        title: 'Operação Tapa-Buracos avança no <strong>Jardim Iguaçu</strong>',
        summary: 'Equipes da Secretaria de Obras trabalham em ritmo acelerado para recuperar vias danificadas pelas chuvas.',
        content: `
            <p>A Secretaria de Obras Públicas intensificou nesta semana a Operação Tapa-Buracos no bairro <strong>Jardim Iguaçu</strong>, atendendo a uma demanda antiga dos moradores. A ação concentra-se inicialmente na <strong>Avenida Archelau de Almeida Torres</strong> e ruas transversais, principais corredores de ônibus da região.</p>
            
            <p>As equipes também atuam na recuperação de vias no <strong>Jardim Plínio</strong> e <strong>Jardim Shangri-lá</strong>, onde o asfalto sofreu maior desgaste pelas chuvas recentes. O objetivo é garantir a segurança viária e evitar prejuízos aos motoristas.</p>

            <h2>Valorização Imobiliária</h2>
            <p>Além do conforto ao dirigir, a manutenção viária impacta diretamente na valorização dos imóveis. "Rua arrumada traz outra cara pro bairro", comenta um comerciante local. A previsão é estender os trabalhos para o <strong>Jardim Planalto</strong> na próxima semana.</p>
        
        `,
        imageUrl: '/images/tapa_buracos_iguacu_cover_v2.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: '/images/road_repair_pothole_asphalt.png',
        publishDate: '2025-10-25',
        author: 'Redação Municipal'
    },
    {
        id: 11,
        title: 'Guarda Municipal recebe novas viaturas',
        summary: 'Investimento na segurança pública inclui renovação da frota e novos equipamentos de proteção.',
        content: `
            <p>A Guarda Municipal de Araucária recebeu hoje 5 novas viaturas Jeep Commander, totalmente equipadas e blindadas para o patrulhamento ostensivo. Os veículos serão destinados à Ronda Ostensiva Municipal (ROMU), reforçando o combate à criminalidade.</p>
            
            <p>As novas unidades já estão em operação, com foco no patrulhamento escolar nos bairros <strong>Fazenda Velha</strong> e <strong>Capela Velha</strong>, além de reforçar a segurança no comércio da região central durante o horário bancário.</p>

            <h2>Resposta Rápida no Costeira</h2>
            <p>Uma base móvel será instalada rotativamente na região do <strong>Costeira</strong> e <strong>Jardim Tropical</strong>, reduzindo o tempo de resposta a ocorrências nestas localidades. "A presença física da viatura inibe delitos e traz tranquilidade para quem chega do trabalho à noite", afirmou o comandante.</p>
        
        `,
        imageUrl: '/images/gm_viaturas_cover_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/municipal_guard_real.png',
        publishDate: '2025-10-20',
        author: 'Segurança em Pauta'
    },
    {
        id: 12,
        title: 'Hospital Municipal inaugura nova ala pediátrica',
        summary: 'Ampliação promete dobrar a capacidade de atendimento infantil e conta com equipamentos de última geração.',
        content: `
            <p>O Hospital Municipal de Araucária (HMA) inaugurou nesta manhã sua nova ala pediátrica, um marco para a saúde pública da cidade. O espaço, decorado de forma lúdica, conta com 30 novos leitos e equipamentos de UTI neopediátrica de última geração.</p>
            
            <p>A ampliação desafoga o sistema de saúde, evitando que famílias do <strong>Jardim Califórnia</strong> ou <strong>Tindiquera</strong> precisem se deslocar até hospitais da capital em casos de emergência. O atendimento é 100% SUS e funciona 24 horas.</p>

            <h2>Humanização no Atendimento</h2>
            <p>Mais do que estrutura, o foco é o acolhimento. "Uma criança doente fragiliza a família inteira. Aqui, oferecemos não só medicina, mas conforto", diz a diretora clínica. A nova ala já recebe pacientes de bairros distantes como <strong>Guajuvira</strong>, garantindo equidade no acesso à saúde de qualidade.</p>
        
        `,
        imageUrl: '/images/hma_pediatria_cover_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/hospital_pediatric_ward_interior.png',
        publishDate: '2025-10-15',
        author: 'Saúde Agora'
    },
    {
        id: 13,
        title: 'Feira de Robótica reúne estudantes da rede pública',
        summary: 'Alunos apresentaram projetos inovadores focados em sustentabilidade e automação.',
        content: `
            <p>O <strong>Parque Cachoeira</strong> foi palco da 5ª Feira de Robótica e Inovação das escolas municipais. Mais de 50 projetos foram expostos, variando desde braços mecânicos feitos com material reciclável até sistemas de irrigação automatizada para hortas escolares.</p>
            <p>O evento visa estimular o interesse pela ciência e tecnologia desde cedo. Os três melhores projetos receberam kits de programação e uma visita técnica a uma grande indústria de tecnologia da região.</p>
        `,
        imageUrl: '/images/robotics_fair_real_final_v2.webp',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/school_robotics_fair_project.png',
        publishDate: '2025-10-10',
        author: 'EducaTech'
    },
    {
        id: 14,
        title: 'Novo supermercado gera 200 empregos diretos',
        summary: 'Grande rede varejista abre as portas no bairro <strong>Costeira</strong>, movimentando a economia local.',
        content: `
            <p>A economia de Araucária ganhou um reforço importante nesta semana com a inauguração de uma nova unidade de uma grande rede de supermercados no bairro <strong>Costeira</strong>.</p>
            <p>O empreendimento gerou cerca de 200 vagas de emprego direto, priorizando a contratação de moradores da região através do SINE municipal. "É uma oportunidade de primeiro emprego para muitos jovens", comentou o gerente da loja.</p>
        `,
        imageUrl: '/images/supermarket_opening_real_final_v2.webp',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/new_supermarket_interior.png',
        publishDate: '2025-10-05',
        author: 'Economia Local'
    },
    {
        id: 15,
        title: 'Limpeza do Rio Iguaçu retira 5 toneladas de lixo',
        summary: 'Ação voluntária mobilizou comunidade e ONGs ambientais no último fim de semana.',
        content: `
            <p>Um verdadeiro exército de voluntários retirou mais de 5 toneladas de lixo das margens do Rio Iguaçu neste fim de semana. A ação concentrou-se no trecho próximo à <strong>Ponte do Rio Passaúna</strong> e no <strong>Parque Barigui</strong> de Araucária.</p>
            
            <p>Moradores do <strong>Jardim Dalla Torre</strong> e <strong>Estação</strong> participaram ativamente, recolhendo desde garrafas PET até sofás descartados irregularmente. O material reciclável foi destinado à cooperativa de catadores do bairro <strong>Sabiá</strong>, gerando renda para dezenas de famílias.</p>

            <h2>Consciência Ambiental</h2>
            <p>"O rio é nosso. Se a gente não cuidar, quem vai?", questionou uma moradora do <strong>Thomaz Coelho</strong>. A Secretaria de Meio Ambiente anunciou a instalação de ecobarreiras em afluentes no <strong>Capela Velha</strong> para impedir que novos resíduos cheguem ao leito principal do rio.</p>
        
        `,
        imageUrl: '/images/limpeza_rio_iguacu_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/river_cleanup_volunteers.png',
        publishDate: '2025-10-01',
        author: 'EcoAção'
    },
    {
        id: 16,
        title: 'Torneio de Xadrez movimenta o fim de semana',
        summary: 'Competição reuniu enxadristas de todas as idades no <strong>Centro</strong> de Convivência.',
        content: `
            <p>O raciocínio lógico e a estratégia foram os protagonistas no Torneio Municipal de Xadrez, realizado neste sábado. O evento reuniu mais de 80 participantes, divididos em categorias do sub-10 ao veterano.</p>
            <p>O destaque ficou para a jovem promessa local, Ana Clara, de 12 anos, que venceu a categoria sub-14 invicta. "O xadrez ajuda muito na escola e na concentração", disse a campeã.</p>
        `,
        imageUrl: '/images/news_chess_tournament.png',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/news_chess_inner_araucaria.png',
        publishDate: '2025-09-25',
        author: 'Esporte Araucária'
    },
    {
        id: 17,
        title: 'Curso gratuito de qualificação profissional abre inscrições',
        summary: 'Senai e Prefeitura oferecem vagas para cursos na área industrial e administrativa.',
        content: `
            <p>Estão abertas as inscrições para os cursos gratuitos de qualificação profissional oferecidos em parceria entre a Prefeitura de Araucária e o Senai. São 300 vagas distribuídas em cursos de mecânica básica, eletricidade predial e assistente administrativo.</p>
            <p>As aulas iniciam no próximo mês e os interessados devem comparecer à Agência do Trabalhador com documentos pessoais e comprovante de residência. O objetivo é preparar a mão de obra local para as demandas do polo industrial.</p>
        `,
        imageUrl: '/images/vocational_course_real_v2.webp',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/vocational_training_industrial_class.png',
        publishDate: '2025-09-20',
        author: 'Carreira e Futuro'
    },
    {
        id: 18,
        title: 'Rota de Turismo Rural ganha nova sinalização',
        summary: 'Prefeitura instala placas indicativas no Caminho do Vinho e <strong>Guajuvira</strong> para orientar visitantes.',
        content: `
            <p>O Departamento de Turismo iniciou a instalação de novas placas de sinalização turística nas principais rotas rurais do município. A ação visa facilitar o acesso de visitantes aos restaurantes coloniais, vinícolas e chácaras de lazer.</p>
            <p>"Com a sinalização adequada, esperamos um aumento de 30% no fluxo de turistas nos finais de semana", projetou o diretor de turismo. O projeto também inclui mapas digitais acessíveis via QR Code em pontos estratégicos.</p>
            <p>A rota do <strong>Guajuvira</strong> é famosa por suas paisagens bucólicas e pela venda direta de produtos da agricultura familiar, como queijos, salames e doces caseiros.</p>
        `,
        imageUrl: '/images/rural_tourism_signage_araucaria.png',
        mobileImageUrl: '/images/rural_tourism_signage_araucaria_mobile.webp',
        category: 'Turismo',
        categoryColor: 'indigo',
        internalImageUrl: '/images/rural_tourism_signage_araucaria.png',
        publishDate: '2025-09-15',
        author: 'Turismo Araucária'
    },
    {
        id: 19,
        title: 'Startup local desenvolve app para transporte escolar',
        summary: 'Aplicativo criado por jovens araucarienses permite aos pais rastrearem vans escolares em tempo real.',
        content: `
            <p>Uma startup nascida na incubadora do Parque Tecnológico de Araucária lançou o "Van Segura", aplicativo que revoluciona o transporte escolar na cidade. Pais do <strong>Jardim Iguaçu</strong> e <strong>Campina da Barra</strong> agora monitoram o trajeto dos filhos em tempo real.</p>
            
            <p>A tecnologia oferece notificações de embarque e desembarque, trazendo paz de espírito para as famílias. "Eu ficava ansiosa em dias de chuva forte no <strong>Costeira</strong>. Agora vejo a van chegando pelo celular", conta uma mãe usuária do sistema.</p>

            <h2>Tecnologia Local</h2>
            <p>O app já conta com adesão de 80% dos motoristas que atendem as escolas do <strong>Centro</strong> e <strong>Vila Nova</strong>. A inovação mostra o potencial tecnológico da juventude araucariense, criando soluções locais para problemas reais da nossa comunidade.</p>
        
        `,
        imageUrl: '/images/startup_app_cover_v2.png',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        internalImageUrl: '/images/school_transport_app_araucaria.png',
        publishDate: '2025-09-10',
        author: 'Inovação Tech'
    },
    {
        id: 20,
        title: 'Praça da Bíblia recebe nova iluminação em LED',
        summary: 'Revitalização do espaço público garante mais segurança e lazer para as famílias à noite.',
        content: `
            <p>Quem passa pela Praça da Bíblia à noite já percebe a diferença. A Prefeitura concluiu nesta semana a instalação do novo sistema de iluminação em LED em todo o perímetro da praça.</p>
            <p>"Agora dá para trazer as crianças para brincar com tranquilidade", elogiou uma moradora local. Além das novas luminárias, o paisagismo foi recuperado e bancos foram reformados.</p>
            <p>O projeto faz parte do programa "Cidade Iluminada", que prevê a modernização da iluminação pública em diversos bairros.</p>
        `,
        imageUrl: '/images/plaza_bible_lighting_night.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/plaza_bible_internal_real.jpg',
        publishDate: '2025-09-05',
        author: 'Redação Municipal'
    },
    {
        id: 21,
        title: 'Hackathon Municipal reúne 500 jovens programadores',
        summary: 'Maratona de 48h no Parque Tecnológico cria soluções reais e conecta talentos locais ao Polo Industrial.',
        content: `
            <p>O ronco dos servidores se misturou ao cheiro de café e pizza durante as 48 horas ininterruptas do 1º Hackathon Municipal de Araucária. O evento, sediado no Parque Tecnológico, transformou o local em um verdadeiro Vale do Silício paranaense, reunindo 500 mentes brilhantes de escolas como <strong>IFPR</strong>, <strong>Unifacear</strong> e colégios estaduais do <strong>Centro</strong> e <strong>Fazenda Velha</strong>.</p>
            
            <p>O desafio era criar soluções tecnológicas para dores reais da cidade. A equipe vencedora, formada por jovens do bairro <strong>Costeira</strong>, desenvolveu o "Recicla+", um app que gamifica a coleta seletiva e troca pontos por descontos no comércio local. "A gente queria algo que ajudasse nossa vizinhança a manter as ruas limpas", explicou Lucas, 17 anos, líder do time campeão.</p>

            <h3>Vitrine de Talentos</h3>
            <p>Além do prêmio em dinheiro, o evento serviu como uma poderosa vitrine profissional. Grandes empresas do <strong>Polo Industrial</strong> (CIAR) marcaram presença como "olheiros", e pelo menos 50 participantes saíram de lá com propostas de estágio ou emprego. É Araucária deixando de ser apenas cidade operária para se tornar um polo de inteligência e inovação.</p>
        `,
        imageUrl: '/images/hackathon_real_final_v2.png',
        mobileImageUrl: '/images/hackathon_real_final_v2_mobile.webp',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        internalImageUrl: '/images/news_hackathon_coding.png',
        publishDate: '2025-09-01',
        author: 'Tech News'
    },
    {
        id: 22,
        title: 'Sítio Ecológico abre novas trilhas para ecoturismo',
        summary: 'Propriedade rural em <strong>Guajuvira</strong> aposta no turismo de natureza e observação de aves.',
        content: `
            <p>O Sítio Ecológico, localizado na área rural de <strong>Guajuvira</strong>, inaugurou três novas trilhas interpretativas abertas ao público. O espaço se consolida como principal destino de ecoturismo para famílias de Araucária e região.</p>
            
            <p>Os trajetos, que variam de 2km a 5km, passam por áreas preservadas de Mata Atlântica e Araucárias centenárias. Visitantes do <strong>Centro</strong> e <strong>Boqueirão</strong> têm lotado o local nos finais de semana, buscando contato com a natureza sem precisar viajar longe.</p>

            <h2>Desenvolvimento Rural</h2>
            <p>O turismo ecológico movimenta a economia local. Produtores de <strong>Roça Nova</strong> e <strong>Campestre</strong> vendem queijos, vinhos e geleias na entrada do parque, gerando renda extra. "É o turismo sustentável valorizando o homem do campo", afirma o secretário de turismo.</p>
        `,
        imageUrl: '/images/sitio_ecologico_trilhas_cover_v2.jpg',
        category: 'Turismo',
        categoryColor: 'indigo',
        publishDate: '2025-08-25',
        author: 'Jornal do Campo'
    },
    {
        id: 23,
        title: 'Araucária recebe etapa decisiva do Paranaense de Futsal',
        summary: 'Ginásio Joval de Paula Souza promete virar caldeirão neste sábado; vitória garante vaga nas quartas.',
        content: `
            <p>O <strong>Parque Cachoeira</strong> vai tremer neste fim de semana. O Araucária Futsal entra em quadra no Ginásio Joval de Paula Souza para uma das partidas mais importantes do ano pelo Campeonato Paranaense Série Prata. A equipe da casa precisa de uma vitória simples para garantir a classificação antecipada para os playoffs.</p>
            
            <p>A diretoria espera lotação máxima. "A torcida de Araucária nunca decepciona. Quando o ginásio lota, vira o sexto jogador", convoca o capitão do time. Caravanas do <strong>Jardim Industrial</strong> e <strong>Costeira</strong> já organizaram um "corredor de fogo" para recepcionar o ônibus dos atletas na chegada.</p>

            <h3>Ingresso Solidário</h3>
            <p>Para democratizar o acesso, a entrada será mediante a doação de 1kg de alimento não perecível. Tudo o que for arrecadado será destinado ao Provopar Municipal. É a união da paixão pelo esporte com a solidariedade que marca a nossa gente.</p>
        `,
        imageUrl: '/images/araucaria_futsal_cover_v1.png',
        mobileImageUrl: '/images/araucaria_futsal_cover_v1_mobile.webp',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/araucaria_futsal_real.jpg',
        publishDate: '2025-08-20',
        author: 'Esporte News'
    },
    {
        id: 24,
        title: 'Campanha do Agasalho arrecada 2 toneladas de doações',
        summary: 'Solidariedade marcou o inverno em Araucária com recorde de arrecadação.',
        content: `
            <p>O Provopar de Araucária divulgou o balanço final da Campanha do Agasalho deste ano. Foram arrecadadas cerca de 2 toneladas de roupas e cobertores, que já foram distribuídos para famílias em situação de vulnerabilidade.</p>
            <p>A campanha contou com pontos de coleta em comércios, escolas e empresas da cidade.</p>
        `,
        imageUrl: '/images/winter_clothing_drive_real_v2.webp',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/campanha_agasalho_internal.jpg',
        publishDate: '2025-08-15',
        author: 'Social Araucária'
    },
    {
        id: 25,
        title: 'Novo binário no <strong>Centro</strong> melhora fluxo de veículos',
        summary: 'Mudanças no trânsito das ruas Victor do Amaral e São Vicente agradam motoristas.',
        content: `
            <p>Após uma semana de implantação, o novo binário no centro de Araucária já apresenta resultados positivos. O tempo médio de deslocamento nos horários de pico reduziu em 15%, segundo dados do Departamento de Trânsito.</p>
            <p>A obra incluiu nova sinalização semafórica e faixas exclusivas para conversão.</p>
        `,
        imageUrl: '/images/binario_centro_cover.webp',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: '/images/binario_centro_internal.jpg',
        publishDate: '2025-08-10',
        author: 'Trânsito Seguro'
    },
    {
        id: 26,
        title: 'Festival Gastronômico de Inverno começa hoje',
        summary: 'Restaurantes da cidade oferecem pratos especiais com descontos exclusivos.',
        content: `
            <p>Começou hoje o 3º Festival Gastronômico de Inverno de Araucária. Durante os próximos 15 dias, 20 restaurantes participantes oferecerão um menu especial com entrada, prato principal e sobremesa a preço fixo.</p>
            <p>O objetivo é valorizar a culinária local e aquecer o comércio durante a estação mais fria do ano.</p>
        `,
        imageUrl: '/images/gastronomic_festival_real_final_v2.webp',
        category: 'Cultura',
        categoryColor: 'yellow',
        internalImageUrl: '/images/festival_gastronomico_internal.jpg',
        publishDate: '2025-08-05',
        author: 'Roteiro Gourmet'
    },
    {
        id: 27,
        title: 'Escolas municipais recebem lousas digitais',
        summary: 'Tecnologia chega à sala de aula para modernizar o ensino em Araucária.',
        content: `
            <p>A educação pública de Araucária está passando por uma revolução tecnológica silenciosa, mas visível aos olhos atentos dos alunos. A Secretaria Municipal de Educação (SMED) concluiu nesta semana a primeira fase da instalação de lousas digitais interativas em todas as salas de aula do ensino fundamental da rede municipal.</p>

            <p>O investimento, que ultrapassa a casa dos R$ 2 milhões, visa modernizar o processo de ensino-aprendizagem e preparar os estudantes para um mundo cada vez mais conectado. "Não é apenas uma tela grande; é uma janela para o mundo. O professor pode, em tempo real, sair de uma explicação teórica sobre geografia e 'viajar' com os alunos pelo Google Earth, ou mostrar a anatomia do corpo humano em 3D", explica a Secretária de Educação.</p>

            <h3>Tecnologia em Sala de Aula</h3>
            <p>Os novos equipamentos possuem tela touch screen de 75 polegadas, sistema de som integrado e conexão de alta velocidade com a internet. Diferente do quadro-negro tradicional, onde o conteúdo é apagado ao fim da aula, na lousa digital tudo pode ser salvo e enviado para o tablet ou celular dos alunos, facilitando a revisão em casa.</p>

            <p>Para a professora Helena Bastos, da Escola Municipal Marcelino Champagnat, a mudança foi drástica. "No começo ficamos receosos com a tecnologia, mas o engajamento das crianças aumentou muito. Eles pararam de copiar passivamente e começaram a interagir com o conteúdo. A aula de história, que antes era só texto, agora tem documentários e mapas interativos", relata.</p>

            <h3>Formação Continuada</h3>
            <p>A entrega dos equipamentos veio acompanhada de um intenso cronograma de treinamento para os docentes. Durante o último mês, mais de 400 professores da rede passaram por oficinas de capacitação para aprender a extrair o máximo das novas ferramentas.</p>

            <p>"A tecnologia pela tecnologia não resolve o problema da educação. O que faz a diferença é o professor mediando esse uso. Por isso, o foco não foi apenas na compra do hardware, mas na formação humana", reforça a equipe pedagógica da SMED.</p>

            <p>A previsão é que até o final do ano letivo, 100% das turmas, incluindo a educação infantil, já contem com o recurso em pleno funcionamento.</p>
        `,
        imageUrl: '/images/lousas_digitais_capa_final.png?v=final', // Cache buster adicionado para travar a imagem nova
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/lousas_digitais_real.png', // Mantendo a interna anterior (foto real)
        publishDate: '2025-08-01',
        author: 'EducaTech'
    },
    {
        id: 28,
        title: 'Empresa de logística abre 50 vagas de emprego',
        summary: 'Oportunidades são para motoristas, conferentes e auxiliares administrativos.',
        content: `
            <p>A manhã desta sexta-feira foi movimentada no pátio logístico próximo à Rodovia do Xisto. Em parceria com o SINE Araucária, uma das maiores operadoras de transportes da região iniciou um mutirão para o preenchimento imediato de 50 vagas de emprego.</p>

            <p>A ação faz parte do plano de expansão da empresa para atender o aumento da demanda no segundo semestre. As oportunidades são para diversos níveis de escolaridade, incluindo cargos de <strong>Conferente, Operador de Empilhadeira, Motorista Categoria D/E e Auxiliar Administrativo</strong>.</p>

            <h3>Prioridade para Bairros Adjacentes</h3>
            <p>Um dos diferenciais deste processo seletivo é a valorização da mão de obra local. O RH da empresa confirmou que haverá prioridade de contratação para moradores de bairros adjacentes ao complexo logístico, especificamente <strong>Campina da Barra, Jardim Tupy, Costeira e Thomaz Coelho</strong>.</p>
            <p>"Queremos que nosso colaborador <strong>trabalhe perto de casa</strong>. Isso reduz o tempo de deslocamento, melhora a qualidade de vida e fortalece a economia do bairro", afirmou o gerente de operações durante a abertura do portão.</p>

            <h3>Benefícios Regionalizados</h3>
            <p>Além do salário compatível com a categoria, a empresa anunciou um pacote de benefícios focado na realidade local:</p>
            <ul>
                <li>Vale-Alimentação/Refeição com valor acima da média;</li>
                <li>Transporte Fretado (rota exclusiva pelos bairros citados);</li>
                <li>Plano de Saúde e Odontológico extensivo a dependentes;</li>
                <li><strong>Parcerias Regionais:</strong> Descontos em farmácias e supermercados de Araucária.</li>
            </ul>

            <p>Os interessados que não puderam comparecer hoje ainda podem enviar currículo pelo site oficial da empresa ou entregar pessoalmente na Agência do Trabalhador (SINE) de Araucária até a próxima quarta-feira.</p>
        `,
        imageUrl: '/images/logistica_vagas_internal.jpg', // Capa mantida
        category: 'Economia',
        categoryColor: 'blue',
        internalImageUrl: '/images/logistica_vagas_real.png', // Imagem interna atualizada (foto real)
        publishDate: '2025-07-25',
        author: 'Vagas & Oportunidades'
    },
    {
        id: 29,
        title: 'Araucária investe em iluminação LED nos bairros',
        summary: 'Mais econômicas e eficientes, novas lâmpadas transformam a segurança e a visibilidade noturna no Capela Velha.',
        content: `
            <p>O programa "Araucária Mais Iluminada" avança a passos largos. Nesta semana, equipes da Prefeitura iniciaram a substituição massiva das antigas lâmpadas de vapor de sódio (amarelas) por modernas luminárias de LED no bairro <strong>Capela Velha</strong>. A mudança não é apenas estética; representa uma revolução na segurança e economia.</p>
            
            <p>Segundo a Secretaria de Urbanismo, a tecnologia LED oferece uma luminosidade até 50% superior, eliminando "pontos de sombra" nas calçadas. "Para quem chega do trabalho tarde da noite ou para os estudantes que voltam da faculdade, a sensação de segurança muda completamente. A rua fica clara como o dia", explica o engenheiro responsável.</p>

            <h3>Impacto Regional</h3>
            <p>Além do <strong>Capela Velha</strong>, o cronograma prevê a extensão das melhorias para o <strong>Jardim Jatobá</strong> e <strong>Jardim Plínio</strong> já no próximo mês. A modernização também gera uma economia de até 60% na conta de luz pública, recursos que poderão ser reinvestidos em outras áreas prioritárias como a pavimentação.</p>
        `,
        imageUrl: '/images/iluminacao_led_cover.png',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        internalImageUrl: '/images/iluminacao_led_internal.jpg',
        publishDate: '2025-07-20',
        author: 'Cidade Luz'
    },
    {
        id: 30,
        title: 'Biblioteca Municipal promove feira de troca de livros',
        summary: 'Evento "Troca Literária" incentiva a renovação de estantes e o debate cultural na comunidade.',
        content: `
            <p>Os amantes da literatura têm um encontro marcado neste sábado na Biblioteca Pública de Araucária. A tradicional "Feira de Troca de Livros" chega à sua 15ª edição com uma proposta renovada: fomentar o hábito da leitura física em tempos de telas digitais.</p>
            
            <p>A dinâmica é democrática: basta levar um livro de literatura em bom estado e trocar (um por um) por qualquer outro título disponível nas bancas. "É uma forma sustentável de renovar a biblioteca pessoal sem gastar nada. O livro que está parado na sua estante pode ser a grande descoberta de outra pessoa", convida a bibliotecária-chefe.</p>

            <h3>Cultura que Movimenta o Centro</h3>
            <p>O evento promete movimentar o entorno da biblioteca, atraindo leitores do <strong>Centro</strong>, <strong>Estação</strong> e até estudantes de escolas do <strong>Fazenda Velha</strong>. Além das trocas, haverá "Contação de Histórias" para as crianças e um espaço dedicado a autores locais, valorizando a produção literária araucariense.</p>
        `,
        imageUrl: '/images/feira_livros_cover.png',
        category: 'Cultura',
        categoryColor: 'yellow',
        internalImageUrl: '/images/feira_livros_internal_real.jpg',
        publishDate: '2025-07-15',
        author: 'Cultura Viva'
    },
    {
        id: 31,
        title: 'Dia D de vacinação pet acontece neste domingo',
        summary: 'Mutirão na Praça da Bíblia espera imunizar mais de 2 mil cães e gatos contra a raiva.',
        content: `
            <p>A proteção dos nossos melhores amigos é prioridade neste fim de semana. A Secretaria de Meio Ambiente e o Centro de Controle de Zoonoses realizam o "Dia D da Vacinação Antirrábica", um super mutirão para garantir que cães e gatos de Araucária fiquem protegidos contra a raiva, uma doença fatal e transmissível aos humanos.</p>
            
            <p>A estrutura será montada na Praça da Bíblia, e o atendimento vai das 9h às 17h, sem intervalo. Veterinários voluntários estarão a postos para aplicar as doses e tirar dúvidas dos tutores sobre saúde animal.</p>

            <h3>Domingo Pet Friendly</h3>
            <p>A expectativa é que famílias inteiras, vindas principalmente do <strong>Fazenda Velha</strong>, <strong>Cachoeira</strong> e <strong>Sabiá</strong>, aproveitem o domingo de sol para levar seus pets. "Vira um evento de socialização. Enquanto os bichinhos são vacinados, os vizinhos se encontram e trocam experiências", comenta o coordenador da ação. É obrigatório o uso de guias para cães e caixas de transporte para gatos.</p>
        `,
        imageUrl: '/images/vacinacao_pet_cover.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/vacinacao_pet_internal.png',
        publishDate: '2025-07-10',
        author: 'Saúde Animal'
    },
    {
        id: 32,
        title: 'Feira do Produtor ganha nova cobertura',
        summary: 'Investimento garante dignidade aos agricultores e conforto para clientes em dias de chuva.',
        content: `
            <p>Adeus às lonas improvisadas e ao "abre e fecha" de guarda-sóis. A tradicional Feira do Produtor de Araucária, realizada às quartas e sábados, inaugurou sua nova estrutura de cobertura metálica fixa. A obra, reivindicação de décadas dos agricultores familiares, transforma o espaço em um verdadeiro mercado gastronômico a céu aberto.</p>
            
            <p>"Antes, se chovia, a gente perdia a mercadoria e o cliente sumia. Agora, temos dignidade para trabalhar faça chuva ou faça sol", comemorou Seu João, produtor de hortaliças que vem do <strong>Guajuvira</strong> há mais de 20 anos.</p>

            <h3>Do Campo para a Cidade</h3>
            <p>A melhoria beneficia diretamente produtores de áreas rurais como <strong>Roça Nova</strong>, <strong>Campestre</strong> e <strong>Tietê</strong>, fortalecendo a economia local. Para o consumidor do <strong>Centro</strong> e bairros vizinhos, a nova estrutura convida a permanecer mais tempo na feira, saboreando o tradicional pastel com caldo de cana e comprando produtos frescos direto da fonte.</p>
        `,
        imageUrl: '/images/feira_produtor_roof_cover.png',
        category: 'Economia',
        categoryColor: 'indigo',
        internalImageUrl: '/images/feira_produtor_roof_internal.png',
        publishDate: '2025-07-05',
        author: 'Agro Araucária'
    },
    {
        id: 33,
        title: 'Coral Municipal abre audições para novas vozes',
        summary: 'Casa da Cultura busca talentos de todos os bairros para integrar o coro oficial da cidade.',
        content: `
            <p>Se você canta no chuveiro ou na igreja do bairro, chegou a sua hora de brilhar nos palcos. O Coral Municipal de Araucária está com inscrições abertas para novos integrantes. A iniciativa busca democratizar o acesso à música erudita e popular, recrutando talentos brutos para lapidação profissional.</p>
            
            <p>"Não exigimos leitura de partitura, apenas afinação e vontade de aprender. Temos grandes vozes escondidas no <strong>Jardim Califórnia</strong>, no <strong>Boqueirão</strong>... queremos essa diversidade no nosso coro", afirma o maestro regente. Os ensaios acontecem semanalmente na Casa da Cultura, um espaço histórico recentemente revitalizado.</p>

            <h3>Representatividade</h3>
            <p>O grupo, que representa a cidade em festivais estaduais e nacionais, é um orgulho local. Participar do coral é também uma oportunidade de viajar e levar o nome de Araucária para outros palcos, fortalecendo a identidade cultural do município através da arte.</p>
        `,
        imageUrl: '/images/coral_municipal_cover.png',
        category: 'Cultura',
        categoryColor: 'indigo',
        internalImageUrl: '/images/coral_municipal_internal_v2.png',
        publishDate: '2025-07-01',
        author: 'Cultura Viva'
    },
    {
        id: 34,
        title: 'Parque Cachoeira recebe mutirão de limpeza',
        summary: 'Ação "Eu Amo, Eu Cuido" mobiliza voluntários e escoteiros pela preservação do parque.',
        content: `
            <p>Um exército verde tomou conta do <strong>Parque Cachoeira</strong> neste domingo. Mais de 100 voluntários, incluindo grupos de escoteiros do <strong>Vila Nova</strong> e <strong>Iguaçu</strong>, participaram do mutirão "Eu Amo, Eu Cuido". A ação foi muito além da coleta de lixo: foi uma aula prática de cidadania e pertencimento.</p>
            
            <p>Foram recolhidos cerca de 200kg de resíduos deixados por visitantes, mas o foco principal foi o plantio de 200 mudas de árvores nativas nas margens do lago, recompondo a mata ciliar. "O parque é o quintal da nossa casa. Se a gente não cuidar, quem vai?", questionou Ana, estudante de 16 anos que participou pela primeira vez.</p>

            <h3>Turismo Sustentável</h3>
            <p>A conservação do Parque Cachoeira é vital para o turismo local. O espaço recebe milhares de visitantes da região metropolitana aos fins de semana, movimentando o comércio de lanches e sorvetes no entorno. Manter o parque limpo é manter a economia do turismo girando.</p>
        `,
        imageUrl: '/images/parque_cachoeira_cleanup_cover.png',
        category: 'Cidade',
        categoryColor: 'green',
        internalImageUrl: '/images/parque_cachoeira_internal_v2.png',
        publishDate: '2025-06-25',
        author: 'EcoAção'
    },
    {
        id: 35,
        title: 'Araucária sedia encontro de carros antigos',
        summary: 'Relíquias sobre rodas transformam o Centro Cívico em um museu a céu aberto.',
        content: `
            <p>Uma verdadeira viagem no tempo estacionou no <strong>Centro Cívico</strong> neste fim de semana. O 5º Encontro de Carros Antigos de Araucária superou todas as expectativas, reunindo mais de 300 veículos clássicos, desde Fordinhos 1929 até Opalas e Mavericks que marcaram época nas décadas de 70 e 80.</p>
            
            <p>O evento atraiu colecionadores de Santa Catarina e São Paulo, lotando os hotéis da cidade. "O antigomobilismo é uma paixão que move a economia. O colecionador vem com a família, se hospeda, almoça na churrascaria... é dinheiro novo entrando na cidade", analisa o secretário de Turismo.</p>

            <h3>Paixão Local</h3>
            <p>Clubes locais, como o organizado por moradores do <strong>Porto das Laranjeiras</strong>, tiveram destaque especial, exibindo restaurações impecáveis feitas nas garagens de Araucária. O evento contou ainda com um "mercado de pulgas" para venda de peças raras, atraindo mecânicos e restauradores de toda a região.</p>
        `,
        imageUrl: '/images/carros_antigos_cover.png',
        category: 'Cultura',
        categoryColor: 'yellow',
        internalImageUrl: '/images/carros_antigos_internal_v2.png',
        publishDate: '2025-06-20',
        author: 'Motor News'
    },
    {
        id: 36,
        title: 'Prefeitura alerta para o prazo do IPTU',
        summary: 'Investimento revertido: entenda como o imposto se transforma em obras nos bairros.',
        content: `
            <p>A Secretaria de Finanças emitiu um alerta importante: o prazo para pagamento da cota única do IPTU, com desconto de 15%, encerra-se no próximo dia 10. Embora o tema tributário seja árido, é fundamental entender o destino desses recursos.</p>
            
            <p>"O IPTU não é apenas uma cobrança, é o combustível das melhorias. O asfalto novo que chegou no <strong>Jardim Costeira</strong> e a reforma da creche no <strong>Tupy</strong> foram pagos diretamente com esse dinheiro", explica a secretária da pasta.</p>

            <h3>Facilidade Digital</h3>
            <p>Para evitar filas na Prefeitura, o contribuinte pode emitir a guia diretamente pelo aplicativo "Araucária Digital" ou pelo site oficial. A inadimplência reduz a capacidade de investimento da cidade, por isso, manter o imposto em dia é um ato de cidadania que volta em forma de qualidade de vida para o seu próprio bairro.</p>
        `,
        imageUrl: '/images/iptu_real_final_v2.png',
        category: 'Cidade',
        categoryColor: 'blue',
        internalImageUrl: '/images/iptu_real_queue_final.jpg',
        publishDate: '2025-02-05',
        author: 'Finanças em Dia'
    },
    {
        id: 37,
        title: 'Novos horários de ônibus começam a valer segunda-feira',
        summary: 'CMTC amplia frota nas linhas Tupy e Costeira para reduzir lotação nos horários de pico.',
        content: `
            <p>A partir desta segunda-feira, quem utiliza o transporte coletivo para trabalhar ou estudar sentirá a diferença. A CMTC anunciou um reforço estratégico na frota das linhas <strong>Tupy/Pinheiros</strong> e <strong>Costeira/D.E.R</strong>, historicamente as mais carregadas nos horários de pico.</p>
            
            <p>A medida adiciona quatro novos veículos articulados no "entre-picos" (das 17h às 19h), visando reduzir a lotação e oferecer mais dignidade ao trabalhador que retorna para casa. "A gente viajava espremido na porta. Agora, com ônibus a cada 10 minutos, a expectativa é conseguir ir sentado", comenta Maria de Lurdes, moradora do <strong>Jardim Tupy</strong> e usuária diária.</p>

            <h3>Integração Inteligente</h3>
            <p>Outra novidade é a sincronização com os tubos da linha metropolitana em direção a Curitiba. O objetivo é diminuir o tempo de espera na conexão do Terminal Central, beneficiando centenas de estudantes universitários que se deslocam para a capital à noite.</p>
        `,
        imageUrl: '/images/bus_schedule_main.png',
        category: 'Cidade',
        categoryColor: 'gray',
        internalImageUrl: '/images/bus_schedule_real_final_v5.png',
        publishDate: '2025-01-20',
        author: 'Mobilidade Urbana'
    },
    {
        id: 38,
        title: 'Semana do Meio Ambiente terá oficinas e palestras',
        summary: 'Ações no Parque Tecnológico ensinam compostagem e cultivo em pequenos espaços.',
        content: `
            <p>Transformar a sacada do apartamento em uma mini-horta produtiva. Esse é um dos desafios propostos nas oficinas da Semana do Meio Ambiente de Araucária, que acontece no Parque Tecnológico. O evento busca traduzir a sustentabilidade para a prática diária do cidadão comum.</p>
            
            <p>Além das oficinas de compostagem doméstica (transformar lixo orgânico em adubo), haverá distribuição gratuita de 500 mudas de árvores nativas, incluindo a Araucária angustifolia, símbolo da nossa terra. "Plantar uma árvore é deixar um legado para os netos que nem nasceram", filosofa Seu Antônio, aposentado do <strong>Thomaz Coelho</strong> que garantiu sua muda de ipê-amarelo.</p>
        `,
        imageUrl: '/images/environment_week_collage.webp',
        category: 'Cidade',
        categoryColor: 'green',
        internalImageUrl: '/images/environment_week_real_final_v1.jpg',
        publishDate: '2025-06-05',
        author: 'EcoNews'
    },
    {
        id: 39,
        title: 'Araucária Vôlei vence mais uma na Superliga B',
        summary: 'Ginásio do Parque Cachoeira vira caldeirão e empurra time da casa para a liderança.',
        content: `
            <p>Não foi apenas um jogo, foi uma catarse coletiva. Em uma noite eletrizante no Ginásio Joval de Paula Souza, o Araucária Vôlei atropelou o adversário por 3 sets a 1, mantendo a invencibilidade na Superliga B. O destaque, no entanto, veio das arquibancadas.</p>
            
            <p>Caravanas organizadas de bairros como <strong>Tindiquera</strong>, <strong>Califórnia</strong> e <strong>Jardim Industrial</strong> transformaram o ginásio em um caldeirão ensurdecedor. "A torcida joga junto. Quando o adversário vai sacar e ouve esse barulho, a perna treme", admitiu o capitão do time, eleito o melhor da partida.</p>

            <h3>Orgulho da Cidade</h3>
            <p>O sucesso do time profissional contagia a base. As escolinhas de vôlei do município, nos núcleos do <strong>CSU</strong> e <strong>Tayrá</strong>, registraram aumento de 40% nas matrículas. O esporte se consolida como ferramenta de inclusão e orgulho para o araucariense.</p>
        `,
        imageUrl: '/images/araucaria_volei_new_final.jpg',
        mobileImageUrl: '/images/araucaria_volei_new_final.jpg',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/araucaria_volei_inner_v2.jpg',
        publishDate: '2025-03-15',
        author: 'Esporte News'
    },
    {
        id: 40,
        title: 'Curso de culinária saudável forma primeira turma',
        summary: 'Projeto "Cozinha e Saúde" capacita mulheres do Capela Velha para o empreendedorismo.',
        content: `
            <p>Cheiro de bolo, tempero fresco e, principalmente, de oportunidade. Ontem foi noite de formatura para as 20 alunas do projeto "Cozinha e Saúde", focado em moradoras do bairro <strong>Capela Velha</strong> em busca de recolocação profissional.</p>
            
            <p>Mais do que receitas fit ou técnicas de corte, o curso ensinou precificação, marketing digital e higiene sanitária. "Eu fazia marmita, mas não sabia cobrar. Agora tenho meu negócio organizado e vendo pelo Instagram", conta orgulhosa a formanda Solange. O projeto une saúde pública e geração de renda na ponta.</p>
        `,
        imageUrl: '/images/healthy_cooking_cover_araucaria_v3.png',
        mobileImageUrl: '/images/healthy_cooking_cover_araucaria_v3_mobile.png',
        category: 'Cidade',
        categoryColor: 'red',
        internalImageUrl: '/images/healthy_cooking_real_final_v1.jpg',
        publishDate: '2025-03-10',
        author: 'Cidadania Ativa'
    },
    {
        id: 41,
        title: 'Inscrições abertas para o concurso de fotografia',
        summary: 'Tema "Olhares sobre Araucária" convida fotógrafos a redescobrir a beleza do cotidiano.',
        content: `
            <p>Qual é o ângulo mais bonito da nossa cidade? O nascer do sol na Represa do Passaúna? A arquitetura polonesa do <strong>Guajuvira</strong>? O movimento frenético da Avenida Victor do Amaral? O 10º Concurso Municipal de Fotografia quer responder a essa pergunta através das lentes dos moradores.</p>
            
            <p>Com prêmios que chegam a R$ 2 mil, o concurso é dividido em categorias amador e profissional. As 30 melhores imagens farão parte de uma exposição itinerante que percorrerá escolas e terminais de ônibus, levando arte para o dia a dia da população.</p>
        `,
        imageUrl: '/images/photography_contest_cover_real_final.webp',
        category: 'Cultura',
        categoryColor: 'indigo',
        internalImageUrl: '/images/photography_contest_camera_internal.jpg',
        publishDate: '2025-03-01',
        author: 'Arte em Foco'
    },
    {
        id: 42,
        title: 'UBS do Califórnia terá horário estendido',
        summary: 'Atendimento noturno até as 22h beneficia trabalhadores que não podem faltar ao serviço.',
        content: `
            <p>Uma reivindicação antiga dos moradores do <strong>Jardim Califórnia</strong> finalmente foi atendida. A partir do dia 1º, a Unidade Básica de Saúde (UBS) local passará a funcionar no modelo "Saúde na Hora", estendendo o atendimento até as 22h.</p>
            
            <p>A medida é vital para quem trabalha em horário comercial na zona industrial e não consegue ir ao médico sem perder dia de serviço. Serão ofertadas consultas médicas, odontológicas, coleta de exames e sala de vacinação no período noturno, garantindo acesso pleno à saúde para a classe trabalhadora da região.</p>
        `,
        imageUrl: '/images/ubs_california_night_cover.png',
        mobileImageUrl: '/images/ubs_california_night_cover.png', // Fallback explícito
        category: 'Saúde',
        categoryColor: 'blue',
        internalImageUrl: '/images/ubs_california_night_cover.png',
        publishDate: '2025-02-20',
        author: 'Saúde Agora'
    },
    {
        id: 43,
        title: 'Festa Junina das escolas municipais reúne famílias',
        summary: 'Arraiás levam cor, dança e tradição para os bairros, integrando escola e comunidade.',
        content: `
            <p>Não faltou quentão (sem álcool!), pipoca e muito xadrez nas escolas municipais neste sábado. O tradicional "Arraiá da Educação" mobilizou todas as unidades da rede em uma grande celebração da cultura caipira.</p>
            
            <p>No <strong>CAIC</strong>, a festa reuniu mais de 3 mil pessoas. A renda das barracas, comandadas por pais voluntários, tem destino certo: será reinvestida na compra de equipamentos de som e jogos pedagógicos para os alunos. "A escola viva é isso: portão aberto e comunidade dentro", celebrou a diretora.</p>
        `,
        imageUrl: '/images/festa_junina_real_cover.webp',
        category: 'Educação',
        categoryColor: 'red',
        internalImageUrl: '/images/festa_junina_inner_real_final.jpg',
        publishDate: '2025-06-24',
        author: 'Educação Viva'
    },
    {
        id: 44,
        title: 'Câmara homenageia pioneiros da cidade',
        summary: 'Sessão solene reconhece a história de quem construiu Araucária com suor e trabalho.',
        content: `
            <p>A emoção tomou conta do plenário da Câmara Municipal na noite de ontem. Cinco personalidades históricas receberam o título de Cidadão Benemérito, a mais alta honraria do legislativo. Entre os homenageados, Dona Iracema, parteira que trouxe ao mundo centenas de araucarienses no <strong>Centro</strong> antigo, e Seu Mário, comerciante decano do <strong>Estação</strong>.</p>
            
            <p>"Uma cidade sem memória é uma cidade sem alma. Reconhecer o suor desses pioneiros é inspirar as novas gerações a continuarem construindo nosso futuro", discursou o presidente da Casa. A cerimônia contou com a presença de familiares e autoridades.</p>
        `,
        imageUrl: '/images/pioneers_homage_real_final_v2.png',
        category: 'Cidade',
        categoryColor: 'gold',
        internalImageUrl: '/images/pioneers_homage_inner_real_final.jpg',
        publishDate: '2025-01-15',
        author: 'Memória Viva'
    },
    {
        id: 45,
        title: 'Jogos Escolares de Araucária começam nesta sexta',
        summary: 'Ginásio do CSU recebe a tocha olímpica e dá início à maior competição estudantil da cidade.',
        content: `
            <p>O espírito olímpico já está no ar. Mais de 2 mil alunos-atletas de escolas públicas e particulares se reúnem nesta sexta-feira no Ginásio do <strong>CSU</strong> para a abertura oficial dos Jogos Escolares de Araucária (JEA).</p>
            
            <p>Serão 10 dias de competições em modalidades como futsal, vôlei, basquete e atletismo. Além das medalhas, está em jogo a vaga para a fase regional. "O esporte ensina ganhar e perder, ensina respeito. É a sala de aula mais dinâmica que existe", afirma o Secretário de Esportes. A entrada para assistir aos jogos é gratuita em todos os ginásios.</p>
        `,
        imageUrl: '/images/jea_real_final_v2.webp',
        category: 'Esporte',
        categoryColor: 'green',
        internalImageUrl: '/images/school_games_torch_internal.jpg',
        publishDate: '2025-02-25',
        author: 'Esporte na Escola'
    }
];

export const events: Event[] = [
    {
        id: 1,
        title: 'Festa do Pêssego',
        description: 'A tradicional celebração da colheita com a melhor gastronomia polonesa e shows regionais.',
        imageUrl: '/images/festa_pessego_real.webp',
        date: getUpcomingDate(5), // Daqui a 5 dias (Futuro)
        time: '18:00 - 23:00',
        location: '<strong>Parque Cachoeira</strong>'
    },
    {
        id: 2,
        title: 'Feira Gastronômica Noturna',
        description: 'Pastel, pierogi e food trucks na praça central. Traga sua família!',
        imageUrl: '/images/feira_gastronomica_event_cover.jpg',
        date: getUpcomingDate(2), // Daqui a 2 dias (Futuro Próximo)
        time: '18:00 - 22:00',
        location: 'Praça Central'
    },
    {
        id: 3,
        title: 'Concerto no Teatro da Praça',
        description: 'Apresentação especial da orquestra municipal com clássicos e música popular brasileira.',
        imageUrl: '/images/coral_municipal_internal_v2.png',
        date: getUpcomingDate(7), // Daqui a uma semana (Futuro)
        time: '19:30',
        location: 'Teatro da Praça'
    },
    {
        id: 4,
        title: 'Bazar Beneficente da APAE',
        description: 'Grande bazar com roupas, calçados e utensílios a preços acessíveis. Toda a renda será revertida para a instituição.',
        imageUrl: '/images/bazar_apae_event.png',
        date: getUpcomingDate(10),
        time: '09:00 - 17:00',
        location: 'Salão Paroquial Matriz'
    },
    {
        id: 5,
        title: 'Final do Campeonato Amador de Futebol',
        description: 'A grande decisão do campeonato varzeano de Araucária. Venha torcer pelo seu time do bairro!',
        imageUrl: '/images/araucaria_ec_jogo.webp',
        date: getUpcomingDate(14),
        time: '15:30',
        location: 'Estádio Municipal'
    },
    {
        id: 6,
        title: 'Exposição de Flores da Primavera (Exemplo Futuro)',
        description: 'Um espetáculo de cores e aromas com produtores locais de flores e plantas ornamentais.',
        imageUrl: '/images/flores_spring.jpg',
        date: '25/09/2026',
        time: '09:00 - 18:00',
        location: '<strong>Parque Cachoeira</strong>'
    },
    {
        id: 7,
        title: 'Corrida de Rua de Araucária (Exemplo Futuro)',
        description: 'Desafio de 5km e 10km pelas ruas da cidade. Inscrições abertas!',
        imageUrl: '/images/araucaria_run.jpg',
        date: '15/11/2026',
        time: '07:00 (Largada)',
        location: 'Praça da Bíblia'
    }
];

export const businesses: Business[] = [
    {
        id: 1,
        name: 'Panificadora e Confeitaria Araucária',
        category: 'Alimentação',
        imageUrl: '/images/panificadora_araucaria_real.webp',
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
