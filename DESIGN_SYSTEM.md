# Sistema de Design & Identidade Visual - Araucária Informa

Este documento registra as definições visuais, paletas de cores e seus significados figurativos utilizados no projeto.

## 🎨 Paleta de Cores Temática (Balões de Categoria)

A identidade visual utiliza um sistema consistente onde o texto e a borda compartilham a mesma tonalidade sólida, enquanto o fundo utiliza a mesma cor com 25% de opacidade.

| Tema (Cor) | Contexto Técnico (Tailwind) | Categorias | Significado Figurativo |
| :--- | :--- | :--- | :--- |
| **🔵 Blue (Azul)** | `blue-600` (Light) / `blue-400` (Dark) | Cidade, Saúde, Política | **Confiança & Ordem.** Transmite seriedade, segurança e oficialidade. A cor da informação pública e da gestão. |
| **🟣 Purple (Roxo)** | `purple-600` (Light) / `purple-400` (Dark) | Infraestrutura, Obras | **Transformação & Nobreza.** Representa a modernidade, engenharia e avanço tecnológico. Algo "construído" e valioso. |
| **🟢 Green (Verde)** | `green-600` (Light) / `green-400` (Dark) | Esporte, Meio Ambiente | **Vitalidade & Movimento.** A cor da vida, da energia física e da natureza. Saúde em movimento e preservação. |
| **🔴 Red (Vermelho)** | `red-600` (Light) / `red-400` (Dark) | Educação | **Urgência & Paixão.** Destaca o ensino como prioridade máxima ("emergência" de aprender) e o amor pelo conhecimento. |
| **🟡 Yellow (Amarelo)** | `yellow-600` (Light) / `yellow-400` (Dark) | Lazer, Cultura | **Alegria & Luz.** Otimismo, sol e diversão. Sinaliza entretenimento e momentos felizes. |
| **🌀 Indigo (Índigo)** | `indigo-600` (Light) / `indigo-400` (Dark) | Turismo, Tecnologia | **Profundidade & Descoberta.** Um azul misterioso que convida à exploração de novos caminhos (rurais) ou fronteiras (digitais). |

## 🛠️ Especificação Técnica (Componentes)

Para manter a consistência, utilizamos as seguintes classes utilitárias do Tailwind CSS no `NewsCard.tsx` e `ArticlePage.tsx`:

**Modo Claro (Light Mode):**
- **Fundo:** `bg-{cor}-600/[0.25]` (25% Opacidade)
- **Texto:** `text-{cor}-600`
- **Borda:** `border-{cor}-600`

**Modo Escuro (Dark Mode):**
- **Fundo:** `dark:bg-{cor}-500/[0.25]` (25% Opacidade)
- **Texto:** `dark:text-{cor}-400`
- **Borda:** `dark:border-{cor}-400`
