require("dotenv").config();
const express = require("express");
const db = require("./app/db/db");
const usuarios = require("./app/modules/usuarios");
const ordenes = require("./app/modules/ordenes");
const destinos = require("./app/modules/destinos");

const app = express();
const port = 3000;
app.use(express.json());

// db mongo
db(process.env.DB_URL);

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
