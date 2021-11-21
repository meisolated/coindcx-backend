const GET = require("../database/db_get")
const log = require("../log/log")
const get = new GET()
const who = "BUYER"

async function buyer() {
  //get data from buy_sell_pool
  get.buyNsellQuery((data) => {
      if(data == null){
          return log.failed(who, "data from the buyNsellQuery was null")
      }
      data.forEach(element => {
          if(element['status'] == "approved" && element['Buy']){
             console.log('yes') 
          }
      });
  })
}
