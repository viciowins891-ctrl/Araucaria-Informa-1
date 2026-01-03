
/**
 * Utilitários para formatação e manipulação de datas.
 */

/**
 * Formata uma data ISO (YYYY-MM-DD) ou timestamp para o formato brasileiro (DD/MM/AAAA).
 * Aceita também objetos Date.
 * Retorna string vazia se a data for inválida.
 * 
 * @param dateInput String ISO, Timestamp (number) ou Date object
 * @returns Data formatada "DD/MM/AAAA"
 */
export const formatDateBR = (dateInput: string | number | Date | undefined | null): string => {
    if (!dateInput) return "";

    try {
        let date: Date;

        if (typeof dateInput === 'string') {
            // Tenta lidar com ISO YYYY-MM-DD diretamente para evitar fuso horário (UTC vs Local)
            // Se tiver hífens e parecer YYYY-MM-DD
            if (dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const [year, month, day] = dateInput.split('-').map(Number);
                // Cria data no fuso local "meio-dia" para evitar rolagem de dia
                date = new Date(year, month - 1, day, 12, 0, 0);
            } else {
                date = new Date(dateInput);
            }
        } else {
            date = new Date(dateInput);
        }

        if (isNaN(date.getTime())) return ""; // Data inválida

        // Formatação manual para garantir zero à esquerda e ordem
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (e) {
        console.error("Erro ao formatar data:", dateInput, e);
        return "";
    }
};
