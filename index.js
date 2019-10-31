const express = require("express");
const app = express();
const emailAuth = require('./config/emailAuth');
const transporter = require('./config/emailConfig');
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

app.post('/contact', (req, res)=>{
  console.log(req.body);
  const mailOptions = {
    from: 'alfalfatechnologies@gmail.com', // sender address
    to: 'tayloralfers@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
  res.redirect('/index.html');

});

app.listen(port, ()=>{
  console.log('Server started on port ' + port);
})
