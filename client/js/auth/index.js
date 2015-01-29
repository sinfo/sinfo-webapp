/*global app, me, $*/
var config = require('clientconfig');
var log = require('bows')('login');
var fbAuth = require('./facebook');

var auth = {};

auth.init = function() {
  fbAuth.init();
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
  } else {
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
