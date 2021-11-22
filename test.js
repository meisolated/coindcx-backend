const INSERT = require("./database/db_insert")

var insert = new INSERT()

let json_data = {
  market_name: "testing",
  pair: "I_testing_BTC",
  current_price: "20.20005",
  type: "Buy",
  status: "new",
}
insert.buyNsellSignal(json_data, () =>{

})
