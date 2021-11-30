const logger = require("../../log/log");
const config = require("../../config/config.json");
const who = "COINDCX_PRIVATE_API";

const request = require("request");
const crypto = require("crypto");

class DCXPrivate {
  constructor() {
    this.api = config.urls2;
    this.api1 = config.urls1;
  }

  async buy(data, callback) {
    /**
     * @data => @market_name @price_per_unit @total_quantity @key & @secret
     */
    const timeStamp = Math.floor(Date.now());

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      side: "buy", //Toggle between 'buy' or 'sell'.
      order_type: "limit_order", //Toggle between a 'market_order' or 'limit_order'.
      market: data["market_name"], //Replace 'SNTBTC' with your desired market.
      price_per_unit: data["price_per_unit"], //This parameter is only required for a 'limit_order'
      total_quantity: data["total_quantity"], //Replace this with the quantity you want
      timestamp: timeStamp,
    };
    // console.log(body);

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: this.api1 + "/exchange/v1/orders/create",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      // var json = JSON.parse(body)
      callback(body);
    });
  }

  async sell(data, callback) {
    /**
     * @data => @market @price_per_unit @total_quantity @key & @secret
     */

    const timeStamp = Math.floor(Date.now());

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      side: "sell", //Toggle between 'buy' or 'sell'.
      order_type: "limit_order", //Toggle between a 'market_order' or 'limit_order'.
      market: data["market"], //Replace 'SNTBTC' with your desired market.
      price_per_unit: data["price_per_unit"], //This parameter is only required for a 'limit_order'
      total_quantity: data["total_quantity"], //Replace this with the quantity you want
      timestamp: timeStamp,
    };
    // console.log(body);

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: this.api1 + "/exchange/v1/orders/create",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      // var json = JSON.parse(body)

      callback(body, error);
    });
  }

  async getbalance(data, callback) {
    const timeStamp = Math.floor(Date.now());
    // To check if the timestamp is correct

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      timestamp: timeStamp,
    };

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: this.api1 + "/exchange/v1/users/balances",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      let len = body.length - 1;
      for (let x = 0; x < body.length; x++) {
        if (body[x]["currency"] == data["currency"]) {
          callback(body[x], error);
          break;
        } else if (len === x) {
          callback(null);
          break;
        }
      }
    });
  }

  async cancelAllTrades(data, callback) {
    const baseurl = this.api1;

    const timeStamp = Math.floor(Date.now());

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      side: data["side"], //Toggle between 'buy' or 'sell'. Not compulsory
      market: data["market"], //Replace 'SNTBTC' with your desired market pair.
      timestamp: timeStamp,
    };

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: baseurl + "/exchange/v1/orders/cancel_all",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      callback(body);
    });
  }

  async getActiveTrades(data, callback) {
    const baseurl = this.api1;

    const timeStamp = Math.floor(Date.now());

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      side: data["side"], //Toggle between 'buy' or 'sell'.
      market: data["market"], //Replace 'SNTBTC' with your desired market pair.
      timestamp: timeStamp,
    };

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: baseurl + "/exchange/v1/orders/active_orders",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      return callback(body, error);
    });
  }

  async getTradeStatus(data, callback) {
    const baseurl = this.api1;

    const timeStamp = Math.floor(Date.now());

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      id: data["trade_id"], //Replace it with your Order ID.
      timestamp: timeStamp,
    };

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: baseurl + "/exchange/v1/orders/status",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      callback(body);
    });
  }

  async editTradePrice(data, callback) {
    const baseurl = this.api1;

    const timeStamp = Math.floor(Date.now());
    // To check if the timestamp is correct
    console.log(timeStamp);

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      id: data["order_id"], // Enter your Order ID here.
      timestamp: timeStamp,
      price_per_unit: data["price"], // Enter the new-price here
    };

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: baseurl + "/exchange/v1/orders/edit",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      return callback(body);
    });
  }
  async cancelOrder(data, callback) {
    const baseurl = this.api1;

    const timeStamp = Math.floor(Date.now());
    // To check if the timestamp is correct
    console.log(timeStamp);

    // Place your API key and secret below. You can generate it from the website.
    const key = data["key"];
    const secret = data["secret"];

    const body = {
      id: data["order_id"], //Replace this with your Order ID.
      timestamp: timeStamp,
    };

    const payload = new Buffer.from(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: baseurl + "/exchange/v1/orders/cancel",
      headers: {
        "X-AUTH-APIKEY": key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      callback(body)
    });
  }
}

module.exports = DCXPrivate;
