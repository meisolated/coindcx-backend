var mysql = require("mysql");
module.exports = {
  connect() {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "coindcx",
    });

    try {
      connection.connect();
      return connection;
    } catch (error) {
      console.log("Error while connection to the database " + error);
    }

    // connection.query(
    //   "SELECT 1 + 1 AS solution",
    //   function (error, results, fields) {
    //     if (error) throw error;
    //     console.log("The solution is: ", results[0].solution);
    //   }
    // );
  },

  lost() {
    console.log("Lost");
  },
};
