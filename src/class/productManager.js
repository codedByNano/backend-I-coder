import fs from "node:fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.productList = [];
  }

  async getProductById(id) {
    await this.getProducts();
    return this.productList.find((product) => product.id === id);
  }

  async getProducts() {
    const list = await fs.promises.readFile(this.path, "utf-8");
    this.productList = [...JSON.parse(list).data];
    return [...this.productList];
  }

  async addProduct(product) {
    await this.getProducts();
    const newProduct = {
      title: "Fideos",
    };
    this.productList.push(newProduct);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.productList })
    );
  }
}

export default ProductManager;
