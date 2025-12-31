# Arquitetura e Padrões de Desenvolvimento - Araucária Informa

## 1. Fonte Única da Verdade (The Law)
Este projeto segue rigorosamente o princípio de **Local Code First**.

### Regra de Ouro:
> **"O que está no código (`data.ts`) é a Verdade Absoluta."**

### Hierarquia de Prioridade de Dados:
Se houver conflito de informações (título, imagem, texto) para uma mesma notícia, o sistema deve obedecer a seguinte ordem de precedência (do mais forte para o mais fraco):

1.  🥇 **Código Local (`data.ts`)**: Autoridade Máxima. Se você editou aqui, DEVE aparecer no site.
2.  🥈 **Cache (`localStorage`)**: Dados temporários para performance.
3.  🥉 **Banco de Dados (Supabase)**: Dados remotos.

**Implementação Técnica:**
Em `services/api.ts`, a ordem de merge é explícita:
```typescript
const allNews = [...(dbNews || []), ...cachedNews, ...staticNews];
// O último item (staticNews) sobrescreve tudo que veio antes.
```

## 2. Gerenciamento de Imagens
- **Novas Versões**: Ao atualizar uma imagem, **SEMPRE** incremente a versão no nome do arquivo (ex: `image_v2.png`, `image_v3.png`).
- **Cache Busting**: O sistema utiliza estratégia `NetworkFirst` para imagens, garantindo que o navegador sempre verifique se há uma versão nova antes de usar o cache.

## 3. Prevenção de "Fantasmas"
- Nunca confie cegamente no Banco de Dados para sobrescrever dados estáticos críticos.
- A lógica de sanitização e merge garante que edições manuais no editor não sejam revertidas por dados antigos do servidor.

---
*Documento criado em 31/12/2025 para garantir a paz mundial do projeto.*
