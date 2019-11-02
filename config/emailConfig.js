const nodemailer = require("nodemailer");
const emailAuth = require("./emailAuth");

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: emailAuth,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

module.exports = transporter;
