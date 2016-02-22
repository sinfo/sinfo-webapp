/*global app*/
var Router = require('ampersand-router')

var HomePage = require('./pages/home')

var PageNotFound = require('./pages/notFound')

var Achievements = require('./pages/achievements/list')
var AchievementViewPage = require('./pages/achievements/view')

var LoginPage = require('./pages/auth/login')

var Partners = require('./pages/partners/list')

var Redeem = require('./pages/redeem/view')

var Sessions = require('./pages/sessions/list')
var SessionViewPage = require('./pages/sessions/view')

var Speakers = require('./pages/speakers/list')
var SpeakerViewPage = require('./pages/speakers/view')

var UserViewPage = require('./pages/users/view')
var MePage = require('./pages/users/me')
var UserEditPage = require('./pages/users/edit')

var EventModel = require('./models/event')

var log = require('bows')('router')
var fenixAuth = require('./auth/fenix')
var qs = require('qs')

var WebAppRouter = Router.extend({
  routes: {
    '': 'home',
    '404': 'catchAll',
    'auth/login?:query': 'fenixLogin',
    'auth/login': 'login',
    'partners/:id': 'companyView',
    'redeem/:id': 'redeemCode',
    'users/:id': 'userView',
    'me': 'me',
    'me/edit': 'meEdit',
    'speakers/:id': 'speakerView',
    // 'stream': 'streamView',
    'sponsor': 'sponsor',
    'coc': 'coc',
    'events/:event': 'event',
    'events/:event/achievements': 'achievements',
    'events/:event/achievements/:id': 'achievementView',
    'events/:event/partners': 'partners',
    // '/events/:event/sessions': 'sessions',
    'events/:event/sessions/:id': 'sessionView',
    // '/events/:event/speakers': 'speakers',
    '(*path)': 'catchAll'
  },

  execute: function (callback, args, name) {
    window.ga('send', 'pageview', window.location.pathname)

    window.scrollTo(0, 0)

    return Router.prototype.execute.apply(this, [callback, args, name])
  },

  // ------- ROUTE HANDLERS ---------
  home: function () {
    // this.trigger('page', new HomePage({
    //   model: app.me
    // }))
    window.location = '/'
  },

  sponsor: function () {
    window.location = '/sponsor'
  },

  coc: function () {
    window.location = '/coc'
  },

  event: function (event) {
    this.trigger('page', new HomePage({
      event: event,
      model: new EventModel({id: event})
    }))
  },

  achievements: function (event) {
    this.trigger('page', new Achievements({
      event: event,
      collection: app.achievements
    }))
  },

  achievementView: function (event, id) {
    this.trigger('page', new AchievementViewPage({
      event: event,
      id: id,
      collection: app.achievements
    }))
  },

  me: function () {
    if (!app.me || !app.me.authenticated) {
      return app.navigateToLogin()
    }

    this.trigger('page', new MePage({
      model: app.me
    }))
  },

  userView: function (id) {
    this.trigger('page', new UserViewPage({
      id: id,
      collection: app.users
    }))
  },

  meEdit: function () {
    if (!app.me.authenticated) {
      return app.navigateToLogin()
    }

    this.trigger('page', new UserEditPage({
      model: app.me
    }))
  },

  login: function () {
    // if(app.me.authenticated) {
    //   return this.redirectTo('/')
    // }

    this.trigger('page', new LoginPage({
      model: app.me
    }))
  },

  fenixLogin: function (args) {
    if (window.sessionStorage['cannon-fenix-add'] === 'true') {
      this.me()
    } else {
      this.login()
    }
    args = qs.parse(args)
    if (args && Object.keys(args)[0] === 'code') {
      fenixAuth.requestAccessToken(args.code)
    }
  },

  partners: function (event) {
    this.trigger('page', new Partners({
      event: event,
      collection: app.partners
    }))
  },

  redeemCode: function (id) {
    if (!app.me.authenticated) {
      return app.navigateToLogin()
    }

    this.trigger('page', new Redeem({
      id: id
    }))
  },

  sessions: function (event) {
    this.trigger('page', new Sessions({
      event: event,
      collection: app.sessions
    }))
  },

  sessionView: function (event, id) {
    this.trigger('page', new SessionViewPage({
      event: event,
      id: id,
      collection: app.sessions
    }))
  },

  speakers: function (event) {
    this.trigger('page', new Speakers({
      event: event,
      collection: app.speakers
    }))
  },

  speakerView: function (id) {
    this.trigger('page', new SpeakerViewPage({
      id: id,
      collection: app.speakers
    }))
  },

  catchAll: function () {
    this.trigger('page', new PageNotFound())
  }
})

module.exports = WebAppRouter
