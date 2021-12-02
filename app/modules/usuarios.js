const express = require("express");
const bcrypt = require("bcrypt");
const resp = require("../responses/responses");
const OrdenesModel = require("../models/Orden");
const Model = require("../models/Usuario");

const router = express.Router();

// listar
router.get("/", async (req, res) => {
  let entidades = [];

  if (req.headers["user-id"]) {
    let usuario = await Model.findById(req.headers["user-id"]);
    if (usuario.rol === "Administrador") {
      entidades = await Model.find();
    } else {
      entidades = [usuario];
    }
  }
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

// registro
router.post("/registro", async (req, res) => {
  try {
    let entidad = new Model(req.body);
    let pass_hash = await bcrypt.hash(req.body.contrasena, 10);
    entidad.contrasena = pass_hash;
    entidad.rol = "Usuario Externo";
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
  if (req.body.contrasena) {
    if (req.body.contrasena.trim().length <= 0) {
      // si la contraseña viene vacia, no la modifico
      delete req.body.contrasena;
    } else {
      // si viene una contraseña, genero hash
      let pass_hash = await bcrypt.hash(req.body.contrasena, 10);
      req.body.contrasena = pass_hash;
    }
  }

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

// login
router.post("/iniciar-sesion", async (req, res) => {
  try {
    let usuario = await Model.findOne({ email: req.body.email }).select(
      "+contrasena"
    );

    if (usuario === null) {
      return resp.error(res, "Usuario no existe o credenciales incorrectas.");
    }

    let contrasenaEsCorrecta = await bcrypt.compare(
      req.body.contrasena,
      usuario.contrasena
    );

    if (contrasenaEsCorrecta) {
      usuario.contrasena = undefined;
      return resp.ok(res, usuario);
    }

    return resp.error(res, "Usuario no existe o credenciales incorrectas.");
  } catch (error) {
    resp.error(res, error.message);
  }
});

module.exports = router;
