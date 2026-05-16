// Lab Task 2 — Express + EJS port of the Tesla landing page
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets (CSS, JS, images)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Vehicle data passed to the EJS template
const vehicles = [
  { id: 'model-y', name: 'Model Y', tagline: 'Schedule a Demo Drive',  image: '/public/images/model-y.jpg', secondary: 'Learn More' },
  { id: 'model-3', name: 'Model 3', tagline: 'From $299/mo*',           image: '/public/images/model-3.jpg', secondary: 'Demo Drive' },
  { id: 'model-s', name: 'Model S', tagline: 'Plaid — 1,020 hp',        image: '/public/images/model-s.jpg', secondary: 'Learn More' },
  { id: 'model-x', name: 'Model X', tagline: 'Falcon Wing Doors',       image: '/public/images/model-x.jpg', secondary: 'Learn More' },
];

app.get('/', (req, res) => {
  res.render('index', { title: 'Tesla | Electric Cars, Solar & Clean Energy', vehicles });
});

app.listen(PORT, () => {
  console.log(`Tesla L2 server running → http://localhost:${PORT}`);
});
