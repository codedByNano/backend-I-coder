import { io } from "../app.js";
import ProductManager from "../class/productManager.js";

const productManager = new ProductManager();

export default function setupSocketHandlers() {
  io.on("connection", async (socket) => {
    console.log(`Cliente conectado, ID: ${socket.id}`);

    socket.on("addProduct", async (product) => {
      try {
        const newProduct = await productManager.addProduct(product);
        io.emit("ProductUpdate", await productManager.getProducts());
        socket.emit("productAdded", newProduct);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    });

    socket.on("editProduct", async (product) => {
      try {
        await productManager.updateProduct(product.id, product);
        io.emit("ProductUpdate", await productManager.getProducts());
        socket.emit("productEdited", product);
      } catch (error) {
        console.error("Error editing product:", error);
      }
    });

    socket.on("deleteProduct", async (id) => {
      try {
        await productManager.deleteProduct(id);
        io.emit("ProductUpdate", await productManager.getProducts());
        socket.emit("productDeleted", id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
}
