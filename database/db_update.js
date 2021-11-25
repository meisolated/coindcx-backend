const pool = require("./db.js");
const logger = require("../log/log");
const who = "UPDATE DATABASE";

class UPDATE {
  constructor() {
    this.pool = pool;
  }

  async buyNsellQueryStatusUpdate(id, status, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        callback(null);
        connection.destroy();
        return logger.error(who, err);
      }

      connection.query(
        "UPDATE tbl_buy_sell_pool SET status = ? WHERE id = ?",
        [status, id],
        (err, res) => {
          connection.destroy();
          if (err) {
            logger.error(who, err);
            return callback({ status: "null" });
          }
          if (res.affectedRows == 0) {
            var errs = "id not found";
            logger.warning(who, errs);
            return callback({ status: errs });
          }

          return callback({ status: "success" });
        }
      );
    });
  }
  async updateTrades(trade_id, data, callback) {
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        callback(null);
        connection.destroy();
        return logger.error(who, err);
      }

      /**
       *  @status @fee_amount @total_quantity @remaining_quantity @avg_price @price_per_unit @updated_at
       *
       */
      connection.query(
        "UPDATE tbl_trades SET status = ?, fee_amount = ?, total_quantity = ?, remaining_quantity = ?, avg_price = ?, price_per_unit = ?, updated_at = ? WHERE trade_id = ?",
        [
          data["status"],
          data["fee_amount"],
          data["total_quantity"],
          data["remaining_quantity"],
          data["avg_price"],
          data["price_per_unit"],
          data["updated_at"],
          trade_id,
        ],
        (err, res) => {
          connection.destroy();
          if (err) {
            logger.error(who, err.message);
            return callback({ status: "null" });
          }
          if (res.affectedRows == 0) {
            var errs = "id not found";
            logger.warning(who, errs);
            return callback({ status: errs.message });
          }

          return callback({ status: "success" });
        }
      );
    });
  }
}

module.exports = UPDATE;
