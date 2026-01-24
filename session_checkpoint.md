# Checkpoint - 24/01/2026 (Atualizado - 09:20)

## Últimas Alterações Realizadas
1.  **Correção de Layout (ArticlePage):**
    *   Removida a injeção automática de `secondaryImage` (imagem interna) logo abaixo do título.
    *   Isso resolve o problema de duplicação visual (imagem no topo e imagem igual no corpo) relatado no "Festival Tropeiro".
    *   Agora o layout padrão é: Hero (Capa) -> Conteúdo (Texto + Imagens Manuais).
2.  **Correção Estrutural (`data.ts`):**
    *   Restaurada a sintaxe correta entre o fechamento do array `newsArticles` e a abertura de `events`.
    *   Eventos 1 e 2 (Gastronomia) tiveram imagens resetadas para placeholder a pedido do usuário ("retira a imagem").
3.  **Atualização de Conteúdo:**
    *   Notícias do Vôlei e Jardim Plínio confirmadas no topo.
    *   Imagens atualizadas e renomeadas na pasta `public/images`.

## Estado Atual
*   Aplicação estável. Layout de artigo padronizado.
*   Git atualizado com todas as correções.

## Próximos Passos
*   Aguardar feedback se o "Festival Tropeiro" (ID 9003 ou similar) está exibindo corretamente agora.
