const GET = require("../database/db_get")
const get = new GET()
const notifier = require("../notifier/notifier")
const validator = require("../controllers/validator")
function uptrendDetected() {
  //hit database for any new uptrend

  get.buyNsellQuery({ status: "new", type: "Buy" }, (data) => {
    if (data == null) return
    data.forEach((ele) => {
      validator(ele)
      notifier.emit("uptrendDetected", ele)
    })
  })
}

module.exports = uptrendDetected
