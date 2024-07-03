import express from "express";
import { __dirname } from "./util.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
  console.log(`Servidor listo, escuchando en puerto ${PORT}`);
});
