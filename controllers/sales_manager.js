const GET = require("../database/db_get");
const UPDATE = require("../database/db_update");
const COINDCX_PRIVATE_API = require("../coindcx_api/private/api");
const COINDCX_PUBLIC_API = require("../coindcx_api/public/api");
const log = require("../log/log");
const bidNask = require("../functions/bidNask");
var private_api = new COINDCX_PRIVATE_API();
var public_api = new COINDCX_PUBLIC_API();

var get = new GET();
var update = new UPDATE();
const who = "SALES MANAGER";

//get all trades with side buy

let prepare_data;
let user;
let how_low_we_can_go;
let sell_price_for_now;
//?ORDER FULLFILLER SECTION
//get all fav

function salesManager() {
  get.favMarket((markets) => {
    markets.forEach((market) => {
      // get all positions
      get.getPosition(
        { market_name: market["market_name"], status: "3" },
        (positions) => {
          if (positions == null) return;
          positions.forEach((position) => {
            //GOT THE USER
            get.User({ id: position["user_id"] }, (User) => {
              user = User[0];
              //CHECK THE TRADE ID IF ITS SELL OR BUY
              prepare_data = {
                key: user["key"],
                secret: user["secret"],
                trade_id: position["trade_id"],
              };
              private_api.getTradeStatus(prepare_data, (trade_status) => {
                if (trade_status["side"] === "buy") {
                  public_api.getTicker(
                    { market_name: market["market_name"] },
                    (ticker) => {
                      if (ticker[0]["last_price"] >= position["sell_price"]) {
                        /**
                         * we need lowest amount to sell
                         * market_name
                         * user
                         */
                        how_low_we_can_go =
                          position["sell_price"] - position["buffer"];

                        bidNask(position["pair"], (bidnask) => {
                          if (bidnask["ask"] < how_low_we_can_go) return;
                          else {
                            sell_price_for_now = bidnask["ask"] - 0.01;
                          }
                        });
                      } else {
                        console.log("not yet in position to sell");
                      }
                    }
                  );
                } else if (trade_status["side"] === "sell") {
                  how_low_we_can_go =
                    position["sell_price"] - position["buffer"];

                  bidNask(position["pair"], (bidnask) => {
                    if (bidnask["ask"] < how_low_we_can_go) return;
                    else {
                      sell_price_for_now = bidnask["ask"] - 0.01;
                    }
                  });
                }
              });
            });
          });
        }
      );
    });
  });
}

module.exports = salesManager;
