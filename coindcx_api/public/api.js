const request = require("request")
const config = require("../../config/config.json")

class DCXPublic {
  constructor() {
    this.api = config.urls2
  }
  async getTicker(of, callback) {
    await request.get(
      this.api + "/exchange/ticker",
      function (error, response, body) {
        //   var sting = JSON.stringify(body)
        var json = JSON.parse(body)
        json.forEach((e) => {
          if (e["market"] == of) {
            let data = {
              market: e["market"],
              change_24_hour: e["change_24_hour"],
              high: e["high"],
              low: e["low"],
              volume: e["volume"],
              last_price: e["last_price"],
              bid: e["bid"],
              ask: e["ask"],
              timestamp: e["timestamp"],
            }
            return callback(data)
          }
        })
      }
    )
  }
}

module.exports = DCXPublic
