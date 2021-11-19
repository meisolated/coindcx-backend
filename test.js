// const DCXPublic = require("./coindcx_api/public/api")

// let dcx = new DCXPublic()

// let nothingx = "nothing"
// async function nothing(nothingx) {
//   let anything = await dcx.getTicker("nothing", function (result) {
//     var json = JSON.parse(result)
//     json.forEach((element) => {
//       if (element["market"] == "MANAINR") {
//         console.log(element["last_price"])
//       }
//     })
//   })
// }

// nothing()

const validator = require("./events/validator")

validator()