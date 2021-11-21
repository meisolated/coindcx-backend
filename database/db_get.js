const pool = require("./db.js")
const logger = require("../log/log")
const who = "GET DATABASE"

//re-revamp
class GET {
  constructor() {
    this.pool = pool
  }

  async buyNsellQuery(status, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) return console.log(err.message) //logger.error(who, err)

      connection.query(
        `SELECT * FROM tbl_buy_sell_pool WHERE status = ? AND type = ?`,
        [status['status'], status['type']],
        async function (err, res) {
          if (err) {
            callback(null)
            return console.log(err.message) //logger.error(who, err)
          }
          if (res.length) {
            var string = JSON.stringify(res)
            var json = JSON.parse(string)
            connection.destroy()
            return callback(json)
          } else return callback(null)
        }
      )
    })
  }
  async settings(callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) return logger.error(who, err)

      connection.query(`SELECT * FROM tbl_settings`, async (err, res) => {
        if (err) {
          callback(null)
          return logger.error(who, err)
        }
        if (res.length) {
          var string = JSON.stringify(res)
          var json = JSON.parse(string)
          connection.destroy()
          return callback(json[0])
        } else return callback(null)
      })
    })
  }
}

module.exports = GET
