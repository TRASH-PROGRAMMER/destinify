@echo off
echo === Configurando Tailwind CSS v4 en Destinify Frontend ===

REM Instalar plugin oficial para Vite (Tailwind v4)
call npm install -D @tailwindcss/vite

REM Crear src/index.css con sintaxis v4
mkdir src 2>nul
echo @import 'tailwindcss';> src\index.css
echo [OK] src\index.css creado

echo.
echo Asegurate de tener en vite.config.ts:
echo   import tailwindcss from '@tailwindcss/vite'
echo   plugins: [vue(), tailwindcss()]
echo.
echo === Configuracion completada ===
pause
