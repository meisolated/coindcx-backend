// // const request = require("request");

// // const baseurl = "https://public.coindcx.com";

// // // Replace the "B-BTC_USDT" with the desired market pair.
// // request.get(
// //   baseurl + "/market_data/orderbook?pair=I-MANA_INR",
// //   function (error, response, body) {
// //     let bodsy = JSON.parse(body);

// //     let asks = bodsy["asks"];
// //     let bids = bodsy["bids"];
// //     let asks_len = Object.keys(bodsy["asks"]).length;
// //     let bids_len = Object.keys(bodsy["bids"]).length;

// //     // console.log(asks_len);

// //     for (var propName in asks) {
// //       console.log(
// //         "Iterating through prop with name",
// //         propName,
// //         " its value is ",
// //         asks[propName]
// //       );
// //     }

// //     //get the last object
// //     //to get the key
// //     console.log(Object.keys(asks)[Object.keys(asks).length - 1]);
// //     //to get the value
// //     console.log(asks[Object.keys(asks)[Object.keys(asks).length - 1]]);

// //     console.log(Object.keys(bids)[0]);
// //     //to get the value
// //     console.log(bids[Object.keys(bids)[0]]);
// //   }
// // );
//!--------------------------------------------------------------------------------------
// const bidNask = require("./functions/bidNask")
// bidNask("I-MANA_INR", (result)=> {
//   console.log(result)
// })

// const UPDATE = require("./database/db_update")

// var update = new UPDATE()

// prepare_data = {
//   bought_at: 20,
//   quantity: 20,
//   status: 1,
//   position_cleared: "True",
//   id: 121,
//   trade_id: "7421c35e-50fa-11ec-9500-eb23a588f07c",
// };
// update.updatePositionAfterBought(prepare_data, (call)=> {
//   console.log(call)
// })

// let x = '25635.5455'
// x = parseFloat(x)
// x = x.toFixed(2)
// console.log(x)
//!----------------------------------------------------------------------------------

const sales_manager = require("./controllers/sales_manager")
sales_manager()