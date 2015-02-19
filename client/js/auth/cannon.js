var xhr = require('xhr');
var config = require('client/js/helpers/clientconfig');
var log = require('bows')('cannon-auth');

var cannon = {};

cannon.loginWithFacebook = function(authResponse, add, cb) {
  cb || (cb = add);
  var userID = authResponse.userID;
  var accessToken =  authResponse.accessToken;
  var uri = '/auth';
  uri += add === true ? '/add' : '';
  var header = app.me && app.me.token ? {Authorization: 'Bearer ' + app.me.token} : {};

  xhr({
    uri: config.cannonUrl + uri + '/facebook',
    json: {
      id: authResponse.userID,
      token: authResponse.accessToken
    },
    method: 'POST',
    headers: header,
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

cannon.loginWithGoogle = function(authResponse, userInfo, add, cb) {
  cb || (cb = add);
  var userID = userInfo.result.id;
  var accessToken =  authResponse.access_token;
  var uri = '/auth';
  uri += add === true ? '/add' : '';
  var header = app.me && app.me.token ? {Authorization: 'Bearer ' + app.me.token} : {};

  xhr({
    uri: config.cannonUrl + uri + '/google',
    json: {
      id: userID,
      token: accessToken
    },
    method: 'POST',
    headers: header,
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

cannon.loginWithFenix = function(code, add, cb) {
  cb || (cb = add);
  var uri = '/auth';
  uri += add === true ? '/add' : '';
  var header = app.me && app.me.token ? {Authorization: 'Bearer ' + app.me.token} : {};

  xhr({
    uri: config.cannonUrl + uri + '/fenix',
    json: {
      code: code
    },
    method: 'POST',
    headers: header,
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

