const sql = require("./db.js")

// constructor
const db = function (db) {
  this.title = db.title
  this.description = db.description
  this.published = db.published
}

db.create = (newdb, result) => {
  sql.query("INSERT INTO dbs SET ?", newdb, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created db: ", { id: res.insertId, ...newdb })
    result(null, { id: res.insertId, ...newdb })
  })
}

db.findById = (id, result) => {
  sql.query(`SELECT * FROM dbs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log("found db: ", res[0])
      result(null, res[0])
      return
    }

    // not found db with the id
    result({ kind: "not_found" }, null)
  })
}

db.getAll = (title, result) => {
  let query = "SELECT * FROM dbs"

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log("dbs: ", res)
    result(null, res)
  })
}

db.getAllPublished = (result) => {
  sql.query("SELECT * FROM dbs WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log("dbs: ", res)
    result(null, res)
  })
}

db.updateById = (id, db, result) => {
  sql.query(
    "UPDATE dbs SET title = ?, description = ?, published = ? WHERE id = ?",
    [db.title, db.description, db.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // not found db with the id
        result({ kind: "not_found" }, null)
        return
      }

      console.log("updated db: ", { id: id, ...db })
      result(null, { id: id, ...db })
    }
  )
}

db.remove = (id, result) => {
  sql.query("DELETE FROM dbs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // not found db with the id
      result({ kind: "not_found" }, null)
      return
    }

    console.log("deleted db with id: ", id)
    result(null, res)
  })
}

db.removeAll = (result) => {
  sql.query("DELETE FROM dbs", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} dbs`)
    result(null, res)
  })
}

module.exports = db
