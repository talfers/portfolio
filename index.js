const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res)=>{
  res.sendFile('index.html');
})

app.get('/about', (req, res)=>{
  res.sendFile('about.html');
})

app.listen(port, ()=>{
  console.log('Server started on port ' + port);
})
