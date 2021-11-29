const mongoose = require("mongoose");

const Orden = mongoose.model("Orden", {
  nombre: {
    type: String,
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
  },
  estado: {
    type: String,
    required: true,
  },
});

module.exports = Orden;
