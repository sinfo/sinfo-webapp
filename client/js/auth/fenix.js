var config = require('clientconfig');
var log = require('bows')('fenix');
var cannon = require('client/js/auth/cannon');
var fenix = require('fenixedu');
var fenixAuth = {};
var xhr = require('xhr');

log(config.fenix);
fenix = fenix(config.fenix);

fenixAuth.login = function(cb) {
  var authUrl = fenix.auth.getAuthUrl();
  log(authUrl);
  log(config.fenix);
  log(config.fenix.oauthUrl+authUrl);
  window.open(authUrl, '_blank');
  this.callback = cb;
};

fenixAuth.requestAccessToken = function(code) {
  var codeTokens = code.split('=');

  if(!this.cb){
  	log('Incorrect auth flow');
  }

  if(codeTokens && codeTokens[1]) {
    fenix.auth.getAccessToken(codeTokens[1], function(body, response) {
      if(response)
        cannon.loginWithFenix(response, this.cb);
    });
  }
};

module.exports = fenixAuth;
