
const { createClient } = require('@supabase/supabase-js');

// Hardcoded for debug purposes to bypass potential .env issues
// These keys are public/safe for client-side use
const url = 'https://ovbbumhwnlzadfjcbfer.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92YmJ1bWh3bmx6YWRmamNiZmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDgyNjQsImV4cCI6MjA4NDI4NDI2NH0.eayWOfvhczVgRZ2SKZcVTlMIU23otcCQ6cEWbSGBzGw';

const supabase = createClient(url, key);

async function diagnose() {
    console.log("--- INICIANDO DIAGNÓSTICO DE VAGAS ---");
    console.log("URL:", url);

    try {
        const { data, error } = await supabase
            .from('jobs')
            .select('*');

        if (error) {
            console.error("❌ ERRO NO SUPABASE:", error.message);
            console.error(error);
        } else {
            console.log(`\n✅ SUCESSO! Encontradas ${data.length} vagas no banco.`);
            if (data.length > 0) {
                console.log("\n--- EXEMPLO DE VAGA (DO BANCO) ---");
                const vaga = data[0];
                console.log(`ID: ${vaga.id}`);
                console.log(`Título: "${vaga.title}"`);
                console.log(`Empresa: "${vaga.company}"`);
                console.log(`Link Contato: "${vaga.contact_link}"`);
                console.log(`Criado em: ${vaga.created_at}`);
                console.log("----------------------------------\n");
            } else {
                console.warn("⚠️ O banco conectou mas a tabela está vazia!");
            }
        }

    } catch (e) {
        console.error("❌ ERRO DE CONEXÃO/REDE:", e);
    }
    console.log("--- FIM DO DIAGNÓSTICO ---");
}

diagnose();
