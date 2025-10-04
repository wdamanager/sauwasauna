# 🚀 Astro WordPress Headless Template

A modern, fast, and SEO-optimized template for building headless WordPress sites with Astro.

## 📋 Stack

- **[Astro](https://astro.build)** v5.x - Fast static site generator
- **[Tailwind CSS](https://tailwindcss.com)** v3.x - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** v5.x - Type safety
- **WordPress GraphQL** - Headless CMS backend

## ✨ Features

- ⚡️ Lightning-fast static generation
- 🎨 Tailwind CSS with custom theme
- 📝 TypeScript with strict mode
- 🔍 SEO-optimized
- 📱 Fully responsive
- 🎯 Zero JavaScript by default
- 🔧 ESLint + Prettier configured
- 🌐 WordPress GraphQL integration
- 🎭 Component-based architecture

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn
- WordPress with WPGraphQL plugin

### Installation

1. **Clone or copy this template**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp ../.env.example .env
   ```
   
   Edit `.env` and set your WordPress GraphQL URL:
   ```env
   WORDPRESS_GRAPHQL_URL=https://your-wordpress-site.com/graphql
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:4321
   ```

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   └── ui/          # UI components
│   ├── layouts/         # Page layouts
│   ├── lib/            # Utilities and helpers
│   │   ├── graphql.ts  # GraphQL client
│   │   └── types.ts    # TypeScript types
│   ├── pages/          # File-based routing
│   ├── styles/         # Global styles
│   └── env.d.ts        # Environment types
├── .env.example        # Environment variables template
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run start            # Alias for dev

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Quality
npm run type-check       # Check TypeScript types
npm run lint             # Lint code with ESLint
npm run format           # Format code with Prettier

# Other
npm run astro            # Run Astro CLI commands
```

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      },
    },
  },
},
```

### Fonts

1. Add font files to `public/fonts/`
2. Update `tailwind.config.mjs`:

```javascript
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
},
```

### Site Configuration

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  // ... other config
});
```

## 🔌 WordPress Setup

### Required Plugins

- **WPGraphQL** - GraphQL API for WordPress
- **WPGraphQL for Advanced Custom Fields** (optional)
- **Yoast SEO** (optional, for SEO data)

### GraphQL Queries

Example queries are in `src/lib/graphql.ts`:

- `getAllPosts()` - Fetch all posts
- `getPostBySlug(slug)` - Fetch single post

### Adding New Queries

```typescript
export async function getPages() {
  const query = `
    query GetPages {
      pages {
        nodes {
          id
          title
          slug
          content
        }
      }
    }
  `;
  
  const data = await graphqlQuery<{ pages: any }>(query);
  return data.pages.nodes;
}
```

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WORDPRESS_GRAPHQL_URL` | WordPress GraphQL endpoint | ✅ Yes |
| `WORDPRESS_API_TOKEN` | API authentication token | ❌ No |

See `.env.example` for all available variables.

## 🚢 Deployment

### Build

```bash
npm run build
```

Output will be in `dist/` directory.

### Platforms

This template works with:

- **Netlify** - Zero config deployment
- **Vercel** - Zero config deployment  
- **Cloudflare Pages** - Fast edge deployment
- **Any static hosting** - Deploy `dist/` folder

### CI/CD

Add build command to your CI/CD:

```bash
npm ci && npm run build
```

## 📚 Documentation

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WPGraphQL Documentation](https://www.wpgraphql.com/docs/introduction)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

This is a template repository. Feel free to:

1. Fork this template
2. Make your improvements
3. Use it for your projects

## 📄 License

MIT License - feel free to use this template for personal and commercial projects.

## 🙋‍♂️ Support

For issues or questions:

1. Check [Astro Discord](https://astro.build/chat)
2. Review [WPGraphQL docs](https://www.wpgraphql.com)
3. Open an issue in your repository

---

**Built with ❤️ using Astro**
