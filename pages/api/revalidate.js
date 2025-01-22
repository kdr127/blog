import { errorToJSON } from "next/dist/server/render";

export default async function handler(req, res) {
  let slug = req.query.slug;
  let path = "";

  if (req.query.type === "post") {
    path = "/blog/" + slug;
  } else if (req.query.type === "page") {
    path = "/" + slug;
  } else if (req.query.type === "home") {
    // dann kanns ja nur noch die blog index sein weisch
    path = "/blog";
  }

  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send(err.message); //TODO check errorToJSON next function
  }
}
