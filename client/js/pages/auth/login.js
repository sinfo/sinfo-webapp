var log = require('bows')('login');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var auth = require('client/js/auth');


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
    'click [data-hook=fenix-login]': 'loginWithFenix',
  },
  loginWithFacebook: function () {
    auth.login('facebook', this.handleLogin);
  },
  loginWithGoogle: function () {
    auth.login('google', this.handleLogin);
  },
  loginWithFenix: function () {
    auth.login('fenix', this.handleLogin);
  },
  handleLogin: function(err, user) {
    log('handleLogin', arguments);
    if(err) {
      return alert(err.error);
    }

    app.fetchInitialData();
    app.navigate('/');
  }
});
