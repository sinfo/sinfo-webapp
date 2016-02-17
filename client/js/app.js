var log = require('bows')('app')
var config = require('client/js/helpers/clientconfig')
var validateResponse = require('client/js/helpers/validateResponse')
var Router = require('./router')
var MainView = require('./views/main')
var Me = require('./models/me')
var File = require('./models/file')
var Partners = require('./models/partners')
var Sessions = require('./models/sessions')
var Achievements = require('./models/achievements')
var Users = require('./models/users')
var domReady = require('domready')

var Speakers = require('./models/speakers')

module.exports = {
  // this is the the whole app initter
  blastoff: function () {
    var self = window.app = this

    if (!window.Storage || !window.sessionStorage) {
      return window.alert('Sorry, but it seems your browser does not support this website. Please, update your browser version')
    }

    this.buildGlobals()

    // Welcome guest developers
    console.log('%c Hello friend! Found a bug? ', 'background: #333; color: #00AAFF')
    console.log('Send us a PR on GitHub (https://github.com/sinfo/cannon-webapp) or shoot us an email at devteam@sinfo.org!')
    console.log('Thank you!')

    log('Blastoff!', config)

    // init our URL handlers and the history tracker
    this.router = new Router()

    // Hack, issue with anchors
    var oldGetFragment = this.router.history.getFragment
    this.router.history.getFragment = function (fragment) {
      if (fragment) {
        var root = this.root.slice(1)
        if (!fragment.indexOf(root)) fragment = fragment.slice(root.length)
      }
      return oldGetFragment.call(this, fragment)
    }

    this.buildModels()

    // The html must be build async
    // or else the facebook oauth
    // doesnt work
    this.buildHTML()
  },

  // init globals
  buildGlobals: function () {
    // jquery global
    window.$ = window.jQuery = require('jquery')

    // google analytics
    ;(function (i, s, o, g, r, a, m) { i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date();a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga')

    window.ga('create', config.google.analytics, 'auto')

  // jquery plugins
  // require('bootstrap')
  },

  buildModels: function () {
    var self = this

    this.selectedEvent = {}

    // create our global 'me' object and an empty collection for our channels models.
    this.me = new Me()

    this.file = new File()
    this.achievements = new Achievements()
    this.partners = new Partners()
    this.sessions = new Sessions()
    this.speakers = new Speakers()
    this.users = new Users()
    // this.fetchInitialData()

    var authToken = window.sessionStorage['cannon-auth']
    if (authToken) {
      self.me.token = authToken
      self.fetchUserData()
    }
  },

  buildHTML: function () {
    // wait for document ready to render our main view,
    // this ensures the document has a body, etc.
    domReady(function () {
      var self = app

      var mainView

      // init our main view
      mainView = self.view = new MainView({
        model: self.me,
        el: document.body
      })

      mainView.render()

      self.router.history.start({pushState: true})
    })
  },

  // fetchInitialData: function () {
  //   var self = this
  //
  //   self.speakers.fetch()
  //   self.partners.fetch()
  //   self.sessions.fetch()
  // },

  fetchUserData: function () {
    var self = this

    self.me.fetch({
      error: function (model, response, options) {
        validateResponse(response, function (err) {
          log.error(response.statusCode, response.response)
        })
      },
      success: function (model, response, options) {
        self.file.fetch()
      }
    })
  },

  // This is how you navigate around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url without a leading slash.
  // for example: "costello/settings".
  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page

    this.router.history.navigate(url, {trigger: true})
  },

  navigateToLogin: function () {
    var self = this
    self.navigate('/auth/login?r=/' + self.router.history.fragment)
  }
}

// run it
module.exports.blastoff()
