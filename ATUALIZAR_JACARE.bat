@echo off
echo ==========================================
echo      ATUALIZANDO JACARE DO CORTE
echo ==========================================
echo.
cd jacare-do-corte
echo 1. Adicionando mudancas ao Git...
call git add .
echo.
echo 2. Commitando (Atualizacao Automatica)...
call git commit -m "Nova versao do App Jacare do Corte"
echo.
echo 3. Enviando para o GitHub...
call git push origin main
echo.
echo 4. Construindo e Implantando na Vercel...
call npx vercel --prod
echo.
echo ==========================================
echo      ATUALIZACAO CONCLUIDA! 🐊
echo ==========================================
pause
