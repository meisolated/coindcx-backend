var mysql = require("mysql")
var logger = require("../logger/log")
const who = "DATABASE"

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coindcx",
})

class Database {
  constructor() {
    connection.connect(function (err) {
      if (err) {
        return logger.error(who, err)
      } else {
        return logger.success(who, "Connected to Database.")
      }
    })
  }
  getConnection() {
    return connection
  }
  disconnect() {
    return connection.end()
  }
}

module.exports = new Database()
