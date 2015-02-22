/*global app, me, $*/
var config = require('client/js/helpers/clientconfig');
var log = require('bows')('auth');
var fbAuth = require('./facebook');
var gAuth = require('./google');
var fenixAuth = require('./fenix');
var auth = {};

auth.init = function() {
  fbAuth.init();
  gAuth.init();
};

auth.login = function(type, add, cb) {
  log('type', type);
  cb || (cb = add);
  add = typeof add === 'function'? false : add;

  log(add);

  if(type === 'facebook') {
    /*fbAuth.checkState(add, function (err, user) {
      if(err) {
        return cb(err);
      }

      if(user) {
        return cb(null, user);
      }
      log({add: add}, 'This is a ADD!');
      fbAuth.login(add, cb);
    });*/
    fbAuth.login(add, cb);
  }
  else if (type === 'google') {
    gAuth.login(add, cb);
  }
  else if (type === 'fenix') {
    fenixAuth.login(add, cb);
  }
  else {
    log.error('Unknown type', type);
  }

};

auth.logout = function() {
  log('Logging out');
  sessionStorage.removeItem('cannon-auth');
  app.me.clear();

  if(window.location.pathname.indexOf('/me') != -1) {
    app.navigate('/auth/login');
  }
  // app.navigate('/auth/login');
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

module.exports = auth;
