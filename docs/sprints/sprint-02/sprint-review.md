# Sprint Review y Cierre – Sprint 2 (Back-end Java + MySQL)

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Estudiante / Equipo:** Miguel David Rojas González  

---

## 1. Resumen Ejecutivo del Incremento

El Sprint 2 completó el 100% de las historias comprometidas para el Back-end Java + MySQL (`US-11` a `US-14`), dejando el proyecto **Mi Plata** totalmente operativo con base de datos relacional en XAMPP y arquitectura limpia por capas:

* **Persistencia MySQL (`mi_plata_db`):** Tablas relacionales `usuarios`, `cuentas`, `creditos` y `transacciones` servidas mediante `mysql-connector-j-8.3.0.jar`, `RowMapper<T>` y repositorios JDBC con respaldo automático en memoria.
* **POO Bancario en Java:** Clase abstracta `Cuenta` con polimorfismo real en `retirar()` para `CuentaAhorros` y `CuentaCorriente`, más `Credito` como entidad independiente pagable mediante transferencia desde una cuenta.
* **Atomicidad y Trazabilidad:** `BankService` envuelve consignaciones, retiros, transferencias entre usuarios y pagos de crédito en transacciones SQL con confirmación (`commit`) o reversión (`rollback`).
* **Código Limpio y Validado:** Los 26 archivos `.java` compilan con `javac -encoding UTF-8 -Xlint:all` sin advertencias ni errores, y superaron tanto las pruebas automatizadas como las pruebas interactivas de consola contra la base de datos real.

---

## 2. Métricas de Velocidad y Calidad

| Métrica | Resultado | Observaciones |
| :--- | :---: | :--- |
| **Story Points Sprint 2** | **23 / 23 SP** | `US-11` a `US-14` completadas (Acumulado total: **70 / 70 SP**) |
| **Compilación Java (`javac -Xlint:all`)** | **0 errores / 0 advertencias** | 26 archivos `.java` compilados en `src/backend-java/src/` |
| **Pruebas Integrales Back-end Java + MySQL** | **13 / 13 (100%)** | Ejecutadas en vivo con `java -cp bin;lib\mysql-connector-j-8.3.0.jar TestRunner` |
| **Pruebas Automatizadas Front-end** | **42 / 42 (100%)** | Ejecutadas con `node src/frontend/test_runner.js` |

---

## 3. Retrospectiva Técnica

* **Fortalezas del Incremento:**
  1. **Prevalidación antes de descontar fondos:** Validar estado del crédito y monto máximo permitido antes de ejecutar `retirar()` y encerrar las actualizaciones dentro de `executeAtomic(...)` evitó inconsistencias parciales entre cuentas, créditos y movimientos.
  2. **Tolerancia a entorno apagado:** El respaldo en memoria permite probar el menú en consola aun si el servicio MySQL no ha sido iniciado previamente en XAMPP.
