const COINDCX_PUBLIC_API = require("./coindcx_api/public/api")

var coindcx_public = new COINDCX_PUBLIC_API()

console.log(coindcx_public.getMarketDetails("CRVINR"))

"python3 .\supertrend_worker_v2.py >.\supertrend_worker_v2.out 2>.\supertrend_worker_v2.err"