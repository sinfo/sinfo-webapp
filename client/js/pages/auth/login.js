var log = require('bows')('login');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var auth = require('client/js/auth');
var $ = require('jquery');


module.exports = PageView.extend({
  pageTitle: 'Login',
  template: templates.pages.auth.login,
  render: function  () {
    PageView.prototype.render.apply(this, arguments);

    auth.init();
  },
  events: {
    'click [data-hook=facebook-login]': 'loginWithFacebook',
    'click [data-hook=google-login]': 'loginWithGoogle',
  },
  loginWithFacebook: function () {
    auth.login('facebook', this.handleLogin);
  },
  loginWithGoogle: function () {
    auth.login('google', this.handleLogin);
  },
  handleLogin: function(err, user) {
    var id, token;
    log('handleLogin', arguments);
    if(err) {
      return alert(err.error);
    }

    if (user.authResponse) {
      id = user.authResponse.userID;
      token = user.authResponse.accessToken;
      $.get('95.85.37.125:9000/auth/facebook' + id + '/' + token, function () {
        app.fetchInitialData();
        app.me.authenticated = true;
        app.navigate('/');
      });
    }
  }
});
