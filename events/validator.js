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
    result.forEach((e) => {
      if (e["status"] != "new") return
      if (e["type"] && e["market_name"] && e["status"]) {
          dcx.getTicker(e["market_name"], function (result) {
            console.log(result)  
          })
      } else {
        logger.error(who, "Missing Element")
      }
    })
  })
}

module.exports = validator
