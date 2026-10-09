# 🏁 Sprint Review & Cierre – Sprint 1

> **Proyecto:** Mi Plata (Banca Digital & Cajero Automático)  
> **Fecha de Cierre:** Octubre 2026  
> **Participantes:** Todo el equipo Scrum (Product Owner, Scrum Master, Frontend Dev, Backend Dev)  
> **Destinatario de Evaluación:** Ing. Jorge Eliécer Hernández S. (Docente de Metodologías Ágiles)  

---

## 🎯 Resumen Ejecutivo del Sprint

Durante este primer Sprint, el equipo se propuso crear la base integral del sistema bancario **"Mi Plata"**, integrando los requerimientos de Front-end, Back-end Java y Metodologías Ágiles en un único repositorio estructurado de GitHub.

El objetivo (**Sprint Goal**) se cumplió al **100%**, logrando un incremento de producto potencialmente desplegable y totalmente testeable:
- Se implementó la maquetación web responsive (Desktop, Tablet y Smartphone).
- Se programó la lógica orientada a objetos en JavaScript para la simulación de cuentas bancarias y tarjeta de crédito con reglas financieras reales.
- Se implementó la seguridad con contador visible y bloqueo estricto tras 3 intentos fallidos de autenticación.
- Se desarrolló la vertical de usuario completa en Java con herencia, métodos CRUD (`selectUserById`, `updateUser`, `deleteUser`, `countUsers`), almacenamiento dinámico en `ArrayList` y menú interactivo por consola.
- Se configuró la arquitectura de documentación ágil con Product Backlog, historias detalladas y bitácora de uso crítico de IA.

---

## 📊 Balance de Historias y Métricas de Velocidad

| Métrica | Valor Obtenido | Observaciones |
| :--- | :---: | :--- |
| **Story Points Comprometidos** | **29 SP** | Definidos durante el Sprint Planning |
| **Story Points Completados (Done)** | **29 SP** | Cumplen con la *Definition of Done* |
| **Porcentaje de Cumplimiento** | **100%** | Todas las historias planificadas fueron terminadas |
| **Historias no terminadas / Arrastradas** | **0 SP** | Ninguna historia quedó inconclusa |
| **Pruebas Automatizadas Frontend** | **26 / 26 (100%)** | Ejecutadas con `node src/frontend/test_runner.js` |
| **Pruebas Automatizadas Backend Java** | **5 / 5 (100%)** | Ejecutadas con `java TestRunner` |

---

## 🚀 Demostración del Incremento de Producto (Qué se completó)

### 1. Interfaz Web Adaptable (Front-end)
* **Vistas creadas:** `index.html` (Landing institucional), `login.html` (Portal de acceso y registro), `cajero.html` (Panel bancario interactivo).
* **Adaptabilidad probada:** Probada satisfactoriamente en pantallas de escritorio (1920px), tablets (786px) y dispositivos móviles (460px).
* **Seguridad interactiva:** Se probó en vivo el bloqueo al tercer intento fallido con mensaje preventivo y deshabilitación de inputs.

### 2. Modelado Orientado a Objetos (JavaScript)
* Jerarquía limpia con clase padre `Cuenta` y subclases `CuentaAhorros`, `CuentaCorriente` y `TarjetaCredito`.
* Retiro con bonificación del 1.5% en Ahorros probado con éxito.
* Retiro con sobregiro del 20% en Corriente probado con éxito (permite saldo negativo autorizado).
* Cálculo de cuotas de tarjeta de crédito aplicando fórmula bancaria de amortización según meses diferidos.

### 3. Vertical de Usuario en Consola (Back-end Java)
* Herencia de `Person` a `User` y `Admin` con atributos protegidos y métodos accesores.
* Clase de servicio `UserService` con métodos funcionales sobre `ArrayList<User>`:
  * `selectUserById()`: Encuentra clientes por identificador único.
  * `updateUser()`: Actualiza datos de contacto en caliente.
  * `deleteUser()`: Da de baja registros de manera consistente.
  * `countUsers()`: Informa el censo total de clientes.
* Menú por consola interactivo (`Main.java`) listo para demostración en vivo.

---

## 💡 Lecciones Aprendidas y Retrospectiva Rápida

### Lo que funcionó muy bien:
1. **Slicing de Historias:** Dividir cada historia en tareas claras de Frontend, Backend y Documentación evitó que los miembros del equipo se bloquearan entre sí.
2. **Versionado ordenado:** El uso de Conventional Commits (`feat:`, `docs:`, `test:`) permitió rastrear la evolución del proyecto de manera transparente en el historial de Git.
3. **Pruebas automatizadas tempranas:** Implementar suites de pruebas antes del cierre permitió detectar y corregir discrepancias en las fórmulas de amortización y sobregiro antes de la entrega.

### Dificultades y cómo las superamos:
* **Complejidad matemática en amortización:** Inicialmente la fórmula de cuotas diferidas no cuadraba con las tasas comerciales; se investigó la fórmula francesa estándar y se programaron pruebas unitarias específicas hasta lograr total precisión.
* **Control de versiones cruzado:** Coordinar las ramas de GitFlow exigió disciplina para no mezclar código experimental en la rama `main`.

---

## 🔮 Preparación para el Sprint 2

Para la siguiente iteración del proyecto se priorizarán las historias restantes del Product Backlog:
1. **US-06:** Transferencias entre cuentas del mismo banco y terceros con validación de fondos en tiempo real.
2. **US-07:** Módulo de extractos bancarios e historial cronológico descargable o imprimible.
3. **US-09:** Abono de pagos a tarjeta de crédito para liberación de cupo disponible.
