import express from "express";
import CartManager from "../class/cartManager.js";

const router = express.Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartManager.addProductToCart(cid, pid, quantity);
    res.status(201).json({ message: "Producto añadido al carrito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
