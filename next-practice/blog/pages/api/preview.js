export default function handler(req, res) {
  if (req.query.token !== 'oneny' || !req.query.post) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  console.log('hihih')
  res.setPreviewData({});

  res.redirect(`/posts/${req.query.post}`);
}
