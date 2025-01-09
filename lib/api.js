// Set a variable that contains all the fields needed for posts when a fetch for
// content is performed
const POST_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  thumbnail {
    url
    description
  }
  featuredImage {
    url
    description
  }
  body
  post {
    json
  }
`;

async function fetchGraphQL(query, preview = false) {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query }),
      }
    );
    const data = await response.json();
    console.log("GraphQL Response:", data); // Log the response here
    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
    }
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getAllPosts(limit = 10, isDraftMode = false) {
  const query = `
    query {
      postsCollection(order: sys_publishedAt_DESC, limit: ${limit}, preview: ${isDraftMode}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;
  const response = await fetchGraphQL(query, isDraftMode);
  return response?.data?.postsCollection?.items || [];
}

export async function getPost(slug, isDraftMode = false) {
  const query = `
    query {
      postsCollection(where: { slug: "${slug}" }, limit: 1, preview: ${isDraftMode}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;
  const response = await fetchGraphQL(query, isDraftMode);
  return response?.data?.postsCollection?.items[0] || null;
}
