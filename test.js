const request = require('request')
const crypto = require('crypto')

const baseurl = "https://api.coindcx.com"

const timeStamp = Math.floor(Date.now());

// Place your API key and secret below. You can generate it from the website.
const key = "2293f91b2e8fbb0923b802bc2194b826d90532cc0d8436ec";
const secret = "0a88d82960c17a6f2666bb7ecdf0e34c4acc775df6fd232866bcc92c7187566e";


const body = {
    "side": "buy",  //Toggle between 'buy' or 'sell'.
    "order_type": "limit_order", //Toggle between a 'market_order' or 'limit_order'.
    "market": "MANAINR", //Replace 'SNTBTC' with your desired market.
    "price_per_unit": "331.21", //This parameter is only required for a 'limit_order'
    "total_quantity": 1, //Replace this with the quantity you want
    "timestamp": timeStamp
}

const payload = new Buffer.from(JSON.stringify(body)).toString();
const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

const options = {
    url: baseurl + "/exchange/v1/orders/create",
    headers: {
        'X-AUTH-APIKEY': key,
        'X-AUTH-SIGNATURE': signature
    },
    json: true,
    body: body
}

request.post(options, function(error, response, body) {
    console.log(body);
})


// const COINDCX_PUBLIC_API = require("./coindcx_api/public/api")

// var coin = new COINDCX_PUBLIC_API()

// console.log(coin.getMarketDetails("MANAINR"))