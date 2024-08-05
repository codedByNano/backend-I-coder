import express from "express";
import CartManager from "../class/cartManager.js";

const router = express.Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  await cartManager.createCart();
  res.status(201).json({ message: "Carrito creado" });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await cartManager.addProductToCart(cid, pid);
  res.status(201).json({ message: "Producto añadido al carrito" });
});

export default router;
