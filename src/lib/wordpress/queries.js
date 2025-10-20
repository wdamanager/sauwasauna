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
};
