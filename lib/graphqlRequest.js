export default async function graphqlRequest(query) {
  const url = "https://wp.hypedigital.de/graphql";
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(query),
  });

  const resJson = await res.json();
  return resJson;
}
