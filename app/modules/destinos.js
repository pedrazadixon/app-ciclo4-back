const express = require("express");
const resp = require("../responses/responses");
const Model = require("../models/Destino");

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
    await entidad.save();
    resp.ok(res, entidad);
  } catch (error) {
    resp.error(res, error.message);
  }
});

// editar
router.put("/:id", async (req, res) => {
  await Model.findByIdAndUpdate(req.params.id, req.body);
  const entidad = await Model.findById(req.params.id);
  resp.ok(res, entidad);
});

// eliminar
router.delete("/:id", async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  resp.ok(res, "deleted");
});

module.exports = router;
