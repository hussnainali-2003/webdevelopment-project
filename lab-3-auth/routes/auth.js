const express = require('express');
const User    = require('../models/User');
const router  = express.Router();

// ---- Register ----
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Create account' });
});
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      req.flash('error', 'All fields are required.');
      return res.redirect('/register');
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      req.flash('error', 'An account with that email already exists.');
      return res.redirect('/register');
    }
    const user = await User.create({ name, email, password });
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    req.flash('success', `Welcome, ${user.name}!`);
    res.redirect('/products');
  } catch (e) { next(e); }
});

// ---- Login ----
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Log in' });
});
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user || !(await user.compare(password))) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
    }
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect(user.role === 'admin' ? '/admin' : '/products');
  } catch (e) { next(e); }
});

// ---- Logout ----
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
