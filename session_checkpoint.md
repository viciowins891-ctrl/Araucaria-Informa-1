# Checkpoint - 24/01/2026 (Atualizado)

## Últimas Alterações Realizadas
1.  **Atualização de Notícias (Breaking News):**
    *   **Araucária Vôlei:** Notícia inserida no topo com novas imagens (Capa: Líder, Interna: Ataque). ID `1769253501`.
    *   **Jardim Plínio:** Notícia atualizada com novas imagens (Asfalto/Faixa) e título de teste. ID `1769111662`.
2.  **Ordenação de Dados (`data.ts`):**
    *   Script `sort_news.cjs` criado e executado para garantir ordem decrescente por data.
    *   Script `ensure_commas.cjs` criado para corrigir sintaxe JSON pós-ordenação.
3.  **Configuração de Servidor:**
    *   `vite.config.ts` alterado para forçar reinício do HMR/Servidor e limpar cache persistente.
4.  **Imagens:**
    *   Vôlei: `volei-araucaria-lider-capa.jpg`, `volei-araucaria-acao-interna.jpg`
    *   Plínio: `pavimentacao-jardim-plinio-v2.png`, `pavimentacao-interiror-faixa.png`

## Estado Atual
*   Aplicação rodando (Server dev deve ter sido reiniciado pelo touch no config).
*   `data.ts` validado e sem IDs duplicados.
*   Git atualizado com todas as mudanças.

## Próximos Passos
*   Validar se o cliente visualiza as alterações (problema de cache local persistente).
*   Remover prefixo "TESTE:" do título do Jardim Plínio após validação.
