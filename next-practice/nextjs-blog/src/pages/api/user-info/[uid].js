export default function handler(req, res) {
  const { uid } = req.query
  // res.status(200).json({ name: `oneny ${uid}` })
  // res.status(404).send({ error: 'error' })
  res.redirect(307, 'api/user');
}
