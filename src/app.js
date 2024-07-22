import express from "express";
import { __dirname } from "./util.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import ProductManager from "./class/productManager.js";

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager(__dirname + "/data/product.json");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

io.on("connection", async (socket) => {
  console.log(`Cliente conectado, ID: ${socket.id}`);

  socket.on("addProduct", async (product) => {
    try {
      const newProduct = await productManager.addProduct(product);
      io.emit("ProductUpdate", await productManager.getProducts());
    } catch (error) {
      console.error("Error adding product:", error);
    }
  });

  socket.on("editProduct", async (product) => {
    try {
      await productManager.updateProduct(product.id, product);
      io.emit("ProductUpdate", await productManager.getProducts());
    } catch (error) {
      console.error("Error editing product:", error);
    }
  });

  socket.on("deleteProduct", async (id) => {
    try {
      await productManager.deleteProduct(id);
      io.emit("ProductUpdate", await productManager.getProducts());
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor listo, http://localhost:${PORT}`);
});

export { io };
