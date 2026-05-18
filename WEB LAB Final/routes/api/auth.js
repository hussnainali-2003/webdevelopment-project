const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { user_id: user._id.toString(), role: user.role },
    config.get('jwtSecret'),
    { expiresIn: config.get('jwtExpiresIn') }
  );
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;