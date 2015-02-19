/*global me, app*/
var Router = require('ampersand-router');

var HomePage = require('./pages/home');
var PageNotFound = require('./pages/notFound');

var LoginPage = require('./pages/auth/login');

var Partners = require('./pages/partners/list');

var Sessions = require('./pages/sessions/list');
var SessionViewPage = require('./pages/sessions/view');

var Speakers = require('./pages/speakers/list');
var SpeakerViewPage = require('./pages/speakers/view');

var UserViewPage = require('./pages/users/view');
var UserEditPage = require('./pages/users/edit');

var log = require('bows')('router');
var fenixAuth = require('./auth/fenix');
var qs = require('qs');


var WebAppRouter = Router.extend({
  routes: {
    '': 'home',
    'auth/login?:query': 'fenixLogin',
    'auth/login': 'login',
    'partners': 'partners',
    'partners/:id': 'companyView',
    'sessions': 'sessions',
    'sessions/:id': 'sessionView',
    'speakers': 'speakers',
    'users/:id' : 'userView',
    'me': 'me',
    'me/edit': 'meEdit',
    'speakers/:id': 'speakerView',
    '(*path)': 'catchAll'
  },

  execute: function(callback, args, name) {
    window.ga('send', 'pageview', window.location.pathname);

    return Router.prototype.execute.apply(this, [callback, args, name]);
  },

  // ------- ROUTE HANDLERS ---------
  home: function (cenas) {
    this.trigger('page', new HomePage({
      model: app.me
    }));
  },

  me: function () {
    if(!app.me || !app.me.authenticated) {
      return app.navigateToLogin();
    }

    this.trigger('page', new UserViewPage({
      model: app.me
    }));
  },

  userView: function (id) {
    this.trigger('page', new UserViewPage({
      id: id
    }));
  },

  meEdit: function () {
    if(!app.me.authenticated) {
      return app.navigateToLogin();
    }

    this.trigger('page', new UserEditPage({
      model: app.me
    }));
  },

  login: function () {
    // if(app.me.authenticated) {
    //   return this.redirectTo('/');
    // }

    this.trigger('page', new LoginPage({
      model: app.me
    }));
  },

  fenixLogin: function (args) {
    if(sessionStorage['cannon-fenix-add'] === 'true'){
      this.me();
    }
    else{
      this.login();
    }
    args = qs.parse(args);
    if(args && Object.keys(args)[0] === 'code'){
      fenixAuth.requestAccessToken(args.code);
    }
  },

  partners: function () {
    this.trigger('page', new Partners({
      collection: app.partners
    }));
  },

  sessions: function () {
   this.trigger('page', new Sessions({
     collection: app.sessions
   }));
  },

  sessionView: function (id) {
   this.trigger('page', new SessionViewPage({
     id: id
   }));
  },

  speakers: function () {
    this.trigger('page', new Speakers({
      collection: app.speakers
    }));
  },

  speakerView: function (id) {
    this.trigger('page', new SpeakerViewPage({
      id: id
    }));
  },

  catchAll: function () {
    this.trigger('page', new PageNotFound());
  }
});

module.exports = WebAppRouter;
