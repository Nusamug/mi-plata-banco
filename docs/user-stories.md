# Historias de Usuario – Sistema Bancario "Mi Plata"

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Momento Evaluativo:** Momento 2  
**Docentes:** Jorge Albeiro Muriel Vélez / Ing. Jorge Eliécer Hernández S.  
**Estudiante:** Miguel David Rojas González  
**Estándar:** INVEST · Formato Oficial (`Como... quiero... para...`)  
**Criterios de Aceptación:** Given-When-Then + Checklist de verificación  
**Cobertura:** Frontend Web (`US-01` a `US-10` · 42 pruebas en Node.js) + Backend Java/MySQL (`US-03`, `US-11` a `US-14` · 13 pruebas integrales)  

---

## 1. Guía de Principios INVEST Aplicados

Cada historia de usuario documentada cumple rigurosamente con los principios **INVEST**:
- **Independent (Independiente):** Desarrollable y verificable de manera modular.
- **Negotiable (Negociable):** Refinada según las reglas de negocio bancarias y el plan de estudio del Momento 2.
- **Valuable (Valiosa):** Entrega valor directo al cuentahabiente o al administrador del banco.
- **Estimable (Estimable):** Dimensionada en Story Points mediante la serie Fibonacci.
- **Small (Pequeña):** Acotada para completarse e integrarse dentro del ciclo de desarrollo.
- **Testable (Testeable):** Respaldada por criterios Given-When-Then, **42 pruebas unitarias de Front-end** y **13 pruebas integrales de Back-end Java + MySQL**.

---

## 2. Índice de Historias de Usuario

1. [US-01: Registro Realista de Nuevos Clientes](#us-01-registro-realista-de-nuevos-clientes) (5 SP - Must Have)
2. [US-02: Inicio de Sesión Seguro y Bloqueo tras 3 Intentos](#us-02-inicio-de-sesión-seguro-y-bloqueo-tras-3-intentos) (3 SP - Must Have)
3. [US-03: Mantenimiento y Administración CRUD de Usuarios](#us-03-mantenimiento-y-administración-crud-de-usuarios) (5 SP - Must Have)
4. [US-04: Consulta de Portafolio, KPIs Financieros y Consignación](#us-04-consulta-de-portafolio-kpis-financieros-y-consignación) (3 SP - Must Have)
5. [US-05: Retiros Inteligentes con Reglas Financieras (1.5% y Sobregiro 20%)](#us-05-retiros-inteligentes-con-reglas-financieras-15-y-sobregiro-20) (8 SP - Must Have)
6. [US-06: Transferencias Inmediatas y por Llave Bre-B](#us-06-transferencias-inmediatas-y-por-llave-bre-b) (5 SP - Should Have)
7. [US-07: Historial, Buscador en Vivo y Auditoría de Arreglos](#us-07-historial-buscador-en-vivo-y-auditoría-de-arreglos) (5 SP - Must Have)
8. [US-08: Simulación y Compras a Cuotas con Tarjeta de Crédito](#us-08-simulación-y-compras-a-cuotas-con-tarjeta-de-crédito) (5 SP - Must Have)
9. [US-09: Pagos y Abonos a Tarjeta de Crédito con Liberación de Cupo](#us-09-pagos-y-abonos-a-tarjeta-de-crédito-con-liberación-de-cupo) (3 SP - Should Have)
10. [US-10: Estudio Financiero y Crediticio en Línea para Nuevos Productos](#us-10-estudio-financiero-y-crediticio-en-línea-para-nuevos-productos) (5 SP - Should Have)
11. [US-11: Persistencia Relacional en MySQL y Respaldo en Memoria](#us-11-persistencia-relacional-en-mysql-y-respaldo-en-memoria) (5 SP - Must Have)
12. [US-12: Gestión de Cuentas Bancarias con Herencia y Polimorfismo en Java](#us-12-gestión-de-cuentas-bancarias-con-herencia-y-polimorfismo-en-java) (5 SP - Must Have)
13. [US-13: Transferencias Atómicas entre Usuarios e Historial en BD](#us-13-transferencias-atómicas-entre-usuarios-e-historial-en-bd) (8 SP - Must Have)
14. [US-14: Gestión de Créditos Independientes y Pago por Transferencia](#us-14-gestión-de-créditos-independientes-y-pago-por-transferencia) (5 SP - Should Have)

---

### US-01: Registro Realista de Nuevos Clientes

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-01` |
| **Épica / Feature** | Épica 1: Autenticación & Clientes / Feature 1.1: Onboarding Realista |
| **Prioridad / Estimación** | **Must Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** ciudadano interesado en abrir una cuenta bancaria,  
> **quiero** registrarme con mis datos personales (documento, nombre completo, celular como Llave Bre-B, usuario y contraseña),  
> **para** obtener inmediatamente mi Cuenta de Ahorros con numeración oficial colombiana (`401-XXXXXXX-X`) y un bono de bienvenida de $100.000 COP.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Registro exitoso con apertura exclusiva de Cuenta de Ahorros**
  * **Dado que** me encuentro en la pestaña *"Registrarme"* de `login.html`,
  * **Cuando** ingreso un documento, celular y nombre de usuario únicos junto con una contraseña de al menos 6 caracteres,
  * **Entonces** el sistema crea mi perfil, me asigna una Cuenta de Ahorros formato `401-XXXXXXX-X` con saldo inicial de $100.000 COP, inicia mi sesión automáticamente y me redirige al cajero.
* **Escenario 2: Rechazo por duplicidad de usuario, documento o celular**
  * **Dado que** el usuario `carlos99` o el documento `1020304050` ya están registrados,
  * **Cuando** intento crear otra cuenta con alguno de esos datos,
  * **Entonces** el sistema impide el registro y muestra una alerta indicando qué dato ya se encuentra en uso.

---

### US-02: Inicio de Sesión Seguro y Bloqueo tras 3 Intentos

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-02` |
| **Épica / Feature** | Épica 1: Autenticación & Clientes / Feature 1.2: Seguridad de Acceso |
| **Prioridad / Estimación** | **Must Have** · **3 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** cliente registrado en Mi Plata,  
> **quiero** visualizar cuántos intentos de inicio de sesión me quedan y que mi cuenta se bloquee automáticamente al tercer fallo consecutivo,  
> **para** proteger mis ahorros frente a intentos de intrusión o fuerza bruta.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Acceso exitoso reinicia contador**
  * **Dado que** ingreso credenciales válidas (ej. `carlos99` / `Pass123!`),
  * **Cuando** envío el formulario de login,
  * **Entonces** el contador de intentos fallidos se restablece a 0 (`3 de 3` disponibles) y accedo al panel del cajero.
* **Escenario 2: Decremento progresivo de intentos con alerta visual**
  * **Dado que** ingreso una clave errónea para un usuario existente,
  * **Cuando** fallo el primer o segundo intento,
  * **Entonces** el indicador visual cambia a estado de advertencia (`2 de 3` o `1 de 3`) e informa cuántos intentos restan antes del bloqueo.
* **Escenario 3: Bloqueo automático al tercer intento fallido**
  * **Dado que** acumulo 3 intentos fallidos consecutivos,
  * **Cuando** se procesa el tercer error,
  * **Entonces** el atributo `estaBloqueado` pasa a `true`, se deshabilitan las cajas de texto y el botón de ingreso, y no se permite el acceso ni siquiera ingresando posteriormente la clave correcta.

---

### US-03: Mantenimiento y Administración CRUD de Usuarios

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-03` |
| **Épica / Feature** | Épica 1: Autenticación & Clientes / Feature 1.3: Vertical User |
| **Prioridad / Estimación** | **Must Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** administrador del banco (en consola Java) y como cliente titular (en el perfil web),  
> **quiero** consultar, actualizar mis datos de contacto/contraseña, eliminar mi cuenta y auditar el número de registros,  
> **para** mantener actualizada la información personal y de seguridad.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Operaciones CRUD de Administrador y autenticación Cliente/Admin en Java**
  * **Dado que** inicio `Main.java` en el Portal Mi Plata (`1. Iniciar Sesión Cliente`, `2. Registrarme`, `3. Entrar como Administrador`),
  * **Cuando** me registro como cliente nuevo se crea automáticamente mi `CuentaAhorros` con bono inicial de $100.000, al iniciar sesión opero únicamente sobre mis productos, y al entrar como `Admin` accedo al CRUD completo de usuarios en `mi_plata_db`,
  * **Entonces** cada operación respeta el control de acceso por rol, la herencia `Person` $\rightarrow$ `User`/`Admin` y la persistencia JDBC (`authenticateUser`, `authenticateAdmin`, `selectUserById`, `updateUser`, `deleteUser`, `countUsers`).
* **Escenario 2: Actualización de perfil y llave celular en el Cajero Web**
  * **Dado que** abro el modal *"👤 Mi Perfil"* en `cajero.html`,
  * **Cuando** modifico mi nombre, celular (Llave Bre-B) o contraseña actualizando los campos requeridos,
  * **Entonces** `StorageService.actualizarCliente()` persiste los cambios en `localStorage` y actualiza la cabecera del cajero en tiempo real.

---

### US-04: Consulta de Portafolio, KPIs Financieros y Consignación

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-04` |
| **Épica / Feature** | Épica 2: Cajero & Transacciones / Feature 2.1: Gestión de Fondos |
| **Prioridad / Estimación** | **Must Have** · **3 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** cliente autenticado en el cajero automático,  
> **quiero** consultar el resumen ejecutivo de mi patrimonio (KPIs) y realizar consignaciones en efectivo mediante montos rápidos o personalizados,  
> **para** incrementar mi liquidez y recibir un comprobante térmico de cada depósito.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Cálculo de KPIs patrimoniales con `.filter()` y `.reduce()`**
  * **Dado que** ingreso al panel principal del cajero,
  * **Cuando** se cargan mis productos financieros,
  * **Entonces** la barra superior calcula dinámicamente mi Patrimonio Total, Rendimientos Ganados, Deuda en Tarjetas y Total de Movimientos.
* **Escenario 2: Consignación exitosa con emisión de comprobante térmico**
  * **Dado que** selecciono mi Cuenta de Ahorros o Corriente y elijo un chip rápido (ej. `+$100.000`),
  * **Cuando** confirmo la consignación,
  * **Entonces** el saldo aumenta inmediatamente, se agrega la transacción con `.push()` y se despliega en pantalla el **Comprobante Digital Térmico** listo para imprimir.

---

### US-05: Retiros Inteligentes con Reglas Financieras (1.5% y Sobregiro 20%)

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-05` |
| **Épica / Feature** | Épica 2: Cajero & Transacciones / Feature 2.2: Retiros Polimórficos |
| **Prioridad / Estimación** | **Must Have** · **8 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** cliente con productos bancarios diferenciados,  
> **quiero** retirar efectivo de mi Cuenta de Ahorros recibiendo un **1.5% de rendimiento** sobre el monto retirado, o retirar de mi Cuenta Corriente utilizando hasta un **20% de sobregiro autorizado**,  
> **para** beneficiarme de los incentivos al ahorro y del respaldo de liquidez comercial.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Retiro en Cuenta de Ahorros con abono del 1.5%**
  * **Dado que** mi Cuenta de Ahorros tiene un saldo de $1.000.000 COP,
  * **Cuando** retiro $200.000 COP,
  * **Entonces** el sistema calcula un rendimiento de $3.000 COP (1.5% de $200.000), actualiza mi saldo final a **$803.000 COP** y registra el beneficio en el comprobante.
* **Escenario 2: Retiro en Cuenta Corriente haciendo uso del 20% de sobregiro**
  * **Dado que** mi Cuenta Corriente tiene un saldo de $1.000.000 COP (tope de retiro con 20% de sobregiro: $1.200.000 COP),
  * **Cuando** retiro $1.150.000 COP,
  * **Entonces** la operación es aprobada, mi saldo queda en **-$150.000 COP** (persistiéndose correctamente en `localStorage`) y se notifica el monto de sobregiro utilizado.

---

### US-06: Transferencias Inmediatas y por Llave Bre-B

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-06` |
| **Épica / Feature** | Épica 2: Cajero & Transacciones / Feature 2.3: Pagos Inmediatos Bre-B |
| **Prioridad / Estimación** | **Should Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** cliente bancario,  
> **quiero** transferir dinero al instante hacia otros clientes utilizando su **Llave Bre-B** (número de celular o documento de identidad) o hacia otra de mis cuentas propias,  
> **para** enviar dinero sin costo y sin depender de números de cuenta extensos.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Transferencia exitosa por Llave Celular Bre-B**
  * **Dado que** elijo el canal *"⚡ Llave Bre-B (Número de Celular)"* e ingreso `3209876543` (perteneciente a María Fernanda Ospina),
  * **Cuando** transfiero $50.000 COP desde mi cuenta,
  * **Entonces** se debita $50.000 COP de mi cuenta, se acredita inmediatamente $50.000 COP en la cuenta de María Fernanda, se registran ambos movimientos y se emite el comprobante con el nombre de la destinataria.

---

### US-07: Historial, Buscador en Vivo y Auditoría de Arreglos

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-07` |
| **Épica / Feature** | Épica 2: Cajero & Transacciones / Feature 2.4: Estructuras de Datos & DOM |
| **Prioridad / Estimación** | **Must Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** usuario del cajero y evaluador técnico,  
> **quiero** filtrar mis movimientos en tiempo real con `.filter()`, reimprimir cualquier comprobante histórico y auditar la estructura de datos desapilando el último movimiento (`.pop()`) o depurando el más antiguo (`.shift()`),  
> **para** llevar control estricto de mis operaciones y evidenciar el dominio de los métodos de arreglos en JavaScript.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Búsqueda instantánea con `.filter()`**
  * **Dado que** escribo una palabra clave o monto en el buscador del historial,
  * **Cuando** se dispara el evento `input`,
  * **Entonces** la tabla del DOM se actualiza mostrando únicamente las filas que coinciden con el criterio.
* **Escenario 2: Deshacer última transacción con `.pop()` y sincronización de saldo**
  * **Dado que** presiono el botón *"⎌ Deshacer Último .pop()"*,
  * **Cuando** existen movimientos en la cuenta seleccionada,
  * **Entonces** se elimina el último elemento del arreglo `_movimientos` mediante `.pop()` y se restaura el saldo contable al estado inmediato anterior.

---

### US-08: Simulación y Compras a Cuotas con Tarjeta de Crédito

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-08` |
| **Épica / Feature** | Épica 3: Tarjeta de Crédito / Feature 3.1: Amortización Francesa |
| **Prioridad / Estimación** | **Must Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** tarjetahabiente de Mi Plata,  
> **quiero** simular y autorizar compras diferidas entre 1 y 36 cuotas conociendo la tasa mensual aplicada y la cuota fija calculada con la fórmula de amortización francesa,  
> **para** financiar mis compras con total claridad sobre los intereses.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Compra a 1 o 2 cuotas con 0% de interés**
  * **Dado que** realizo una compra de $1.000.000 COP a 2 cuotas,
  * **Cuando** el sistema aplica la regla de tasas ($\le 2$ cuotas $\rightarrow 0\%$),
  * **Entonces** la cuota mensual es exactamente **$500.000 COP** con $0 de interés.
* **Escenario 2: Compra de 3 a 6 cuotas (1.9% mes) o $\ge 7$ cuotas (2.3% mes)**
  * **Dado que** realizo una compra de $1.200.000 COP a 6 cuotas ($i = 0.019$),
  * **Cuando** se evalúa la fórmula $A = \frac{P \times i}{1 - (1+i)^{-n}}$,
  * **Entonces** la cuota fija resultante es **$213.567 COP**, se descuenta el capital del cupo disponible y aumenta la deuda actual de la tarjeta.

---

### US-09: Pagos y Abonos a Tarjeta de Crédito con Liberación de Cupo

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-09` |
| **Épica / Feature** | Épica 3: Tarjeta de Crédito / Feature 3.2: Recaudo y Cupo |
| **Prioridad / Estimación** | **Should Have** · **3 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** titular de una Tarjeta de Crédito con deuda vigente,  
> **quiero** pagar la cuota del mes, hacer un abono parcial o pagar la deuda total (en efectivo o debitando de mi Cuenta de Ahorros/Corriente),  
> **para** disminuir mi endeudamiento y liberar mi cupo disponible al instante.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Pago de tarjeta debitando desde Cuenta de Ahorros**
  * **Dado que** tengo una deuda de $600.000 COP en mi tarjeta y selecciono *"Pagar Cuota del Mes"* ($300.000 COP) debitando de mi Cuenta de Ahorros,
  * **Cuando** confirmo el pago,
  * **Entonces** se descuentan $300.000 COP de mi Cuenta de Ahorros, la deuda de la tarjeta baja a $300.000 COP, mi cupo disponible aumenta en $300.000 COP y se emite el comprobante térmico.

---

### US-10: Estudio Financiero y Crediticio en Línea para Nuevos Productos

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-10` |
| **Épica / Feature** | Épica 3: Tarjeta de Crédito / Feature 3.3: Evaluación de Riesgo |
| **Prioridad / Estimación** | **Should Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** cliente que inicia únicamente con Cuenta de Ahorros (ej. `mafe_ospina` o un usuario recién registrado),  
> **quiero** solicitar en línea el estudio financiero para abrir mi Cuenta Corriente o emitir mi Tarjeta de Crédito Visa según mis ingresos mensuales,  
> **para** acceder a productos de crédito y sobregiro acordes a mi capacidad económica real.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Estudio de Cuenta Corriente (Mínimo $2.000.000 COP)**
  * **Dado que** solicito una Cuenta Corriente en el modal de estudio financiero,
  * **Cuando** certifico ingresos $\ge \$2.000.000\text{ COP}$,
  * **Entonces** el banco aprueba y crea mi Cuenta Corriente (`201-XXXXXXX-X`) con 20% de sobregiro autorizado; si ingreso un monto menor, rechaza la solicitud explicando el requisito.
* **Escenario 2: Estudio de Tarjeta de Crédito Escalonado (Visa Clásica vs Visa Gold)**
  * **Dado que** inicio el estudio crediticio para Tarjeta de Crédito,
  * **Cuando** reporto ingresos entre $1.500.000 y $3.499.999 COP se me aprueba una **Visa Clásica ($2.500.000 cupo)**, y si reporto $\ge \$3.500.000\text{ COP}$ se me aprueba una **Visa Gold ($6.000.000 cupo)** con numeración de 16 dígitos (`4509 XXXX XXXX XXXX`).

---

### US-11: Persistencia Relacional en MySQL y Respaldo en Memoria

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-11` |
| **Épica / Feature** | Épica 4: Back-end Java & MySQL / Feature 4.1: Arquitectura de Persistencia JDBC |
| **Prioridad / Estimación** | **Must Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** desarrollador y administrador del sistema Mi Plata,  
> **quiero** persistir usuarios, cuentas, créditos y transacciones en MySQL (`mi_plata_db`) mediante JDBC, Mappers y Repositorios con respaldo automático en memoria,  
> **para** conservar todos los saldos y movimientos entre ejecuciones y evitar caídas si el servidor de base de datos está apagado.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Conexión activa a MySQL mediante Singleton y esquema relacional**
  * **Dado que** MySQL en XAMPP está ejecutándose con el esquema `schema_mi_plata.sql` importado,
  * **Cuando** inicio `Main` o `TestRunner`,
  * **Entonces** `DataBaseConnection.getInstance()` establece conexión con `mi_plata_db` y `UserService` / `BankService` operan contra las tablas `users`, `accounts`, `credits` y `transactions`.
* **Escenario 2: Modo respaldo (Fallback) en memoria cuando MySQL no está disponible**
  * **Dado que** el servicio MySQL está detenido o inaccesible,
  * **Cuando** se instancian `UserService` y `BankService`,
  * **Entonces** el sistema informa que inicia en modo `MEMORIA TEMPORAL (Fallback)` y carga datos de ejemplo para operar sin excepciones.

#### Checklist de Verificación
- [x] `schema_mi_plata.sql` crea las 4 tablas con llaves primarias y foráneas (`ON DELETE CASCADE` / `ON DELETE SET NULL`).
- [x] Mappers genéricos implementan `RowMapper<T>` (`UserMapper`, `AccountMapper`, `CreditMapper`, `TransactionMapper`).
- [x] Repositorios implementan consultas parametrizadas con `PreparedStatement` sin exposición a inyección SQL.

---

### US-12: Gestión de Cuentas Bancarias con Herencia y Polimorfismo en Java

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-12` |
| **Épica / Feature** | Épica 4: Back-end Java & MySQL / Feature 4.2: Cuentas Ahorros y Corriente |
| **Prioridad / Estimación** | **Must Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** cliente titular registrado en Mi Plata,  
> **quiero** crear Cuentas de Ahorros y Cuentas Corrientes, consignar dinero y realizar retiros gobernados por las reglas de cada tipo de cuenta,  
> **para** administrar mis productos bancarios aplicando encapsulamiento, herencia y polimorfismo en Java.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Rechazo de sobregiro en Cuenta de Ahorros (`CuentaAhorros.retirar`)**
  * **Dado que** un usuario tiene una `CuentaAhorros` con saldo de $100.000,
  * **Cuando** intenta retirar $150.000,
  * **Entonces** el método polimórfico `retirar(150000)` retorna `false` y el saldo permanece intacto en $100.000 en la tabla `accounts`.
* **Escenario 2: Uso autorizado de cupo de sobregiro en Cuenta Corriente (`CuentaCorriente.retirar`)**
  * **Dado que** un usuario tiene una `CuentaCorriente` con saldo de $50.000 y cupo de sobregiro de $100.000,
  * **Cuando** retira $120.000,
  * **Entonces** `retirar(120000)` autoriza la operación, actualiza el saldo en BD a -$70.000 y registra un movimiento de tipo `RETIRO`.

#### Checklist de Verificación
- [x] `Cuenta` es clase abstracta con método común `consignar(double)` y métodos abstractos `retirar(double)` y `getAccountType()`.
- [x] Únicamente `CuentaAhorros` y `CuentaCorriente` heredan de `Cuenta`.
- [x] Las consignaciones y retiros válidos registran automáticamente su movimiento en la tabla `transactions`.

---

### US-13: Transferencias Atómicas entre Usuarios e Historial en BD

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-13` |
| **Épica / Feature** | Épica 4: Back-end Java & MySQL / Feature 4.3: Transferencias y Trazabilidad |
| **Prioridad / Estimación** | **Must Have** · **8 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** cliente bancario en Mi Plata,  
> **quiero** transferir dinero desde mi cuenta hacia la cuenta de otro usuario garantizando atomicidad transaccional y consultar el historial completo o filtrado por cuenta,  
> **para** asegurar que el débito, el crédito y el registro contable ocurran como una sola operación íntegra en MySQL.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Transferencia atómica exitosa entre usuarios distintos**
  * **Dado que** la cuenta origen tiene fondos disponibles (incluyendo sobregiro si es corriente) y la cuenta destino existe y es distinta a la origen,
  * **Cuando** ejecuto `transferBetweenAccounts(origen, destino, monto, descripcion)`,
  * **Entonces** dentro de una transacción JDBC (`setAutoCommit(false)` / `commit()`), se descuenta el monto en origen, se acredita en destino y se inserta un registro `TRANSFERENCIA` en `transactions`.
* **Escenario 2: Reversión automática y rechazo por fondos insuficientes o cuenta inexistente**
  * **Dado que** el monto supera los fondos disponibles o falla una operación SQL intermedia,
  * **Cuando** se procesa la transferencia,
  * **Entonces** la operación retorna `false`, ejecuta `rollback()` si la transacción SQL ya inició, y los saldos de ambas cuentas permanecen inalterados.

#### Checklist de Verificación
- [x] `BankService.transferBetweenAccounts` valida `amount > 0`, cuentas distintas y existencia de ambas cuentas.
- [x] `TransactionRepositoryAdapterDB.selectAll()` y `selectByAccount()` listan movimientos ordenados por `tx_id DESC`.
- [x] Probado en vivo entre usuarios (`104` $\leftrightarrow$ `102` en `TestRunner` y `101` $\rightarrow$ `103` en `Main`).

---

### US-14: Gestión de Créditos Independientes y Pago por Transferencia

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-14` |
| **Épica / Feature** | Épica 4: Back-end Java & MySQL / Feature 4.4: Entidad Credito y Abonos |
| **Prioridad / Estimación** | **Should Have** · **5 Story Points** · **Estado: Completada** |

#### Declaración de la Historia
> **Como** titular de un crédito aprobado en Mi Plata,  
> **quiero** solicitar créditos registrados de manera independiente a las cuentas bancarias y pagarlos total o parcialmente mediante transferencia desde una cuenta origen,  
> **para** reducir mi deuda de forma segura hasta liquidar el crédito en estado `PAGADO`.

#### Criterios de Aceptación (Given-When-Then)
* **Escenario 1: Solicitud y persistencia de crédito con ID autogenerado**
  * **Dado que** existe un usuario registrado en `users`,
  * **Cuando** solicito un crédito con monto y plazo en meses positivos,
  * **Entonces** `CreditRepositoryAdapterDB` inserta el crédito con `current_debt = approved_amount`, estado `ACTIVO` y recupera el `credit_id` generado.
* **Escenario 2: Abono y cancelación total mediante transferencia desde una cuenta**
  * **Dado que** tengo un crédito en estado `ACTIVO` con deuda pendiente de $150.000,
  * **Cuando** abono $50.000 y luego $100.000 desde mi cuenta con saldo suficiente mediante `payCreditFromAccount`,
  * **Entonces** cada pago debita la cuenta origen, descuenta `current_debt`, registra una transacción `PAGO_CREDITO` con `target_credit_id`, y al llegar la deuda a `$0.00` el estado cambia a `PAGADO` (rechazando abonos superiores a la deuda).

#### Checklist de Verificación
- [x] `Credito` es una entidad separada (no hereda de `Cuenta`) vinculada por `user_id`.
- [x] `BankService.payCreditFromAccount` valida saldo en cuenta, estado distinto de `PAGADO` y `monto <= currentDebt` de manera atómica.
- [x] `CreditRepositoryAdapterDB` retorna el `credit_id` mediante `Statement.RETURN_GENERATED_KEYS`.
