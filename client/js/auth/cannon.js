var xhr = require('xhr');
var config = require('clientconfig');
var log = require('bows')('cannon-auth');

var cannon = {};

cannon.loginWithFacebook = function(authResponse, cb) {
  var userID = authResponse.userID;
  var accessToken =  authResponse.accessToken;

  xhr({
    uri: config.cannonUrl +'/auth/facebook',
    json: {
      id: authResponse.userID,
      token: authResponse.accessToken
    },
    method: 'POST'
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = body;
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    cb(null, data);
  });
};

cannon.loginWithGoogle = function(authResponse, userInfo, cb) {
  var userID = userInfo.result.id;
  var accessToken =  authResponse.token;
  
  xhr({
    uri: config.cannonUrl+'/auth/google',
    json: {
      id: userID,
      token: accessToken
    },
    method: 'POST'
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = body;
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    cb(null, data);
  });
};

cannon.loginWithFenix = function(authResponse, userInfo, cb) {
  var userName = userInfo.username
  var accessToken = authResponse.accessToken
  var refreshToken = authResponse.refreshToken
  
  xhr({
    uri: config.cannonUrl+'/auth/fenix',
    json: {
      userName: userName,
      accessToken: accessToken,
      refreshToken: refreshToken
    },
    method: 'POST'
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = body;
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    cb(null, data);
  });
};

module.exports = cannon;

