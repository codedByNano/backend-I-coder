import express from "express";
import ProductManager from "./class/productManager.js";
import { __dirname } from "./util.js";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager(__dirname + "/data/product.json");

app.get("/:pid", async (req, res) => {
  const { id } = req.params;
  const productFind = await productManager.getProductById(id);

  res.status(201).json({ resultado: productFind });
});

app.get("/", async (req, res) => {
  const productList = await productManager.getProducts();
  console.log(productList);
  res.status(201).json({ resultado: productList });
});

app.post("/", async (req, res) => {
  // tengo que sacar los datos del producto desde el req
  await productManager.addProduct();
  res.status(201).json({ message: "Producto añadido" });
});

app.listen(PORT, () => {
  console.log(`Servidor listo, escuchando en puerto ${PORT}`);
});
