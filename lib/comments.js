import graphqlRequest from "./graphqlRequest";

// export async function createComment(body) {
//   const mutation = {
//     query: `mutation createComment(
//       $author: String = "${body.author}",
//       $authorEmail: String = "${body.authorEmail}",
//       $clientMutationId: String = "uniqueId",
//       $commentOn: Int = ${parseInt(body.postId)},
//       $content: String = "${body.content}") {
//         createComment(
//           input: {
//             author: $author,
//             authorEmail: $authorEmail,
//             clientMutationId: $clientMutationId,
//             content: $content,
//             commentOn: $commentOn
//           }
//           success
//         ) {
//       }
//     }`,
//   };

//   const resJson = await graphqlRequest(mutation);
//   return resJson;
// }

export async function createComment(body) {
  const mutation = {
    query: `
      mutation createComment(
        $author: String!
        $authorEmail: String!
        $clientMutationId: String!
        $commentOn: Int!
        $content: String!
      ) {
        createComment(
          input: {
            author: $author
            authorEmail: $authorEmail
            clientMutationId: $clientMutationId
            content: $content
            commentOn: $commentOn
          }
        ) {
          comment {
            id
            content
          }
          success
        }
      }
    `,
    variables: {
      author: body.author,
      authorEmail: body.authorEmail,
      clientMutationId: "uniqueId", // generate unique ID if needed
      commentOn: parseInt(body.postId, 10),
      content: body.content,
    },
  };

  try {
    const resJson = await graphqlRequest(mutation);
    return resJson;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function getComments(slug) {
  const query = {
    query: `query getComments {
            post(id: "${slug}", idType: SLUG) {
              comments(where: {parentIn: "null"}) {
                nodes {
                  content
                  author {
                    node {
                      name
                      avatar {
                        url
                        height
                        width
                      }
                    }
                  }
                  date
                  parentId
                  id
                }
              }
              commentCount
            }
          }`,
  };

  const resJson = await graphqlRequest(query);
  console.log(resJson.data.post);
  const comments = resJson.data.post.comments;
  const commentCount = resJson.data.post.commentCount;

  return {
    comments: comments,
    commentCount: commentCount,
  };
}
