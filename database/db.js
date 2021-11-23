const mysql = require("mysql")
const dbConfig = require("../config/config.json")

var pool = mysql.createPool({
  connectionLimit : 100,
  host: dbConfig["db_host"],
  user: dbConfig["db_user"],
  password: dbConfig["db_password"],
  database: dbConfig["db_database"],
})
module.exports = pool

/**
 * TODO: https://www.npmjs.com/package/mysql
 * implement connection pool in database
 *
 */
