const BUYER = require("./controllers/buyer");

var buyer = new BUYER();

async function nothing(params) {
  let x = await buyer.buyer(x => console.log(x));
//   console.log(x);
}

nothing()
