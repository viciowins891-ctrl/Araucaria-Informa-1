
import { runScout } from './1_scout.js';
import { runEditor } from './2_editor.js';
import { runPhotographer } from './3_photographer.js';
import { runWebmaster } from './4_webmaster.js';
import { runTroubleshooter } from './5_troubleshooter.js';

async function main() {
    console.log("\n🤖 --- INICIANDO SQUAD ARAUCÁRIA INFORMA ---\n");

    try {
        // 1. Agente Pesquisador
        const rawData = await runScout();
        if (!rawData) {
            console.log("⏹️ Nenhum dado para processar.");
            return;
        }

        // 2. Agente Redator
        const draftedNews = await runEditor(rawData);

        // 3. Agente Fotógrafo
        const visualNews = await runPhotographer(draftedNews);

        // 4. Agente Webmaster
        await runWebmaster(visualNews);

        // 5. Agente de Manutenção (QA)
        await runTroubleshooter();

    } catch (error) {
        console.error("\n❌ ERRO NA OPERAÇÃO DA SQUAD:", error);
    }

    console.log("\n🏁 --- OPERAÇÃO FINALIZADA ---\n");
}

main();
