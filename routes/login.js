var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {

    User.findOne({ username: username }, function(err, user) {
      
      if (err) { return done(err); }
      if (!user) {
        console.log('invalid username');
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.validPassword(password)) {
        
        console.log('invalid Password');
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }
));

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', passport.authenticate('local', { successRedirect: '/users',
                                                  failureRedirect: '/' })
);

module.exports = router;