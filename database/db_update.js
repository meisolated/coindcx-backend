const pool = require("./db.js");
const logger = require("../log/log");
const DCX_PUBLIC = require("../coindcx_api/public/api");
const who = "UPDATE DATABASE";
var publics = new DCX_PUBLIC();
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
          } else {
            return callback({ status: "success" });
          }
        }
      );
    });
  }
  async updateFav(data, callback) {
    const timeStamp = Math.floor((Date.now() / 1000) | 0);
    this.pool.getConnection(async function (err, connection) {
      if (err) {
        callback(null);
        connection.destroy();
        return logger.error(who, err);
      }

      /**
       *  @currently_in @last_update @market
       *
       */

      var current_price;
      //get current price
      let json_dataa = { market_name: data["market_name"] };
      await publics.getTicker(json_dataa, (market_detials) => {
        current_price = market_detials[0]["last_price"];
        connection.query(
          "UPDATE tbl_fav SET currently_in = ?, last_update = ?, current_price = ? WHERE market_name = ?",
          [data["currently_in"], timeStamp, current_price, data["market_name"]],
          (err, res) => {
            connection.destroy();
            if (err) {
              logger.error(who, err.message);
              return callback({ status: "null" });
            }
            if (res.affectedRows == 0) {
              var errs = "id not found";
              logger.warning(who, errs);
              return callback({ status: err });
            } else {
              return callback({ status: "success" });
            }
          }
        );
      });
    });
  }
}

module.exports = UPDATE;
