const GET = require("../database/db_get");
const log = require("../log/log");
const COINDCX_PUBLIC_API = require("../coindcx_api/public/api");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
var get = new GET();
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

  //get data from buy_sell_pool
  status = { status: "approved", type: "Buy" };
  get.buyNsellQuery(status, async (allQuery) => {
    allQuery.forEach(async (data) => {
      market = data["market_name"];

      price_per_unit = data["current_price"];

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

                //verify metrics
                if (market_data["min_quantity"] > total_quantity)
                  return log.warning(
                    who,
                    `Dont have enough quantity or money to buy ${market}`
                  );
                else
                  prepare_data = {
                    key: key,
                    secret: secret,
                    market: market,
                    price_per_unit: price_per_unit,
                    total_quantity: total_quantity,
                  };
                console.log(prepare_data);
              });
          });
        });
      });
    });
  });
}

module.exports = buyer;
