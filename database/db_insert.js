const pool = require("./db.js");
// const logger = require("../log/log") cant call insert from insert in logger
const logger = require("../log/simple");
const { getdateNtime, getdatenmonth } = require("../functions/function");

const who = "INSERT DATABASE";
class INSERT {
  constructor() {
    this.pool = pool;
  }

  async forLogger(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        logger.error(who, err);
        connection.destroy();
        return callback(null);
      } else {
        connection.query(
          "INSERT INTO tbl_logs SET id = NULL, frm = ?, datetime = ?, details = ?, message = ?, type = ?",
          [
            data["frm"],
            getdateNtime(),
            data["details"],
            data["message"],
            data["type"],
          ],
          (err, res) => {
            if (err) {
              connection.destroy();
              logger.error(who, err);
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

  async buyNsellSignal(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        logger.error(who, err.message);
        connection.destroy();
        return callback(null);
      } else {
        connection.query(
          "INSERT INTO tbl_buy_sell_pool SET id = NULL, market = ?, market_name = ?, pair = ?, current_price = ?, type = ?, status = ?, msg = ?, timestamp = ?",
          [
            data['market'],
            data["market_name"],
            data["pair"],
            data["current_price"],
            data["type"],
            data["status"],
            "null",
            getdateNtime(),
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
  async trade(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        logger.error(who, err.message);
        connection.destroy();
        return callback(null);
      } else {
        connection.query(
          "INSERT INTO tbl_trades SET id = NULL, user_id = ?, trade_id = ?, market = ?, order_type = ?, side = ?, status = ?, fee = ?, total_quantity = ?, remaining_quantity = ?, price_per_unit = ?, created_at = ?, updated_at = ?, datenmonth = ?",
          [
            data["user_id"],
            data["trade_id"],
            data["market"],
            data["order_type"],
            data["side"],
            data["status"],
            data["fee"],
            data["total_quantity"],
            data["remaining_quantity"],
            data["price_per_unit"],
            data["created_at"],
            data["updated_at"],
            getdatenmonth()
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
  async addPosition(data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        logger.error(who, err.message);
        connection.destroy();
        return callback(null);
      } else {
        connection.query(
          "INSERT INTO tbl_position SET id = NULL, user_id = ?, market = ?, market_name = ?, pair = ?, price = ?, timestamp = ?, status = ?",
          [
            data["user_id"],
            data["market"],
            data["market_name"],
            data["pair"],
            data["price"],
            getdateNtime(),
            data['status'],
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

module.exports = INSERT;
