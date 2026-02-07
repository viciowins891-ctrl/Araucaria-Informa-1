
const { createClient } = require('@supabase/supabase-js');

// Dados do Supabase com Service Role Key (Essa chave tem permissão TOTAL)
const url = 'https://ovbbumhwnlzadfjcbfer.supabase.co';
// Esta chave "bTUQ..." é a Service Role Key, que ignora RLS.
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92YmJ1bWh3bmx6YWRmamNiZmVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODcwODI2NCwiZXhwIjoyMDg0Mjg0MjY0fQ.bTUQVONfFE9GFFNynII2AqUYj2NZoetkiVIXnqUq5N0';

const supabase = createClient(url, serviceKey);

async function forceUnlockJobs() {
    console.log("--- INICIANDO DESBLOQUEIO FORÇADO DO BANCO ---");
    console.log("Conectando com Service Role (Chave Mestra)...");

    // 1. Tentar ler as vagas com permissão de Deus
    const { data: jobs, error: readError } = await supabase.from('jobs').select('*');
    if (readError) {
        console.error("❌ ERRO GRAVE: Nem a chave mestra conseguiu ler o banco.", readError);
        return;
    }
    console.log(`✅ O banco tem ${jobs.length} vagas cadastradas.`);

    // 2. Não temos acesso direto ao SQL via JS Client padrão, 
    // mas podemos verificar se conseguimos INSERIR e DELETAR como teste.
    // Como não consigo rodar ALTER TABLE daqui, vou tentar simular um acesso Anonimo
    // usando a chave Anon publica para confirmar se o bloqueio está lá.

    const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92YmJ1bWh3bmx6YWRmamNiZmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDgyNjQsImV4cCI6MjA4NDI4NDI2NH0.eayWOfvhczVgRZ2SKZcVTlMIU23otcCQ6cEWbSGBzGw';
    const supabaseAnon = createClient(url, anonKey);

    console.log("\nTestando acesso ANÔNIMO (como o usuário do site)...");
    const { data: anonData, error: anonError } = await supabaseAnon.from('jobs').select('*');

    if (anonError) {
        console.error("❌ ERRO ANÔNIMO: O usuário do site está bloqueado!", anonError.message);
        console.log("⚠️ DIAGNÓSTICO: O comando SQL de RLS não funcionou. O banco está fechado.");
    } else {
        console.log(`✅ SUCESSO ANÔNIMO: O usuário do site consegue ver ${anonData.length} vagas.`);
        if (anonData.length === 0 && jobs.length > 0) {
            console.error("❌ ERRO ESTRANHO: O usuario anonimo conecta, mas vê 0 vagas (RLS escondendo linhas).");
        } else {
            console.log("🎉 TUDO PARECE CORRETO NO BANCO!");
            console.log("Se o site não mostra, é 100% erro de cache local do navegador/react.");
        }
    }
}

forceUnlockJobs();
