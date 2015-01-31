var config = require('clientconfig');
var log = require('bows')('fenix');
var cannon = require('client/js/auth/cannon');
var fenix = require('fenixedu');
var fenixAuth = {};
var xhr = require('xhr');

var cb = null;

log(config.fenix);
fenix = fenix(config.fenix);

fenixAuth.login = function(cb) {
  this.cb = cb
  var authUrl = fenix.auth.getAuthUrl();
  console.log(authUrl)
  
  xhr({
    uri: authUrl,
    useXDR: true,
  }, function (err, resp, body) {
          log(resp);

    if(err) {
      return cb(null)
    }
  });
};

fenixAuth.requestAccessToken = function(code) {
  var codeTokens = code.split('=');

  if(codeTokens && codeTokens[1]) {
    fenix.auth.getAccessToken(codeTokens[1], function(body, response) {
      if(response)
        fenix.person.getPerson(response.access_token, function(err, reply){
          if(err) {
           return this.cb(null);
          }
          if(reply && this.cb)
            cannon.loginWithFenix(response, reply, this.cb); 
        });
      else {
        return this.cb(null);
      }
    });
  }
};

module.exports = fenixAuth;
