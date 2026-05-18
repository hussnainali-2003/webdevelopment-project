const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Sign In' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    req.flash('error', 'Invalid email or password.');
    return res.redirect('/auth/login');
  }
  req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
  req.flash('success', `Welcome back, ${user.name}!`);
  res.redirect(user.role === 'admin' ? '/admin' : '/');
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Create account' });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) {
    req.flash('error', 'All fields required, password ≥ 6 chars.');
    return res.redirect('/auth/register');
  }
  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      req.flash('error', 'Email already in use.');
      return res.redirect('/auth/register');
    }
    const user = await User.create({ name, email, password });
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    req.flash('success', `Welcome to Tesla, ${user.name}!`);
    res.redirect('/');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/auth/register');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;