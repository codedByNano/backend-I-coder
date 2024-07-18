import express from "express";
import { __dirname } from "./util.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { log } from "console";

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Test handlebars" });
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

app.listen(PORT, () => {
  console.log(`Servidor listo, escuchando en puerto ${PORT}`);
});
