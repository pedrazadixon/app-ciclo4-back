const mongoose = require("mongoose");

const Usuario = mongoose.model("Usuario", {
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = Usuario;
