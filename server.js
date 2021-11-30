require("dotenv").config();
const express = require("express");
var cors = require("cors");
const db = require("./app/db/db");
const config = require("./app/modules/config");
const usuarios = require("./app/modules/usuarios");
const ordenes = require("./app/modules/ordenes");
const destinos = require("./app/modules/destinos");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// cors
app.use(cors());

// db mongo
db(process.env.DB_URL);

// app middleware
app.use((req, res, next) => {
  console.log("url: ", req.originalUrl);
  next();
});

app.get("/", (req, res) => res.send("app-ciclo4-back - api"));

// modulos
app.use("/config", config);
app.use("/usuarios", usuarios);
app.use("/ordenes", ordenes);
app.use("/destinos", destinos);

app.listen(port, () => {
  console.log(`== api listening at http://localhost:${port}`);
});
