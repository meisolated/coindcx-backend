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


const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Isolated application." })
})

require("./api/routes/routes.js")(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
