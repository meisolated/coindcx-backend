const logger = require("./logger/log");

let data = {
  type: 3,
  who: "DATABASE",
  dec: "Error while connection to the database ",
};
logger.log(data);