---
description: Procedimento Padrão de Abertura do Projeto Araucária Informa
---

# Início de Sessão - Araucária Informa 🇧🇷

Este workflow define o passo a passo para iniciar o ambiente de desenvolvimento e ativar os agentes autônomos do esquadrão, garantindo que o sistema esteja pronto para operar.

## Passos

1.  **Navegar para o diretório do projeto**:
    Certifique-se de estar na pasta raiz do projeto (ex: `scratch/`).

2.  **Iniciar o Servidor de Desenvolvimento**:
    Este comando abre o servidor local (Vite) para que você possa visualizar o site no navegador.
    Comando: `npm run dev`

3.  **Ativar o Esquadrão (Agentes)**:
    Este comando inicia o orquestrador dos agentes (Scout, Editor, Photographer, etc.) para monitorar notícias e realizar automações no site.
    Comando: `npm run start:squad`

## Notas
- O servidor de desenvolvimento (`npm run dev`) deve rodar em um terminal dedicado.
- O esquadrão (`npm run start:squad`) pode rodar em paralelo em outro terminal ou aba.
- Se o servidor de desenvolvimento não estiver rodando, o agente de manutenção pode reportar erro de conexão ao tentar validar o site localmente.
