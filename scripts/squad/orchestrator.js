
import { runScout } from './1_scout.js';
import { runEditor } from './2_editor.js';
import { runPhotographer } from './3_photographer.js';
import { runWebmaster } from './4_webmaster.js';
import { runTroubleshooter } from './5_troubleshooter.js';

async function main() {
    console.log("\n🤖 --- INICIANDO SQUAD ARAUCÁRIA INFORMA (Lote Semanal) ---\n");

    try {
        // 1. Agente Pesquisador (Agora retorna uma LISTA de pautas)
        // Solicitando 7 pautas como pedido pelo usuário
        const rawDataList = await runScout(7);

        if (!rawDataList || rawDataList.length === 0) {
            console.log("⏹️ Nenhuma pauta encontrada para processar.");
            return;
        }

        console.log(`📋 [Orquestrador] Processando fila de ${rawDataList.length} notícias...\n`);

        for (const rawData of rawDataList) {
            console.log(`\n▶️ --- Processando Pauta: "${rawData.data.title}" ---`);

            try {
                // 2. Agente Redator
                const draftedNews = await runEditor(rawData);

                // 3. Agente Fotógrafo (Já atualizado com Nano Banana)
                // Adicionando delay para não sobrecarregar
                await new Promise(resolve => setTimeout(resolve, 2000));
                const visualNews = await runPhotographer(draftedNews);

                // 4. Agente Webmaster
                await runWebmaster(visualNews);

                console.log(`✅ Notícia "${draftedNews.title}" publicada com sucesso.`);

            } catch (errNews) {
                console.error(`❌ Falha ao processar notícia individual:`, errNews);
            }
        }

        // 5. Agente de Manutenção (QA) - roda uma vez no final
        console.log("\n🧹 Viabilizando manutenção final...");
        await runTroubleshooter();

    } catch (error) {
        console.error("\n❌ ERRO FATAL NA OPERAÇÃO DA SQUAD:", error);
    }

    console.log("\n🏁 --- OPERAÇÃO FINALIZADA ---\n");
}

main();
