var nodemailer = require('nodemailer');
var temp = require("./temp1")

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emailiame69@gmail.com',
    pass: 'rIvvCjHvyZBD2DFq'
  }
});

var mailOptions = {
  from: 'emailiame69@gmail.com',
  to: 'fisolatedx@gmail.com',
  subject: 'Sending Email using Node.js',
  html: temp
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});