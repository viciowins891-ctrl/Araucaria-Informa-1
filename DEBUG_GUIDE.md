# 🔍 GUIA DE DEBUG - IMAGENS INTERNAS

## ⚠️ INSTRUÇÕES CRÍTICAS

Adicionei logs de debug no código. Siga EXATAMENTE estes passos:

### 1️⃣ ABRA O NAVEGADOR EM ABA ANÔNIMA
- Chrome/Edge: **Ctrl + Shift + N**
- Firefox: **Ctrl + Shift + P**

### 2️⃣ ABRA O DEVTOOLS **ANTES** DE NAVEGAR
- Pressione **F12** (ou Ctrl + Shift + I)
- Vá na aba **Console**
- Deixe o Console aberto e visível

### 3️⃣ ACESSE O SITE
- Digite: `http://localhost:3001`
- Pressione Enter

### 4️⃣ CLIQUE EM UMA NOTÍCIA
- Procure: **"Polícia Civil incinera 114 kg de drogas"**
- Clique nela

### 5️⃣ LEIA OS LOGS NO CONSOLE
Você deve ver mensagens como:

```
🔍 DEBUG - internalImageUrl: /images/operacao_pcpr_viaturas.png
✅ Setting secondaryImage to: /images/operacao_pcpr_viaturas.png
🖼️ DEBUG - Attempting to render secondaryImage: /images/operacao_pcpr_viaturas.png
```

### 6️⃣ ME INFORME O QUE APARECEU

**CENÁRIO A - Logs aparecem corretos:**
```
✅ Setting secondaryImage to: /images/operacao_pcpr_viaturas.png
🖼️ DEBUG - Attempting to render secondaryImage: /images/operacao_pcpr_viaturas.png
```
→ Problema é CSS ou imagem não carrega (404)

**CENÁRIO B - Aparece:**
```
❌ No internalImageUrl, clearing secondaryImage
```
→ Problema no data.ts (não tem internalImageUrl)

**CENÁRIO C - Nenhum log aparece:**
→ Página não está carregando o código atualizado (cache extremo)

### 7️⃣ VERIFIQUE SE A IMAGEM ESTÁ NO DOM

No Console, digite:
```javascript
document.querySelector('figure img[src*="operacao"]')
```

Se retornar `null` → Não renderizou
Se retornar `<img src="/images/operacao...">` → Renderizou mas pode estar escondido por CSS

### 8️⃣ VERIFIQUE SE A IMAGEM CARREGOU

- Vá na aba **Network** do DevTools
- Filtre por "operacao"
- Você deve ver: `operacao_pcpr_viaturas.png` com status **200**
- Se estiver **404** → Arquivo não existe ou caminho errado

---

## 📊 ME PASSE OS RESULTADOS

Copie e cole exatamente o que apareceu no Console (os logs com 🔍 ✅ ❌ 🖼️)
