const DCXPublic = require("../coindcx_api/public/api")
const GET = require("../database/db_get")
const logger = require("../logger/log")

const who = "VALIDATOR"
let dcx = new DCXPublic()
let get = new GET()

async function validator() {
  //first get all buy or sell queries
  get.buyNsellQuery(function (result) {
    if (result == null) return logger.info(who, "nothing working fine")
    let json_data = []
    result.forEach((e) => {
      json_data.push(e["market_name"])
    })
    dcx.getTicker(json_data, function (result) {
      console.log(result)
    })
  })
}

module.exports = validator
