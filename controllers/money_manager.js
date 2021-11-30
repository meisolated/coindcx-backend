/**
 *
 * get user and his/her allowed amount and verify avaiable money in account
 *
 */
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
const GET = require("../database/db_get");
const logger = require("../log/log");
var get = new GET();
var private_api = new COINDCX_PRIVATE_API();
const who = "MONEY MANAGER";

class MONEY {
  constructor() {}
  async verify(user, callback) {
    // get user
    get.User({ id: user["id"] }, (user) => {
      if (user == null) return console.log(user);
      user = user[0];
      console.log(user);
      let key = user["key"];
      let secret = user["secret"];
      let currency = "INR";
      private_api.getbalance(
        { key: key, secret: secret, currency: currency },
        (balances) => {
          let avaiable_amt = balances["balance"] - balances["locked_balance"];
          if (user["allowed_amount"] < avaiable_amt) {
            let can_trade_with = user["allowed_amount"] - user["amount_used"];
            return callback({
              status: "success",
              avaiable_amt: can_trade_with,
            });
          } else {
            callback({ status: "dont_have_enough_money" });
            return logger.warning(
              who,
              "dont have enough money to buy anything"
            );
          }
        }
      );
    });
  }
  async getInvestableMoney(market_name){
      
  }
}

module.exports = MONEY;
