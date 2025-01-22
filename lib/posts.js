import graphqlRequest from "./graphqlRequest";

export async function getPostList(endCursor = null) {
  const query = {
    query: `query getPostList($after: String, $first: Int) {
      posts(after: $after, first: $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          title
          slug
          databaseId
          date
          excerpt(format: RENDERED)
          featuredImage {
            node {
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }`,
    variables: {
      after: endCursor,
      first: 3,
    },
  };

  try {
    const resJson = await graphqlRequest(query);
    const postList = resJson.data.posts;
    return postList;
  } catch (error) {
    console.error("Error fetching post list:", error);
    throw error;
  }
}

export async function getSinglePost(slug) {
  const query = {
    query: `query getSinglePost { post(id: "${slug}", idType: SLUG) {
      content(format: RENDERED)
      excerpt(format: RENDERED)
      modified
      date
      slug
      featuredImage {
        node {
          mediaDetails {
            sizes {
              width
              height
              sourceUrl
            }
          }
        }
      }
      title
      databaseId
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }`,
  };

  const resJson = await graphqlRequest(query);
  const singlePost = resJson.data.post;
  return singlePost;
}

export async function getPostSlugs() {
  const query = {
    query: `
      query getPostSlugs {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  };

  const resJson = await graphqlRequest(query);
  const slugs = resJson.data.posts.nodes;
  return slugs;
}

export async function getCategorySlugs() {
  const query = {
    query: `query getCategorySlugs {
      categories {
        nodes {
          slug
        }
      }
    }`,
  };

  const resJson = await graphqlRequest(query);
  const categories = resJson.data.categories.nodes;
  return categories;
}

export async function getCategoryDetails(categoryName) {
  const query = {
    query: `query getCategoryDetails {
      category(id: "${categoryName}", idType: SLUG) {
        count
        name
        slug
      }
    }`,
  };

  const resJson = await graphqlRequest(query);
  const categoryDetails = resJson.data.category;
  return categoryDetails;
}
