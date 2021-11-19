const config = require("./config/config.json");
const log = console.log;
const chalk = require("chalk");
var events = require("events");
var eventEmitter = new events.EventEmitter();

//call database

//Events
eventEmitter.on("databaseConnected", (database) => {});

eventEmitter.on("uptrendDetected", (market) => {});

eventEmitter.on("downtrendDetected", (market) => {});

eventEmitter.on("bought", (market) => {});

eventEmitter.on("sold", (market) => {});

setInterval(() => {
  log(chalk.bgBlue(" TRADE WORKER: ") + chalk.blue(" Starting Scripts"));
}, config.tick_interval);

// setInterval(() => {
//   log(chalk.bgBlue(" TRADE WORKER: ") + chalk.blue(" Starting Scripts"));
// }, config.tick_interval);
