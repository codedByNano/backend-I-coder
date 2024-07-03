import fs from "node:fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async createCart() {
    await this.getCarts();
    const newCart = {
      id: this.carts.length ? Math.max(this.carts.map((c) => c.id)) + 1 : 1,
      products: [],
    };
    this.carts.push(newCart);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.carts })
    );
  }

  async getCarts() {
    const list = await fs.promises.readFile(this.path, "utf-8");
    this.carts = JSON.parse(list).data;
  }

  async getCartById(id) {
    await this.getCarts();
    return this.carts.find((cart) => cart.id === parseInt(id));
  }

  async addProductToCart(cid, pid) {
    await this.getCarts();
    const cart = this.carts.find((cart) => cart.id === parseInt(cid));
    if (!cart) return;
    const productIndex = cart.products.findIndex((p) => p.id === parseInt(pid));
    if (productIndex === -1) {
      cart.products.push({ id: parseInt(pid), quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.carts })
    );
  }
}

export default CartManager;
