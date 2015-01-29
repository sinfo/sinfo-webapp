var log = require('bows')('login');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
// var auth = require('client/js/auth');


module.exports = PageView.extend({
  pageTitle: 'Login',
  template: templates.pages.auth.login,
  render: function  () {
    PageView.prototype.render.apply(this, arguments);
  },
  events: {
    'click [data-hook~=facebook-login]': 'loginWithFacebook',
  },
  loginWithFacebook: function () {
    // auth.login('facebook', this.handleLogin);
  },
  handleLogin: function(status) {
    if(status) {
      log('User logged in successfully... redirecting him to home');
      app.navigate('/');
    }
  }
});
