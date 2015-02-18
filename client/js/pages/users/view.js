/*global app, alert*/
var log = require('bows')('users');
var auth = require('client/js/auth');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');

module.exports = PageView.extend({
  pageTitle: 'View user',
  template: templates.pages.users.view,
  bindings: {
    'model.name': {
      hook: 'name'
    },
    'model.background': {
      type: 'attribute',
      hook: 'img',
      name: 'style'
    },
    'model.area': [
      { type: 'toggle', hook: 'area' },
      { selector: '[data-hook~=area] div' },
    ],
    'model.skills': { selector: '[data-hook~=skills] div' },
    'model.skills.length': { type: 'toggle', hook: 'skills' },
  },
  /*events: {
    'click [data-hook=facebook-add]': 'addFacebook',
    'click [data-hook=google-add]': 'addGoogle',
  },
  addFacebook: function () {
    auth.login('facebook', true, this.handleLogin);
  },
  addGoogle: function () {
    auth.login('google', true, this.handleLogin);
  },
  handleLogin: function(err, authDetails) {
    if(err) {
      log({err: err});
      return;
    }
    app.fetchUserData();
    app.navigate('/me');
  },*/
  initialize: function (spec) {
    var self = this;

    //auth.init();

    if(this.model) {
      return;
    }

    // app.users.getOrFetch(spec.id, function (err, model) {
    //   if (err) {
    //     log.error('couldnt find a user with id: ' + spec.id);
    //   }
    //   self.model = model;
    //   log('Got user', model.name);
    // });
  },
});