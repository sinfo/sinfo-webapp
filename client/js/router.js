/*global me, app*/
var Router = require('ampersand-router');

var HomePage = require('./pages/home');

var LoginPage = require('./pages/auth/login');

var Companies = require('./pages/companies/list');
var CompanyViewPage = require('./pages/companies/view');

var Sessions = require('./pages/sessions/list');
var SessionViewPage = require('./pages/sessions/view');

var Speakers = require('./pages/speakers/list');
var SpeakerViewPage = require('./pages/speakers/view');

var log = require('bows')('router');
var fenixAuth = require('./auth/fenix');
var qs = require('qs');


var WebAppRouter = Router.extend({
  routes: {
    '': 'home',
    'auth/login?:query': 'fenixLogin',
    'auth/login': 'login',
    'companies': 'companies',
    'companies/:id': 'companyView',
    'sessions': 'sessions',
    'sessions/:id': 'sessionView',
    'speakers': 'speakers',
    'speakers/:id': 'speakerView',
    '(*path)': 'catchAll'
  },

  execute: function(callback, args, name) {
    if(false/*!app.me.authenticated*/) {
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
  
  companies: function () {
    this.trigger('page', new Companies({
      collection: app.companies
    }));
  },

  companyView: function (id) {
    this.trigger('page', new CompanyViewPage({
      id: id
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
    this.redirectTo('/404');
  }
});

module.exports = WebAppRouter;
