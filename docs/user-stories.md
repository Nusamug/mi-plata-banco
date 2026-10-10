# Historias de Usuario – Sistema Bancario "Mi Plata"

**Proyecto:** Mi Plata (Banca Digital y Cajero Automático)  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Submódulo:** Metodologías Ágiles para la Programación  
**Docente:** Ing. Jorge Eliécer Hernández S.  
**Estudiante:** Miguel David Rojas González  
**Estándar:** INVEST · Formato Oficial (`Como... quiero... para...`)  
**Criterios de Aceptación:** Given-When-Then + Checklist de verificación  

---

## 1. Guía de Principios INVEST Aplicados

Cada historia de usuario documentada en este archivo representa una unidad de valor real entregada al usuario o a la administración del banco. Cumplen con los principios **INVEST**:
- **Independent (Independiente):** Se puede planificar y desarrollar con mínima dependencia de otras tareas.
- **Negotiable (Negociable):** El alcance fino y los detalles se acordaron en clase con el docente.
- **Valuable (Valiosa):** Aporta un beneficio directo para el cliente bancario o la administración.
- **Estimable (Estimable):** Posee un tamaño medible en Story Points según su complejidad técnica.
- **Small (Pequeña):** Diseñada para completarse dentro del Sprint.
- **Testable (Testeable):** Cuenta con criterios de aceptación objetivos y verificables mediante pruebas.

---

## 2. Índice de Historias de Usuario

* [US-01: Registro de Nuevos Clientes](#us-01-registro-de-nuevos-clientes) (5 SP - Must Have)
* [US-02: Inicio de Sesión Seguro y Control de Intentos](#us-02-inicio-de-sesión-seguro-y-control-de-intentos) (3 SP - Must Have)
* [US-03: Mantenimiento y Administración de Usuarios en Java](#us-03-mantenimiento-y-administración-de-usuarios-crud-back-end) (5 SP - Must Have)
* [US-04: Consulta de Saldos Consolidados y Consignación](#us-04-consulta-de-saldos-consolidados-y-consignación) (3 SP - Must Have)
* [US-05: Retiros con Reglas Financieras (Interés y Sobregiro)](#us-05-retiros-inteligentes-con-reglas-financieras-interés-y-sobregiro) (8 SP - Must Have)
* [US-08: Simulación y Compras a Cuotas con Tarjeta de Crédito](#us-08-simulación-y-compras-a-cuotas-con-tarjeta-de-crédito) (5 SP - Must Have)

---

### US-01: Registro de Nuevos Clientes

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-01` |
| **Épica / Feature** | Épica 1: Autenticación & Clientes / Feature 1.1: Registro |
| **Prioridad** | **Must Have (Alta)** |
| **Estimación** | **5 Story Points** |
| **Sprint** | Sprint 1 (Completada) |

#### Declaración de la Historia
> **Como** usuario nuevo de la banca digital,  
> **quiero** registrarme en el sistema completando un formulario con mis datos personales (nombre completo, documento de identidad, celular, nombre de usuario y contraseña),  
> **para** abrir mis productos financieros y acceder al cajero automático de manera autónoma.

#### Criterios de Aceptación (Given-When-Then)

* **Escenario 1: Registro exitoso con apertura automática de cuentas**
  * **Dado que** me encuentro en el formulario de registro de la página web,
  * **Cuando** ingreso un documento válido, nombre completo, celular de 10 dígitos, un nombre de usuario que no exista previamente y una contraseña segura,
  * **Entonces** el sistema guarda mi usuario en el almacenamiento local, crea automáticamente una Cuenta de Ahorros con saldo inicial, una Cuenta Corriente y una Tarjeta de Crédito, y me redirige a la pantalla de inicio de sesión con un mensaje de bienvenida.

* **Escenario 2: Intento de registro con nombre de usuario duplicado**
  * **Dado que** ya existe un cliente registrado con el usuario `carlos.restrepo`,
  * **Cuando** una persona intenta registrarse usando nuevamente el usuario `carlos.restrepo`,
  * **Entonces** el sistema no permite el guardado y muestra un mensaje de alerta en pantalla indicando que el usuario ya se encuentra en uso.

* **Escenario 3: Validación de campos obligatorios incompletos**
  * **Dado que** dejo campos vacíos o con formato inválido (ej. celular con letras),
  * **Cuando** hago clic en el botón *"Registrarme"*,
  * **Entonces** el formulario resalta los campos incorrectos y no procesa la solicitud.

---

### US-02: Inicio de Sesión Seguro y Control de Intentos

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-02` |
| **Épica / Feature** | Épica 1: Autenticación & Clientes / Feature 1.2: Acceso Seguro |
| **Prioridad** | **Must Have (Alta)** |
| **Estimación** | **3 Story Points** |
| **Sprint** | Sprint 1 (Completada) |

#### Declaración de la Historia
> **Como** cliente registrado en Mi Plata,  
> **quiero** iniciar sesión con mi usuario y contraseña, y que el sistema bloquee el acceso tras 3 intentos fallidos consecutivos,  
> **para** proteger mi dinero contra intentos de acceso no autorizados o ataques de fuerza bruta.

#### Criterios de Aceptación (Given-When-Then)

* **Escenario 1: Autenticación correcta**
  * **Dado que** ingreso credenciales registradas válidas (ej. `carlos.restrepo` / `1234`),
  * **Cuando** presiono *"Ingresar"*,
  * **Entonces** el sistema reinicia el contador de intentos fallidos a 3 y me redirige inmediatamente a la vista del Cajero Automático.

* **Escenario 2: Error de contraseña con aviso de intentos restantes**
  * **Dado que** escribo mi usuario correcto pero la contraseña incorrecta,
  * **Cuando** presiono *"Ingresar"*,
  * **Entonces** el sistema muestra una advertencia en color amarillo/rojo indicando cuántos intentos me quedan (ej. *"Contraseña incorrecta. Te quedan 2 intentos"*).

* **Escenario 3: Bloqueo de seguridad al tercer intento fallido**
  * **Dado que** he fallado 3 veces seguidas la contraseña,
  * **Cuando** ocurre el tercer fallo,
  * **Entonces** el sistema cambia el estado del usuario a `bloqueado`, deshabilita el formulario y muestra una notificación clara: *"Acceso bloqueado por seguridad tras 3 intentos fallidos. Comuníquese con el banco"*.

---

### US-03: Mantenimiento y Administración de Usuarios (CRUD Back-end)

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-03` |
| **Épica / Feature** | Épica 1: Autenticación & Clientes / Feature 1.3: Vertical User |
| **Prioridad** | **Must Have (Alta)** |
| **Estimación** | **5 Story Points** |
| **Sprint** | Sprint 1 (Completada) |

#### Declaración de la Historia
> **Como** administrador del sistema bancario,  
> **quiero** ejecutar operaciones de consulta por ID, actualización, eliminación y conteo total de usuarios a través de la consola Java,  
> **para** mantener la integridad y consistencia del registro de clientes en la base de datos en memoria.

#### Criterios de Aceptación (Given-When-Then)

* **Escenario 1: Consulta de usuario por ID (`selectUserById`)**
  * **Dado que** existen usuarios cargados en el `ArrayList<User>`,
  * **Cuando** el administrador busca el identificador `101`,
  * **Entonces** el sistema retorna los datos completos de Carlos Restrepo (nombre, documento, ciudad, celular y saldo asociado).

* **Escenario 2: Actualización de datos de contacto (`updateUser`)**
  * **Dado que** un cliente solicita cambio de número telefónico o ciudad de residencia,
  * **Cuando** el administrador invoca `updateUser()` pasando el ID y los nuevos valores,
  * **Entonces** los campos son modificados en el objeto en memoria y se retorna confirmación de éxito.

* **Escenario 3: Eliminación controlada (`deleteUser`)**
  * **Dado que** un usuario solicita cancelar su cuenta bancaria,
  * **Cuando** se ejecuta `deleteUser(id)`,
  * **Entonces** el usuario es removido de la colección y una búsqueda posterior de su ID devuelve `null` o mensaje de usuario no encontrado.

* **Escenario 4: Auditoría de cantidad de usuarios (`countUsers`)**
  * **Dado que** se agregan o eliminan usuarios en la sesión,
  * **Cuando** se llama al método `countUsers()`,
  * **Entonces** devuelve el número exacto y actualizado de registros activos en la lista.

---

### US-04: Consulta de Saldos Consolidados y Consignación

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-04` |
| **Épica / Feature** | Épica 2: Cajero & Transacciones / Feature 2.1: Gestión de Fondos |
| **Prioridad** | **Must Have (Alta)** |
| **Estimación** | **3 Story Points** |
| **Sprint** | Sprint 1 (Completada) |

#### Declaración de la Historia
> **Como** cliente autenticado en el cajero,  
> **quiero** visualizar el saldo disponible de todas mis cuentas y consignar dinero en efectivo a mi cuenta de ahorros o corriente,  
> **para** contar con liquidez y verificar el estado financiero de mis productos en tiempo real.

#### Criterios de Aceptación (Given-When-Then)

* **Escenario 1: Visualización clara de saldos al entrar al panel**
  * **Dado que** inicio sesión satisfactoriamente,
  * **Cuando** carga la pantalla principal del cajero,
  * **Entonces** observo tarjetas visuales diferenciadas con el saldo de mi Cuenta de Ahorros, mi Cuenta Corriente y el disponible de mi Tarjeta de Crédito en formato moneda colombiana ($ COP).

* **Escenario 2: Consignación con monto válido**
  * **Dado que** selecciono la opción *"Consignar"* y elijo mi Cuenta de Ahorros,
  * **Cuando** ingreso un valor positivo (ej. $100.000) y confirmo la operación,
  * **Entonces** el saldo de la cuenta se incrementa inmediatamente por dicho valor y se genera un comprobante de transacción exitosa.

* **Escenario 3: Rechazo de valores inválidos o negativos**
  * **Dado que** intento consignar un monto igual a $0 o un número negativo,
  * **Cuando** envío la transacción,
  * **Entonces** el sistema rechaza la operación y me indica que el valor a depositar debe ser mayor a cero.

---

### US-05: Retiros Inteligentes con Reglas Financieras (Interés y Sobregiro)

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-05` |
| **Épica / Feature** | Épica 2: Cajero & Transacciones / Feature 2.2: Retiros |
| **Prioridad** | **Must Have (Alta)** |
| **Estimación** | **8 Story Points** |
| **Sprint** | Sprint 1 (Completada) |

#### Declaración de la Historia
> **Como** cliente con productos financieros diferenciados,  
> **quiero** retirar dinero desde mi Cuenta de Ahorros recibiendo un 1.5% de interés/rendimiento sobre el monto retirado, o retirar desde mi Cuenta Corriente utilizando hasta un 20% de sobregiro autorizado en caso de falta de liquidez,  
> **para** aprovechar las ventajas comerciales y el respaldo financiero de mi banco.

#### Criterios de Aceptación (Given-When-Then)

* **Escenario 1: Retiro de Cuenta de Ahorros con bonificación del 1.5%**
  * **Dado que** tengo un saldo de $1.000.000 en mi Cuenta de Ahorros,
  * **Cuando** retiro $200.000 en efectivo,
  * **Entonces** el sistema me descuenta los $200.000, pero me abona un 1.5% de rendimiento ($3.000), dejando mi saldo final en $803.000 e informando el beneficio en el comprobante.

* **Escenario 2: Retiro de Cuenta Corriente con uso de sobregiro del 20%**
  * **Dado que** tengo un saldo de $1.000.000 en mi Cuenta Corriente (cupo de sobregiro máximo: $200.000 adicionales, total disponible: $1.200.000),
  * **Cuando** solicito un retiro por $1.150.000,
  * **Entonces** la transacción es aprobada, el saldo de la cuenta queda en -$150.000 y el sistema emite una alerta visual notificando el uso de sobregiro bancario.

* **Escenario 3: Retiro denegado por exceder límite de fondos o sobregiro**
  * **Dado que** intento retirar $1.300.000 de la Cuenta Corriente,
  * **Cuando** confirmo la operación,
  * **Entonces** el sistema declina el retiro informando que supera el 20% de sobregiro autorizado.

---

### US-08: Simulación y Compras a Cuotas con Tarjeta de Crédito

| Atributo | Detalle |
| :--- | :--- |
| **Identificador** | `US-08` |
| **Épica / Feature** | Épica 3: Tarjeta de Crédito / Feature 3.1: Financiamiento |
| **Prioridad** | **Must Have (Alta)** |
| **Estimación** | **5 Story Points** |
| **Sprint** | Sprint 1 (Completada) |

#### Declaración de la Historia
> **Como** usuario tarjetahabiente de Mi Plata,  
> **quiero** simular o realizar compras a cuotas seleccionando el plazo en meses (1 a 36),  
> **para** conocer con total transparencia la tasa de interés aplicada, el valor de la cuota mensual fija y el costo financiero total antes de endeudarme.

#### Criterios de Aceptación (Given-When-Then)

* **Escenario 1: Compra a 1 o 2 cuotas con interés 0%**
  * **Dado que** simulo o ejecuto una compra de $500.000 a 2 cuotas,
  * **Cuando** solicito el cálculo,
  * **Entonces** la tasa mensual es 0.0% y el valor de cada cuota es exactamente $250.000 sin sobrecostos.

* **Escenario 2: Compra a mediano plazo (3 a 6 cuotas) con tasa del 1.9%**
  * **Dado que** financio una compra de $1.000.000 a 6 cuotas,
  * **Cuando** el sistema calcula la amortización con la fórmula bancaria estándar:
    $$Cuota = Monto \times \frac{i \times (1+i)^n}{(1+i)^n - 1}$$
  * **Entonces** con $i = 0.019$ y $n = 6$, la cuota mensual calculada es de aproximadamente $177.899 y se muestra la tabla con el total de intereses a pagar.

* **Escenario 3: Compra a largo plazo (7 o más cuotas) con tasa del 2.3%**
  * **Dado que** financio una compra a 12 cuotas,
  * **Cuando** se procesa la transacción,
  * **Entonces** se aplica la tasa de interés de 2.3% mensual y se descuenta el cupo disponible de la tarjeta en el panel de control.
