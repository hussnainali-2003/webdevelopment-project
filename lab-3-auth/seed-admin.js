// Create an initial admin user. Run with: npm run seed:admin
require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesla_shop';

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const email = 'admin@tesla.local';
    await User.deleteOne({ email });
    const u = await User.create({ name: 'Tesla Admin', email, password: 'admin123', role: 'admin' });
    console.log(`✔ Admin created: ${u.email} / admin123`);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
