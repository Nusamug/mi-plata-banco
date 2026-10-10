# Bitácora de Uso Reflexivo de Inteligencia Artificial

**Institución:** CESDE – Medellín  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Submódulo:** Metodologías Ágiles para la Programación  
**Docente:** Ing. Jorge Eliécer Hernández S.  
**Estudiante:** Miguel David Rojas González  
**Competencia Evaluada:** Competencia Institucional en IA – Nivel II (Uso Crítico y Juicio Propio)  

---

## 1. Justificación del Uso de IA en el Proyecto

Durante la planificación y documentación del proyecto **"Mi Plata"**, se utilizó Inteligencia Artificial generativa como una herramienta de apoyo para lluvia de ideas y generación de borradores iniciales. 

Tal como se acordó en clase, ninguna propuesta de la IA fue adoptada de forma literal. Todo el contenido generado pasó por un proceso de revisión, filtro y ajuste técnico para garantizar que respondiera a los requerimientos reales del proyecto integrador (Front-end en JavaScript, Back-end en Java y marco Scrum).

---

## 2. Registro de Prompts, Respuestas y Ajustes Críticos

### Caso 1: Lluvia de ideas y definición de épicas
* **Herramienta:** Asistente LLM (ChatGPT / Gemini).
* **Prompt utilizado:**
  > *"Actúa como Product Owner de un banco digital. Necesito un desglose de épicas y funcionalidades para un proyecto escolar que incluye un cajero web y administración de usuarios por consola."*
* **Propuesta inicial de la IA:**
  La IA propuso más de 12 épicas propias de una entidad bancaria comercial avanzada: solicitud de hipotecas, transferencias internacionales vía código SWIFT, pagos de nómina corporativa y autenticación biométrica.
* **Criterio propio y ajustes aplicados:**
  * **Análisis:** La propuesta era inalcanzable para un proyecto de clase del Momento 2 y se desviaba por completo del alcance técnico solicitado por los docentes.
  * **Decisión:** Descartamos las funciones corporativas e hipotecarias y consolidamos únicamente tres épicas alcanzables: Autenticación/Gestión de Clientes, Transacciones del Cajero y Tarjeta de Crédito.

---

### Caso 2: Redacción de Criterios de Aceptación
* **Herramienta:** Asistente LLM.
* **Prompt utilizado:**
  > *"Escribe los criterios de aceptación para una historia de usuario sobre retiros de dinero y compras con tarjeta de crédito en un cajero bancario."*
* **Propuesta inicial de la IA:**
  Generó criterios subjetivos y ambiguos como: *"El sistema debe procesar rápido la transacción"*, *"La interfaz debe ser amigable para el cliente"* y *"Se cobrarán intereses habituales"*.
* **Criterio propio y ajustes aplicados:**
  * **Análisis:** Criterios como "rápido" o "amigable" no son medibles ni testeables (fallando el principio Testable de INVEST).
  * **Decisión:** Reescribimos los criterios bajo el formato estructurado **Dado-Cuando-Entonces (Given-When-Then)** incorporando las fórmulas numéricas exactas del proyecto: rendimiento del 1.5% en retiros de ahorros, sobregiro del 20% en cuentas corrientes y tasas escalonadas (0%, 1.9% y 2.3%) para compras a cuotas con tarjeta de crédito.

---

### Caso 3: Estimación de Story Points
* **Herramienta:** Asistente LLM.
* **Prompt utilizado:**
  > *"¿Cuántos Story Points en escala Fibonacci le asignarías a las historias de registro, login y CRUD de usuarios en Java?"*
* **Propuesta inicial de la IA:**
  Asignó 1 punto a cada historia, considerando que "son tareas estándar de programación".
* **Criterio propio y ajustes aplicados:**
  * **Análisis:** La IA asumió erróneamente un desarrollo simple en un solo entorno, sin tener en cuenta que en nuestro integrador desarrollamos en paralelo la vista web y la vertical de consola en Java con encapsulamiento estricto y pruebas automatizadas.
  * **Decisión:** Reestimamos las historias en 3 y 5 puntos aplicando slicing vertical, reflejando el esfuerzo real de programar la lógica en JavaScript y Java simultáneamente.

---

## 3. Preparación para la Sustentación Oral (2 Minutos)

Para la sustentación presencial de 2 minutos ante el docente, el hilo conductor se organiza en tres momentos:

* **Minuto 0:00 a 0:40 – Priorización del Backlog:**  
  Explicar cómo se priorizaron las historias mediante la técnica MoSCoW, destacando que el Sprint 1 se concentró en los *Must Have* (acceso seguro, bloqueo tras 3 intentos y la vertical de usuario en Java), ya que sin gestión de identidad no se pueden habilitar operaciones monetarias.
* **Minuto 0:40 a 1:20 – Uso Crítico de la IA:**  
  Demostrar que la IA se utilizó solo para borradores y que el equipo corrigió sus sugerencias exageradas (descartando hipotecas o transferencias SWIFT) y definió criterios medibles (1.5% interés, 20% sobregiro y amortización a cuotas).
* **Minuto 1:20 a 2:00 – Demostración de Resultados:**  
  Concluir mostrando que el Sprint 1 se completó al 100% (29 de 29 Story Points), con 26 pruebas automáticas superadas en Frontend y 5 en Java, versionadas limpiamente en GitHub.
