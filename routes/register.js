var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  var emailRegexp = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
  
  if ( req.body.password != req.body.repeatPassword)
    res.status(401).json('Passwords should match');
  if ( req.body.password.length < 5 )
    res.status(418).json('Password is teapot... i mean, too short');
  if ( req.body.username.length < 3 )
    res.status(418).json('Username is teapot... i mean, too short');
  if ( !req.body.email.match(emailRegexp) )
    res.status(412).json('Email is not valid');
  
  var user;
  
  User.findOne({ username: req.body.username }).then( 
    function (response) {
      user = response;
        if (user) {
          res.status(409).json('Username already taken');
        } else {
          var user = new User; 
          user.username = req.body.username;
          user.password = req.body.password;
          user.email = req.body.email;
          
          user.save().then( function(response) {
            res.json(response); 
          });
        }
  });
  
});

module.exports = router;