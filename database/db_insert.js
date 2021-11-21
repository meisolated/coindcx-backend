const pool = require("./db.js")
const logger = require("../logger/log")

const who = "INSERT DATABASE"
class INSERT {
  constructor() {
    this.pool = pool
  }

  async forLogger(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        // logger.error(who, err) // commented out to avoid any loop
        console.log(err)
        return callback(connection.destroy())
      }
      connection.query(
        "INSERT INTO tbl_logs SET id = NULL, frm = ?, datetime = ?, details = ?, message = ?, type = ?",
        [
          data["frm"],
          data["datetime"],
          data["details"],
          data["message"],
          data["type"],
        ],
        (err, res) => {
          if (err) {
            // logger.error(who, err) // commented out to avoid any loop
            console.log(err)
            return callback(connection.destroy())
          }
          return callback(connection.destroy())
        }
      )
    })
  }
}

module.exports = INSERT
