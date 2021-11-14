const { Database } = require("./db.js")

let db = new Database()

let x = db.disconnect

class Get extends Database {
  superconstructor(database) {
    console.log("ze")
  }
}

let xz = new Get()
