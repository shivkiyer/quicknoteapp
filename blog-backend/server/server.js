var express = require('express');

var app = express();
var configSettings = require('./../config/express')(express, app);
require('./../config/mongoose')(configSettings);

require('./../config/routes')(app);

app.listen(configSettings.port, () => {
  console.log(`Backend server running on port ${configSettings.port}`);
});
