const GET = require("../database/db_get");
const INSERT = require("../database/db_insert");
const UPDATE = require("../database/db_update");
const DELETE = require("../database/db_delete");
const log = require("../log/log");
const COINDCX_PUBLIC_API = require("../coindcx_api/public/api");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
var get = new GET();

var update = new UPDATE();
var del = new DELETE();
var insert = new INSERT();
var publicc = new COINDCX_PUBLIC_API();
var private = new COINDCX_PRIVATE_API();
var who = "SELLER";

async function seller() {
  let status;
  let market;
  let price_per_unit;
  let market_name;
  let prepare_data;
  let total_quantity;
  let trade_data;
  let users;
  let user_id;

  //get data from buy_sell_pool
  status = { status: "approved", type: "Sell" };
  get.buyNsellQuery(status, async (allQuery) => {
    if (allQuery == null) return;
    await allQuery.forEach(async (dataq) => {
      market_name = dataq["market_name"];
      market = dataq["market"];
      price_per_unit = dataq["current_price"];

      // change status once we start to execute
      update.buyNsellQueryStatusUpdate(dataq["id"], "In Progress", () => {
        log.info(who, "Cancel order for " + market_name);
      });

      //get users
      await get.Users(async (data) => {
        users = data;
        if (data == null) return;

        users.forEach((user) => {
          //First we need to cancel if any orders
          prepare_data = {
            key: user["key"],
            secret: user["secret"],
            side: "buy",
            market: market_name,
            currency: market,
          };

          private.cancelAllTrades(prepare_data, async (callback) => {
            await private.getbalance(prepare_data, async (result) => {
              if (result == null) return;

              total_quantity = result["balance"] - result["locked_balance"];
              if (total_quantity != 0) {
                //time to to get currency precision
                await publicc.getMarketDetails(market_name, async (data) => {
                  prepare_data = {
                    key: user["key"],
                    secret: user["secret"],
                    market: market_name,
                    price_per_unit: price_per_unit,
                    total_quantity: parseFloat(
                      total_quantity.toFixed(data["target_currency_precision"])
                    ),
                  };
                  user_id = user["id"];
                  private.sell(prepare_data, (result, error) => {
                    if (result["code"]) {
                      return log.error(
                        who,
                        "While trying to sell :" + result["message"]
                      );
                    } else {
                      log.success(who, "Placed order to sell: " + market_name);
                      trade_data = result["orders"][0];
                      trade_data["market"] = market;
                      trade_data["trade_id"] = trade_data["id"];
                      trade_data["user_id"] = user_id;
                      insert.trade(trade_data, (result) => {
                        if (result == null)
                          return log.error(
                            who,
                            "Faild to add trade to database"
                          );
                      });
                      update.buyNsellQueryStatusUpdate(
                        dataq["id"],
                        "order placed",
                        () => {
                          del.Position(
                            { user_id: user_id, market_name: market_name },
                            (callback) => {}
                          );
                        }
                      );
                    }
                  });
                });
              } else {
                return log.info(who, "Found no curreny to sell");
              }
            });
          });
        });
      });
    });
  });
}

module.exports = seller;
