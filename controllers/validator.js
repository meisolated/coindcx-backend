const DCXPublic = require("../coindcx_api/public/api");
const GET = require("../database/db_get");
const UPDATE = require("../database/db_update");
const logger = require("../log/log");
const validateTicker = require("../functions/ticker_handler");
const buyer = require("./buyer")
const who = "VALIDATOR";
var dcx = new DCXPublic();
var get = new GET();
var update = new UPDATE();

async function validator(resultx) {
  await update.buyNsellQueryStatusUpdate(resultx["id"], "in_progress", (cb) => {});

  // if validator is disabled in settings then approve
  await get.settings(async (d) => {
    if (d["validator"] === "false") {
      return update.buyNsellQueryStatusUpdate(
        resultx["id"],
        "approved",
        (cb) => {
          logger.success(
            who,
            `Uptrend signal got APPROVED for ${resultx["market_name"]}`
          );
          logger.warning(who, "VALIDATOR is disabled");
        }
      );
    } else {
      //! IF VALIDATOR IS ENABLED
      await dcx.getTicker(resultx, async function (result) {
        if (result == null) return;

        validateTicker(resultx, result, async (callback, id) => {
          //! Not using candle data to validate a purchases
          if (callback === "B") {
            update.buyNsellQueryStatusUpdate(id, "approved", (cb) => {
              if (cb.status != null) {
                logger.success(
                  who,
                  `Uptrend signal got APPROVED for ${resultx["market_name"]}`
                );
              }
            });
          } else if (callback === "D") {
            update.buyNsellQueryStatusUpdate(id, "denied", (cb) => {
              if (cb.status != null) {
                logger.info(
                  who,
                  `Uptrend signal got DENIED for ${resultx["market_name"]}`
                );
              }
            });
          } else {
            logger.warning(who, "Ticker Handler return unknown value");
          }
        });
      });
    }
  });

  // IF SELL DO THIS
  // await resultx.forEach((e) => {
  //   if (e["status"] != "new") return
  //   if (e["type"] != "Sell") return
  //   json_data.push(e["market_name"])
  // })
  // ! SELL SINGALS WILL BE COME PRE APPROVED
}

module.exports = validator;
