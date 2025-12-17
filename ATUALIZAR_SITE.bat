@echo off
color 0A
echo ========================================================
echo      AUTOMACAO DE ATUALIZACAO - ARAUCARIA INFORMA
echo ========================================================
echo.
echo Ola! Estou preparando tudo para atualizar seu site.
echo Por favor, aguarde alguns segundos...
echo.

echo 1. Salvando copia de seguranca no GitHub (Nuvem de Codigo)...
call git add .
call git commit -m "Atualizacao automatica pelo script do usuario"
call git push origin main
if %errorlevel% neq 0 (
    echo AVISO: Nao foi possivel salvar no GitHub, mas vou tentar continuar com o site...
) else (
    echo Codigo salvo com seguranca!
)

echo.
echo 2. Verificando se o site esta saudavel (Removendo erros)...
call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERRO CRITICO] Ocorreu um problema tecnico no codigo.
    echo O site NAO foi atualizado para evitar que ele saia do ar.
    echo Por favor, chame o suporte tecnico.
    pause
    exit /b %errorlevel%
)

echo.
echo 3. Publicando a nova versao na Internet...
call npx vercel --prod
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERRO] Falha ao conectar com o servidor. Verifique sua internet.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================================
echo                 SUCESSO TOTAL!
echo ========================================================
echo O site foi atualizado e ja esta no ar.
echo Pode fechar esta janela.
echo.
pause
