# 🤖 Bitácora de Uso Reflexivo de Inteligencia Artificial (IA)

> **Institución:** CESDE – Medellín  
> **Submódulo:** Metodologías Ágiles para la Programación  
> **Docente:** Ing. Jorge Eliécer Hernández S.  
> **Competencia Evaluada:** Competencia Institucional en IA – Nivel II (Uso Crítico, Juicio Propio y Adaptación)  
> **Ponderación en la Rúbrica:** 25% de la evaluación total  

---

## 🎯 Propósito de este Documento

Este registro evidencia la interacción entre el equipo de desarrollo y las herramientas de Inteligencia Artificial durante la concepción, estimación y planificación del proyecto **"Mi Plata"**.

En concordancia con los lineamientos del docente, la IA fue empleada como un **asistente colaborativo para generar borradores iniciales**, y en ningún momento como sustituto del análisis técnico ni de la toma de decisiones del equipo. Todo el material generado fue sometido a revisión crítica, depuración y adaptación según el contexto real del proyecto integrador.

---

## 📝 Registro de Interacciones y Ajustes Críticos

### 🔹 Entrada 1: Desglose de Épicas y Alcance Inicial
* **Fecha:** Semana 1 del Sprint 1
* **Herramienta utilizada:** Asistente LLM (Gemini / ChatGPT)
* **Prompt formulado por el equipo:**
  > *"Actúa como Product Owner de un banco digital. Necesito un desglose de épicas y funcionalidades para un proyecto escolar que incluye un cajero web y administración de usuarios por consola."*
* **Propuesta inicial de la IA:**
  La IA devolvió un listado de más de 12 épicas de un banco comercial completo: transferencias internacionales mediante código SWIFT, solicitud de créditos hipotecarios, pagos de nómina empresarial y autenticación multifactor biométrica.
* **Criterio propio y ajustes aplicados por el equipo:**
  * **Análisis crítico:** La propuesta de la IA sobrepasaba por completo el alcance del Momento 2 y no correspondía a los requerimientos pactados con los docentes del CESDE.
  * **Ajustes:** Descartamos las funcionalidades de banca corporativa e hipotecas. Filtramos y agrupamos el proyecto en 3 épicas centrales viables: (1) Autenticación y Gestión de Clientes, (2) Cajero y Transacciones, y (3) Tarjeta de Crédito con financiamiento a cuotas.

---

### 🔹 Entrada 2: Redacción de Criterios de Aceptación
* **Fecha:** Semana 1 del Sprint 1
* **Herramienta utilizada:** Asistente LLM
* **Prompt formulado por el equipo:**
  > *"Escribe los criterios de aceptación para una historia de usuario sobre retiros de dinero y compras con tarjeta de crédito en un cajero bancario."*
* **Propuesta inicial de la IA:**
  Generó afirmaciones genéricas y difíciles de verificar, tales como: *"El cajero debe ser amigable"*, *"La transacción debe ejecutarse rápidamente"* o *"Se deben cobrar intereses normales de mercado"*.
* **Criterio propio y ajustes aplicados por el equipo:**
  * **Análisis crítico:** Los criterios de aceptación no eran testeables ni cuantificables, violando la regla **Testable** del estándar INVEST y BDD.
  * **Ajustes:** Reestructuramos cada criterio en formato formal **Dado-Cuando-Entonces (Given-When-Then)** e inyectamos las reglas financieras exactas exigidas en el integrador:
    - Retiro de Ahorros: bonificación exacta de **1.5%** de rendimiento sobre el monto retirado.
    - Cuenta Corriente: autorización de hasta el **20%** de sobregiro sobre el saldo base.
    - Tarjeta de Crédito: amortización fija mensual con tasas fijas (0% para $\le 2$ cuotas, 1.9% para 3 a 6 cuotas, 2.3% para 7 o más cuotas).

---

### 🔹 Entrada 3: Estimación en Story Points y Slicing
* **Fecha:** Sesión de Sprint Planning
* **Herramienta utilizada:** Asistente LLM
* **Prompt formulado por el equipo:**
  > *"¿Cuántos Story Points en Fibonacci le asignarías al registro de usuarios, al login y al CRUD de usuarios?"*
* **Propuesta inicial de la IA:**
  La IA asignó 1 punto a todas las historias argumentando que *"son operaciones estándar de desarrollo web"*.
* **Criterio propio y ajustes aplicados por el equipo:**
  * **Análisis crítico:** La IA ignoró por completo la dualidad técnica de nuestro proyecto integrador, donde no solo maquetamos en HTML/JS sino que también debemos programar la vertical orientada a objetos en Java con herencia y validaciones sobre `ArrayList`.
  * **Ajustes:** Aplicamos la técnica de **Slicing vertical**. Estimamos el registro en **5 SP** y el CRUD en Java en **5 SP** por la complejidad de encapsulamiento y el menú interactivo, mientras que el login con control de 3 intentos se estimó en **3 SP**.

---

## 🎙️ Guión de Apoyo: Sustentación Oral en Vivo (2 Minutos)

Para presentar la sustentación oral ante el **Ing. Jorge Eliécer Hernández S.** sin depender de la IA, el equipo preparó el siguiente hilo conductor de 120 segundos:

| Tiempo | Momento | Mensaje Clave a Expresar con Seguridad |
| :---: | :--- | :--- |
| **0:00 - 0:40** | **1. Priorización del Backlog** | *"Buenos días profesor. En 'Mi Plata' priorizamos el Product Backlog utilizando la técnica MoSCoW enfocado en valor de negocio. Para este primer Sprint nos concentramos en los Must Have: la seguridad y acceso del cliente (registro y login con bloqueo a 3 intentos) y la gestión de usuarios en Java, porque sin una identidad confiable no es posible transar dinero de manera segura."* |
| **0:40 - 1:20** | **2. Uso Crítico de la IA (No Copiar y Pegar)** | *"Utilizamos IA generativa como herramienta de apoyo para proponer un borrador inicial del backlog. Sin embargo, aplicamos juicio crítico: la IA nos propuso temas complejos fuera de alcance como créditos hipotecarios y transferencias internacionales; nosotros depuramos eso y aterrizamos las historias al contexto de nuestro proyecto integrador, ajustando criterios de aceptación específicos como el 1.5% de ahorro, el 20% de sobregiro y la amortización de cuotas."* |
| **1:20 - 2:00** | **3. Resultados y Cierre del Sprint 1** | *"Gracias a esta disciplina ágil y al slicing de tareas entre frontend y backend, completamos 29 de 29 Story Points comprometidos, respaldados por 26 pruebas en Javascript y 5 pruebas en Java, todo versionado limpiamente en GitHub bajo Conventional Commits. Quedamos atentos a cualquier pregunta."* |
