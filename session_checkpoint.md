# Checkpoint - 24/01/2026 (Finalizado - 09:55)

## Últimas Alterações Realizadas
1.  **Layout Inteligente (`ArticlePage.tsx`):**
    *   Implementada lógica "Smart Check": O site agora detecta se a imagem interna já existe no corpo do texto (HTML).
    *   Se existir, o bloco automático é ocultado para evitar duplicação.
    *   Se não existir, o bloco automático é exibido. Isso padroniza o site todo (Manuais vs Automáticas).
2.  **Limpeza de Dados (`data.ts`):**
    *   Detectada e removida notícia duplicada do "Araucária Vôlei" (ID antigo 1769111830) que conflitava com a nova (ID 1769253501).
    *   Script `deduplicate_news.cjs` criado e executado para garantir limpeza.
3.  **Conteúdo:**
    *   Notícias do Vôlei e Jardim Plínio confirmadas e estáveis.
    *   Imagens de eventos de gastronomia resetadas para placeholder a pedido ("retirar imagem").

## Estado Atual
*   Aplicação rodando e estável.
*   Git atualizado e salvo.
*   Problemas de duplicação visual e de dados resolvidos.

## Próximos Passos
*   Monitorar se novas notícias inseridas manualmente seguem o padrão esperado.
