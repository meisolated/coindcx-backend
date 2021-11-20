const sql = require("./db.js")
const logger = require("../logger/log")
const who = "GET DATABASE"
// constructor

// revamp
class GET {
  constructor() {}

  async buyNsellQuery(callback) {
    sql.query(`SELECT * FROM tbl_buy_sell_pool`, async (err, res) => {
      if (err) {
        callback(null)
        return logger.error(who, err)
      }
      if (res.length) {
        var string = JSON.stringify(res)
        var json = JSON.parse(string)
        // sql.end()
        return callback(json)
      } else return callback(null)
    })
  }
}

module.exports = GET
