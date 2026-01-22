# Manifesto da Squad Araucária Informa (Implementação MCP)

Este documento define a arquitetura de 5 Agentes Inteligentes que operam o portal Araucária Informa. Cada agente possui responsabilidades únicas e ferramentas específicas.

## 1. 🔍 Agente Pesquisador (The Scout)
**Missão**: Encontrar a matéria-prima do portal.
**Ferramentas**: `Google Drive API`, `Google Search` (Simulado).
**Fluxo**:
1.  Verifica a pasta "Noticias (Drop aqui)" no Google Drive.
2.  Se encontrar arquivos: Processa o conteúdo (OCR/Texto).
3.  Se NÃO encontrar: Busca notícias recentes sobre "Araucária" na web (fontes oficiais).
4.  **Saída**: Um objeto `RawFact` contendo dados brutos e fonte.

## 2. ✍️ Agente Redator (The Editor)
**Missão**: Guardião da voz e estilo.
**Ferramentas**: `Google Gemini` (LLM).
**Input**: Objeto `RawFact`.
**Fluxo**:
1.  Recebe os fatos brutos.
2.  Escreve Título impactante (Padrão: "BAIRRO - Título").
3.  Escreve exatamente 3 parágrafos curtos, objetivos e jornalísticos.
4.  **Saída**: Objeto `DraftNews` com título, resumo, corpo HTML e categoria.

## 3. 📸 Agente Fotógrafo (Visual Prompt Engineer)
**Missão**: Estética de alta qualidade (Fotojornalismo).
**Ferramentas**: `Google Gemini` (para gerar prompt), `Pollinations.ai / Flux` (para gerar imagem).
**Input**: Objeto `DraftNews`.
**Fluxo**:
1.  Analisa a notícia (local, clima, contexto).
2.  Gera prompt em inglês focado em realismo (8k, street photography, lighting).
3.  Gera a URL da imagem.
4.  **Saída**: Objeto `VisualAsset` (URL da imagem gerada).

## 4. 🚀 Agente de Operações (The Webmaster)
**Missão**: Integração e Publicação.
**Ferramentas**: `Supabase Client`, `Git` (Opcional para commits).
**Input**: `DraftNews` + `VisualAsset`.
**Fluxo**:
1.  Consolida Texto + Imagem.
2.  Salva no Banco de Dados (Supabase).
3.  Aciona Webhooks (se houver deploy Vercel).
4.  Limpa arquivos temporários do Drive (se vieram de lá).
5.  **Ação de Limpeza**: Garante regra FIFO (apaga excesso > 6 notícias).
**Saída**: Status de confirmação.

## 5. 🛠️ Agente de Manutenção (The Troubleshooter/QA)
**Missão**: Controle de Qualidade pós-publicação.
**Ferramentas**: `Fetch/Axios` (Verificação de Status), `Image Analysis`.
**Fluxo**:
1.  Aguarda 30s após publicação.
2.  Acessa a URL pública das imagens salvas.
3.  Se erro (404/borken): Tenta regenerar ou aplicar fallback.
4.  Valida se o site está online.
**Saída**: Relatório de Saúde do Site.

---
*Arquitetura implementada em: `scripts/squad/`*
