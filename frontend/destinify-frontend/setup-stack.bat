@echo off
echo === Creando estructura de carpetas y archivos para Destinify Frontend ===

REM Crear carpetas
if not exist src mkdir src
if not exist src\router mkdir src\router
if not exist src\store mkdir src\store
if not exist src\services mkdir src\services

REM Crear archivo router/index.ts
echo import { createRouter, createWebHistory } from 'vue-router'; > src\router\index.ts
echo const routes = []; >> src\router\index.ts
echo const router = createRouter({ >> src\router\index.ts
echo   history: createWebHistory(), >> src\router\index.ts
echo   routes, >> src\router\index.ts
echo }); >> src\router\index.ts
echo export default router; >> src\router\index.ts
echo [OK] src\router\index.ts creado

REM Crear archivo store/userStore.ts
echo import { defineStore } from 'pinia'; > src\store\userStore.ts
echo export const useUserStore = defineStore("user", { >> src\store\userStore.ts
echo   state: () => ({ profile: null }), >> src\store\userStore.ts
echo   actions: { >> src\store\userStore.ts
echo     setProfile(data: any) { this.profile = data; } >> src\store\userStore.ts
echo   } >> src\store\userStore.ts
echo }); >> src\store\userStore.ts
echo [OK] src\store\userStore.ts creado

REM Crear archivo services/api.ts
echo import axios from "axios"; > src\services\api.ts
echo export const api = axios.create({ >> src\services\api.ts
echo   baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001/api" >> src\services\api.ts
echo }); >> src\services\api.ts
echo [OK] src\services\api.ts creado

REM Crear archivo src/index.css con Tailwind
echo @tailwind base; > src\index.css
echo @tailwind components; >> src\index.css
echo @tailwind utilities; >> src\index.css
echo [OK] src\index.css creado

echo === Estructura creada con éxito ===
pause
