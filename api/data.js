module.exports = (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    const { input } = req.body;
    res.json({ received: input });
  };