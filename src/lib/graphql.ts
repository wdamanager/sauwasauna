/**
 * GraphQL Client for WordPress
 * 
 * Simple fetch-based GraphQL client.
 * For more complex needs, consider graphql-request or Apollo Client.
 */

const GRAPHQL_URL = import.meta.env.WORDPRESS_GRAPHQL_URL || 'http://localhost/graphql';

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

/**
 * Execute a GraphQL query
 */
export async function graphqlQuery<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(`GraphQL Error: ${result.errors[0].message}`);
    }

    if (!result.data) {
      throw new Error('No data returned from GraphQL');
    }

    return result.data;
  } catch (error) {
    console.error('GraphQL Query Error:', error);
    throw error;
  }
}

/**
 * Example: Fetch all posts
 */
export async function getAllPosts() {
  const query = `
    query GetAllPosts {
      posts(first: 100) {
        nodes {
          id
          title
          excerpt
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  const data = await graphqlQuery<{ posts: any }>(query);
  return data.posts.nodes;
}

/**
 * Example: Fetch single post by slug
 */
export async function getPostBySlug(slug: string) {
  const query = `
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
      }
    }
  `;

  const data = await graphqlQuery<{ post: any }>(query, { slug });
  return data.post;
}
