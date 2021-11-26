const config = require("./config/config.json")
const chalk = require("chalk")
var events = require("events")
var eventEmitter = new events.EventEmitter()
var notifier = require('./notifier/notifier')
const logger = require('./log/log')

//get events
const uptrendDetected = require("./events/uptrendDetected")
const downtrendDetected = require("./events/downtrendDetected")
const seller = require("./controllers/seller")
const trade_updater = require("./controllers/trades_updater")
const BUYER = require('./controllers/buyer')
var buyer = new BUYER()

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
  buyer.buyer()
  seller()
  trade_updater()
}, config.tick_interval)


