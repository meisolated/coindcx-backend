const chalk = require("chalk")
const log = console.log
const functions = require("../functions/function")
let time = functions.getdateNtime()
const error = chalk.bold.red
const warning = chalk.keyword("orange")

module.exports = {
  //functions
  error(who, dec) {
    //trim
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)
    let type = "ERROR"
    return log(
      `${chalk.bold(time)} ${chalk.bgRed(` ${type} `)} ${error(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },

  success(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)

    let type = "SUCCESS"
    return log(
      `${chalk.bold(time)} ${chalk.bgGreen(` ${type} `)} ${chalk.green(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  info(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)

    let type = "INFO"

    return log(
      `${chalk.bold(time)} ${chalk.bgBlue(` ${type} `)} ${chalk.blue(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  failed(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)

    let type = "FAILED"

    return log(
      `${chalk.bold(time)} ${chalk.bgRed(` ${type} `)} ${chalk.red(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  warning(who, dec) {
    dec.trim()
    dec.replace(/[^0-9\.,]/g, "")
    dec.substring(0, 298)

    let type = "WARNING"

    return log(
      `${chalk.bold(time)} ${chalk.bgYellowBright.blue(` ${type} `)} ${warning(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
}
