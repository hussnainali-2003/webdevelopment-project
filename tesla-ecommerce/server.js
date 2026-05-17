const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const logger = require('./middlewares/logger');
const globalLocals = require('./middlewares/global');
const { isAdmin } = require('./middlewares/auth');

const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/shop/products');
const authRoutes = require('./routes/auth/index');
const adminIndexRoutes = require('./routes/admin/index');
const adminProductRoutes = require('./routes/admin/products');
const adminCategoryRoutes = require('./routes/admin/categories');
const adminOrderRoutes = require('./routes/admin/orders');

const apiAuthRoutes = require('./routes/api/auth');
const apiProductRoutes = require('./routes/api/products');
const apiOrderRoutes = require('./routes/api/orders');
const apiUserRoutes = require('./routes/api/user');

const app = express();
const PORT = config.get('port');
const MONGO_URI = config.get('mongoURI');

mongoose.connect(MONGO_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB error:', err.message));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Body, cookies, static
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Sessions (stored in MongoDB)
app.use(session({
  secret: config.get('sessionSecret'),
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
app.use(flash());

// Custom middleware
app.use(logger);
app.use(globalLocals);

// Admin layout switch
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin-layout';
  next();
});

// Public routes
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// Admin routes (all protected by isAdmin)
app.use('/admin', isAdmin, adminIndexRoutes);
app.use('/admin/products', isAdmin, adminProductRoutes);
app.use('/admin/categories', isAdmin, adminCategoryRoutes);
app.use('/admin/orders', isAdmin, adminOrderRoutes);

// REST API v1
app.use('/api/v1/auth', apiAuthRoutes);
app.use('/api/v1/products', apiProductRoutes);
app.use('/api/v1/orders', apiOrderRoutes);
app.use('/api/v1/user', apiUserRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500', { title: 'Server Error', error: err.message });
});

app.listen(PORT, () => console.log(`✓ Tesla store running at http://localhost:${PORT}`));
