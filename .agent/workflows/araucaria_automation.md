---
description: Fluxo de Automação de Notícias e Mapas - Araucária Informa
---

# Fluxo de Automação Consolidado - Araucária Informa

## 1. Agendamento e Frequência
- **Domingos 21:30**: Execução completa (6 matérias para a semana).
- **Sextas 10:00**: Monitoramento extra (Foco em utilidade pública e fim de semana).
- **Sob Demanda**: Execução manual para testes ou "Breaking News".

## 2. Diretrizes de Notícias (AraucariaInforma.com)
- **Quantidade**: 6 Matérias por ciclo.
- **Temas Permitidos**: Utilidade Pública, Infraestrutura, Obras, Editais, Saúde, Educação.
- **PROIBIDO**: Segurança pública, violência, crimes, acidentes com vítimas.
- **Formatação**:
  - **Títulos**: `<strong>BAIRRO</strong> - Título da Notícia`.
  - **Texto**: Aliamento **JUSTIFICADO** (`text-justify`) em cards e artigos.

## 3. Protocolo de Imagens (Regras de Ouro) 🖼️
- **Geração Única (Anti-Duplicidade)**:
  - Cada pauta recebe um prompt específico (ex: "fachada escolar" vs "asfalto com cones").
  - Reviewer bloqueia imagens visualmente semelhantes.
- **Sincronia Climática (Realismo)**:
  - Consultar clima atual de Araucária (via MCP/Web) antes de gerar.
  - Ex: Se chove, prompt inclui "rainy day, wet asphalt". Se sol, "sunny blue sky".
- **Segurança de Marca (Auto-Crop)**:
  - Aplicar corte de 5% nas bordas para remover artefatos/logos de IA.
- **Proporção**:
  - Otimizado para Cards (Horizontal/Wide) para evitar cortes indesejados no CSS.

## 4. Diretrizes de Mapas (Mapa de Situação)
- **Missão**: Identificar eventos de trânsito e obras.
- **Processo**:
  1. Planner extrai endereço.
  2. Coder gera alerta "Trânsito Lento - Obras".
  3. Reviewer valida coordenadas.
- **Saída**: Pins de Informação de Trânsito no banco de dados.

## 5. Fluxo de Deploy (Modo Revisão)
1. Sistema gera o conteúdo (Texto + Imagem).
2. Sistema **PAUSA**.
3. Apresenta resumo: `Título | Bairro | Imagem (Preview)`.
4. Aguarda comando manual: **"Pode publicar"**.
5. **Modelo Rotativo (FIFO)**:
   - Mantém o site sempre fresco com **6 notícias**.
   - Ao publicar 6 novas, as 6 mais antigas são **arquivadas/excluídas**.
   - Garante performance e relevância temporal.

## Como Executar
Use o agente para rodar o script de automação ou solicite o "Ciclo de Notícias" no chat.
