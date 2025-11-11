/**
 * Predefined GraphQL Queries
 * Queries reutilizables para WordPress
 */

export const QUERIES = {
  /**
   * Get latest posts with pagination
   */
  GET_POSTS: `
    query GetPosts($first: Int = 6, $after: String) {
      posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
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
        }
      }
    }
  `,

  /**
   * Get single post by slug
   */
  GET_POST_BY_SLUG: `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        excerpt
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
};
