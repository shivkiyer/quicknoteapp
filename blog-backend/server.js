var express = require('express');

var app = express();

app.get('/home', (req, res) => {
  console.log("connected to front-end");
  res.send("Message back from the backend");
});

app.listen(3000, () => {
  console.log("Backend server running on port 3000");
});
