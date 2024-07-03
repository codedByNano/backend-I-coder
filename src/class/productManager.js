import fs from "node:fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.productList = [];
  }

  async getProducts() {
    const list = await fs.promises.readFile(this.path, "utf-8");
    this.productList = [...JSON.parse(list).data];
    return [...this.productList];
  }

  async getProductById(id) {
    await this.getProducts();
    return this.productList.find((product) => product.id === id);
  }

  async addProduct(product) {
    await this.getProducts();
    const newProduct = {
      id: this.productList.length
        ? Math.max(this.productList.map((p) => p.id)) + 1
        : 1,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status !== undefined ? product.status : true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails || [],
    };
    this.productList.push(newProduct);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.productList })
    );
  }

  async updateProduct(id, productData) {
    await this.getProducts();
    const index = this.productList.findIndex(
      (product) => product.id === parseInt(id)
    );
    if (index === -1) return;
    const product = this.productList[index];
    this.productList[index] = { ...product, ...productData, id: product.id };
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.productList })
    );
  }

  async deleteProduct(id) {
    await this.getProducts();
    this.productList = this.productList.filter(
      (product) => product.id != parseInt(id)
    );
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.productList })
    );
  }
}

export default ProductManager;
