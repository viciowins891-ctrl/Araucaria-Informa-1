
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { randomUUID } from 'crypto';

neonConfig.webSocketConstructor = ws;

// Hardcoded para garantir execução sem ler .env
const DATABASE_URL = "postgresql://postgres:27415281@db.tlqdzefbbayqrfmhlfqq.supabase.co:5432/postgres";

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool);

// Schema simplificado (apenas o necessário para inserção)
const articles = pgTable("articles", {
    id: text("id").primaryKey(),
    type: text("type").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    category: text("category").notNull(),
    imageUrl: text("image_url"),
    linkUrl: text("link_url"),
    publishedAt: timestamp("published_at").notNull().defaultNow(),
});

const businesses = pgTable("businesses", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    address: text("address").notNull(),
    phone: text("phone").notNull(),
    website: text("website"),
    imageUrl: text("image_url"),
    sponsored: boolean("sponsored").default(false).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

async function main() {
    console.log("🚀 Iniciando Seed Standalone...");

    try {
        const newArticles = [
            {
                id: randomUUID(),
                type: "noticia",
                title: "[IGUAÇU] - Motociclista de 20 anos morre em colisão na Av. Archelau",
                excerpt: "Acidente fatal vitimou Guilherme Becker, de 20 anos, após colisão violenta com carro e poste na última sexta-feira.",
                content: `Um trágico acidente tirou a vida do jovem Guilherme Becker... (Conteúdo Curto para Teste)`,
                category: "Segurança",
                imageUrl: "https://images.unsplash.com/photo-1564694202779-bc908c327862?auto=format&fit=crop&q=80&w=800",
                publishedAt: new Date(),
            },
            // Adicionando apenas 1 para teste rápido
        ];

        console.log("Inserindo artigos...");
        await db.insert(articles).values(newArticles);
        console.log("✅ Artigo inserido!");

    } catch (e: any) {
        if (e.message.includes('relation "articles" does not exist')) {
            console.log("⚠️ Tabela não existe! O Schema não foi criado no banco.");
            // Aqui poderíamos criar a tabela via SQL raw se quiséssemos ser ousados
        } else {
            console.error("❌ Erro:", e);
        }
    } finally {
        await pool.end();
    }
}

main();
