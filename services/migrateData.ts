
import { getSupabase } from './supabaseClient';
import { newsArticles, events, businesses } from '../data';

export const migrateContent = async () => {
    console.log('Iniciando migração de conteúdo...');
    const supabase = await getSupabase();

    // Migrar Notícias
    const { error: newsError } = await supabase
        .from('news_articles')
        .insert(newsArticles.map(n => ({
            title: n.title,
            summary: n.summary,
            content: n.content,
            imageurl: n.imageUrl,      // Postgres criou como 'imageurl'
            category: n.category,
            categorycolor: n.categoryColor, // Postgres criou como 'categorycolor'
            publishdate: n.publishDate,     // Postgres criou como 'publishdate'
            author: n.author,
            sourceurl: n.sourceUrl,
            sourcename: n.sourceName
        })));

    if (newsError) console.error('Erro ao migrar notícias:', newsError);
    else console.log('Notícias migradas com sucesso!');

    // Migrar Eventos
    const { error: eventsError } = await supabase
        .from('events')
        .insert(events.map(e => ({
            title: e.title,
            description: e.description,
            imageurl: e.imageUrl,
            date: e.date,
            time: e.time,
            location: e.location
        })));

    if (eventsError) console.error('Erro ao migrar eventos:', eventsError);
    else console.log('Eventos migrados com sucesso!');

    // Migrar Comércios
    const { error: busError } = await supabase
        .from('businesses')
        .insert(businesses.map(b => ({
            name: b.name,
            category: b.category,
            imageurl: b.imageUrl,
            address: b.address,
            phone: b.phone,
            website: b.website
        })));

    if (busError) console.error('Erro ao migrar comércios:', busError);
    else console.log('Comércios migrados com sucesso!');
};


