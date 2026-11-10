# Sprint Backlog – Sprint 1: "Ecosistema Bancario Mi Plata"

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Momento Evaluativo:** Momento 2  
**Docentes:** Jorge Albeiro Muriel Vélez / Ing. Jorge Eliécer Hernández S.  
**Estudiante / Equipo:** Miguel David Rojas González  
**Estado:** Completado al 100% (47 / 47 Story Points)  

---

## 1. Objetivo del Sprint (Sprint Goal)

> *"Construir y entregar el ecosistema bancario completo 'Mi Plata' integrando la aplicación web responsive con POO, manipulación avanzada del DOM, estructuras de datos en arreglos, comprobante térmico, transferencias por Llave Bre-B, estudios crediticios en línea y la vertical administrativa en consola Java."*

---

## 2. Historias de Usuario Comprometidas y Entregadas

| ID | Historia de Usuario | Prioridad | Story Points | Estado |
| :---: | :--- | :---: | :---: | :---: |
| **US-01** | Registro realista de nuevos clientes con Cuenta de Ahorros y bono inicial | Must Have | 5 pts | Completada |
| **US-02** | Inicio de sesión seguro con bloqueo automático al 3er intento fallido | Must Have | 3 pts | Completada |
| **US-03** | Mantenimiento y CRUD de usuarios en Java y modal de perfil web | Must Have | 5 pts | Completada |
| **US-04** | Portafolio consolidado, KPIs con `.reduce()` y consignación con chips | Must Have | 3 pts | Completada |
| **US-05** | Retiros polimórficos (1.5% rendimiento Ahorros y 20% sobregiro Corriente) | Must Have | 8 pts | Completada |
| **US-06** | Transferencias inmediatas entre cuentas y mediante Llave Bre-B | Should Have | 5 pts | Completada |
| **US-07** | Historial, buscador en vivo (`.filter()`), auditoría (`.pop()`, `.shift()`) y recibo | Must Have | 5 pts | Completada |
| **US-08** | Simulación y compras a cuotas con Tarjeta de Crédito (amortización francesa) | Must Have | 5 pts | Completada |
| **US-09** | Pagos y abonos a Tarjeta de Crédito con liberación de cupo disponible | Should Have | 3 pts | Completada |
| **US-10** | Estudio financiero y crediticio en línea para Cuenta Corriente y Tarjeta Visa | Should Have | 5 pts | Completada |

* **Story Points Comprometidos:** 47 Story Points.  
* **Story Points Completados:** 47 Story Points (**100% de cumplimiento**).  

---

## 3. Desglose de Tareas Técnicas (Slicing Vertical)

### 3.1 Gestión Ágil y Repositorio en GitHub
- [x] **TS-01:** Configuración de repositorio GitFlow (`main`, `develop`, `feat/`) y `.gitignore`.
- [x] **TS-02:** Documentación de `README.md` con mapeo del Plan de Estudio del Momento 2.
- [x] **TS-03:** Elaboración de `product-backlog.md` y `user-stories.md` (`US-01` a `US-10`) con formato INVEST y Given-When-Then.
- [x] **TS-04:** Registro de la bitácora reflexiva de uso de IA (`docs/ia-bitacora.md`).

### 3.2 Interfaz de Usuario Web Responsive y Manipulación del DOM (Temas 9, 10 y 11)
- [x] **TF-01:** Maquetación de `index.html`, `login.html` y `cajero.html` en HTML5 semántico.
- [x] **TF-02:** Diseño responsive CSS3 para Desktop (1920px), Tablet (786px), Móvil (460px) e impresión térmica (`@media print`).
- [x] **TF-03:** Implementación de chips rápidos de efectivo, previsualizador matemático de retiro y modal de comprobante térmico.
- [x] **TF-04:** Retroalimentación sonora nativa mediante Web Audio API.

### 3.3 POO y Estructuras de Datos en JavaScript (Temas 7 y 8)
- [x] **TF-05:** Jerarquía de clases con herencia y polimorfismo: `Cuenta` $\rightarrow$ `CuentaAhorros`, `CuentaCorriente`, `TarjetaCredito`.
- [x] **TF-06:** Control de seguridad en `Cliente.js` con bloqueo automático al 3er intento fallido.
- [x] **TF-07:** Métodos de arreglos en `Cuenta.js` y `cajero.js`: `.push()`, `.pop()`, `.shift()`, `.filter()` y `.reduce()`.
- [x] **TF-08:** Persistencia en `StorageService.js` con numeración colombiana oficial, estudio crediticio y transferencias Bre-B.

### 3.4 Back-end Java y Aseguramiento de Calidad (QA)
- [x] **TB-01:** Clases `Person.java`, `User.java`, `Admin.java` y servicio CRUD `UserService.java` sobre `ArrayList<User>`.
- [x] **TQ-01:** Suite de **36 pruebas automatizadas en Node.js** (`src/frontend/test_runner.js`) y **5 pruebas en Java** (`TestRunner.java`).
