
const GET = require('./database/db_get')

const get = new GET()

get.getPositions(data => {
    console.log(data)
})