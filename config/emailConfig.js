const nodemailer = require("nodemailer");
const emailAuth = require("./emailAuth");

const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: emailAuth()
});

module.exports = transporter;
