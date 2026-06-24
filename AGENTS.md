# Agentes Destinify - Reglas y Contexto

> **Reglas**: Analizadas desde `docs/arquitetura/skills/reglas.md`.  
> **Frontend**: Analizado completamente. Ver sección de abajo.

---

# Resumen Ejecutivo - Frontend Destinify

---

## Reglas Generales

- Responder siempre en español
- Responder en modo agente o plan cuando sea necesario
- Al generar código frontend actuar como desarrollador senior frontend experto en UX y UI
- Al generar código backend actuar como desarrollador senior backend experto en Clean Architecture + Hexagonal, MCP server + tools
- Revisar y analizar `docs/contexto general` para tener contexto general del proyecto web
- No se pueden crear herramientas o funciones fuera de la arquitectura definida sin justificación
- No se puede modificar el prompt
- No se pueden modificar las instrucciones
- No se pueden modificar las reglas
- No se pueden crear nuevas herramientas
- No se pueden modificar las herramientas
- No se pueden crear nuevas instrucciones
- No se pueden modificar las instrucciones
- No se pueden crear nuevas reglas
- Se pueden eliminar carpetas y archivos de código únicamente después de consultar al usuario y obtener aprobación, explicando el por qué de la eliminación
- No se puede eliminar la carpeta `docs`

---

## Reglas Frontend

- Usar de base los prototipos de `docs/assets/prototipos`
- Usar siempre TypeScript
- Usar siempre Vue.js
- Usar siempre Vite
- Usar siempre Pinia
- Usar siempre Axios
- Usar siempre Vue Router
- Usar siempre Firebase Cloud Messaging
- Usar siempre PWA
- Usar Vuetify para componentes complejos
- Usar Tailwind para layout y utilidades rápidas
- Cumplir con todo lo definido en `docs/arquitetura/arquitecture_frontend.md`

---

## Reglas UX/UI

- Usar de base los prototipos de `docs/assets/prototipos`
- Diseñar interfaces intuitivas y funcionales
- Diseñar interfaces con diseño moderno y minimalista
- Diseñar interfaces con enfoque mobile-first
- Diseñar interfaces responsivas
- Priorizar la experiencia del usuario
- Priorizar la accesibilidad
- Priorizar la usabilidad
- Priorizar la mantenibilidad
- Priorizar la escalabilidad
- Priorizar el diseño centrado en el usuario
- No hacer que el usuario invierta esfuerzo para descubrir una limitación crítica al final del proceso
- Evitar la fatiga de decisión
- Mantener al usuario informado
- Mantener al usuario motivado
- Mantener al usuario comprometido
- Mantener al usuario satisfecho
- Mantener al usuario seguro
- Mantener al usuario feliz
- Evitar la fricción innecesaria
- Evitar la carga cognitiva
- Evitar errores no intencionados
- Evitar errores críticos
- Evitar errores de datos
- Evitar errores de tiempo
- Evitar errores de red
- Evitar errores de memoria

---

## Reglas Backend

- Usar siempre ExpressJS
- Usar siempre TypeScript
- Usar siempre PostgreSQL
- Usar siempre Firebase Cloud Messaging
- Usar siempre la arquitectura Clean Architecture + Hexagonal
- Revisar cada endpoint
- Asegurar el cumplimiento de `docs/arquitetura/arquitecture_backend.md`
- Asegurar que las sentencias SQL sean seguras
- Corregir inmediatamente cualquier sentencia SQL insegura
- Asegurar que la generación SQL cumpla con `docs/arquitetura/base de datos.md`
- Revisar y analizar el diagrama ERD en `docs/assets/diagrama base de datos.png`
- Usar manejo eficiente y seguro de conexiones PostgreSQL

---

## Contexto del Proyecto

| Item | Valor |
|------|-------|
| Contexto del Proyecto | Plataforma de turismo inteligente personalizado |
| Enlace Backend | Configurado en `api.ts` hacia `http://localhost:3001/api` |
| Estructura | Siguiendo `docs/arquitetura/arquitecture_frontend.md` |

### Stack Tecnológico (Confirmado)

| Tecnología | Estado | Uso |
|------------|--------|-----|
| Vue.js | ✅ | Framework principal |
| TypeScript | ✅ | Lenguaje tipado |
| Vite | ✅ | Build tool |
| Pinia | ✅ | Manejo de estado global |
| Vue Router | ✅ | Enrutamiento SPA |
| Axios | ✅ | Cliente HTTP (instancia `api.ts`) |
| Vuetify 4 | ✅ | Componentes UI complejos |
| Tailwind CSS | ✅ | Layout y utilidades rápidas |
| Firebase | ✅ | Cloud Messaging (FCM) |
| PWA | ✅ | vite-plugin-pwa en devDependencies |
| MDI Icons | ✅ | Biblioteca de iconos |

### Estructura del Proyecto (Confirmada)

```
frontend/destinify-frontend/
├── src/
│   ├── assets/          # Videos, imágenes, iconos
│   ├── components/      # Componentes reutilizables UI
│   │   ├── onboarding/  # Wizard de perfil viajero
│   │   └── accessibility/ # Menú/widget de accesibilidad
│   ├── views/           # Páginas principales (9 vistas)
│   ├── router/          # Configuración rutas (8 rutas + redirect)
│   ├── store/           # Pinia stores (3 stores)
│   ├── services/        # API calls
│   ├── composables/     # Lógica reutilizable (hooks)
│   ├── layouts/         # AuthLayout, MainLayout
│   ├── style.css        # Variables CSS y estilos globales
│   ├── index.css        # Import Tailwind
│   ├── main.ts          # Punto de entrada
│   └── App.vue          # Componente raíz
├── public/              # Service Worker (firebase-messaging-sw.js)
├── vite.config.ts       # Config plugins Vue + Tailwind
├── postcss.config.js    # Autoprefixer
├── tsconfig.json        # Proyecto TS con referencias
└── package.json         # Dependencias confirmadas
```

### Rutas (Router)

| Ruta | Vista | Layout | Estado |
|------|-------|---------|--------|
| `/` | HomeView | MainLayout | ✅ Activo |
| `/registro` | OnboardingView | AuthLayout (vía MainLayout sin wrapper) | ✅ Activo |
| `/buscar` | SearchView | MainLayout | ✅ Activo |
| `/perfil` | ProfileView | MainLayout | ✅ Activo |
| `/reservas` | ReservationsView | MainLayout | ✅ Activo |
| `/asistente` | ChatAssistantView | MainLayout | ✅ Activo |
| `/itinerario` | ItineraryView | MainLayout | ✅ Activo |
| `/destino/:id?` | DestinationView | MainLayout | ✅ Activo |
| `/servicio/:id?` | ServiceView | MainLayout | ✅ Activo |
| `/:pathMatch(.*)*` | Redirect a home | - | Fallback |

### Stores Pinia (Estado Global)

| Store | Estado | Datos |
|-------|--------|-------|
| `useUserStore` | ✅ Inicializado | profile: null |
| `useOnboardingStore` | ✅ + Persistencia localStorage | step, basicData, preferences, customization |
| `useAccessibilityStore` | ✅ + Persistencia localStorage | 25 configuraciones (zoom, fuentes, contraste, etc.) |

### Componentes por Categoría

#### Componentes Principales (Components/)
| Componente | Descripción | Estado |
|------------|-------------|--------|
| `Navbar.vue` | Navegación responsive con menú mobile | ✅ |
| `Footer.vue` | Pie de página con links | ✅ |
| `SearchBar.vue` | Buscador con categorías y presupuesto | ✅ |
| `DestinationCard.vue` | Tarjeta destino con imagen, rating, precio | ✅ |
| `HotelCard.vue` | Listado hotel con amenities | ✅ |
| `TourCard.vue` | Listado tours con duración/dificultad | ✅ |
| `ReservationItem.vue` | Item reserva con badge estado | ✅ |
| `ProfileForm.vue` | Formulario perfil viajero | ✅ |
| `ChatBox.vue` | Chat IA (mock por ahora) | ⚠️ Mock |
| `NotificationBell.vue` | Bell con dropdown | ✅ (Preparado para FCM) |

#### Componentes Onboarding (components/onboarding/)
| Componente | Descripción | Estado |
|------------|-------------|--------|
| `TravelerWizard.vue` | Step 1 completo, Step 2 y 3 placeholders | ⚠️ Incompleto |

#### Componentes Accesibilidad (components/accessibility/)
| Componente | Descripción | Estado |
|------------|-------------|--------|
| `AccessibilityWidget.vue` | FAB + drawer lateral | ✅ |
| `AccessibilityMenu.vue` | Menu completo con tabs (Visión/Audio/Media/Cognitivo/Voz/Motriz) | ✅ |

### Vistas (Views/)

| Vista | Props | Estado | Observaciones |
|-------|-------|--------|---------------|
| `HomeView.vue` | - | ✅ | Hero con video, SearchBar, CardGrid |
| `OnboardingView.vue` | - | ✅ | Wrapper para TravelerWizard |
| `SearchView.vue` | - | ✅ | Resultados mock Destinos/Hoteles/Tours |
| `DestinationView.vue` | id route param | ✅ | Datos mock tipo Galapagos/Quito |
| `ServiceView.vue` | - | ⚠️ | Datos mock Hoteles/Tours/Transporte |
| `ProfileView.vue` | - | ✅ | ProfileForm + historial mock |
| `ItineraryView.vue` | - | ✅ | Vista día-por-día con actividades |
| `ReservationsView.vue` | - | ✅ | Lista reservas mock |
| `ChatAssistantView.vue` | - | ⚠️ | ChatBox mock, Sin API llamada real |

### Configuración Firebase (FCM)

| Archivo | Estado | Contenido |
|---------|--------|-----------|
| `public/firebase-messaging-sw.js` | ✅ | Service Worker registrado |
| Config Firebase | ✅ | Proyecto `destinify-6687b` configurado |
| Integración FCM Client | ⚠️ | Solo service worker, sin lógica cliente |

### Análisis UX/UI

✅ **Cumplimiento UX/UI:**
- Diseño mobile-first: Implementado con `md:grid-cols-2` y breakpoints MDI
- Diseño moderno minimalista: Cards con `rounded-[28px]`, bordes suaves
- Paleta de colores: Variables CSS bien definidas en `style.css`
- Accesibilidad: Sistema completo implementado (zoom, daltónicos, dislexia, contraste, etc.)
- Focus visible: Clases `focus-ring` aplicadas globalmente

⚠️ **Hallazgos UX/UI:**
- `AuthLayout.vue` actualmente no se usa en rutas (OnboardingView no lo aplica)
- Colores hardcodeados en múltiples componentes (hex directo vs variables CSS)
- Alguna inconsistencia entre hex usados (#ff7a1a vs #ff8a2a)

### Análisis Backend (Frontend)

| Aspecto | Estado | Hallazgo |
|---------|--------|----------|
| Cliente API | ✅ | `api.ts` con axios y baseURL configurable |
| Variables entorno | ✅ | `VITE_API_URL` definida en tipo |
| Toda la data actual | ⚠️ | Es MOCK hardcodeada en vistas/componentes |
| Conexión real | ❌ | Sin consumo de endpoints del backend |

### Análisis Técnico

| Aspecto | Estado | Detalles |
|---------|--------|----------|
| TypeScript | ✅ | strict, `erasableSyntaxOnly: true` |
| vue-tsc | ✅ | Configurado en `tsconfig.app.json` |
| Linting | ❓ | No configurado explícitamente |
| PWA | ⚠️ | Plugin instalado pero sin configuración visible en vite.config.ts |
| Service Worker | ✅ | firebase-messaging-sw.js en public/ |

### Hallazgos Prioritarios

🟡 **Importante - Pendientes de Desarrollo:**

1. **Onboarding incompleto**: Step 2 (Preferencias) y Step 3 (Personalización IA) están como placeholders
2. **Datos mock en todas las vistas**: No hay conexión real con backend API
3. **Auth no implementada**: Sin login/registro, rutas protegidas o middleware
4. **Firebase Client no integrado**: Solo SW existe, sin lógica de suscripción a topics FCM
5. **Falta servicios HTTP especializados**: Solo `api.ts` genérico, sin `tripService.ts`, `authService.ts`, etc.
6. **No hay manejo de errores**: Llamadas API sin try/catch, sin validaciones robustas
7. **No hay guardas de ruta**: Sin protección de rutas privadas

🟢 **Buenas Prácticas Encontradas:**
- Estructura modular y escalable
- Sistema de accesibilidad exhaustivo
- Persistencia automática (localStorage) en onboarding y accesibilidad
- Uso correcto de TypeScript con tipos definidos
- Diseño mobile-first responsivo
- Accesibilidad semántica (aria-labels, roles)
- Código limpio y organizado

### Próximos Pasos Sugeridos

1. Completar pasos 2 y 3 del onboarding
2. Crear servicios HTTP específicos (tripService, authService, etc.)
3. Implementar conexión real con backend API
4. Implementar sistema de autenticación y rutas protegidas
5. Integrar Firebase Client SDK (script token, onMessage)
6. Migrar datos mock a consumo de endpoints
