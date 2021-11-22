const pool = require("./db.js")
// const logger = require("../log/log") cant call insert from insert in logger
const logger = require("../log/simple")
const { getdateNtime } = require("../functions/function")

const who = "INSERT DATABASE"
class INSERT {
  constructor() {
    this.pool = pool
  }

  async forLogger(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        logger.error(who, err)
        connection.destroy()
        return callback(null)
      } else {
        connection.query(
          "INSERT INTO tbl_logs SET id = NULL, frm = ?, datetime = ?, details = ?, message = ?, type = ?",
          [
            data["frm"],
            getdateNtime(),
            data["details"],
            data["message"],
            data["type"],
          ],
          (err, res) => {
            if (err) {
              connection.destroy()
              logger.error(who, err)
              return callback(null)
            } else {
              connection.destroy()
              return callback({ message: "success" })
            }
          }
        )
      }
    })
  }

  async buyNsellSignal(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        logger.error(who, err.message)
        connection.destroy()
        return callback(null)
      } else {
        connection.query(
          "INSERT INTO tbl_buy_sell_pool SET id = NULL, market_name = ?, pair = ?, current_price = ?, type = ?, status = ?, msg = ?, timestamp = ?",
          [
            data["market_name"],
            data["pair"],
            data["current_price"],
            data["type"],
            data["status"],
            "null",
            getdateNtime(),
          ],
          (err, res) => {
            if (err) {
              logger.error(who, err.message)
              connection.destroy()
              return callback(null)
            } else {
              connection.destroy()
              return callback({ message: "success" })
            }
          }
        )
      }
    })
  }
}

module.exports = INSERT
