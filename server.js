const express = require("express");
const app = express();
const port = 3000;

const usuarios = require("./app/modules/usuarios");
const ordenes = require("./app/modules/ordenes");
const destinos = require("./app/modules/destinos");

app.use(express.json());

// app middleware
app.use((req, res, next) => {
  console.log("url: ", req.originalUrl);
  next();
});

app.get("/", (req, res) => res.send("app ok"));

// modulos
app.use("/usuarios", usuarios);
app.use("/ordenes", ordenes);
app.use("/destinos", destinos);

app.listen(port);
