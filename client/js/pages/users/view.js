/*global app, alert*/
var log = require('bows')('users');
var auth = require('client/js/auth');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var validateResponse = require('client/js/helpers/validateResponse');
var tickets = require('client/js/helpers/tickets');
var SessionsView = require('client/js/views/users/userSessions');
var AchievementsView = require('client/js/views/achievements/achievementUsers');
var config = require('client/js/helpers/clientconfig');

module.exports = PageView.extend({
  pageTitle: 'View user',
  template: templates.pages.users.view,
  waitFor:'model.name',
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
  events: {
    'click [data-hook=facebook-add]': 'addFacebook',
    'click [data-hook=google-add]': 'addGoogle',
    'click [data-hook=fenix-add]': 'addFenix',
  },
  addFacebook: function () {
    var self = this;
    auth.login('facebook', true, function(){
      self.handleLogin.apply(self, arguments);
    });
  },
  addGoogle: function () {
    var self = this;
    auth.login('google', true, function(){
      self.handleLogin.apply(self, arguments);
    });
  },
  addFenix: function () {
    var self = this;
    auth.login('fenix', true, function(){
      self.handleLogin.apply(self, arguments);
    });
  },
  handleLogin: function(err, authDetails) {
    var self = this;
    validateResponse(err, function(err){
      var elem = self.queryByHook('message-text');
      if(err) {
        elem.classList.add('error');
        if(err.statusCode == 409){
          elem.textContent = 'Account already associated to you';
        }
        else{
          elem.textContent = 'Error associating account';
        }
        log({err: err});
      }
      else{
        elem.classList.add('valid');
        elem.textContent = 'Account sucessfully added!';
      }
      app.fetchUserData();
    });
  },
  initialize: function (spec) {
    var self = this;

    log(spec);

    if(this.model.name) {
      return self.render();
    }

    app.users.getOrFetch(spec.id, function (err, model) {
      if (err) {
        return log.error('couldnt find a user with id: ' + spec.id);
      }

      self.model = model;
      log('Got user', model);
      return self.render();
    });
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
    achievements: {
      container: '[data-hook=user-achievements]',
      parent: this,
      waitFor: 'model.id',
      prepareView: function (el) {
        var self = this;
        return new AchievementsView({
          el: el,
          model: self.model
        });
      }
    },
  }
});