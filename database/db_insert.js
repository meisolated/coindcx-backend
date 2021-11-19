const sql = require("./db.js")
const logger = require('../logger/log')

cosnt who = "INSERT DATABASE"
class INSERT {
    constructor(){

    }

    async forLogger(data, callback){
        sql.query("INSERT INTO tbl_logs SET ?", data, (err, res)=> {
            if(err){
                logger.error(who, err)
                return null
            }
        })
    }
}