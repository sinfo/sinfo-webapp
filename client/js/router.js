/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var LoginPage = require('./pages/auth/login');
var log = require('bows')('router');
var fenixAuth = require('./auth/fenix');
var qs = require('qs');

var WebAppRouter = Router.extend({
  routes: {
    '': 'home',
    'auth/login?:query': 'fenixLogin',
    'auth/login': 'login',
    '(*path)': 'catchAll'
  },

  execute: function(callback, args, name) {
    log(args);
    log(name);
    if(!app.me.authenticated) {
      if(name === 'fenixLogin'){
        return callback.apply(this, args);
      }
      this.redirectTo('auth/login/');
      return this.login();
    } else {
      return Router.prototype.execute.apply(this, [callback, args, name]);
    }
  },

  // ------- ROUTE HANDLERS ---------
  home: function (cenas) {
    console.log(cenas);
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

  fenixLogin: function (args) {
    this.redirectTo('auth/login/');
    args = qs.parse(args);
    if(args && Object.keys(args)[0] === 'code'){
      fenixAuth.requestAccessToken(args.code);
    }
  },

  catchAll: function () {
    this.redirectTo('/404');
  }
});

module.exports = WebAppRouter;
