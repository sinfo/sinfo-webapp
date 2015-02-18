var config = require('client/js/helpers/clientconfig');
var log = require('bows')('fenix');
var cannon = require('client/js/auth/cannon');
var fenix = require('fenixedu')(config.fenix);
var fenixAuth = {};

fenixAuth.login = function(cb) {
  var authUrl = fenix.auth.getAuthUrl();
  window.location = authUrl;
};

fenixAuth.requestAccessToken = function(code) {
  if(!code){
  	return log('Incorrect auth flow');
  }
	cannon.loginWithFenix(code, app.currentPage.handleLogin);
};

module.exports = fenixAuth;
