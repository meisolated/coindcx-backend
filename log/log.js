const chalk = require("chalk")
const log = console.log
const functions = require("../functions/function")
let time = functions.getdateNtime
const error = chalk.bold.red
const warning = chalk.keyword("orange")
const INSERT = require("../database/db_insert")

var insert = new INSERT()

module.exports = {
  //functions
  error(who, dec) {
    //trim
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)
    let msg = "Got an error brhh!!"
    let type = "ERROR"
    let json_data = {
      frm: who,
      datetime: time(),
      details: dec,
      message: msg,
      type: type,
    }
    insert.forLogger(json_data, () => {})
    return log(
      `${chalk.bold(time())} ${chalk.bgRed(` ${type} `)} ${error(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },

  success(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)

    let msg = "Ohh got you"
    let type = "SUCCESS"
    let json_data = {
      frm: who,
      datetime: time(),
      details: dec,
      message: msg,
      type: type,
    }
    insert.forLogger(json_data, () => {})
    return log(
      `${chalk.bold(time())} ${chalk.bgGreen(` ${type} `)} ${chalk.green(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  info(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)
    
    let msg = "got some info bro"
    let type = "INFO"
    let json_data = {
      frm: who,
      datetime: time(),
      details: dec,
      message: msg,
      type: type,
    }
    insert.forLogger(json_data, () => {})
    return log(
      `${chalk.bold(time())} ${chalk.bgBlue(` ${type} `)} ${chalk.blue(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  failed(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)

    let msg = "I don't like it but broo i failed"
    let type = "FAILED"
    let json_data = {
      frm: who,
      datetime: time(),
      details: dec,
      message: msg,
      type: type,
    }
    insert.forLogger(json_data, () => {})
    return log(
      `${chalk.bold(time())} ${chalk.bgRed(` ${type} `)} ${chalk.red(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  warning(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)
    
    let msg = "I'm Warning you broo, don't do this"
    let type = "WARNING"
    let json_data = {
      frm: who,
      datetime: time(),
      details: dec,
      message: msg,
      type: type,
    }
    insert.forLogger(json_data, () => {})
    return log(
      `${chalk.bold(time())} ${chalk.bgYellowBright.blue(` ${type} `)} ${warning(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
}
