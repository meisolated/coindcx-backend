const { isEmpty } = require("lodash")
const GET = require("../../database/db_get")
const INSERT = require("../../database/db_insert")
var get = new GET()
var insert = new INSERT()

const Model = () => {}

Model.getPosition = (data1 ,result) => {
  get.getPosition(data1, (data) => {
    if (data == null) return result({ message: "error" }, null) //! this is like result(err, data) . NULL if not found
    return result(null, data)
  })
}

Model.postLogs = (data, result) => {
  /**
   * @data params should be {@frm @details @message @type}
   */
  if (
    isEmpty(data["frm"]) &&
    isEmpty(data["details"]) &&
    isEmpty(data["message"]) &&
    isEmpty(data["type"])
  ) {
    return result({ message: "missing params" }, null)
  } else {
    insert.forLogger(data, (callback) => {
      if (callback == null) {
        return result({ message: "error" }, null)
      } else {
        return result(null, "done")
      }
    })
  }
}

Model.getFav = (result) => {
  get.favMarket((data) => {
    if (data == null)
      return result({ message: "error favMarket return null" }, null)
    else return result(null, data)
  })
}

Model.postSignal = (data, result) => {
  /**
   * @data should be like this @market_name @pair @current_price @type @status
   *
   */
  if (
    isEmpty(data["market_name"]) &&
    isEmpty(data["pair"]) &&
    isEmpty(data["current_price"]) &&
    isEmpty(data["type"]) &&
    isEmpty(data["status"])
  ) {
    return result({ message: "missing params" }, null)
  } else {
    insert.buyNsellSignal(data, (callback) => {
      if (callback == null) {
        return result({ message: "error" }, null)
      } else {
        return result(null, "done")
      }
    })
  }
}

module.exports = Model
