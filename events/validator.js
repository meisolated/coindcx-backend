const DCXPublic = require("../coindcx_api/public/api")
const GET = require("../database/db_get")
const logger = require("../logger/log")
const {between} = require("../functions/function")

const who = "VALIDATOR"
let dcx = new DCXPublic()
let get = new GET()

async function validator() {
  //first get all buy or sell queries
  get.buyNsellQuery(async function (result) {
    if (result == null) return logger.info(who, "nothing working fine")
    let json_data = []
    await result.forEach((e) => {
      if(e['status'] != "new") return
      json_data.push(e["market_name"])
    })
    await dcx.getTicker(json_data, async function (result) {
      if (result == null) return
      // now we have last 24hrs data from the CoinDCX server now we can validate few things
      await json_data.forEach(async (x) => {
        result.forEach((y) => {
          if (x == y["market"]) {
            
            // last 24 hrs data  
            let buffer = (parseFloat(y['high']) - parseFloat(y['low'])) / 4
            let high = parseFloat(y['low']) + buffer
          if(between(parseFloat(y['last_price']),parseFloat(y['low']),high)){
            return console.log("buy: "+ high + " " + + y['low'])
          }else return console.log(high + " " + y['low'])
            

          }
        })
      })
    })
  })
}

module.exports = validator
