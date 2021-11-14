const Database = require("./database/db")
const logger = require('./logger/log')

let db = Database.getConnection()
db.query("SELECT * FROM tbl_settings", function (err, result, fields) {
  if (err) return logger.error("Worker", err)
//   console.log(result[0])
  console.log(result[0].api_url_1)
 
})

Database.disconnect()
