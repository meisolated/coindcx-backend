// const request = require('request')

// const baseurl = "https://public.coindcx.com"

// // Replace the "B-BTC_USDT" with the desired market pair.
// request.get(baseurl + "/market_data/candles?pair=I-MANA_INR&interval=5m&limit=288",function(error, response, body) {
//    let resullt = JSON.parse(body)
//    let assume = []
//    resullt.forEach(e => {
//       assume.push(e['low'])
      
//    });
//    console.log(Math.max(...assume))
//    console.log(Math.min(...assume))
//    // console.log(resullt.length)
//    var sum = 0 
//    for (let i = 0; i < assume.length; i++) {
//       sum += parseFloat(assume[i],10);
      
//    }
//    var mean = sum/assume.length  
//    console.log(mean)
// })

//!-----------------------------------------------------------
const validator = require("./events/validator")

validator()
