const chalk = require("chalk")
const log = console.log
const functions = require("../functions/function")
let time = functions.getdateNtime()
const error = chalk.bold.red
const warning = chalk.keyword("orange")

module.exports = {
  //functions
  error(who, dec) {
    return log(
      `${chalk.bold(time)} ${chalk.bgRed(` ERROR `)} ${error(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },

  success(who, dec) {
    return log(
      `${chalk.bold(time)} ${chalk.bgGreen(` SUCCESS `)} ${chalk.green(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  info(who, dec) {
    return log(
      `${chalk.bold(time)} ${chalk.bgBlue(` INFO `)} ${chalk.blue(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  failed(who, dec) {
    return log(
      `${chalk.bold(time)} ${chalk.bgRed(` FAILED `)} ${chalk.red(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
  warning(who, dec) {
    return log(
      `${chalk.bold(time)} ${chalk.bgYellowBright.blue(` WARNING `)} ${warning(
        ` ${who} :`
      )} ${chalk.white(` ${dec}`)}`
    )
  },
}
