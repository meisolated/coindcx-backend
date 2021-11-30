const GET = require("../database/db_get");
const UPDATE = require("../database/db_update");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");

const log = require("../log/log");
const bidNask = require("../functions/bidNask");
var private_api = new COINDCX_PRIVATE_API();

var get = new GET();
var update = new UPDATE();
const who = "PURCHASE MANAGER";

//get all trades with side buy

let prepare_data;
let user;
let trade_id;
let user_id;
let current_price;
let postion_buy_price;
let how_high_we_can_go;
let now_price;

//?ORDER FULLFILLER SECTION
//get all fav

function purchaseManager() {
  get.favMarket((markets) => {
    markets.forEach((market) => {
      // get all positions
      get.getPosition(
        { market_name: market["market_name"], status: "all" },
        (positions) => {
          if (positions == null) return;
          positions.forEach((position) => {
            if (position["status"] === "1" || position["status"] === "2") {
              trade_id = position["trade_id"];
              user_id = position["user_id"];
              if (trade_id == null || trade_id == undefined || trade_id === "")
                return;
              //get user
              get.User({ id: user_id }, (User) => {
                user = User[0];
                if (user == null) return;
                //get trade status
                prepare_data = {
                  key: user["key"],
                  secret: user["secret"],
                  trade_id: trade_id,
                };
                private_api.getTradeStatus(prepare_data, (trade_status) => {
                  if(trade_status['side'] === "sell") return
                  // console.log(trade_status);
                  if (
                    trade_status["status"] === "open" ||
                    trade_status["status"] === "partially_filled"
                  ) {
                    // now edit price algo
                    current_price = parseFloat(trade_status["price_per_unit"]);
                    postion_buy_price = parseFloat(position["buy_price"]);
                    how_high_we_can_go =
                      postion_buy_price + parseFloat(position["buffer"]);

                    //get current bid and ask for the current market
                    bidNask(position["pair"], (result) => {
                      if (result == null) return;

                      if (result["bid"] > how_high_we_can_go) {
                        //we can cancel order over here
                        prepare_data = {
                          key: user["key"],
                          secret: user["secret"],
                          order_id: trade_id,
                        };
                        private_api.cancelOrder(prepare_data, (callback) => {
                          log.info(who, JSON.stringify(callback));

                          //now update position
                          prepare_data = {
                            bought_at: trade_status["price_per_unit"],
                            quantity: trade_status["total_quantity"],
                            status: 7,
                            position_cleared: "true",
                            trade_id: trade_status["id"],
                            id: position["id"],
                          };

                          update.updatePositionAfterBought(
                            prepare_data,
                            (r) => {
                              if (r == null)
                                return log.error(
                                  who,
                                  "updatePositionAfterBought"
                                );
                            }
                          );
                        });
                      } else {
                        if (result["bid"] < how_high_we_can_go) {
                          if (result["bid"] == current_price) return;
                          now_price = result["bid"] + 0.01;

                          prepare_data = {
                            key: user["key"],
                            secret: user["secret"],
                            order_id: trade_id,
                            price: now_price,
                          };
                          return private_api.editTradePrice(
                            prepare_data,
                            (result) => {
                              return log.info(who, JSON.stringify(result));
                            }
                          );
                        } else log.info(who, "limits crossed");
                      }
                    });
                  } else if (trade_status["status"] === "filled") {
                    prepare_data = {
                      bought_at: trade_status["price_per_unit"],
                      quantity: trade_status["total_quantity"],
                      status: 3,
                      position_cleared: "true",
                      trade_id: trade_status["id"],
                      id: position["id"],
                    };

                    update.updatePositionAfterBought(prepare_data, (r) => {
                      if (r == null)
                        return log.error(who, "updatePositionAfterBought");
                    });
                    prepare_data = trade_status;
                    prepare_data["trade_id"] = prepare_data["id"];
                    update.updateTrades(
                      prepare_data["id"],
                      prepare_data,
                      (cll) => {
                        if (cll == null) return log.error(who, updateTrades);
                      }
                    );
                  } else if (trade_status["status"] === "cancelled") {
                    prepare_data = {
                      bought_at: trade_status["price_per_unit"],
                      quantity: trade_status["total_quantity"],
                      status: 7,
                      position_cleared: "true",
                      trade_id: trade_status["id"],
                      id: position["id"],
                    };

                    update.updatePositionAfterBought(prepare_data, (r) => {
                      if (r == null)
                        return log.error(who, "updatePositionAfterBought");
                    });
                    prepare_data = trade_status;
                    prepare_data["trade_id"] = prepare_data["id"];
                    update.updateTrades(
                      prepare_data["id"],
                      prepare_data,
                      (cll) => {
                        if (cll == null) return log.error(who, updateTrades);
                      }
                    );
                  }
                });
              });
            }
          });
        }
      );
    });
  });
}

module.exports = purchaseManager;
