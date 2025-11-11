/**
 * Predefined GraphQL Queries
 * Queries reutilizables para WordPress
 */

export const QUERIES = {
  /**
   * Get latest posts with pagination and Polylang language support
   * WDA-561: Added language filtering for production deployment
   */
  GET_POSTS: `
    query GetPosts($first: Int = 6, $after: String, $lang: LanguageCodeFilterEnum!) {
      posts(first: $first, after: $after, where: {
        orderby: { field: DATE, order: DESC },
        language: $lang
      }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          excerpt
          slug
          date
          language {
            code
            locale
            name
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
            id
            slug
            language {
              code
            }
          }
        }
      }
    }
  `,

  /**
   * Get single post by slug with Polylang language support
   * WDA-562: Added language support for individual post pages
   */
  GET_POST_BY_SLUG: `
    query GetPostBySlug($slug: ID!, $lang: LanguageCodeEnum) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        excerpt
        language {
          code
          locale
          name
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          title
          metaDesc
        }
        categories {
          nodes {
            name
            slug
          }
        }
        translations {
          id
          slug
          language {
            code
            locale
          }
        }
      }
    }
  `,

  /**
   * Get all categories with post count
   * Only returns categories that have at least one post
   * Ordered alphabetically by name
   */
  GET_CATEGORIES: `
    query GetCategories($first: Int = 100, $hideEmpty: Boolean = true) {
      categories(
        first: $first
        where: {
          hideEmpty: $hideEmpty,
          orderby: NAME,
          order: ASC
        }
      ) {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `,

  /**
   * Get legal page by ID with Polylang translation support
   * WDA-556: Using 'page' instead of 'post' (legal pages are WordPress Pages)
   */
  GET_LEGAL_PAGE_TRANSLATED: `
    query GetLegalPageTranslated($id: ID!, $lang: LanguageCodeEnum!) {
      page(id: $id, idType: DATABASE_ID) {
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
        translation(language: $lang) {
          id
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
            metaRobotsNoindex
          }
        }
        translations {
          id
          slug
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
  `,

  /**
   * Get all published posts for sitemap generation
   * WDA-555: Dynamic sitemap implementation
   * Fetches posts with SEO metadata to build frontend sitemap
   * Excludes posts marked as noindex in Yoast SEO
   */
  GET_ALL_POSTS_FOR_SITEMAP: `
    query GetAllPostsForSitemap($first: Int = 1000) {
      posts(
        first: $first,
        where: {
          status: PUBLISH,
          orderby: { field: MODIFIED, order: DESC }
        }
      ) {
        nodes {
          id
          slug
          modified
          date
          seo {
            metaRobotsNoindex
            metaRobotsNofollow
            canonical
            opengraphModifiedTime
          }
        }
      }
    }
  `,
};
