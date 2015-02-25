/*global app, alert*/
var log = require('bows')('users');
var auth = require('client/js/auth');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var validateResponse = require('client/js/helpers/validateResponse');
var tickets = require('client/js/helpers/tickets');
var SessionsView = require('client/js/views/users/userSessions');

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
  initialize: function (spec) {
    var self = this;
    var id = spec.id;

    app.users.getOrFetch(id, function (err, model) {
      if (err) {
        return log.error('couldnt find a user with id: ' + spec.id);
      }
      log('Got user ' + model.img);
      self.model = model;
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
  }
});
