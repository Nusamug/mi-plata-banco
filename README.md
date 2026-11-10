# Mi Plata - Sistema de Cajero Automático y Gestión Bancaria

Proyecto integrador de software para el **Momento 2**.  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Submódulos Integrados:** Front-end I (JS, POO & DOM) · Back-end (Java POO) · Metodologías Ágiles (Scrum)  
**Docentes:** Jorge Albeiro Muriel Vélez / Ing. Jorge Eliécer Hernández S.  
**Desarrollador:** Miguel David Rojas González  

---

## 1. Descripción del Proyecto y Problema Abordado

**Mi Plata** es una solución bancaria integral que simula la experiencia completa de un cajero automático moderno y la administración interna de usuarios de una entidad financiera colombiana:

* **Módulo Web del Cajero (Front-end Nativo):** Interfaz web adaptable (1920px Desktop, 786px Tablet y 460px Smartphone, construida 100% con HTML5, CSS3 y JavaScript ES6+ sin frameworks externos). Incluye:
  * **Onboarding Bancario Realista:** Registro con apertura inmediata de Cuenta de Ahorros (`401-XXXXXXX-X`) con bono de bienvenida de $100.000 COP, y **estudio financiero en línea** para solicitar Cuenta Corriente (`201-XXXXXXX-X`) y Tarjeta de Crédito Visa (`4509 XXXX XXXX XXXX`).
  * **Seguridad de Acceso:** Inicio de sesión con contador visible y **bloqueo automático al 3er intento fallido**.
  * **Operaciones con Reglas de Negocio:** Consignaciones con chips rápidos, retiros con **1.5% de rendimiento** en Ahorros o **20% de sobregiro** en Corriente (con previsualizador matemático en vivo), transferencias inmediatas mediante **Llave Bre-B** (Celular, Cédula o Cuenta), y compras/pagos con Tarjeta de Crédito diferidas de 1 a 36 cuotas mediante **fórmula de amortización francesa**.
  * **Comprobante Digital Térmico y Sonido ATM:** Emisión de recibo bancario imprimible (`@media print`) con número de aprobación y efectos sonoros nativos (Web Audio API).
  * **Dashboard de KPIs y Auditoría de Arreglos:** Resumen patrimonial calculado con `.filter()` y `.reduce()`, buscador en tiempo real y controles interactivos de estructuras de datos (`.pop()` y `.shift()`).
* **Módulo Administrativo en Consola (Back-end Java):** Gestión de la vertical de usuarios mediante POO en Java (`Person` $\rightarrow$ `User`, `Admin`), con persistencia en memoria (`ArrayList<User>`) para consultar por ID, actualizar datos, eliminar registros y auditar el total de clientes.
* **Marco de Trabajo Ágil (Scrum):** Gestión iterativa documentada con Product Backlog priorizado (MoSCoW), 10 Historias de Usuario bajo criterios INVEST y Given-When-Then, Slicing vertical y versionado con GitFlow y Conventional Commits.

---

## 2. Mapeo del Plan de Estudio – Momento 2 (Front-end & DOM)

| Tema del Plan de Estudio | Implementación en el Proyecto | Archivos de Referencia |
| :--- | :--- | :--- |
| **Tema 7: Estructuras de Datos JS (Arreglos y Métodos)** | Uso de `.push()` al registrar movimientos, `.pop()` para deshacer el último movimiento y revertir saldo, `.shift()` para depurar el registro más antiguo, `.filter()` en el buscador en vivo y `.reduce()` en el cálculo de KPIs de patrimonio y rendimientos. | `src/frontend/js/models/Cuenta.js`<br>`src/frontend/js/cajero.js` |
| **Tema 8: Programación Orientada a Objetos (POO)** | Clases ES6, encapsulamiento con getters/setters, herencia (`extends` y `super`) desde la clase abstracta `Cuenta` hacia `CuentaAhorros`, `CuentaCorriente` y `TarjetaCredito`, y polimorfismo en `calcularRetiro()`. | `src/frontend/js/models/Cuenta.js`<br>`CuentaAhorros.js` · `CuentaCorriente.js` · `TarjetaCredito.js` · `Cliente.js` |
| **Temas 9, 10 y 11: DOM en JavaScript y Eventos** | Selección con `document.getElementById`, `querySelector`, `querySelectorAll`; renderizado dinámico de tarjetas, tabla de historial y voucher térmico; manejo de eventos `submit` (`e.preventDefault()`), `click`, `input` y `change`. | `src/frontend/js/cajero.js`<br>`src/frontend/js/auth.js`<br>`src/frontend/js/landing.js` |
| **Tema 12: Evidencias del Momento 2** | **Conocimiento:** sustentación teórica de DOM, POO y arreglos.<br>**Desempeño:** flujo transaccional completo en vivo.<br>**Producto:** aplicativo responsive en 3 resoluciones + suite de **36 pruebas unitarias aprobadas**. | `src/frontend/test_runner.js`<br>`src/frontend/css/styles.css` |

---

## 3. Documentación Ágil (Entregables en `docs/`)

* [Product Backlog](docs/product-backlog.md): Backlog priorizado con MoSCoW, organizado en Épicas, Features y 10 Historias de Usuario estimadas con Fibonacci.
* [Historias de Usuario](docs/user-stories.md): 10 Historias (`US-01` a `US-10`) bajo formato oficial, criterios Given-When-Then y checklists verificables.
* [Sprint Backlog 1](docs/sprints/sprint-01/sprint-backlog.md): Planificación del Sprint, Sprint Goal y desglose de tareas técnicas (Slicing).
* [Sprint Review 1](docs/sprints/sprint-01/sprint-review.md): Cierre del Sprint, métricas de velocidad, demostración del incremento y retrospectiva.
* [Bitácora de Uso de IA](docs/ia-bitacora.md): Registro reflexivo sobre el uso crítico de IA generativa y guión de sustentación.

---

## 4. Estructura del Repositorio

```text
mi-plata-banco/
├── README.md                      # Portada institucional, mapeo académico y guía de uso
├── .gitignore                     # Exclusiones de Git
├── docs/                          # Documentación ágil Scrum e historias de usuario
│   ├── product-backlog.md         # Product Backlog priorizado (US-01 a US-10)
│   ├── user-stories.md            # Historias de usuario detalladas (Given-When-Then)
│   ├── ia-bitacora.md             # Bitácora reflexiva de uso de IA
│   └── sprints/sprint-01/         # Sprint Backlog y Sprint Review
└── src/
    ├── frontend/                  # Aplicativo web del Cajero Digital "Mi Plata"
    │   ├── index.html             # Landing page institucional y simulador de cuotas
    │   ├── login.html             # Portal de acceso (bloqueo 3 intentos) y registro
    │   ├── cajero.html            # Panel transaccional, KPIs, Bre-B, estudios y recibo térmico
    │   ├── css/styles.css         # Estilos responsive (1920px, 786px, 460px) y @media print
    │   ├── js/                    # Modelos POO, StorageService y controladores del DOM
    │   └── test_runner.js         # Suite de 36 pruebas automatizadas en Node.js
    └── backend-java/              # Módulo administrativo en consola Java
        └── src/                   # Clases Person, User, Admin, UserService, Main y TestRunner
```

---

## 5. Instrucciones de Ejecución y Cuentas Demo

### 5.1 Probar la Aplicación Web (Front-end)
1. Abrir `src/frontend/index.html` o `src/frontend/login.html` en cualquier navegador web moderno (o con *Live Server* en VS Code).
2. En la pantalla de login dispones de **botones de autorelleno de 1 clic** para dos perfiles de prueba complementarios:

| Perfil de Prueba | Usuario | Contraseña | Celular (Llave Bre-B) | Documento | Características para Sustentación |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **1. Carlos Alberto Morales** | `carlos99` | `Pass123!` | `3104567890` | `1020304050` | Portafolio completo activo: Ahorros (`401-8392104-2`), Corriente (`201-5120491-0`) y Visa Gold (`4509 8120 3491 5521`). |
| **2. María Fernanda Ospina** | `mafe_ospina` | `Banco2026*` | `3209876543` | `987654321` | Inicia solo con Cuenta de Ahorros (`401-9900112-5`). Ideal para recibir transferencias Bre-B y demostrar en vivo el **Estudio Crediticio**. |

3. **Ejecución de la suite de 36 pruebas unitarias del Front-end:**
   ```bash
   node src/frontend/test_runner.js
   ```

### 5.2 Probar la Consola Administrativa (Back-end Java)
```bash
cd src/backend-java/src
javac models/*.java services/*.java Main.java TestRunner.java
java Main
# O para correr las pruebas automatizadas en Java:
java TestRunner
```
