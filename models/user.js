var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User =  mongoose.Schema({
	username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: false,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    }
});

User.pre('save', function (next) {
  var user = this;
  
  var salt = bcrypt.genSaltSync(12);
  var hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  next();
})

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

User = module.exports = mongoose.model('User', User);