const logger = require('../../logger/log')
const request = require("request")
const config = require("../../config/config.json")
const who = "COINDCX_PUBLIC_API"

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
        await json.forEach(async (e) => {
          await of.forEach(async (i) => {
            if (e["market"] == i) {
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
        if ((x = 0)) return callback(null)
        return callback(list_data)
      }
    )
  }
  async getCandles(data, callback){
    request.get(this.api + `/market_data/candles?pair=${data['market']}&interval=${data['interval']}&limit=${data['limit']}`,function(error, response, body) {
        console.log(body);
        var json = JSON.parse(body)
        if(json['status'] == "error") return logger.error(who, json['message'])
    })
  }
}

module.exports = DCXPublic
