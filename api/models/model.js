const { isEmpty } = require("lodash");
const GET = require("../../database/db_get");
const INSERT = require("../../database/db_insert");
const UPDATE = require("../../database/db_update");
var get = new GET();
var insert = new INSERT();
var update = new UPDATE();

const Model = () => {};

Model.getPosition = (data1, result) => {
  get.getPosition(data1, (data) => {
    if (data == null) return result({ status: "error" }, null); //! this is like result(err, data) . NULL if not found
    return result(null, data);
  });
};

Model.postLogs = (data, result) => {
  /**
   * @data params should be {@frm @details @message @type}
   */
  if (
    isEmpty(data["frm"]) ||
    isEmpty(data["details"]) ||
    isEmpty(data["message"]) ||
    isEmpty(data["type"])
  ) {
    return result({ status: "missing params" }, null);
  } else {
    insert.forLogger(data, (callback) => {
      if (callback == null) {
        return result({ status: "error" }, null);
      } else {
        return result(null, "done");
      }
    });
  }
};

Model.getFav = (result) => {
  get.favMarket((data) => {
    if (data == null)
      return result({ status: "error favMarket return null" }, null);
    else return result(null, data);
  });
};





Model.updatePosition = (data, result) => {
  /**
   * @data should be like this @market_name @currently_in
   *
   */
  if (
    data["id"] === undefined ||
    data["buy_price"] === undefined ||
    data["sell_price"] === undefined ||
    data["can_buy"] === undefined ||
    data["buffer"] === undefined 
  ) {
    return result({ status: "missing params" }, null);
  } else {
    if (
      isEmpty(data["id"]) ||
      isEmpty(data["buy_price"]) ||
      isEmpty(data["sell_price"]) ||
      isEmpty(data["can_buy"]) ||
      isEmpty(data["buffer"]) 
    ) {
      return result({ status: "missing params" }, null);
    } else {
      update.updatePosition(data, (callback) => {
        if (callback == null) {
          return result({ status: "error" }, null);
        } else {
          return result(null, "done");
        }
      });
    }
  }
};

Model.insertPosition = (data, result) => {
  /**
   * @data should be like this@market @market_name @pair @buy_price @sell_price
   *
   */

  if (
    data["market"] === undefined ||
    data["market_name"] === undefined ||
    data["pair"] === undefined ||
    data["buy_price"] === undefined ||
    data["sell_price"] === undefined || 
    data["buffer"] === undefined 
  ) {
    return result({ status: "missing params" }, null);
  } else {
    if (
      isEmpty(data["market"]) ||
      isEmpty(data["market_name"]) ||
      isEmpty(data["pair"]) ||
      isEmpty(data["buy_price"]) ||
      isEmpty(data["sell_price"]) ||
      isEmpty(data["buffer"])
    ) {
      return result({ status: "missing params" }, null);
    } else {
      insert.addPosition(data, (callback) => {
        if (callback == null) {
          return result({ status: "error" }, null);
        } else {
          return result(null, "done");
        }
      });
    }
  }
};

module.exports = Model;
