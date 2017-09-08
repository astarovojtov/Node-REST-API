var mongoose = require('mongoose');
var config = require('../lib/config');

mongoose.connect(config.get('mongoose:uri'), {
  useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection established');
  console.log(process.cwd())
});

module.exports = mongoose;