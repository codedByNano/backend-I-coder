import fs from "fs";
import path from "path";
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

const envPath = path.resolve(__dirname, "../.env");

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  console.log("Contenido del archivo .env:", envContent);
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      process.env[key.trim()] = value;
    }
  });
}

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const uri = process.env.MONGODB_URI;

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
