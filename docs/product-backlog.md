# Product Backlog – Sistema Bancario "Mi Plata"

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Momento:** Momento 2  
**Desarrollador / Equipo:** Miguel David Rojas González  
**Docentes:** Jorge Albeiro Muriel Vélez / Ing. Jorge Eliécer Hernández S.  

---

## 1. Visión General del Backlog

El **Product Backlog** de *Mi Plata* recopila, organiza y prioriza todos los requerimientos funcionales, reglas financieras y controles de seguridad necesarios para construir el ecosistema bancario del proyecto integrador.

Los requerimientos se estructuran en tres niveles:
1. **Épicas:** Áreas funcionales estratégicas del banco.
2. **Features:** Capacidades o módulos específicos dentro de cada épica.
3. **Historias de Usuario (US):** Unidades de valor de extremo a extremo (Slicing vertical) verificables mediante criterios de aceptación Given-When-Then.

---

## 2. Criterios de Estimación y Priorización

* **Estimación:** Escala de **Story Points con la serie Fibonacci (1, 2, 3, 5, 8, 13)**, evaluando la complejidad algorítmica, las fórmulas financieras, la manipulación del DOM y las pruebas unitarias.
* **Priorización (Método MoSCoW):**
  * **Must Have:** Requerimientos nucleares del sistema bancario y del plan de estudio.
  * **Should Have:** Funcionalidades transaccionales avanzadas (Transferencias por Llave Bre-B, Auditoría de Arreglos y Estudios Crediticios).
  * **Could Have:** Mejoras de experiencia de usuario (Comprobante térmico imprimible, chips rápidos y feedback sonoro).

---

## 3. Tabla Resumen del Product Backlog

| ID | Épica | Feature | Historia de Usuario | Prioridad (MoSCoW) | Estimación (SP) | Estado |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| **US-01** | Autenticación y Clientes | Onboarding | Registro realista de nuevos clientes con apertura de Cuenta de Ahorros y bono inicial | **Must Have** | 5 pts | Completada |
| **US-02** | Autenticación y Clientes | Seguridad | Inicio de sesión seguro con contador visible y bloqueo automático al 3er intento fallido | **Must Have** | 3 pts | Completada |
| **US-03** | Autenticación y Clientes | Vertical User | CRUD administrativo de usuarios en Java (`select`, `update`, `delete`, `count`) y perfil web | **Must Have** | 5 pts | Completada |
| **US-04** | Cajero y Transacciones | Fondos y KPIs | Consulta de portafolio, dashboard de KPIs con `.reduce()` y consignación con chips rápidos | **Must Have** | 3 pts | Completada |
| **US-05** | Cajero y Transacciones | Retiros | Retiros inteligentes con reglas de negocio (1.5% rendimiento en Ahorros y 20% sobregiro en Corriente) | **Must Have** | 8 pts | Completada |
| **US-06** | Cajero y Transacciones | Transferencias | Transferencias inmediatas entre cuentas y mediante **Llave Bre-B** (Celular o Cédula) | **Should Have** | 5 pts | Completada |
| **US-07** | Cajero y Transacciones | Auditoría & DOM | Historial cronológico, filtro en vivo (`.filter()`), auditoría (`.pop()`, `.shift()`) y recibo térmico | **Must Have** | 5 pts | Completada |
| **US-08** | Crédito y Estudios | Financiamiento | Simulación y compras a cuotas (1 a 36 meses) con fórmula de amortización francesa | **Must Have** | 5 pts | Completada |
| **US-09** | Crédito y Estudios | Pagos de Deuda | Abonos y pagos a la Tarjeta de Crédito (en efectivo o débito de cuenta) con liberación de cupo | **Should Have** | 3 pts | Completada |
| **US-10** | Crédito y Estudios | Estudio en Línea | Estudio financiero y crediticio por ingresos para aperturar Cuenta Corriente y Tarjeta Visa | **Should Have** | 5 pts | Completada |

* **Total de puntos estimados en el Backlog:** 47 Story Points.  
* **Total de puntos completados y verificados:** 47 Story Points (**100% de alcance entregado**).  

---

## 4. Desglose por Épicas y Features

### Épica 1: Autenticación, Seguridad y Gestión de Clientes
* **Feature 1.1: Onboarding Bancario Realista (`US-01`)**  
  Creación de usuario validando unicidad de documento, celular (Llave Bre-B) y username, asignando automáticamente una Cuenta de Ahorros colombiana (`401-XXXXXXX-X`) con $100.000 COP de bienvenida.
* **Feature 1.2: Acceso Seguro y Control de Intentos (`US-02`)**  
  Validación de credenciales con contador dinámico (`3 de 3`, `2 de 3`, `1 de 3`) y bloqueo preventivo tras 3 fallos consecutivos.
* **Feature 1.3: Administración de Usuarios (`US-03`)**  
  Gestión CRUD en consola Java sobre `ArrayList<User>` y modal de edición/eliminación de perfil y cambio de contraseña en el cajero web.

### Épica 2: Módulo de Transacciones del Cajero Automático y Estructuras de Datos
* **Feature 2.1: Portafolio Consolidado, KPIs y Depósitos (`US-04`)**  
  Tarjetas interactivas por producto, barra de métricas financieras calculada con `.filter()` y `.reduce()`, y consignaciones en efectivo con chips de montos rápidos.
* **Feature 2.2: Retiros con Reglas Financieras y Previsualización (`US-05`)**  
  Cálculo polimórfico de retiros: abono del 1.5% de rendimiento sobre el monto retirado en Ahorros, y autorización de hasta el 20% de sobregiro en Cuenta Corriente.
* **Feature 2.3: Transferencias Inmediatas por Llave Bre-B (`US-06`)**  
  Envío de dinero sin costo hacia otros clientes mediante su número de celular, documento de identidad o número de cuenta tradicional, o entre cuentas propias.
* **Feature 2.4: Historial, Búsqueda y Auditoría de Arreglos (`US-07`)**  
  Tabla cronológica con filtro por tipo y búsqueda en tiempo real (`.filter()`), botones demostrativos de estructuras de datos (`.pop()` para deshacer con reversión contable y `.shift()` para depurar antiguos) y comprobante térmico imprimible.

### Épica 3: Módulo de Tarjetas de Crédito, Pagos y Estudio Financiero
* **Feature 3.1: Compras a Cuotas con Amortización Francesa (`US-08`)**  
  Simulador en landing page y módulo de compras en cajero con tasas escalonadas: **0% (1-2 cuotas)**, **1.9% mensual (3-6 cuotas)** y **2.3% mensual (7-36 cuotas)**.
* **Feature 3.2: Abonos y Liberación de Cupo (`US-09`)**  
  Pago de cuota mensual estimada o deuda total, permitiendo pagar en efectivo o debitando directamente de la Cuenta de Ahorros o Corriente.
* **Feature 3.3: Estudio Financiero y Crediticio en Línea (`US-10`)**  
  Evaluación automática de capacidad de pago según ingresos mensuales certificados ($2.000.000 COP mínimos para Cuenta Corriente; $1.500.000 COP para Visa Clásica y $3.500.000 COP para Visa Gold).
