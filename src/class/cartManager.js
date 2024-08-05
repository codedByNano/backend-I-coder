import cart from '../models/cart.model.js';

class CartManager {
  async getCarts() {
    try {
      return await cart.find().populate('products.product');
    } catch (error) {
      console.error('Error getting carts:', error);
      throw new Error('Error getting carts');
    }
  }

  async getCartById(id) {
    try {
      return await cart.findById(id).populate('products.product');
    } catch (error) {
      console.error(`Error getting cart with id ${id}:`, error);
      throw new Error(`Error getting cart with id ${id}`);
    }
  }

  async createCart() {
    try {
      const cart = new cart({ products: [] });
      return await cart.save();
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Error creating cart');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await cart.findById(cartId);
      const productIndex = cart.products.findIndex(p => p.product.equals(productId));
      
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      
      return await cart.save();
    } catch (error) {
      console.error(`Error adding product to cart with id ${cartId}:`, error);
      throw new Error(`Error adding product to cart with id ${cartId}`);
    }
  }
}

export default CartManager;