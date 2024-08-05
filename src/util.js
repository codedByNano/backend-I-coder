import { dirname } from "node:path";

import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

export function cleanProductData(products) {
  return products.map((product) => ({
    id: product._id,
    title: product.title,
    description: product.description,
    code: product.code,
    price: product.price,
    status: product.status,
    stock: product.stock,
    category: product.category,
  }));
}
