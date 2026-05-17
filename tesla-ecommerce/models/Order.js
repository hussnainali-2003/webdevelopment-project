const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
    priceAtPurchase: { type: Number, required: true },
    // alias kept so admin views can read either `price` or `priceAtPurchase`
    price: { type: Number }
  }],
  total: { type: Number, required: true },
  shippingInfo: {
    address: { type: String, default: '' },
    city:    { type: String, default: '' },
    zip:     { type: String, default: '' }
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

// Keep price === priceAtPurchase in sync for older code paths
orderSchema.pre('save', function (next) {
  this.items.forEach(it => {
    if (it.priceAtPurchase != null && it.price == null) it.price = it.priceAtPurchase;
    if (it.price != null && it.priceAtPurchase == null) it.priceAtPurchase = it.price;
  });
  next();
});

module.exports = mongoose.model('Order', orderSchema);
