var bodyParser = require('body-parser');
var path = require('path');

var expressSettings = (express, app) => {
  var mode;
  var configSettings = {};

  var htmlPATH = path.join(path.join(path.dirname(path.dirname(__dirname)), 'blog-frontend'), 'dist');
  app.use(express.static(htmlPATH));
  app.set('views', htmlPATH);

  if (process.env.PORT) {
    mode = 'production';
  } else {
    mode = 'development';
  }
  configSettings['mode'] = mode;

  app.use(bodyParser.json());

  if (mode === 'development') {
    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization, sid');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });
    configSettings['port'] = 4200;
  } else {
    configSettings['port'] = process.env.PORT;
  }

  return configSettings;
};

module.exports = expressSettings;
