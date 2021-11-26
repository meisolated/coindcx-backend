const moment = require("moment");
const GET = require("./database/db_get");
const logger = require("./log/simple");
var get = new GET();
const who = "MARKET STATE";
var firstTime = moment();

get.favMarket((data) => {
  //   console.info(data);
  data.forEach((markets) => {
    let x;
    if (markets["currently_in"] === "True") x = "Uptrend";
    else x = "Downtrend";

    let moment_time = moment()
    var secondTime = moment.unix(markets['last_update'])
    var timeDifference = firstTime.diff(secondTime, 'seconds')
    console.log(timeDifference)
    logger.info(
      who,
      `TIME ${moment_time} => ${markets["market_name"]} is in ${x}`
    );
  });
});
// var firstTime = moment();

// setInterval(someTask,1000);
// function someTask(){
//   var secondTime = moment();
//   var timeDifference = secondTime.diff(firstTime, 'seconds')
//   console.log(timeDifference)
// }
