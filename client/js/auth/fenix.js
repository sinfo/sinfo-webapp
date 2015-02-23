var config = require('client/js/helpers/clientconfig');
var log = require('bows')('fenix');
var cannon = require('client/js/auth/cannon');
var fenix = require('fenixedu')(config.fenix);
var queryParam = require('client/js/helpers/queryParam');
var fenixAuth = {};

fenixAuth.login = function(add, cb) {
  cb || (cb = add);
  add = typeof add === 'function'? false : add;

  var authUrl = fenix.auth.getAuthUrl();

  //fenix redirect hack
  sessionStorage['cannon-fenix-add'] = add;
  sessionStorage['cannon-fenix-r'] = queryParam('r');
  window.location = authUrl;
};

fenixAuth.requestAccessToken = function(code) {
  var add = sessionStorage['cannon-fenix-add'];
  sessionStorage['cannon-fenix-add'] = '';

  add = add === 'true'? true : false;

  if(!code){
    return log('Incorrect auth flow');
  }
  cannon.loginWithFenix(code, add, function(){
    app.currentPage.handleLogin.apply(app.currentPage, arguments);
  });
};

module.exports = fenixAuth;
