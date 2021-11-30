var nodemailer = require("nodemailer");
var temp = require("./temp1");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "emailiame69@gmail.com",
    pass: "rIvvCjHvyZBD2DFq",
  },
});

var buyAlert = {
  from: "emailiame69@gmail.com",
  to: "fisolatedx@gmail.com",
  subject: "Sending Email using Node.js",
  text: "bought Something",
};

function sendAlert() {
  transporter.sendMail(buyAlert, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendAlert;
