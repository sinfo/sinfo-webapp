var config = require('clientconfig');
var log = require('bows')('fenix');
var cannon = require('client/js/auth/cannon');
var fenix = require('fenixedu');
var fenixAuth = {};
var xhr = require('xhr');
var request = require('request');

fenixAuth.login = function(cb) {
  var authUrl = fenix.auth.getAuthUrl()

  //  xhr({
//    uri: authUrl,
//    useXDR: true,
//  }, function (err, resp, body) {
//    log(err);
//  });
 
  var options = {
    url: authUrl,
  };  
  request.get(options, function(error, response, body) {
    console.log(error, response, body);
  });
};

fenixAuth.requestAccessToken = function(code) {
  var codeTokens = code.split('=');

  if(codeTokens && codeTokens[1]) {
    fenix.auth.getAccessToken(codeTokens[1], function(body, response) {
      if(response)
        cannon.loginWithFenix(response);
    })
  }
}

module.exports = fenixAuth;
