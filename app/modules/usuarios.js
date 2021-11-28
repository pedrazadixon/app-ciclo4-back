const express = require("express");
const resp = require("../responses/responses");
const Model = require("../models/Usuario");

const router = express.Router();

// listar todos
router.get("/", async (req, res) => {
  let usuarios = await Model.find();
  resp.ok(res, usuarios);
});

// crear
router.post("/", async (req, res) => {
  try {
    let usuario = new Model(req.body);
    await usuario.save();
    resp.ok(res, usuario);
  } catch (error) {
    resp.error(res, error.message);
  }
});

// eliminar
router.delete("/:id", async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  resp.ok(res, "deleted");
});

// editar
router.put("/:id", async (req, res) => {
  delete req.body.contrasena;
  await Model.findByIdAndUpdate(req.params.id, req.body);
  const usuario = await Model.findById(req.params.id);
  resp.ok(res, usuario);
});

module.exports = router;
