# Sprint Review y Cierre – Momento 2

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Docentes:** Jorge Albeiro Muriel Vélez / Ing. Jorge Eliécer Hernández S.  
**Estudiante / Equipo:** Miguel David Rojas González  

---

## 1. Resumen Ejecutivo del Incremento

El proyecto **"Mi Plata"** completó el 100% de las historias del Product Backlog (`US-01` a `US-10`), entregando un sistema bancario funcional, realista y completamente alineado con el Plan de Estudio del Momento 2:

* **Estructuras de Datos (Tema 7):** Uso práctico y auditable en pantalla de `.push()`, `.pop()` (con reversión de saldo contable), `.shift()`, `.filter()` y `.reduce()`.
* **POO en JavaScript (Tema 8):** Clases encapsuladas, herencia desde la clase abstracta `Cuenta` y polimorfismo financiero en `CuentaAhorros` (1.5% rendimiento), `CuentaCorriente` (20% sobregiro con persistencia de saldos negativos) y `TarjetaCredito` (amortización francesa).
* **DOM y Eventos (Temas 9, 10 y 11):** Renderizado dinámico, simuladores matemáticos en tiempo real, directorio de Llaves Bre-B y comprobante térmico imprimible.
* **Back-end Java y Metodologías Ágiles:** Vertical CRUD de usuarios en Java sobre `ArrayList<User>` y documentación Scrum completa en GitHub.

---

## 2. Métricas de Velocidad y Calidad

| Métrica | Resultado | Observaciones |
| :--- | :---: | :--- |
| **Story Points Comprometidos** | **47 SP** | 10 Historias de Usuario (`US-01` a `US-10`) |
| **Story Points Completados (Done)** | **47 SP** | 100% de cumplimiento del Backlog |
| **Pruebas Automatizadas Frontend** | **36 / 36 (100%)** | Ejecutadas con `node src/frontend/test_runner.js` |
| **Pruebas Automatizadas Backend Java** | **5 / 5 (100%)** | Ejecutadas con `java TestRunner` |

---

## 3. Retrospectiva Técnica

* **Fortalezas del Incremento:**
  1. **Flujo bancario realista:** Separar el onboarding básico (Cuenta de Ahorros) de los productos sujetos a estudio crediticio (Cuenta Corriente y Tarjeta Visa) elevó el realismo financiero de la aplicación.
  2. **Trazabilidad en pruebas:** La suite de 36 pruebas automatizadas garantizó que las fórmulas de amortización, el sobregiro negativo en `localStorage` y los métodos de arreglos funcionen con exactitud matemática.
