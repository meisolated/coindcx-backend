const Model = require("../models/model");

function verifyApiKey(req) {
  if (req.headers["x-auth-apikey"] === "Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F") {
    return true;
  } else {
    return false;
  }
}

exports.getPosition = (req, res) => {
  if (verifyApiKey(req)) {
    Model.getPosition(req.body, (err, data) => {
      if (err)
        return res.status(500).send({
          status:
            err.message || "Some error occurred while retrieving positions.",
          message: err,
        });
      else return res.send({ data: data, status: "success" });
    });
  } else {
    return res.status(500).send({
      status: "invalid api key",
    });
  }
};

exports.postLog = (req, res) => {
  if (verifyApiKey(req)) {
    Model.postLogs(req.body, (err, data) => {
      if (err)
        return res.status(500).send({
          status:
            err.message || "Some error occurred while retrieving postLog.",
          message: err,
        });
      else return res.send({ status: "success" });
    });
  } else {
    return res.status(500).send({
      status: "invalid api key",
    });
  }
};

exports.getFav = (req, res) => {
  if (verifyApiKey(req)) {
    Model.getFav((err, data) => {
      if (err) {
        return res.status(500).send({ status: "error", message: err });
      } else {
        return res.send({ data: data, status: "success" });
      }
    });
  } else {
    return res.status(500).send({ status: "invalid api key" });
  }
};



exports.updatePosition = (req, res) => {
  if (verifyApiKey(req)) {
    Model.updatePosition(req.body, (err, data) => {
      if (err) {
        return res.status(500).send({
          status: err || "Some error occurred while retrieving postSignal.",
          message: err,
        });
      } else {
        return res.send({ data: data, status: "success" });
      }
    });
  } else {
    return res.status(500).send({ status: "invalid api key" });
  }
};

exports.insertPosition = (req, res) => {
  if (verifyApiKey(req)) {
    Model.insertPosition(req.body, (err, data) => {
      if (err) {
        return res.status(500).send({
          status: err || "Some error occurred while retrieving postSignal.",
          message: err,
        });
      } else {
        return res.send({ data: data, status: "success" });
      }
    });
  } else {
    return res.status(500).send({ status: "invalid api key" });
  }
};

