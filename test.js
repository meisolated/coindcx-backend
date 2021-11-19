const DCXpublic = require("./coindcx_api/public/api")
const dcx = new DCXpublic()

let data = {"market":"I-MANA_INR", "interval": "1d", "limit" : "7"}
let callback = ""
dcx.getCandles(data, callback)