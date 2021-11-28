const db = require("mongoose");

async function dbInit(url) {
  try {
    await db.connect(url, {
      useNewUrlParser: true,
    });
    console.log("== db conectada correctamente");
  } catch (error) {
    console.log(error);
    console.log("== error critico conectando la db");
    process.exit(0);
  }
}

module.exports = dbInit;
