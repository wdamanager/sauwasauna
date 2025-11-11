# [NOMBRE_PROYECTO]

Proyecto WordPress Headless + Astro

## 🚀 Quick Start

### Instalación

```bash
# Instalar dependencias
cd astro
pnpm install

# Configurar entorno
cd ..
copy .env.example .env
# Editar .env con credenciales reales

# Iniciar desarrollo
cd astro
pnpm dev
```

Acceder a: http://localhost:4321

### Configuración Claude Code

1. **Instalar Filesystem MCP** para este proyecto:
```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem "$PWD"
```

2. **Personalizar CLAUDE.md** con información del proyecto

3. **Iniciar Claude Code**:
```bash
claude
```

## 📋 Stack Técnico

- **Backend**: WordPress Headless + WPGraphQL (en hosting)
- **Frontend**: Astro (SSG) + TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Hosting compartido
- **Idiomas**: ES, CA, EN, FR (ajustar según proyecto)

## 🔗 Enlaces Importantes

- **Linear Project**: [URL_PROYECTO_LINEAR]
- **Staging**: [URL_STAGING]
- **Production**: [URL_PRODUCTION]
- **WordPress Admin**: [URL_WP_ADMIN]

## 📁 Estructura del Proyecto

```
.
├── astro/              # Proyecto Astro
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── layouts/    # Layouts
│   │   ├── pages/      # Páginas/rutas
│   │   ├── lib/        # Utilidades y cliente GraphQL
│   │   └── styles/     # Estilos globales
│   └── public/         # Assets estáticos
├── docs/               # Documentación del proyecto
│   ├── architecture.md # Diagrama de arquitectura
│   └── adr/           # Architecture Decision Records
├── CLAUDE.md          # Contexto del proyecto para Claude Code
└── settings.local.json # Configuración Claude Code
```

## 🛠️ Comandos Útiles

```bash
# Desarrollo
cd astro && pnpm dev

# Build
pnpm build

# Preview
pnpm preview

# Testing
npx playwright test

# Linting
pnpm lint

# Format
pnpm format
```

## 🔑 Variables de Entorno

Ver `.env.example` para la lista completa de variables requeridas.

Mínimo necesario:
```env
WORDPRESS_GRAPHQL_URL=https://tu-dominio.com/graphql
```

## 📚 Documentación

- [Architecture](docs/architecture.md) - Diagrama de arquitectura del proyecto
- [ADRs](docs/adr/) - Decisiones técnicas importantes

## 🤝 Contribuir

1. Crear feature branch: `git checkout -b feature/nombre`
2. Hacer commits siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
3. Push y crear Pull Request

## 📝 Agents de Claude Code

Este proyecto usa 5 agents especializados:
- `technical-project-manager` - Gestión Linear
- `wordpress-headless-expert` - Backend WP + WPGraphQL
- `astro-ux-architect` - Frontend Astro
- `docops-engineer` - Documentación
- `api-integration-architect` - Integraciones API

---

**Última actualización**: [FECHA]  
**Equipo**: [NOMBRE_EQUIPO]
