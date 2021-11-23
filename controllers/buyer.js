const GET = require("../database/db_get");
const INSERT = require("../database/db_insert");
const UPDATE = require("../database/db_update");
const log = require("../log/log");
const COINDCX_PUBLIC_API = require("../coindcx_api/public/api");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
var get = new GET();
var insert = new INSERT();
var update = new UPDATE();
var public = new COINDCX_PUBLIC_API();
var private = new COINDCX_PRIVATE_API();
var who = "BUYER";

async function buyer() {
  let status;
  let users = [];
  let market;
  let price_per_unit;
  let total_fav;
  let key;
  let secret;
  let prepare_data;
  let total_quantity;
  let investable_amt;
  let market_data;
  let total_value;
  let user_id;
  let trade_data;

  //get data from buy_sell_pool
  status = { status: "approved", type: "Buy" };
  get.buyNsellQuery(status, async (allQuery) => {
    if (allQuery == null) return;
    allQuery.forEach(async (dataz) => {
      market = dataz["market_name"];

      price_per_unit = dataz["current_price"];

      //get users
      await get.Users(async (data) => {
        users = data;
        //get settings data
        await get.settings(async (data) => {
          total_fav = data["total_fav"];
          //get market data
          await public.getMarketDetails(market, async (data) => {
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
                total_quantity = parseFloat(total_quantity.toFixed(2));
                total_value = total_quantity * price_per_unit;
                user_id = user["id"];

                //verify metrics
                if (
                  market_data["min_quantity"] > total_quantity ||
                  market_data["min_price"] > total_value
                ) {
                  return log.warning(
                    who,
                    `Dont have enough quantity or money to buy ${market}`
                  );
                } else {
                  prepare_data = {
                    key: key,
                    secret: secret,
                    market: market,
                    price_per_unit: price_per_unit,
                    total_quantity: total_quantity,
                  };

                  //place order
                  private.buy(prepare_data, (done_data) => {
                    if (done_data["code"]) {
                      update.buyNsellQueryStatusUpdate(
                        dataz["id"],
                        "Buy failed",
                        (result) => {
                          if (result == null)
                            return log.error(
                              who,
                              "While trying to buy :" + done_data["message"]
                            );
                        }
                      );
                      log.error(
                        who,
                        "While trying to buy :" + done_data["message"]
                      );
                    } else {
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
                      trade_data = done_data["orders"][0];
                      trade_data["trade_id"] = trade_data["id"];
                      trade_data["user_id"] = user["id"];
                      insert.trade(trade_data, (result) => {
                        if (result == null)
                          return log.error(
                            who,
                            "Faild to add trade to database"
                          );
                      });
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

module.exports = buyer;
