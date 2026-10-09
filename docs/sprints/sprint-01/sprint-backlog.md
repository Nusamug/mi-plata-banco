# 🏃‍♂️ Sprint Backlog – Sprint 1: "Viviendo nuestro primer Sprint"

> **Proyecto:** Mi Plata (Banca Digital & Cajero Automático)  
> **Duración del Sprint:** 2 semanas  
> **Estado:** Completado (Cierre de Momento 2)  
> **Scrum Master:** Equipo Mi Plata  
> **Product Owner:** Equipo Mi Plata  

---

## 🎯 Objetivo del Sprint (Sprint Goal)

> *"Establecer la infraestructura de versionado y documentación ágil en GitHub, implementando la vertical de gestión de usuarios en Java y la plataforma web responsive con login seguro (bloqueo a 3 intentos) y cajero financiero interactivo."*

---

## 📋 Historias de Usuario Comprometidas

Para este primer Sprint se seleccionaron las historias prioritarias (**Must Have**) que sientan las bases del sistema bancario:

| ID | Historia de Usuario | Prioridad | Story Points | Responsable | Estado |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **US-01** | Registro de nuevos clientes con datos completos | Must Have | 5 pts | Frontend Dev | ✅ Done |
| **US-02** | Inicio de sesión con bloqueo preventivo tras 3 fallos | Must Have | 3 pts | Frontend Dev | ✅ Done |
| **US-03** | Mantenimiento y CRUD de usuarios en Java (Vertical User) | Must Have | 5 pts | Backend Dev | ✅ Done |
| **US-04** | Consulta de saldos consolidados y depósitos | Must Have | 3 pts | Frontend Dev | ✅ Done |
| **US-05** | Retiros inteligentes (1.5% ahorro / 20% sobregiro) | Must Have | 8 pts | Frontend Dev | ✅ Done |
| **US-08** | Financiamiento con Tarjeta de Crédito (amortización de cuotas) | Must Have | 5 pts | Frontend Dev | ✅ Done |

* **Capacidad Estimada:** 30 Story Points.  
* **Story Points Comprometidos:** 29 Story Points.  
* **Story Points Completados:** 29 Story Points (100% de cumplimiento).  

---

## 🔪 Desglose de Tareas Técnicas (Técnicas de Slicing)

Aplicamos la división vertical en tareas técnicas concretas que atraviesan todas las disciplinas del equipo:

### 📑 1. Gestión Ágil & Repositorio GitHub (Scrum Master)
- [x] **TS-01:** Inicializar repositorio en GitHub y configurar `.gitignore` para Java, Node y temporales del SO.
- [x] **TS-02:** Diseñar la estructura de carpetas requerida (`docs/`, `src/frontend/`, `src/backend-java/`).
- [x] **TS-03:** Redactar el `README.md` principal con la visión del producto, roles, badges e instrucciones.
- [x] **TS-04:** Documentar el `product-backlog.md` con épicas, features, MoSCoW y estimaciones en puntos.
- [x] **TS-05:** Elaborar `user-stories.md` con criterios de aceptación Given-When-Then y checklist.
- [x] **TS-06:** Registrar la bitácora reflexiva de uso de IA (`docs/ia-bitacora.md`) para sustentación de 2 min.

### 🎨 2. Interfaz de Usuario Web Responsive (Frontend Dev)
- [x] **TF-01:** Maquetar la Landing Page (`index.html`) con estructura semántica en HTML5.
- [x] **TF-02:** Implementar diseño responsive en CSS3 sin dependencias pesadas, adaptable a Desktop (1920px), Tablet (786px) y Celular (460px).
- [x] **TF-03:** Maquetar vistas de Registro y Login (`login.html`) con formulario interactivo y mensajes de error.
- [x] **TF-04:** Maquetar el panel principal del Cajero (`cajero.html`) con tarjetas de cuentas y acciones rápidas.

### ⚙️ 3. Lógica Financiera y POO en JavaScript (Frontend Dev)
- [x] **TF-05:** Crear jerarquía de clases POO en JS: clase base `Cuenta` heredada por `CuentaAhorros`, `CuentaCorriente` y `TarjetaCredito`.
- [x] **TF-06:** Implementar lógica de seguridad: contador de intentos fallidos, aviso interactivo y bloqueo al 3er fallo.
- [x] **TF-07:** Implementar regla de negocio de ahorros: bono del 1.5% de rendimiento por retiro.
- [x] **TF-08:** Implementar regla de negocio de corriente: autorización de sobregiro de hasta el 20% del saldo base.
- [x] **TF-09:** Implementar cálculo bancario de amortización para tarjeta de crédito (0% para $\le 2$ cuotas, 1.9% para 3-6 cuotas, 2.3% para $\ge 7$ cuotas).
- [x] **TF-10:** Crear servicio de persistencia local (`StorageService.js`) con datos iniciales de prueba (Carlos Restrepo).

### ☕ 4. Backend Java, Colecciones y GitFlow (Backend Dev)
- [x] **TB-01:** Crear clase base `Person.java` con encapsulamiento, getters y setters.
- [x] **TB-02:** Crear clases hijas `User.java` y `Admin.java` aplicando herencia.
- [x] **TB-03:** Implementar `UserService.java` con almacenamiento en `ArrayList<User>` y métodos obligatorios:
  - `selectUserById(int id)`
  - `updateUser(int id, String phone, String city)`
  - `deleteUser(int id)`
  - `countUsers()`
- [x] **TB-04:** Diseñar menú interactivo por consola en `Main.java` (`menuUser`) para pruebas en vivo con el docente.
- [x] **TB-05:** Implementar suite de pruebas automatizadas `TestRunner.java`.

### 🧪 5. Aseguramiento de Calidad & GitFlow
- [x] **TQ-01:** Desarrollar suite de 26 pruebas automáticas de Frontend en Node.js (`test_runner.js`).
- [x] **TQ-02:** Manejar flujo de ramas estricto: commits en ramas de funcionalidad (`feat/`), integración en `develop` y pase a `main`.

---

## 📌 Tablero de Seguimiento (Scrum Board)

```text
+------------------------+------------------------+------------------------+
|       TO DO (0)        |    IN PROGRESS (0)     |        DONE (25)       |
+------------------------+------------------------+------------------------+
|                        |                        | [x] TS-01 a TS-06 (Docs)|
|                        |                        | [x] TF-01 a TF-10 (Web) |
|                        |                        | [x] TB-01 a TB-05 (Java)|
|                        |                        | [x] TQ-01 a TQ-02 (QA)  |
+------------------------+------------------------+------------------------+
```

---

## 🚦 Criterios de "Hecho" (Definition of Done - DoD)

Una historia de usuario se considera **DONE** en el Sprint 1 únicamente cuando:
1. El código compila y ejecuta sin errores en consola y navegador.
2. Cumple el 100% de los criterios de aceptación en formato Given-When-Then.
3. Se encuentra versionada bajo Conventional Commits en la rama de integración.
4. Las pruebas unitarias automatizadas (Node.js o Java) pasan al 100%.
5. Los artefactos Markdown están actualizados y verificados en GitHub.
