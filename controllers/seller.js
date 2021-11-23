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
var who = "SELLER";

async function seller() {
  let status;
  let users = [];
  let market;
  let price_per_unit;
  let total_fav;
  let key;
  let market_name;
  let secret;
  let prepare_data;
  let total_quantity;
  let investable_amt;
  let market_data;
  let total_value;
  let user_id;
  let trade_data;

  //get data from buy_sell_pool
  status = { status: "approved", type: "Sell" };
  get.buyNsellQuery(status, async (allQuery) => {
    if (allQuery == null) return;
    await allQuery.forEach(async (dataq) => {
      market_name = dataq["market_name"];
      market = dataq["market"];
      price_per_unit = dataq["current_price"];

      //get users
      await get.Users(async (data) => {
        if (data == null) return;
        await data.forEach(async (users) => {
          prepare_data = {
            key: users["key"],
            secret: users["secret"],
            currency: market,
          };
          await private.getbalance(prepare_data, (result) => {
            if (result == null) return;
            total_quantity = result["balance"] - result["locked_balance"];
            if (total_quantity != 0) {
              //time to sell
              prepare_data = {
                key: users["key"],
                secret: users["secret"],
                market: market_name,
                price_per_unit: price_per_unit,
                total_quantity: total_quantity,
              };
              private.sell(prepare_data, (result) => {
                if (result["code"]) {
                  return log.error(
                    who,
                    "While trying to sell :" + result["message"]
                  );
                }
                update.buyNsellQueryStatusUpdate(
                  dataq["id"],
                  "order placed",
                  () => {}
                );
              });
            } else {
              return log.info(who, "Found no curreny to sell");
            }
          });
        });
      });
    });
  });
}

module.exports = seller;
