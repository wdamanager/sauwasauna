# Plan Maestro de Reorganización - SAUWA (sauwasauna.com)

## Estado Actual del Proyecto

### Información del Proyecto
- **Cliente**: SAUWA
- **Stack**: WordPress Headless + Astro Frontend
- **Timeline**: 26/09/2025 - 07/12/2025
- **Estado**: Epic 1 (WDA-61) - Landing Page en progreso

### Problema Identificado
El proyecto tiene archivos dispersos y desorganizados que afectan la mantenibilidad y claridad del código.

## Diagnóstico de Problemas

### 1. Raíz del Proyecto
**Ubicación**: `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\`

**Problemas detectados**:
- 40+ archivos .md de contextos WDA temporales
- Archivos de pruebas JS/MJS dispersos (audit-mobile.mjs, test-graphql.js)
- Componentes Astro fuera de lugar (BlogStickyScrollSection.astro)
- Archivos TypeScript en raíz (src-lib-wordpress-complete.ts)
- Directorio "backend-implementation" innecesario
- Archivos de briefing, auditorías e implementaciones mezclados

### 2. Directorio docs/
**Problemas detectados**:
- Múltiples reportes de tareas WDA (WDA-295, WDA-286, WDA-289)
- Archivos duplicados de funcionalidades
- Mezcla de documentación técnica permanente y reportes temporales
- Falta de organización clara

### 3. Directorio astro/
**Problemas detectados**:
- Potencialmente desordenado (requiere análisis detallado)
- Posibles archivos de prueba mezclados con código de producción

## Archivos a PRESERVAR (Críticos)

### Raíz del Proyecto
```
/
├── CLAUDE.md                    # Configuración del proyecto para Claude
├── README.md                     # Documentación principal
├── .env.example                  # Template de configuración
├── .gitignore                    # Control de versiones
├── package.json                  # Dependencias del proyecto
└── pnpm-lock.yaml               # Lock file de dependencias
```

### Directorio docs/
```
docs/
├── GUIDELINE/                    # Design system completo (PRESERVAR TODO)
├── architecture.md               # Arquitectura del sistema
├── adr/                         # Architecture Decision Records
│   └── *.md                     # Todas las decisiones arquitectónicas
└── api/                         # Documentación de API (si existe)
```

### Directorio astro/
```
astro/
├── src/
│   ├── components/              # Componentes Astro/React/Vue
│   ├── layouts/                 # Layouts base
│   ├── pages/                   # Páginas del sitio
│   ├── lib/                     # Utilidades y helpers
│   ├── styles/                  # CSS global y Tailwind
│   └── types/                   # TypeScript definitions
├── public/                      # Assets estáticos
├── astro.config.mjs            # Configuración de Astro
├── tailwind.config.js          # Configuración de Tailwind
├── tsconfig.json               # Configuración TypeScript
└── package.json                # Dependencias frontend
```

## Archivos a ELIMINAR

### Categoría 1: Contextos WDA Temporales
**Patrón**: `WDA-*.md`, `*-context.md`, `*-briefing.md`
```
- WDA-*.md (todos los archivos de contexto de tareas)
- *-briefing-*.md
- *-context-*.md
- *-implementation-*.md
- *-audit-*.md
- *-progress-*.md
- *-report-*.md
```

### Categoría 2: Archivos de Pruebas Obsoletos
```
- audit-mobile.mjs
- test-graphql.js
- test-*.js
- *.test.js (en raíz)
- debug-*.js
```

### Categoría 3: Componentes Fuera de Lugar
```
- BlogStickyScrollSection.astro (mover a astro/src/components/)
- src-lib-wordpress-complete.ts (mover a astro/src/lib/)
- Cualquier archivo .astro, .tsx, .jsx en raíz
```

### Categoría 4: Directorios Innecesarios
```
- backend-implementation/ (completo)
- temp/
- old/
- backup/
```

### Categoría 5: Reportes de Tareas en docs/
```
docs/
- WDA-*-report.md
- *-implementation-report.md
- *-task-*.md
- newsletter-*.md (duplicados)
- vertical-scroll-*.md (duplicados)
```

## Estructura Final Propuesta

```
sauwasauna.com/
├── 📄 CLAUDE.md                  # Configuración del proyecto
├── 📄 README.md                  # Documentación principal
├── 📄 CHANGELOG.md               # Historial de cambios (NUEVO)
├── 📄 .env.example               # Template de variables de entorno
├── 📄 .gitignore                 # Git ignore
├── 📄 package.json               # Dependencias raíz (si existe)
├── 📄 pnpm-workspace.yaml        # Configuración monorepo (si aplica)
│
├── 📁 astro/                     # Frontend Astro
│   ├── src/
│   │   ├── components/           # Componentes UI
│   │   │   ├── common/          # Componentes reutilizables
│   │   │   ├── sections/        # Secciones de página
│   │   │   └── widgets/         # Widgets específicos
│   │   ├── layouts/             # Layouts base
│   │   ├── pages/               # Páginas/rutas
│   │   ├── lib/                 # Utilidades
│   │   │   ├── wordpress.ts    # Cliente GraphQL
│   │   │   └── utils.ts        # Helpers generales
│   │   ├── styles/              # CSS global
│   │   └── types/               # TypeScript types
│   ├── public/                  # Assets estáticos
│   ├── tests/                   # Tests del frontend
│   └── [archivos de configuración]
│
├── 📁 docs/                      # Documentación técnica
│   ├── 📁 GUIDELINE/            # Design system (PRESERVAR)
│   ├── 📁 adr/                  # Architecture Decision Records
│   ├── 📁 api/                  # Documentación de APIs
│   ├── 📁 archive/              # Contextos históricos (NUEVO)
│   │   └── tasks/               # Reportes de tareas completadas
│   ├── 📄 architecture.md       # Arquitectura del sistema
│   ├── 📄 deployment.md         # Guía de deployment
│   └── 📄 development.md        # Guía de desarrollo
│
├── 📁 scripts/                   # Scripts de utilidad (NUEVO)
│   ├── build.sh                 # Script de build
│   ├── deploy.sh                # Script de deployment
│   └── clean.sh                 # Script de limpieza
│
└── 📁 .github/                   # GitHub config (si aplica)
    └── workflows/                # GitHub Actions
```

## Plan de Ejecución

### Fase 1: Preparación (Backup)
1. **Crear backup completo** del proyecto actual
2. **Crear branch** `cleanup/project-reorganization`
3. **Documentar** estado inicial con screenshots de estructura

### Fase 2: Creación de Estructura
1. **Crear directorios nuevos**:
   - `docs/archive/`
   - `docs/archive/tasks/`
   - `scripts/`
   - `astro/tests/` (si no existe)

2. **Crear CHANGELOG.md** consolidando información histórica relevante

### Fase 3: Reorganización de Archivos

#### 3.1 Archivos de Raíz
```bash
# Mover componentes a su lugar correcto
mv BlogStickyScrollSection.astro astro/src/components/sections/
mv src-lib-wordpress-complete.ts astro/src/lib/wordpress-complete.ts

# Mover scripts de prueba a scripts/ o eliminar
mv test-*.js scripts/tests/ # o eliminar si obsoletos
mv audit-*.mjs scripts/audits/ # o eliminar si obsoletos

# Archivar contextos WDA valiosos
mv WDA-*.md docs/archive/tasks/

# Eliminar archivos temporales sin valor
rm *-context-*.md
rm *-briefing-*.md
rm *-implementation-*.md
```

#### 3.2 Limpieza de docs/
```bash
# Archivar reportes de tareas
mv docs/WDA-*.md docs/archive/tasks/
mv docs/*-report.md docs/archive/tasks/

# Eliminar duplicados
# (identificar y eliminar manualmente)
```

#### 3.3 Eliminación de Directorios Innecesarios
```bash
rm -rf backend-implementation/
rm -rf temp/
rm -rf old/
rm -rf backup/
```

### Fase 4: Actualización de Documentación

1. **Actualizar README.md** con nueva estructura
2. **Actualizar CLAUDE.md** si cambian rutas
3. **Crear docs/development.md** con guía de desarrollo actualizada
4. **Crear docs/deployment.md** con proceso de deployment

### Fase 5: Validación

1. **Verificar** que el proyecto compila: `cd astro && pnpm build`
2. **Verificar** que no hay imports rotos
3. **Verificar** que la documentación crítica está accesible
4. **Actualizar** .gitignore si es necesario

### Fase 6: Finalización

1. **Commit** de cambios con mensaje descriptivo
2. **PR** con resumen de cambios
3. **Merge** después de revisión
4. **Tag** de versión post-limpieza

## Métricas de Éxito

- ✅ Reducción de archivos en raíz de 40+ a <10
- ✅ Documentación organizada y accesible
- ✅ Código fuente correctamente estructurado
- ✅ Sin pérdida de información crítica
- ✅ Proyecto compila y funciona correctamente
- ✅ Estructura clara y mantenible

## Riesgos y Mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| Pérdida de información importante | Backup completo antes de empezar |
| Rotura de imports/referencias | Búsqueda y reemplazo sistemático |
| Conflictos con trabajo en curso | Coordinar con equipo, trabajar en branch |
| Eliminación de archivos en uso | Revisar últimas modificaciones antes de eliminar |

## Herramientas Recomendadas

- **VS Code** con búsqueda global para encontrar referencias
- **Git** para control de versiones y backup
- **grep/findstr** para búsqueda de patrones
- **tree** para visualizar estructura

## Checklist Final

- [ ] Backup completo creado
- [ ] Branch de trabajo creado
- [ ] Archivos críticos identificados y preservados
- [ ] Archivos obsoletos eliminados
- [ ] Estructura reorganizada según plan
- [ ] Documentación actualizada
- [ ] Proyecto compila sin errores
- [ ] Tests pasan (si existen)
- [ ] PR creado y revisado
- [ ] Merge completado
- [ ] Tag de versión creado

## Notas para Agentes

### Para technical-project-manager:
- Actualizar Linear con progreso de limpieza
- Crear tarea WDA para tracking
- Notificar al equipo sobre reorganización

### Para docops-engineer:
- Consolidar documentación dispersa
- Crear CHANGELOG.md con historial
- Actualizar referencias en documentación

### Para astro-ux-architect:
- Verificar componentes movidos
- Actualizar imports si es necesario
- Validar que build funciona

### Para wordpress-headless-expert:
- Verificar que queries GraphQL siguen funcionando
- Actualizar referencias a archivos de configuración

---

**Fecha de creación**: 2025-10-24
**Autor**: Claude Code - Context Management Agent
**Estado**: PENDIENTE DE EJECUCIÓN