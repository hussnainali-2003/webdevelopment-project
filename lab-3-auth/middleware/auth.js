// Auth middleware
exports.isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) return next();
  req.flash('error', 'Please log in to continue.');
  res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') return next();
  req.flash('error', 'Admins only.');
  res.redirect('/login');
};
