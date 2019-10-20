const express = require("express");
const app = express();
const nodemailer = require("node-mailer");
const emailAuth = require('./emailAuth');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res)=>{
  res.sendFile('index.html');
});

app.get('/about', (req, res)=>{
  res.sendFile('about.html');
});

app.get('/portfolio', (req, res)=>{
  res.sendFile('portfolio.html');
});

app.get('/contact', (req, res)=>{
  res.sendFile('contact.html');
});

app.post('/contact', function(req, res){
    const custOutput = `
        <h3>Thank you for your inquiry, !</h3>
        <p>We will reach out to you within 48 business hours.</p>
        `;
    const coOutput = `
        <h2>You have a new inquiry!</h2>
        <h4>Lead Details:</h4>
        <p>Name: </p>
        <p>Phone #: </p>
        <p>Email: </p>
        <p>Est Size: sqft</p>
        <p>Project Desc:</p>
        <p style='color: red;'>Please contact them within 48 business hours.</p>
        `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: emailAuth.user, // generated ethereal user
              pass: emailAuth.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptionsCust = {
            from: '"alfalfa Technologies" <no-reply@alfalfatechnologies.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Thank you for your inquiry!", // Subject line
            text: "alfalfa Technologies Thanks You", // plain text body
            html: custOutput // html body
        };

        // setup email data with unicode symbols
        let mailOptionsCo = {
            from: '"River City Hardwood" <no-reply@rivercityhardwood.com>', // sender address
            to: "scistar17@hotmail.com", // list of receivers
            subject: "You have a new inquiry", // Subject line
            text: "River City Hardwood Inquiry", // plain text body
            html: coOutput // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptionsCust, function(error, info){
            if(error) {
                return console.log(error);
            }
                console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                /*res.send('email has been sent');*/
          });
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        // send mail with defined transport object
        transporter.sendMail(mailOptionsCo, function(error, info){
            if(error) {
                return console.log(error);
            }
                console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                res.sendFile('index.html');
          });
});

app.listen(port, ()=>{
  console.log('Server started on port ' + port);
})
