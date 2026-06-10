**Frontend Destinify con Vue**

### ⚙️ Stack 

- **Framework** → Vue.js

- **Build tool** → Vite

- **Lenguaje** → TypeScript

- **Router** → Vue Router

- **Estado** → Pinia

- **HTTP** → Axios

- **UI** → Vuetify

- **tailwind** →Css

### 🏗️ Estructura del proyecto

```bash
frontend/
├── src/
│   ├── assets/
│   ├── components/        # Componentes reutilizables
│   ├── views/             # Páginas principales
│   ├── router/            # Rutas
│   ├── store/             # Pinia
│   ├── services/          # API calls (backend)
│   ├── composables/       # lógica reutilizable (hooks)
│   ├── layouts/           # estructura (navbar, etc)
│   └── main.ts
```

### 📱 Pantallas clave (muy importante para tu app)

#### 1. 🧑 **Perfil del viajero**

- intereses

- presupuesto

- idioma

- tipo de viaje

#### 2. 🔍 **Búsqueda de destinos**

- input (ciudad o experiencia)

- lista de resultados

#### 3. 🧠 **Recomendaciones (IA)**

- destinos sugeridos

- actividades

- experiencias

#### 4. 🗺️ **Itinerario**

- días organizados

- horarios

- mapa

#### 5. 📅 **Reservas**

- hoteles
- tours
- transporte

#### 6. 📲 **Asistente IA (chat)**

- tipo chatbot
- recomendaciones en tiempo real

### 🔗 **Conexión con tu backend**

En services/api.ts:

import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3000/api"});

### 🤖 Ejemplo: llamar a la IA

// services/tripService.tsimport { api } from "./api";export const getRecommendations = (data: any) => { return api.post("/recommendations", data);};

🧠 Estado global (Pinia)
// store/userStore.tsimport { defineStore } from "pinia";export const useUserStore = defineStore("user", { state: () => ({ profile: null }), actions: { setProfile(data: any) { this.profile = data; } }});

🔔 **Notificaciones (FCM en Vue)**

- integrar Firebase Cloud Messaging en el frontend para:

- recibir alertas

- mostrar notificaciones push

📦 **PWA**

- convierte tu app en PWA:

- plugin: vite-plugin-pwa

-tendre:

- instalación en móvil
- uso offline
- experiencia tipo app

### 🧠 **UX (clave para tu proyecto)**

La app debe ser:

#### Principios

- Interfaz intuitiva y funcional
- Diseño moderno y minimalista
- Enfoque mobile-first
- responsive
- prioridad a la experiencia del usuario
- prioridad a la accesibilidad
- prioridad a la usabilidad
- prioridad a la mantenibilidad
- prioridad a la escalabilidad
- prioridad el diseño centrado en el usuario
- Nunca hagas que el usuario invierta esfuerzo para descubrir una limitación crítica al final del proceso.
-evitar la fatiga de decisión
- mantener al usuario informado
- mantener al usuario motivado
- mantener al usuario comprometido
- mantener al usuario satisfecho
- mantener al usuario seguro
- mantener al usuario feliz
- evitar la friccion innecesaria
- evitar la carga cognitiva
- evitar los errores no intencionados
- evitar los errores criticos
- evitar los errores de datos
- evitar los errores de tiempo
- evitar los errores de red
- evitar los errores de memoria


### Características

- Uso de imágenes, mapas y tarjetas
- Comparación clara de opciones
- Información práctica (precio, horario, ubicación)

### Accesibilidad

- Opciones para discapacidad (visual, auditiva, motriz)

### Buenas prácticas

- No hacer esperar al usuario
- “No me hagas pensar”
- Un paso a la vez
- Prevención de errores
- Mensajes claros y amigables

### Técnicos

- Backend seguro y robusto
- Animaciones fluidas
- Optimización de imágenes y videos

---

## 5. Flujo general

Inicio  
→ Perfil del viajero  
→ Búsqueda de destino  
→ Recomendación personalizada  
→ Armado de itinerario  
→ Reserva de servicios  
→ Seguimiento durante el viaje  
→ Evaluación y aprendizaje del sistema

### 6.Flujos de usuario por rol

#### 1. Flujo de usuario — Viajero independiente

Inicio
→ Registro / Inicio de sesión
→ Configuración del perfil viajero
→ Selección de intereses y presupuesto
→ Búsqueda de destinos
→ Visualización de recomendaciones IA
→ Consulta de información detallada
→ Creación del itinerario
→ Edición manual del itinerario
→ Reserva de hoteles / tours / transporte
→ Confirmación de reservas
→ Recepción de alertas y recordatorios
→ Recomendaciones en tiempo real durante el viaje
→ Evaluación y calificación de servicios
→ Fin del viaje

### 2. Flujo de usuario — Turista organizado

Inicio
→ Registro / Inicio de sesión
→ Configuración de preferencias generales
→ Selección de paquete turístico
→ Generación automática del itinerario
→ Visualización del plan completo
→ Pago y confirmación del paquete
→ Recepción de comprobantes
→ Seguimiento del viaje mediante notificaciones
→ Asistencia virtual durante el viaje
→ Evaluación de la experiencia completa
→ Fin del viaje

### 3. Flujo de usuario — Viajero frecuente

Inicio
→ Inicio de sesión rápido
→ Recuperación automática de preferencias
→ Visualización de historial de viajes
→ Selección de viaje anterior o nuevo destino
→ Duplicación o ajuste de itinerario
→ Reserva rápida de servicios
→ Gestión simultánea de viajes
→ Recepción de notificaciones en tiempo real
→ Consulta de comprobantes y facturas
→ Evaluación de servicios utilizados
→ Fin del flujo

### 4. Flujo de usuario — Turista digital

Inicio
→ Inicio de sesión
→ Interacción con asistente conversacional IA
→ Solicitud de recomendaciones inteligentes
→ Análisis contextual (clima, ubicación, fecha)
→ Generación dinámica de actividades
→ Uso de mapas interactivos
→ Traducción básica en tiempo real
→ Recepción de sugerencias inteligentes
→ Ajuste automático del itinerario
→ Evaluación de experiencia digital
→ Fin del flujo

### 5. Flujo de usuario — Administrador de plataforma

Inicio
→ Inicio de sesión administrativo
→ Acceso al panel de administración
→ Gestión de usuarios
→ Gestión de destinos y contenido turístico
→ Validación de contenido de proveedores
→ Supervisión de reservas y actividad del sistema
→ Revisión de reportes y estadísticas
→ Gestión de incidencias y soporte
→ Configuración de parámetros y permisos
→ Monitoreo general de la plataforma
→ Cierre de sesión

### 6. Flujo de usuario — Proveedor de servicios turísticos

Inicio
→ Registro como proveedor
→ Inicio de sesión
→ Creación de perfil empresarial
→ Publicación de servicios turísticos
→ Configuración de precios y disponibilidad
→ Subida de imágenes y descripciones
→ Recepción de solicitudes de reserva
→ Confirmación o rechazo de reservas
→ Gestión de historial de reservas
→ Respuesta a reseñas de usuarios
→ Consulta de métricas y rendimiento
→ Cierre de sesión

### 7. Flujo de usuario — Guía turístico

Inicio
→ Registro como guía turístico
→ Inicio de sesión
→ Configuración del perfil profesional
→ Publicación de tours y actividades
→ Configuración de horarios y disponibilidad
→ Recepción de reservas
→ Comunicación con viajeros
→ Gestión de cambios o cancelaciones
→ Ejecución del tour
→ Recepción de evaluaciones y calificaciones
→ Consulta de historial de actividades
→ Cierre de sesión

### 8. Restricciones por rol de usuario

## 1. Rol: Viajero independiente

Restricciones:
El usuario debe registrarse para acceder a funciones avanzadas.
El usuario no puede modificar información de otros usuarios.
El usuario solo puede gestionar sus propias reservas e itinerarios.
El usuario depende de conexión a internet para funciones en tiempo real.
Algunas reservas pueden depender de disponibilidad de terceros.
El usuario no puede publicar servicios turísticos en la plataforma.
El usuario no tiene permisos administrativos.
El usuario no puede alterar recomendaciones generadas por el sistema IA fuera de los parámetros permitidos.

## 2. Rol: Turista organizado

Restricciones:
El usuario debe seleccionar paquetes previamente disponibles.
Algunas modificaciones del itinerario pueden estar limitadas.
El usuario no puede editar servicios incluidos por proveedores externos.
El usuario debe completar pagos para confirmar reservas.
El usuario no puede gestionar contenido de la plataforma.
El usuario depende de disponibilidad y horarios definidos por proveedores.
El usuario no puede acceder a estadísticas internas del sistema.
## 3. Rol: Viajero frecuente

Restricciones:
El usuario debe mantener una cuenta activa para conservar historial.
Algunas funciones rápidas requieren datos guardados previamente.
El usuario no puede modificar reservas ya confirmadas fuera de políticas permitidas.
El usuario no puede acceder a información de otros viajeros.
El sistema puede limitar reservas simultáneas excesivas.
El usuario no tiene permisos administrativos.
## 4. Rol: Turista digital

Restricciones:
El usuario requiere conexión a internet para funciones inteligentes.
Algunas funciones IA pueden depender de APIs externas.
El reconocimiento por voz puede variar según idioma o dispositivo.
El usuario no puede modificar configuraciones internas de IA.
Algunas traducciones automáticas pueden no ser totalmente precisas.
El usuario no tiene permisos para administrar contenido turístico.
## 5. Rol: Administrador de plataforma

Restricciones:
El administrador debe autenticarse con credenciales seguras.
Las acciones administrativas deben quedar registradas en auditorías.
El administrador no puede eliminar información crítica sin confirmación.
El administrador debe respetar políticas de privacidad y protección de datos.
El acceso administrativo puede estar limitado por niveles de permisos.
El administrador no puede modificar transacciones ya procesadas sin autorización especial.
El administrador depende del correcto funcionamiento del servidor y base de datos.
## 6. Rol: Proveedor de servicios turísticos

Restricciones:
El proveedor debe ser validado por la plataforma antes de publicar servicios.
El proveedor solo puede gestionar sus propios servicios.
El proveedor no puede modificar reservas ajenas.
El proveedor debe mantener información actualizada y verídica.
El proveedor depende de aprobación administrativa para ciertos contenidos.
El proveedor no puede acceder a estadísticas globales del sistema.
El proveedor debe respetar políticas de calidad y servicio de la plataforma.
## 7. Rol: Guía turístico

Restricciones:
El guía debe registrarse y validar su perfil profesional.
El guía solo puede gestionar sus propios tours y actividades.
El guía no puede acceder a configuraciones administrativas.
El guía depende de disponibilidad y reservas realizadas por usuarios.
El guía debe respetar horarios y condiciones establecidas.
El guía no puede modificar evaluaciones realizadas por viajeros.
El guía debe cumplir políticas de comportamiento y seguridad definidas por la plataforma.

#### 🔥 **Flujo completo frontend**

Usuario → **Vue App** → **API (Express)** → **IA (Flask)** → **respuesta personalizada**
#### prototipos
los  prototipos son una representacion visual de la aplicacion.
se encuentran en la carpeta "docs/assets/prototipos".

#### 💡 **Conclusión clara**

- Vue + Vite es excelente
- perfecto con tu backend
- Escalable y moderno
