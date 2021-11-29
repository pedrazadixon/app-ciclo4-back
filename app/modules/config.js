const express = require("express");
const resp = require("../responses/responses");
const Model = require("../models/Config");

const router = express.Router();

// listar
router.get("/", async (req, res) => {
  let entidades = await Model.find();
  resp.ok(res, entidades);
});

// crear
router.post("/", async (req, res) => {
  try {
    let entidad = await Model.findOne({ nombre: req.body.nombre });

    if (entidad == null) {
      entidad = new Model(req.body);
      await entidad.save();
    }
    resp.ok(res, entidad);
  } catch (error) {
    resp.error(res, error.message);
  }
});

// detalles
router.get("/:nombre", async (req, res) => {
  try {
    const entidad = await Model.findOne({ nombre: req.params.nombre });
    resp.ok(res, entidad);
  } catch (error) {
    resp.error(res, error.message);
  }
});

// editar
router.put("/:nombre", async (req, res) => {
  await Model.findOneAndUpdate({ nombre: req.params.nombre }, req.body);
  const entidad = await Model.findOne({ nombre: req.params.nombre });
  resp.ok(res, entidad);
});

module.exports = router;
