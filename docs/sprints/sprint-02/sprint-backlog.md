# Sprint Backlog – Sprint 2: "Back-end Java, Persistencia MySQL y Transacciones"

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Momento Evaluativo:** Momento 2  
**Estudiante / Equipo:** Miguel David Rojas González  
**Estado:** Completado al 100% (23 / 23 Story Points)  

---

## 1. Objetivo del Sprint (Sprint Goal)

> *"Evolucionar el Back-end Java de almacenamiento temporal en memoria hacia una arquitectura por capas conectada a MySQL (`mi_plata_db` en XAMPP), habilitando Cuentas con polimorfismo (`CuentaAhorros`, `CuentaCorriente`), Créditos independientes pagables por transferencia, transferencias atómicas entre usuarios e historial persistente de transacciones."*

---

## 2. Historias de Usuario Comprometidas y Entregadas

| ID | Historia de Usuario | Prioridad | Story Points | Estado |
| :---: | :--- | :---: | :---: | :---: |
| **US-11** | Persistencia relacional en MySQL (`mi_plata_db`) con Mappers, Repositorios y respaldo en memoria | Must Have | 5 pts | Completada |
| **US-12** | Gestión de cuentas `CuentaAhorros` y `CuentaCorriente` con herencia y polimorfismo en Java | Must Have | 5 pts | Completada |
| **US-13** | Transferencias atómicas entre usuarios/cuentas con commit/rollback e historial en BD | Must Have | 8 pts | Completada |
| **US-14** | Gestión de créditos independientes y pagos mediante transferencia desde cuenta origen | Should Have | 5 pts | Completada |

* **Story Points Comprometidos en Sprint 2:** 23 Story Points.  
* **Story Points Completados:** 23 Story Points (**100% de cumplimiento**).  

---

## 3. Desglose de Tareas Técnicas (Slicing Vertical)

### 3.1 Base de Datos y Capa de Persistencia JDBC
- [x] **TB-02:** Creación del script `src/backend-java/schema_mi_plata.sql` con tablas `users`, `accounts`, `credits`, `transactions` y datos semilla en UTF-8.
- [x] **TB-03:** Implementación de `DataBaseConnection` (Singleton JDBC), interfaz `RowMapper<T>` y mappers (`UserMapper`, `AccountMapper`, `CreditMapper`, `TransactionMapper`).
- [x] **TB-04:** Implementación de repositorios y adaptadores JDBC (`UserRepositoryAdapterDB`, `AccountRepositoryAdapterDB`, `CreditRepositoryAdapterDB`, `TransactionRepositoryAdapterDB`).

### 3.2 Dominio POO, Lógica Transaccional y Consola CLI
- [x] **TB-05:** Modelado de `Cuenta` (abstracta), `CuentaAhorros`, `CuentaCorriente`, `Credito` (entidad independiente) y `Transaccion`.
- [x] **TB-06:** Refactorización de `UserService` y creación de `BankService` con atomicidad SQL (`setAutoCommit(false)`, `commit()`, `rollback()`) y fallback en memoria.
- [x] **TB-07:** Portal inicial en `Main.java` con login/registro de Cliente (apertura automática de `CuentaAhorros`), panel transaccional por sesión y módulo Administrador para CRUD de usuarios y auditoría global, con limpieza general de comentarios redundantes en Java.

### 3.3 Aseguramiento de Calidad y Criterios de Evaluación
- [x] **TQ-02:** Ampliación de `TestRunner.java` con **13 pruebas integrales** ejecutadas en vivo contra MySQL (`mi_plata_db`).
- [x] **TD-01:** Documentación de `US-11` a `US-14`, actualización del Product Backlog y creación de `docs/criterios-evaluacion.md`.
