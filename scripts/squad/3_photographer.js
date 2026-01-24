
import { genAI } from './shared.js';

/**
 * NANO BANANA PRO
 * The Advanced AI Photographer Agent for Araucária Informa.
 * Capable of intelligent context understanding and fallback resilience.
 */
export async function runPhotographer(newsDraft) {
    console.log("📸 [Nano Banana Pro] Iniciando sessão fotográfica...");
    console.log(`   👁️ Analisando contexto: "${newsDraft.title}"`);

    let prompts = {
        wide: "",
        close: ""
    };

    // 0. TRAVA DE SEGURANÇA (GLOBAL LOCK)
    // Se a imagem atual já for um arquivo local (ex: /images/...) ou tiver a flag de trava, NÃO GERA NOVA.
    // Isso protege correções manuais do usuário contra sobrescrita automática.
    if (newsDraft.imageUrl && (newsDraft.imageUrl.startsWith('/') || newsDraft.imageUrl.includes('TRAVA'))) {
        console.log(`   🔒 IMAGEM TRAVADA/LOCAL DETECTADA: ${newsDraft.imageUrl}`);
        console.log("   ✋ Sessão fotográfica cancelada para preservar arquivo manual.");
        return newsDraft;
    }

    // 1. Tentar Inteligência Cognitiva (Gemini)
    try {
        prompts = await generateAiPrompts(newsDraft);
        console.log("   ✨ Conceito Visual: Gerado via IA");
    } catch (error) {
        console.warn("   ⚠️ IA Indisponível. Ativando Protocolo de Fallback de Emergência.");
        prompts = generateFallbackPrompts(newsDraft.title);
    }

    // 2. Aplicar Estilo 'Nano Banana Pro' e Renderizar
    // O estilo Nano Banana foca em realismo cru, iluminação cinemática e alta fidelidade.
    const styleSignature = ", hyper realistic, photo by nano, 8k, cinematic lighting, raw photo, masterclass, hdr";

    const seed1 = Math.floor(Math.random() * 100000);
    const seed2 = Math.floor(Math.random() * 100000);

    const wideFullPrompt = `${prompts.wide}${styleSignature}`;
    const closeFullPrompt = `${prompts.close}${styleSignature}`;

    const urlWide = buildPollinationsUrl(wideFullPrompt, 1280, 720, seed1);
    const urlClose = buildPollinationsUrl(closeFullPrompt, 800, 600, seed2); // Vertical/Boxy for internal if needed

    console.log(`   🖼️ Cover Render: ${urlWide}`);

    return {
        ...newsDraft,
        imageUrl: urlWide,
        internalImageUrl: urlClose
    };
}

/**
 * Gera prompts usando o modelo Gemini Pro.
 */
async function generateAiPrompts(newsDraft) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const engineeringPrompt = `
        Role: Senior Photojournalist "Nano Banana".
        Task: Create 2 image prompts (in English) for a local news article.
        
        Article: "${newsDraft.title}"
        Summary: "${newsDraft.content.substring(0, 100)}..."
        Location: Araucaria, Parana, Brazil (Southern Brazil city, mix of urban and industrial).

        Output JSON ONLY:
        {
            "wide": "A wide angle establishing shot description...",
            "close": "A close up detail or action shot description..."
        }
    `;

    const result = await model.generateContent(engineeringPrompt);
    const response = await result.response;
    let text = response.text();

    // Sanitize JSON
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
}

/**
 * Protocolo de Fallback Baseado em Palavras-Chave.
 * Expansível e determinístico.
 */
function generateFallbackPrompts(title) {
    const t = title.toLowerCase();
    let subject = "city street scene in Araucaria Parana";

    // Mapeamento de Contexto
    const maps = [
        { keys: ['dengue', 'mosquito', 'saúde', 'doença'], sub: "health agents inspecting houses, sanitary check context" },
        { keys: ['obra', 'asfalto', 'pavimentação', 'buraco', 'rua'], sub: "road construction workers, asphalt pairing machine, heavy machinery" },
        { keys: ['vôlei', 'esporte', 'jogo', 'ginásio'], sub: "volleyball match action inside gymnasium, players jumping" },
        { keys: ['polícia', 'segurança', 'preso', 'assalto', 'gm'], sub: "police car patrolling street at night, red and blue lights reflection" },
        { keys: ['escola', 'educação', 'aluno', 'aula', 'creche'], sub: "students in classroom learning, brazil public school context" },
        { keys: ['chuva', 'alagamento', 'rio', 'tempo', 'tempestade'], sub: "stormy clouds over city, wet streets, rain reflection" },
        { keys: ['trânsito', 'carro', 'acidente', 'semáforo', 'engarrafamento'], sub: "traffic jam city street, cars waiting, urban chaos" },
        { keys: ['festa', 'show', 'evento', 'cultura', 'teatro'], sub: "public event crowd, stage lights, celebration atmosphere" },
        { keys: ['economia', 'dinheiro', 'emprego', 'vaga', 'loja'], sub: "busy commercial street, people shopping, storefronts" }
    ];

    for (const m of maps) {
        if (m.keys.some(k => t.includes(k))) {
            subject = m.sub;
            break;
        }
    }

    return {
        wide: `wide angle drone shot of ${subject}, Araucaria Parana Brazil context`,
        close: `close up detail shot of ${subject}, focus on action`
    };
}

/**
 * Construtor de URL do Pollinations com parâmetros otimizados.
 */
function buildPollinationsUrl(prompt, width, height, seed) {
    const encoded = encodeURIComponent(prompt);
    // Model 'flux' é o melhor para realismo atualmente no Pollinations
    return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&model=flux&nologo=true&seed=${seed}`;
}
