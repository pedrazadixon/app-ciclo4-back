const mongoose = require("mongoose");

const Destino = mongoose.model("Destino", {
  origen: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  distancia_km: {
    type: "Number",
    required: true,
  },
  minutos: {
    type: "Number",
    required: true,
  },
});

module.exports = Destino;
