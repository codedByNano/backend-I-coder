import express from "express";
import { __dirname } from "./util.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import setupSocketHandlers from "./sockets/socketHandlers.js";
import mongoose from "mongoose";

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const uri =
  "mongodb+srv://martiniano:CC4JPvAnMi9GeoTY@coder-back.8pgqsfy.mongodb.net/?retryWrites=true&w=majority&appName=coder-back";

mongoose
  .connect(uri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

setupSocketHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`Servidor listo, http://localhost:${PORT}`);
});

export { io };
