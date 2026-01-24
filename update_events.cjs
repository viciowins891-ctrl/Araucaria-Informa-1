
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Novos Eventos "Úteis" (Datas fixas próximas ou reais)
// Substituindo o array de events existente
const realEvents = [
    {
        id: 1,
        title: 'Sessão Ordinária da Câmara',
        description: 'Acompanhe a votação de projetos importantes para a cidade.',
        imageUrl: '/images/event_camara.png', // Placeholder por enquanto
        date: 'Terça-feira, 18:00',
        time: '18:00',
        location: 'Câmara Municipal'
    },
    {
        id: 2,
        title: 'Feira do Produtor Rural',
        description: 'Produtos frescos direto do campo. Apoie a agricultura familiar de Araucária.',
        imageUrl: '/images/event_feira.png',
        date: 'Quarta e Sábado',
        time: '08:00 - 13:00',
        location: 'Praça da Bíblia'
    },
    {
        id: 3,
        title: 'Dia D de Multivacinação',
        description: 'Atualize a carteirinha de vacinação de crianças e adolescentes. Todas as UBS abertas.',
        imageUrl: '/images/event_vacinacao.png',
        date: '25/01/2026',
        time: '08:00 - 17:00',
        location: 'Todas as UBS'
    },
    {
        id: 4,
        title: 'Mutirão de Empregos SINE',
        description: 'Mais de 200 vagas para entrevistas imediatas. Levar Carteira de Trabalho.',
        imageUrl: '/images/event_sine.png',
        date: '26/01/2026',
        time: '09:00 - 16:00',
        location: 'Agência do Trabalhador'
    },
    {
        id: 5,
        title: 'Vencimento IPTU (Cota Única)',
        description: 'Aproveite o desconto de 10% para pagamento à vista. Emita a guia no site.',
        imageUrl: '/images/event_iptu.png',
        date: '10/02/2026',
        time: 'Até as 23:59',
        location: 'Online / Bancos'
    },
    {
        id: 6,
        title: 'Festa do Pêssego 2026 (Abertura)',
        description: 'Shows nacionais, gastronomia e exposição. O maior evento da região!',
        imageUrl: '/images/event_pessego.png',
        date: '05/02/2026',
        time: '19:00',
        location: 'Parque Cachoeira'
    }
];

// Converter objeto para string JS formatada (simplificada para o script)
const eventsString = `export const events: Event[] = ${JSON.stringify(realEvents, null, 4)};`.replace(/"/g, "'").replace(/'id'/g, "id").replace(/'title'/g, "title").replace(/'description'/g, "description").replace(/'imageUrl'/g, "imageUrl").replace(/'date'/g, "date").replace(/'time'/g, "time").replace(/'location'/g, "location");

// Substituir o bloco 'export const events: Event[] = [ ... ];'
// Regex tenta pegar do 'export const events' até o próximo 'export const' ou fim de arquivo
const regexEvents = /export const events: Event\[\] = \[([\s\S]*?)\];/;

if (regexEvents.test(content)) {
    content = content.replace(regexEvents, eventsString);
    fs.writeFileSync(filePath, content);
    console.log("Eventos atualizados com dados de utilidade pública.");
} else {
    console.error("Não foi possível encontrar o array de eventos para substituir.");
}

