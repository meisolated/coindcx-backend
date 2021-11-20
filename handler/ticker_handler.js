const { between } = require("../functions/function")

function validateTicker(dbJson, dcxJson, callback) {
    console.log(dbJson)
  dbJson.forEach(async (x) => {
    dcxJson.forEach((y) => {
      if (x['market_name'] == y["market"]) {
        //!validate according to last 24 hrs data
        let buffer = (parseFloat(y["high"]) - parseFloat(y["low"])) / 4
        let high = parseFloat(y["low"]) + buffer
        if (between(parseFloat(y["last_price"]), parseFloat(y["low"]), high)) {
            console.log(x['id'])
            console.log("buy: " + high + " " + +y["low"])
            return callback("B", x['id'])
        } else {
          console.log(high + " " + y["low"])
          return callback("D", x['id'])
        }
      }
    })
  })
}

module.exports = validateTicker