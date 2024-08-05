import { io } from "../app.js";
import product from "../models/product.model.js";

class ProductManager {
  async getProducts() {
    try {
      return await product.find();
    } catch (error) {
      console.error("Error geting products:", error);
      throw new Error("Error geting products");
    }
  }

  async getProductById(id) {
    try {
      const product = await product.findById(id);
      return product;
    } catch (error) {
      console.error(`Error getting product with id ${id}`, error);
      throw new Error(`Error getting product with id ${id}`);
    }
  }

  async addProduct(productData) {
    try {
      const product = new product(productData);
      const prodAdded = await product.save();
      io.emit("ProductUpdate", prodAdded);
      return prodAdded;
    } catch (error) {
      console.error("Error adding product:", error);
      throw new Error("Error adding product");
    }
  }

  async updateProduct(id, productData) {
    try {
      const prodUpdated = await product.findByIdAndUpdate(id, productData, {
        new: true,
      });
      io.emit("ProductUpdate", prodUpdated);
      return prodUpdated;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw new Error(`Error updating product with id ${id}`);
    }
  }

  async deleteProduct(id) {
    try {
      const prodDeleted = await product.findByIdAndDelete(id);
      io.emit("ProductUpdate", prodDeleted);
      return prodDeleted;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw new Error(`Error deleting product with id ${id}`);
    }
  }
}

export default ProductManager;
