# 📋 Product Backlog – Sistema Bancario "Mi Plata"

> **Proyecto:** Mi Plata (Banca Digital & Cajero Automático)  
> **Equipo:** Scrum Team Mi Plata  
> **Fecha de creación:** Octubre 2026  
> **Última actualización:** Sprint 1 (En curso / Entregado)  
> **Product Owner:** Equipo Mi Plata  

---

## 🎯 Visión General del Backlog

El **Product Backlog** de *Mi Plata* recopila, desglosa y prioriza todas las necesidades funcionales y de seguridad requeridas para entregar un sistema bancario seguro, intuitivo y pedagógicamente riguroso.

Para organizar el trabajo de forma coherente y ágil, aplicamos una jerarquía de tres niveles:
1. **Épicas (Epics):** Grandes áreas funcionales del sistema que abarcan múltiples iteraciones.
2. **Features:** Capacidades específicas dentro de cada épica.
3. **Historias de Usuario (US):** Entregables concretos y verticales que aportan valor directo al usuario final o a la administración del banco.

---

## 📐 Criterios de Estimación y Priorización

* **Estimación:** Se utilizó la secuencia de **Story Points (Fibonacci: 1, 2, 3, 5, 8, 13)** considerando la complejidad técnica, la incertidumbre y el esfuerzo requerido tanto en frontend como en backend.
* **Priorización:** Se combinó el valor de negocio con el método **MoSCoW**:
  * **Must Have (M):** Crítico para el funcionamiento mínimo viable (Sprint 1).
  * **Should Have (S):** Altamente deseable para la experiencia del usuario (Sprint 2).
  * **Could Have (C):** Funcionalidad complementaria si el tiempo y recursos lo permiten.
  * **Won't Have (W):** Fuera del alcance para los primeros momentos evaluativos.

---

## 📊 Tabla Resumen del Product Backlog

| ID | Épica | Feature | Historia de Usuario | Prioridad (MoSCoW) | Estimación (SP) | Sprint Asignado | Estado |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **US-01** | Épica 1: Autenticación & Clientes | Registro | Registro de nuevo cliente con datos completos y validaciones | **Must Have** | 5 pts | Sprint 1 | ✅ Completada |
| **US-02** | Épica 1: Autenticación & Clientes | Seguridad | Inicio de sesión seguro con bloqueo preventivo tras 3 intentos | **Must Have** | 3 pts | Sprint 1 | ✅ Completada |
| **US-03** | Épica 1: Autenticación & Clientes | Vertical User | Mantenimiento y CRUD de usuarios (`update`, `select`, `delete`, `count`) | **Must Have** | 5 pts | Sprint 1 | ✅ Completada |
| **US-04** | Épica 2: Cajero & Transacciones | Fondos | Consulta de saldos consolidados y consignación de fondos | **Must Have** | 3 pts | Sprint 1 | ✅ Completada |
| **US-05** | Épica 2: Cajero & Transacciones | Retiros | Retiros con reglas financieras (interés 1.5% en Ahorros y sobregiro 20% en Corriente) | **Must Have** | 8 pts | Sprint 1 | ✅ Completada |
| **US-06** | Épica 2: Cajero & Transacciones | Transferencias | Transferencias inmediatas entre cuentas propias y a terceros | **Should Have** | 5 pts | Sprint 2 | ⏳ Pendiente |
| **US-07** | Épica 2: Cajero & Transacciones | Auditoría | Historial y extracto de movimientos en orden cronológico | **Should Have** | 3 pts | Sprint 2 | ⏳ Pendiente |
| **US-08** | Épica 3: Tarjeta de Crédito | Financiamiento | Compra y simulación a cuotas con amortización según plazo | **Must Have** | 5 pts | Sprint 1 | ✅ Completada |
| **US-09** | Épica 3: Tarjeta de Crédito | Pagos | Abono y pago total o parcial de la tarjeta de crédito | **Could Have** | 5 pts | Sprint 2 | ⏳ Pendiente |

* **Total Story Points estimados en el Backlog:** 42 pts.  
* **Story Points comprometidos y completados en Sprint 1:** 29 pts.  

---

## 🏛️ Desglose Detallado por Épicas y Features

### 🔹 Épica 1: Autenticación, Seguridad y Gestión de Clientes
*Objetivo:* Proporcionar un canal de acceso confiable, protegiendo las credenciales de los usuarios y permitiendo la administración eficiente de sus datos de contacto e identificación.

* **Feature 1.1: Registro de Nuevos Clientes**
  * `US-01`: Como usuario nuevo, quiero crear una cuenta bancaria con mis datos personales (nombre, documento, celular, usuario y contraseña), para ingresar a la plataforma y gestionar mi dinero de manera autónoma. *(5 SP)*
* **Feature 1.2: Acceso Seguro y Control de Intentos**
  * `US-02`: Como cliente bancario, quiero iniciar sesión de manera segura con mis credenciales y que el sistema bloquee mi acceso temporalmente si fallo 3 veces consecutivas, para evitar fraudes y accesos no autorizados. *(3 SP)*
* **Feature 1.3: Mantenimiento y Administración de Usuarios (Vertical Back-end)**
  * `US-03`: Como administrador del banco, quiero consultar usuarios por ID, actualizar su información de contacto, dar de baja registros y consultar la cantidad total de clientes registrados, para mantener la base de datos limpia y consistente. *(5 SP)*

---

### 🔹 Épica 2: Módulo de Transacciones del Cajero Automático
*Objetivo:* Permitir las operaciones bancarias habituales de consulta, depósito, retiro y transferencia de forma transparente y con retroalimentación clara para el cliente.

* **Feature 2.1: Gestión de Saldo y Depósitos**
  * `US-04`: Como cliente bancario, quiero ver el saldo disponible de mis cuentas y realizar consignaciones de dinero en efectivo, para mantener fondos suficientes para mis actividades diarias. *(3 SP)*
* **Feature 2.2: Retiros Inteligentes con Reglas Financieras Diferenciadas**
  * `US-05`: Como cliente con cuentas de ahorros o corriente, quiero retirar dinero aplicando las políticas de mi producto (bonificación de intereses del 1.5% en Ahorros o sobregiro autorizado del 20% en Corriente), para hacer uso de los beneficios comerciales de mi banco. *(8 SP)*
* **Feature 2.3: Transferencias entre Cuentas**
  * `US-06`: Como cliente bancario, quiero transferir dinero a otras cuentas de forma inmediata validando que dispongo de saldo suficiente, para enviar fondos a familiares o pagar servicios sin intermediarios. *(5 SP)*
* **Feature 2.4: Extractos y Registro de Movimientos**
  * `US-07`: Como cliente bancario, quiero visualizar una lista clara de mis últimos depósitos, retiros y transferencias con fecha, tipo y monto, para llevar el control detallado de mis finanzas personales. *(3 SP)*

---

### 🔹 Épica 3: Módulo de Tarjetas de Crédito y Financiamiento
*Objetivo:* Facilitar el uso de crédito rotativo con claridad en las tasas de interés y el cálculo exacto de las cuotas a pagar.

* **Feature 3.1: Financiamiento a Cuotas con Amortización Mensual**
  * `US-08`: Como tarjetahabiente, quiero realizar compras simuladas difiriendo el valor desde 1 hasta 36 cuotas, conociendo el interés exacto aplicado (0% hasta 2 cuotas, 1.9% de 3 a 6 cuotas, 2.3% para 7 o más cuotas) y el valor de cada cuota, para planificar mi presupuesto responsablemente. *(5 SP)*
* **Feature 3.2: Consulta de Cupo Disponible y Pago de Tarjeta**
  * `US-09`: Como tarjetahabiente, quiero consultar mi cupo disponible, cupo utilizado y efectuar abonos a mi tarjeta de crédito, para liberar cupo y mantener un historial crediticio positivo. *(5 SP)*

---

## 🔪 Criterio de Slicing (División Vertical de Historias)

Para evitar historias monolíticas que bloqueen al equipo, cada historia de usuario fue cortada verticalmente atravesando todas las capas del producto:
1. **Capa Visual (UI / Front-end):** Formularios claros, mensajes comprensibles para el usuario y adaptabilidad móvil.
2. **Capa Lógica (Reglas de Negocio / POO):** Clases estructuradas, herencia y polimorfismo (`Cuenta` $\rightarrow$ `CuentaAhorros` / `CuentaCorriente`).
3. **Capa de Persistencia / Almacenamiento:** Manejo de datos consistente (`StorageService` en navegador y `ArrayList` en Java).
4. **Capa de Verificación:** Pruebas automatizadas y criterios de aceptación verificables antes de dar la historia por terminada (**Definition of Done**).
