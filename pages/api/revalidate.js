export default async function handler(req, res) {
  const secret = process.env.REVALIDATION_SECRET;

  // Validate the secret token
  if (req.query.secret !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { id, slug, type } = req.body;

    console.log("Revalidation request received:", req.body);

    if (!slug || !type) {
      return res
        .status(400)
        .json({ error: "Missing required fields: slug or type." });
    }

    // Revalidate the specific page based on type
    if (type === "post") {
      // Revalidate the individual post page
      await res.revalidate(`/blog/${slug}`);

      // Revalidate the blog index page
      await res.revalidate("/blog");
    } else if (type === "page") {
      // Revalidate a static page
      await res.revalidate(`/${slug}`);
    } else if (type === "home") {
      // Revalidate the blog index page
      await res.revalidate("/blog");
    } else {
      return res.status(400).json({ error: "Invalid type specified." });
    }

    res.status(200).json({ message: "Revalidation successful!" });
  } catch (error) {
    console.error("Error during revalidation:", error);
    res.status(500).json({ error: "Revalidation failed!" });
  }
}
