const request = require("request")
const config = require("../../config/config.json")

class DCXPublic {
  constructor() {
    this.api = config.urls2
  }
  async getTicker(of, callback) {
    await request.get(
      this.api + "/exchange/ticker",
      async function (error, response, body) {
        //   var sting = JSON.stringify(body)
        var json = JSON.parse(body)
        let x = 0
        let list_data = []
        await json.forEach((e) => {
          of.forEach((i) => {
            if (e["market"] == i) {
              ++x
              console.log(x)
              list_data.push({
                market: e["market"],
                change_24_hour: e["change_24_hour"],
                high: e["high"],
                low: e["low"],
                volume: e["volume"],
                last_price: e["last_price"],
                bid: e["bid"],
                ask: e["ask"],
                timestamp: e["timestamp"],
              })
            }
          })
        })
        if (x = 0) return callback(null)
        return callback(list_data)
      }
    )
  }
}

module.exports = DCXPublic
