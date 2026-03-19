# 💸 GestorPro — Sistema de Gestión de Gastos Personales

<div align="center">

![GestorPro Banner](https://placehold.co/900x200/080808/dc2626?text=GESTORPRO+%E2%80%94+Finance+Manager&font=bebas-neue)

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Aplicación full-stack para registrar, gestionar y analizar gastos personales.**  
Backend REST en Spring Boot · Frontend SPA en Angular 17 · Tema oscuro premium

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Vista Previa](#-vista-previa)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [🔧 Backend — Spring Boot](#-backend--spring-boot)
  - [Tecnologías](#tecnologías-backend)
  - [Estructura del Proyecto](#estructura-del-proyecto-backend)
  - [Modelo de Datos](#modelo-de-datos)
  - [Endpoints REST](#endpoints-rest)
  - [Capas de la Aplicación](#capas-de-la-aplicación)
  - [Configuración y Arranque](#configuración-y-arranque-backend)
- [🎨 Frontend — Angular](#-frontend--angular)
  - [Tecnologías](#tecnologías-frontend)
  - [Estructura del Proyecto](#estructura-del-proyecto-frontend)
  - [Componentes](#componentes)
  - [Vistas de la Aplicación](#vistas-de-la-aplicación)
  - [Sistema de Diseño](#sistema-de-diseño)
  - [Configuración y Arranque](#configuración-y-arranque-frontend)
- [🔗 Conexión Frontend ↔ Backend](#-conexión-frontend--backend)
- [📦 Instalación Completa](#-instalación-completa-paso-a-paso)
- [❓ Preguntas Frecuentes](#-preguntas-frecuentes)

---

## 🌟 Descripción General

**GestorPro** es una aplicación full-stack que permite a los usuarios llevar un control detallado de sus gastos personales. Combina un robusto backend REST construido con **Spring Boot** y **JPA/Hibernate**, con un frontend moderno y elegante en **Angular 17** con tema oscuro y elementos visuales dinámicos.

### ¿Qué puedes hacer?

| Funcionalidad | Descripción |
|---|---|
| ➕ **Registrar gastos** | Crea registros con descripción, monto, categoría, fecha y método de pago |
| ✏️ **Editar gastos** | Modifica cualquier campo de un gasto existente |
| 🗑️ **Eliminar gastos** | Elimina registros con confirmación inline |
| 📊 **Ver estadísticas** | KPIs de total, promedio, máximo y gasto mensual en tiempo real |
| 📈 **Analizar reportes** | Desglose por categoría, gráfico mensual y top 5 gastos |
| 🔍 **Filtrar y ordenar** | Filtra por categoría o fecha, ordena por monto o fecha |

---

## 🖥️ Vista Previa

### Dashboard Principal
```
┌─────────────────────────────────────────────────────────────────┐
│ ◈ GESTORPRO    [Dashboard]  Gastos  Reportes        ● API Live │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Tus GASTOS,          ┌──────────────────┐                      │
│  Bajo                 │ Total: $3.240.000 │  ┌────────────┐     │
│  Control.             │ COP              │  │    42      │     │
│                       └──────────────────┘  │ Registros  │     │
│  [ + Registrar Gasto ]                      └────────────┘     │
│                                                                  │
├──────────┬──────────┬──────────┬──────────────────────────────┤
│ ◈ Total  │ ◉ Mes    │ ◎ Prom.  │ ◆ Máximo                     │
│$3.240.000│ $890.000 │  $77.100 │  $450.000                    │
└──────────┴──────────┴──────────┴──────────────────────────────┘
```

### Vista Gastos (Cards)
```
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ 🍔            │ │ 🚌            │ │ 💊            │
│ Almuerzo      │ │ TransMilenio  │ │ Consulta      │
│ $45.000       │ │ $112.000      │ │ $180.000      │
│ Alimentación  │ │ Transporte    │ │ Salud         │
└───────────────┘ └───────────────┘ └───────────────┘
```

### Vista Reportes
```
┌──────────────────────────┬──────────────────────────┐
│ Por Categoría            │ Gasto Mensual            │
│                          │                          │
│ Alimentación  ████ 31%   │    ▓▓▓                  │
│ Educación     ███  24%   │  ▓▓▓▓▓                  │
│ Salud         ██   20%   │ ▓▓▓▓▓▓▓                 │
│ Transporte    █    14%   │ Ene Feb Mar              │
└──────────────────────────┴──────────────────────────┘
```

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Angular 17  (localhost:4200)                │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │   │
│  │  │Dashboard │  │  Gastos  │  │      Reportes        │  │   │
│  │  └──────────┘  └──────────┘  └──────────────────────┘  │   │
│  │           ExpenseService (HttpClient)                    │   │
│  └─────────────────────┬───────────────────────────────────┘   │
└────────────────────────│────────────────────────────────────────┘
                         │ HTTP / JSON (CORS habilitado)
                         │ localhost:4200 ↔ localhost:8080
┌────────────────────────▼────────────────────────────────────────┐
│                        SERVIDOR                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           Spring Boot 3.x  (localhost:8080)             │   │
│  │  ┌─────────────┐  ┌──────────┐  ┌────────────────────┐ │   │
│  │  │  Controller  │→ │ Service  │→ │    Repository      │ │   │
│  │  │/api/expenses │  │(impl)    │  │  JPA / Hibernate   │ │   │
│  │  └─────────────┘  └──────────┘  └────────┬───────────┘ │   │
│  │           DTO / Mapper (MapStruct)         │             │   │
│  └────────────────────────────────────────────│────────────┘   │
└───────────────────────────────────────────────│─────────────────┘
                                                │
┌───────────────────────────────────────────────▼─────────────────┐
│                        BASE DE DATOS                            │
│              MySQL 8.x  —  tabla: expense                       │
│  id | description | amount | category | date | paymentMethod   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Backend — Spring Boot

### Tecnologías Backend

| Tecnología | Versión | Uso |
|---|---|---|
| **Java** | 17 | Lenguaje principal |
| **Spring Boot** | 3.x | Framework principal |
| **Spring Data JPA** | 3.x | Acceso a datos / ORM |
| **Hibernate** | 6.x | Implementación JPA |
| **MapStruct** | 1.5 | Mapeo DTO ↔ Entidad |
| **Lombok** | 1.18 | Reducción de boilerplate |
| **MySQL** | 8.x | Base de datos relacional |
| **Bean Validation** | 3.x | Validación de entidades |
| **Maven** | 3.9 | Gestor de dependencias |

---

### Estructura del Proyecto Backend

```
Gestor/
└── src/
    └── main/
        ├── java/com/example/gestor_datos_personales/
        │   │
        │   ├── 📄 GestorPersonalApplication.java    ← Punto de entrada
        │   │
        │   ├── 📁 config/
        │   │   └── CorsConfig.java                  ← Configuración CORS
        │   │
        │   ├── 📁 controller/
        │   │   └── ExpenseController.java            ← Endpoints REST
        │   │
        │   ├── 📁 dto/
        │   │   └── ExpenseDto.java                   ← Objeto de transferencia
        │   │
        │   ├── 📁 exception/
        │   │   ├── ExpenseController.java            ← Excepción de negocio
        │   │   └── GlobalExceptionHandler.java       ← Manejo global de errores
        │   │
        │   ├── 📁 mapper/
        │   │   └── ExpenseMapper.java                ← Mapeo con MapStruct
        │   │
        │   ├── 📁 model/entity/
        │   │   ├── Expense.java                      ← Entidad principal
        │   │   └── enumerador/
        │   │       ├── CategoryEnum.java             ← Categorías de gasto
        │   │       └── PaymentMethodEnum.java        ← Métodos de pago
        │   │
        │   ├── 📁 repository/
        │   │   └── ExpenseRepository.java            ← Acceso a datos (JPA)
        │   │
        │   └── 📁 service/
        │       ├── ExpenseService.java               ← Interfaz del servicio
        │       └── impl/
        │           └── ExpenseServiceImpl.java       ← Implementación
        │
        └── resources/
            └── application.properties               ← Configuración DB
```

---

### Modelo de Datos

#### Entidad `Expense`

```java
@Entity
@Table(name = "expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(min = 3, max = 200)
    private String description;          // Descripción del gasto

    @DecimalMin("0.01") @Digits(integer = 10, fraction = 2)
    private BigDecimal amount;           // Monto (mínimo $0.01)

    @Enumerated(EnumType.STRING)
    private CategoryEnum category;       // Categoría

    @PastOrPresent
    private LocalDate date;              // Fecha (no puede ser futura)

    @Enumerated(EnumType.STRING)
    private PaymentMethodEnum paymentMethod; // Método de pago
}
```

#### Categorías disponibles (`CategoryEnum`)

| Valor | Descripción |
|---|---|
| `FOOD` | 🍔 Alimentación |
| `TRANSPORT` | 🚌 Transporte |
| `ENTERTAINMENT` | 🎬 Entretenimiento |
| `HEALTH` | 💊 Salud |
| `EDUCATION` | 📚 Educación |
| `UTILITIES` | 💡 Servicios públicos |
| `SHOPPING` | 🛍️ Compras |
| `OTHER` | 📦 Otro |

#### Métodos de pago (`PaymentMethodEnum`)

| Valor | Descripción |
|---|---|
| `CASH` | 💵 Efectivo |
| `DEBIT_CARD` | 💳 Tarjeta Débito |
| `CREDIT_CARD` | 💳 Tarjeta Crédito |
| `BANK_TRANSFER` | 🏦 Transferencia Bancaria |
| `DIGITAL_WALLET` | 📱 Billetera Digital |

#### Esquema de la tabla MySQL

```sql
CREATE TABLE expense (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    description    VARCHAR(200)   NOT NULL,
    amount         DECIMAL(10,2)  NOT NULL,
    category       VARCHAR(50)    NOT NULL,
    date           DATE           NOT NULL,
    payment_method VARCHAR(50)    NOT NULL
);
```

---

### Endpoints REST

**URL base:** `http://localhost:8080/api/expenses`

| Método | Endpoint | Descripción | Body (JSON) | Respuesta |
|---|---|---|---|---|
| `GET` | `/` | Listar todos los gastos | — | `200` Array de gastos |
| `GET` | `/{id}` | Obtener gasto por ID | — | `200` Gasto / `404` |
| `GET` | `/category/{category}` | Filtrar por categoría | — | `200` Array filtrado |
| `GET` | `/amount/{amount}` | Filtrar por monto | — | `200` Array filtrado |
| `GET` | `/date/{date}` | Filtrar por fecha `yyyy-MM-dd` | — | `200` Array filtrado |
| `POST` | `/` | Crear nuevo gasto | `Expense` | `201` + Location header |
| `PUT` | `/{id}` | Actualizar gasto | `ExpenseDto` | `200` Gasto actualizado |
| `DELETE` | `/{id}` | Eliminar gasto | — | `200` OK |

#### Ejemplos de peticiones

**Crear gasto:**
```http
POST http://localhost:8080/api/expenses
Content-Type: application/json

{
  "description": "Almuerzo en restaurante",
  "amount": 45000.00,
  "category": "FOOD",
  "date": "2026-03-18",
  "paymentMethod": "CASH"
}
```

**Actualizar gasto:**
```http
PUT http://localhost:8080/api/expenses/1
Content-Type: application/json

{
  "description": "Almuerzo actualizado",
  "amount": 55000.00,
  "category": "FOOD",
  "date": "2026-03-18",
  "paymentMethod": "DEBIT_CARD"
}
```

**Respuesta exitosa (POST):**
```http
HTTP/1.1 201 Created
Location: http://localhost:8080/api/expenses/1

{
  "id": 1,
  "description": "Almuerzo en restaurante",
  "amount": 45000.00,
  "category": "FOOD",
  "date": "2026-03-18",
  "paymentMethod": "CASH"
}
```

---

### Capas de la Aplicación

```
┌──────────────────────────────────────────────┐
│             ExpenseController                │
│  • @RestController  @RequestMapping          │
│  • Recibe HTTP, devuelve ResponseEntity      │
│  • Manejo de excepciones local               │
└─────────────────────┬────────────────────────┘
                      │ usa
┌─────────────────────▼────────────────────────┐
│             ExpenseService (interfaz)         │
│  + expenseList()                             │
│  + expenseById(Long id)                      │
│  + expenseListCategory(CategoryEnum)         │
│  + newExpense(Expense)                       │
│  + updateExpense(Long, ExpenseDto)           │
│  + delete(Long)                              │
└─────────────────────┬────────────────────────┘
                      │ implementa
┌─────────────────────▼────────────────────────┐
│           ExpenseServiceImpl                 │
│  • @Service  @Transactional                  │
│  • Lógica de negocio                         │
│  • Usa ExpenseRepository y ExpenseMapper     │
└────────┬──────────────────────┬──────────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐   ┌────────────────────────┐
│ExpenseRepository│   │    ExpenseMapper        │
│ JpaRepository   │   │  (MapStruct)            │
│ ← Spring Data   │   │  Expense ↔ ExpenseDto   │
└────────┬────────┘   └────────────────────────┘
         │
         ▼
┌─────────────────┐
│   MySQL DB      │
│  tabla: expense │
└─────────────────┘
```

#### `CorsConfig.java` — Configuración CORS

Permite las peticiones desde el frontend Angular:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200") // ← Angular dev server
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
```

> ⚠️ En producción, reemplaza `http://localhost:4200` con la URL real del frontend.

---

### Configuración y Arranque Backend

#### 1. Configurar `application.properties`

```properties
# Servidor
server.port=8080

# Base de datos MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/gestor_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

#### 2. Crear la base de datos

```sql
CREATE DATABASE IF NOT EXISTS gestor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 3. Ejecutar el backend

```bash
# Opción A — Maven wrapper (recomendado)
./mvnw spring-boot:run

# Opción B — Maven instalado globalmente
mvn spring-boot:run

# Opción C — JAR compilado
mvn clean package -DskipTests
java -jar target/gestor-datos-personales-0.0.1-SNAPSHOT.jar
```

#### 4. Verificar que está corriendo

```bash
curl http://localhost:8080/api/expenses
# Esperado: [] (array vacío si la DB está limpia)
```

---

## 🎨 Frontend — Angular

### Tecnologías Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| **Angular** | 17 | Framework SPA principal |
| **TypeScript** | 5.4 | Lenguaje principal |
| **RxJS** | 7.8 | Programación reactiva |
| **Angular Forms** | 17 | Formularios reactivos |
| **HttpClient** | 17 | Comunicación con API REST |
| **SCSS** | — | Estilos con variables y anidamiento |
| **Bebas Neue** | Google Fonts | Tipografía de display |
| **Outfit** | Google Fonts | Tipografía de cuerpo |

---

### Estructura del Proyecto Frontend

```
gestor-frontend/
├── 📄 angular.json              ← Configuración del workspace Angular
├── 📄 package.json              ← Dependencias npm
├── 📄 tsconfig.json             ← Configuración TypeScript
│
└── src/
    ├── 📄 main.ts               ← Bootstrap de la aplicación
    ├── 📄 index.html            ← HTML raíz
    ├── 📄 styles.scss           ← Estilos globales y variables CSS
    │
    └── app/
        ├── 📄 app.component.*  ← Componente raíz + gestión de navegación
        ├── 📄 app.module.ts    ← Módulo principal (declaraciones, imports)
        │
        ├── 📁 models/
        │   └── expense.model.ts ← Tipos, interfaces y mapas de etiquetas
        │
        ├── 📁 services/
        │   └── expense.service.ts ← Cliente HTTP para la API REST
        │
        └── 📁 components/
            ├── 📁 header/           ← Barra de navegación interactiva
            ├── 📁 dashboard/        ← Vista principal (hero + KPIs + tabla)
            ├── 📁 expense-stats/    ← Tarjetas KPI + desglose categorías
            ├── 📁 expense-list/     ← Tabla con filtros, orden y acciones
            ├── 📁 expense-form/     ← Panel lateral deslizante (crear/editar)
            ├── 📁 gastos-view/      ← Vista de cards de gastos
            └── 📁 reportes-view/    ← Vista de análisis y reportes
```

---

### Componentes

#### `AppComponent` — Raíz y navegación global

Gestiona el estado activo de la vista y se lo pasa al `HeaderComponent` mediante `@Input`. Recibe los eventos de navegación via `@Output`.

```typescript
export type AppView = 'dashboard' | 'gastos' | 'reportes';

export class AppComponent {
  activeView: AppView = 'dashboard';

  onNavChange(view: AppView) {
    this.activeView = view;  // cambia la vista activa
  }
}
```

#### `HeaderComponent` — Navegación interactiva

| Característica | Descripción |
|---|---|
| **Indicador deslizante** | Barra roja que se mueve con `cubic-bezier` entre tabs |
| **Inputs/Outputs** | Recibe `activeView`, emite `navChange` |
| **Menú hamburger** | Animación de 3 líneas → ✕ en móviles |
| **API Live badge** | Indicador con animación sonar verde |

```typescript
@Input()  activeView: AppView = 'dashboard';
@Output() navChange = new EventEmitter<AppView>();
```

#### `ExpenseService` — Cliente HTTP

Centraliza toda la comunicación con el backend. Implementa manejo de errores robusto.

```typescript
// Métodos disponibles:
getAll()                              // GET /api/expenses
getById(id)                           // GET /api/expenses/{id}
getByCategory(category)               // GET /api/expenses/category/{category}
getByDate(date)                       // GET /api/expenses/date/{date}
create(expense)                       // POST /api/expenses
update(id, expense)                   // PUT /api/expenses/{id}
delete(id)                            // DELETE /api/expenses/{id}
```

#### `ExpenseFormComponent` — Panel lateral

- Formulario reactivo con `FormBuilder` y validaciones completas
- Chips visuales para seleccionar categoría y método de pago
- Modo **crear** o **editar** según el `@Input() expense`
- Animación de entrada/salida con `translateX` + `cubic-bezier`

#### `ExpenseListComponent` — Tabla con funcionalidades

| Funcionalidad | Implementación |
|---|---|
| Filtro por categoría | Chips clicables, estado `filterCategory` |
| Filtro por fecha | `<input type="date">` con `[(ngModel)]` |
| Ordenar por monto/fecha | `toggleSort()` con `sortDesc` boolean |
| Confirmación de borrado | Overlay inline por fila, sin modal externo |
| Skeleton loading | Animación `shimmer` mientras carga la API |

#### `ExpenseStatsComponent` — KPIs

Calcula en `ngOnChanges` (cuando cambian los gastos):
- Total acumulado
- Total del mes actual
- Promedio por gasto
- Gasto máximo
- Desglose top 5 categorías con barras de progreso animadas

---

### Vistas de la Aplicación

#### 📊 Dashboard

Vista principal que combina:

```
Hero section (título + cards flotantes animadas)
     ↓
KPI Strip (4 métricas en grilla horizontal)
     ↓
Desglose por categoría (barras de progreso)
     ↓
Tabla de gastos recientes (con filtros y acciones)
```

#### 💳 Gastos

Vista de **grid de tarjetas** — cada gasto se muestra como una card con:
- Icono de categoría
- Barra de color superior según categoría
- Monto en tipografía display grande
- Acciones (editar/eliminar) visibles al hacer hover
- Efecto `translateY(-3px)` al pasar el mouse

#### 📈 Reportes

Vista de análisis puro:
- 4 KPIs resumidos (total, promedio, máximo, categorías activas)
- Gráfico de barras horizontales por categoría con porcentajes
- Gráfico de barras verticales por mes con tooltip en hover
- Ranking Top 5 gastos más altos

---

### Sistema de Diseño

#### Paleta de colores

```scss
:root {
  --bg:          #080808;   /* Fondo principal */
  --surface:     #0f0f0f;   /* Superficies (cards, tablas) */
  --red:         #dc2626;   /* Color de acento principal */
  --red-bright:  #ef4444;   /* Rojo hover/énfasis */
  --red-glow:    rgba(220,38,38,0.18); /* Resplandor rojo */
  --text:        #f5f5f5;   /* Texto principal */
  --text-muted:  #6b6b6b;   /* Texto secundario */
  --text-dim:    #3d3d3d;   /* Texto atenuado */
  --border:      rgba(255,255,255,0.06); /* Bordes sutiles */
}
```

#### Tipografía

| Familia | Uso | Característica |
|---|---|---|
| **Bebas Neue** | Títulos, KPIs, montos | Display dramático, tracking amplio |
| **Outfit** | Cuerpo, labels, botones | Geométrico limpio, altamente legible |

#### Animaciones clave

```scss
/* Indicador de navegación */
transition: left .38s cubic-bezier(0.34, 1.56, 0.64, 1),
            width .38s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Cards flotantes en el hero */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

/* Cambio de vista */
.view { opacity: 0; transform: translateY(10px); transition: opacity .32s, transform .32s; }
.view--active { opacity: 1; transform: translateY(0); }
```

---

### Configuración y Arranque Frontend

#### Prerrequisitos

```bash
node --version   # Requiere Node.js 18+
npm --version    # Requiere npm 9+
ng version       # Requiere Angular CLI 17
```

Si no tienes Angular CLI:
```bash
npm install -g @angular/cli@17
```

#### Instalación

```bash
# 1. Descomprimir el proyecto
unzip gestor-frontend.zip
cd gestor-frontend

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
ng serve

# 4. Abrir en el navegador
# → http://localhost:4200
```

#### Build de producción

```bash
ng build --configuration production
# Salida en: dist/gestor-frontend/
# Sirve con cualquier servidor estático (Nginx, Apache, etc.)
```

---

## 🔗 Conexión Frontend ↔ Backend

### Flujo de una petición

```
Usuario hace clic en "Registrar Gasto"
        ↓
ExpenseFormComponent emite (save)
        ↓
DashboardComponent llama expenseService.create(expense)
        ↓
ExpenseService hace POST http://localhost:8080/api/expenses
        ↓
CorsConfig permite la petición desde :4200
        ↓
ExpenseController.createNewExpense() recibe el body
        ↓
ExpenseServiceImpl.newExpense() → repository.save()
        ↓
MySQL persiste el registro
        ↓
Respuesta 201 Created + objeto guardado
        ↓
Frontend agrega el nuevo gasto al array en memoria
        ↓
Angular re-renderiza la lista automáticamente (change detection)
        ↓
Toast de éxito aparece durante 3.5 segundos
```

### Manejo de errores

```typescript
// expense.service.ts
private handleError(error: HttpErrorResponse) {
  let message = 'Error inesperado';
  if (error.status === 0)   message = 'No se puede conectar al servidor';
  if (error.status === 404) message = 'Recurso no encontrado';
  if (error.status === 400) message = 'Datos inválidos';
  return throwError(() => new Error(message));
}
```

Los errores se muestran en el **toast de notificación** (borde rojo) en la parte inferior de la pantalla.

---

## 📦 Instalación Completa Paso a Paso

### Requisitos del sistema

| Herramienta | Versión mínima | Descarga |
|---|---|---|
| Java JDK | 17 | [adoptium.net](https://adoptium.net/) |
| Maven | 3.8+ | Incluido (`mvnw`) |
| MySQL | 8.0+ | [mysql.com](https://www.mysql.com/) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| Angular CLI | 17 | `npm install -g @angular/cli@17` |

### Paso 1 — Clonar/descomprimir proyectos

```
proyecto/
├── Gestor/            ← Backend Spring Boot
└── gestor-frontend/   ← Frontend Angular
```

### Paso 2 — Configurar MySQL

```sql
-- En MySQL Workbench o terminal MySQL:
CREATE DATABASE gestor_db;
CREATE USER 'gestor_user'@'localhost' IDENTIFIED BY 'tu_password';
GRANT ALL PRIVILEGES ON gestor_db.* TO 'gestor_user'@'localhost';
FLUSH PRIVILEGES;
```

### Paso 3 — Configurar el Backend

Editar `Gestor/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestor_db
spring.datasource.username=gestor_user
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
```

### Paso 4 — Arrancar el Backend

```bash
cd Gestor
./mvnw spring-boot:run
# Esperar: "Started GestorPersonalApplication in X seconds"
```

### Paso 5 — Arrancar el Frontend

```bash
cd gestor-frontend
npm install
ng serve
# Abrir: http://localhost:4200
```

### Paso 6 — ¡Listo! ✅

| Servicio | URL | Estado |
|---|---|---|
| **Backend API** | http://localhost:8080/api/expenses | `● API Live` |
| **Frontend** | http://localhost:4200 | Dashboard activo |
| **MySQL** | localhost:3306/gestor_db | Conectado |

---

## ❓ Preguntas Frecuentes

**¿Por qué el frontend muestra "No se puede conectar al servidor"?**
> El backend no está corriendo o hay un error en `application.properties`. Verifica que `./mvnw spring-boot:run` esté activo y sin errores en consola.

**¿Puedo usar PostgreSQL en vez de MySQL?**
> Sí. Cambia el driver en `pom.xml` a `postgresql` y actualiza la URL en `application.properties` con `jdbc:postgresql://localhost:5432/gestor_db`.

**¿Cómo cambio el puerto del backend?**
> En `application.properties` agrega `server.port=9090`. Luego actualiza `apiUrl` en `gestor-frontend/src/app/services/expense.service.ts`.

**¿Puedo desplegar esto en producción?**
> Sí. Compila el frontend con `ng build --configuration production`, sirve los estáticos con Nginx, y empaqueta el backend con `mvn clean package`. Actualiza la URL de CORS en `CorsConfig.java` con el dominio real.

**¿Por qué los campos de fecha no aceptan fechas futuras?**
> La entidad `Expense` tiene la validación `@PastOrPresent` en el campo `date`. El frontend también limita el `<input type="date">` al día actual con `[max]="today"`.

---

<div align="center">

**Hecho con ❤️ usando Spring Boot + Angular 17**

[![Spring](https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?style=flat-square&logo=springboot)](https://spring.io/)
[![Angular](https://img.shields.io/badge/Angular-Frontend-DD0031?style=flat-square&logo=angular)](https://angular.io/)

</div>
