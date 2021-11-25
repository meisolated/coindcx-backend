const GET = require("../database/db_get");
const INSERT = require("../database/db_insert");
const UPDATE = require("../database/db_update");
const log = require("../log/log");
const notifier = require("../notifier/notifier");

const COINDCX_PUBLIC_API = require("../coindcx_api/public/api");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
var get = new GET();
var insert = new INSERT();
var update = new UPDATE();
var publicc = new COINDCX_PUBLIC_API();
var privatee = new COINDCX_PRIVATE_API();
var who = "BUYER";

class BUYER {
  async buyer() {
    var status;
    var users = [];
    var market;
    var market_name;
    var price_per_unit;
    var total_fav;
    var key;
    var secret;
    var prepare_data;
    var total_quantity;
    var investable_amt;
    var market_data;
    var total_value;
    var user_id;
    var trade_data;

    //get data from buy_sell_pool
    status = { status: "approved", type: "Buy" };
    get.buyNsellQuery(status, async (allQuery) => {
      if (allQuery == null) return;
      allQuery.forEach(async (dataz) => {
        update.buyNsellQueryStatusUpdate(dataz["id"], "In Progress", () => {});
        market_name = dataz["market_name"];
        market = dataz["market"];
        price_per_unit = dataz["current_price"];

        //get users
        await get.Users(async (data) => {
          users = data;
          //get settings data
          await get.settings(async (data) => {
            total_fav = data["total_fav"];
            //get market data
            await publicc.getMarketDetails(market_name, async (data) => {
              market_data = data;
              if (market_data == null) return console.log("oke1");
              if (total_fav == null || total_fav == undefined)
                return console.log("oke2");
              if (users == null) return console.log("oke3");
              else
                users.forEach(async (user) => {
                  secret = user["secret"];
                  key = user["key"];
                  investable_amt = user["allowed_amount"] / total_fav;
                  total_quantity = investable_amt / price_per_unit;
                  total_quantity = parseFloat(
                    total_quantity.toFixed(data["target_currency_precision"])
                  );
                  total_value = total_quantity * price_per_unit;

                  user_id = user["id"];

                  //verify metrics
                  if (market_data["min_quantity"] > total_quantity) {
                    return log.warning(
                      who,
                      `Dont have enough quantity or money to buy ${market_name}`
                    );
                  } else {
                    prepare_data = {
                      key: key,
                      secret: secret,
                      market: market_name,
                      price_per_unit: price_per_unit,
                      total_quantity: total_quantity,
                    };

                    //place order
                    privatee.buy(prepare_data, (done_data) => {
                      if (done_data["code"]) {
                        update.buyNsellQueryStatusUpdate(
                          dataz["id"],
                          "Buy failed",
                          (result) => {
                            if (result == null)
                              return log.error(
                                who,
                                "problem with buyNsellQueryStatusUpdate"
                              );
                          }
                        );
                        log.error(
                          who,
                          "While trying to buy :" + done_data["message"]
                        );
                      } else {
                        log.success(who, "Order Placed for : " + market);
                        prepare_data = {
                          user_id: user_id,
                          market: market,
                          market_name: market_name,
                          pair: dataz["pair"],
                          price: price_per_unit,
                          status: "open",
                        };
                        insert.addPosition(prepare_data, (callback) => {});

                        trade_data = done_data["orders"][0];
                        trade_data["market"] = market;
                        trade_data["trade_id"] = trade_data["id"];
                        trade_data["user_id"] = user_id;
                        // console.log(trade_data)
                        insert.trade(trade_data, (result) => {
                          if (result == null)
                            return log.error(
                              who,
                              "Faild to add trade to database"
                            );
                        });
                        update.buyNsellQueryStatusUpdate(
                          dataz["id"],
                          "Order Placed",
                          (result) => {
                            if (result == null)
                              return log.error(
                                who,
                                "While trying to buy :" + done_data["message"]
                              );
                          }
                        );
                      }
                    });
                  }
                });
            });
          });
        });
      });
    });
  }
}

module.exports = BUYER;
