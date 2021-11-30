/**
 * initialize all basic things
 * and verify things
 * 
 */
const position_manager = require("./controllers/position_manager")
const purchase_manager = require("./controllers/purchase_manager")
const config = require("./config/config.json")
const log = require("./log/log")
const simple = require("./log/simple")

 setInterval(() => {
    simple.info("MAIN js", "heart beat")
    position_manager()
    purchase_manager()
  }, config.tick_interval)
