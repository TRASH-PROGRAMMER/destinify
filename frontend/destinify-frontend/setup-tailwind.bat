@echo off
echo === Configurando TailwindCSS en Destinify Frontend ===

REM Crear tailwind.config.js
echo export default { > tailwind.config.js
echo   content: [ >> tailwind.config.js
echo     "./index.html", >> tailwind.config.js
echo     "./src/**/*.{vue,js,ts,jsx,tsx}", >> tailwind.config.js
echo   ], >> tailwind.config.js
echo   theme: { >> tailwind.config.js
echo     extend: {}, >> tailwind.config.js
echo   }, >> tailwind.config.js
echo   plugins: [], >> tailwind.config.js
echo } >> tailwind.config.js
echo [OK] tailwind.config.js creado

REM Crear postcss.config.js
echo export default { > postcss.config.js
echo   plugins: { >> postcss.config.js
echo     tailwindcss: {}, >> postcss.config.js
echo     autoprefixer: {}, >> postcss.config.js
echo   }, >> postcss.config.js
echo } >> postcss.config.js
echo [OK] postcss.config.js creado

REM Crear src/index.css
mkdir src 2>nul
echo @tailwind base; > src/index.css
echo @tailwind components; >> src/index.css
echo @tailwind utilities; >> src/index.css
echo [OK] src/index.css creado

echo === Configuración completada ===
pause
