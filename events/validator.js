const DCXPublic = require("../coindcx_api/public/api")
const GET = require("../database/db_get")
const logger = require("../logger/log")

const who = "VALIDATOR"
let dcx = new DCXPublic()
let get = new GET()

async function validator() {
  //first get all buy or sell queries
  get.buyNsellQuery(async function (result) {
    if (result == null) return logger.info(who, "nothing working fine")
    let json_data = []
    await result.forEach((e) => {
      json_data.push(e["market_name"])
    })
    await dcx.getTicker(json_data, async function (result) {
      if (result == null) return
      // now we have data from the CoinDCX server now we can validate few things
      await json_data.forEach(async (x) => {
        result.forEach((y) => {
          if (x == y["market"]) {
            
            // last 24 hrs data + we will need last one week data as well 
            let buffer = parseFloat(y['high']) - parseFloat(y['low'])
            

          }
        })
      })
    })
  })
}

module.exports = validator
