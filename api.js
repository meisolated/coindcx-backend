var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

var port = process.env.PORT || 8080 // set our port

var router = express.Router() // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log("Something is happening.")
  next() // make sure we go to the next routes and don't stop here
})

router
  .route("/getFav")

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function (req, res) {
    res.json({ message: "hooray! welcome to our api!" })
  })
  .get(function (req, res) {
    res.json({ message: "hooray! welcome to our api!!!" })
  })

app.use("/api", router)

app.listen(port)
console.log("Magic happens on port " + port)
