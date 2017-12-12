var express = require('express');
var path = require('path');

var app = express();
var rootPath = path.normalize(__dirname);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(rootPath, 'dist')));

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
