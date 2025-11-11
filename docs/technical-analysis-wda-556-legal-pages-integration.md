# Análisis Técnico: Integración de Páginas Legales Dinámicas con Polylang (WDA-556)

## Resumen Ejecutivo
Análisis exhaustivo de la implementación de páginas legales multiidioma usando WordPress Headless con WPGraphQL y Polylang para el proyecto SAUWA.

---

## 1. VALIDACIÓN DE LA QUERY GRAPHQL PROPUESTA

### Query Original Propuesta
```graphql
query GetPostByIdTranslated($id: ID!, $language: LanguageCodeFilterEnum!) {
  post(id: $id, idType: DATABASE_ID) {
    id
    title
    content
    date
    modified
    language {
      code
      locale
      name
    }
    translation(language: $language) {
      id
      title
      content
      modified
      language {
        code
        locale
      }
    }
    seo {
      title
      metaDesc
      canonical
      metaRobotsNoindex
    }
  }
}
```

### Análisis de la Query

#### ✅ Elementos Correctos:
- `LanguageCodeFilterEnum` existe en el schema
- Campo `language` con estructura correcta (code, locale, name)
- Campo `translation` está disponible
- Integración con Yoast SEO funcionando

#### ⚠️ Problemas Identificados:

1. **Parámetro `translation` incorrecto**: El campo `translation` acepta `language` de tipo `LanguageCodeEnum`, no `LanguageCodeFilterEnum`

2. **Enfoque ineficiente**: La query busca traducción dentro del mismo post, cuando debería buscar directamente el post en el idioma deseado

3. **Falta campo `translations`**: No se está aprovechando el campo `translations` que devuelve todas las traducciones disponibles

### Query Mejorada y Corregida

```graphql
# Opción 1: Query directa por ID con traducción específica
query GetLegalPageTranslated($id: ID!, $language: LanguageCodeEnum!) {
  post(id: $id, idType: DATABASE_ID) {
    id
    databaseId
    title
    content
    date
    modified
    slug
    uri
    language {
      code
      locale
      name
      slug
    }
    # Obtener traducción específica
    translation(language: $language) {
      id
      databaseId
      title
      content
      modified
      slug
      uri
      language {
        code
        locale
      }
      seo {
        title
        metaDesc
        canonical
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
      }
    }
    # Obtener todas las traducciones disponibles
    translations {
      id
      databaseId
      slug
      language {
        code
        locale
        name
      }
    }
    seo {
      title
      metaDesc
      canonical
      metaRobotsNoindex
      opengraphTitle
      opengraphDescription
    }
  }
}

# Opción 2: Query con filtro de idioma directo (más eficiente)
query GetLegalPageByLanguage($slug: ID!, $language: LanguageCodeFilterEnum!) {
  post(id: $slug, idType: SLUG) {
    id
    databaseId
    title
    content
    date
    modified
    slug
    uri
    language {
      code
      locale
      name
    }
    translations {
      id
      databaseId
      slug
      uri
      language {
        code
        locale
        name
      }
    }
    seo {
      title
      metaDesc
      canonical
      metaRobotsNoindex
      breadcrumbs {
        text
        url
      }
    }
  }
}

# Opción 3: Query batch para múltiples páginas legales
query GetAllLegalPages($ids: [ID!]!, $language: LanguageCodeFilterEnum!) {
  posts(where: { in: $ids, language: $language }) {
    nodes {
      id
      databaseId
      title
      content
      modified
      slug
      uri
      language {
        code
        locale
        name
      }
      translations {
        id
        slug
        language {
          code
        }
      }
      seo {
        title
        metaDesc
        canonical
      }
    }
  }
}
```

---

## 2. ARQUITECTURA WORDPRESS RECOMENDADA

### Verificaciones Pre-implementación

#### A. Verificar Configuración Polylang
```php
// functions.php - Verificación de configuración
add_action('init', function() {
    if (!function_exists('pll_current_language')) {
        error_log('Polylang no está activo');
        return;
    }

    // Verificar idiomas configurados
    $languages = pll_languages_list();
    $expected = ['es', 'en', 'fr', 'ca'];

    foreach ($expected as $lang) {
        if (!in_array($lang, $languages)) {
            error_log("Idioma $lang no configurado en Polylang");
        }
    }
});
```

#### B. Verificar WPGraphQL Polylang
```bash
# Query de test desde terminal
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{
      languages {
        code
        locale
        name
        is_default
      }
    }"
  }'
```

#### C. Configuración de Post Types
```php
// Registrar páginas legales como CPT específico (recomendado)
register_post_type('legal_page', [
    'label' => 'Páginas Legales',
    'public' => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'legalPage',
    'graphql_plural_name' => 'legalPages',
    'supports' => ['title', 'editor', 'revisions'],
    'rewrite' => ['slug' => 'legal'],
]);

// Habilitar traducción para el CPT
add_filter('pll_get_post_types', function($post_types) {
    $post_types[] = 'legal_page';
    return $post_types;
});
```

### Estructura de Datos Recomendada

```yaml
WordPress Backend:
  Legal Pages:
    - ID: 94 (Aviso Legal ES)
      translations:
        - EN: ID 95
        - FR: ID 96
        - CA: ID 97

    - ID: 98 (Política Privacidad ES)
      translations:
        - EN: ID 99
        - FR: ID 100
        - CA: ID 101

    - ID: 102 (Política Cookies ES)
      translations:
        - EN: ID 103
        - FR: ID 104
        - CA: ID 105
```

---

## 3. ESTRATEGIA DE TRADUCCIÓN OPTIMIZADA

### Sistema de Fallbacks Inteligente

```javascript
// lib/wordpress/legal-pages-client.js
export class LegalPagesClient extends GraphQLClient {
  constructor() {
    super();
    this.fallbackChain = {
      'ca': ['es', 'en'], // Catalán -> Español -> Inglés
      'fr': ['en', 'es'], // Francés -> Inglés -> Español
      'en': ['es'],       // Inglés -> Español
      'es': []            // Español es el default final
    };
  }

  async getLegalPage(pageId, requestedLang, options = {}) {
    const {
      useFallback = true,
      includeAllTranslations = false,
      useCache = true
    } = options;

    try {
      // Intentar obtener la traducción directa
      const query = `
        query GetLegalPage($id: ID!, $lang: LanguageCodeEnum!) {
          post(id: $id, idType: DATABASE_ID) {
            ...LegalPageFields
            translation(language: $lang) {
              ...LegalPageFields
            }
            ${includeAllTranslations ? 'translations { ...TranslationLinks }' : ''}
          }
        }

        fragment LegalPageFields on Post {
          id
          databaseId
          title
          content
          modified
          language {
            code
            locale
          }
          seo {
            title
            metaDesc
            canonical
          }
        }

        fragment TranslationLinks on Post {
          id
          slug
          language {
            code
            name
          }
        }
      `;

      const result = await this.query(query, {
        id: pageId,
        lang: requestedLang.toUpperCase()
      }, useCache);

      // Si existe traducción directa, devolverla
      if (result.post?.translation?.content) {
        return {
          ...result.post.translation,
          availableTranslations: result.post.translations || [],
          isTranslation: true,
          originalLanguage: result.post.language.code
        };
      }

      // Si no hay traducción y fallback está activado
      if (useFallback && this.fallbackChain[requestedLang]) {
        for (const fallbackLang of this.fallbackChain[requestedLang]) {
          const fallbackResult = await this.getLegalPage(
            pageId,
            fallbackLang,
            { ...options, useFallback: false }
          );

          if (fallbackResult) {
            return {
              ...fallbackResult,
              isFallback: true,
              requestedLanguage: requestedLang,
              fallbackLanguage: fallbackLang
            };
          }
        }
      }

      // Devolver contenido original si no hay traducciones
      return {
        ...result.post,
        isOriginal: true,
        noTranslationAvailable: true,
        requestedLanguage: requestedLang
      };

    } catch (error) {
      console.error('[LegalPages] Error fetching page:', error);
      throw error;
    }
  }

  // Obtener múltiples páginas legales con caché optimizado
  async getLegalPagesBatch(pageIds, language) {
    const cacheKey = `legal_batch_${language}_${pageIds.join('_')}`;

    // Intentar caché primero
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const query = `
      query GetLegalPagesBatch($ids: [ID!]!, $lang: LanguageCodeFilterEnum!) {
        posts(where: { in: $ids, language: $lang }) {
          nodes {
            id
            databaseId
            title
            content
            slug
            uri
            modified
            language {
              code
              locale
            }
            translations {
              id
              slug
              language {
                code
              }
            }
            seo {
              title
              metaDesc
            }
          }
        }
      }
    `;

    const result = await this.query(query, {
      ids: pageIds,
      lang: language.toUpperCase()
    }, false); // No usar caché individual para batch

    // Cachear resultado completo del batch
    this.cache.set(cacheKey, result, 10 * 60 * 1000); // 10 minutos para páginas legales

    return result;
  }
}
```

### Gestión de Metadatos SEO Multiidioma

```javascript
// lib/wordpress/seo-manager.js
export class SEOManager {
  static generateHreflangTags(currentLang, translations) {
    const baseUrl = 'https://sauwasauna.com';
    const hreflangs = [];

    // Añadir idioma actual
    hreflangs.push({
      rel: 'alternate',
      hreflang: currentLang,
      href: `${baseUrl}/${currentLang}/${getCurrentSlug()}`
    });

    // Añadir traducciones disponibles
    translations?.forEach(translation => {
      const lang = translation.language.code.toLowerCase();
      hreflangs.push({
        rel: 'alternate',
        hreflang: lang,
        href: `${baseUrl}/${lang}/${translation.slug}`
      });
    });

    // Añadir x-default para idioma por defecto
    hreflangs.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${baseUrl}/es/${getCurrentSlug()}`
    });

    return hreflangs;
  }

  static generateStructuredData(page, language) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.seo?.title || page.title,
      description: page.seo?.metaDesc,
      url: page.seo?.canonical,
      inLanguage: language,
      isPartOf: {
        '@type': 'WebSite',
        name: 'SAUWA',
        url: 'https://sauwasauna.com'
      },
      dateModified: page.modified,
      publisher: {
        '@type': 'Organization',
        name: 'PCR Europe, S.L.',
        legalName: 'PCR Europe, S.L.'
      }
    };
  }
}
```

---

## 4. TESTING GRAPHQL AVANZADO

### Suite de Tests Completa

```javascript
// tests/wordpress-polylang.test.js
export const PolylangTests = {
  // Test 1: Verificar configuración de idiomas
  async testLanguagesConfiguration() {
    const query = `{
      languages {
        code
        locale
        name
        is_default
        is_rtl
      }
    }`;

    const result = await fetch('https://backend.sauwasauna.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    }).then(r => r.json());

    const expectedLanguages = ['ES', 'EN', 'FR', 'CA'];
    const actualLanguages = result.data.languages.map(l => l.code);

    console.assert(
      expectedLanguages.every(lang => actualLanguages.includes(lang)),
      'Todos los idiomas deben estar configurados'
    );

    return result;
  },

  // Test 2: Verificar traducciones de un post específico
  async testPostTranslations(postId = 94) {
    const query = `
      query TestTranslations($id: ID!) {
        post(id: $id, idType: DATABASE_ID) {
          id
          title
          language {
            code
          }
          translations {
            id
            databaseId
            title
            language {
              code
              locale
            }
          }
        }
      }
    `;

    const result = await fetch('https://backend.sauwasauna.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { id: postId }
      })
    }).then(r => r.json());

    console.log('Post original:', result.data.post?.title);
    console.log('Idioma original:', result.data.post?.language?.code);
    console.log('Traducciones disponibles:', result.data.post?.translations?.length || 0);

    return result;
  },

  // Test 3: Verificar fallback de idioma
  async testLanguageFallback(postId = 94, targetLang = 'FR') {
    const query = `
      query TestFallback($id: ID!, $lang: LanguageCodeEnum!) {
        post(id: $id, idType: DATABASE_ID) {
          title
          language {
            code
          }
          translation(language: $lang) {
            id
            title
            content
            language {
              code
            }
          }
        }
      }
    `;

    const result = await fetch('https://backend.sauwasauna.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: {
          id: postId,
          lang: targetLang
        }
      })
    }).then(r => r.json());

    if (result.data.post?.translation) {
      console.log(`Traducción ${targetLang} encontrada:`, result.data.post.translation.title);
    } else {
      console.log(`No hay traducción ${targetLang} para post ${postId}`);
    }

    return result;
  },

  // Test 4: Performance test con múltiples queries
  async testBatchPerformance(pageIds = [94, 96, 3]) {
    console.time('Batch Query');

    const query = `
      query BatchLegalPages($ids: [ID!]!) {
        posts(where: { in: $ids }) {
          nodes {
            id
            databaseId
            title
            language {
              code
            }
            translations {
              id
              language {
                code
              }
            }
          }
        }
      }
    `;

    const result = await fetch('https://backend.sauwasauna.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { ids: pageIds }
      })
    }).then(r => r.json());

    console.timeEnd('Batch Query');
    console.log(`Páginas recuperadas: ${result.data.posts?.nodes?.length || 0}`);

    return result;
  },

  // Test 5: Verificar campos SEO con Yoast
  async testSEOFields(postId = 94) {
    const query = `
      query TestSEO($id: ID!) {
        post(id: $id, idType: DATABASE_ID) {
          title
          seo {
            title
            metaDesc
            canonical
            metaRobotsNoindex
            metaRobotsNofollow
            opengraphTitle
            opengraphDescription
            opengraphImage {
              sourceUrl
            }
            twitterTitle
            twitterDescription
            breadcrumbs {
              text
              url
            }
          }
        }
      }
    `;

    const result = await fetch('https://backend.sauwasauna.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { id: postId }
      })
    }).then(r => r.json());

    const seo = result.data.post?.seo;
    console.log('SEO Title:', seo?.title || 'No configurado');
    console.log('Meta Description:', seo?.metaDesc || 'No configurado');
    console.log('Canonical URL:', seo?.canonical || 'No configurado');

    return result;
  },

  // Ejecutar todos los tests
  async runAll() {
    console.log('🧪 Iniciando suite de tests Polylang + WPGraphQL...\n');

    console.log('1️⃣ Test: Configuración de idiomas');
    await this.testLanguagesConfiguration();

    console.log('\n2️⃣ Test: Traducciones de post');
    await this.testPostTranslations();

    console.log('\n3️⃣ Test: Fallback de idioma');
    await this.testLanguageFallback();

    console.log('\n4️⃣ Test: Performance batch');
    await this.testBatchPerformance();

    console.log('\n5️⃣ Test: Campos SEO');
    await this.testSEOFields();

    console.log('\n✅ Tests completados');
  }
};

// Ejecutar tests
// PolylangTests.runAll();
```

---

## 5. IMPLEMENTACIÓN COMPLETA EN ASTRO

### Estructura de Archivos Recomendada

```
astro/src/
├── lib/
│   └── wordpress/
│       ├── config.js                 [existente]
│       ├── graphql-client.js         [existente]
│       ├── cache-manager.js          [existente]
│       ├── queries.js                 [actualizar]
│       ├── legal-pages-client.js     [nuevo]
│       ├── polylang-client.js        [nuevo]
│       └── seo-manager.js            [nuevo]
├── components/
│   └── legal/
│       ├── LegalPageContent.astro    [nuevo]
│       ├── LegalPageSEO.astro        [nuevo]
│       └── LanguageSwitcher.astro    [nuevo]
├── pages/
│   ├── [lang]/
│   │   ├── legal/
│   │   │   └── [slug].astro         [nuevo - dinámico]
│   │   ├── aviso-legal.astro        [eliminar - será dinámico]
│   │   ├── politica-privacidad.astro [eliminar - será dinámico]
│   │   └── politica-cookies.astro    [eliminar - será dinámico]
```

### Implementación del Cliente Polylang

```javascript
// lib/wordpress/polylang-client.js
import { GraphQLClient } from './graphql-client.js';

export class PolylangClient extends GraphQLClient {
  constructor() {
    super();
    this.languageMap = {
      'es': 'ES',
      'en': 'EN',
      'fr': 'FR',
      'ca': 'CA'
    };
  }

  normalizeLanguageCode(code) {
    return this.languageMap[code.toLowerCase()] || code.toUpperCase();
  }

  async getAvailableLanguages() {
    const query = `{
      languages {
        code
        locale
        name
        slug
        is_default
      }
    }`;

    const result = await this.query(query, {}, true);
    return result.languages;
  }

  async getTranslatedPost(postId, targetLanguage, options = {}) {
    const normalizedLang = this.normalizeLanguageCode(targetLanguage);

    const query = `
      query GetTranslatedPost($id: ID!, $lang: LanguageCodeEnum!) {
        post(id: $id, idType: DATABASE_ID) {
          id
          databaseId
          title
          content
          excerpt
          slug
          uri
          modified
          language {
            code
            locale
            name
          }
          translation(language: $lang) {
            id
            databaseId
            title
            content
            excerpt
            slug
            uri
            modified
            language {
              code
              locale
              name
            }
            seo {
              title
              metaDesc
              canonical
              metaRobotsNoindex
              opengraphTitle
              opengraphDescription
              opengraphImage {
                sourceUrl
                altText
              }
            }
          }
          translations {
            id
            databaseId
            slug
            uri
            language {
              code
              locale
              name
              slug
            }
          }
          seo {
            title
            metaDesc
            canonical
            metaRobotsNoindex
            opengraphTitle
            opengraphDescription
            opengraphImage {
              sourceUrl
              altText
            }
          }
        }
      }
    `;

    try {
      const result = await this.query(query, {
        id: postId,
        lang: normalizedLang
      }, options.useCache !== false);

      // Preparar respuesta con metadata adicional
      const response = {
        success: true,
        requestedLanguage: targetLanguage,
        originalPost: result.post,
        translatedPost: result.post?.translation || null,
        allTranslations: result.post?.translations || [],
        hasTranslation: !!result.post?.translation,
        metadata: {
          originalLanguage: result.post?.language,
          availableLanguages: this.extractAvailableLanguages(result.post)
        }
      };

      return response;
    } catch (error) {
      console.error('[Polylang] Translation error:', error);
      return {
        success: false,
        error: error.message,
        requestedLanguage: targetLanguage
      };
    }
  }

  extractAvailableLanguages(post) {
    const languages = new Set();

    // Añadir idioma original
    if (post?.language?.code) {
      languages.add(post.language.code.toLowerCase());
    }

    // Añadir traducciones disponibles
    post?.translations?.forEach(translation => {
      if (translation?.language?.code) {
        languages.add(translation.language.code.toLowerCase());
      }
    });

    return Array.from(languages);
  }

  async getPostsByLanguage(language, options = {}) {
    const {
      postType = 'POST',
      first = 10,
      categoryName = null,
      orderBy = 'DATE'
    } = options;

    const normalizedLang = this.normalizeLanguageCode(language);

    const query = `
      query GetPostsByLanguage(
        $lang: LanguageCodeFilterEnum!,
        $first: Int!,
        $categoryName: String,
        $orderBy: PostObjectsConnectionOrderbyEnum!
      ) {
        posts(
          where: {
            language: $lang,
            ${categoryName ? 'categoryName: $categoryName,' : ''}
            orderby: { field: $orderBy, order: DESC }
          },
          first: $first
        ) {
          nodes {
            id
            databaseId
            title
            excerpt
            slug
            uri
            date
            modified
            language {
              code
              locale
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            translations {
              language {
                code
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const variables = {
      lang: normalizedLang,
      first,
      orderBy,
      ...(categoryName && { categoryName })
    };

    return await this.query(query, variables, true);
  }

  generateLanguageAlternates(currentPath, translations, currentLang) {
    const alternates = [];
    const baseUrl = 'https://sauwasauna.com';

    // Generar alternate para cada traducción
    translations?.forEach(translation => {
      const lang = translation.language.code.toLowerCase();
      alternates.push({
        lang,
        url: `${baseUrl}/${lang}${translation.uri || translation.slug}`
      });
    });

    // Añadir idioma actual si no está
    if (!alternates.find(alt => alt.lang === currentLang)) {
      alternates.push({
        lang: currentLang,
        url: `${baseUrl}/${currentLang}${currentPath}`
      });
    }

    return alternates;
  }
}
```

### Actualización de Queries

```javascript
// lib/wordpress/queries.js - Añadir nuevas queries
export const QUERIES = {
  // ... queries existentes ...

  /**
   * Legal Pages Queries
   */
  GET_LEGAL_PAGE: `
    query GetLegalPage($id: ID!, $idType: PostIdType = DATABASE_ID) {
      post(id: $id, idType: $idType) {
        id
        databaseId
        title
        content
        slug
        uri
        modified
        language {
          code
          locale
          name
        }
        translations {
          id
          databaseId
          slug
          uri
          title
          language {
            code
            locale
            name
          }
        }
        seo {
          title
          metaDesc
          canonical
          metaRobotsNoindex
          opengraphTitle
          opengraphDescription
          opengraphUrl
          opengraphImage {
            sourceUrl
            altText
          }
          breadcrumbs {
            text
            url
          }
        }
      }
    }
  `,

  GET_LEGAL_PAGE_TRANSLATED: `
    query GetLegalPageTranslated($id: ID!, $lang: LanguageCodeEnum!) {
      post(id: $id, idType: DATABASE_ID) {
        ...LegalPageFields
        translation(language: $lang) {
          ...LegalPageFields
        }
        translations {
          id
          slug
          uri
          language {
            code
            locale
          }
        }
      }
    }

    fragment LegalPageFields on Post {
      id
      databaseId
      title
      content
      slug
      uri
      modified
      language {
        code
        locale
        name
      }
      seo {
        title
        metaDesc
        canonical
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
      }
    }
  `,

  GET_ALL_LEGAL_PAGES: `
    query GetAllLegalPages($language: LanguageCodeFilterEnum) {
      posts(
        where: {
          in: [94, 96, 3, 98, 102], # IDs de páginas legales
          ${language ? 'language: $language,' : ''}
          orderby: { field: MENU_ORDER, order: ASC }
        }
      ) {
        nodes {
          id
          databaseId
          title
          slug
          uri
          menuOrder
          language {
            code
          }
          translations {
            id
            slug
            language {
              code
            }
          }
        }
      }
    }
  `
};
```

### Componente Astro para Páginas Legales Dinámicas

```astro
---
// pages/[lang]/legal/[slug].astro
import Layout from '../../../layouts/Layout.astro';
import { PolylangClient } from '../../../lib/wordpress/polylang-client.js';
import { SEOManager } from '../../../lib/wordpress/seo-manager.js';

export async function getStaticPaths() {
  // Mapeo de slugs a IDs de WordPress
  const legalPages = {
    'aviso-legal': 94,
    'politica-privacidad': 98,
    'politica-cookies': 102
  };

  const languages = ['es', 'en', 'fr', 'ca'];
  const paths = [];

  for (const lang of languages) {
    for (const [slug, id] of Object.entries(legalPages)) {
      paths.push({
        params: { lang, slug },
        props: { pageId: id }
      });
    }
  }

  return paths;
}

const { lang, slug } = Astro.params;
const { pageId } = Astro.props;

// Cliente será usado en el navegador
const clientScript = `
  import { PolylangClient } from '/src/lib/wordpress/polylang-client.js';

  async function loadLegalContent() {
    const client = new PolylangClient();
    const pageId = ${pageId};
    const language = '${lang}';

    try {
      const response = await client.getTranslatedPost(pageId, language);

      if (response.success) {
        const content = response.translatedPost || response.originalPost;

        // Actualizar contenido
        document.getElementById('legal-title').textContent = content.title;
        document.getElementById('legal-content').innerHTML = content.content;
        document.getElementById('legal-modified').textContent =
          new Date(content.modified).toLocaleDateString('${lang}');

        // Actualizar SEO
        if (content.seo) {
          document.title = content.seo.title || content.title;
          updateMetaTag('description', content.seo.metaDesc);
          updateMetaTag('og:title', content.seo.opengraphTitle);
          updateMetaTag('og:description', content.seo.opengraphDescription);
        }

        // Generar language switcher
        generateLanguageSwitcher(response.allTranslations);
      }
    } catch (error) {
      console.error('Error loading legal content:', error);
      document.getElementById('legal-content').innerHTML =
        '<p>Error cargando el contenido. Por favor, recarga la página.</p>';
    }
  }

  function updateMetaTag(name, content) {
    if (!content) return;

    let meta = document.querySelector(\`meta[name="\${name}"]\`) ||
               document.querySelector(\`meta[property="\${name}"]\`);

    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute(name.includes(':') ? 'property' : 'name', name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  }

  function generateLanguageSwitcher(translations) {
    const switcher = document.getElementById('language-switcher');
    if (!switcher || !translations) return;

    const languages = {
      'es': '🇪🇸 Español',
      'en': '🇬🇧 English',
      'fr': '🇫🇷 Français',
      'ca': 'Català'
    };

    switcher.innerHTML = translations.map(trans => {
      const langCode = trans.language.code.toLowerCase();
      return \`
        <a href="/\${langCode}/legal/\${trans.slug}"
           class="lang-option \${langCode === '${lang}' ? 'active' : ''}">
          \${languages[langCode] || trans.language.name}
        </a>
      \`;
    }).join('');
  }

  // Cargar contenido al iniciar
  document.addEventListener('DOMContentLoaded', loadLegalContent);
`;
---

<Layout title="Cargando..." description="Página legal" lang={lang}>
  <main class="legal-page">
    <div class="container">
      <div id="language-switcher" class="language-switcher"></div>

      <h1 id="legal-title" class="legal-title">
        <span class="skeleton-text">Cargando contenido legal...</span>
      </h1>

      <p class="legal-date">
        Última actualización: <span id="legal-modified">--</span>
      </p>

      <div id="legal-content" class="legal-content">
        <div class="skeleton-loader">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    </div>
  </main>

  <script type="module" set:html={clientScript}></script>
</Layout>

<style>
  .legal-page {
    min-height: 100vh;
    padding: var(--spacing-32) var(--spacing-8);
    background: var(--color-white);
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .language-switcher {
    display: flex;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-8);
    justify-content: flex-end;
  }

  .lang-option {
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--color-text);
    transition: background-color 0.2s;
  }

  .lang-option:hover {
    background-color: var(--color-gray-100);
  }

  .lang-option.active {
    background-color: var(--color-accent);
    color: var(--color-white);
  }

  .legal-title {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    color: var(--color-accent);
    margin-bottom: var(--spacing-4);
  }

  .legal-date {
    color: var(--color-gray-600);
    font-style: italic;
    margin-bottom: var(--spacing-12);
  }

  .legal-content {
    line-height: 1.7;
    color: var(--color-text);
  }

  /* Skeleton loader */
  .skeleton-text,
  .skeleton-line {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: var(--radius-sm);
  }

  .skeleton-line {
    height: 1rem;
    margin-bottom: var(--spacing-2);
  }

  .skeleton-line:nth-child(1) { width: 90%; }
  .skeleton-line:nth-child(2) { width: 100%; }
  .skeleton-line:nth-child(3) { width: 85%; }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Estilos para contenido legal cargado dinámicamente */
  .legal-content :global(h2) {
    font-size: var(--text-2xl);
    color: var(--color-accent);
    margin: var(--spacing-8) 0 var(--spacing-4);
  }

  .legal-content :global(h3) {
    font-size: var(--text-xl);
    color: var(--color-text);
    margin: var(--spacing-6) 0 var(--spacing-3);
  }

  .legal-content :global(p) {
    margin-bottom: var(--spacing-4);
  }

  .legal-content :global(ul) {
    margin: var(--spacing-4) 0;
    padding-left: var(--spacing-8);
  }

  .legal-content :global(li) {
    margin-bottom: var(--spacing-2);
  }

  .legal-content :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
  }

  .legal-content :global(a:hover) {
    opacity: 0.8;
  }
</style>
```

---

## 6. OPTIMIZACIONES Y MEJORES PRÁCTICAS

### Cache Strategy Avanzada

```javascript
// lib/wordpress/cache-strategies.js
export class AdvancedCacheManager {
  constructor() {
    this.strategies = {
      legal: {
        duration: 24 * 60 * 60 * 1000, // 24 horas para contenido legal
        priority: 'high',
        compress: true
      },
      posts: {
        duration: 5 * 60 * 1000, // 5 minutos para posts
        priority: 'medium',
        compress: false
      },
      navigation: {
        duration: 60 * 60 * 1000, // 1 hora para navegación
        priority: 'high',
        compress: false
      }
    };
  }

  async setWithStrategy(key, data, strategy = 'posts') {
    const config = this.strategies[strategy];

    if (config.compress) {
      data = this.compress(data);
    }

    const cacheEntry = {
      data,
      timestamp: Date.now(),
      expires: Date.now() + config.duration,
      strategy,
      compressed: config.compress
    };

    try {
      localStorage.setItem(key, JSON.stringify(cacheEntry));

      // Limpiar cache antiguo si es necesario
      if (config.priority === 'high') {
        this.cleanOldEntries();
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        this.clearByPriority('low');
        localStorage.setItem(key, JSON.stringify(cacheEntry));
      }
    }
  }

  compress(data) {
    // Implementar compresión simple
    return JSON.stringify(data);
  }

  decompress(data) {
    return typeof data === 'string' ? JSON.parse(data) : data;
  }

  cleanOldEntries() {
    const now = Date.now();
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (item.expires && item.expires < now) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        // Ignorar entradas no válidas
      }
    });
  }

  clearByPriority(priority) {
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        const itemPriority = this.strategies[item.strategy]?.priority || 'low';

        if (itemPriority === priority) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        // Ignorar entradas no válidas
      }
    });
  }
}
```

### Performance Monitoring

```javascript
// lib/wordpress/performance-monitor.js
export class PerformanceMonitor {
  static trackQuery(queryName, duration, cacheHit = false) {
    if (typeof window === 'undefined') return;

    // Enviar a Google Analytics o sistema de monitoreo
    if (window.gtag) {
      window.gtag('event', 'graphql_query', {
        event_category: 'Performance',
        event_label: queryName,
        value: duration,
        cache_hit: cacheHit
      });
    }

    // Log para desarrollo
    console.log(`[Performance] ${queryName}: ${duration}ms (${cacheHit ? 'cache' : 'network'})`);

    // Almacenar métricas localmente
    const metrics = JSON.parse(localStorage.getItem('graphql_metrics') || '[]');
    metrics.push({
      query: queryName,
      duration,
      cacheHit,
      timestamp: Date.now()
    });

    // Mantener solo las últimas 100 métricas
    if (metrics.length > 100) {
      metrics.shift();
    }

    localStorage.setItem('graphql_metrics', JSON.stringify(metrics));
  }

  static getAverageQueryTime(queryName) {
    const metrics = JSON.parse(localStorage.getItem('graphql_metrics') || '[]');
    const queryMetrics = metrics.filter(m => m.query === queryName);

    if (queryMetrics.length === 0) return 0;

    const sum = queryMetrics.reduce((acc, m) => acc + m.duration, 0);
    return Math.round(sum / queryMetrics.length);
  }

  static getCacheHitRate() {
    const metrics = JSON.parse(localStorage.getItem('graphql_metrics') || '[]');
    if (metrics.length === 0) return 0;

    const cacheHits = metrics.filter(m => m.cacheHit).length;
    return Math.round((cacheHits / metrics.length) * 100);
  }
}
```

---

## 7. TROUBLESHOOTING COMÚN

### Problemas y Soluciones

#### Problema 1: Post ID 94 no devuelve datos
**Causa**: El post puede estar en borrador o no publicado
**Solución**:
```graphql
query CheckPostStatus($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
    status
    title
  }
}
```

#### Problema 2: Campo `translation` devuelve null
**Causa**: La traducción no existe o Polylang no está configurado correctamente
**Solución**:
1. Verificar en WordPress Admin que las traducciones estén vinculadas
2. Usar el campo `translations` para obtener todas las disponibles
3. Implementar fallback a idioma por defecto

#### Problema 3: CORS errors en producción
**Causa**: Headers no configurados en WordPress
**Solución**:
```php
// functions.php
add_filter('graphql_response_headers_to_send', function($headers) {
    $headers['Access-Control-Allow-Origin'] = 'https://sauwasauna.com';
    $headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
    $headers['Access-Control-Allow-Headers'] = 'Content-Type';
    return $headers;
});
```

#### Problema 4: Cache no se invalida al actualizar contenido
**Causa**: TTL muy largo o no hay webhook configurado
**Solución**:
```javascript
// Implementar webhook listener
async function handleWebhook(request) {
  const { postId, action } = await request.json();

  if (action === 'post_updated') {
    // Limpiar cache específico
    const cache = new CacheManager();
    cache.remove(`post_${postId}_*`);
  }
}
```

---

## 8. RECOMENDACIONES FINALES

### Checklist de Implementación

- [ ] **WordPress Backend**
  - [ ] Verificar que Polylang está activo y configurado
  - [ ] Confirmar que WPGraphQL Polylang está instalado
  - [ ] Crear/verificar páginas legales con IDs correctos
  - [ ] Vincular traducciones en Polylang
  - [ ] Configurar campos SEO con Yoast

- [ ] **GraphQL Testing**
  - [ ] Ejecutar suite de tests completa
  - [ ] Verificar campos de traducción
  - [ ] Confirmar estructura de SEO
  - [ ] Medir performance de queries

- [ ] **Frontend Implementation**
  - [ ] Implementar PolylangClient
  - [ ] Crear páginas dinámicas
  - [ ] Configurar language switcher
  - [ ] Implementar skeleton loaders
  - [ ] Añadir cache strategy

- [ ] **SEO & Performance**
  - [ ] Generar hreflang tags
  - [ ] Implementar structured data
  - [ ] Configurar cache headers
  - [ ] Optimizar bundle size
  - [ ] Medir Core Web Vitals

### Mejoras Futuras

1. **Service Worker para Offline Support**
```javascript
// sw.js
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/graphql')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
```

2. **Implementar Persisted Queries**
```javascript
// Reducir payload usando hashes de queries
const persistedQueries = {
  'legal_page_query': 'hash_abc123',
  'translations_query': 'hash_def456'
};
```

3. **GraphQL Subscriptions para Updates en Tiempo Real**
```javascript
// Usar WebSockets para actualizaciones
const subscription = client.subscribe({
  query: LEGAL_PAGE_UPDATES,
  variables: { pageId }
});
```

---

## Conclusión

La implementación propuesta en la tarea WDA-556 es correcta en su concepto pero requiere ajustes técnicos importantes:

1. **Cambiar `LanguageCodeFilterEnum` por `LanguageCodeEnum` en el campo translation**
2. **Implementar sistema de fallback robusto para idiomas**
3. **Aprovechar el campo `translations` para obtener todas las versiones**
4. **Optimizar cache con estrategias diferenciadas por tipo de contenido**
5. **Implementar monitoreo de performance**

El sistema está bien configurado en WordPress con Polylang y WPGraphQL. La arquitectura propuesta permitirá una gestión eficiente del contenido multiidioma con excelente performance y SEO.