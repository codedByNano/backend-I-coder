import express from "express";
import ProductManager from "../class/productManager.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const productList = await productManager.getProducts();
    if (limit) {
      res.json(productList.slice(0, limit));
    } else {
      res.json(productList);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(pid);
    res.status(201).json({ resultado: product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await productManager.addProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: Error.message });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await productManager.updateProduct(pid, productData);
    res.status(200).json(updatedProduct);
  } catch {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await productManager.deleteProduct(pid);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: error.message });
  }
});

export default router;
