const pool = require("./db.js");
const logger = require("../log/log");
const who = "GET DATABASE";

//re-revamp
class DELETE {
  constructor() {
    this.pool = pool;
  }
  async Position(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        logger.error(who, err.message);
        connection.destroy();
        return callback(null);
      } else {
        connection.query(
          "DELETE FROM tbl_position WHERE user_id = ? AND market_name = ?",
          [
            data["user_id"],
            data["market_name"]
          ],
          (err, res) => {
            if (err) {
              logger.error(who, err.message);
              connection.destroy();
              return callback(null);
            } else {
              connection.destroy();
              return callback({ message: "success" });
            }
          }
        );
      }
    });
  }

 
}

module.exports = DELETE;
