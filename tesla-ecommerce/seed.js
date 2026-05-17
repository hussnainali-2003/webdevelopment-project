const mongoose = require('mongoose');
const config = require('config');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

const categories = [
  { name: 'Vehicles',    description: 'Electric vehicles built for the future of driving.' },
  { name: 'Energy',      description: 'Home batteries, solar panels and storage solutions.' },
  { name: 'Charging',    description: 'Home and travel charging hardware.' },
  { name: 'Apparel',     description: 'Tesla-branded clothing and accessories.' },
  { name: 'Accessories', description: 'Add-ons and gear for your Tesla.' }
];

const products = [
  // Vehicles
  { name: 'Model S Plaid', description: 'The quickest accelerating sedan ever built.', price: 89990, category: 'Vehicles', rating: 4.9, stock: 12, image: '/images/products/model-s.jpg' },
  { name: 'Model 3 Long Range', description: 'Efficient, agile, and affordable.', price: 47490, category: 'Vehicles', rating: 4.8, stock: 25, image: '/images/products/model-3.jpg' },
  { name: 'Model X Plaid', description: 'Falcon-wing doors and ludicrous speed.', price: 99990, category: 'Vehicles', rating: 4.7, stock: 8, image: '/images/products/model-x.jpg' },
  { name: 'Model Y Performance', description: 'The mid-size SUV redefined.', price: 52490, category: 'Vehicles', rating: 4.8, stock: 30, image: '/images/products/model-y.jpg' },
  { name: 'Cybertruck Tri-Motor', description: 'Built for any planet.', price: 99990, category: 'Vehicles', rating: 4.6, stock: 4, image: '/images/products/cybertruck.jpg' },
  { name: 'Roadster', description: '0–60 in 1.9s. The next generation.', price: 200000, category: 'Vehicles', rating: 5.0, stock: 2, image: '/images/products/roadster.jpg' },

  // Energy
  { name: 'Powerwall 3', description: 'Home backup battery, 13.5 kWh.', price: 9200, category: 'Energy', rating: 4.7, stock: 50, image: '/images/products/powerwall.jpg' },
  { name: 'Solar Roof', description: 'Glass tiles that generate energy.', price: 21900, category: 'Energy', rating: 4.5, stock: 15, image: '/images/products/solar-roof.jpg' },
  { name: 'Solar Panels 4kW', description: 'Rooftop solar starter kit.', price: 8500, category: 'Energy', rating: 4.4, stock: 40, image: '/images/products/solar-panels.jpg' },
  { name: 'Megapack', description: 'Utility-scale storage solution.', price: 250000, category: 'Energy', rating: 4.9, stock: 3, image: '/images/products/megapack.jpg' },

  // Charging
  { name: 'Wall Connector Gen 3', description: 'Fast home charging up to 48A.', price: 475, category: 'Charging', rating: 4.8, stock: 120, image: '/images/products/wall-connector.jpg' },
  { name: 'Mobile Connector Bundle', description: 'Plug into common outlets.', price: 230, category: 'Charging', rating: 4.6, stock: 200, image: '/images/products/mobile-connector.jpg' },

  // Apparel
  { name: 'Cyberhammer Tee', description: 'Heavyweight cotton, Cybertruck graphic.', price: 35, category: 'Apparel', rating: 4.4, stock: 150, image: '/images/products/tesla-tee.jpg' },
  { name: 'Tesla Logo Cap', description: '6-panel structured cap.', price: 30, category: 'Apparel', rating: 4.5, stock: 200, image: '/images/products/tesla-cap.jpg' },

  // Accessories
  { name: 'All-Weather Floor Mats (Model Y)', description: 'Custom-fit, easy clean.', price: 225, category: 'Accessories', rating: 4.7, stock: 60, image: '/images/products/floor-mats.jpg' },
  { name: 'Key Fob', description: 'Premium Tesla key fob.', price: 175, category: 'Accessories', rating: 4.6, stock: 80, image: '/images/products/key-fob.jpg' }
];

(async () => {
  await mongoose.connect(config.get('mongoURI'));
  console.log('Connected. Wiping & seeding…');
  await Product.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});

  for (const c of categories) await Category.create(c);
  console.log(`✓ Seeded ${categories.length} categories`);

  for (const p of products) await Product.create(p);
  console.log(`✓ Seeded ${products.length} products`);

  await User.create({ name: 'Tesla Admin', email: 'admin@tesla.com', password: 'admin123', role: 'admin' });
  await User.create({ name: 'Test Customer', email: 'customer@tesla.com', password: 'customer123', role: 'customer' });
  console.log('✓ Seeded admin@tesla.com / admin123 and customer@tesla.com / customer123');

  await mongoose.disconnect();
  process.exit(0);
})().catch(err => { console.error(err); process.exit(1); });
