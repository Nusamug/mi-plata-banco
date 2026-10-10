# Product Backlog – Sistema Bancario "Mi Plata"

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Momento:** Momento 2  
**Desarrollador / Equipo:** Miguel David Rojas González  
**Docente:** Ing. Jorge Eliécer Hernández S.  

---

## 1. Visión General del Backlog

El **Product Backlog** de *Mi Plata* recopila, organiza y prioriza los requerimientos funcionales y de seguridad necesarios para construir el sistema bancario propuesto en el proyecto integrador.

Para mantener una estructura clara y manejable, los requerimientos se organizaron en tres niveles:
1. **Épicas:** Áreas funcionales generales del aplicativo.
2. **Features:** Módulos específicos o capacidades dentro de cada épica.
3. **Historias de Usuario (US):** Unidades de entrega concretas que aportan valor directo y verificable en cada ciclo.

---

## 2. Criterios de Estimación y Priorización

* **Estimación:** Se empleó la escala de **Story Points con la serie Fibonacci (1, 2, 3, 5, 8, 13)**, valorando la dificultad técnica, la lógica financiera y el esfuerzo de desarrollo tanto en frontend (JavaScript) como en backend (Java).
* **Priorización:** Se aplicó el método **MoSCoW**:
  * **Must Have (M):** Requerimientos esenciales para la primera versión funcional (Sprint 1).
  * **Should Have (S):** Funcionalidades importantes para la siguiente fase (Sprint 2).
  * **Could Have (C):** Opciones de valor agregado si los tiempos de desarrollo lo permiten.
  * **Won't Have (W):** Fuera del alcance acordado para este momento evaluativo.

---

## 3. Tabla Resumen del Product Backlog

| ID | Épica | Feature | Historia de Usuario | Prioridad (MoSCoW) | Estimación (SP) | Sprint Asignado | Estado |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **US-01** | Autenticación y Clientes | Registro | Registro de nuevo cliente con validación de campos | **Must Have** | 5 pts | Sprint 1 | Completada |
| **US-02** | Autenticación y Clientes | Seguridad | Login seguro con bloqueo automático tras 3 intentos fallidos | **Must Have** | 3 pts | Sprint 1 | Completada |
| **US-03** | Autenticación y Clientes | Vertical User | CRUD de usuarios en Java (`select`, `update`, `delete`, `count`) | **Must Have** | 5 pts | Sprint 1 | Completada |
| **US-04** | Cajero y Transacciones | Fondos | Consulta de saldos y consignaciones en efectivo | **Must Have** | 3 pts | Sprint 1 | Completada |
| **US-05** | Cajero y Transacciones | Retiros | Retiros con reglas de negocio (1.5% ahorro y 20% sobregiro) | **Must Have** | 8 pts | Sprint 1 | Completada |
| **US-06** | Cajero y Transacciones | Transferencias | Transferencias inmediatas entre cuentas | **Should Have** | 5 pts | Sprint 2 | Pendiente |
| **US-07** | Cajero y Transacciones | Auditoría | Historial y extracto de transacciones cronológico | **Should Have** | 3 pts | Sprint 2 | Pendiente |
| **US-08** | Tarjeta de Crédito | Financiamiento | Compras y simulación diferida a cuotas con amortización | **Must Have** | 5 pts | Sprint 1 | Completada |
| **US-09** | Tarjeta de Crédito | Pagos | Pagos y abonos a la tarjeta para liberación de cupo | **Could Have** | 5 pts | Sprint 2 | Pendiente |

* **Total de puntos estimados en el Backlog:** 42 Story Points.  
* **Puntos comprometidos y completados en Sprint 1:** 29 Story Points.  

---

## 4. Desglose por Épicas y Features

### Épica 1: Autenticación, Seguridad y Gestión de Clientes
*Objetivo:* Brindar un canal seguro de acceso y permitir la administración de la información de los clientes registrados.

* **Feature 1.1: Registro de Nuevos Clientes**
  * `US-01`: Como usuario nuevo, quiero crear una cuenta bancaria con mis datos personales (nombre, documento, celular, usuario y contraseña), para ingresar a la plataforma y gestionar mi dinero de manera autónoma. *(5 SP)*
* **Feature 1.2: Acceso Seguro y Control de Intentos**
  * `US-02`: Como cliente bancario, quiero iniciar sesión de manera segura con mis credenciales y que el sistema bloquee mi acceso temporalmente si fallo 3 veces consecutivas, para evitar accesos no autorizados. *(3 SP)*
* **Feature 1.3: Mantenimiento y Administración de Usuarios (Vertical Back-end)**
  * `US-03`: Como administrador del banco, quiero consultar usuarios por ID, actualizar su información de contacto, dar de baja registros y consultar la cantidad total de clientes registrados en consola, para mantener la base de datos limpia y consistente. *(5 SP)*

---

### Épica 2: Módulo de Transacciones del Cajero Automático
*Objetivo:* Simular las operaciones habituales de consulta, depósito, retiro y transferencias bancarias.

* **Feature 2.1: Gestión de Saldo y Depósitos**
  * `US-04`: Como cliente bancario, quiero ver el saldo disponible de mis cuentas y realizar consignaciones de dinero en efectivo, para mantener fondos suficientes en mis productos. *(3 SP)*
* **Feature 2.2: Retiros con Reglas Financieras**
  * `US-05`: Como cliente con cuentas de ahorros o corriente, quiero retirar dinero aplicando las políticas de mi producto (bonificación del 1.5% en Ahorros o sobregiro autorizado del 20% en Corriente), para hacer uso de los beneficios comerciales de mi banco. *(8 SP)*
* **Feature 2.3: Transferencias entre Cuentas**
  * `US-06`: Como cliente bancario, quiero transferir dinero a otras cuentas validando que dispongo de saldo suficiente, para enviar fondos sin intermediarios. *(5 SP)*
* **Feature 2.4: Registro de Movimientos**
  * `US-07`: Como cliente bancario, quiero visualizar una lista clara de mis últimos depósitos, retiros y transferencias con fecha y monto, para llevar el control de mis transacciones. *(3 SP)*

---

### Épica 3: Módulo de Tarjetas de Crédito y Financiamiento
*Objetivo:* Ofrecer compras financiadas a plazos con cálculo transparente de intereses y cuotas.

* **Feature 3.1: Compras a Cuotas con Amortización Mensual**
  * `US-08`: Como tarjetahabiente, quiero realizar compras simuladas difiriendo el valor desde 1 hasta 36 cuotas, conociendo la tasa de interés aplicada (0% hasta 2 cuotas, 1.9% de 3 a 6 cuotas, 2.3% para 7 o más cuotas) y el valor de cada cuota, para planificar mi presupuesto responsablemente. *(5 SP)*
* **Feature 3.2: Consulta de Cupo Disponible y Pagos**
  * `US-09`: Como tarjetahabiente, quiero consultar mi cupo disponible y efectuar abonos a mi tarjeta de crédito, para liberar cupo disponible. *(5 SP)*

---

## 5. Estrategia de Slicing (División Vertical de Historias)

Para garantizar avances continuos y entregas funcionales, cada historia de usuario fue dividida de forma vertical, cubriendo:
1. **Interfaz (UI):** Formularios claros, validaciones de entrada y respuesta visual para el usuario.
2. **Lógica de Negocio (POO):** Modelado orientado a objetos con herencia (`Cuenta` $\rightarrow$ `CuentaAhorros`, `CuentaCorriente`, `TarjetaCredito`).
3. **Persistencia:** Almacenamiento local para el entorno web y colecciones `ArrayList` para el entorno Java.
4. **Pruebas y Verificación:** Validación mediante pruebas manuales y scripts automáticos para asegurar que los criterios de aceptación se cumplan antes de considerar la historia como terminada.
