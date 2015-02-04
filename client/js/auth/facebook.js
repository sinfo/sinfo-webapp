var config = require('client/js/helpers/clientconfig');
var log = require('bows')('facebook');
var cannon = require('client/js/auth/cannon');

var fbAuth = {};

fbAuth.init = function() {
  if(window.FB !== undefined) {
    return;
  }

  $.getScript('//connect.facebook.net/pt_PT/all.js', function () {
    FB.init({
      appId: config.facebook.appId,
      xfbml: true,
      status: true,
      cookie: true
    });
  });
};

fbAuth.checkState = function(cb) {
  FB.getLoginStatus(function(loginDetails) {
    log('Got facebook state', loginDetails);

    if(!loginDetails.authResponse) {
      return cb(null);
    }

    cannon.loginWithFacebook(loginDetails.authResponse, cb);
  });
};


fbAuth.login = function(cb) {
  FB.login(function(loginDetails) {
    log('Got facebook login', loginDetails.authResponse);

    if (!loginDetails.authResponse) {
      return cb(new Error('couldn\'t get facebook auth details'))
    }

    cannon.loginWithFacebook(loginDetails.authResponse, cb);
  });
};


module.exports = fbAuth;
