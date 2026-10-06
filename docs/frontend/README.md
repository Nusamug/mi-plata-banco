# Requerimientos y Documentación: Front-end I

**Institución:** CESDE  
**Programa:** Desarrollo de Software  
**Docente:** Jorge Albeiro Muriel Vélez  
**Herramientas:** JavaScript nativo (ES6+), HTML5, CSS3, DOM  
**Momento evaluativo:** Momento 2 (POO, DOM, Estructuras de datos)

---

## 1. Opciones del Proyecto
El docente permite elegir entre:
1. **Sistema Bancario / Cajero Automático ("Mi Plata")** *(Guía detallada de 9 páginas suministrada)*.
2. **Carrito de Compras** *(Alternativa opcional)*.

---

## 2. Requerimientos Técnicos y Arquitectura (Sistema Bancario "Mi Plata")

### 2.1 Paradigma Obligatorio: Programación Orientada a Objetos (POO)
- **Abstracción:** Modelar entidades como `Cliente`, `Cuenta`, etc.
- **Encapsulamiento:** Proteger atributos internos mediante modificadores/convenciones de acceso.
- **Herencia:** Jerarquía entre `Cuenta` (clase base) y sus derivadas: `CuentaAhorros`, `CuentaCorriente`, `TarjetaCredito`.
- **Polimorfismo:** Métodos que cambien de comportamiento según la cuenta (ej. `calcularRetiro()` o `aplicarInteres()`).

### 2.2 Diseño y Maquetación (Criterios de Interfaz)
- **Diseño Responsivo Obligatorio:**
  - Desktop / Laptop: 1920px
  - Tablet: 786px
  - Smartphone: 460px
- **Flujo de navegación:** Inicio (Landing) → Registro/Login → Panel de transacciones (Cajero).
- **Identidad visual bancaria:** Paleta de colores coherente, tipografía corporativa y mensajes claros (éxito, advertencia, error).
- **Entregables de maquetación en GitHub:**
  - Maqueta/Wireframes del proyecto.
  - Diagrama de clases UML.
  - Roles del equipo.
  - Historias de usuario.

---

## 3. Reglas de Negocio y Modelado de Cuentas

### 3.1 Cuenta de Ahorros
- Consignación y retiro.
- **Rendimientos:** Genera 1.5% mensual aplicado al momento del retiro.
- **Restricción:** El retiro no puede exceder el saldo disponible.

### 3.2 Cuenta Corriente
- Diseñada para transacciones frecuentes.
- No genera intereses.
- **Sobregiro permitido:** Hasta 20% adicional sobre el saldo actual (Ej: con $1.000.000 puede retirar hasta $1.200.000).

### 3.3 Tarjeta de Crédito
- Asignación de cupo de crédito; las compras generan deuda a cuotas.
- **Tabla de intereses mensuales:**
  - $\le 2$ cuotas: 0% de interés.
  - $3 - 6$ cuotas: 1.9% mensual.
  - $\ge 7$ cuotas: 2.3% mensual.
- **Fórmula de cuota mensual:**
  $$\text{Cuota mensual} = \frac{\text{Capital} \times \text{tasa}}{1 - (1 + \text{tasa})^{-n}}$$
  *(donde tasa es mensual decimal y $n$ es el número de cuotas)*.

---

## 4. Módulos Funcionales

### 4.1 Registro y Autenticación
- **Registro:** Documento (cédula/pasaporte), nombre completo, celular, nombre de usuario (único), contraseña y confirmación.
- **Login:**
  - Validación contra registros.
  - **Seguridad:** Máximo 3 intentos fallidos. Al 3er intento la cuenta se bloquea con aviso informativo.
  - Contador visible de intentos restantes.
- **CRUD de Usuarios:** Agregar, editar datos y eliminar con confirmación.

### 4.2 Interfaz Principal
- **Landing Page:** Menú con Login y Registro, presentación institucional, identidad bancaria y footer corporativo.
- **Vistas Login / Registro:** Coherencia de diseño con la landing.

### 4.3 Panel de Transacciones (Cajero)
- **Consultar saldo.**
- **Consignar:** Validación de número positivo $> 0$.
- **Retirar:** Con validaciones de saldo, sobregiro (20% en corriente) o interés (1.5% en ahorros).
- **Transferir:** Entre diferentes cuentas del mismo usuario o a otros usuarios (no permite transferir a la misma cuenta de origen).
- **Historial de Movimientos:** Uso de Array/Lista (`fecha`, `hora`, `tipo: retiro/consignación/transferencia`, `valor`), mostrado en orden cronológico descendente.
- **Perfil y Seguridad:** Edición de datos personales y cambio de contraseña (clave actual → clave nueva → confirmar).

---

## 5. Rúbrica de Evaluación (Front-end)
| Componente | Porcentaje | Evidencia |
| :--- | :--- | :--- |
| **POO (Herencia y polimorfismo)** | 30% | Desempeño |
| **Módulo de autenticación y seguridad** | 10% | Producto |
| **Módulo de transacciones y reglas de negocio** | 30% | Producto |
| **Diseño de interfaz y experiencia de usuario (UI/UX)** | 30% | Producto |
- **Aprobación mínima:** 3.0 / 5.0
