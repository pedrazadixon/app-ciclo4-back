const express = require("express");
const resp = require("../responses/responses");
const Model = require("../models/Usuario");

const router = express.Router();

// lista de usuarios
router.get("/", async (req, res) => {
  let usuarios = await Model.find();
  resp.ok(res, usuarios);
});

// crear nuevo usuario
router.post("/", async (req, res) => {
  try {
    let usuario = new Model(req.body);
    await usuario.save();
    resp.ok(res, usuario);
  } catch (error) {
    resp.error(res, error.message);
  }
});

module.exports = router;
