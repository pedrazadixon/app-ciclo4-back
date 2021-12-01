const mongoose = require("mongoose");

const Orden = mongoose.model("Orden", {
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  peso_kg: {
    type: "Number",
    required: true,
  },
  cant_vehiculos: {
    type: "Number",
    required: true,
  },
  destino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destino",
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
});

module.exports = Orden;
