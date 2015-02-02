/*global app, me, $*/
var log = require('bows')('app');
var config = require('clientconfig');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var Companies = require('./models/companies');
var Sessions = require('./models/sessions');
var Speakers = require('./models/speakers');
var domReady = require('domready');

module.exports = {
  // this is the the whole app initter
  blastoff: function () {
    var self = window.app = this;
    this.buildGlobals();

    log('config', config);

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
    // create our global 'me' object and an empty collection for our channels models.
    this.me = new Me();
    this.companies = new Companies();
    this.sessions = new Sessions();
    this.speakers = new Speakers();
    this.fetchInitialData();
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
    
    self.speakers.fetch()
    self.companies.fetch()
    self.sessions.fetch()
  },

  // This is how you navigate around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url without a leading slash.
  // for example: "costello/settings".
  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page;

    this.router.history.navigate(url, {trigger: true});
  }
};

// run it
module.exports.blastoff();
