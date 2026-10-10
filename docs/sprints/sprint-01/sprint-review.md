# Sprint Review y Cierre – Sprint 1

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Submódulo:** Metodologías Ágiles para la Programación  
**Docente:** Ing. Jorge Eliécer Hernández S.  
**Estudiante / Equipo:** Miguel David Rojas González  
**Fecha de Cierre:** Octubre 2026  

---

## 1. Resumen Ejecutivo del Sprint

Durante este primer Sprint se construyó la base del sistema bancario **"Mi Plata"**, integrando la aplicación web responsiva, la lógica orientada a objetos de cuentas y tarjetas, la vertical de administración de usuarios en Java y la documentación ágil en GitHub.

El objetivo planteado (**Sprint Goal**) se cumplió al **100%**, logrando un incremento de software funcional y probado:
- Se implementó la maquetación web responsive (Desktop, Tablet y Smartphone).
- Se programó la lógica de cuentas en JavaScript con reglas de negocio reales (1.5% de interés en ahorros, 20% de sobregiro en cuenta corriente y amortización de cuotas para tarjeta de crédito).
- Se aplicó el mecanismo de seguridad con contador visible y bloqueo al tercer intento fallido de autenticación.
- Se implementó la vertical de usuario en Java con herencia (`Person` $\rightarrow$ `User`), operaciones CRUD sobre `ArrayList` y un menú interactivo por consola.
- Se estructuró el repositorio en GitHub con el Product Backlog priorizado, historias detalladas y bitácora reflexiva de IA.

---

## 2. Balance de Historias y Métricas de Velocidad

| Métrica | Resultado | Observaciones |
| :--- | :---: | :--- |
| **Story Points Comprometidos** | **29 SP** | Acordados en el Sprint Planning |
| **Story Points Completados (Done)** | **29 SP** | Cumplen con la *Definition of Done* |
| **Porcentaje de Cumplimiento** | **100%** | Todas las historias planificadas fueron entregadas |
| **Historias Inconclusas / Desbordadas** | **0 SP** | Ninguna historia quedó pendiente |
| **Pruebas Automatizadas Frontend** | **26 / 26 (100%)** | Ejecutadas con `node src/frontend/test_runner.js` |
| **Pruebas Automatizadas Backend Java** | **5 / 5 (100%)** | Ejecutadas con `java TestRunner` |

---

## 3. Demostración del Incremento de Producto

### 3.1 Interfaz Web del Cajero (Front-end)
* **Vistas creadas:** `index.html` (Landing institucional), `login.html` (Login y registro) y `cajero.html` (Panel bancario).
* **Diseño responsive verificado:** Probado en resoluciones de 1920px (Desktop), 786px (Tablet) y 460px (Smartphone).
* **Seguridad en UI:** Bloqueo interactivo al tercer intento fallido de contraseña con notificación explicativa.

### 3.2 Lógica Orientada a Objetos (JavaScript)
* Jerarquía de clases: `Cuenta` como base, extendida por `CuentaAhorros`, `CuentaCorriente` y `TarjetaCredito`.
* Bonificación del 1.5% al realizar retiros de la cuenta de ahorros.
* Autorización de hasta el 20% de sobregiro para la cuenta corriente (saldo en negativo autorizado).
* Cálculo de cuotas fijas mensuales con tarjeta de crédito según plazo (0% a 2 cuotas, 1.9% de 3 a 6 cuotas, 2.3% para 7 o más cuotas).

### 3.3 Módulo Administrativo en Consola (Back-end Java)
* Herencia aplicada: `Person` heredada por `User` y `Admin` con atributos protegidos y encapsulamiento.
* Servicio `UserService` con métodos funcionales sobre `ArrayList<User>`:
  * `selectUserById(int id)`: Búsqueda de clientes por ID.
  * `updateUser(int id, String phone, String city)`: Modificación de datos de contacto.
  * `deleteUser(int id)`: Eliminación de registros.
  * `countUsers()`: Conteo total de clientes activos.
* Menú interactivo por consola (`Main.java`) preparado para la sustentación ante el docente.

---

## 4. Retrospectiva del Sprint

### Aspectos Positivos:
1. **Slicing vertical:** Descomponer las historias en frontend, backend y pruebas permitió avanzar de forma ordenada y sin bloqueos técnicos.
2. **Versionado ordenado:** El uso de ramas GitFlow y Conventional Commits permitió mantener un historial limpio y transparente en GitHub.
3. **Pruebas unitarias:** Validar las fórmulas matemáticas y las reglas de seguridad con pruebas automatizadas evitó errores antes de la entrega final.

### Dificultades Enfrentadas y Soluciones:
* **Fórmula de amortización financiera:** Inicialmente se requerían ajustes en el cálculo del interés compuesto para cuotas fijas; se implementó y validó la fórmula bancaria estándar mediante pruebas unitarias en Node.js.
* **Control de ramas en Git:** Se mantuvo la disciplina de trabajar en `develop` y ramas de soporte para proteger la estabilidad de la rama principal `main`.

---

## 5. Proyección para el Sprint 2

Para la siguiente iteración se planifica abordar las historias pendientes del Product Backlog:
1. **US-06:** Transferencias entre cuentas con validación de saldo disponible.
2. **US-07:** Módulo de extractos bancarios con historial cronológico de movimientos.
3. **US-09:** Abono a la tarjeta de crédito para liberación de cupo disponible.
