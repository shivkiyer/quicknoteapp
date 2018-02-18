var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var mongooseSettings = (configSettings) => {
  mongoose.connect('mongodb://localhost:27017/QuickNote', {
    useMongoClient: true
  });

  mongoose.connection.once('open', () => console.log("Connected"))
    .on('error', (e) => console.log(e));
}


module.exports = mongooseSettings;
