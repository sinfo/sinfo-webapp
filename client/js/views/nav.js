var View = require('ampersand-view');
var templates = require('client/js/templates');
var auth = require('client/js/auth');

module.exports = View.extend({
  autoRender: true,
  template: templates.partials.nav,
  // bindings: {
  //   'model.name': [
  //     { type: 'toggle', yes: '[data-hook~=authenticated-menu]', no: '[data-hook~=unauthenticated-menu]' },
  //     { selector: '[data-hook~=user-name]' },
  //   ],
  //   'model.background': {
  //     type: 'attribute',
  //     hook: 'user-picture',
  //     name: 'style'
  //   },
  //   'model.img': {
  //     type: 'attribute',
  //     hook: 'user-picture',
  //     name: 'src'
  //   }
  // },
  // events: {
  //   'click [data-hook=action-logout]': 'handleLogout',
  //   'click [data-hook=action-login]': 'handleLogin',
  // },
  // handleLogout: function () {
  //   auth.logout();
  // },
  // handleLogin: function () {
  //   app.navigateToLogin();
  // },
});
