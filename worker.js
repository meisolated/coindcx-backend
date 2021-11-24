const config = require("./config/config.json")
const chalk = require("chalk")
var events = require("events")
var eventEmitter = new events.EventEmitter()
var notifier = require('./notifier/notifier')
const logger = require('./log/log')

//get events
const uptrendDetected = require("./events/uptrendDetected")
const downtrendDetected = require("./events/downtrendDetected")
//call database

//Events

notifier.on("uptrendDetected", (market) => {
  logger.success("UPTREND DETECTED", market['market_name'])
})

notifier.on("downtrendDetected", (market) => {
  logger.success("DOWNTREND DETECTED", market['market_name'])
})

notifier.on("bought", (market) => {
  console.log(market)
})

notifier.on("sold", (market) => {
  console.log(market)
})

setInterval(() => {
  // log(chalk.bgBlue(" TRADE WORKER: ") + chalk.blue(" Starting Scripts"))
  uptrendDetected()
  downtrendDetected()
}, config.tick_interval)


