
// Serviço de Newsletter
// Este arquivo centraliza a lógica de inscrição. 
// Atualmente simula uma chamada de API (Network Request).

export const newsletterService = {
    subscribe: async (email: string): Promise<{ success: boolean; message: string }> => {
        // Simulação de delay de rede (como se estivesse contatando um servidor real)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Validação básica de email
        if (!email.includes('@') || !email.includes('.')) {
            throw new Error("Por favor, insira um e-mail válido.");
        }

        // -------------------------------------------------------------------------
        // PARA TORNAR REAL (INTEGRAÇÃO COM EMAILJS):
        // 1. Crie uma conta grátis em https://www.emailjs.com/
        // 2. Instale o SDK: npm install @emailjs/browser (ou use via CDN)
        // 3. Substitua o código abaixo por:
        // 
        // return emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', { email: email }, 'SUA_PUBLIC_KEY')
        //    .then(() => ({ success: true, message: "Inscrição confirmada!" }));
        // -------------------------------------------------------------------------

        // Retorno Simulado de Sucesso
        console.log(`[Newsletter] Novo inscrito: ${email}`);
        return { 
            success: true, 
            message: "Inscrição realizada com sucesso! Verifique sua caixa de entrada." 
        };
    }
};
