# Configuración de Agentes / Conversaciones Especializadas

Este documento define la asignación de roles, responsabilidades y contexto para cada conversación independiente del proyecto **"Mi Plata"**.

---

## 🧭 Centro de Control (Conversación Principal / Actual)
- **Rol:** Líder Técnico & Coordinador del Proyecto.
- **Responsabilidad:** Supervisar el avance global, validar que no se rompan las dependencias entre materias y revisar el cumplimiento de las listas de chequeo antes de la entrega final.

---

## 🤖 Agente 1: Scrum Master & Git Docs (Metodologías Ágiles)
- **Documento base:** [`docs/metodologias_agiles/README.md`](file:///c:/Dev/Universidad/docs/metodologias_agiles/README.md) y [`docs/PLAN_MAESTRO_ENTREGA.md`](file:///c:/Dev/Universidad/docs/PLAN_MAESTRO_ENTREGA.md).
- **Enfoque:** 100% marco ágil y versionado en GitHub.
- **Entregables a su cargo:**
  1. `README.md` principal del repositorio.
  2. `docs/product-backlog.md` con épicas, features, historias (INVEST) y estimaciones.
  3. `docs/user-stories.md` con criterios de aceptación detallados.
  4. `docs/sprints/sprint-01/sprint-backlog.md` y `sprint-review.md`.
  5. `docs/ia-bitacora.md` (evidencia de uso reflexivo de IA).
  6. Guía y orden exacto de los commits convencionales (`chore:`, `docs:`, etc.).

---

## 🤖 Agente 2: Front-end Engineer (JavaScript / Web Responsive)
- **Documento base:** [`docs/frontend/README.md`](file:///c:/Dev/Universidad/docs/frontend/README.md) y sección Front-end de [`docs/PLAN_MAESTRO_ENTREGA.md`](file:///c:/Dev/Universidad/docs/PLAN_MAESTRO_ENTREGA.md).
- **Enfoque:** 100% Desarrollo Web, Interfaz, DOM y POO en JavaScript.
- **Entregables a su cargo:**
  1. Maquetación responsive (Desktop 1920px, Tablet 786px, Móvil 460px): Landing, Login/Registro y Cajero.
  2. Clases POO en JS: `Cliente`, `Cuenta`, `CuentaAhorros`, `CuentaCorriente`, `TarjetaCredito`.
  3. Reglas de negocio: 1.5% interés en ahorro, 20% sobregiro en corriente, amortización de cuotas para tarjeta de crédito.
  4. Seguridad en UI: bloqueo tras 3 intentos fallidos de login con contador visible.

---

## 🤖 Agente 3: Back-end Engineer (Java & Verticales)
- **Documento base:** [`docs/backend/README.md`](file:///c:/Dev/Universidad/docs/backend/README.md) y sección Back-end de [`docs/PLAN_MAESTRO_ENTREGA.md`](file:///c:/Dev/Universidad/docs/PLAN_MAESTRO_ENTREGA.md).
- **Enfoque:** 100% Lógica de negocio en Java, POO, Colecciones y GitFlow.
- **Entregables a su cargo:**
  1. Clases Java con herencia: `Person` -> `User` / `Admin`.
  2. Métodos de la vertical de usuario: `updateUser()`, `selectUserById()`, `deleteUser()`, `countUsers()`.
  3. Menú interactivo por consola `menuUser()` con almacenamiento en `ArrayList<User>`.
  4. Gestión estricta de ramas Git (`develop` -> `feat/ms01` o `feat/hu-user-crud`).
