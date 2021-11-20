const sql = require("./db.js")
const logger = require("../logger/log")
const who = "UPDATE DATABASE"

class UPDATE {
  constructor() {}

  async buyNsellQueryStatusUpdate(id, status, callback) {
    sql.query(
      "UPDATE tbl_buy_sell_pool SET status = ? WHERE id = ?",
      [status, id],
      (err, res) => {
        if (err) {
          logger.error(who, err)
          callback({ status: "null" })
          return
        }
        if (res.affectedRows == 0) {
          var errs = "id not found"
          logger.warning(who, errs)
          callback({ status: errs })
          return
        }

        callback({ status: "success" })
      }
    )
  }
}

module.exports = UPDATE
