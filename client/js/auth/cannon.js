var xhr = require('xhr');
var config = require('client/js/helpers/clientconfig');
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

cannon.addFacebookLogin = function(authResponse, cb) {
  var userID = authResponse.userID;
  var accessToken =  authResponse.accessToken;

  xhr({
    uri: config.cannonUrl +'/auth/add/facebook',
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
  var accessToken =  authResponse.access_token;
  
  xhr({
    uri: config.cannonUrl + '/auth/google',
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

cannon.addGoogleLogin = function(authResponse, userInfo, cb) {
  var userID = userInfo.result.id;
  var accessToken =  authResponse.access_token;
  
  xhr({
    uri: config.cannonUrl + '/auth/add/google',
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

cannon.loginWithFenix = function(code, cb) {

  xhr({
    uri: config.cannonUrl + '/auth/fenix',
    json: {
      code: code
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

cannon.addFenixLogin = function(code, cb) {

  xhr({
    uri: config.cannonUrl + '/auth/add/fenix',
    json: {
      code: code
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

