const chalk = require("chalk");
const log = console.log;
const functions = require('../functions/function')

module.exports = {
  log(data) {
    const types = {
      0: "info",
      1: "success",
      2: "failed",
      3: "error",
      4: "warning",
    };

    let time = functions.getdateNtime()
    const who = data.who;
    let dec = data.dec;

    const error = chalk.bold.red;
    const warning = chalk.keyword("orange");

    if (data.type == 0) {
      log(
        chalk.bold(time) +
          " " +
          chalk.blue(` ${data.who} :`) +
          chalk.white(` ${data.dec}`)
      );
    } else if (data.type == 1) {
      log(
        chalk.bold(time) +
          " " +
          chalk.green(` ${data.who} :`) +
          chalk.white(` ${data.dec}`)
      );
    } else if (data.type == 2) {
      log(
        chalk.bold(time) +
          " " +
          chalk.red(` ${data.who} :`) +
          chalk.white(` ${data.dec}`)
      );
    } else if (data.type == 3) {
      log(
        chalk.bold(time) +
          " " +
          error(` ${data.who} :`) +
          chalk.white(` ${data.dec}`)
      );
    } else if (data.type == 4) {
      log(
        chalk.bold(time) +
          " " +
          warning(` ${data.who} :`) +
          chalk.white(` ${data.dec}`)
      );
    } else {
      log(chalk.bold(time) +
      " " +
      warning(` WARNING: No type was sent`));
      log(
        chalk.bold(time) +
          " " +
          warning(` ${data.who} :`) +
          chalk.white(` ${data.dec}`)
      );
    }
  },
};
