# GIPS User API

API REST para la operación de usuarios (estudiantes) del sistema GIPS (Gestión Integral de Prácticas Profesionales). Conecta a la misma base de datos MongoDB que la API Admin.

## Tecnologías

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **express-validator** para validaciones
- **helmet** para headers seguros
- **express-rate-limit** para protección contra abusos
- **CORS** habilitado para todos los orígenes

## Instalación

```bash
pnpm install
```

## Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
PORT=3002
URI_MONGODB=mongodb://localhost:27017/GIPS
NODE_ENV=development
```

## Iniciar

```bash
pnpm start
```

## Endpoints

Base URL: `http://localhost:3002/GIPS/v1`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/student` | Listar estudiantes (paginado) |
| GET | `/student/:id` | Obtener estudiante por ID |
| GET | `/practice` | Listar prácticas (paginado, filtro por estudiante) |
| GET | `/practice/:id` | Obtener práctica por ID |
| GET | `/evidence` | Listar evidencias (paginado, filtro por práctica) |
| GET | `/evidence/:id` | Obtener evidencia por ID |
| GET | `/reposte` | Listar reportes de horas (paginado, filtro por estudiante) |
| GET | `/reposte/:id` | Obtener reporte de horas por ID |
| GET | `/review` | Listar revisiones (paginado, filtro por práctica) |
| GET | `/review/:id` | Obtener revisión por ID |

### Paginación

Todos los endpoints de lista soportan paginación:

```
GET /GIPS/v1/student?page=1&limit=10
```

### Filtros

- `/practice?estudiante=<id>&estado=aprobada`
- `/evidence?practica=<id>`
- `/reposte?estudiante=<id>`
- `/review?practica=<id>`

## Docker

```bash
docker build -t gips-user-api .
docker run -p 3002:3002 gips-user-api
```
