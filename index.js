import express from "express";
import http from "node:http";

const app = express();

app.get("/", (req, res) => {
  res.status(201).json({
    mensaje: "Todo ok",
  });
});

app.listen(8080, () => {
  console.log("Servidor listo, escuchando en puerto 8080");
});