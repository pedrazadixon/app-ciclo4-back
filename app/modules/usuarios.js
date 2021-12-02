const express = require("express");
const bcrypt = require("bcrypt");
const resp = require("../responses/responses");
const OrdenesModel = require("../models/Orden");
const Model = require("../models/Usuario");

const router = express.Router();

// listar
router.get("/", async (req, res) => {
  let entidades = await Model.find();
  resp.ok(res, entidades);
});

// crear
router.post("/", async (req, res) => {
  try {
    let entidad = new Model(req.body);
    let pass_hash = await bcrypt.hash(req.body.contrasena, 10);
    entidad.contrasena = pass_hash;
    await entidad.save();
    entidad.contrasena = undefined;
    resp.ok(res, entidad);
  } catch (error) {
    resp.error(res, error.message);
  }
});

// detalles
router.get("/:id", async (req, res) => {
  try {
    const entidad = await Model.findById(req.params.id);
    resp.ok(res, entidad);
  } catch (error) {
    resp.error(res, error.message);
  }
});

// editar
router.put("/:id", async (req, res) => {
  delete req.body.contrasena;
  await Model.findByIdAndUpdate(req.params.id, req.body);
  const entidad = await Model.findById(req.params.id);
  resp.ok(res, entidad);
});

// eliminar
router.delete("/:id", async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);

  // eliminar ordenes asociadas al usuario
  await OrdenesModel.deleteMany({ usuario: req.params.id });

  resp.ok(res, "deleted");
});

module.exports = router;
