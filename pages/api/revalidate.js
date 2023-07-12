export default async function handler(req, res) {
    if (req.query.secret !== process.env.TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
   
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      const path = req.query.path;
      await res.revalidate(path);
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }