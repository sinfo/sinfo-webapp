/*global app, alert*/
var log = require('bows')('users');
var auth = require('client/js/auth');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var tickets = require('client/js/helpers/tickets');
var SessionsView = require('client/js/views/users/userSessions')

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
    if(!this.model) {
      app.users.getOrFetch(spec.id,{all:true } ,function (err, model) {
        if (err) {
          return log.error('couldnt find a user with id: ' + spec.id);
        }

        self.model = model;
        log('Got user', model.name);

      });
    }
  },
  subviews: {
    sessions: {
      container: '[data-hook=user-sessions]',
      parent: this,
      waitFor: 'model.name',
      prepareView: function (el) {
        var self = this;
        return new SessionsView({
          el: el,
          model: self.model
        });
      }
    },
  }
});