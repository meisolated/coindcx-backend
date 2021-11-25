const request = require("request");

const baseurl = "https://public.coindcx.com";

// Replace the "B-BTC_USDT" with the desired market pair.
request.get(
  baseurl + "/market_data/orderbook?pair=I-BTC_INR",
  function (error, response, body) {
    let bodsy = JSON.parse(body);

    let asks = bodsy["asks"];
    let bids = bodsy["bids"];
    let asks_len = Object.keys(bodsy["asks"]).length;
    let bids_len = Object.keys(bodsy["bids"]).length;

    console.log(asks_len);

    for (var propName in asks) {
      console.log(
        "Iterating through prop with name",
        propName,
        " its value is ",
        asks[propName]
      );

    }
    
    //get the last object
    //to get the key
    console.log(Object.keys(asks)[Object.keys(asks).length-1])
    //to get the value
    console.log(asks[Object.keys(asks)[Object.keys(asks).length - 1]]);
  }
);
