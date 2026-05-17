const mongoose = require('mongoose');
const slugify = require('slugify');

const CATEGORIES = ['Vehicles', 'Energy', 'Charging', 'Apparel', 'Accessories'];

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  slug: { type: String, unique: true },
  description: { type: String, default: '' },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  category: { type: String, required: true, enum: CATEGORIES },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  stock: { type: Number, required: true, default: 0, min: 0 },
  image: { type: String, default: '/images/placeholder.svg' }
}, { timestamps: true });

productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true }) + '-' + Date.now().toString(36);
  }
  next();
});

productSchema.statics.CATEGORIES = CATEGORIES;
module.exports = mongoose.model('Product', productSchema);