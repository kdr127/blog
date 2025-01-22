export default async function graphqlRequest(query) {
  //TODO secret
  const url = "https://wp.kksen.de/graphql";
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(query),
  });

  const resJson = await res.json();
  return resJson;
}
