var config = require('clientconfig');
var log = require('bows')('fenix');
var cannon = require('client/js/auth/cannon');
var fenix = require('fenixedu');
var fenixAuth = {};
var xhr = require('xhr')


fenixAuth.login = function(cb) {
  var authUrl = fenix.auth.getAuthUrl()

  xhr({
    uri: authUrl,
    useXDR: true,
  }, function (err, resp, body) {
    log(err);
  });
};

module.exports = fenixAuth;
