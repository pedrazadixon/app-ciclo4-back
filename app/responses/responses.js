function ok(res, data) {
  return res.send({
    status: "success",
    data: data,
  });
}

function error(res, error) {
  return res.send({
    status: "error",
    error: error,
  });
}

module.exports = { ok, error };
