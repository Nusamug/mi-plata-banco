# Mi Plata - Sistema de Cajero y Gestión Bancaria

Proyecto integrador de software para el Momento 2.  
**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Submódulo:** Metodologías Ágiles para la Programación  
**Docente:** Ing. Jorge Eliécer Hernández S.  

---

## 1. Descripción del Proyecto y Problema Abordado

En el proceso de formación como desarrolladores de software, construir un sistema bancario permite integrar la lógica de negocio, la experiencia de usuario y las buenas prácticas de desarrollo.

**Mi Plata** es un aplicativo que simula las operaciones principales de un cajero automático y la administración interna de usuarios de una entidad financiera:

* **Módulo Web del Cajero (Front-end):** Una interfaz web adaptable (diseñada para computadores, tablets y celulares sin dependencias de frameworks externos). Permite el registro de nuevos clientes, inicio de sesión seguro con bloqueo automático al tercer intento fallido, consulta de saldos en cuentas de ahorro y corriente, retiros con reglas financieras (1.5% de rendimiento por retiro en ahorros y 20% de sobregiro en cuenta corriente) y simulación de compras con tarjeta de crédito amortizadas a cuotas fijas.
* **Módulo Administrativo en Consola (Back-end Java):** Gestión de la vertical de usuarios mediante programación orientada a objetos en Java (clase base `Person` heredada por `User` y `Admin`), con persistencia en memoria (`ArrayList`) para consultar por documento o ID, actualizar datos de contacto, eliminar registros y auditar la cantidad total de clientes.
* **Marco de Trabajo Ágil (Scrum):** Organización iterativa del desarrollo mediante GitHub, aplicando descomposición vertical de historias (slicing), estimación con puntos de historia y versionado estructurado con GitFlow.

---

## 2. Integrantes del Equipo

* **Desarrollador:** Miguel David Rojas González
* **Roles asumidos en el marco Scrum:**
  * **Product Owner & Scrum Master:** Definición del alcance, priorización del Product Backlog, redacción de historias de usuario con criterios de aceptación y seguimiento de ceremonias.
  * **Equipo de Desarrollo:** Maquetación e interactividad web (HTML5, CSS3 y JavaScript POO) y lógica de negocio en Java (POO, encapsulamiento y colecciones).

---

## 3. Documentación Ágil (Entregables para el Docente)

Toda la documentación requerida por el docente se encuentra centralizada dentro del directorio `docs/` para su fácil consulta y revisión:

* [Product Backlog](docs/product-backlog.md): Backlog completo priorizado con la técnica MoSCoW, organizado en Épicas y Features, con estimaciones en Story Points (secuencia Fibonacci) y estrategia de slicing.
* [Historias de Usuario](docs/user-stories.md): Historias redactadas bajo el formato *"Como [rol], quiero [funcionalidad], para [beneficio]"*, detallando criterios de aceptación en formato Given-When-Then y checklist verificable.
* [Sprint Backlog 1](docs/sprints/sprint-01/sprint-backlog.md): Planificación del primer sprint, objetivo acordado (Sprint Goal), historias comprometidas y lista de tareas técnicas divididas por frontend, backend y pruebas.
* [Sprint Review 1](docs/sprints/sprint-01/sprint-review.md): Informe de cierre del Sprint 1, balance de cumplimiento (29 de 29 Story Points completados), demostración de lo entregado y retrospectiva del equipo.
* [Bitácora de Uso de IA](docs/ia-bitacora.md): Registro reflexivo sobre las interacciones con herramientas de Inteligencia Artificial, análisis crítico de los resultados propuestos y guión para la sustentación oral de 2 minutos.

---

## 4. Estructura de Carpetas del Repositorio

El proyecto mantiene una estructura modular, clara y ordenada:

```text
mi-plata-banco/
├── README.md                      # Portada institucional y guía del proyecto
├── .gitignore                     # Exclusiones de Git (archivos temporales, compilados y dependencias)
├── docs/                          # Documentación ágil de la entrega
│   ├── product-backlog.md         # Product Backlog priorizado y estimado
│   ├── user-stories.md            # Historias de usuario detalladas con criterios de aceptación
│   ├── ia-bitacora.md             # Registro de uso crítico de IA (evaluación institucional)
│   └── sprints/
│       └── sprint-01/
│           ├── sprint-backlog.md  # Plan y tareas técnicas del Sprint 1
│           └── sprint-review.md   # Cierre y resultados obtenidos en el Sprint 1
└── src/
    ├── frontend/                  # Código del aplicativo web del cajero
    │   ├── index.html             # Landing page de bienvenida
    │   ├── login.html             # Vistas de login (con bloqueo a 3 intentos) y registro
    │   ├── cajero.html            # Panel interactivo de operaciones bancarias
    │   ├── css/styles.css         # Estilos responsive (Desktop 1920px, Tablet 786px, Móvil 460px)
    │   ├── js/                    # Modelos de POO (Cliente, Cuentas, Tarjeta) y lógica de eventos
    │   └── test_runner.js         # Suite de 26 pruebas automatizadas en Node.js
    └── backend-java/              # Código del módulo administrativo en Java
        └── src/
            ├── models/            # Clases Person, User y Admin con herencia
            ├── services/          # UserService con operaciones CRUD sobre ArrayList
            ├── Main.java          # Menú interactivo por consola (menuUser)
            └── TestRunner.java    # Suite de 5 pruebas automatizadas en Java
```

---

## 5. Tecnologías y Estándares

* **Front-end:** HTML5 semántico, CSS3 adaptable sin frameworks, JavaScript ES6+ con clases, herencia y polimorfismo.
* **Back-end:** Java 17 con programación orientada a objetos, encapsulamiento estricto y manejo de colecciones dinámicas (`ArrayList<User>`).
* **Control de versiones:** Git y GitHub implementando GitFlow (`main`, `develop` y ramas `feat/`) con historial de commits bajo el estándar [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).

---

## 6. Instrucciones de Ejecución y Pruebas

### 6.1 Probar la Aplicación Web (Frontend)
1. Abrir directamente el archivo `src/frontend/index.html` en el navegador (o mediante la extensión Live Server de VS Code).
2. Para acceder al panel del cajero se pueden utilizar las credenciales de prueba existentes:
   * **Usuario:** `carlos.restrepo`
   * **Contraseña:** `1234`
3. También es posible crear un nuevo usuario desde el formulario de registro.
4. **Verificación de seguridad:** Si se ingresa una contraseña incorrecta 3 veces consecutivas, el sistema bloquea automáticamente el acceso y notifica al usuario.
5. **Ejecución de pruebas automatizadas del frontend:**
   ```bash
   node src/frontend/test_runner.js
   ```
   *(Verifica 26 pruebas de herencia, reglas de intereses, sobregiros, cuotas de tarjeta y bloqueo de login).*

### 6.2 Probar la Consola Java (Backend)
1. Abrir una terminal en la carpeta de código Java:
   ```bash
   cd src/backend-java/src
   ```
2. Compilar los archivos del proyecto:
   ```bash
   javac models/*.java services/*.java Main.java TestRunner.java
   ```
3. Ejecutar el menú administrativo:
   ```bash
   java Main
   ```
4. O ejecutar la suite de pruebas unitarias de Java:
   ```bash
   java TestRunner
   ```
