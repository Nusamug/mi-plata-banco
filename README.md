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
* **Módulo Bancario en Consola (Back-end Java + MySQL):** Arquitectura por capas (`models`, `persistence`, `services`, `Main`) conectada a MySQL (`mi_plata_db` en XAMPP mediante JDBC `mysql-connector-j-8.3.0.jar`, con respaldo automático en memoria). Gestiona CRUD completo de usuarios (`Person` $\rightarrow$ `User`, `Admin`), cuentas con herencia y polimorfismo (`Cuenta` $\rightarrow$ `CuentaAhorros`, `CuentaCorriente`), créditos independientes (`Credito`) pagables por transferencia, transferencias atómicas (`commit`/`rollback`) e historial en `transactions`.
* **Marco de Trabajo Ágil (Scrum):** Gestión iterativa documentada con Product Backlog priorizado (MoSCoW), 14 Historias de Usuario bajo criterios INVEST y Given-When-Then, criterios de evaluación, Slicing en Sprints 1 y 2, y versionado con GitFlow y Conventional Commits.

---

## 2. Mapeo del Plan de Estudio – Momento 2 (Front-end & DOM)

| Tema del Plan de Estudio | Implementación en el Proyecto | Archivos de Referencia |
| :--- | :--- | :--- |
| **Tema 7: Estructuras de Datos JS (Arreglos y Métodos)** | Uso de `.push()` al registrar movimientos, `.pop()` para deshacer el último movimiento y revertir saldo, `.shift()` para depurar el registro más antiguo, `.filter()` en el buscador en vivo y `.reduce()` en el cálculo de KPIs de patrimonio y rendimientos. | `src/frontend/js/models/Cuenta.js`<br>`src/frontend/js/cajero.js` |
| **Tema 8: Programación Orientada a Objetos (POO)** | Clases ES6, encapsulamiento con getters/setters, herencia (`extends` y `super`) desde la clase abstracta `Cuenta` hacia `CuentaAhorros`, `CuentaCorriente` y `TarjetaCredito`, y polimorfismo en `calcularRetiro()`. | `src/frontend/js/models/Cuenta.js`<br>`CuentaAhorros.js` · `CuentaCorriente.js` · `TarjetaCredito.js` · `Cliente.js` |
| **Temas 9, 10 y 11: DOM en JavaScript y Eventos** | Selección con `document.getElementById`, `querySelector`, `querySelectorAll`; renderizado dinámico de tarjetas, tabla de historial y voucher térmico; manejo de eventos `submit` (`e.preventDefault()`), `click`, `input` y `change`. | `src/frontend/js/cajero.js`<br>`src/frontend/js/auth.js`<br>`src/frontend/js/landing.js` |
| **Tema 12: Evidencias del Momento 2** | **Conocimiento:** sustentación teórica de DOM, POO y arreglos.<br>**Desempeño:** flujo transaccional completo en vivo.<br>**Producto:** aplicativo responsive en 3 resoluciones + **42 pruebas** en Front-end y **11 pruebas** en Back-end Java/MySQL. | `src/frontend/test_runner.js`<br>`src/backend-java/src/TestRunner.java` |

---

## 3. Documentación Ágil y Evaluación (Entregables en `docs/`)

* [Product Backlog](docs/product-backlog.md): Backlog priorizado con MoSCoW, organizado en 4 Épicas, Features y 14 Historias de Usuario (`70 SP`) estimadas con Fibonacci.
* [Historias de Usuario](docs/user-stories.md): 14 Historias (`US-01` a `US-14`) bajo formato oficial, criterios Given-When-Then y checklists verificables.
* [Criterios de Evaluación](docs/criterios-evaluacion.md): Matriz de evaluación (Conocimiento, Desempeño y Producto), rúbrica técnica Java/MySQL y Definition of Done (DoD).
* [Sprint 1 (Front-end & Onboarding)](docs/sprints/sprint-01/sprint-backlog.md) · [Sprint Review 1](docs/sprints/sprint-01/sprint-review.md)
* [Sprint 2 (Back-end Java + MySQL)](docs/sprints/sprint-02/sprint-backlog.md) · [Sprint Review 2](docs/sprints/sprint-02/sprint-review.md)
* [Bitácora de Uso de IA](docs/ia-bitacora.md): Registro reflexivo sobre el uso crítico de IA generativa y guión de sustentación.

---

## 4. Estructura del Repositorio

```text
mi-plata-banco/
├── README.md                      # Portada institucional, mapeo académico y guía de uso
├── .gitignore                     # Exclusiones de Git
├── docs/                          # Documentación ágil Scrum, historias y criterios
│   ├── product-backlog.md         # Product Backlog priorizado (US-01 a US-14)
│   ├── user-stories.md            # Historias de usuario detalladas (Given-When-Then)
│   ├── criterios-evaluacion.md    # Criterios de evaluación (Conocimiento, Desempeño, Producto)
│   ├── ia-bitacora.md             # Bitácora reflexiva de uso de IA
│   └── sprints/                   # Sprint 1 y Sprint 2 (Backlog y Review)
└── src/
    ├── frontend/                  # Aplicativo web del Cajero Digital "Mi Plata"
    │   ├── index.html             # Landing page institucional y simulador de cuotas
    │   ├── login.html             # Portal de acceso (bloqueo 3 intentos) y registro
    │   ├── cajero.html            # Panel transaccional, KPIs, Bre-B, estudios y recibo térmico
    │   ├── css/styles.css         # Estilos responsive (1920px, 786px, 460px) y @media print
    │   ├── js/                    # Modelos POO, StorageService y controladores del DOM
    │   └── test_runner.js         # Suite de 42 pruebas automatizadas en Node.js
    └── backend-java/              # Back-end Java + MySQL (XAMPP)
        ├── lib/                   # Conector JDBC mysql-connector-j-8.3.0.jar
        ├── schema_mi_plata.sql    # Esquema MySQL mi_plata_db y datos semilla
        └── src/                   # Modelos POO, Mappers, Repositorios, Servicios, Main y TestRunner
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

3. **Ejecución de la suite de 42 pruebas unitarias del Front-end:**
   ```bash
   node src/frontend/test_runner.js
   ```

### 5.2 Probar el Back-end Bancario (Java + MySQL en XAMPP)
1. Iniciar **MySQL** en XAMPP e importar `src/backend-java/schema_mi_plata.sql` (crea `mi_plata_db` con datos iniciales). Si MySQL no está activo, la aplicación cambia automáticamente al modo de respaldo en memoria.
2. Compilar y ejecutar desde `src/backend-java`:
```powershell
cmd /c "mkdir bin 2>nul & dir /s /b src\*.java > sources.txt && javac -encoding UTF-8 -cp .;lib\mysql-connector-j-8.3.0.jar -d bin @sources.txt && del sources.txt"
java -cp "bin;lib\mysql-connector-j-8.3.0.jar" Main
# O para correr las 11 pruebas integrales contra MySQL:
java -cp "bin;lib\mysql-connector-j-8.3.0.jar" TestRunner
```
