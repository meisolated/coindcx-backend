module.exports = {
  getdateNtime() {
    // current date
    // adjust 0 before single digit date
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    return ` ${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  },
  between(x, min, max) {
    return x >= min && x <= max;
  },

  getdatenmonth() {
    // current date
    // adjust 0 before single digit date
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // // current year
    // let year = date_ob.getFullYear()

    // // current hours
    // let hours = date_ob.getHours()

    // // current minutes
    // let minutes = date_ob.getMinutes()

    // // current seconds
    // let seconds = date_ob.getSeconds()

    return ` ${date}-${month}`;
  },

  uptime() {
    // Node.js program to demonstrate the
    // os.uptime() method

    // Allocating os module
    const os = require("os");

    // Printing os.uptime() value
    var ut_sec = os.uptime();
    var ut_min = ut_sec / 60;
    var ut_hour = ut_min / 60;

    ut_sec = Math.floor(ut_sec);
    ut_min = Math.floor(ut_min);
    ut_hour = Math.floor(ut_hour);

    ut_hour = ut_hour % 60;
    ut_min = ut_min % 60;
    ut_sec = ut_sec % 60;

    return (
      "Up time: " +
      ut_hour +
      " Hour(s) " +
      ut_min +
      " minute(s) and " +
      ut_sec +
      " second(s)"
    );
  },
};
