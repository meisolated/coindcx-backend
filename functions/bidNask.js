const request = require("request");

const baseurl = "https://public.coindcx.com";


function bidNask(pair, callback) {
    request.get(
        baseurl + `/market_data/orderbook?pair=${pair}`,
        function (error, response, body) {
            let bodsy = JSON.parse(body);

            let asks = bodsy["asks"];
            let bids = bodsy["bids"];
            // let asks_len = Object.keys(bodsy["asks"]).length;
            // let bids_len = Object.keys(bodsy["bids"]).length;

            // console.log(asks_len);
            // for (var propName in asks) {
            //     console.log(
            //         "Iterating through prop with name",
            //         propName,
            //         " its value is ",
            //         asks[propName]
            //     );
            // }

            // //get the last object
            // //to get the key
            // console.log(Object.keys(asks)[Object.keys(asks).length - 1]);
            // //to get the value
            // console.log(asks[Object.keys(asks)[Object.keys(asks).length - 1]]);

            // console.log(Object.keys(bids)[0]);
            // //to get the value
            // console.log(bids[Object.keys(bids)[0]]);

            let data = {
                ask : Object.keys(asks)[Object.keys(asks).length - 1],
                bid : Object.keys(bids)[0]
            }
            return callback(data)
        }
    );
}

module.exports = bidNask