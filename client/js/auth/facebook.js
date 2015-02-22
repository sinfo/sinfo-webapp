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

fbAuth.checkState = function(add, cb) {
  FB.getLoginStatus(function(loginDetails) {
    log('Got facebook state', loginDetails);

    if(!loginDetails.authResponse) {
      return cb(null);
    }
    cb();
    //cannon.loginWithFacebook(loginDetails.authResponse, add, cb);
  });
};


fbAuth.login = function(add, cb) {
  cb || (cb = add);
  add = typeof add === 'function'? false : add;

  FB.login(function(loginDetails) {
    log('Got facebook login', loginDetails.authResponse);

    if (!loginDetails.authResponse) {
      return cb(new Error('couldn\'t get facebook auth details'))
    }
    cannon.loginWithFacebook(loginDetails.authResponse, add, cb);
  },{
    scope: 'email', 
    return_scopes: true
  });
};


module.exports = fbAuth;
