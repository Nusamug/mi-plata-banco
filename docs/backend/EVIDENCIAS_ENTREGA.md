# Evidencia de Desempeño: Back-end Java (Momento 2)

**Institución:** CESDE – Formación Técnica y Tecnológica  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Submódulo:** Back-end (Programación Orientada a Objetos en Java)  
**Docente:** Bernardo Alonso Mira García  
**Proyecto:** Sistema Bancario "Mi Plata" (Proyecto Integrador)  
**Momento Evaluativo:** Momento 2 – POO, Herencia, Colecciones en Memoria y GitFlow  

---

## 1. Enlace al Repositorio Oficial en GitHub

* **Repositorio:** [https://github.com/Nusamug/mi-plata-banco](https://github.com/Nusamug/mi-plata-banco)
* **Rama Principal de Desarrollo (Default):** [`develop`](https://github.com/Nusamug/mi-plata-banco/tree/develop)
* **Rama de Funcionalidad (Historia de Usuario):** [`feat/hu03-user-crud`](https://github.com/Nusamug/mi-plata-banco/tree/feat/hu03-user-crud)
* **Carpeta de Código Java:** [`src/backend-java/src`](https://github.com/Nusamug/mi-plata-banco/tree/develop/src/backend-java/src)

---

## 2. Resumen Técnico de la Solución

### 2.1 Flujo Profesional GitFlow
* **Cero commits directos a `main`:** La rama `main` se mantiene intacta como versión de entrega estable.
* **Integración en `develop`:** Todo el desarrollo converge en la rama `develop`.
* **Ramas por Historia de Usuario:** Se creó la rama secundaria `feat/hu03-user-crud` derivada de `develop`, en la cual se registraron commits atómicos bajo la convención **Conventional Commits**:
  * `feat(backend): implement Person, User and Admin domain models with OOP inheritance`
  * `feat(backend): implement UserService with ArrayList CRUD operations (selectUserById, updateUser, deleteUser, countUsers)`
  * `feat(backend): add interactive menuUser console interface and automated test runner`
* **Merge estructurado:** Se integró la rama a `develop` mediante `--no-ff` (`merge(backend): integrate feat/hu03-user-crud into develop`), conservando el historial gráfico en GitHub.

### 2.2 Arquitectura y Programación Orientada a Objetos (POO)
* **Superclase `Person`:** Modela atributos base (`id`, `name`, `lastName`, `email`, `phone`, `password`, `state`) con encapsulamiento estricto (`private`, getters y setters).
* **Herencia (`extends`):**
  * `User`: Extiende de `Person` y añade atributos específicos del cliente bancario (`city`, `preferences`).
  * `Admin`: Extiende de `Person` y añade atributos administrativos (`rol`, `area`).
* **Persistencia en memoria:** Implementada en la clase `UserService` mediante la colección genérica tipada `ArrayList<User>`.
* **Interfaz de Consola:** Menú interactivo `menuUser()` en `Main.java` con control de excepciones y validaciones de entrada vía `Scanner`.

---

## 3. Evidencias del Flujo Git y GitHub

### 3.1 Historial de Commits en `develop` y Rama `feat/hu03-user-crud`
*(Inserta aquí la captura del historial de commits de GitHub mostrando los commits convencionales y el merge)*

```text
[ PEGAR AQUÍ CAPTURA DEL HISTORIAL DE COMMITS DE GITHUB ]
```

### 3.2 Listado de Ramas en GitHub
*(Inserta aquí la captura de la pestaña "Branches" de GitHub donde se evidencian las ramas `develop`, `feat/hu03-user-crud` y `main`)*

```text
[ PEGAR AQUÍ CAPTURA DE LA PESTAÑA BRANCHES DE GITHUB ]
```

---

## 4. Evidencias de la Implementación del Código Fuente

### 4.1 Clases de Dominio y Herencia (`Person`, `User`, `Admin`)
* **Ubicación:** `src/backend-java/src/models/`
* **Puntos evaluados:** Uso de palabra clave `extends`, llamada a constructor padre con `super(...)`, modificadores de acceso privados y métodos accesores.

```text
[ PEGAR AQUÍ CAPTURA DEL CÓDIGO DE Person.java, User.java Y Admin.java EN EL IDE ]
```

### 4.2 Servicio de Negocio y CRUD (`UserService.java`)
* **Ubicación:** `src/backend-java/src/services/UserService.java`
* **Puntos evaluados:** Colección `ArrayList<User>` y los métodos de la vertical:
  * `selectUserById(int id)`: Búsqueda lineal por identificador.
  * `updateUser(int id, User updatedData)`: Modificación de atributos en memoria.
  * `deleteUser(int id)`: Eliminación física en el `ArrayList`.
  * `countUsers()`: Consulta del total de registros en la lista.

```text
[ PEGAR AQUÍ CAPTURA DEL CÓDIGO DE UserService.java EN EL IDE ]
```

### 4.3 Menú Interactivo de Consola (`Main.java`)
* **Ubicación:** `src/backend-java/src/Main.java`
* **Puntos evaluados:** Implementación del método interactivo `menuUser()` con bucle `do-while`, estructura `switch-case` y lectura protegida contra errores.

```text
[ PEGAR AQUÍ CAPTURA DEL CÓDIGO DE Main.java (menuUser) EN EL IDE ]
```

---

## 5. Evidencias de la Ejecución en Consola (Pruebas de Métodos)

### 5.1 Menú Principal y Listado General (`selectAllUsers`)
Muestra la presentación del menú `menuUser()` y la lista tabular de los usuarios precargados en memoria.

```text
[ PEGAR AQUÍ CAPTURA DE CONSOLA: OPCIÓN 3 - LISTADO GENERAL ]
```

### 5.2 Consulta de Usuario por ID (`selectUserById`)
Búsqueda exitosa de un usuario existente mediante su ID numérico (ej: ID `101`).

```text
[ PEGAR AQUÍ CAPTURA DE CONSOLA: OPCIÓN 2 - BÚSQUEDA POR ID ]
```

### 5.3 Registro de Nuevo Usuario (`createUser`)
Inserción en el `ArrayList` de un nuevo cliente con todos sus datos bancarios y personales.

```text
[ PEGAR AQUÍ CAPTURA DE CONSOLA: OPCIÓN 1 - REGISTRAR USUARIO ]
```

### 5.4 Actualización de Datos (`updateUser`)
Modificación de teléfono, ciudad y preferencias de un usuario existente sin alterar su identidad.

```text
[ PEGAR AQUÍ CAPTURA DE CONSOLA: OPCIÓN 4 - ACTUALIZAR USUARIO ]
```

### 5.5 Eliminación de Usuario (`deleteUser`)
Eliminación física del registro del `ArrayList` tras confirmación explícita del usuario (`S/N`).

```text
[ PEGAR AQUÍ CAPTURA DE CONSOLA: OPCIÓN 5 - ELIMINAR USUARIO ]
```

### 5.6 Conteo Total de Usuarios (`countUsers`)
Reporte dinámico del número total de usuarios registrados en el `ArrayList`, diferenciando activos e inactivos.

```text
[ PEGAR AQUÍ CAPTURA DE CONSOLA: OPCIÓN 6 - CONTEO DE USUARIOS ]
```

### 5.7 Suite Automatizada de Pruebas Unitarias (`TestRunner.java`)
Ejecución del verificador de métodos demostrando 5/5 pruebas superadas exitosamente.

```text
[ PEGAR AQUÍ CAPTURA DE CONSOLA: EJECUCIÓN DE TestRunner (5/5 OK) ]
```

---

## 6. Ficha de Sustentación Oral (Preparación para Preguntas del Docente)

| Pregunta Típica del Profesor | Respuesta Clave para la Sustentación |
| :--- | :--- |
| **¿Por qué utilizó herencia y no una sola clase?** | Porque aplicamos el principio de reutilización y especialización de POO: `Person` contiene los datos comunes a cualquier ser humano (identificación, nombre, correo, clave), mientras que `User` y `Admin` especializan el dominio con atributos propios del negocio bancario (`city`, `preferences` para clientes; `rol`, `area` para administradores). |
| **¿Cómo garantizó el encapsulamiento?** | Todos los atributos de las entidades están declarados como `private`. El acceso y modificación se realiza exclusivamente a través de métodos accesores `getters` y `setters`, garantizando que ninguna clase externa modifique el estado interno de forma descontrolada. |
| **¿Por qué `ArrayList` y no un arreglo tradicional `User[]`?** | Un arreglo estático tiene tamaño fijo que requeriría redimensionamiento manual. `ArrayList` es una colección genérica y dinámica de la API de Colecciones de Java que gestiona memoria eficientemente y ofrece operaciones nativas (`add`, `remove`, `size`, `get`). |
| **¿Cómo se respetó el flujo GitFlow?** | Nunca se comiteó directamente a `main`. Se creó la rama `feat/hu03-user-crud` desde `develop`, se realizaron commits atómicos con Conventional Commits por cada componente y luego se realizó un merge con `--no-ff` a `develop` para preservar la trazabilidad gráfica en GitHub. |
