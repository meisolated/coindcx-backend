const DCXPublic = require("../coindcx_api/public/api")
const GET = require("../database/db_get")
const UPDATE = require("../database/db_update")
const logger = require("../logger/log")
const validateTicker = require("../handler/ticker_handler")

const who = "VALIDATOR"
var dcx = new DCXPublic()
var get = new GET()
var update = new UPDATE()

async function validator() {
  //first get all buy or sell queries
  await get.buyNsellQuery(async function (resultx) {
    if (resultx == null) return logger.info(who, "Resultx is null")
    let json_data = []

    //IF BUY DO THIS
    await resultx.forEach((e) => {
      if (e["status"] != "new") return
      if (e["type"] != "Buy") return
      let Obj = {
        market_name: e["market_name"],
        id: e["id"],
      }
      json_data.push(Obj)
    })

    await dcx.getTicker(json_data, async function (result) {
      if (result == null) return
      // now we have last 24hrs data from the CoinDCX server now we can validate few things
      validateTicker(json_data, result, async (callback, id) => {
        console.log(callback)
        if (callback === "B") {
          update.buyNsellQueryStatusUpdate(id, "approved", (cb) => {
            if (cb.status == null) {
              console.log(null)
            } else {
              console.log(cb)
            }
          })
        } else if (callback === "D") {
          var status = "denied"
          await get.settings((d) => {
            d = d[0]
            if (d["validator"] === "false") {
              status = "approved"
              update.buyNsellQueryStatusUpdate(id, status, (cb) => {
                if (cb.status == null) {
                  console.log(null)
                } else {
                  console.log(cb)
                }
              })
            } else {
              update.buyNsellQueryStatusUpdate(id, status, (cb) => {
                if (cb.status == null) {
                  console.log(null)
                } else {
                  console.log(cb)
                }
              })
            }
          })
        } else {
          logger.warning(who, "Ticker Handler return unknown value")
        }
      })
    })
    // IF SELL DO THIS
    // await resultx.forEach((e) => {
    //   if (e["status"] != "new") return
    //   if (e["type"] != "Sell") return
    //   json_data.push(e["market_name"])
    // })
  })
}

module.exports = validator
