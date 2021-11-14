"use strict";

var mysql = require("mysql");
var logger = require("../logger/log");

class Database {
  constructor(host, user, password, database) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;

    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "coindcx",
    });

    try {
      connection.connect();
      let data = {
        type: 1,
        who: "DATABASE",
        dec: "Connected to Database Successfully",
      };
      logger.log(data);
      return connection;
    } catch (error) {
      //prepair data
      let data = {
        type: 3,
        who: "DATABASE",
        dec: "Error while connection to the database ",
      };
      return logger.log(data);
    }
  }
  disconnect() {
    let data = {
      type: 0,
      who: "DATABASE",
      dec: "Disconnected from database",
    };
    database.end();
    return logger.log(data);
  }
}

module.exports = { Database };
