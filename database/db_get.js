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
      if (err) {
        connection.destroy()
        return console.log(err.message)
      } //logger.error(who, err)

      connection.query(
        `SELECT * FROM tbl_buy_sell_pool WHERE status = ? AND type = ?`,
        [status["status"], status["type"]],
        async function (err, res) {
          if (err) {
            connection.destroy()
            callback(null)
            return console.log(err.message) //logger.error(who, err)
          }
          if (res.length) {
            var string = JSON.stringify(res)
            var json = JSON.parse(string)
            connection.destroy()
            return callback(json)
          } else {
            connection.destroy()
            return callback(null)
          }
        }
      )
    })
  }
  async settings(callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy()
        return logger.error(
          who,
          err.message || "Some Error in settings function of db_get.js 1"
        )
      }

      connection.query(`SELECT * FROM tbl_settings`, async (err, res) => {
        if (err) {
          connection.destroy()
          callback(null)
          return logger.error(
            who,
            err.message || "Some Error in settings function of db_get.js"
          )
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

  async getPositions(callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy()
        return logger.error(
          who,
          err.message || "Some Error in getPositions function of db_get.js 1"
        )
      }
      connection.query("SELECT * FROM tbl_position", async (err, res) => {
        if (err) {
          connection.destroy()
          callback(null)
          return logger.error(
            who,
            err.message || "Some Error in getPositions function of db_get.js 2"
          )
        }
        if (res.length) {
          var string = JSON.stringify(res)
          var json = JSON.parse(string)
          connection.destroy()
          return callback(json)
        } else return callback(null)
      })
    })
  }
}

module.exports = GET
