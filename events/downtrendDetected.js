const GET = require("../database/db_get")
const get = new GET()
const notifier = require("../notifier/notifier")

function uptrendDetected() {
  //hit database for any new uptrend

  get.buyNsellQuery({ status: "approved", type: "Sell" }, (data) => {
    if (data == null) return
    data.forEach((ele) => {
      notifier.emit("downtrendDetected", ele)
    })
  })
}

module.exports = uptrendDetected
