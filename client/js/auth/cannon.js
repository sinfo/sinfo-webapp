var xhr = require('xhr');
var cannonUrl = require('clientconfig').cannonUrl;

var cannon = {};

cannon.loginWithFacebook = function(authResponse, cb) {
  xhr({
    uri: cannonUrl+'/auth/facebook/'+authResponse.userID+'/'+authResponse.accessToken,
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = JSON.parse(body);
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    cb(null, data);
  });
};

cannon.loginWithGoogle = function(authResponse, userInfo, cb) {
  var userID = userInfo.result.id 
  var accessToken =  authResponse.token
  
  xhr({
    uri: cannonUrl+'/auth/google/'+userID+'/'+accessToken,
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = JSON.parse(body);
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    cb(null, data);
  });
};

cannon.loginWithFenix = function(authResponse, cb) {
  
}

module.exports = cannon;

