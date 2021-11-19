const mysql = require("mysql");
const dbConfig = require("../config/config.json");

var connection = mysql.createPool({
  host: dbConfig['db_host'],
  user: dbConfig['db_user'],
  password: dbConfig['db_password'],
  database: dbConfig['db_databse']
});

module.exports = connection;