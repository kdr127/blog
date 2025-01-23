// export default async function handler(req, res) {
//   let slug = req.query.slug;
//   let path = "";

//   if (req.query.type === "post") {
//     path = "/blog/" + slug;
//   } else if (req.query.type === "page") {
//     path = "/" + slug;
//   } else if (req.query.type === "home") {
//     // dann kanns ja nur noch die blog index sein weisch
//     path = "/blog";
//   }

//   if (req.query.secret !== process.env.REVALIDATION_SECRET) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   try {
//     await res.revalidate(path);
//     return res.json({ revalidated: true });
//   } catch (err) {
//     //TODO check errorToJSON next function
//     return res.status(500).send(err.message);
//   }
// }

export default async function handler(req, res) {
  const secret = process.env.REVALIDATION_SECRET;

  // Validate the secret token
  if (req.query.secret !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { id, slug, type } = req.body;

    console.log("Revalidation request received:", req.body);

    if (type === "post") {
      await res.revalidate(`/blog/${slug}`);
    } else if (type === "page") {
      await res.revalidate(`/${slug}`);
    }

    res.status(200).json({ message: "Revalidation successful!" });
  } catch (error) {
    console.error("Error during revalidation:", error);
    res.status(500).json({ error: "Revalidation failed!" });
  }
}
