# 🏦 Mi Plata – Sistema Bancario & Cajero Automático

> **Proyecto Integrador de Software**  
> **Institución:** CESDE · Medellín, Colombia  
> **Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
> **Momento:** Momento 2  

---

## 🌟 ¿Qué es "Mi Plata"?

**Mi Plata** es una solución bancaria digital desarrollada para ofrecer una experiencia sencilla, transparente y segura tanto para los usuarios que gestionan su dinero como para los administradores del banco.

El proyecto simula el ecosistema completo de una entidad financiera moderna:
- **Portal Web y Cajero Automático (Front-end):** Una interfaz web completamente adaptable (responsive para computador, tablet y celular) donde los clientes pueden registrarse, consultar sus saldos en cuentas de ahorros y corrientes, realizar transferencias y simular pagos con tarjeta de crédito a cuotas.
- **Lógica de Negocio y Gestión de Clientes (Back-end Java):** Arquitectura orientada a objetos con control estricto de usuarios, encapsulamiento, colecciones dinámicas y operaciones CRUD por consola.
- **Marco de Trabajo Ágil (Scrum):** Gestión iterativa e incremental del proyecto utilizando Scrum, versionado continuo con GitHub y GitFlow, descomposición vertical de historias (slicing) y adopción crítica y justificada de herramientas de IA.

---

## 👥 Equipo de Trabajo & Roles Scrum

| Rol Scrum | Integrante | Responsabilidad Principal |
| :--- | :--- | :--- |
| **Product Owner** | Equipo Mi Plata | Definición de la visión del producto, priorización del backlog y criterios de aceptación. |
| **Scrum Master** | Equipo Mi Plata | Facilitación de ceremonias, remoción de impedimentos y cumplimiento de los artefactos ágiles en GitHub. |
| **Frontend Developer** | Equipo Mi Plata | Maquetación web responsive (1920px, 786px, 460px), POO en JavaScript y reglas financieras en el cliente. |
| **Backend Developer** | Equipo Mi Plata | Arquitectura de clases Java, vertical de usuario (CRUD sobre `ArrayList`), menú interactivo y GitFlow. |

---

## 📚 Documentación Ágil (Acceso Rápido para el Docente)

Para facilitar la revisión y consulta de los entregables solicitados en clase, organizamos la documentación en los siguientes enlaces directos:

* 📋 **[Product Backlog Priorizado](docs/product-backlog.md):** Épicas, features, historias de usuario desglosadas con técnicas de slicing y estimación en Story Points.
* 📖 **[Historias de Usuario Detalladas](docs/user-stories.md):** Fichas completas de cada historia con formato `"Como... quiero... para..."`, criterios de aceptación claros y condiciones de satisfacción.
* 🏃‍♂️ **[Sprint 1: Sprint Backlog](docs/sprints/sprint-01/sprint-backlog.md):** Objetivo del primer sprint (Sprint Goal), historias seleccionadas y descomposición en tareas técnicas (Frontend, Backend, Pruebas y Docs).
* 🏁 **[Sprint 1: Sprint Review](docs/sprints/sprint-01/sprint-review.md):** Cierre del Sprint 1, balance de lo entregado, métricas alcanzadas y evidencias de funcionamiento.
* 🤖 **[Bitácora de Uso Reflexivo de IA](docs/ia-bitacora.md):** Registro de prompts utilizados, análisis crítico de las respuestas generadas y adaptaciones realizadas para la sustentación oral de 2 minutos.

---

## 📁 Estructura del Repositorio

Siguiendo las directrices del manual de Scrum + GitHub, el repositorio mantiene una estructura modular y limpia:

```text
mi-plata-banco/
├── README.md                      <- Portada principal: visión, equipo, navegación y ejecución
├── .gitignore                     <- Exclusiones de Git (node_modules, .class, .idea, etc.)
│
├── docs/                          <- Artefactos de gestión ágil y arquitectura
│   ├── product-backlog.md         <- Backlog general ordenado por valor de negocio
│   ├── user-stories.md            <- Historias con criterios de aceptación (Given-When-Then / Checklist)
│   ├── ia-bitacora.md             <- Registro reflexivo del uso de IA para sustentación
│   ├── PLAN_MAESTRO_ENTREGA.md    <- Guía integradora de las 3 materias (Front, Back y Scrum)
│   ├── frontend/                  <- Documentación técnica de arquitectura frontend
│   ├── backend/                   <- Documentación técnica y diagramas UML de backend
│   └── sprints/
│       └── sprint-01/
│           ├── sprint-backlog.md  <- Planificación y tareas del Sprint 1
│           └── sprint-review.md   <- Revisión y resultados del Sprint 1
│
└── src/                           <- Código fuente funcional
    ├── frontend/                  <- Aplicación Web del Cajero (HTML5, CSS3, JS POO)
    │   ├── index.html             <- Portada y bienvenida
    │   ├── login.html             <- Inicio de sesión y registro (bloqueo tras 3 intentos)
    │   ├── cajero.html            <- Panel de operaciones bancarias y tarjeta de crédito
    │   ├── css/styles.css         <- Estilos adaptables (1920px, 786px y 460px)
    │   ├── js/models/             <- Modelos POO (Cliente, CuentaAhorros, CuentaCorriente, TarjetaCredito)
    │   └── test_runner.js         <- Suite de 26 pruebas automatizadas de Front-end
    │
    └── backend-java/              <- Aplicación de Consola en Java (Lógica y CRUD)
        └── src/
            ├── models/            <- Clases Person, User, Admin
            ├── services/          <- UserService con operaciones sobre ArrayList
            ├── Main.java          <- Menú interactivo por consola (menuUser)
            └── TestRunner.java    <- Suite de 5 pruebas automatizadas de Back-end
```

---

## 🛠️ Tecnologías y Estándares Aplicados

- **Front-end:** HTML5 semántico, CSS3 moderno (Mobile-First, Flexbox y Grid sin frameworks pesados), JavaScript Vanilla ES6+ con Clases, Herencia y Polimorfismo.
- **Back-end:** Java SE 17, Principios SOLID, encapsulamiento estricto, estructuras de datos en memoria (`ArrayList`).
- **Control de Versiones & Calidad:** GitFlow (`main` estable, `develop` integrador, ramas temáticas `feat/`), commits bajo el estándar [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).
- **Marco de Trabajo:** Scrum con ciclos de entrega cortos y foco en valor real para el usuario.

---

## 🚀 ¿Cómo Ejecutar y Probar el Proyecto?

### 1. Aplicación Web (Frontend)
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Nusamug/mi-plata-banco.git
   ```
2. Abre el archivo `src/frontend/index.html` directamente en tu navegador favorito (o usando la extensión *Live Server* de VS Code).
3. **Credenciales de prueba inmediatas:**
   - **Usuario:** `carlos.restrepo`
   - **Contraseña:** `1234`
4. **Prueba de seguridad:** Intenta ingresar con contraseña errónea 3 veces seguidas para observar el bloqueo automático y el contador visual de intentos.
5. **Ejecutar pruebas del frontend (Node.js):**
   ```bash
   node src/frontend/test_runner.js
   ```
   *(Valida 26 pruebas: intereses de ahorro 1.5%, sobregiro 20%, amortización de tarjeta y bloqueo de seguridad).*

### 2. Módulo de Consola (Backend Java)
1. Dirígete a la carpeta del backend:
   ```bash
   cd src/backend-java/src
   ```
2. Compila el código fuente:
   ```bash
   javac models/*.java services/*.java Main.java TestRunner.java
   ```
3. Ejecuta el menú interactivo:
   ```bash
   java Main
   ```
4. O ejecuta la suite de pruebas automatizadas:
   ```bash
   java TestRunner
   ```

---

## 🌿 Flujo de Ramas (GitFlow)

En cumplimiento con los requerimientos técnicos:
* `main`: Rama de producción estable. Contiene las versiones terminadas y aprobadas de cada Sprint.
* `develop`: Rama de integración donde convergen los desarrollos de Frontend, Backend y Documentación.
* `feat/...`: Ramas de trabajo independientes por cada historia de usuario o tarea técnica (ej: `feat/hu03-user-crud`).
