const mongoose = require("mongoose");

const Config = mongoose.model("Config", {
  nombre: {
    type: String,
    required: true,
  },
  valor: {
    type: String,
    required: true,
  },
});

module.exports = Config;
