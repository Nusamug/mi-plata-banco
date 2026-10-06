# Requerimientos y Documentación: Metodologías Ágiles (Scrum)

**Institución:** CESDE  
**Programa:** Técnico Laboral como Asistente en Desarrollo de Software  
**Docente / Mentor:** Ing. Jorge Eliécer Hernández S.  
**Submódulo:** Metodologías Ágiles para la Programación  
**Taller:** Taller 1 M2 – "Viviendo nuestro primer Sprint"  
**Manual de Referencia:** *Manual de trabajo: Scrum + GitHub*

---

## 1. ¿Qué pide exactamente el docente de Metodologías Ágiles?

El docente evalúa cómo se gestiona y evoluciona el **Proyecto Integrador propio** aplicando el marco de trabajo Scrum y control de versiones con GitHub.

### 1.1 Estructura Obligatoria del Repositorio
El repositorio en GitHub **NO** es solo para subir código, sino para evidenciar la evolución Sprint a Sprint con la siguiente arquitectura de archivos:

```text
proyecto/
├── README.md                      <- Portada: problema, integrantes, tecnologías, organización
├── .gitignore                     <- Archivos y carpetas a ignorar
├── docs/
│   ├── product-backlog.md         <- Backlog permanente y priorizado (Épicas, Features, US, Puntos)
│   ├── user-stories.md            <- Detalle de historias de usuario con criterios de aceptación
│   └── sprints/
│       ├── sprint-01/
│       │   ├── sprint-backlog.md  <- Tareas e historias seleccionadas para el Sprint 1
│       │   └── sprint-review.md   <- Resumen, qué se hizo, qué no y resultados del Sprint 1
│       └── sprint-02/ ...
└── src/                           <- Código fuente del proyecto
```

---

## 2. Jerarquía de Descomposición Ágil Exigida

1. **Épica (Epic):** Funcionalidad macro del sistema que abarca varios Sprints (ej: *Gestión de Usuarios*, *Cajero y Transacciones*).
2. **Feature:** Funcionalidad concreta dentro de una épica (ej: *Autenticación y Login*, *Operaciones de Retiro y Consignación*).
3. **Historia de Usuario (US):** Unidad mínima de valor que cabe en un Sprint.
   - **Formato:** `"Como [rol], quiero [acción] para [beneficio]"`.
   - **Criterios de Aceptación (CA):** Lista de condiciones verificables o formato *Given-When-Then*.
   - **Estimación en Puntos de Historia (Story Points)** y prioridad.

---

## 3. Estándar de Commits y Versionado

### 3.1 Nomenclatura de Commits (Conventional Commits):
- `chore:` Inicialización de repositorio, `.gitignore`, configuración.
- `docs:` Creación y actualización de documentación, backlog, historias, sprint logs.
- `feat:` Nuevas funcionalidades de software.
- `fix:` Corrección de errores / bugs.
- `refactor:` Mejoras de código sin cambiar comportamiento.
- `test:` Pruebas unitarias o de integración.

### 3.2 Flujo de Ramas (GitFlow):
`main` (versión estable) $\leftarrow$ `develop` (integración) $\leftarrow$ `feature/US-xx-nombre` (por historia de usuario).

---

## 4. Taller M2: "Viviendo nuestro primer Sprint" y Uso de IA

El taller exige el desarrollo de la **Competencia Institucional en IA (Nivel II)**:
1. Usar IA para proponer borrador de actividades y épicas.
2. **Bitácora de uso de IA obligatoria (3 a 4 líneas):** Explicar qué prompt se usó, qué propuso la IA y qué ajustes/criterios propios aplicó el equipo (no copiar literal).
3. **Sustentación oral en vivo (2 minutos):** Justificar sin IA la priorización del backlog.

---

## 5. Rúbrica y Criterios de Evaluación
| Elemento | Ponderación | Criterios clave evaluados |
| :--- | :--- | :--- |
| **Conocimiento** | 20% | Diferencia clara entre actividad, feature, épica y Product Backlog. |
| **Desempeño - Uso de IA** | 25% | Formulación de prompt, revisión crítica, ajustes con justificación, bitácora de IA. |
| **Desempeño - Trabajo y Scrum** | 25% | Asignación de roles (PO, SM, Dev), Daily Scrum con 3 preguntas, commits en Git. |
| **Producto** | 30% | Documento / archivos `.md` con Backlog priorizado, historias detalladas y Sprint Backlog 1. |
| **Total** | 100% | Nota de 0.0 a 5.0 (Aprobación $\ge 3.0$) |


---

## 6. Material Adicional: Slicing y Gestión Visual
- **Técnicas de Slicing:** División vertical de épicas e historias de usuario en tareas técnicas (Front-end, Back-end, Pruebas y Docs) para que entren holgadamente en el Sprint.
- **Herramientas de Gestión:** Tableros Scrum en Trello / Jira con columnas: *To Do*, *In Progress*, *Done*, asociados a las épicas e historias definidas en el Product Backlog.
