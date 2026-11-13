# Criterios de Evaluación – Proyecto "Mi Plata"

**Proyecto:** Mi Plata (Banca Digital, Cajero Automático Web y Back-end Java + MySQL)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Momento Evaluativo:** Momento 2  
**Estudiante:** Miguel David Rojas González  

---

## 1. Matriz de Criterios de Evaluación por Evidencias

El sistema se evalúa de manera integral sobre tres tipos de evidencia: **Conocimiento**, **Desempeño** y **Producto**, cubriendo tanto el **Back-end Java + MySQL** como el **Front-end Web** y la **Gestión Ágil**.

| Dimensión | Criterio Evaluado | Qué se verifica en el Proyecto | Evidencia / Ubicación | Estado |
| :--- | :--- | :--- | :--- | :---: |
| **Conocimiento** | **POO en Java (Herencia, Abstracción y Polimorfismo)** | Jerarquía `Person` $\rightarrow$ `User`, `Admin`; clase abstracta `Cuenta` con únicamente dos subclases (`CuentaAhorros` y `CuentaCorriente`) diferenciadas en `retirar()`; entidad `Credito` independiente de `Cuenta`. | `src/backend-java/src/models/` | Cumple |
| **Conocimiento** | **Arquitectura por Capas y Patrones** | Separación estricta entre `models`, `persistence/dbconnection` (Singleton), `persistence/mappers` (`RowMapper`), `persistence/repository` (Interfaces + Adaptadores DB) y `services`. | `src/backend-java/src/persistence/`<br>`src/backend-java/src/services/` | Cumple |
| **Conocimiento** | **Diseño Relacional SQL e Integridad** | Esquema normalizado (`usuarios`, `cuentas`, `creditos`, `transacciones`) con llaves primarias, foráneas (`ON DELETE CASCADE`, `ON DELETE SET NULL`), `AUTO_INCREMENT` y tipos `ENUM`/`DECIMAL`. | `src/backend-java/schema_mi_plata.sql` | Cumple |
| **Conocimiento** | **Gestión Ágil e INVEST** | Product Backlog priorizado (MoSCoW), estimación en Fibonacci (70 SP), Slicing en Sprints 1 y 2, e Historias `US-01` a `US-14` con criterios Given-When-Then. | `docs/product-backlog.md`<br>`docs/user-stories.md` | Cumple |
| **Desempeño** | **Operaciones Transaccionales Atómicas (ACID)** | Consignaciones, retiros, transferencias entre cuentas/usuarios y pagos a créditos ejecutados bajo transacción JDBC (`setAutoCommit(false)`, `commit()`, `rollback()`). | `BankService.java` (`executeAtomic`) | Cumple |
| **Desempeño** | **Flujo Interactivo por Roles y Validaciones** | Portal inicial en `Main.java` con login de Cliente (`ID`/correo + clave), registro con apertura automática de `CuentaAhorros`, aislamiento de cuentas por usuario en sesión y panel `Admin` para CRUD y auditoría global. | `src/backend-java/src/Main.java`<br>`UserService.java` / `BankService.java` | Cumple |
| **Desempeño** | **Flujo Front-end e Interoperabilidad** | Registro, bloqueo tras 3 intentos, consignación, retiros (1.5% rendimiento / 20% sobregiro), transferencias por Llave Bre-B y amortización de cuotas en vivo. | `src/frontend/` | Cumple |
| **Producto** | **Calidad de Código y Compilación Limpia** | Los 26 archivos `.java` compilan con `javac -encoding UTF-8 -Xlint:all` con salida `0` y sin advertencias; comentarios reducidos al mínimo indispensable. | `src/backend-java/src/` | Cumple |
| **Producto** | **Pruebas Automatizadas Integrales** | Ejecución en vivo contra MySQL (`mi_plata_db`) con **13 / 13 pruebas pasadas** en Java y **42 / 42 pruebas pasadas** en Node.js. | `src/backend-java/src/TestRunner.java`<br>`src/frontend/test_runner.js` | Cumple |
| **Producto** | **Versionamiento Limpio en GitHub** | Ramas `develop` y `main`, `.gitignore` excluyendo binarios (`bin/`, `out/`, `*.class`, `.idea/`, `*.iml`) y commits descriptivos bajo Conventional Commits. | Repositorio GitHub (`Nusamug/mi-plata-banco`) | Cumple |

---

## 2. Rúbrica Técnica Detallada del Back-end Java + MySQL

| Criterio Técnico | Indicador de Logro Verificable | Verificación |
| :--- | :--- | :---: |
| **1. Modelo de Dominio Bancario** | `Cuenta` define comportamiento común (`consignar`) y contrato abstracto (`retirar`, `getAccountType`); `Credito` funciona como entidad aparte pagable desde cuentas. | [x] Verificado |
| **2. Conectividad Segura JDBC** | `DataBaseConnection` centraliza la conexión a `mi_plata_db` usando `PreparedStatement` en todos los adaptadores (`User`, `Account`, `Credit`, `Transaction`). | [x] Verificado |
| **3. Recuperación de Claves Generadas** | `CreditRepositoryAdapterDB` y `TransactionRepositoryAdapterDB` recuperan `credit_id` y `tx_id` autogenerados mediante `Statement.RETURN_GENERATED_KEYS`. | [x] Verificado |
| **4. Reglas Polimórficas de Retiro** | `CuentaAhorros` rechaza retiros superiores al saldo (`false`); `CuentaCorriente` autoriza hasta `balance + overdraftLimit` permitiendo saldo negativo dentro del cupo. | [x] Verificado |
| **5. Transferencia entre Usuarios** | Débito origen, crédito destino y registro `TRANSFERENCIA` en `transacciones` se confirman o revierten juntos dentro de la misma transacción SQL. | [x] Verificado |
| **6. Pago de Crédito por Transferencia** | `payCreditFromAccount` valida saldo disponible y deuda vigente (`<= currentDebt`), actualiza saldo, reduce deuda y marca `PAGADO` al llegar a `$0.00`. | [x] Verificado |
| **7. Tolerancia a Fallos (Fallback)** | Si MySQL en XAMPP no está en ejecución, `UserService` y `BankService` cambian automáticamente a almacenamiento en memoria con datos semilla sin detener el programa. | [x] Verificado |
| **8. Limpieza de Código** | Eliminación de bloques Javadoc y comentarios redundantes conservando únicamente comentarios puntuales de intención no obvia. | [x] Verificado |

---

## 3. Definición de Terminado (Definition of Done – DoD)

Para considerar completada cualquier Historia de Usuario en el repositorio **Mi Plata**, debe cumplir todos los puntos siguientes:

1. **Código funcional y tipado limpio:** Compila sin errores ni advertencias (`javac -Xlint:all`) y mantiene comentarios mínimos.
2. **Persistencia y atomicidad validadas:** Toda escritura relevante queda reflejada en MySQL (`mi_plata_db`) con manejo controlado de errores y rollback ante fallos.
3. **Pruebas automatizadas en verde:** `TestRunner` (**13 / 13** en Java + MySQL) y `test_runner.js` (**42 / 42** en Frontend) ejecutados después de la última edición sin fallos.
4. **Trazabilidad ágil:** Historia documentada en `docs/user-stories.md` (INVEST + Given-When-Then) y trazada en `docs/product-backlog.md` y el Sprint correspondiente.
5. **Integración en GitHub:** Cambios versionados en `develop` (y sincronizados con `main`) mediante commits claros, sin subir carpetas compiladas (`bin/`, `out/`) ni configuraciones locales del IDE.
