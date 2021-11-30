const pool = require("./db.js");
const logger = require("../log/log");
const who = "GET DATABASE";

//re-revamp
class GET {
  constructor() {
    this.pool = pool;
  }

  async buyNsellQuery(status, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        return logger.error(who, err.message);
      }

      connection.query(
        `SELECT * FROM tbl_buy_sell_pool WHERE status = ? AND type = ?`,
        [status["status"], status["type"]],
        async function (err, res) {
          if (err) {
            connection.destroy();
            callback(null);
            return logger.error(who, err.message);
          }
          if (res.length) {
            var string = JSON.stringify(res);
            var json = JSON.parse(string);
            connection.destroy();
            return callback(json);
          } else {
            connection.destroy();
            return callback(null);
          }
        }
      );
    });
  }
  async settings(callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        return logger.error(
          who,
          err.message || "Some Error in settings function of db_get.js 1"
        );
      }

      connection.query(`SELECT * FROM tbl_settings`, async (err, res) => {
        if (err) {
          connection.destroy();
          callback(null);
          return logger.error(
            who,
            err.message || "Some Error in settings function of db_get.js"
          );
        }
        if (res.length) {
          var string = JSON.stringify(res);
          var json = JSON.parse(string);
          connection.destroy();
          return callback(json[0]);
        } else return callback(null);
      });
    });
  }

  async getPosition(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      let query;
      let bind;
      if (err) {
        connection.destroy();
        return logger.error(
          who,
          err.message || "Some Error in getPositions function of db_get.js 1"
        );
      }
      if (data["status"] === "all") {
        query =
          "SELECT * FROM tbl_position WHERE market_name = ? AND NOT status = 4 AND NOT status = 7";
        bind = [data["market_name"]];
      } else {
        query =
          "SELECT * FROM tbl_position WHERE market_name = ? AND status = ?";
        bind = [data["market_name"], data["status"]];
      }
      connection.query(query, bind, async (err, res) => {
        if (err) {
          connection.destroy();
          callback(null);
          return logger.error(
            who,
            err.message || "Some Error in getPosition function of db_get.js 2"
          );
        }
        if (res.length) {
          var string = JSON.stringify(res);
          var json = JSON.parse(string);
          connection.destroy();
          return callback(json);
        } else {
          connection.destroy();
          return callback(null);
        }
      });
    });
  }

  async favMarket(callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        callback(null);
        return logger.error(
          who,
          err.message || "Some Error in getPositions function of db_get.js 1"
        );
      }
      connection.query(
        "SELECT * FROM tbl_fav WHERE status = ?",
        ["active"],
        async (err, res) => {
          if (err) {
            connection.destroy();
            callback(null);
            return logger.error(
              who,
              err.message ||
                "Some Error in getPositions function of db_get.js 2"
            );
          }
          if (res.length) {
            var string = JSON.stringify(res);
            var json = JSON.parse(string);
            connection.destroy();
            return callback(json);
          } else {
            logger.warning(who, "data in fav table not found");
            connection.destroy();
            return callback(null);
          }
        }
      );
    });
  }
  async Users(callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        return logger.error(
          who,
          err.message || "Some Error in getUsers function of db_get.js 1"
        );
      }
      connection.query(
        "SELECT * FROM tbl_user WHERE status = ?",
        ["active"],
        async (err, res) => {
          connection.destroy();
          if (err) {
            callback(null);
            return logger.error(
              who,
              err.message || "Some Error in getUsers function of db_get.js 2"
            );
          }
          if (res.length) {
            var string = JSON.stringify(res);
            var json = JSON.parse(string);

            return callback(json);
          } else {
            logger.warning(who, "data in users table not found");

            return callback(null);
          }
        }
      );
    });
  }
  async trades(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        return logger.error(
          who,
          err.message || "Some Error in trade function of db_get.js 1"
        );
      }
      connection.query(
        "SELECT * FROM tbl_trades WHERE market = ?",
        [data],
        async (err, res) => {
          connection.destroy();
          if (err) {
            callback(null);
            return logger.error(
              who,
              err.message || "Some Error in trade function of db_get.js 2"
            );
          }
          if (res.length) {
            var string = JSON.stringify(res);
            var json = JSON.parse(string);

            return callback(json);
          } else {
            logger.warning(who, "data in trades table not found");
            return callback(null);
          }
        }
      );
    });
  }

  async allTrades(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        return logger.error(
          who,
          err.message || "Some Error in allTrades function of db_get.js 1"
        );
      }
      connection.query(
        "SELECT * FROM tbl_trades WHERE side = ?",
        [data["side"]],
        async (err, res) => {
          connection.destroy();
          if (err) {
            callback(null);
            return logger.error(
              who,
              err.message || "Some Error in allTrades function of db_get.js 2"
            );
          }
          if (res.length) {
            var string = JSON.stringify(res);
            var json = JSON.parse(string);

            return callback(json);
          } else {
            logger.warning(who, "data in allTrades table not found");
            return callback(null);
          }
        }
      );
    });
  }
  async User(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        return logger.error(
          who,
          err.message || "Some Error in getUsers function of db_get.js 1"
        );
      }
      connection.query(
        "SELECT * FROM tbl_user WHERE id = ?",
        [data["id"]],
        async (err, res) => {
          connection.destroy();
          if (err) {
            callback(null);
            return logger.error(
              who,
              err.message || "Some Error in getUsers function of db_get.js 2"
            );
          }
          if (res.length) {
            var string = JSON.stringify(res);
            var json = JSON.parse(string);

            return callback(json);
          } else {
            logger.warning(who, "data in users table not found");

            return callback(null);
          }
        }
      );
    });
  }
  async getSettings(callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        connection.destroy();
        return logger.error(
          who,
          err.message || "Some Error in getSettings function of db_get.js 1"
        );
      }
      connection.query("SELECT * FROM tbl_settings", async (err, res) => {
        if (err) {
          connection.destroy();
          callback(null);
          return logger.error(
            who,
            err.message || "Some Error in getSettings function of db_get.js 2"
          );
        }
        if (res.length) {
          var string = JSON.stringify(res);
          var json = JSON.parse(string);
          connection.destroy();
          return callback(json);
        } else {
          logger.warning(who, "data in settings table not found");
          connection.destroy();
          return callback(null);
        }
      });
    });
  }
}

module.exports = GET;
