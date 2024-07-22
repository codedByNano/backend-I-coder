import express from "express";
import ProductManager from "../class/productManager.js";
import { __dirname } from "../util.js";

const router = express.Router();
const productManager = new ProductManager(__dirname + "/data/product.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { title: "Home - Lista de Productos", products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtimeproducts", { title: "Productos en tiempo real", products });
});

export default router;
