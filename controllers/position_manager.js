/**
 *
 * Look into positons and finalize them
 * if a position status is Equal to waiting then look for buy price and if it's in buffer rage than buy
 *
 */

const GET = require("../database/db_get");
const UPDATE = require("../database/db_update");
const COINDCX_PUBLIC_API = require("../coindcx_api/public/api");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
const log = require("../log/log");
const INSERT = require("../database/db_insert");
var public_api = new COINDCX_PUBLIC_API();
var private_api = new COINDCX_PRIVATE_API();
var get = new GET();
var update = new UPDATE();
var insert = new INSERT();
var tempMailer = require("../mail/sendmail");
const who = "POSITION MANAGER";

function position_manager() {
  get.favMarket((markets) => {
    if (markets == null)
      return log.error(who, "Faild to get markets from database");
    markets.forEach((market) => {
      //get all positions for each market
      let prepare_data;
      get.getPosition(
        { market_name: market["market_name"], status: "all" },
        (positions) => {
          if (positions == null)
            return log.error(who, "Faild to get positions from database");
          positions.forEach((position) => {
            if (position["can_buy"] === "true" && position["status"] === "5") {
              update.updatePositionStatus(
                { id: position["id"], status: 6 },
                () => {}
              );
              //we can buy over here after clearing all facts
              // verify current price should be below our buy_price
              public_api.getTicker(
                { market_name: market["market_name"] },
                (data) => {
                  Ticker = data[0];
                  //place order
                  //   before that get user data
                  get.User({ id: position["user_id"] }, (user) => {
                    user = user[0];
                    // @market_name @price_per_unit @total_quantity @key & @secret
                    // get market details
                    public_api.getMarketDetails(
                      market["market_name"],
                      (details) => {
                        //arange money for purchase
                        let investableMoney =
                          (user["allowed_amount"] / 100) *
                          market["tradeable_percentage"];

                        let price_per_unit =
                          position["buy_price"] -
                          (position["buy_price"] / 100) * 2;

                        let total_quantity = investableMoney / price_per_unit;
                        total_quantity = parseFloat(
                          total_quantity.toFixed(
                            details["target_currency_precision"]
                          )
                        );
                        /**
                         * @data => @market_name @price_per_unit @total_quantity @key & @secret
                         */
                        prepare_data = {
                          market_name: position["market_name"],
                          price_per_unit: parseFloat(price_per_unit.toFixed(2)),
                          total_quantity: total_quantity,
                          key: user["key"],
                          secret: user["secret"],
                        };
                        private_api.buy(prepare_data, (trade_data) => {
                          if (trade_data["code"]) {
                            update.updatePositionStatus(
                              { id: position["id"], status: 7 },
                              () => {
                                log.error(who, JSON.stringify(trade_data));
                              }
                            );
                          } else {
                            tempMailer();
                            trade_data = trade_data["orders"][0];

                            log.success(
                              who,
                              "Order Placed for : " + position["market_name"]
                            );
                            prepare_data = {
                              bought_at: price_per_unit,
                              quantity: total_quantity,
                              status: 1,
                              position_cleared: "True",
                              id: position["id"],
                              trade_id: trade_data["id"],
                            };

                            update.updatePositionAfterBought(
                              prepare_data,
                              (result) => {
                                if (result == null) {
                                  return log.error(
                                    who,
                                    "Faild to updatePositionAfterBought to database"
                                  );
                                }
                              }
                            );

                            trade_data["market"] = position["market_name"];
                            trade_data["trade_id"] = trade_data["id"];
                            trade_data["user_id"] = position["user_id"];
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
                    );
                  });
                }
              );
            }
          });
        }
      );
    });
  });
}

module.exports = position_manager;
