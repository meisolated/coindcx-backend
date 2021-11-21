var express = require("express")
var app = express()
const cors = require("cors")

var bodyParser = require("body-parser")

var corsOptions = {
  origin: "http://localhost:8081",
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

var port = 8080 // set our port

// var router = express.Router() // get an instance of the express Router

// // middleware to use for all requests
// router.use(function (req, res, next) {
//   // do logging
//   console.log("Something is happening.")
//   next() // make sure we go to the next routes and don't stop here
// })
const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Isolated application." })
})

require("./api/routes/routes.js")(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
