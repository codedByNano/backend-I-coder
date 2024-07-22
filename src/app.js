import express from "express";
import { __dirname } from "./util.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socket.on("newProduct", (product) => {
    console.log("Nuevo producto:", product);
    io.emit("ProductUpdate");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor listo, http://localhost:${PORT}`);
});

export { io };
