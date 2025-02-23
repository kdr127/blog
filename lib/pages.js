import graphqlRequest from "./graphqlRequest";

export async function getPageSlugs() {
  const query = {
    query: `query getPageSlugs {
      pages {
        nodes {
          slug
        }
      }
    }`,
  };

  const resJson = await graphqlRequest(query);
  const pageSlugs = resJson.data.pages.nodes;
  return pageSlugs;
}

export async function getSinglePage(slug) {
  const query = {
    query: `query getSinglePage {
      pages(where: {name: "${slug}"}) {
        nodes {
          content(format: RENDERED)
          date
          slug
          title(format: RENDERED)
          modified
        }
      }
    }`,
  };

  const resJson = await graphqlRequest(query);
  const pageData = resJson.data.pages.nodes[0];
  return pageData;
}
