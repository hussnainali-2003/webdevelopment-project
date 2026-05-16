// Lab 3 — Tesla Shop with auth (sessions, bcrypt, roles, flash)
require('dotenv').config();
const express        = require('express');
const path           = require('path');
const mongoose       = require('mongoose');
const session        = require('express-session');
const MongoStore     = require('connect-mongo');
const flash          = require('connect-flash');
const methodOverride = require('method-override');

const productsRouter = require('./routes/products');
const adminRouter    = require('./routes/admin');
const authRouter     = require('./routes/auth');
const { isAdmin }    = require('./middleware/auth');

const app  = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI      = process.env.MONGO_URI      || 'mongodb://127.0.0.1:27017/tesla_shop';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-change-me';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sessions stored in Mongo
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store:  MongoStore.create({ mongoUrl: MONGO_URI, collectionName: 'sessions' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }    // 7 days
}));
app.use(flash());

// Expose user + flash to all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.success     = req.flash('success');
  res.locals.error       = req.flash('error');
  next();
});

// Routes
app.get('/', (req, res) => res.redirect('/products'));
app.use('/',         authRouter);                  // /register, /login, /logout
app.use('/products', productsRouter);
app.use('/admin',    isAdmin, adminRouter);        // ← protected

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✔ MongoDB connected');
    app.listen(PORT, () => console.log(`Tesla L3 → http://localhost:${PORT}`));
  })
  .catch(err => { console.error(err); process.exit(1); });
