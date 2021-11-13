const _ = require("lodash");
const request = require("request");

// const baseurl = "https://api.coindcx.com"

// request.get(baseurl + "/exchange/ticker",function(error, response, body) {
//    // console.log(body);
//    let json_data = JSON.parse(body)

//    for (let index = 0; index < json_data.length; index++) {
//        const element = json_data[index];
//             console.log(element)
//       //  if(element["market"] === "MANAINR"){
//       //      break;
//       //  }

//    }

//     _.forEach(json_data, function(value){
//         //console.log(value["market"])

//         if(value['market'] === 'MANAINR')
//         {
//             console.log(value)
//             stop;
//         }

//     })

// })

// // const database = require("./database/connect");
// const db = database.connect()

// db.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results[0].solution);
// });

// db.end()

// console.log(Date.now());
//!-----------------------------------------------------------------------------------------------------------------------------------------------
// var twirlTimer = (function () {
//   var P = ["\\", "|", "/", "-"];
//   var x = 0;
//   return setInterval(function () {
//     process.stdout.write("\r" + P[x++] + " Running... ");

//     x &= 3;
//   }, 100);
// })();

// twirlTimer;


//----------------------------------------------------------------------------------------------------------

// const baseurl = "https://public.coindcx.com"

// // Replace the "B-BTC_USDT" with the desired market pair.
// request.get(baseurl + "/market_data/candles?pair=I-MANA_INR&interval=1M",function(error, response, body) {
//     console.log(body);
// })


var timestamp = 1635552000000
var date = new Date(timestamp);
console.log(date.getTime())
console.log(date)
