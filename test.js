const request = require('request')

const baseurl = "https://public.coindcx.com"

// Replace the "B-BTC_USDT" with the desired market pair.
request.get(baseurl + "/market_data/candles?pair=B-BTC_USDT&interval=1m",function(error, response, body) {
   let resullt = JSON.parse(body)
   console.log()
})