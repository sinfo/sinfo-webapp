var config = require('clientconfig');
var log = require('bows')('fenix');
var cannon = require('client/js/auth/cannon');
var fenix = require('fenixedu')(config.fenix);
var fenixAuth = {};

log(config.fenix);

fenixAuth.login = function(cb) {
  var authUrl = fenix.auth.getAuthUrl();
  log(authUrl);
  log(config.fenix);
  log(config.fenix.oauthUrl+authUrl);
  window.location = authUrl;
};

fenixAuth.requestAccessToken = function(code) {
  if(!code){
  	log('Incorrect auth flow');
  }
	cannon.loginWithFenix(code, app.view.handleLogin);
};

module.exports = fenixAuth;
