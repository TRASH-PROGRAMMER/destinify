# 🧠 Destinify - Arquitectura y Stack Tecnológico

## 📌 Descripción General

Destinify es una plataforma de turismo inteligente personalizado que utiliza inteligencia artificial para planificar, gestionar y optimizar viajes en tiempo real, adaptándose a las preferencias del usuario.

---

## 🏗️ Arquitectura General

El sistema sigue una arquitectura **modular basada en servicios**, organizada como un **monorepo**, permitiendo desarrollo ágil y escalabilidad progresiva.

### 📁 Estructura del proyecto

```bash
backend/
├── api/                # Backend principal (Express + TypeScript)
├── ia-service/         # Servicio de inteligencia artificial (Flask)
├── shared/             # (Opcional) utilidades compartidas
├── docker-compose.yml  # Orquestación de servicios


🔧 Componentes principales
1. 🟢 API / Gateway (Backend principal)
Tecnología: Node.js + Express + TypeScript
Función:
API REST
Punto de entrada (API Gateway ligero)
Autenticación
Gestión de usuarios, viajes y reservas (jwt)
Comunicación con el servicio de IA
Arquitectura: Clean Architecture + Hexagonal
📁 Estructura interna
api/
├── src/
│   ├── domain/                  # Capa de Dominio (Hexagonal: Inside)
│   │   ├── entities/          # Modelos de negocio (User, Trip)
│   │   ├── use-cases/         # Lógica de aplicación (CreateTrip, GetRecommendations)
│   │   └── interfaces/        # Puertos (Definición de repositorios y servicios externos)
│   │
│   ├── infrastructure/        # Capa de Infraestructura (Hexagonal: Outside)
│   │   ├── controllers/       # Adaptadores de entrada (Express)
│   │   ├── repositories/      # Adaptadores de salida 
│   │   ├── external-services/ # Clientes para IA (Flask) y Firebase (FCM)
│   │   └── database/          # Configuración de PostgreSQL
│   │
│   ├── application/           # Punto de entrada y configuración global
│   │   ├── server.ts          # Configuración de Express
│   │           # Definición de rutas
│   └── main.ts                # Inicio de la aplicación
├── .env
└── package.json
2. 🧠 Servicio de IA
Tecnología: Python + Flask + mcpserver + provedor(gemini) + tools
Arquitectura: Clean Architecture + Hexagonal
Separación de responsabilidades
Escalabilidad progresiva
Modularidad
📁 Estructura interna
src/
├── domain/
│   ├── entities/
│   ├── use_cases/
│   ├── services/
│   └── interfaces/
│
├── infrastructure/
│   ├── ml_models/
│   ├── external_apis/
│   └── persistence/
│
├── application/
│   ├── controllers/
│   ├── routes/
│   ├── schemas/
│   └── flask_app.py
Funciones:
Recomendación de destinos
Generación de itinerarios
Predicción de preferencias
Asistente conversacional
Análisis contextual (clima, ubicación, fecha)
3. 🔔 Sistema de Notificaciones
Tecnología: Firebase Cloud Messaging (FCM)
Funciones:
Notificaciones push
Alertas en tiempo real
Recordatorios de actividades
Recomendaciones contextuales
4. 🗄️ Base de Datos
Motor: PostgreSQL
Contenerización: Docker
ORM: pg
Funciones:
Gestión de usuarios
Almacenamiento de itinerarios
Historial de viajes
Preferencias del usuario
diagrama entidad relacion:

| Relación               | Tipo |
| ---------------------- | ---- |
| User → TravelerProfile | 1:1  |
| User → Role            | N:M  |
| User → Itinerary       | 1:N  |
| User → Booking         | 1:N  |
| User → Feedback        | 1:N  |
| User → Notification    | 1:N  |
| User → AIConversation  | 1:N  |
| User → Interest        | N:M  |
| Destination → Service  | 1:N  |
| Provider → Service     | 1:N  |
| Guide → TourService    | 1:N  |
| Itinerary → Service    | N:M  |
| Service → Booking      | 1:N  |
| Booking → Payment      | 1:1  |
| Service → Feedback     | 1:N  |


Enfoque de Esquemas (Separación lógica)
Si quieres tener las cosas más organizadas sin crear múltiples bases de datos, PostgreSQL te permite crear esquemas (schemas) dentro de la misma base de datos destinify_db:

Esquema auth: contiene las tablas de usuarios.
Esquema travel: contiene tablas de itinerarios e historial.
Esquema interactions: contiene el feedback.

🔗 Comunicación entre servicios
API ↔ IA → HTTP (REST)
API ↔ DB → ORM
API ↔ FCM → SDK Firebase
🐳 Contenerización

Se utiliza Docker para facilitar despliegue y desarrollo:


docker-compose up

Servicios incluidos:

API (Node.js)
IA (Flask)
Base de datos (PostgreSQL)
⚙️ Stack Tecnológico
Backend
Node.js
Express.js
TypeScript
IA
Python
Flask
mcp serves + tools + gemini  
Base de datos
PostgreSQL
pg 
Notificaciones
Firebase Cloud Messaging
Infraestructura
Docker
Docker Compose
🧠 Enfoque Arquitectónico
Clean Architecture + Arquitectura Hexagonal
Separación de responsabilidades
Escalabilidad progresiva
Modularidad


✅ Conclusión

La arquitectura de Destinify está diseñada para:

Ser escalable
Mantener separación clara de responsabilidades
Facilitar integración de inteligencia artificial
Permitir evolución hacia sistemas más complejos
```
