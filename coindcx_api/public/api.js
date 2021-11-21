const logger = require("../../log/log")
const request = require("request")
const config = require("../../config/config.json")
const who = "COINDCX_PUBLIC_API"

class DCXPublic {
  constructor() {
    this.api = config.urls2
    this.api1 = config.urls1
  }
  async getTicker(of, callback) {
    request.get(
      this.api + "/exchange/ticker",
      async function (error, response, body) {
        //   var sting = JSON.stringify(body)
        var json = JSON.parse(body)
        if (json["message"] != undefined)
          return logger.error(who, json["message"])
        let x = 0
        let list_data = []
        await json.forEach(async (e) => {
          if (e["market"] == of["market_name"]) {
            x += 1
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

        if (x == 0) return callback(null)
        return callback(list_data)
      }
    )
  }
  async getCandles(data, callback) {
    //! Not properly done because not using candles for validating buy or sell
    request.get(
      this.api +
        `/market_data/candles?pair=${data["market"]}&interval=${data["interval"]}&limit=${data["limit"]}`,
      function (error, response, body) {
        console.log(body)
        var json = JSON.parse(body)
        if (json["status"] == "error") return logger.error(who, json["message"])
      }
    )
  }

  async getMarketDetails(marketname, callback) {
    request.get(
      this.api1 + "/exchange/v1/markets_details",
      function (error, response, body) {
        var json = JSON.parse(body)

        for (let i = 0; i < json.length; i++) {
          if (json[i]["coindcx_name"] === marketname) {
            console.log(json[i])
            break
          }
        }
      }
    )
  }
}

module.exports = DCXPublic
