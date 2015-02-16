/*global app, me, $*/
var log = require('bows')('app');
var config = require('client/js/helpers/clientconfig');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var File = require('./models/file');
var Partners = require('./models/partners');
var Sessions = require('./models/sessions');
var Speakers = require('./models/speakers');
var domReady = require('domready');
var cookies = require('cookie-getter');

module.exports = {
  // this is the the whole app initter
  blastoff: function () {
    var self = window.app = this;
    this.buildGlobals();

    // Welcome guest developers
    console.log('%c Hello friend! Found a bug? ', 'background: #333; color: #00AAFF');
    console.log('Send us a PR on GitHub (https://github.com/sinfo/cannon-webapp) or shoot us an email at devteam@sinfo.org!');
    console.log('Thank you!');

    log('Blastoff!', config);

    // init our URL handlers and the history tracker
    this.router = new Router();

    this.buildModels();

    // The html must be build async
    // or else the facebook oauth
    // doesnt work
    this.buildHTML();
  },

  // init globals
  buildGlobals: function() {
    // jquery global
    window.$ = window.jQuery = require('jquery');

    // jquery plugins
    // require('bootstrap');
  },

  buildModels: function() {
    var self = this;

    // create our global 'me' object and an empty collection for our channels models.
    this.me = new Me();
    this.file = new File();
    this.partners = new Partners();
    this.sessions = new Sessions();
    this.speakers = new Speakers();
    this.fetchInitialData();

    var authToken = cookies('cannon-auth');
    if(authToken) {
      self.me.token = authToken;
      self.fetchUserData();
    }
  },

  buildHTML: function() {
    // wait for document ready to render our main view,
    // this ensures the document has a body, etc.
    domReady(function () {
      var self = app;

      var mainView;

      // init our main view
      mainView = self.view = new MainView({
        model: self.me,
        el: document.body
      });

      mainView.render();

      self.router.history.start({pushState: true, root: '/'});
    });
  },

  fetchInitialData: function () {
    var self = this;

    self.speakers.fetch();
    self.partners.fetch();
    self.sessions.fetch();
  },

  fetchUserData: function () {
    var self = this;

    self.me.fetch({
      success: function(model, response, options){
        self.file.fetch();
      }
    });
  },

  // This is how you navigate around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url without a leading slash.
  // for example: "costello/settings".
  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page;

    this.router.history.navigate(url, {trigger: true});
  },

  navigateToLogin: function() {
    var self = this;
    self.navigate('/auth/login?r=/'+self.router.history.fragment);
  }
};

// run it
module.exports.blastoff();
