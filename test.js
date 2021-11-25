const request = require('request')

const baseurl = "https://public.coindcx.com"

// Replace the "B-BTC_USDT" with the desired market pair.
request.get(baseurl + "/market_data/orderbook?pair=I-BTC_INR",function(error, response, body) {
    console.log(body);
})