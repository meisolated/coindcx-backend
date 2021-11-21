const { between } = require("../functions/function")

function validateTicker(dbJson, dcxJson, callback) {
  dcxJson.forEach((y) => {
    if (dbJson["market_name"] == y["market"]) {
      //!validate according to last 24 hrs data
      let buffer = (parseFloat(y["high"]) - parseFloat(y["low"])) / 4
      let high = parseFloat(y["low"]) + buffer
      if (between(parseFloat(y["last_price"]), parseFloat(y["low"]), high)) {
        return callback("B", dbJson["id"])
      } else {
        return callback("D", dbJson["id"])
      }
    }
  })
}

module.exports = validateTicker
