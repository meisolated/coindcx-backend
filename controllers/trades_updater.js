const GET = require("../database/db_get");
const UPDATE = require("../database/db_update");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
var privatee = new COINDCX_PRIVATE_API();
var get = new GET();
var update = new UPDATE();
//first get all trades
async function trade_updater() {
  let prepare_data;
  await get.allTrades(async (allTrades) => {
    if(allTrades == null) return 
    //for each trade get user key and secret and get order status
    await allTrades.forEach(async (trade) => {
      if(trade == null) return 
      await get.User({ id: trade["user_id"] }, async (userdata) => {
        userdata = userdata[0];
        prepare_data = {
          key: userdata["key"],
          secret: userdata["secret"],
          trade_id: trade["trade_id"],
        };
        //time to get the trades
        privatee.getTradeStatus(prepare_data, (trade_status) => {
          if(trade_status == null) return 
          if (trade["updated_at"] == trade_status["updated_at"]) return;
          //time to update trades
          /***
           * @status @fee_amount @total_quantity @remaining_quantity @avg_price @price_per_unit @updated_at
           */
          prepare_data = {
            status: trade_status["status"],
            fee_amount: trade_status["fee_amount"],
            total_quantity: trade_status["total_quantity"],
            remaining_quantity: trade_status["remaining_quantity"],
            avg_price: trade_status["avg_price"],
            price_per_unit: trade_status["price_per_unit"],
            updated_at: trade_status["updated_at"],
          };

          //update
          update.updateTrades(trade["trade_id"], prepare_data, (result) => {});
        });
      });
    });
  });
}

module.exports = trade_updater;
