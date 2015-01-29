/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var LoginPage = require('./pages/auth/login');

var WebAppRouter = Router.extend({
  routes: {
    '': 'home',
    'auth/login': 'login',
    '(*path)': 'catchAll'
  },

  execute: function(callback, args, name) {
    if(!app.me.authenticated) {
      this.redirectTo('auth/login');
      return this.login();
    } else {
      return Router.prototype.execute.apply(this, [callback, args, name]);
    }
  },

  // ------- ROUTE HANDLERS ---------
  home: function () {
    this.trigger('page', new HomePage({
      model: app.me
    }));
  },

  login: function () {
    if(app.me.authenticated) {
      return this.redirectTo('/');
    }

    this.trigger('page', new LoginPage({
      model: app.me
    }));
  },

  catchAll: function () {
    this.redirectTo('/404');
  }
});

module.exports = WebAppRouter;
