import express from "express";
import ProductManager from "../class/productManager.js";
import { __dirname } from "../util.js";

const router = express.Router();
const productManager = new ProductManager(__dirname + "/data/product.json");

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const productList = await productManager.getProducts();
  if (limit) {
    res.json(productList.slice(0, limit));
  } else {
    res.json(productList);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (product) {
    res.status(201).json({ resultado: product });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const product = req.body;
  await productManager.addProduct(product);
  res.status(201).json({ message: "Producto añadido" });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.updateProduct(pid, prodUpdate);
  res.status(200).json({ message: "Producto actualizado" });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.deleteProduct(pid);
  res.status(200).json({ message: "Producto eliminado" });
});

export default router;
