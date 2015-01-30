/*global app, me, $*/
var config = require('clientconfig');
var log = require('bows')('login');
var fbAuth = require('./facebook');
var gAuth = require('./google');
var fenixAuth = require('./fenix');
var auth = {};

auth.init = function() {
  fbAuth.init();
  gAuth.init();
};

auth.login = function(type, cb) {
  log('type', type)
  if(type === 'facebook') {
    fbAuth.checkState(function (err, user) {
      if(err) {
        return cb(err);
      }

      if(user) {
        return cb(null, user);
      }

      fbAuth.login(cb);
    });
  }
  else if (type === 'google') {
    gAuth.login(cb);   
  }
  else if (type === 'fenix') {
    fenixAuth.login(cb);
  }
  else {
    log.error('Unknown type', type);
  }
  
};

// User is not authorized, redirect
// him/her to login page
auth.redirectToLogin = function(cb) {
  if(cb) {
    log('Redirecting unauthorized user');
    cb();
  } else {
    log('Logging out...');
    window.location.href = 'auth/login';
  }
};

auth.logout = function() {

};

module.exports = auth;
