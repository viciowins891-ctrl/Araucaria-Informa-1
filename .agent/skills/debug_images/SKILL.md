---
name: DebugImages
description: Especialista em diagnóstico e correção de imagens de notícias e eventos.
---

# DebugImages Skill

Esta skill fornece ferramentas para auditar a integridade das imagens, detectar duplicatas visuais e forçar associações manuais de imagens em `data.ts`.

## Scripts

### `image_doctor.cjs`

Script principal para diagnóstico e correção.
Funcionalidades:
1.  **Audit**: Verifica se todas as imagens referenciadas existem.
2.  **Dedup**: Verifica se Imagem Interna == Capa (por nome ou hash MD5).
3.  **Restore**: Aplica um mapa manual de "Golden Images" para IDs conhecidos, tentando recuperar as escolhas originais do usuário.
4.  **Search**: Para imagens faltantes ou duplicadas, busca alternativas na pasta `public/images` usando análise fuzzy de palavras-chave.

## Como usar

Execute o script na raiz do projeto:

```bash
node .agent/skills/debug_images/image_doctor.cjs
```
