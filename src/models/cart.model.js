import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }]
});

const cart = mongoose.model('carts', cartSchema);

export default cart;