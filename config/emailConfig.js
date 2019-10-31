const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
      user: 'alfalfatechnologies@gmail.com',
      pass: 'PinBack3*0'
    }
});

module.exports = transporter;
