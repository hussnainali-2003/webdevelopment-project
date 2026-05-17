const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { verifyToken } = require('../middleware/auth');
const router  = express.Router();

function sign(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: process.env.JWT_EXPIRES || '7d' }
  );
}

// POST /api/v1/auth/register
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const user  = await User.create({ name, email, password });
    const token = sign(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/v1/auth/login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user || !(await user.compare(password))) return res.status(401).json({ error: 'Invalid credentials' });
    const token = sign(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/v1/profile
router.get('/profile', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
