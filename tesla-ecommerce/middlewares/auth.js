// Session-based guards used by EJS routes
exports.isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) return next();
  req.flash('error', 'Please log in to continue.');
  return res.redirect('/auth/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') return next();
  if (!req.session || !req.session.user) {
    req.flash('error', 'Please log in as an admin.');
    return res.redirect('/auth/login');
  }
  req.flash('error', 'Access Denied — admins only.');
  return res.redirect('/');
};