# GestorPro — Frontend Angular

Frontend moderno para el backend **Gestor de Datos Personales** (Spring Boot).

## 🎨 Diseño
- Tema oscuro premium con glassmorphism
- Tipografía: **Syne** (títulos) + **DM Sans** (cuerpo)
- Paleta: fondo `#0c0d14`, acento `#6366f1 → #8b5cf6`
- Totalmente responsivo (móvil, tablet, escritorio)

## 📁 Estructura de Componentes

```
src/app/
├── models/
│   └── expense.model.ts          # Tipos, enums y mapas de etiquetas
├── services/
│   └── expense.service.ts        # Cliente HTTP → API REST
└── components/
    ├── header/                   # Barra de navegación superior
    ├── dashboard/                # Orquestador principal (estado global)
    ├── expense-stats/            # Tarjetas KPI + desglose por categoría
    ├── expense-list/             # Tabla con filtros, orden y confirmación
    └── expense-form/             # Panel lateral (crear / editar gasto)
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ y npm
- Angular CLI 17: `npm install -g @angular/cli`
- Backend Spring Boot corriendo en `http://localhost:8080`

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
ng serve

# 3. Abrir en el navegador
# → http://localhost:4200
```

### Build de producción
```bash
ng build --configuration production
# Salida en: dist/gestor-frontend/
```

## 🔌 API Conectada

| Método | Endpoint                        | Uso en frontend                    |
|--------|---------------------------------|------------------------------------|
| GET    | `/api/expenses`                 | Cargar todos los gastos            |
| POST   | `/api/expenses`                 | Crear nuevo gasto (formulario)     |
| PUT    | `/api/expenses/{id}`            | Editar gasto (formulario)          |
| DELETE | `/api/expenses/{id}`            | Eliminar con confirmación inline   |
| GET    | `/api/expenses/category/{cat}`  | (Disponible — filtro local activo) |
| GET    | `/api/expenses/date/{date}`     | (Disponible — filtro local activo) |

> **CORS:** El backend ya tiene `@CrossOrigin(origins = "http://localhost:4200")`, no requiere configuración adicional.

## 🧩 Categorías y Métodos de Pago

**Categorías:** `FOOD · TRANSPORT · ENTERTAINMENT · HEALTH · EDUCATION · UTILITIES · SHOPPING · OTHER`

**Métodos de pago:** `CASH · DEBIT_CARD · CREDIT_CARD · BANK_TRANSFER · DIGITAL_WALLET`

## ✨ Funcionalidades

- **Dashboard con KPIs** — Total gastado, gasto del mes, promedio y máximo
- **Desglose por categoría** — Barras de progreso con porcentaje y total
- **Tabla de gastos** — Filtro por categoría (chips), filtro por fecha, ordenación por fecha/monto
- **Panel lateral animado** — Formulario reactivo con validaciones completas
- **Selección visual** — Chips de categoría y método de pago en el formulario
- **Confirmación de borrado** — Overlay inline por fila (sin modal externo)
- **Notificaciones toast** — Feedback de éxito/error con auto-desaparición
- **Estados de carga** — Skeleton loader animado mientras carga la API
