import fs from "node:fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.productList = [];
    this.nextId = 1;
  }

  async getProducts() {
    const list = await fs.promises.readFile(this.path, "utf-8");
    this.productList = [...JSON.parse(list).data];
    return [...this.productList];
  }

  async getProductById(id) {
    await this.getProducts();
    const product = this.productList.find(
      (product) => product.id === parseInt(id)
    );
    return product;
  }

  async addProduct(product) {
    await this.getProducts();

    if (this.productList.length > 0) {
      this.nextId = Math.max(...this.productList.map((p) => p.id)) + 1;
    }

    if (this.productList.some((p) => p.code === product.code)) {
      throw new Error(`El producto con el codigo ${product.code} ya existe`);
    }

    const newProduct = {
      id: this.nextId++,
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
    if (index === -1) return null;
    const product = this.productList[index];
    this.productList[index] = { ...product, ...productData, id: product.id };
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.productList })
    );
    return this.productList[index];
  }

  async deleteProduct(id) {
    await this.getProducts();
    const index = this.productList.findIndex(
      (product) => product.id === parseInt(id)
    );
    if (index === -1) return null;
    const deletedProduct = this.product.splice(index, 1);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.productList })
    );
    return deletedProduct;
  }
}

export default ProductManager;
