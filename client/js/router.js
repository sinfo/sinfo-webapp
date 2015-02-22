/*global me, app*/
var Router = require('ampersand-router');
var ViewSwitcher = require('ampersand-view-switcher');

var HomePage = require('./pages/home');
var PageNotFound = require('./pages/notFound');

var Achievements = require('./pages/achievements/list');
var AchievementViewPage = require('./pages/achievements/view');

var LoginPage = require('./pages/auth/login');

var Partners = require('./pages/partners/list');

var Redeem = require('./pages/redeem/view');

var Sessions = require('./pages/sessions/list');
var SessionViewPage = require('./pages/sessions/view');

var Speakers = require('./pages/speakers/list');
var SpeakerViewPage = require('./pages/speakers/view');

var UserViewPage = require('./pages/users/view');
var UserEditPage = require('./pages/users/edit');

var log = require('bows')('router');
var fenixAuth = require('./auth/fenix');
var qs = require('qs');
var xhr = require('xhr');
var config = require('client/js/helpers/clientconfig');



var WebAppRouter = Router.extend({
  routes: {
    '': 'home',
    'achievements': 'achievements',
    'achievements/:id': 'achievementView',
    'auth/login?:query': 'fenixLogin',
    'auth/login': 'login',
    'partners': 'partners',
    'partners/:id': 'companyView',
    'redeem/:id': 'redeemCode',
    'sessions': 'sessions',
    'sessions/:id': 'sessionView',
    'speakers': 'speakers',
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
  home: function () {
    this.trigger('page', new HomePage({
      model: app.me
    }));
  },
  
  achievements: function () {
    this.trigger('page', new Achievements({
      collection: app.achievements
    }));
  },
  
  achievementView: function (id) {
   this.trigger('page', new AchievementViewPage({
     id: id
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
  
  redeemCode: function(id) {
    if(!app.me.authenticated) {
      return app.navigateToLogin();
    }
    
    var header = app.me && app.me.token ? {Authorization: 'Bearer ' + app.me.token} : {};
    var self = this;
    xhr({
      uri: config.cannonUrl + '/redeem/' + id,
      method: 'GET',
      headers: header,
    }, function (err, resp, body) {
      if(err) {
        log(err);
      }
      
      var redeem = {
        notFound: false,
        survey: false,
        achi: null
      }
      
      if(resp.statusCode >= 400) {
        log(resp.statusCode);
        
        if(resp.statusCode == 404) {
          redeem.notFound = true;
        }
        else if (resp.statusCode == 412) {
          redeem.survey = true;
        }
      }
      
      var data = JSON.parse(body)
      

      if (data.success) {
        redeem.achievementObject = data.achievement
      }
      self.trigger('page', new Redeem(redeem));
    });
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
