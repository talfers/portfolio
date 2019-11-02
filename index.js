const express = require("express");
const app = express();
const transporter = require('./config/emailConfig');
const port = process.env.PORT || 3000;

// BodyParser Setup
app.use(express.urlencoded({extended: false}));

// Static dir setup
app.use(express.static(__dirname + '/dist'));

// Get root page
app.get('/', (req, res)=>{
  res.sendFile('index.html');
});

// Get about page
app.get('/about', (req, res)=>{
  res.sendFile('about.html');
});

// Get portfolio page
app.get('/portfolio', (req, res)=>{
  res.sendFile('portfolio.html');
});

// Get contact page
app.get('/contact', (req, res)=>{
  res.sendFile('contact.html');
});

// Post to contact an email to client and myself
app.post('/contact', (req, res)=>{
  const { name, email, phone, subject, message } = req.body;
  if(!name || !email || !message) {
    res.redirect('/contact.html');
  }
  const clientMailOptions = {
    from: 'alfalfatechnologies@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Thank you for your inquiry!', // Subject line
    html: `
      <h3>Thanks for reaching out, ${name}!</h3>
      <p style="color: purple">We will be in contact within 48 business hours</p>
    `// plain text body
  };
  const myMailOptions = {
    from: 'no-reply@tayloralfers.com', // sender address
    to: 'alfalfatechnologies@gmail.com', // list of receivers
    subject: 'New Alfalfa Inquiry!', // Subject line
    html: `
      <h3>New Inquiry</h3>
      <p style="color: red">Please contact within 48 business hours</p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone?phone:'none'}</p>
      <p>Subject: ${subject?subject:'none'}</p>
      <p>Body: ${message}</p>
    `// plain text body
  };
  transporter.sendMail(myMailOptions, function (err, info) {
     if(err) console.log(err)
  });
  transporter.sendMail(clientMailOptions, function (err, info) {
     if(err) console.log(err)
  });
  res.redirect('/index.html');
});

// Start server
app.listen(port, ()=>{
  console.log('Server started on port ' + port);
})
