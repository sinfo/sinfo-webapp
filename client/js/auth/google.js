var config = require('client/js/helpers/clientconfig');
var log = require('bows')('google');
var cannon = require('client/js/auth/cannon');

var gAuth = {};

gAuth.init = function () {
  $.getScript('//apis.google.com/js/plus.js', function () {
    $.getScript('//apis.google.com/js/client:plus.js?onload=handleClientLoad');
  });
};

window.handleClientLoad = function () {
  window.setTimeout(gAuth.checkState(function (cb) {
    //TODO What should this cb do?
  }), 1);
};

gAuth.checkState = function (cb) {
  var sessionParams = {
    client_id: config.google.appId,
    session_state: null
  };

  gapi.auth.checkSessionState(sessionParams, function (loginDetails) {
    log('Got google state', loginDetails);
    if (!loginDetails) {
      return cb(null);
    }

    cannon.loginWithGoogle(cb);
  });
};

gAuth.login = function (add, cb) {
  cb || (cb = add);
  add = typeof add === 'function'? false : add;

  var parameters = {
    client_id: config.google.appId,
    immediate: false,
    scope: ["https://www.googleapis.com/auth/userinfo.email"]
  };

  gapi.auth.authorize(parameters, function (loginDetails) {
    if (!loginDetails && loginDetails.error) {
      return cb(new Error('couldn\'t get google auth details'));
    }
    gapi.client.load('plus', 'v1').then(function () {
      var request = gapi.client.plus.people.get({
        'userId': 'me'
      });

      request.then(function (resp) {
        if (resp && !resp.result.id) {
          return cb(new Error('couldn\'t get google user id'));
        }
        cannon.loginWithGoogle(loginDetails, resp, add, cb);
      },
        function (reason) {
          return cb(new Error('couldn\'t get google user id'));
        });
    });
  });
};

module.exports = gAuth;